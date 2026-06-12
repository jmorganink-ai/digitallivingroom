// --- Chat Functionality ---
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    renderMessage(text, 'right');
    chatInput.value = '';
}

function renderMessage(content, side, isHtml = false) {
    const div = document.createElement('div');
    div.className = `flex ${side === 'right' ? 'justify-end' : 'justify-start'} my-2`;
    div.innerHTML = `
        <div class="card-3d p-4 rounded-xl max-w-sm ${side === 'right' ? 'bg-white/5' : 'bg-black/20'}">
            <p class="text-white text-sm">${content}</p>
        </div>
    `;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- Photo Booth & Challenge Logic ---
const video = document.getElementById('booth-video');
const boothModal = document.getElementById('photo-booth-modal');

async function openBooth() {
    boothModal.classList.remove('hidden');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Camera access denied", err);
    }
}

function closeBooth() {
    boothModal.classList.add('hidden');
    const stream = video.srcObject;
    if (stream) stream.getTracks().forEach(track => track.stop());
}

function capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    renderMessage(`<img src="${dataUrl}" class="rounded-lg w-full" />`, 'right', true);
    closeBooth();
}

function startChallenge(type) {
    // Challenge trigger logic
    renderMessage(`🎯 **Challenge Initiated:** ${type.toUpperCase()} mode active.`, 'left');
    openBooth();
}

// --- Map Integration ---
function shareLocation() {
    if (!navigator.geolocation) {
        renderMessage("Geolocation not supported.", 'left');
        return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Ensure this is secured
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=400x200&key=${apiKey}`;
        renderMessage(`📍 Meeting Spot: <img src="${mapUrl}" class="rounded-lg mt-2 border border-white/10" />`, 'right', true);
    });
}

// Handle Enter key in chat
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
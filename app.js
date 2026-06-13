document.addEventListener('DOMContentLoaded', () => {

    // 1. Home Page: "Notify Me" Logic
    const notifyBtn = document.getElementById('notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            const email = document.querySelector('input[type="email"]').value;
            if(email) {
                alert("Saved your email: " + email);
            } else {
                alert("Please enter an email first.");
            }
        });
    }

    // 2. Chat Page: "Send" Logic
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const text = input.value;
            if (text.trim() !== "") {
                const bubble = document.createElement('div');
                bubble.className = "bg-amber-400 text-slate-900 p-3 rounded-lg text-sm w-fit ml-auto";
                bubble.textContent = text;
                
                chatWindow.appendChild(bubble);
                input.value = "";
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
        });

        // Allow pressing 'Enter' to send
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });
    }
});

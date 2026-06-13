document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.querySelector('button'); // Targets the Send button
    const input = document.querySelector('input');   // Targets the text input
    const chatContainer = document.querySelector('.bg-slate-800'); // Targets the chat wrapper

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = input.value;
            if (message.trim() !== "") {
                // Create the message bubble
                const bubble = document.createElement('div');
                bubble.className = "bg-amber-400 text-slate-900 p-3 rounded-lg mt-4 self-end";
                bubble.textContent = message;
                
                // Add it to the chat
                chatContainer.appendChild(bubble);
                
                // Clear the input
                input.value = "";
            }
        });
    }
});

// Chat JavaScript - Handle chat functionality

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "Terima kasih atas pesan Anda! Saya akan membantu Anda.",
            "Pertanyaan yang menarik! Biarkan saya berpikir sejenak...",
            "Saya mengerti. Ada lagi yang bisa saya bantu?",
            "Baik, saya akan memproses permintaan Anda.",
            "Halo! Senang bisa membantu Anda hari ini."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'ai');
        
        // Save to file manager
        saveMessageToFileManager(message, randomResponse);
    }, 1000);
}

function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function saveMessageToFileManager(userMessage, aiResponse) {
    // Store conversation in localStorage as backup
    const conversation = {
        page: currentPage || 'Unknown',
        userMessage: userMessage,
        aiResponse: aiResponse,
        timestamp: new Date().toISOString()
    };
    
    let conversations = JSON.parse(localStorage.getItem('chatConversations') || '[]');
    conversations.push(conversation);
    localStorage.setItem('chatConversations', JSON.stringify(conversations));
}

// Auto-greeting on page load
document.addEventListener('DOMContentLoaded', function() {
    const hour = new Date().getHours();
    let greeting = 'Selamat Pagi';
    
    if (hour >= 12 && hour < 15) {
        greeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
        greeting = 'Selamat Sore';
    } else if (hour >= 18) {
        greeting = 'Selamat Malam';
    }
    
    console.log(greeting + '! Selamat datang di AI Chat Reber.');
});

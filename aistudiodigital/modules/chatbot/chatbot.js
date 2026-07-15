// AI Chatbot Module Logic
class Chatbot {
    constructor() {
        this.initialized = false;
        this.messages = [];
        this.responses = [
            "Terima kasih atas pertanyaan Anda. Saya akan membantu dengan senang hati.",
            "Itu pertanyaan yang menarik! Berdasarkan data saya, jawabannya adalah...",
            "Saya memahami kebutuhan Anda. Berikut beberapa saran yang mungkin berguna:",
            "Pertanyaan bagus! Mari saya jelaskan lebih detail tentang hal ini.",
            "Tentu, saya bisa membantu dengan hal tersebut. Berikut informasinya:"
        ];
    }

    init() {
        console.log('Initializing AI Chatbot...');
        this.setupEventListeners();
        this.loadHistory();
        this.initialized = true;
    }

    setupEventListeners() {
        const input = document.getElementById('userInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    loadHistory() {
        const history = localStorage.getItem('chatbot_history');
        if (history) {
            this.messages = JSON.parse(history);
        }
    }

    saveHistory() {
        localStorage.setItem('chatbot_history', JSON.stringify(this.messages));
    }

    sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(text, type) {
        this.messages.push({ text, type, timestamp: new Date().toISOString() });
        this.saveHistory();
        this.renderMessage(text, type);
    }

    renderMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatarIcon = type === 'bot' ? 'fa-robot' : 'fa-user';
        
        messageDiv.innerHTML = `
            <div class="avatar"><i class="fas ${avatarIcon}"></i></div>
            <div class="bubble">${text}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(userMessage) {
        // Simple AI response logic
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('halo') || lowerMessage.includes('hi')) {
            return 'Halo! Senang bertemu Anda. Ada yang bisa saya bantu hari ini?';
        } else if (lowerMessage.includes('terima kasih')) {
            return 'Sama-sama! Senang bisa membantu Anda.';
        } else if (lowerMessage.includes('siapa kamu')) {
            return 'Saya adalah AI Assistant yang dibuat oleh AI Studio Digital. Saya siap membantu Anda dengan berbagai pertanyaan.';
        } else if (lowerMessage.includes('bantuan') || lowerMessage.includes('help')) {
            return 'Tentu! Saya bisa membantu Anda dengan:\n- Menjawab pertanyaan umum\n- Memberikan informasi\n- Berdiskusi tentang berbagai topik\n\nSilakan tanyakan apa saja!';
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('sampai jumpa')) {
            return 'Sampai jumpa! Semoga harimu menyenangkan!';
        } else {
            // Random response from predefined list
            const randomIndex = Math.floor(Math.random() * this.responses.length);
            return this.responses[randomIndex];
        }
    }

    clearHistory() {
        this.messages = [];
        localStorage.removeItem('chatbot_history');
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }
}

// Initialize on DOM ready
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new Chatbot();
    chatbot.init();
});

function sendMessage() {
    if (chatbot) {
        chatbot.sendMessage();
    }
}

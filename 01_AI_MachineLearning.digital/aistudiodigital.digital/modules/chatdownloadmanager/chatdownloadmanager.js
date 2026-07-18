// Chat Download Manager Module - Manages chat history and downloads

const ChatDownloadManager = {
    chats: [],
    currentChat: null,

    init() {
        this.loadChats();
        this.setupEventListeners();
        this.renderChatList();
    },

    loadChats() {
        const stored = localStorage.getItem('aiStudio_chats');
        if (stored) {
            this.chats = JSON.parse(stored);
        } else {
            // Sample chats
            this.chats = [
                {
                    id: 1,
                    title: 'Project Discussion',
                    messages: [
                        { role: 'user', content: 'Help me create a website', timestamp: new Date().toISOString() },
                        { role: 'assistant', content: 'I\'d be happy to help! What type of website?', timestamp: new Date().toISOString() }
                    ],
                    created: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Code Review',
                    messages: [
                        { role: 'user', content: 'Review this code', timestamp: new Date().toISOString() },
                        { role: 'assistant', content: 'The code looks good overall...', timestamp: new Date().toISOString() }
                    ],
                    created: new Date().toISOString()
                }
            ];
            this.saveChats();
        }
    },

    saveChats() {
        localStorage.setItem('aiStudio_chats', JSON.stringify(this.chats));
    },

    setupEventListeners() {
        document.getElementById('newChatBtn')?.addEventListener('click', () => this.newChat());
        document.getElementById('exportChatBtn')?.addEventListener('click', () => this.exportSelected());
        document.getElementById('deleteChatBtn')?.addEventListener('click', () => this.deleteChat());
        document.getElementById('downloadChatBtn')?.addEventListener('click', () => this.downloadChat());
    },

    renderChatList() {
        const list = document.getElementById('chatList');
        if (!list) return;

        list.innerHTML = '';
        this.chats.forEach(chat => {
            const item = document.createElement('div');
            item.className = 'chat-item' + (chat.id === this.currentChat?.id ? ' active' : '');
            item.dataset.id = chat.id;
            const lastMsg = chat.messages[chat.messages.length - 1];
            item.innerHTML = `
                <div class="chat-item-title">${chat.title}</div>
                <div class="chat-item-preview">${lastMsg?.content || 'No messages'}</div>
            `;
            item.onclick = () => this.selectChat(chat.id);
            list.appendChild(item);
        });
    },

    selectChat(id) {
        const chat = this.chats.find(c => c.id === id);
        if (!chat) return;

        this.currentChat = chat;
        document.getElementById('chatTitle').textContent = chat.title;
        
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = '';
        
        chat.messages.forEach(msg => {
            const msgEl = document.createElement('div');
            msgEl.className = `message ${msg.role}`;
            msgEl.innerHTML = `
                <div>${msg.content}</div>
                <div class="message-timestamp">${new Date(msg.timestamp).toLocaleString()}</div>
            `;
            messagesContainer.appendChild(msgEl);
        });

        this.renderChatList();
    },

    newChat() {
        const title = prompt('Enter chat title:');
        if (!title) return;

        const newChat = {
            id: Date.now(),
            title: title,
            messages: [],
            created: new Date().toISOString()
        };

        this.chats.unshift(newChat);
        this.saveChats();
        this.renderChatList();
        this.selectChat(newChat.id);
    },

    deleteChat() {
        if (!this.currentChat) return;
        
        if (confirm(`Delete "${this.currentChat.title}"?`)) {
            this.chats = this.chats.filter(c => c.id !== this.currentChat.id);
            this.saveChats();
            this.currentChat = null;
            document.getElementById('chatTitle').textContent = 'Select a chat to view';
            document.getElementById('chatMessages').innerHTML = '';
            this.renderChatList();
        }
    },

    exportSelected() {
        if (!this.currentChat) {
            alert('Please select a chat first');
            return;
        }
        this.downloadChat();
    },

    downloadChat() {
        if (!this.currentChat) return;

        const includeTimestamp = document.getElementById('includeTimestamp')?.checked;
        const includeMetadata = document.getElementById('includeMetadata')?.checked;
        const formatJSON = document.getElementById('formatJSON')?.checked;
        
        let content = '';
        
        if (formatJSON) {
            content = JSON.stringify(this.currentChat, null, 2);
        } else {
            content = `Chat: ${this.currentChat.title}\n`;
            if (includeMetadata) {
                content += `Created: ${new Date(this.currentChat.created).toLocaleString()}\n`;
                content += `Messages: ${this.currentChat.messages.length}\n\n`;
            }
            content += '='.repeat(50) + '\n\n';
            
            this.currentChat.messages.forEach(msg => {
                if (includeTimestamp) {
                    content += `[${new Date(msg.timestamp).toLocaleString()}] `;
                }
                content += `${msg.role.toUpperCase()}: ${msg.content}\n\n`;
            });
        }

        const blob = new Blob([content], { type: formatJSON ? 'application/json' : 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentChat.title.replace(/\s+/g, '_')}.${formatJSON ? 'json' : 'txt'}`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => ChatDownloadManager.init());

// Prompt Manager Module JavaScript

const PromptManager = {
    prompts: [],
    currentCategory: 'all',
    
    init: function() {
        this.loadPrompts();
        this.renderPrompts();
        this.setupEventListeners();
    },
    
    loadPrompts: function() {
        const saved = localStorage.getItem('aistudio_prompts');
        if (saved) {
            this.prompts = JSON.parse(saved);
        } else {
            // Default sample prompts
            this.prompts = [
                {
                    id: 1,
                    title: 'Code Review Assistant',
                    category: 'coding',
                    tags: ['code', 'review', 'quality'],
                    content: 'Review the following code for best practices, potential bugs, and optimization opportunities. Provide specific suggestions for improvement.',
                    created: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Bug Fix Helper',
                    category: 'coding',
                    tags: ['debugging', 'fix', 'error'],
                    content: 'Analyze this error message and code snippet. Identify the root cause and provide a step-by-step solution to fix the bug.',
                    created: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Content Writer',
                    category: 'writing',
                    tags: ['content', 'blog', 'article'],
                    content: 'Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, detailed sections with examples, and a compelling conclusion.',
                    created: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Data Analysis Expert',
                    category: 'analysis',
                    tags: ['data', 'analysis', 'insights'],
                    content: 'Analyze the provided dataset and identify key trends, patterns, and insights. Present findings in a clear, actionable format.',
                    created: new Date().toISOString()
                },
                {
                    id: 5,
                    title: 'Creative Brainstorming',
                    category: 'creative',
                    tags: ['ideas', 'brainstorm', 'innovation'],
                    content: 'Generate 10 creative ideas for [PROJECT]. Think outside the box and provide unique perspectives that haven\'t been explored before.',
                    created: new Date().toISOString()
                }
            ];
            this.savePrompts();
        }
    },
    
    savePrompts: function() {
        localStorage.setItem('aistudio_prompts', JSON.stringify(this.prompts));
        FileManager.logActivity('Prompts saved', 'save');
    },
    
    renderPrompts: function(filter = '') {
        const grid = document.getElementById('promptsGrid');
        if (!grid) return;
        
        let filtered = this.prompts;
        
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }
        
        if (filter) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(filter.toLowerCase()) ||
                p.content.toLowerCase().includes(filter.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
            );
        }
        
        grid.innerHTML = filtered.map(prompt => `
            <div class="prompt-card" onclick="PromptManager.editPrompt(${prompt.id})">
                <div class="prompt-card-header">
                    <div class="prompt-card-title">${prompt.title}</div>
                    <div class="prompt-card-actions">
                        <button onclick="event.stopPropagation(); PromptManager.duplicatePrompt(${prompt.id})">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button onclick="event.stopPropagation(); PromptManager.deletePrompt(${prompt.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="prompt-card-preview">${prompt.content}</div>
                <div class="prompt-card-tags">
                    ${prompt.tags.map(tag => `<span class="prompt-card-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    },
    
    setupEventListeners: function() {
        // Category filtering
        document.querySelectorAll('.category-list li').forEach(li => {
            li.addEventListener('click', function() {
                document.querySelectorAll('.category-list li').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                PromptManager.currentCategory = this.dataset.cat;
                PromptManager.renderPrompts(document.getElementById('promptSearch').value);
            });
        });
        
        // Search
        document.getElementById('promptSearch')?.addEventListener('input', function() {
            PromptManager.renderPrompts(this.value);
        });
        
        // Tag filtering
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', function() {
                document.getElementById('promptSearch').value = this.textContent;
                PromptManager.renderPrompts(this.textContent);
            });
        });
    },
    
    createNewPrompt: function() {
        document.getElementById('promptTitle').value = '';
        document.getElementById('promptCategory').value = 'coding';
        document.getElementById('promptTags').value = '';
        document.getElementById('promptContent').value = '';
        document.getElementById('promptVariables').value = '{}';
        document.getElementById('promptModal').classList.remove('hidden');
    },
    
    editPrompt: function(id) {
        const prompt = this.prompts.find(p => p.id === id);
        if (!prompt) return;
        
        document.getElementById('promptTitle').value = prompt.title;
        document.getElementById('promptCategory').value = prompt.category;
        document.getElementById('promptTags').value = prompt.tags.join(', ');
        document.getElementById('promptContent').value = prompt.content;
        document.getElementById('promptVariables').value = JSON.stringify(prompt.variables || {}, null, 2);
        document.getElementById('promptModal').dataset.editId = id;
        document.getElementById('promptModal').classList.remove('hidden');
    },
    
    savePrompt: function() {
        const editId = document.getElementById('promptModal').dataset.editId;
        const title = document.getElementById('promptTitle').value;
        const category = document.getElementById('promptCategory').value;
        const tags = document.getElementById('promptTags').value.split(',').map(t => t.trim()).filter(t => t);
        const content = document.getElementById('promptContent').value;
        
        let variables = {};
        try {
            variables = JSON.parse(document.getElementById('promptVariables').value || '{}');
        } catch (e) {
            showToast('Invalid JSON in variables', 'error');
            return;
        }
        
        if (!title || !content) {
            showToast('Title and content are required', 'error');
            return;
        }
        
        if (editId) {
            // Update existing
            const index = this.prompts.findIndex(p => p.id == editId);
            if (index >= 0) {
                this.prompts[index] = {
                    ...this.prompts[index],
                    title,
                    category,
                    tags,
                    content,
                    variables,
                    updated: new Date().toISOString()
                };
            }
        } else {
            // Create new
            this.prompts.unshift({
                id: Date.now(),
                title,
                category,
                tags,
                content,
                variables,
                created: new Date().toISOString()
            });
        }
        
        this.savePrompts();
        this.renderPrompts();
        closePromptModal();
        showToast('Prompt saved successfully', 'success');
    },
    
    duplicatePrompt: function(id) {
        const prompt = this.prompts.find(p => p.id === id);
        if (!prompt) return;
        
        this.prompts.unshift({
            ...prompt,
            id: Date.now(),
            title: prompt.title + ' (Copy)',
            created: new Date().toISOString()
        });
        
        this.savePrompts();
        this.renderPrompts();
        showToast('Prompt duplicated', 'success');
    },
    
    deletePrompt: function(id) {
        if (!confirm('Are you sure you want to delete this prompt?')) return;
        
        this.prompts = this.prompts.filter(p => p.id !== id);
        this.savePrompts();
        this.renderPrompts();
        showToast('Prompt deleted', 'success');
    }
};

// Global functions
function createNewPrompt() {
    PromptManager.createNewPrompt();
}

function importPrompts() {
    showToast('Import feature coming soon', 'info');
}

function exportPrompts() {
    const dataStr = JSON.stringify(PromptManager.prompts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompts-export.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Prompts exported', 'success');
}

function closePromptModal() {
    document.getElementById('promptModal').classList.add('hidden');
    delete document.getElementById('promptModal').dataset.editId;
}

function savePrompt() {
    PromptManager.savePrompt();
}

// Initialize on module load
if (document.querySelector('.prompt-manager')) {
    PromptManager.init();
}

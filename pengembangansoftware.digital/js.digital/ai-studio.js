/**
 * AI Studio - Sistem AI Lengkap untuk SoutheastApp
 * Mengintegrasikan AI Engine dengan File Manager dan komponen UI yang ada
 * 
 * @module ai-studio
 * @version 1.0.0
 */

(function() {
    'use strict';

    // === KONFIGURASI ===
    const CONFIG = {
        name: 'ai-studio',
        version: '1.0.0',
        enabled: true,
        dependencies: ['ai-engine', 'modelfile', 'uimodaldialog', 'uinotificationcenter'],
        studio: {
            maxConcurrentTasks: 5,
            defaultModel: 'southeast-ai-v1',
            contextWindow: 4096,
            ragEnabled: true,
            codeGenerationEnabled: true,
            projectManagementEnabled: true
        }
    };

    // === STATE ===
    let state = {
        initialized: false,
        aiEngine: null,
        currentProject: null,
        activeTasks: [],
        conversationHistory: [],
        generatedFiles: [],
        templates: [],
        listeners: []
    };

    // === KOMPONEN INTI AI STUDIO ===

    /**
     * AI Studio Dashboard - Panel utama untuk mengontrol semua fitur AI
     */
    function createStudioDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'ai-studio-dashboard';
        dashboard.innerHTML = `
            <div class="studio-header">
                <h2><i class="fas fa-robot"></i> AI Studio</h2>
                <div class="studio-stats">
                    <div class="stat-item">
                        <span class="stat-label">Projects</span>
                        <span class="stat-value" id="projectCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Files Generated</span>
                        <span class="stat-value" id="filesCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Active Tasks</span>
                        <span class="stat-value" id="tasksCount">0</span>
                    </div>
                </div>
            </div>
            <div class="studio-main">
                <div class="studio-sidebar">
                    <div class="sidebar-menu">
                        <button class="menu-btn active" data-section="chat">
                            <i class="fas fa-comments"></i> AI Chat
                        </button>
                        <button class="menu-btn" data-section="projects">
                            <i class="fas fa-folder"></i> Projects
                        </button>
                        <button class="menu-btn" data-section="templates">
                            <i class="fas fa-file-code"></i> Templates
                        </button>
                        <button class="menu-btn" data-section="history">
                            <i class="fas fa-history"></i> History
                        </button>
                        <button class="menu-btn" data-section="settings">
                            <i class="fas fa-cog"></i> Settings
                        </button>
                    </div>
                </div>
                <div class="studio-content">
                    <div id="studioSectionChat" class="studio-section active">
                        ${createChatInterface()}
                    </div>
                    <div id="studioSectionProjects" class="studio-section hidden">
                        ${createProjectsInterface()}
                    </div>
                    <div id="studioSectionTemplates" class="studio-section hidden">
                        ${createTemplatesInterface()}
                    </div>
                    <div id="studioSectionHistory" class="studio-section hidden">
                        ${createHistoryInterface()}
                    </div>
                    <div id="studioSectionSettings" class="studio-section hidden">
                        ${createSettingsInterface()}
                    </div>
                </div>
            </div>
        `;
        return dashboard;
    }

    /**
     * Chat Interface - Antarmuka percakapan dengan AI
     */
    function createChatInterface() {
        return `
            <div class="chat-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="message system">
                        <div class="message-content">
                            <p>Halo! Saya AI Assistant SoutheastApp. Bagaimana saya bisa membantu Anda hari ini?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <div class="chat-input-controls">
                        <button class="attach-btn" title="Attach File"><i class="fas fa-paperclip"></i></button>
                        <select class="model-select" id="chatModelSelect">
                            <option value="southeast-ai-v1">Southeast AI v1</option>
                            <option value="code-expert">Code Expert</option>
                            <option value="creative">Creative Writer</option>
                        </select>
                    </div>
                    <textarea id="chatInput" placeholder="Ketik pesan Anda di sini..." rows="3"></textarea>
                    <div class="chat-actions">
                        <button class="btn btn-primary" onclick="AIStudio.sendMessage()">
                            <i class="fas fa-paper-plane"></i> Send
                        </button>
                        <button class="btn btn-secondary" onclick="AIStudio.clearChat()">
                            <i class="fas fa-trash"></i> Clear
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Projects Interface - Manajemen project AI
     */
    function createProjectsInterface() {
        return `
            <div class="projects-container">
                <div class="projects-header">
                    <h3>My Projects</h3>
                    <button class="btn btn-success" onclick="AIStudio.createNewProject()">
                        <i class="fas fa-plus"></i> New Project
                    </button>
                </div>
                <div class="projects-grid" id="projectsGrid">
                    <!-- Projects will be loaded here -->
                </div>
            </div>
        `;
    }

    /**
     * Templates Interface - Template kode siap pakai
     */
    function createTemplatesInterface() {
        return `
            <div class="templates-container">
                <div class="templates-header">
                    <h3>Code Templates</h3>
                    <input type="text" class="search-input" placeholder="Search templates..." oninput="AIStudio.searchTemplates(this.value)">
                </div>
                <div class="templates-grid" id="templatesGrid">
                    <div class="template-card" onclick="AIStudio.useTemplate('react-component')">
                        <div class="template-icon"><i class="fab fa-react"></i></div>
                        <div class="template-name">React Component</div>
                        <div class="template-desc">Boilerplate React component with hooks</div>
                    </div>
                    <div class="template-card" onclick="AIStudio.useTemplate('nodejs-api')">
                        <div class="template-icon"><i class="fab fa-node-js"></i></div>
                        <div class="template-name">Node.js API</div>
                        <div class="template-desc">REST API endpoint template</div>
                    </div>
                    <div class="template-card" onclick="AIStudio.useTemplate('python-script')">
                        <div class="template-icon"><i class="fab fa-python"></i></div>
                        <div class="template-name">Python Script</div>
                        <div class="template-desc">Python automation script template</div>
                    </div>
                    <div class="template-card" onclick="AIStudio.useTemplate('css-component')">
                        <div class="template-icon"><i class="fab fa-css3-alt"></i></div>
                        <div class="template-name">CSS Component</div>
                        <div class="template-desc">Reusable CSS component with variables</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * History Interface - Riwayat percakapan dan generasi
     */
    function createHistoryInterface() {
        return `
            <div class="history-container">
                <div class="history-header">
                    <h3>Conversation History</h3>
                    <button class="btn btn-danger" onclick="AIStudio.clearHistory()">
                        <i class="fas fa-trash"></i> Clear All
                    </button>
                </div>
                <div class="history-list" id="historyList">
                    <!-- History items will be loaded here -->
                </div>
            </div>
        `;
    }

    /**
     * Settings Interface - Konfigurasi AI Studio
     */
    function createSettingsInterface() {
        return `
            <div class="settings-container">
                <h3>AI Studio Settings</h3>
                <div class="settings-group">
                    <label class="settings-label">Default AI Model</label>
                    <select class="form-select" id="defaultModel">
                        <option value="southeast-ai-v1">Southeast AI v1</option>
                        <option value="code-expert">Code Expert</option>
                        <option value="creative">Creative Writer</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label class="settings-label">Context Window Size</label>
                    <select class="form-select" id="contextWindow">
                        <option value="2048">2048 tokens</option>
                        <option value="4096" selected>4096 tokens</option>
                        <option value="8192">8192 tokens</option>
                    </select>
                </div>
                <div class="settings-group">
                    <label class="settings-label">RAG Knowledge Base</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="ragEnabled" checked>
                        <span class="toggle-slider"></span>
                    </label>
                    <p class="settings-help">Enable Retrieval-Augmented Generation for better responses</p>
                </div>
                <div class="settings-group">
                    <label class="settings-label">Auto-save Conversations</label>
                    <label class="toggle-switch">
                        <input type="checkbox" id="autoSave" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="AIStudio.saveSettings()">Save Settings</button>
                    <button class="btn btn-secondary" onclick="AIStudio.resetSettings()">Reset to Default</button>
                </div>
            </div>
        `;
    }

    // === FUNGSI UTAMA ===

    /**
     * Inisialisasi AI Studio
     */
    function init(options = {}) {
        if (state.initialized) {
            console.warn('[ai-studio] Sudah diinisialisasi');
            return;
        }

        console.log('[ai-studio] Menginisialisasi AI Studio...');

        // Load AI Engine jika tersedia
        if (window.AIEngine) {
            state.aiEngine = new window.AIEngine();
            state.aiEngine.loadRAGIndex().then(() => {
                console.log('[ai-studio] RAG Index loaded');
            });
        }

        state.currentProject = null;
        state.activeTasks = [];
        state.conversationHistory = [];
        state.generatedFiles = [];
        state.initialized = true;

        // Load saved data from localStorage
        loadSavedData();

        dispatch('init', { options });

        return this;
    }

    /**
     * Render AI Studio ke container
     */
    function render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[ai-studio] Container not found:', containerId);
            return;
        }

        container.innerHTML = '';
        const dashboard = createStudioDashboard();
        container.appendChild(dashboard);

        setupEventListeners();
        updateStats();
    }

    /**
     * Setup event listeners untuk dashboard
     */
    function setupEventListeners() {
        // Menu navigation
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                switchSection(section);
            });
        });

        // Chat input enter key
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }

    /**
     * Switch antara sections
     */
    function switchSection(sectionName) {
        // Update menu buttons
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionName) {
                btn.classList.add('active');
            }
        });

        // Update sections
        document.querySelectorAll('.studio-section').forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(`studioSection${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        dispatch('sectionChange', { section: sectionName });
    }

    /**
     * Kirim pesan ke AI
     */
    async function sendMessage() {
        const input = document.getElementById('chatInput');
        const modelSelect = document.getElementById('chatModelSelect');
        
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();
        const model = modelSelect ? modelSelect.value : 'southeast-ai-v1';

        // Add user message to chat
        addMessageToChat('user', message);
        input.value = '';

        // Show loading indicator
        addMessageToChat('system', 'Thinking...', 'loading');

        try {
            let response;
            if (state.aiEngine) {
                const result = await state.aiEngine.generateResponse(message);
                response = result.response;
            } else {
                response = generateFallbackResponse(message);
            }

            // Remove loading message and add actual response
            removeLoadingMessage();
            addMessageToChat('ai', response);

            // Save to history
            saveToHistory({
                type: 'conversation',
                message: message,
                response: response,
                model: model,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            removeLoadingMessage();
            addMessageToChat('system', 'Error: ' + error.message);
        }

        updateStats();
    }

    /**
     * Tambahkan pesan ke chat
     */
    function addMessageToChat(sender, content, type = 'normal') {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender} ${type === 'loading' ? 'loading' : ''}`;
        messageDiv.id = type === 'loading' ? 'loadingMessage' : '';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-meta">
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Hapus loading message
     */
    function removeLoadingMessage() {
        const loadingMsg = document.getElementById('loadingMessage');
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }

    /**
     * Generate fallback response jika AI engine tidak tersedia
     */
    function generateFallbackResponse(message) {
        const responses = [
            "Terima kasih atas pesan Anda. AI Studio sedang dalam pengembangan.",
            "Fitur ini akan segera tersedia. Silakan coba lagi nanti.",
            "Saya adalah AI Assistant. Saat ini saya dalam mode demo."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Buat project baru
     */
    function createNewProject() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Project</h3>
                    <button class="modal-close" onclick="AIStudio.closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" id="projectName" class="form-input" placeholder="My Awesome Project">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="projectDesc" class="form-input" rows="3" placeholder="Describe your project..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Requirements (comma separated)</label>
                        <input type="text" id="projectReqs" class="form-input" placeholder="React, Node.js, MongoDB">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="AIStudio.closeModal()">Cancel</button>
                    <button class="btn btn-success" onclick="AIStudio.generateProject()">Generate Project</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    /**
     * Tutup modal
     */
    function closeModal() {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * Generate project dari requirements
     */
    async function generateProject() {
        const name = document.getElementById('projectName').value;
        const desc = document.getElementById('projectDesc').value;
        const reqs = document.getElementById('projectReqs').value.split(',').map(r => r.trim()).filter(r => r);

        if (!name || !reqs.length) {
            alert('Project name and requirements are required!');
            return;
        }

        closeModal();

        // Show loading
        const loadingModal = document.createElement('div');
        loadingModal.className = 'modal active';
        loadingModal.innerHTML = `
            <div class="modal-content">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Generating project files...</p>
                </div>
            </div>
        `;
        document.body.appendChild(loadingModal);

        try {
            if (state.aiEngine) {
                const project = state.aiEngine.createProject(name, desc, reqs);
                const generated = await state.aiEngine.generateProjectCode(project);
                
                state.currentProject = generated;
                state.generatedFiles.push(...generated.files);
                
                saveToHistory({
                    type: 'project',
                    project: generated,
                    timestamp: new Date().toISOString()
                });

                loadingModal.remove();
                showProjectSuccess(generated);
            }
        } catch (error) {
            loadingModal.remove();
            alert('Error generating project: ' + error.message);
        }

        updateStats();
    }

    /**
     * Tampilkan sukses generate project
     */
    function showProjectSuccess(project) {
        const notification = {
            title: 'Project Generated!',
            message: `Successfully created ${project.files.length} files`,
            type: 'success'
        };

        if (window.SoutheastApp && window.SoutheastApp.components['ui-notification-center']) {
            window.SoutheastApp.components['ui-notification-center'].show(notification);
        } else {
            alert(`${notification.title}\n${notification.message}`);
        }

        switchSection('projects');
        loadProjects();
    }

    /**
     * Load projects ke grid
     */
    function loadProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (state.currentProject) {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-icon"><i class="fas fa-folder-open"></i></div>
                <div class="project-name">${state.currentProject.name}</div>
                <div class="project-files">${state.currentProject.files.length} files</div>
                <div class="project-actions">
                    <button class="btn btn-sm btn-primary" onclick="AIStudio.viewProject()">View</button>
                    <button class="btn btn-sm btn-success" onclick="AIStudio.exportProject()">Export</button>
                </div>
            `;
            grid.appendChild(card);
        } else {
            grid.innerHTML = '<p class="no-projects">No projects yet. Create your first project!</p>';
        }
    }

    /**
     * Gunakan template
     */
    function useTemplate(templateName) {
        console.log('[ai-studio] Using template:', templateName);
        
        const templates = {
            'react-component': `import React, { useState } from 'react';\n\nconst Component = () => {\n  const [state, setState] = useState(null);\n  \n  return (\n    <div className="component">\n      {/* Your code here */}\n    </div>\n  );\n};\n\nexport default Component;`,
            
            'nodejs-api': `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', async (req, res) => {\n  try {\n    res.json({ success: true });\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});\n\nmodule.exports = router;`,
            
            'python-script': `#!/usr/bin/env python3\n\ndef main():\n    # Your code here\n    pass\n\nif __name__ == '__main__':\n    main()`,
            
            'css-component': `.component {\n  --primary-color: #6366f1;\n  --secondary-color: #8b5cf6;\n  \n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  &::before {\n    content: '';\n    /* Your styles here */\n  }\n}`
        };

        const code = templates[templateName] || '// Template not found';
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            if (window.SoutheastApp && window.SoutheastApp.components['ui-notification-center']) {
                window.SoutheastApp.components['ui-notification-center'].show({
                    title: 'Template Copied!',
                    message: 'Code copied to clipboard',
                    type: 'success'
                });
            } else {
                alert('Template copied to clipboard!');
            }
        });
    }

    /**
     * Search templates
     */
    function searchTemplates(query) {
        const cards = document.querySelectorAll('.template-card');
        const queryLower = query.toLowerCase();

        cards.forEach(card => {
            const name = card.querySelector('.template-name').textContent.toLowerCase();
            const desc = card.querySelector('.template-desc').textContent.toLowerCase();
            
            if (name.includes(queryLower) || desc.includes(queryLower)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Save to history
     */
    function saveToHistory(item) {
        state.conversationHistory.push(item);
        
        // Save to localStorage
        try {
            localStorage.setItem('ai-studio-history', JSON.stringify(state.conversationHistory));
        } catch (e) {
            console.warn('[ai-studio] Failed to save history:', e);
        }

        loadHistory();
    }

    /**
     * Load history
     */
    function loadHistory() {
        const list = document.getElementById('historyList');
        if (!list) return;

        list.innerHTML = '';

        state.conversationHistory.slice(-20).reverse().forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            
            if (item.type === 'conversation') {
                div.innerHTML = `
                    <div class="history-icon"><i class="fas fa-comment"></i></div>
                    <div class="history-content">
                        <div class="history-preview">${item.message.substring(0, 50)}...</div>
                        <div class="history-meta">${new Date(item.timestamp).toLocaleString()}</div>
                    </div>
                `;
            } else if (item.type === 'project') {
                div.innerHTML = `
                    <div class="history-icon"><i class="fas fa-folder"></i></div>
                    <div class="history-content">
                        <div class="history-preview">Project: ${item.project.name}</div>
                        <div class="history-meta">${item.project.files.length} files - ${new Date(item.timestamp).toLocaleString()}</div>
                    </div>
                `;
            }

            list.appendChild(div);
        });
    }

    /**
     * Clear history
     */
    function clearHistory() {
        if (confirm('Are you sure you want to clear all history?')) {
            state.conversationHistory = [];
            localStorage.removeItem('ai-studio-history');
            loadHistory();
            updateStats();
        }
    }

    /**
     * Clear chat
     */
    function clearChat() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message system">
                    <div class="message-content">
                        <p>Chat cleared. How can I help you?</p>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Save settings
     */
    function saveSettings() {
        const settings = {
            defaultModel: document.getElementById('defaultModel').value,
            contextWindow: parseInt(document.getElementById('contextWindow').value),
            ragEnabled: document.getElementById('ragEnabled').checked,
            autoSave: document.getElementById('autoSave').checked
        };

        try {
            localStorage.setItem('ai-studio-settings', JSON.stringify(settings));
            
            if (window.SoutheastApp && window.SoutheastApp.components['ui-notification-center']) {
                window.SoutheastApp.components['ui-notification-center'].show({
                    title: 'Settings Saved!',
                    message: 'Your preferences have been saved',
                    type: 'success'
                });
            } else {
                alert('Settings saved successfully!');
            }
        } catch (e) {
            console.error('[ai-studio] Failed to save settings:', e);
        }
    }

    /**
     * Reset settings
     */
    function resetSettings() {
        document.getElementById('defaultModel').value = 'southeast-ai-v1';
        document.getElementById('contextWindow').value = '4096';
        document.getElementById('ragEnabled').checked = true;
        document.getElementById('autoSave').checked = true;
    }

    /**
     * Load saved data from localStorage
     */
    function loadSavedData() {
        try {
            const savedHistory = localStorage.getItem('ai-studio-history');
            if (savedHistory) {
                state.conversationHistory = JSON.parse(savedHistory);
            }

            const savedSettings = localStorage.getItem('ai-studio-settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                // Apply settings
            }
        } catch (e) {
            console.warn('[ai-studio] Failed to load saved data:', e);
        }
    }

    /**
     * Update stats display
     */
    function updateStats() {
        const projectCount = document.getElementById('projectCount');
        const filesCount = document.getElementById('filesCount');
        const tasksCount = document.getElementById('tasksCount');

        if (projectCount) projectCount.textContent = state.currentProject ? 1 : 0;
        if (filesCount) filesCount.textContent = state.generatedFiles.length;
        if (tasksCount) tasksCount.textContent = state.activeTasks.length;
    }

    /**
     * View project
     */
    function viewProject() {
        if (!state.currentProject) return;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>${state.currentProject.name}</h3>
                    <button class="modal-close" onclick="AIStudio.closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="files-list">
                        ${state.currentProject.files.map(file => `
                            <div class="file-item">
                                <div class="file-icon"><i class="fas fa-file-code"></i></div>
                                <div class="file-info">
                                    <div class="file-name">${file.name}</div>
                                    <pre class="file-preview">${file.content.substring(0, 200)}...</pre>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    /**
     * Export project
     */
    function exportProject() {
        if (!state.currentProject) return;

        // Create ZIP or download individual files
        state.currentProject.files.forEach(file => {
            const blob = new Blob([file.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        });

        if (window.SoutheastApp && window.SoutheastApp.components['ui-notification-center']) {
            window.SoutheastApp.components['ui-notification-center'].show({
                title: 'Project Exported!',
                message: `${state.currentProject.files.length} files downloaded`,
                type: 'success'
            });
        }
    }

    /**
     * Subscribe ke event
     */
    function subscribe(event, callback) {
        state.listeners.push({ event, callback });
        return () => unsubscribe(event, callback);
    }

    /**
     * Unsubscribe dari event
     */
    function unsubscribe(event, callback) {
        state.listeners = state.listeners.filter(
            l => !(l.event === event && l.callback === callback)
        );
    }

    /**
     * Dispatch event
     */
    function dispatch(event, payload) {
        state.listeners
            .filter(l => l.event === event)
            .forEach(l => l.callback(payload));

        if (window.SoutheastApp && window.SoutheastApp.eventBus) {
            window.SoutheastApp.eventBus.dispatch(`${CONFIG.name}:${event}`, payload);
        }
    }

    // === EXPORT PUBLIC API ===
    const publicAPI = {
        init,
        render,
        sendMessage,
        clearChat,
        createNewProject,
        generateProject,
        closeModal,
        useTemplate,
        searchTemplates,
        saveToHistory,
        loadHistory,
        clearHistory,
        saveSettings,
        resetSettings,
        viewProject,
        exportProject,
        switchSection,
        subscribe,
        unsubscribe,
        dispatch,
        getConfig: () => ({ ...CONFIG }),
        isInitialized: () => state.initialized
    };

    // Register ke global namespace
    if (typeof window !== 'undefined') {
        if (!window.SoutheastApp) {
            window.SoutheastApp = {};
        }
        if (!window.SoutheastApp.components) {
            window.SoutheastApp.components = {};
        }
        window.SoutheastApp.components['ai-studio'] = publicAPI;
        window.AIStudio = publicAPI;
    }

    // Auto-init jika ada attribute data-auto-init
    if (typeof document !== 'undefined') {
        const autoInitElement = document.querySelector(`[data-component="${CONFIG.name}"]`);
        if (autoInitElement) {
            const options = JSON.parse(autoInitElement.dataset.options || '{}');
            init(options);
        }
    }

})();

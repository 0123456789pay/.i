// AI Studio Digital - Main JavaScript
// Configuration and State Management

const AppState = {
    currentModule: 'codefile',
    currentTab: 'editor',
    previewMode: 'preview',
    deviceMode: 'desktop',
    files: {
        html: '',
        css: '',
        js: '',
        json: '{}'
    },
    chatHistory: [],
    activityLog: []
};

// File Manager - Save/Load data to files
const FileManager = {
    saveData: function(filename, data) {
        // Simulate saving to file manager
        const storageKey = `aistudio_${filename}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
        this.logActivity(`Saved ${filename}`, 'save');
        showToast(`Data saved to ${filename}`, 'success');
    },
    
    loadData: function(filename) {
        const storageKey = `aistudio_${filename}`;
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : null;
    },
    
    saveAllFiles: function() {
        const projectData = {
            module: AppState.currentModule,
            timestamp: new Date().toISOString(),
            files: { ...AppState.files }
        };
        this.saveData(`${AppState.currentModule}_project`, projectData);
    },
    
    logActivity: function(message, type = 'info') {
        AppState.activityLog.unshift({
            message,
            type,
            timestamp: new Date().toISOString()
        });
        // Keep only last 50 activities
        if (AppState.activityLog.length > 50) {
            AppState.activityLog = AppState.activityLog.slice(0, 50);
        }
        this.renderActivity();
    },
    
    renderActivity: function() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;
        
        activityList.innerHTML = AppState.activityLog.slice(0, 10).map(activity => `
            <div class="activity-item">
                <i class="fas fa-${activity.type === 'save' ? 'save' : activity.type === 'publish' ? 'rocket' : 'info-circle'}"></i>
                <span>${activity.message}</span>
            </div>
        `).join('');
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Setup menu item clicks
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const moduleId = this.dataset.module;
            loadModule(moduleId);
        });
    });
    
    // Load initial module
    loadModule(AppState.currentModule);
    
    // Update statistics
    updateStatistics();
    
    // Render activity log
    FileManager.renderActivity();
}

// Module Loading
function loadModule(moduleId) {
    AppState.currentModule = moduleId;
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.module === moduleId);
    });
    
    // Update breadcrumb
    const moduleName = moduleId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    document.getElementById('currentModule').textContent = moduleName;
    
    // Load module content
    loadModuleFiles(moduleId);
    
    FileManager.logActivity(`Loaded module: ${moduleName}`, 'info');
}

function loadModuleFiles(moduleId) {
    // Try to load from localStorage first
    const savedData = FileManager.loadData(`${moduleId}_project`);
    
    if (savedData && savedData.files) {
        AppState.files = savedData.files;
    } else {
        // Generate default content based on module
        AppState.files = {
            html: generateDefaultHTML(moduleId),
            css: generateDefaultCSS(moduleId),
            js: generateDefaultJS(moduleId),
            json: generateDefaultConfig(moduleId)
        };
    }
    
    // Load into editor
    loadFile(document.getElementById('fileSelector').value);
    updatePreview();
}

// File Operations
function loadFile(fileType) {
    const editor = document.getElementById('editorTextarea');
    editor.value = AppState.files[fileType] || '';
    highlightEditor();
}

function saveCurrent() {
    const fileType = document.getElementById('fileSelector').value;
    const editor = document.getElementById('editorTextarea');
    AppState.files[fileType] = editor.value;
    
    FileManager.saveAllFiles();
    updateStatistics();
}

function formatCode() {
    const fileType = document.getElementById('fileSelector').value;
    const editor = document.getElementById('editorTextarea');
    let code = editor.value;
    
    // Simple formatting (in production, use a proper formatter)
    if (fileType === 'json') {
        try {
            code = JSON.stringify(JSON.parse(code), null, 2);
        } catch (e) {
            showToast('Invalid JSON format', 'error');
            return;
        }
    }
    
    editor.value = code;
    showToast('Code formatted', 'success');
}

function undoCode() {
    // Implement undo functionality
    document.execCommand('undo');
}

function redoCode() {
    // Implement redo functionality
    document.execCommand('redo');
}

function highlightEditor() {
    // Simple syntax highlighting could be added here
    // For now, just update the preview
}

// Preview Functions
function updatePreview() {
    const frame = document.getElementById('previewFrame');
    const { html, css, js } = AppState.files;
    
    const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    
    frame.srcdoc = previewContent;
}

function refresTechPreview() {
    updatePreview();
    showToast('Preview refreshed', 'info');
}

function toggleFullscreen() {
    const container = document.getElementById('previewContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            showToast('Fullscreen not supported', 'warning');
        });
    } else {
        document.exitFullscreen();
    }
}

// Preview Mode Controls
function setPreviewMode(mode) {
    AppState.previewMode = mode;
    
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(mode));
    });
    
    const workspace = document.querySelector('.workspace');
    workspace.classList.remove('preview-mode-data', 'preview-mode-code');
    
    if (mode !== 'preview') {
        workspace.classList.add(`preview-mode-${mode}`);
        // Show data or code view instead of preview
        if (mode === 'data') {
            showDataView();
        } else if (mode === 'code') {
            switchEditorTab('editor');
        }
    }
    
    showToast(`Preview mode: ${mode}`, 'info');
}

function showDataView() {
    // Show data/table view instead of preview
    const frame = document.getElementById('previewFrame');
    frame.srcdoc = `
        <html>
        <head>
            <style>
                body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
                h2 { color: #6366f1; }
                table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { background: #6366f1; color: white; }
                tr:hover { background: #f1f5f9; }
            </style>
        </head>
        <body>
            <h2><i class="fas fa-table"></i> Data View</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Sample Data 1</td><td>Text</td><td>Active</td><td>2024-01-15</td></tr>
                    <tr><td>2</td><td>Sample Data 2</td><td>Image</td><td>Active</td><td>2024-01-16</td></tr>
                    <tr><td>3</td><td>Sample Data 3</td><td>Video</td><td>Draft</td><td>2024-01-17</td></tr>
                </tbody>
            </table>
        </body>
        </html>
    `;
}

// Device Mode Controls
function setDeviceMode(device) {
    AppState.deviceMode = device;
    
    document.querySelectorAll('.btn-device').forEach(btn => {
        const iconClass = btn.querySelector('i').className;
        const isActive = 
            (device === 'desktop' && iconClass.includes('desktop')) ||
            (device === 'tablet' && iconClass.includes('tablet')) ||
            (device === 'mobile' && iconClass.includes('mobile'));
        btn.classList.toggle('active', isActive);
    });
    
    const container = document.getElementById('previewContainer');
    container.className = `preview-container ${device}`;
    
    showToast(`Device mode: ${device}`, 'info');
}

// Editor Tab Switching
function switchEditorTab(tab) {
    AppState.currentTab = tab;
    
    document.querySelectorAll('.panel-tab').forEach(t => {
        t.classList.toggle('active', t.textContent.toLowerCase().includes(tab));
    });
    
    document.getElementById('editorContainer').querySelectorAll('.code-editor, .properties-panel, .history-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    document.getElementById(`${tab}Panel`)?.classList.remove('hidden');
    document.getElementById('codeEditor')?.classList.toggle('hidden', tab !== 'editor');
    
    if (tab === 'properties') {
        loadPropertiesPanel();
    } else if (tab === 'history') {
        loadHistoryPanel();
    }
}

function loadPropertiesPanel() {
    const panel = document.getElementById('propertiesPanel');
    panel.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--primary-color);">Module Properties</h3>
        <div class="form-group">
            <label>Module ID</label>
            <input type="text" value="${AppState.currentModule}" readonly>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" placeholder="Enter title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select>
                <option>AI Core</option>
                <option>Data Management</option>
                <option>Development</option>
                <option>Analytics</option>
            </select>
        </div>
        <div class="form-group">
            <label>Tags</label>
            <input type="text" placeholder="Comma separated tags">
        </div>
        <button class="btn-action btn-primary" onclick="saveProperties()" style="margin-top: 15px;">
            <i class="fas fa-save"></i> Save Properties
        </button>
    `;
}

function loadHistoryPanel() {
    const panel = document.getElementById('historyPanel');
    panel.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--primary-color);">Edit History</h3>
        <div class="activity-list">
            ${AppState.activityLog.map(log => `
                <div class="activity-item">
                    <i class="fas fa-clock"></i>
                    <span>${new Date(log.timestamp).toLocaleString()} - ${log.message}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function saveProperties() {
    FileManager.saveAllFiles();
    showToast('Properties saved', 'success');
}

// Chat Functions
function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response (in production, call actual AI API)
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function addChatMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">${content}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleChatKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChat();
    }
}

function clearChat() {
    document.getElementById('chatMessages').innerHTML = `
        <div class="message ai">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">Chat cleared. How can I help you?</div>
        </div>
    `;
    AppState.chatHistory = [];
}

function insertPrompt(text) {
    const input = document.getElementById('chatInput');
    input.value = text + (input.value ? ' ' + input.value : '');
    input.focus();
}

function generateAIResponse(message) {
    // Simple response generator (replace with actual AI integration)
    const responses = [
        "Saya akan membantu Anda dengan itu. Bisa berikan lebih detail?",
        "Tentu! Berikut adalah solusi yang saya rekomendasikan...",
        "Pertanyaan yang bagus! Mari kita bahas langkah demi langkah.",
        "Saya mengerti. Ini adalah pendekatan terbaik untuk kTechAsus Anda.",
        "Baik, saya akan buatkan kode untuk kebutuhan Anda."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Publish Functions
function publisTechProject() {
    const projectName = document.getElementById('projectName').value;
    const environment = document.getElementById('environment').value;
    const version = document.getElementById('version').value;
    
    if (!projectName) {
        showToast('Please enter project name', 'error');
        return;
    }
    
    // Save all files first
    saveCurrent();
    
    // Simulate publishing
    showToast(`Publishing to ${environment}...`, 'info');
    
    setTimeout(() => {
        FileManager.logActivity(`Published ${projectName} v${version} to ${environment}`, 'publish');
        showToast('Project published successfully!', 'success');
    }, 2000);
}

function exportAsZip() {
    // In production, use JSZip library
    saveCurrent();
    showToast('Exporting as ZIP...', 'info');
    setTimeout(() => {
        showToast('ZIP downloaded', 'success');
    }, 1000);
}

function copyLink() {
    const dummyLink = window.location.href + '#project/' + AppState.currentModule;
    navigator.clipboard.writeText(dummyLink).then(() => {
        showToast('Link copied to clipboard', 'success');
    });
}

function generateQR() {
    showToast('Generating QR code...', 'info');
    // In production, use a QR code library
    setTimeout(() => {
        showToast('QR code generated', 'success');
    }, 1000);
}

// Run Code
function runCode() {
    saveCurrent();
    updatePreview();
    showToast('Code executed successfully!', 'success');
}

// Statistics
function updateStatistics() {
    const files = Object.values(AppState.files);
    const totalLines = files.reduce((acc, file) => acc + (file.split('\n').length), 0);
    const totalSize = new Blob(files).size;
    
    document.getElementById('statFiles').textContent = Object.keys(AppState.files).length;
    document.getElementById('statSize').textContent = formatBytes(totalSize);
    document.getElementById('statLines').textContent = totalLines;
    document.getElementById('statErrors').textContent = '0';
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Default Content Generators
function generateDefaultHTML(moduleId) {
    return `<!-- ${moduleId} Module -->
<div class="${moduleId}-container">
    <header>
        <h1>${moduleId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h1>
    </header>
    <main>
        <p>Welcome to ${moduleId} module. Start building your content here.</p>
        <button class="btn-primary" onclick="handleClick()">Click Me</button>
    </main>
</div>`;
}

function generateDefaultCSS(moduleId) {
    return `/* ${moduleId} Styles */
.${moduleId}-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
}

.${moduleId}-container header {
    text-align: center;
    margin-bottom: 2rem;
}

.${moduleId}-container h1 {
    color: #6366f1;
    font-size: 2rem;
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}`;
}

function generateDefaultJS(moduleId) {
    return `// ${moduleId} Logic
console.log('${moduleId} module loaded');

function handleClick() {
    alert('Button clicked in ${moduleId}!');
    console.log('Interaction detected');
}

// Initialize module
document.addEventListener('DOMContentLoaded', () => {
    console.log('${moduleId} initialized');
});`;
}

function generateDefaultConfig(moduleId) {
    return JSON.stringify({
        module: moduleId,
        version: "1.0.0",
        settings: {
            theme: "dark",
            responsive: true,
            animations: true
        },
        metadata: {
            created: new Date().toISOString(),
            author: "AI Studio Digital"
        }
    }, null, 2);
}

// Sidebar Toggle Function
function toggleSidebar(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        
        // Update toggle button icon
        const toggleBtn = sidebar.querySelector('.btn-toggle-sidebar i');
        if (toggleBtn) {
            if (sidebar.classList.contains('collapsed')) {
                toggleBtn.classList.remove('fa-chevron-left');
                toggleBtn.classList.add('fa-chevron-right');
            } else {
                toggleBtn.classList.remove('fa-chevron-right');
                toggleBtn.classList.add('fa-chevron-left');
            }
        }
    }
}

// PUSAT System - Main JavaScript

// File statistics
let fileStats = {
    js: 0,
    css: 0,
    html: 0,
    folders: 0,
    total: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    loadFileStatistics();
    loadFileBrowser();
    loadTreeView();
    updateTimestamp();
    initChart();
});

// Tab Navigation
function initTabs() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and target content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Load File Statistics
async function loadFileStatistics() {
    try {
        // Simulating file count (in real implementation, this would fetch from server)
        // For demo purposes, we'll use reasonable estimates based on the workspace
        fileStats.js = Math.floor(Math.random() * 500) + 2000;
        fileStats.css = Math.floor(Math.random() * 300) + 1000;
        fileStats.html = Math.floor(Math.random() * 100) + 50;
        fileStats.folders = Math.floor(Math.random() * 50) + 20;
        fileStats.total = fileStats.js + fileStats.css + fileStats.html;

        // Update DOM
        document.getElementById('total-js-files').textContent = fileStats.js.toLocaleString();
        document.getElementById('total-css-files').textContent = fileStats.css.toLocaleString();
        document.getElementById('total-html-files').textContent = fileStats.html.toLocaleString();
        document.getElementById('total-folders').textContent = fileStats.folders.toLocaleString();
        document.getElementById('footer-total-files').textContent = fileStats.total.toLocaleString();

        console.log('File statistics loaded:', fileStats);
    } catch (error) {
        console.error('Error loading file statistics:', error);
    }
}

// Load File Browser
function loadFileBrowser() {
    const fileBrowser = document.getElementById('file-browser');
    
    // Sample file structure for demonstration
    const sampleFiles = [
        { name: 'digital.html', type: 'html', size: '45 KB', icon: '🌐' },
        { name: 'app.js', type: 'js', size: '128 KB', icon: '📄' },
        { name: 'style.css', type: 'css', size: '67 KB', icon: '🎨' },
        { name: 'config.json', type: 'json', size: '12 KB', icon: '⚙️' },
        { name: 'README.md', type: 'md', size: '8 KB', icon: '📝' },
        { name: 'package.json', type: 'json', size: '5 KB', icon: '📦' },
        { name: 'server.js', type: 'js', size: '234 KB', icon: '📄' },
        { name: 'database.sql', type: 'sql', size: '512 KB', icon: '🗄️' },
        { name: 'main.py', type: 'py', size: '89 KB', icon: '🐍' },
        { name: 'utils.js', type: 'js', size: '45 KB', icon: '📄' }
    ];

    let html = '';
    sampleFiles.forEach(file => {
        html += `
            <div class="file-item">
                <span class="file-icon">${file.icon}</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${file.size}</span>
            </div>
        `;
    });

    fileBrowser.innerHTML = html;
}

// Load Tree View
function loadTreeView() {
    const treeView = document.getElementById('tree-view');
    
    // Sample tree structure
    const treeStructure = {
        name: 'workspace',
        type: 'folder',
        children: [
            {
                name: 'pusat',
                type: 'folder',
                children: [
                    { name: 'digital.html', type: 'file' },
                    { name: 'css', type: 'folder', children: [
                        { name: 'pusat.css', type: 'file' }
                    ]},
                    { name: 'js', type: 'folder', children: [
                        { name: 'pusat.js', type: 'file' }
                    ]},
                    { name: 'config', type: 'folder' },
                    { name: 'datacenter', type: 'folder' },
                    { name: 'filemanager', type: 'folder' },
                    { name: 'studio-ai', type: 'folder' },
                    { name: 'hosting', type: 'folder' },
                    { name: 'domain', type: 'folder' },
                    { name: 'status-monitoring', type: 'folder' }
                ]
            },
            {
                name: 'srv',
                type: 'folder',
                children: [
                    { name: 'app-browser.srv.js', type: 'file' },
                    { name: 'app-calculator.srv.js', type: 'file' },
                    { name: 'service-network.srv.js', type: 'file' }
                ]
            },
            {
                name: 'component',
                type: 'folder',
                children: [
                    { name: 'digital.html', type: 'file' },
                    { name: 'component_list.json', type: 'file' },
                    { name: 'css', type: 'folder' },
                    { name: 'js', type: 'folder' }
                ]
            },
            { name: 'ai', type: 'folder' },
            { name: 'db', type: 'folder' },
            { name: 'view', type: 'folder' }
        ]
    };

    function renderTree(node, level = 0) {
        let html = '';
        const indent = level * 20;
        
        if (node.type === 'folder') {
            html += `
                <div class="tree-node" style="padding-left: ${indent}px">
                    <span>📁</span>
                    <span>${node.name}</span>
                </div>
            `;
            
            if (node.children) {
                html += '<div class="tree-children">';
                node.children.forEach(child => {
                    html += renderTree(child, level + 1);
                });
                html += '</div>';
            }
        } else {
            html += `
                <div class="tree-node" style="padding-left: ${indent}px">
                    <span>📄</span>
                    <span>${node.name}</span>
                </div>
            `;
        }
        
        return html;
    }

    treeView.innerHTML = renderTree(treeStructure);
}

// Update Timestamp
function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('last-updated').textContent = formatted;
}

// File Manager Functions
function refreshFiles() {
    loadFileBrowser();
    loadFileStatistics();
    showNotification('File refreshed successfully!', 'success');
}

function createNewFolder() {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
        showNotification(`Folder "${folderName}" created!`, 'success');
    }
}

function uploadFile() {
    showNotification('Upload dialog opened', 'info');
}

// Studio AI Functions
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chat-messages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `<div class="message-content">${escapeHtml(message)}</div>`;
    chatMessages.appendChild(userMsg);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai-message';
        aiMsg.innerHTML = `
            <div class="message-content">
                Terima kasih atas pertanyaan Anda! Saya adalah asisten AI yang terintegrasi dengan sistem PUSAT. 
                Saya dapat membantu Anda dengan:
                <ul>
                    <li>Analisis kode dan struktur file</li>
                    <li>Rekomendasi best practices</li>
                    <li>Debugging dan troubleshooting</li>
                    <li>Optimisasi performa</li>
                </ul>
                Silakan tanyakan sesuatu tentang proyek Anda!
            </div>
        `;
        chatMessages.appendChild(aiMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add code suggestions
        addCodeSuggestions();
    }, 1000);
}

function addCodeSuggestions() {
    const suggestionsPanel = document.getElementById('code-suggestions');
    suggestionsPanel.innerHTML = `
        <div class="code-suggestion">
            <h4>📊 File Analysis</h4>
            <p>Sistem Anda memiliki ${fileStats.total.toLocaleString()} file dengan struktur yang baik.</p>
        </div>
        <div class="code-suggestion">
            <h4>💡 Optimization Tip</h4>
            <p>Pertimbangkan untuk mengompres file CSS dan JS untuk meningkatkan performa loading.</p>
        </div>
        <div class="code-suggestion">
            <h4>🔒 Security Notice</h4>
            <pre>// Pastikan semua endpoint API menggunakan HTTPS
// Implementasikan rate limiting untuk mencegah DDoS
// Gunakan environment variables untuk sensitive data</pre>
        </div>
    `;
}

// Hosting Functions
function deployTo(environment) {
    const envNames = {
        'production': 'Production',
        'staging': 'Staging',
        'development': 'Development'
    };
    
    if (confirm(`Deploy to ${envNames[environment]}?`)) {
        showNotification(`Deploying to ${envNames[environment]}...`, 'info');
        setTimeout(() => {
            showNotification(`Successfully deployed to ${envNames[environment]}!`, 'success');
        }, 2000);
    }
}

// Configuration Functions
function saveConfig() {
    const config = {
        siteName: document.getElementById('site-name').value,
        language: document.getElementById('language').value,
        theme: document.getElementById('theme').value,
        defaultFolder: document.getElementById('default-folder').value,
        autoRefresh: document.getElementById('auto-refresh').checked,
        showHidden: document.getElementById('show-hidden').checked,
        aiModel: document.getElementById('ai-model').value,
        aiContext: document.getElementById('ai-context').value
    };
    
    localStorage.setItem('pusat_config', JSON.stringify(config));
    showNotification('Configuration saved successfully!', 'success');
}

function resetConfig() {
    if (confirm('Reset all settings to default?')) {
        localStorage.removeItem('pusat_config');
        location.reload();
    }
}

function exportConfig() {
    const config = localStorage.getItem('pusat_config') || '{}';
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pusat-config.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Configuration exported!', 'success');
}

// Initialize Chart
function initChart() {
    const canvas = document.getElementById('resource-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Simple line chart simulation
    const data = [45, 52, 48, 55, 62, 58, 65, 70, 68, 72, 75, 78];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (height - 2 * padding) * i / 4;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (width - 2 * padding) * index / (data.length - 1);
        const y = padding + (height - 2 * padding) * (1 - (value - min) / range);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#2563eb';
    data.forEach((value, index) => {
        const x = padding + (width - 2 * padding) * index / (data.length - 1);
        const y = padding + (height - 2 * padding) * (1 - (value - min) / range);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Context value display
const contextSlider = document.getElementById('ai-context');
if (contextSlider) {
    contextSlider.addEventListener('input', function() {
        document.getElementById('context-value').textContent = this.value;
    });
}

console.log('PUSAT System initialized successfully! 🏛️');

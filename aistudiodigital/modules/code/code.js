// Code Module - AI Generated Files Manager
const CodeModule = {
    files: [],
    currentFile: null,
    expandedFolders: new Set(),
    
    // Initialize module
    init() {
        this.loadFiles();
        this.renderTree();
        this.setupEventListeners();
    },
    
    // Load files from localStorage
    loadFiles() {
        const stored = localStorage.getItem('aiStudio_codeFiles');
        if (stored) {
            this.files = JSON.parse(stored);
        } else {
            // Default files
            this.files = [
                {
                    id: 'root',
                    name: 'Project',
                    type: 'folder',
                    children: [
                        {
                            id: 'html',
                            name: 'digital.html',
                            type: 'file',
                            language: 'html',
                            content: '<!DOCTYPE html>\n<html>\n<head>\n    <title>AI Studio</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>',
                            created: Date.now(),
                            modified: Date.now()
                        },
                        {
                            id: 'css',
                            name: 'style.css',
                            type: 'file',
                            language: 'css',
                            content: 'body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #667eea;\n}',
                            created: Date.now(),
                            modified: Date.now()
                        },
                        {
                            id: 'js',
                            name: 'script.js',
                            type: 'file',
                            language: 'js',
                            content: '// AI Generated JavaScript\ndocument.addEventListener("DOMContentLoaded", () => {\n    console.log("AI Studio initialized");\n});',
                            created: Date.now(),
                            modified: Date.now()
                        }
                    ]
                }
            ];
            this.saveFiles();
        }
    },
    
    // Save files to localStorage
    saveFiles() {
        localStorage.setItem('aiStudio_codeFiles', JSON.stringify(this.files));
    },
    
    // Render file tree
    renderTree() {
        const treeContainer = document.getElementById('codeFileTree');
        if (!treeContainer) return;
        
        treeContainer.innerHTML = '';
        const rootNode = this.files[0];
        if (rootNode) {
            treeContainer.appendChild(this.createTreeNode(rootNode, true));
        }
    },
    
    // Create tree node
    createTreeNode(node, isRoot = false) {
        const div = document.createElement('div');
        div.className = 'tree-node';
        
        const item = document.createElement('div');
        item.className = 'tree-item' + (this.currentFile && this.currentFile.id === node.id ? ' active' : '');
        
        const icon = document.createElement('span');
        icon.className = 'icon';
        
        if (node.type === 'folder') {
            icon.innerHTML = '<i class="fas fa-folder folder-icon"></i>';
            const expanded = this.expandedFolders.has(node.id);
            if (expanded) {
                icon.innerHTML = '<i class="fas fa-folder-open folder-icon"></i>';
            }
        } else {
            const ext = node.name.split('.').pop();
            let iconClass = 'fa-file';
            if (ext === 'html') iconClass = 'fa-html5';
            else if (ext === 'css') iconClass = 'fa-css3-alt';
            else if (ext === 'js') iconClass = 'fa-js';
            else if (ext === 'json') iconClass = 'fa-code';
            icon.innerHTML = `<i class="fab ${iconClass} file-icon"></i>`;
        }
        
        const name = document.createElement('span');
        name.textContent = node.name;
        
        item.appendChild(icon);
        item.appendChild(name);
        
        item.onclick = () => {
            if (node.type === 'folder') {
                this.toggleFolder(node.id);
            } else {
                this.selectFile(node);
            }
        };
        
        div.appendChild(item);
        
        if (node.type === 'folder' && node.children) {
            const children = document.createElement('div');
            children.className = 'tree-children' + (this.expandedFolders.has(node.id) || isRoot ? ' expanded' : '');
            
            node.children.forEach(child => {
                children.appendChild(this.createTreeNode(child));
            });
            
            div.appendChild(children);
        }
        
        return div;
    },
    
    // Toggle folder expansion
    toggleFolder(folderId) {
        if (this.expandedFolders.has(folderId)) {
            this.expandedFolders.delete(folderId);
        } else {
            this.expandedFolders.add(folderId);
        }
        this.renderTree();
    },
    
    // Expand all folders
    expandAll() {
        this.expandAllFolders(this.files[0]);
        this.renderTree();
    },
    
    expandAllFolders(node) {
        if (node.type === 'folder') {
            this.expandedFolders.add(node.id);
            if (node.children) {
                node.children.forEach(child => this.expandAllFolders(child));
            }
        }
    },
    
    // Collapse all folders
    collapseAll() {
        this.expandedFolders.clear();
        this.renderTree();
    },
    
    // Select file
    selectFile(file) {
        this.currentFile = file;
        this.renderTree();
        
        // Update editor
        const editor = document.getElementById('codeEditorArea');
        if (editor) {
            editor.value = file.content || '';
        }
        
        // Update properties
        this.updateProperties(file);
        
        // Update preview
        this.updatePreview();
    },
    
    // Update properties panel
    updateProperties(file) {
        document.getElementById('propFileName').textContent = file.name;
        document.getElementById('propFileType').textContent = file.language || 'Unknown';
        document.getElementById('propFileSize').textContent = this.formatSize(file.content?.length || 0);
        document.getElementById('propFileCreated').textContent = new Date(file.created).toLocaleString();
        document.getElementById('propFileModified').textContent = new Date(file.modified).toLocaleString();
        document.getElementById('propFileLines').textContent = (file.content?.split('\n').length || 0);
    },
    
    // Format file size
    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        return (bytes / 1024).toFixed(2) + ' KB';
    },
    
    // Update preview
    updatePreview() {
        const frame = document.getElementById('codePreviewFrame');
        if (!frame) return;
        
        const htmlFile = this.findFileByName('digital.html');
        const cssFile = this.findFileByName('style.css');
        const jsFile = this.findFileByName('script.js');
        
        let content = htmlFile?.content || '<h1>No HTML file</h1>';
        
        if (cssFile) {
            content = content.replace('</head>', `<style>${cssFile.content}</style></head>`);
        }
        
        if (jsFile) {
            content = content.replace('</body>', `<script>${jsFile.content}<\/script></body>`);
        }
        
        frame.srcdoc = content;
    },
    
    // Find file by name
    findFileByName(name, children = this.files[0]?.children) {
        if (!children) return null;
        
        for (const child of children) {
            if (child.name === name && child.type === 'file') {
                return child;
            }
            if (child.type === 'folder' && child.children) {
                const found = this.findFileByName(name, child.children);
                if (found) return found;
            }
        }
        return null;
    },
    
    // Switch tab
    switchTab(tabName) {
        document.querySelectorAll('#code-module .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('#code-module .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelector(`#code-module .tab-btn[data-tab="${tabName}"]`)?.classList.add('active');
        document.getElementById(`${tabName}Tab`)?.classList.add('active');
        
        if (tabName === 'preview') {
            this.updatePreview();
        }
    },
    
    // Change language
    changeLanguage() {
        const select = document.getElementById('codeFileType');
        if (this.currentFile) {
            this.currentFile.language = select.value;
        }
    },
    
    // Format code
    formatCode() {
        // Simple formatting (in production, use a proper formatter)
        const editor = document.getElementById('codeEditorArea');
        if (!editor || !this.currentFile) return;
        
        // Basic indentation fix
        let content = editor.value;
        content = content.replace(/\t/g, '    ');
        editor.value = content;
        this.currentFile.content = content;
        this.currentFile.modified = Date.now();
        this.saveFiles();
    },
    
    // Undo (placeholder)
    undo() {
        console.log('Undo not implemented');
    },
    
    // Redo (placeholder)
    redo() {
        console.log('Redo not implemented');
    },
    
    // Save file
    saveFile() {
        if (!this.currentFile) return;
        
        const editor = document.getElementById('codeEditorArea');
        this.currentFile.content = editor.value;
        this.currentFile.modified = Date.now();
        this.saveFiles();
        
        this.updateProperties(this.currentFile);
        this.updatePreview();
        
        alert('File saved successfully!');
    },
    
    // New file
    newFile() {
        const name = prompt('Enter file name (e.g., page.html):');
        if (!name) return;
        
        const ext = name.split('.').pop();
        let language = 'text';
        if (ext === 'html') language = 'html';
        else if (ext === 'css') language = 'css';
        else if (ext === 'js') language = 'js';
        else if (ext === 'json') language = 'json';
        
        const newFile = {
            id: 'file_' + Date.now(),
            name: name,
            type: 'file',
            language: language,
            content: '',
            created: Date.now(),
            modified: Date.now()
        };
        
        this.files[0].children.push(newFile);
        this.saveFiles();
        this.renderTree();
        this.selectFile(newFile);
    },
    
    // Refresh
    refresh() {
        this.loadFiles();
        this.renderTree();
        if (this.currentFile) {
            this.selectFile(this.currentFile);
        }
    },
    
    // Settings
    settings() {
        alert('Code module settings coming soon!');
    },
    
    // Setup event listeners
    setupEventListeners() {
        const editor = document.getElementById('codeEditorArea');
        if (editor) {
            editor.addEventListener('input', () => {
                if (this.currentFile) {
                    this.currentFile.content = editor.value;
                }
            });
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    CodeModule.init();
});

// Code Manager Module - Manages all code files with localStorage persistence

const CodeManager = {
    files: [],
    currentFile: null,
    openTabs: [],

    init() {
        this.loadFiles();
        this.setupEventListeners();
        this.renderFileTree();
    },

    loadFiles() {
        const stored = localStorage.getItem('aiStudio_codeFiles');
        if (stored) {
            this.files = JSON.parse(stored);
        } else {
            // Default files
            this.files = [
                { id: 1, name: 'index.html', type: 'html', content: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Project</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>', path: '/', modified: new Date().toISOString() },
                { id: 2, name: 'style.css', type: 'css', content: 'body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}', path: '/', modified: new Date().toISOString() },
                { id: 3, name: 'script.js', type: 'js', content: 'console.log("Hello World");', path: '/', modified: new Date().toISOString() }
            ];
            this.saveFiles();
        }
    },

    saveFiles() {
        localStorage.setItem('aiStudio_codeFiles', JSON.stringify(this.files));
    },

    setupEventListeners() {
        document.getElementById('newFileBtn')?.addEventListener('click', () => this.newFile());
        document.getElementById('newFolderBtn')?.addEventListener('click', () => this.newFolder());
        document.getElementById('uploadBtn')?.addEventListener('click', () => this.uploadFile());
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.downloadAll());
        document.getElementById('saveBtn')?.addEventListener('click', () => this.saveCurrentFile());
        document.getElementById('saveAsBtn')?.addEventListener('click', () => this.saveAsFile());
        document.getElementById('deleteBtn')?.addEventListener('click', () => this.deleteFile());
        document.getElementById('codeEditor')?.addEventListener('input', () => this.onContentChange());
    },

    renderFileTree() {
        const tree = document.getElementById('fileTree');
        if (!tree) return;

        tree.innerHTML = '';
        const folders = {};
        
        this.files.forEach(file => {
            const path = file.path || '/';
            if (!folders[path]) folders[path] = [];
            folders[path].push(file);
        });

        Object.keys(folders).sort().forEach(path => {
            if (path !== '/') {
                const folderItem = document.createElement('div');
                folderItem.className = 'file-tree-item';
                folderItem.innerHTML = '<i class="fas fa-folder"></i> ' + path.replace('/', '');
                tree.appendChild(folderItem);
            }
            
            folders[path].forEach(file => {
                const item = document.createElement('div');
                item.className = 'file-tree-item';
                item.dataset.id = file.id;
                const icon = file.type === 'html' ? 'fa-file-code' : file.type === 'css' ? 'fa-file-css' : 'fa-file-alt';
                item.innerHTML = `<i class="fas ${icon}"></i> ${file.name}`;
                item.onclick = () => this.selectFile(file.id);
                tree.appendChild(item);
            });
        });
    },

    selectFile(id) {
        const file = this.files.find(f => f.id === id);
        if (!file) return;

        this.currentFile = file;
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('fileType').textContent = file.type.toUpperCase();
        document.getElementById('fileSize').textContent = (file.content.length / 1024).toFixed(2) + ' KB';
        document.getElementById('lastModified').textContent = new Date(file.modified).toLocaleString();
        document.getElementById('codeEditor').value = file.content;

        // Add tab if not exists
        if (!this.openTabs.includes(id)) {
            this.openTabs.push(id);
            this.renderTabs();
        }

        // Highlight in tree
        document.querySelectorAll('.file-tree-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id == id) item.classList.add('active');
        });
    },

    renderTabs() {
        const tabsContainer = document.getElementById('editorTabs');
        if (!tabsContainer) return;

        tabsContainer.innerHTML = '';
        this.openTabs.forEach(id => {
            const file = this.files.find(f => f.id === id);
            if (!file) return;

            const tab = document.createElement('div');
            tab.className = 'editor-tab' + (id === this.currentFile?.id ? ' active' : '');
            tab.textContent = file.name;
            tab.onclick = () => this.selectFile(id);
            tabsContainer.appendChild(tab);
        });
    },

    onContentChange() {
        if (this.currentFile) {
            this.currentFile.content = document.getElementById('codeEditor').value;
        }
    },

    saveCurrentFile() {
        if (!this.currentFile) return;
        
        this.currentFile.modified = new Date().toISOString();
        this.saveFiles();
        this.updateFileInfo();
        alert('File saved successfully!');
    },

    saveAsFile() {
        const name = prompt('Enter new file name:');
        if (!name || !this.currentFile) return;

        const newFile = {
            id: Date.now(),
            name: name,
            type: name.split('.').pop(),
            content: this.currentFile.content,
            path: '/',
            modified: new Date().toISOString()
        };

        this.files.push(newFile);
        this.saveFiles();
        this.renderFileTree();
        this.selectFile(newFile.id);
    },

    deleteFile() {
        if (!this.currentFile) return;
        
        if (confirm(`Delete ${this.currentFile.name}?`)) {
            this.files = this.files.filter(f => f.id !== this.currentFile.id);
            this.openTabs = this.openTabs.filter(id => id !== this.currentFile.id);
            this.saveFiles();
            this.renderFileTree();
            this.renderTabs();
            this.currentFile = null;
            document.getElementById('codeEditor').value = '';
            this.clearFileInfo();
        }
    },

    newFile() {
        const name = prompt('Enter file name (e.g., style.css):');
        if (!name) return;

        const newFile = {
            id: Date.now(),
            name: name,
            type: name.split('.').pop(),
            content: '',
            path: '/',
            modified: new Date().toISOString()
        };

        this.files.push(newFile);
        this.saveFiles();
        this.renderFileTree();
        this.selectFile(newFile.id);
    },

    newFolder() {
        const name = prompt('Enter folder name:');
        if (!name) return;
        alert('Folder created: ' + name);
    },

    uploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const newFile = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        type: file.name.split('.').pop(),
                        content: event.target.result,
                        path: '/',
                        modified: new Date().toISOString()
                    };
                    this.files.push(newFile);
                    this.saveFiles();
                    this.renderFileTree();
                };
                reader.readAsText(file);
            });
        };
        input.click();
    },

    downloadAll() {
        const zipContent = this.files.map(f => `/* ${f.name} */\n${f.content}`).join('\n\n');
        const blob = new Blob([zipContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project-files.txt';
        a.click();
        URL.revokeObjectURL(url);
    },

    updateFileInfo() {
        if (this.currentFile) {
            document.getElementById('fileSize').textContent = (this.currentFile.content.length / 1024).toFixed(2) + ' KB';
            document.getElementById('lastModified').textContent = new Date(this.currentFile.modified).toLocaleString();
        }
    },

    clearFileInfo() {
        document.getElementById('fileName').textContent = '-';
        document.getElementById('fileType').textContent = '-';
        document.getElementById('fileSize').textContent = '-';
        document.getElementById('lastModified').textContent = '-';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => CodeManager.init());

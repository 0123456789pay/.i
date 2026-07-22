// IHBSF Configuration - Data Storage System
const IHBSF_CONFIG = {
    version: '1.0.0',
    storagePath: '/workspace/dataihbsf',
    mainFolders: ['I', 'H', 'B', 'S', 'F'],
    subFolders: ['h', 't', 'm', 'l', 'c', 's', 'S', 'j', '`s'],
    
    // Auto-save configuration
    autoSave: {
        enabled: true,
        interval: 5000, // 5 seconds
        path: '/workspace/dataihbsf'
    },
    
    // File type mappings
    fileTypes: {
        html: 'l',
        css: 'c',
        js: 'j'
    },
    
    // Initialize storage
    initStorage: function() {
        console.log('IHBSF Storage initialized at:', this.storagePath);
        return true;
    },
    
    // Save data to storage
    saveData: function(key, data) {
        const timestamp = new Date().toISOString();
        const storageData = {
            key: key,
            data: data,
            timestamp: timestamp,
            folder: this.getCurrentFolder()
        };
        
        // Store in localStorage for browser persistence
        localStorage.setItem('ihbsf_' + key, JSON.stringify(storageData));
        console.log('Data saved:', key);
        return storageData;
    },
    
    // Load data from storage
    loadData: function(key) {
        const stored = localStorage.getItem('ihbsf_' + key);
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    },
    
    // Get current folder context
    getCurrentFolder: function() {
        const path = window.location.pathname;
        const match = path.match(/\/([IHBFS])\//);
        return match ? match[1] : 'I';
    },
    
    // Get all menu items
    getMenuItems: function() {
        return this.mainFolders.map(folder => ({
            name: folder,
            path: `../${folder}/index.html`,
            active: folder === this.getCurrentFolder()
        }));
    }
};

// Auto-initialize
IHBSF_CONFIG.initStorage();

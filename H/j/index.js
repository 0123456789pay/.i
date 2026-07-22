// IHBSF Index Controller - Auto-load files and manage menus
document.addEventListener('DOMContentLoaded', function() {
    console.log('IHBSF Index loaded');
    
    // Load file lists dynamically
    loadFileLists();
    
    // Setup auto-save for menu interactions
    setupAutoSave();
    
    // Update navigation
    updateNavigation();
});

// Load all files from current folder structure
function loadFileLists() {
    const currentFolder = IHBSF_CONFIG.getCurrentFolder();
    
    // HTML Files
    const htmlList = document.getElementById('html-list');
    if (htmlList) {
        loadFilesFromFolder(currentFolder, 'l', htmlList);
    }
    
    // CSS Files
    const cssList = document.getElementById('css-list');
    if (cssList) {
        loadFilesFromFolder(currentFolder, 'c', cssList);
    }
    
    // JS Files
    const jsList = document.getElementById('js-list');
    if (jsList) {
        loadFilesFromFolder(currentFolder, 'j', jsList);
    }
}

// Load files from specific subfolder
function loadFilesFromFolder(mainFolder, subFolder, listElement) {
    // Simulate file listing (in real implementation, this would fetch from server)
    const sampleFiles = [
        { name: 'index.html', type: 'html' },
        { name: 'app.html', type: 'html' },
        { name: 'dashboard.html', type: 'html' }
    ];
    
    listElement.innerHTML = '';
    sampleFiles.forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${subFolder}/${file.name}`;
        link.textContent = file.name;
        link.onclick = function(e) {
            e.preventDefault();
            IHBSF_CONFIG.saveData('lastAccessed', { file: file.name, time: new Date() });
            window.location.href = this.href;
        };
        li.appendChild(link);
        listElement.appendChild(li);
    });
    
    // Add note about total files
    const infoLi = document.createElement('li');
    infoLi.style.color = '#666';
    infoLi.style.fontStyle = 'italic';
    infoLi.textContent = `... dan file lainnya di folder ${mainFolder}/${subFolder}/`;
    listElement.appendChild(infoLi);
}

// Setup auto-save functionality
function setupAutoSave() {
    if (IHBSF_CONFIG.autoSave.enabled) {
        setInterval(function() {
            const activityData = {
                url: window.location.href,
                timestamp: new Date().toISOString(),
                folder: IHBSF_CONFIG.getCurrentFolder()
            };
            IHBSF_CONFIG.saveData('activity', activityData);
        }, IHBSF_CONFIG.autoSave.interval);
    }
}

// Update navigation based on current folder
function updateNavigation() {
    const menuItems = IHBSF_CONFIG.getMenuItems();
    const nav = document.querySelector('nav');
    
    if (nav && nav.children.length === 0) {
        menuItems.forEach((item, index) => {
            const link = document.createElement('a');
            link.href = item.path;
            link.textContent = item.name;
            if (item.active) {
                link.style.backgroundColor = '#3498db';
                link.style.color = 'white';
            }
            if (index < menuItems.length - 1) {
                nav.appendChild(link);
                nav.appendChild(document.createTextNode(' | '));
            } else {
                nav.appendChild(link);
            }
        });
    }
}

// Export functions for external use
window.IHBSF = {
    config: IHBSF_CONFIG,
    saveData: IHBSF_CONFIG.saveData.bind(IHBSF_CONFIG),
    loadData: IHBSF_CONFIG.loadData.bind(IHBSF_CONFIG),
    getCurrentFolder: IHBSF_CONFIG.getCurrentFolder.bind(IHBSF_CONFIG)
};

console.log('IHBSF system ready. Use window.IHBSF to access API.');

// IHBSF indeks Controller - otomatis-muat berkas-berkas dan manage menus
document.addEventListener('DOMContentLoaded', function() {
    console.log('IHBSF Index loaded');
    
    // muat berkas lists dynamically
    loadFileLists();
    
    // Setup otomatis-simpan untuk menu interactions
    setupAutoSave();
    
    // perbarui navigation
    updateNavigation();
});

// muat semua berkas-berkas dari current direktori structure
function loadFileLists() {
    const currentFolder = IHBSF_CONFIG.getCurrentFolder();
    
    // HTML berkas-berkas
    const htmlList = document.getElementById('html-list');
    if (htmlList) {
        loadFilesFromFolder(currentFolder, 'l', htmlList);
    }
    
    // CSS berkas-berkas
    const cssList = document.getElementById('css-list');
    if (cssList) {
        loadFilesFromFolder(currentFolder, 'c', cssList);
    }
    
    // JS berkas-berkas
    const jsList = document.getElementById('js-list');
    if (jsList) {
        loadFilesFromFolder(currentFolder, 'j', jsList);
    }
}

// muat berkas-berkas dari specific subfolder
function loadFilesFromFolder(mainFolder, subFolder, listElement) {
    // Simulate berkas listing (in real implementation, ini would fetch dari peladen)
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
    
    // Add catatan tentang jumlah berkas-berkas
    const infoLi = document.createElement('li');
    infoLi.style.color = '#666';
    infoLi.style.fontStyle = 'italic';
    infoLi.textContent = `... dan file lainnya di folder ${mainFolder}/${subFolder}/`;
    listElement.appendChild(infoLi);
}

// Setup otomatis-simpan functionality
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

// perbarui navigation based on current direktori
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

// Export functions untuk external use
window.IHBSF = {
    config: IHBSF_CONFIG,
    saveData: IHBSF_CONFIG.saveData.bind(IHBSF_CONFIG),
    loadData: IHBSF_CONFIG.loadData.bind(IHBSF_CONFIG),
    getCurrentFolder: IHBSF_CONFIG.getCurrentFolder.bind(IHBSF_CONFIG)
};

console.log('IHBSF system ready. Use window.IHBSF to access API.');

// ManajemenFile.Digital - Application Logic

// State Management
const state = {
    currentUser: null,
    currentView: 'grid',
    currentFolder: '/root',
    files: [],
    folders: [],
    digitalMenus: []
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showPage('loginPage');
    }
    
    // Load digital menus
    loadDigitalMenus();
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Forgot Password Form
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple authentication (in production, use backend API)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user || (email === 'admin@digital.com' && password === 'admin123')) {
        const currentUser = user || { name: 'Admin', email: email };
        state.currentUser = currentUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update user info in sidebar
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
        
        showDashboard();
        showToast('Login berhasil!', 'success');
    } else {
        showToast('Email atau password salah', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    if (password !== confirm) {
        showToast('Password tidak cocok', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showToast('Email sudah terdaftar', 'error');
        return;
    }
    
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showToast('Registrasi berhasil! Silakan login.', 'success');
    showPage('loginPage');
}

function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    
    // Simulate sending reset email
    showToast('Link reset password telah dikirim ke email Anda', 'success');
    setTimeout(() => {
        showPage('loginPage');
    }, 2000);
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('loginPage');
    showToast('Logout berhasil', 'success');
}

// Page Navigation
function showPage(pageId) {
    // Hide all auth pages
    document.querySelectorAll('.auth-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Hide dashboard
    document.querySelector('.dashboard-page').classList.remove('active');
    
    // Show requested page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
}

function showDashboard() {
    // Hide all auth pages
    document.querySelectorAll('.auth-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show dashboard
    document.querySelector('.dashboard-page').classList.add('active');
    
    // Update user info
    if (state.currentUser) {
        document.getElementById('userName').textContent = state.currentUser.name;
        document.getElementById('userEmail').textContent = state.currentUser.email;
        
        // Update settings form
        document.getElementById('settingName').value = state.currentUser.name;
        document.getElementById('settingEmail').value = state.currentUser.email;
    }
    
    // Load dashboard data
    loadDashboardData();
}

function showModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show requested module
    const module = document.getElementById(`module-${moduleName}`);
    if (module) {
        module.classList.add('active');
    }
    
    // Set active nav item
    const navLink = document.querySelector(`.nav-link[onclick="showModule('${moduleName}')"]`);
    if (navLink) {
        navLink.parentElement.classList.add('active');
    }
    
    // Load module-specific data
    if (moduleName === 'files') {
        loadFiles();
    } else if (moduleName === 'folders') {
        loadFolders();
    }
}

// Digital Menu System
function loadDigitalMenus() {
    // Scan for .digital configuration files and create menu items
    const digitalMenusContainer = document.getElementById('digitalMenus');
    
    // Sample digital menus (in production, fetch from server)
    const sampleMenus = [
        { name: 'Dashboard', icon: 'fa-home', module: 'dashboard' },
        { name: 'Analitik', icon: 'fa-chart-bar', module: 'analytics' },
        { name: 'Pengaturan', icon: 'fa-cog', module: 'settings' },
        { name: 'Bantuan', icon: 'fa-question-circle', module: 'help' }
    ];
    
    digitalMenusContainer.innerHTML = '';
    
    sampleMenus.forEach(menu => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <a href="#" onclick="showModule('${menu.module}')" class="nav-link">
                <i class="fas ${menu.icon}"></i>
                <span>${menu.name}</span>
            </a>
        `;
        digitalMenusContainer.appendChild(li);
    });
    
    state.digitalMenus = sampleMenus;
}

// Dashboard Data
function loadDashboardData() {
    // Load statistics
    const stats = getStorageStats();
    document.getElementById('totalFiles').textContent = stats.totalFiles;
    document.getElementById('totalFolders').textContent = stats.totalFolders;
    document.getElementById('storageUsed').textContent = stats.storageUsed;
    
    // Load recent files
    loadRecentFiles();
}

function getStorageStats() {
    // Get actual stats from file system (simulated)
    return {
        totalFiles: Math.floor(Math.random() * 100) + 50,
        totalFolders: Math.floor(Math.random() * 20) + 5,
        storageUsed: (Math.random() * 50 + 10).toFixed(1) + ' GB'
    };
}

function loadRecentFiles() {
    const recentFilesList = document.getElementById('recentFilesList');
    
    const recentFiles = [
        { name: 'Dokumen_Proyek.digital', type: 'digital', size: '2.4 MB', date: '2 menit yang lalu' },
        { name: 'Laporan_Q1.pdf', type: 'document', size: '1.8 MB', date: '15 menit yang lalu' },
        { name: 'Presentasi.pptx', type: 'document', size: '5.2 MB', date: '1 jam yang lalu' },
        { name: 'Foto_Product.jpg', type: 'image', size: '3.1 MB', date: '2 jam yang lalu' }
    ];
    
    recentFilesList.innerHTML = '';
    
    recentFiles.forEach(file => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.style.padding = '15px';
        div.style.marginBottom = '10px';
        div.onclick = () => showFileDetail(file);
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div class="file-icon ${file.type}" style="width: 40px; height: 40px; font-size: 18px; margin: 0;">
                    <i class="fas ${getFileIcon(file.type)}"></i>
                </div>
                <div style="flex: 1; text-align: left;">
                    <div class="file-name" style="margin-bottom: 3px;">${file.name}</div>
                    <div style="font-size: 11px; color: var(--text-secondary);">${file.size} • ${file.date}</div>
                </div>
            </div>
        `;
        recentFilesList.appendChild(div);
    });
}

function getFileIcon(type) {
    const icons = {
        document: 'fa-file-alt',
        image: 'fa-file-image',
        video: 'fa-file-video',
        audio: 'fa-file-audio',
        digital: 'fa-folder-open'
    };
    return icons[type] || 'fa-file';
}

// File Management
function loadFiles() {
    const fileGrid = document.getElementById('fileGrid');
    
    const files = [
        { name: 'Konfigurasi.digital', type: 'digital', size: '1.2 KB' },
        { name: 'Menu_Utama.digital', type: 'digital', size: '2.4 KB' },
        { name: 'Template_Laporan.docx', type: 'document', size: '45 KB' },
        { name: 'Data_Users.xlsx', type: 'document', size: '128 KB' },
        { name: 'Logo_Company.png', type: 'image', size: '256 KB' },
        { name: 'Video_Tutorial.mp4', type: 'video', size: '15.2 MB' },
        { name: 'Audio_Podcast.mp3', type: 'audio', size: '8.5 MB' },
        { name: 'Backup_System.zip', type: 'document', size: '125 MB' }
    ];
    
    fileGrid.innerHTML = '';
    
    files.forEach(file => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.onclick = () => showFileDetail(file);
        div.innerHTML = `
            <div class="file-icon ${file.type}">
                <i class="fas ${getFileIcon(file.type)}"></i>
            </div>
            <div class="file-name">${file.name}</div>
            <div class="file-size">${file.size}</div>
        `;
        fileGrid.appendChild(div);
    });
    
    state.files = files;
}

function filterFiles() {
    const filter = document.getElementById('fileTypeFilter').value;
    // Implement filtering logic
    loadFiles();
}

function setView(view) {
    state.currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    const fileGrid = document.getElementById('fileGrid');
    if (view === 'list') {
        fileGrid.style.gridTemplateColumns = '1fr';
    } else {
        fileGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    }
}

function showFileDetail(file) {
    const modal = document.getElementById('fileDetailModal');
    const content = document.getElementById('fileDetailContent');
    
    content.innerHTML = `
        <div style="display: flex; gap: 30px;">
            <div style="flex: 1;">
                <div class="file-icon ${file.type}" style="width: 100px; height: 100px; font-size: 48px; margin: 0 auto 20px;">
                    <i class="fas ${getFileIcon(file.type)}"></i>
                </div>
            </div>
            <div style="flex: 2;">
                <h3 style="margin-bottom: 20px; color: var(--text-primary);">${file.name}</h3>
                <div style="display: grid; gap: 15px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-secondary);">Tipe File</label>
                        <div style="font-weight: 500;">${file.type.toUpperCase()}</div>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-secondary);">Ukuran</label>
                        <div style="font-weight: 500;">${file.size}</div>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-secondary);">Lokasi</label>
                        <div style="font-weight: 500;">/root/documents</div>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-secondary);">Terakhir Diubah</label>
                        <div style="font-weight: 500;">Hari ini, 10:30</div>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-secondary);">Diupload Oleh</label>
                        <div style="font-weight: 500;">${state.currentUser?.name || 'Admin'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function downloadFile() {
    showToast('Download dimulai...', 'success');
    closeModal('fileDetailModal');
}

// Folder Management
function loadFolders() {
    const folderGrid = document.getElementById('folderGrid');
    
    const folders = [
        { name: 'Dokumen', count: 24 },
        { name: 'Gambar', count: 156 },
        { name: 'Video', count: 12 },
        { name: 'Audio', count: 8 },
        { name: 'Digital Files', count: 45 },
        { name: 'Arsip', count: 89 }
    ];
    
    folderGrid.innerHTML = '';
    
    folders.forEach(folder => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.onclick = () => openFolder(folder.name);
        div.innerHTML = `
            <div class="file-icon" style="background: #fef3c7; color: #f59e0b;">
                <i class="fas fa-folder"></i>
            </div>
            <div class="file-name">${folder.name}</div>
            <div class="file-size">${folder.count} file</div>
        `;
        folderGrid.appendChild(div);
    });
    
    state.folders = folders;
}

function openFolder(folderName) {
    state.currentFolder = `${state.currentFolder}/${folderName}`;
    updateBreadcrumb();
    showToast(`Membuka folder: ${folderName}`, 'info');
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const parts = state.currentFolder.split('/').filter(p => p);
    
    breadcrumb.innerHTML = '';
    
    parts.forEach((part, index) => {
        const span = document.createElement('span');
        span.className = 'breadcrumb-item';
        span.textContent = part;
        span.onclick = () => navigateToBreadcrumb(index);
        breadcrumb.appendChild(span);
        
        if (index < parts.length - 1) {
            const separator = document.createElement('span');
            separator.textContent = '/';
            separator.style.color = 'var(--dark-gray)';
            breadcrumb.appendChild(separator);
        }
    });
}

function navigateToBreadcrumb(index) {
    const parts = state.currentFolder.split('/').filter(p => p);
    state.currentFolder = '/' + parts.slice(0, index + 1).join('/');
    updateBreadcrumb();
    loadFolders();
}

function createNewFolder() {
    document.getElementById('folderLocation').value = state.currentFolder;
    openModal('createFolderModal');
}

function submitCreateFolder() {
    const name = document.getElementById('folderName').value;
    const description = document.getElementById('folderDescription').value;
    
    if (!name) {
        showToast('Nama folder wajib diisi', 'error');
        return;
    }
    
    // Add new folder
    state.folders.push({ name, count: 0 });
    loadFolders();
    
    closeModal('createFolderModal');
    document.getElementById('createFolderForm').reset();
    
    showToast(`Folder "${name}" berhasil dibuat`, 'success');
}

function uploadFile() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
        const files = Array.from(e.target.files);
        showToast(`${files.length} file sedang diupload...`, 'info');
        // In production, implement actual upload logic
    };
    input.click();
}

// Settings Functions
function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    document.body.setAttribute('data-theme', theme);
    showToast(`Tema diubah ke ${theme}`, 'success');
}

function changeFontSize(size) {
    document.documentElement.style.fontSize = size + 'px';
}

function changePassword() {
    showToast('Fitur ubah password akan segera hadir', 'info');
}

function cleanStorage() {
    showToast('Cache berhasil dibersihkan', 'success');
}

// Help Functions
function toggleFaq(element) {
    element.classList.toggle('active');
    const answer = element.nextElementSibling;
    answer.classList.toggle('active');
}

function openChat() {
    showToast('Membuka live chat...', 'info');
}

function sendEmail() {
    showToast('Membuka email client...', 'info');
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// UI Functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('active');
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    // Implement search logic
    if (query.length > 2) {
        console.log('Searching for:', query);
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize with sample data
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { name: 'Admin', email: 'admin@digital.com', password: 'admin123', createdAt: new Date().toISOString() }
    ]));
}

console.log('ManajemenFile.Digital initialized successfully!');

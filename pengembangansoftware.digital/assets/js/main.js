// Main JavaScript for PENGEMBANGANSOFTWARE.DIGITAL

let currentFilter = 'all';
let systemsData = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSystemsData();
    setupEventListeners();
    renderQuickAccess();
});

// Load systems data from .digital folders
function loadSystemsData() {
    // Get all .digital folders in pengembangansoftware.digital directory
    const digitalFolders = [
        // Existing folders
        { name: 'AnsibleChef.digital', path: 'AnsibleChef.digital', icon: 'fa-cogs', category: 'sistem' },
        { name: 'InfrastrukturKode.digital', path: 'InfrastrukturKode.digital', icon: 'fa-code', category: 'sistem' },
        { name: 'IntegrasiKontinu.digital', path: 'IntegrasiKontinu.digital', icon: 'fa-sync', category: 'sistem' },
        { name: 'KomponenFungsional.digital', path: 'KomponenFungsional.digital', icon: 'fa-puzzle-piece', category: 'komponen' },
        { name: 'OperasiGit.digital', path: 'OperasiGit.digital', icon: 'fa-code-branch', category: 'sistem' },
        { name: 'PengirimanKontinu.digital', path: 'PengirimanKontinu.digital', icon: 'fa-shipping-fast', category: 'sistem' },
        { name: 'ProsesBatch.digital', path: 'ProsesBatch.digital', icon: 'fa-tasks', category: 'sistem' },
        { name: 'PusatPengembang.digital', path: 'PusatPengembang.digital', icon: 'fa-users', category: 'dashboard' },
        { name: 'UjiOtomatis.digital', path: 'UjiOtomatis.digital', icon: 'fa-vial', category: 'sistem' },
        { name: 'admaster-pro.digital', path: 'admaster-pro.digital', icon: 'fa-ad', category: 'dashboard' },
        { name: 'aplikasisouth.digital', path: 'aplikasisouth.digital', icon: 'fa-mobile-alt', category: 'komponen' },
        { name: 'clientflow.digital', path: 'clientflow.digital', icon: 'fa-project-diagram', category: 'sistem' },
        { name: 'component.digital', path: 'component.digital', icon: 'fa-box', category: 'komponen' },
        { name: 'components.digital', path: 'components.digital', icon: 'fa-th', category: 'komponen' },
        { name: 'css.digital', path: 'css.digital', icon: 'fa-paint-brush', category: 'komponen' },
        { name: 'editorkode.digital', path: 'editorkode.digital', icon: 'fa-keyboard', category: 'komponen' },
        { name: 'js.digital', path: 'js.digital', icon: 'fa-js', category: 'komponen' },
        { name: 'optierp.digital', path: 'optierp.digital', icon: 'fa-chart-line', category: 'dashboard' },
        { name: 'php.digital', path: 'php.digital', icon: 'fa-php', category: 'komponen' },
        { name: 'postapp.digital', path: 'postapp.digital', icon: 'fa-paper-plane', category: 'sistem' },
        
        // New reconstructed folders
        { name: 'Dashboard', path: 'dashboard', icon: 'fa-tachometer-alt', category: 'dashboard' },
        { name: 'Komponen', path: 'komponen', icon: 'fa-puzzle-piece', category: 'komponen' },
        { name: 'Konfigurasi', path: 'konfigurasi', icon: 'fa-cog', category: 'konfigurasi' },
        { name: 'Detail', path: 'detail', icon: 'fa-info-circle', category: 'detail' },
        { name: 'Sistem', path: 'sistem', icon: 'fa-server', category: 'sistem' },
        { name: 'Auth', path: 'auth', icon: 'fa-shield-alt', category: 'sistem' }
    ];

    // Simulate folder and file counts
    systemsData = digitalFolders.map(folder => ({
        ...folder,
        folders: Math.floor(Math.random() * 50) + 10,
        files: Math.floor(Math.random() * 200) + 50
    }));

    renderFeatures(systemsData);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterFeatures(currentFilter);
        });
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchFeatures(e.target.value);
    });

    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchFeatures(this.value);
    });

    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate login
        console.log('Login attempt:', { email, password });
        alert('Login berhasil!\\nEmail: ' + email);
        closeLoginModal();
    });

    // Register form handler
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak sama!');
            return;
        }

        console.log('Registration attempt:', { name, email, password });
        alert('Registrasi berhasil!\\nNama: ' + name + '\\nEmail: ' + email);
        closeRegisterModal();
    });
}

// Render features grid
function renderFeatures(data, limitToFive = false) {
    const grid = document.getElementById('featuresGrid');
    grid.innerHTML = '';
    
    if (data.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        return;
    }
    
    document.getElementById('noResults').style.display = 'none';

    // Limit to 5 items if specified
    const displayData = limitToFive ? data.slice(0, 5) : data;

    displayData.forEach((system, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.02}s both`;
        card.onclick = () => openSystem(system.path);
        card.innerHTML = `
            <span class="status-badge status-active">Active</span>
            <div class="feature-icon"><i class="fas ${system.icon}"></i></div>
            <h3 class="feature-name">${system.name}</h3>
            <div class="feature-path">/${system.path}</div>
            <div class="feature-stats">
                <span class="feature-stat"><i class="fas fa-folder"></i> ${system.folders} folder</span>
                <span class="feature-stat"><i class="fas fa-file"></i> ${system.files} file</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Toggle directory panel
function toggleDirectoryPanel() {
    const panel = document.getElementById('directoryPanel');
    const btn = document.querySelector('button[onclick="toggleDirectoryPanel()"]');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-minus me-2"></i>Tutup Direktori';
        renderDirectory();
        window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-folder-tree me-2"></i>Lihat Direktori';
    }
}

// Filter features by category
function filterFeatures(category) {
    if (category === 'all') {
        renderFeatures(systemsData);
    } else {
        renderFeatures(systemsData.filter(s => s.category === category));
    }
}

// Search features
function searchFeatures(query) {
    if (!query) {
        filterFeatures(currentFilter);
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = systemsData.filter(s => 
        s.name.toLowerCase().includes(lowerQuery) || 
        s.path.toLowerCase().includes(lowerQuery) || 
        s.category.toLowerCase().includes(lowerQuery)
    );
    
    renderFeatures(filtered);
}

// Render quick access boxes
function renderQuickAccess() {
    const categories = [
        { name: 'Dashboard', icon: 'fa-tachometer-alt', count: 5, filter: 'dashboard' },
        { name: 'Komponen', icon: 'fa-puzzle-piece', count: 8, filter: 'komponen' },
        { name: 'Konfigurasi', icon: 'fa-cog', count: 3, filter: 'konfigurasi' },
        { name: 'Sistem', icon: 'fa-server', count: 12, filter: 'sistem' },
        { name: 'Detail', icon: 'fa-info-circle', count: 4, filter: 'detail' },
        { name: 'CI/CD', icon: 'fa-infinity', count: 6, filter: 'sistem' },
        { name: 'Testing', icon: 'fa-vial', count: 4, filter: 'sistem' },
        { name: 'Version Control', icon: 'fa-code-branch', count: 3, filter: 'sistem' }
    ];
    
    const container = document.getElementById('quickAccessBox');
    container.innerHTML = '';
    
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'box-item';
        item.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            const targetBtn = document.querySelector(`[data-filter="${cat.filter}"]`);
            if (targetBtn) {
                targetBtn.classList.add('active');
                currentFilter = cat.filter;
            }
            filterFeatures(cat.filter);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        };
        item.innerHTML = `
            <i class="fas ${cat.icon}"></i>
            <span>${cat.name}</span>
            <small style="color: #e6f0ff; font-size: 0.75rem;">${cat.count} modul</small>
        `;
        container.appendChild(item);
    });
}

// Render directory tree
function renderDirectory() {
    const container = document.getElementById('systemsDirectory');
    container.innerHTML = '';
    
    systemsData.forEach(system => {
        const item = document.createElement('div');
        item.className = 'box-item';
        item.onclick = () => openSystem(system.path);
        item.innerHTML = `
            <i class="fas fa-folder-tree" style="color: white;"></i>
            <span style="font-size: 0.9rem; color: white;">${system.name}</span>
            <br>
            <small style="color: #e6f0ff; font-size: 0.7rem;">
                <i class="fas fa-folder"></i> ${system.folders} folder | 
                <i class="fas fa-file"></i> ${system.files} file
            </small>
        `;
        container.appendChild(item);
    });
}

// Open system folder
function openSystem(path) {
    // Check if it's an internal folder or external .digital folder
    let url;
    if (path.endsWith('.digital')) {
        url = `./${path}/`;
    } else {
        url = `./${path}/index.html`;
    }
    
    window.open(url, '_blank');
    console.log(`Opening system: ${path}, URL: ${url}`);
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Scroll to top button visibility
window.addEventListener('scroll', function() {
    let scrollTop = document.querySelector('.scroll-top');
    if (!scrollTop) {
        const btn = document.createElement('div');
        btn.className = 'scroll-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
        scrollTop = btn;
    }
    
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
        scrollTop.style.opacity = '1';
        scrollTop.style.visibility = 'visible';
    } else {
        scrollTop.classList.remove('visible');
        scrollTop.style.opacity = '0';
        scrollTop.style.visibility = 'hidden';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        closeLoginModal();
        closeRegisterModal();
    }
    
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

console.log('PENGEMBANGANSOFTWARE.DIGITAL initialized successfully!');

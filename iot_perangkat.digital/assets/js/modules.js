// IoT Modules Data and Functions
const iotModules = [
    {
        id: 'otomasi-rumah',
        name: 'Otomasi Rumah',
        path: 'OtomasiRumah.digital/',
        icon: 'fa-home',
        category: 'automation',
        status: 'active',
        files: 45,
        configs: 12
    },
    {
        id: 'jaringan-pintar',
        name: 'Jaringan Pintar',
        path: 'JaringanPintar.digital/',
        icon: 'fa-network-wired',
        category: 'network',
        status: 'active',
        files: 38,
        configs: 8
    },
    {
        id: 'operasi-drone',
        name: 'Operasi Drone',
        path: 'OperasiDrone.digital/',
        icon: 'fa-plane',
        category: 'automation',
        status: 'active',
        files: 52,
        configs: 15
    },
    {
        id: 'platform-iot',
        name: 'Platform IoT',
        path: 'PlatformIoT.digital/',
        icon: 'fa-cloud',
        category: 'platform',
        status: 'active',
        files: 67,
        configs: 20
    },
    {
        id: 'sistem-tertanam',
        name: 'Sistem Tertanam',
        path: 'SistemTertanam.digital/',
        icon: 'fa-microchip',
        category: 'embedded',
        status: 'active',
        files: 41,
        configs: 10
    },
    {
        id: 'pelacak-kebugaran',
        name: 'Pelacak Kebugaran',
        path: 'PelacakKebugaran.digital/',
        icon: 'fa-heartbeat',
        category: 'fitness',
        status: 'active',
        files: 33,
        configs: 9
    },
    {
        id: 'grid-cerdas',
        name: 'Grid Cerdas',
        path: 'GridCerdas.digital/',
        icon: 'fa-bolt',
        category: 'grid',
        status: 'active',
        files: 48,
        configs: 14
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    updateStats();
});

// Load modules into grid
function loadModules(filter = 'all') {
    const grid = document.getElementById('modulesGrid');
    const noResults = document.getElementById('noResults');
    
    let filteredModules = iotModules;
    if (filter !== 'all') {
        filteredModules = iotModules.filter(module => module.category === filter);
    }
    
    if (filteredModules.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = filteredModules.map(module => `
        <a href="${module.path}index.html" class="feature-card">
            <span class="status-badge status-${module.status}">${module.status === 'active' ? 'Aktif' : 'Memperbarui'}</span>
            <div class="feature-icon">
                <i class="fas ${module.icon}"></i>
            </div>
            <h3 class="feature-name">${module.name}</h3>
            <div class="feature-path">${module.path}</div>
            <div class="feature-stats">
                <div class="feature-stat">
                    <i class="fas fa-file"></i>
                    <span>${module.files} File</span>
                </div>
                <div class="feature-stat">
                    <i class="fas fa-cog"></i>
                    <span>${module.configs} Konfigurasi</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalModules = iotModules.length;
    const totalFiles = iotModules.reduce((sum, m) => sum + m.files, 0);
    const totalConfigs = iotModules.reduce((sum, m) => sum + m.configs, 0);
    
    animateNumber('totalModules', totalModules);
    animateNumber('totalFiles', totalFiles);
    animateNumber('totalConfigs', totalConfigs);
}

// Animate numbers
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Filter modules
function filterModules(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadModules(category);
}

// Search modules
function searchModules() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        loadModules('all');
        return;
    }
    
    const filtered = iotModules.filter(module => 
        module.name.toLowerCase().includes(query) ||
        module.path.toLowerCase().includes(query) ||
        module.category.toLowerCase().includes(query)
    );
    
    const grid = document.getElementById('modulesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = filtered.map(module => `
        <a href="${module.path}index.html" class="feature-card">
            <span class="status-badge status-${module.status}">${module.status === 'active' ? 'Aktif' : 'Memperbarui'}</span>
            <div class="feature-icon">
                <i class="fas ${module.icon}"></i>
            </div>
            <h3 class="feature-name">${module.name}</h3>
            <div class="feature-path">${module.path}</div>
            <div class="feature-stats">
                <div class="feature-stat">
                    <i class="fas fa-file"></i>
                    <span>${module.files} File</span>
                </div>
                <div class="feature-stat">
                    <i class="fas fa-cog"></i>
                    <span>${module.configs} Konfigurasi</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Allow Enter key for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchModules();
            }
        });
    }
});

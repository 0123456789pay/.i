// BISNISSTARTUP.DIGITAL - Main JavaScript

// Data startup programs from .digital folders
const startupPrograms = [
    {
        id: 'akselerator',
        name: 'Akselerator Startup',
        path: 'AkseleratorStartup.digital/',
        icon: 'fa-rocket',
        category: 'akselerator',
        description: 'Program akselerasi untuk startup tahap awal',
        features: ['Mentoring', 'Funding', 'Network'],
        status: 'active'
    },
    {
        id: 'inkubator',
        name: 'Inkubator Bisnis',
        path: 'InkubatorBisnis.digital/',
        icon: 'fa-lightbulb',
        category: 'inkubator',
        description: 'Inkubasi bisnis dari ide hingga launch',
        features: ['Training', 'Incubation', 'Launch'],
        status: 'active'
    },
    {
        id: 'model-freemium',
        name: 'Model Freemium',
        path: 'ModelFreemium.digital/',
        icon: 'fa-chart-line',
        category: 'pendanaan',
        description: 'Strategi bisnis model freemium',
        features: ['Strategy', 'Analytics', 'Conversion'],
        status: 'active'
    },
    {
        id: 'program-afiliasi',
        name: 'Program Afiliasi',
        path: 'ProgramAfiliasi.digital/',
        icon: 'fa-handshake',
        category: 'komunitas',
        description: 'Program afiliasi dan partnership',
        features: ['Affiliate', 'Commission', 'Tracking'],
        status: 'active'
    },
    {
        id: 'program-duta',
        name: 'Program Duta',
        path: 'ProgramDuta.digital/',
        icon: 'fa-users',
        category: 'komunitas',
        description: 'Program ambassador dan brand advocate',
        features: ['Ambassador', 'Marketing', 'Rewards'],
        status: 'active'
    },
    {
        id: 'rencana-bisnis',
        name: 'Rencana Bisnis',
        path: 'RencanaBisnis.digital/',
        icon: 'fa-file-alt',
        category: 'resources',
        description: 'Template dan panduan business plan',
        features: ['Templates', 'Guides', 'Examples'],
        status: 'active'
    },
    {
        id: 'rencana-keuangan',
        name: 'Rencana Keuangan',
        path: 'RencanaKeuangan.digital/',
        icon: 'fa-coins',
        category: 'pendanaan',
        description: 'Perencanaan dan proyeksi keuangan',
        features: ['Planning', 'Projection', 'Analysis'],
        status: 'active'
    },
    {
        id: 'strategi-merek',
        name: 'Strategi Merek',
        path: 'StrategiMerek.digital/',
        icon: 'fa-tag',
        category: 'mentorship',
        description: 'Branding dan strategi pemasaran',
        features: ['Branding', 'Marketing', 'Strategy'],
        status: 'active'
    },
    {
        id: 'tips-anggaran',
        name: 'Tips Anggaran',
        path: 'TipsAnggaran.digital/',
        icon: 'fa-piggy-bank',
        category: 'resources',
        description: 'Tips pengelolaan anggaran startup',
        features: ['Budgeting', 'Tips', 'Management'],
        status: 'active'
    },
    {
        id: 'waralaba-bisnis',
        name: 'Waralaba Bisnis',
        path: 'WaralabaBisnis.digital/',
        icon: 'fa-store',
        category: 'akselerator',
        description: 'Panduan waralaba dan franchise',
        features: ['Franchise', 'License', 'Expansion'],
        status: 'active'
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initStats();
    renderFeatures();
    renderSystems();
    setupFilters();
    setupScrollTop();
    setupForms();
});

// Initialize statistics with animation
function initStats() {
    const stats = {
        totalStartup: 150,
        totalProgram: 25,
        totalMentor: 80,
        totalInvestor: 50
    };

    for (const [key, value] of Object.entries(stats)) {
        animateNumber(key, value);
    }
}

// Animate number counting
function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 30);
}

// Render feature cards
function renderFeatures(filter = 'all') {
    const grid = document.getElementById('featuresGrid');
    if (!grid) return;

    const filtered = filter === 'all' 
        ? startupPrograms 
        : startupPrograms.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(program => `
        <div class="feature-card" onclick="showDetail('${program.id}')">
            <span class="status-badge status-${program.status}">${program.status}</span>
            <div class="feature-icon">
                <i class="fas ${program.icon}"></i>
            </div>
            <h3 class="feature-name">${program.name}</h3>
            <p class="feature-path">${program.path}</p>
            <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">${program.description}</p>
            <div class="feature-stats">
                ${program.features.map(f => `
                    <span class="feature-stat">
                        <i class="fas fa-check-circle"></i>
                        ${f}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Render systems box
function renderSystems() {
    const grid = document.getElementById('systemsGrid');
    if (!grid) return;

    const systems = [
        { name: 'Dashboard', icon: 'fa-tachometer-alt', path: 'dashboard/' },
        { name: 'Konten', icon: 'fa-newspaper', path: 'konten/' },
        { name: 'Pengaturan', icon: 'fa-cog', path: 'pengaturan/' },
        { name: 'Bantuan', icon: 'fa-question-circle', path: 'bantuan/' },
        { name: 'Sistem', icon: 'fa-server', path: 'sistem/' },
        { name: 'Login', icon: 'fa-sign-in-alt', path: 'login/' }
    ];

    grid.innerHTML = systems.map(sys => `
        <div class="box-item" onclick="navigateTo('${sys.path}')">
            <i class="fas ${sys.icon}"></i>
            <span>${sys.name}</span>
        </div>
    `).join('');
}

// Setup category filters
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            renderFeatures(category);
        });
    });
}

// Setup scroll to top button
function setupScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    if (!scrollTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show login modal
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

// Show register modal
function showRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

// Setup form handlers
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality will be implemented with backend integration.');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration functionality will be implemented with backend integration.');
        });
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) return;

    const results = startupPrograms.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.includes(query)
    );

    if (results.length > 0) {
        alert(`Found ${results.length} result(s) for "${query}"`);
    } else {
        alert(`No results found for "${query}"`);
    }
}

// Show detail modal
function showDetail(programId) {
    const program = startupPrograms.find(p => p.id === programId);
    if (!program) return;

    document.getElementById('detailModalTitle').textContent = program.name;
    document.getElementById('detailModalBody').innerHTML = `
        <div class="mb-3">
            <h6><i class="fas fa-info-circle"></i> Deskripsi</h6>
            <p>${program.description}</p>
        </div>
        <div class="mb-3">
            <h6><i class="fas fa-folder"></i> Path</h6>
            <code>${program.path}</code>
        </div>
        <div class="mb-3">
            <h6><i class="fas fa-list"></i> Fitur</h6>
            <ul>
                ${program.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
        <div class="mb-3">
            <h6><i class="fas fa-signal"></i> Status</h6>
            <span class="badge bg-${program.status === 'active' ? 'success' : 'warning'}">${program.status}</span>
        </div>
    `;

    document.getElementById('detailActionBtn').onclick = function() {
        navigateTo(program.path);
    };

    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    modal.show();
}

// Navigate to path
function navigateTo(path) {
    window.location.href = path;
}

// Export for external use
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.performSearch = performSearch;
window.showDetail = showDetail;
window.scrollToTop = scrollToTop;

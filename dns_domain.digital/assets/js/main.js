// DNS_DOMAIN.DIGITAL - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSearch();
    initModals();
    initFeatureCards();
    initNavigation();
    loadDigitalFolders();
});

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    const featureCards = document.querySelectorAll('.feature-card');
    let foundCount = 0;
    
    featureCards.forEach(card => {
        const name = card.querySelector('.feature-name').textContent.toLowerCase();
        const path = card.querySelector('.feature-path').textContent.toLowerCase();
        
        if (name.includes(query) || path.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.4s ease-out';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    const resultsMessage = document.getElementById('searchResults');
    if (resultsMessage) {
        if (foundCount === 0) {
            resultsMessage.textContent = `Tidak ditemukan hasil untuk "${query}"`;
            resultsMessage.style.display = 'block';
        } else {
            resultsMessage.textContent = `Ditemukan ${foundCount} hasil`;
            resultsMessage.style.display = 'block';
            setTimeout(() => {
                resultsMessage.style.display = 'none';
            }, 3000);
        }
    }
}

// Modal functionality
function initModals() {
    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginClose = document.getElementById('loginClose');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }
    
    if (loginClose && loginModal) {
        loginClose.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }
    
    // Register modal
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const registerClose = document.getElementById('registerClose');
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.classList.add('active');
        });
    }
    
    if (registerClose && registerModal) {
        registerClose.addEventListener('click', () => {
            registerModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (in production, this would call an API)
    console.log('Login attempt:', email);
    alert('Login berhasil! Selamat datang di DNS_DOMAIN.DIGITAL');
    document.getElementById('loginModal').classList.remove('active');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Simulate registration (in production, this would call an API)
    console.log('Register attempt:', name, email);
    alert('Registrasi berhasil! Silakan login dengan akun Anda.');
    document.getElementById('registerModal').classList.remove('active');
    document.getElementById('loginModal').classList.add('active');
}

// Feature cards interaction
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('.feature-name').textContent;
            const featurePath = this.querySelector('.feature-path').textContent;
            
            // Navigate to the feature page or show details
            showFeatureDetail(featureName, featurePath);
        });
    });
}

function showFeatureDetail(name, path) {
    // Create detail modal or navigate
    console.log('Showing detail for:', name, path);
    
    // In production, this would navigate to the actual page
    // For now, show an alert with details
    alert(`Membuka: ${name}\nPath: ${path}\n\nFitur detail akan ditampilkan di sini.`);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            if (target.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Load digital folders dynamically
function loadDigitalFolders() {
    const systemsGrid = document.getElementById('systemsGrid');
    const digitalDirectory = document.getElementById('digitalDirectory');
    const footerDirectory = document.getElementById('footerDirectory');
    
    // Sample digital folders data for DNS & Domain systems
    const dnsSystems = [
        { name: 'Manajemen DNS', path: '/dns_domain.digital/ManajemenDNS.digital', icon: 'fa-globe' },
        { name: 'Konfigurasi Domain', path: '/dns_domain.digital/KonfigurasiDomain.digital', icon: 'fa-cog' },
        { name: 'Monitoring DNS', path: '/dns_domain.digital/MonitoringDNS.digital', icon: 'fa-chart-line' },
        { name: 'Keamanan DNS', path: '/dns_domain.digital/KeamananDNS.digital', icon: 'fa-shield-alt' },
        { name: 'API Gateway', path: '/dns_domain.digital/APIGateway.digital', icon: 'fa-network-wired' },
        { name: 'Analytics', path: '/dns_domain.digital/Analytics.digital', icon: 'fa-chart-bar' },
        { name: 'Backup & Restore', path: '/dns_domain.digital/BackupRestore.digital', icon: 'fa-database' },
        { name: 'Load Balancer', path: '/dns_domain.digital/LoadBalancer.digital', icon: 'fa-balance-scale' },
        { name: 'SSL Manager', path: '/dns_domain.digital/SSLManager.digital', icon: 'fa-lock' },
        { name: 'CDN Control', path: '/dns_domain.digital/CDNControl.digital', icon: 'fa-cloud' },
        { name: 'Email DNS', path: '/dns_domain.digital/EmailDNS.digital', icon: 'fa-envelope' },
        { name: 'Subdomain Manager', path: '/dns_domain.digital/SubdomainManager.digital', icon: 'fa-sitemap' }
    ];
    
    // Populate systems grid
    if (systemsGrid) {
        dnsSystems.forEach(folder => {
            const boxItem = document.createElement('a');
            boxItem.className = 'box-item';
            boxItem.href = folder.path;
            boxItem.innerHTML = `
                <i class="fas ${folder.icon}"></i>
                <span>${folder.name}</span>
            `;
            systemsGrid.appendChild(boxItem);
        });
    }
    
    // Main domain categories (unique, no duplicates)
    const mainDomains = [
        { name: 'AI Machine Learning', path: '/ai_machinelearning.digital', icon: 'fa-brain' },
        { name: 'Analisis Data', path: '/analisisdata.digital', icon: 'fa-chart-pie' },
        { name: 'Bisnis Startup', path: '/bisnisstartup.digital', icon: 'fa-rocket' },
        { name: 'Blockchain Crypto', path: '/blockchaincrypto.digital', icon: 'fa-bitcoin' },
        { name: 'Desain Kreatif', path: '/desainkreatif.digital', icon: 'fa-paint-brush' },
        { name: 'E-commerce Retail', path: '/ecommerceretail.digital', icon: 'fa-shopping-cart' },
        { name: 'Energi Lingkungan', path: '/energilingkungan.digital', icon: 'fa-leaf' },
        { name: 'Game Entertainment', path: '/gameentertainment.digital', icon: 'fa-gamepad' },
        { name: 'Hukum Kepatuhan', path: '/hukumkepatuhan.digital', icon: 'fa-balance-scale-right' },
        { name: 'Identitas Akses', path: '/identitasakses.digital', icon: 'fa-id-card' },
        { name: 'Infrastruktur Cloud', path: '/infrastrukturcloud.digital', icon: 'fa-cloud' },
        { name: 'IoT Perangkat', path: '/iot_perangkat.digital', icon: 'fa-microchip' },
        { name: 'Keamanan Siber', path: '/keamanansiber.digital', icon: 'fa-user-shield' },
        { name: 'Kesehatan Digital', path: '/kesehatandigital.digital', icon: 'fa-heartbeat' },
        { name: 'Keuangan Perbankan', path: '/keuanganperbankan.digital', icon: 'fa-university' },
        { name: 'Komunikasi', path: '/komunikasi.digital', icon: 'fa-comments' },
        { name: 'Manajemen Data', path: '/manajemendata.digital', icon: 'fa-database' },
        { name: 'Manajemen File', path: '/manajemenfile.digital', icon: 'fa-folder' },
        { name: 'Manajemen Proyek', path: '/manajemenproyek.digital', icon: 'fa-tasks' },
        { name: 'Media Konten', path: '/mediakonten.digital', icon: 'fa-photo-video' },
        { name: 'Pendidikan Pelatihan', path: '/pendidikanpelatihan.digital', icon: 'fa-graduation-cap' },
        { name: 'Pengembangan Software', path: '/pengembangansoftware.digital', icon: 'fa-code' },
        { name: 'Jaringan Aktuaris', path: '/jaringanaktuaris.digital', icon: 'fa-network-wired' }
    ];
    
    // Populate digital directory
    if (digitalDirectory) {
        mainDomains.forEach(domain => {
            const boxItem = document.createElement('a');
            boxItem.className = 'box-item';
            boxItem.href = domain.path;
            boxItem.style.background = 'linear-gradient(135deg, #0066cc 0%, #0099ff 100%)';
            boxItem.innerHTML = `
                <i class="fas ${domain.icon}"></i>
                <span>${domain.name}</span>
            `;
            digitalDirectory.appendChild(boxItem);
        });
    }
    
    // Populate footer directory (unique links only - no duplicates)
    if (footerDirectory) {
        const uniqueDomains = new Set();
        mainDomains.forEach(domain => {
            if (!uniqueDomains.has(domain.path)) {
                uniqueDomains.add(domain.path);
                const link = document.createElement('a');
                link.className = 'directory-link';
                link.href = domain.path;
                link.textContent = domain.name.replace(/ /g, '');
                footerDirectory.appendChild(link);
            }
        });
    }
}

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Animate stats on scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                stat.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    setTimeout(animateStats, 500);
});

// Export for use in other modules
window.DNSDomainDigital = {
    performSearch,
    showFeatureDetail,
    loadDigitalFolders,
    formatDate,
    formatNumber
};

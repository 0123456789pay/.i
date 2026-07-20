// lisensidomain.digital - Main JavaScript File
// Platform Registrar Domain Berlisensi

document.addEventListener('DOMContentLoaded', function() {
    console.log('LISENSIDOMAIN.DIGITAL loaded successfully');
    
    // Initialize domain search functionality
    initDomainSearch();
    
    // Load dynamic content from DB
    loadDomainData();
});

function initDomainSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            if (query.length >= 3) {
                checkDomainAvailability(query);
            }
        }, 500));
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function checkDomainAvailability(domain) {
    console.log(`Checking availability for: ${domain}`);
    // Simulate domain availability check
    const available = Math.random() > 0.3;
    console.log(`${domain}.digital is ${available ? 'available' : 'taken'}`);
}

function loadDomainData() {
    fetch('./assets/db/domains.json')
        .then(response => response.json())
        .then(data => {
            console.log('Domain data loaded:', data);
            updateStats(data.stats);
        })
        .catch(error => {
            console.error('Error loading domain data:', error);
        });
}

function updateStats(stats) {
    if (!stats) return;
    
    const elements = {
        totalDomains: document.getElementById('totalDomains'),
        totalExtensions: document.getElementById('totalExtensions'),
        totalLicenses: document.getElementById('totalLicenses')
    };
    
    if (elements.totalDomains) {
        animateNumber(elements.totalDomains, stats.totalDomains || 0);
    }
    if (elements.totalExtensions) {
        animateNumber(elements.totalExtensions, stats.totalExtensions || 0);
    }
    if (elements.totalLicenses) {
        animateNumber(elements.totalLicenses, stats.totalLicenses || 0);
    }
}

function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 30);
}

// Panel management functions
function openPanel(panelId) {
    document.querySelectorAll('.panel-section').forEach(p => p.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    document.getElementById(panelId).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closePanel(panelId) {
    document.getElementById(panelId).classList.remove('active');
}

// Form handlers
function registerDomain(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log('Domain registration:', Object.fromEntries(formData));
    alert('Permintaan registrasi domain akan diproses. Silakan lengkapi pembayaran.');
    closePanel('registrarPanel');
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log('Login attempt:', Object.fromEntries(formData));
    alert('Login berhasil! Mengalihkan ke dashboard...');
    closePanel('loginPanel');
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log('Registration attempt:', Object.fromEntries(formData));
    alert('Registrasi akun berhasil! Silakan verifikasi email Anda.');
    closePanel('registerPanel');
}

function checkDomain() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        alert(`Mengecek ketersediaan domain: ${query}.digital\nDomain tersedia! Silakan lanjutkan ke registrar.`);
        openPanel('registrarPanel');
    }
}

// Export functions for global access
window.openPanel = openPanel;
window.closePanel = closePanel;
window.registerDomain = registerDomain;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.checkDomain = checkDomain;

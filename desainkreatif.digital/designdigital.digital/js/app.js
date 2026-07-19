// DESAIN KREATIF DIGITAL - Main Application JavaScript

// Auth Modal Functions
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
});

// Auth Tabs Switching
document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            loginForm.classList.remove('active');
            registerForm.classList.remove('active');
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            if (this.dataset.tab === 'login') {
                loginForm.classList.add('active');
            } else {
                registerForm.classList.add('active');
            }
        });
    });
    
    // Load modules dynamically
    loadModules();
    
    // Setup form submissions
    setupForms();
});

// Load Modules from .digital folders
function loadModules() {
    const modulesList = document.getElementById('modulesList');
    if (!modulesList) return;
    
    // Sample modules data - in production this would be fetched from server
    const modules = [
        { name: 'AnimasiStudio.digital', desc: 'Studio animasi profesional' },
        { name: 'Aset3D.digital', desc: 'Koleksi aset 3D' },
        { name: 'ProduksiFilm.digital', desc: 'Produksi dan editing video' },
        { name: 'RealitasTambahan.digital', desc: 'Teknologi AR/VR' },
        { name: 'creativflow.digital', desc: 'Workflow kreatif' },
        { name: 'designdigital.digital', desc: 'Platform desain grafis' }
    ];
    
    modulesList.innerHTML = modules.map(module => `
        <div class="module-item" onclick="navigateToModule('${module.name}')">
            <h4>${module.name}</h4>
            <p>${module.desc}</p>
        </div>
    `).join('');
}

// Navigate to module
function navigateToModule(moduleName) {
    window.location.href = moduleName + '/index.html';
}

// Setup form submissions
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulate login
            console.log('Login attempt:', email);
            alert('Login berhasil! Selamat datang, ' + email);
            closeAuthModal();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirm').value;
            
            if (password !== confirm) {
                alert('Kata sandi tidak cocok!');
                return;
            }
            
            // Simulate registration
            console.log('Registration:', name, email);
            alert('Pendaftaran berhasil! Silakan masuk.');
            
            // Switch to login tab
            document.querySelector('[data-tab="login"]').click();
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Notification badge click handler
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.btn-notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('Anda memiliki 3 notifikasi baru');
        });
    }
    
    // Search button handler
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = prompt('Cari modul atau fitur:');
            if (query) {
                console.log('Searching for:', query);
                // Implement search functionality
            }
        });
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .module-item, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

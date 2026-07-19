/**
 * ARSIPVERSI.DIGITAL - MAIN JAVASCRIPT
 * Fungsi-fungsi interaktif untuk aplikasi
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('ArsipVersi.Digital initialized');
    
    initNavigation();
    initModules();
    initAuthForms();
    initSearch();
    initModals();
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// ============================================
// MODULES
// ============================================

function initModules() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.dataset.moduleId;
            const moduleSlug = this.dataset.moduleSlug;
            
            if (moduleId && moduleSlug) {
                loadModuleDetail(moduleId, moduleSlug);
            }
        });
    });
}

function loadModuleDetail(moduleId, moduleSlug) {
    // Show loading state
    showLoading();
    
    // Fetch module detail via AJAX
    fetch(`/system/api/modules.php?id=${moduleId}&slug=${moduleSlug}`)
        .then(response => response.json())
        .then(data => {
            hideLoading();
            if (data.success) {
                displayModuleDetail(data.data);
            } else {
                showAlert('Gagal memuat detail modul', 'error');
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Error:', error);
            showAlert('Terjadi kesalahan saat memuat detail modul', 'error');
        });
}

function displayModuleDetail(module) {
    const detailContainer = document.getElementById('detail-container') || document.querySelector('.main-wrapper');
    
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="detail-container">
                <div class="detail-header">
                    <h1 class="detail-title">${module.icon} ${module.title}</h1>
                    <div class="detail-meta">
                        <span>Versi: ${module.version}</span>
                        <span>Status: ${module.status}</span>
                        <span>Dibuat: ${module.created_at}</span>
                    </div>
                </div>
                <div class="detail-body">
                    <div class="detail-section">
                        <h2 class="detail-section-title">Deskripsi</h2>
                        <div class="detail-content">
                            <p>${module.description}</p>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h2 class="detail-section-title">Fitur</h2>
                        <div class="detail-content">
                            ${module.features ? `<ul>${module.features.map(f => `<li>${f}</li>`).join('')}</ul>` : '<p>Tidak ada fitur yang terdaftar</p>'}
                        </div>
                    </div>
                    <div class="detail-section">
                        <h2 class="detail-section-title">Konfigurasi</h2>
                        <div class="detail-content">
                            <pre>${JSON.stringify(module.config, null, 2)}</pre>
                        </div>
                    </div>
                    <div class="detail-actions">
                        <button class="btn-primary" onclick="openModule('${module.slug}')">Buka Modul</button>
                        <button class="btn-secondary" onclick="backToModules()">Kembali</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function openModule(slug) {
    window.location.href = `?module=${slug}`;
}

function backToModules() {
    window.location.href = '?';
}

// ============================================
// AUTH FORMS
// ============================================

function initAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    
    try {
        const response = await fetch('/system/api/auth.php?action=login', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Login berhasil! Mengalihkan...', 'success');
            setTimeout(() => {
                window.location.href = data.redirect || '/';
            }, 1500);
        } else {
            showAlert(data.message || 'Login gagal', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk';
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Terjadi kesalahan. Silakan coba lagi.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Masuk';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Validate password match
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');
    
    if (password !== confirmPassword) {
        showAlert('Password dan konfirmasi password tidak cocok', 'error');
        return;
    }
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    
    try {
        const response = await fetch('/system/api/auth.php?action=register', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Registrasi berhasil! Mengalihkan ke halaman login...', 'success');
            setTimeout(() => {
                window.location.href = '/?page=login';
            }, 2000);
        } else {
            showAlert(data.message || 'Registrasi gagal', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Daftar';
        }
    } catch (error) {
        console.error('Register error:', error);
        showAlert('Terjadi kesalahan. Silakan coba lagi.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Daftar';
    }
}

// ============================================
// SEARCH
// ============================================

function initSearch() {
    const searchInput = document.getElementById('module-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterModules, 300));
    }
}

function filterModules() {
    const searchTerm = document.getElementById('module-search').value.toLowerCase();
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        const title = card.querySelector('.module-title').textContent.toLowerCase();
        const description = card.querySelector('.module-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
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

// ============================================
// MODALS
// ============================================

function initModals() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// UTILITIES
// ============================================

function showLoading() {
    let loader = document.getElementById('loading-overlay');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loading-overlay';
        loader.className = 'loading-overlay';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoading() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.auth-box') || document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// ============================================
// API HELPER
// ============================================

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    
    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(endpoint, options);
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        return { success: false, message: 'Request failed' };
    }
}

// ============================================
// MODULE FILTER
// ============================================

function filterByCategory(category) {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update active state on filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
}

// Export functions for global use
window.ArsipVersiDigital = {
    openModal,
    closeModal,
    showAlert,
    filterByCategory,
    apiRequest,
    formatDateTime
};

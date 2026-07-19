/**
 * Media.Digital - Main JavaScript
 * Sistem Manajemen Konten Digital
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Media.Digital loaded successfully!');
    
    // Initialize components
    initNavigation();
    initAnimations();
    initForms();
});

/**
 * Navigation Functions
 */
function initNavigation() {
    // Handle dropdown menus
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        // Desktop hover
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
        
        // Mobile touch
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && this.getAttribute('href') === '#') {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            navItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            link.getAttribute('href')?.includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

/**
 * Animation Functions
 */
function initAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .stat-item, .card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Form Functions
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Memproses...';
                submitBtn.disabled = true;
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    showAlert('success', 'Berhasil! Operasi selesai.');
                    
                    // Reset form if needed
                    if (this.classList.contains('reset-on-submit')) {
                        this.reset();
                    }
                } catch (error) {
                    showAlert('danger', 'Terjadi kesalahan. Silakan coba lagi.');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error state on input
                this.classList.remove('error');
                const errorEl = this.parentElement.querySelector('.form-error');
                if (errorEl) errorEl.remove();
            });
        });
    });
}

/**
 * Field Validation
 */
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.required;
    
    // Remove previous error
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Check required
    if (required && !value) {
        showError(field, 'Bidang ini wajib diisi');
        return false;
    }
    
    // Check email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Format email tidak valid');
            return false;
        }
    }
    
    // Check password strength
    if (type === 'password' && value) {
        const strength = checkPasswordStrength(value);
        updatePasswordStrength(strength);
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    field.parentElement.appendChild(errorEl);
}

function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    return score;
}

function updatePasswordStrength(score) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    
    if (!fill || !text) return;
    
    fill.className = 'strength-fill';
    
    if (score <= 2) {
        fill.classList.add('strength-weak');
        text.textContent = 'Kekuatan: Lemah';
        text.style.color = '#d93025';
    } else if (score <= 4) {
        fill.classList.add('strength-medium');
        text.textContent = 'Kekuatan: Sedang';
        text.style.color = '#f9ab00';
    } else {
        fill.classList.add('strength-strong');
        text.textContent = 'Kekuatan: Kuat';
        text.style.color = '#1e8e3e';
    }
}

/**
 * Alert System
 */
function showAlert(type, message) {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${getAlertIcon(type)}</span>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; cursor: pointer; font-size: 18px;">&times;</button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container';
    container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(container);
    return container;
}

function getAlertIcon(type) {
    const icons = {
        success: '✓',
        danger: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || 'ℹ';
}

/**
 * Utility Functions
 */
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
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

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('success', 'Berhasil disalin ke clipboard!');
    }).catch(() => {
        showAlert('danger', 'Gagal menyalin ke clipboard');
    });
}

console.log('Media.Digital System Ready 🚀');

/**
 * Media.Digital - Authentication JavaScript
 * Sistem Login & Register
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth module loaded!');
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        initLoginForm(loginForm);
    }
    
    if (registerForm) {
        initRegisterForm(registerForm);
    }
    
    // Password visibility toggle
    initPasswordToggle();
    
    // Social login handlers
    initSocialLogin();
});

/**
 * Login Form Handler
 */
function initLoginForm(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = form.querySelector('input[type="checkbox"]').checked;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validation
        if (!validateEmail(email)) {
            showAlert('danger', 'Format email tidak valid');
            return;
        }
        
        if (password.length < 6) {
            showAlert('danger', 'Kata sandi minimal 6 karakter');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Memproses...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await simulateAPICall(1500);
            
            // Store user session (simulation)
            const userData = {
                email: email,
                name: email.split('@')[0],
                avatar: null,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            if (rememberMe) {
                localStorage.setItem('mediaDigitalUser', JSON.stringify(userData));
                localStorage.setItem('mediaDigitalRemember', 'true');
            } else {
                sessionStorage.setItem('mediaDigitalUser', JSON.stringify(userData));
            }
            
            showAlert('success', 'Login berhasil! Mengalihkan...');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
            
        } catch (error) {
            showAlert('danger', 'Login gagal. Periksa email dan kata sandi Anda.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Register Form Handler
 */
function initRegisterForm(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validation
        if (!validateEmail(email)) {
            showAlert('danger', 'Format email tidak valid');
            return;
        }
        
        if (username.length < 3) {
            showAlert('danger', 'Nama pengguna minimal 3 karakter');
            return;
        }
        
        if (password.length < 8) {
            showAlert('danger', 'Kata sandi minimal 8 karakter');
            return;
        }
        
        if (password !== confirmPassword) {
            showAlert('danger', 'Kata sandi tidak cocok');
            return;
        }
        
        if (!termsAccepted) {
            showAlert('danger', 'Anda harus menyetujui syarat layanan');
            return;
        }
        
        // Check password strength
        const strength = checkPasswordStrength(password);
        if (strength < 3) {
            showAlert('warning', 'Kata sandi terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mendaftar...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await simulateAPICall(2000);
            
            // Store user data (simulation)
            const userData = {
                fullname: fullname,
                email: email,
                username: username,
                avatar: null,
                isLoggedIn: true,
                registerTime: new Date().toISOString()
            };
            
            localStorage.setItem('mediaDigitalUser', JSON.stringify(userData));
            
            showAlert('success', 'Pendaftaran berhasil! Mengalihkan...');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
            
        } catch (error) {
            showAlert('danger', 'Pendaftaran gagal. Silakan coba lagi.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Real-time password strength
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updatePasswordStrengthUI(strength);
        });
    }
}

/**
 * Password Visibility Toggle
 */
function initPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        const wrapper = field.parentElement;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            opacity: 0.6;
        `;
        
        // Make parent relative if not already
        if (getComputedStyle(wrapper).position === 'static') {
            wrapper.style.position = 'relative';
        }
        
        wrapper.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            const isPassword = field.type === 'password';
            field.type = isPassword ? 'text' : 'password';
            this.innerHTML = isPassword ? '🙈' : '👁️';
            this.style.opacity = isPassword ? '1' : '0.6';
        });
    });
}

/**
 * Social Login Handlers
 */
function initSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.textContent.trim().split(' ')[1];
            handleSocialLogin(provider);
        });
    });
}

function handleSocialLogin(provider) {
    showAlert('info', `Menghubungkan dengan ${provider}...`);
    
    // Simulate OAuth flow
    setTimeout(() => {
        const userData = {
            provider: provider,
            name: `User ${provider}`,
            email: `user@${provider.toLowerCase()}.com`,
            avatar: null,
            isLoggedIn: true
        };
        
        localStorage.setItem('mediaDigitalUser', JSON.stringify(userData));
        showAlert('success', `Login dengan ${provider} berhasil!`);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

/**
 * Utility Functions
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

function updatePasswordStrengthUI(score) {
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

function simulateAPICall(duration = 1000) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

function showAlert(type, message) {
    // Check if main.js showAlert exists
    if (typeof window.showAlert === 'function') {
        window.showAlert(type, message);
    } else {
        // Fallback alert
        const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            padding: 16px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: ${type === 'success' ? '#e6f4ea' : type === 'danger' ? '#fce8e6' : '#fff3cd'};
            color: ${type === 'success' ? '#1e8e3e' : type === 'danger' ? '#d93025' : '#856404'};
            border-left: 4px solid ${type === 'success' ? '#1e8e3e' : type === 'danger' ? '#d93025' : '#856404'};
        `;
        alert.innerHTML = `<span>${message}</span>`;
        
        alertContainer.appendChild(alert);
        
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container';
    container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(container);
    return container;
}

// Check if user is already logged in
function checkAuthStatus() {
    const user = localStorage.getItem('mediaDigitalUser') || sessionStorage.getItem('mediaDigitalUser');
    return user ? JSON.parse(user) : null;
}

console.log('Media.Digital Auth System Ready 🔐');

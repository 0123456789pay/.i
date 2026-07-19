// DESAIN KREATIF DIGITAL - Authentication Module
// Handles login, register, and user session management

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.storageKey = 'desainkreatif_user';
        this.apiEndpoint = '/api/auth';
        this.init();
    }
    
    init() {
        // Check for existing session
        const storedUser = localStorage.getItem(this.storageKey);
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateUIForLoggedInUser();
        }
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Social login buttons
        document.querySelectorAll('.btn-social').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const remember = document.querySelector('[name="remember"]').checked;
        
        try {
            // Simulate API call
            const response = await this.mockApiCall('/login', { email, password });
            
            if (response.success) {
                this.currentUser = response.user;
                
                if (remember) {
                    localStorage.setItem(this.storageKey, JSON.stringify(response.user));
                } else {
                    sessionStorage.setItem(this.storageKey, JSON.stringify(response.user));
                }
                
                this.updateUIForLoggedInUser();
                this.showNotification('Login berhasil! Selamat datang, ' + response.user.name);
                closeAuthModal();
            } else {
                this.showNotification('Login gagal. Periksa email dan kata sandi Anda.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirm').value;
        const terms = document.querySelector('[name="terms"]').checked;
        
        // Validation
        if (password.length < 8) {
            this.showNotification('Kata sandi minimal 8 karakter.', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('Kata sandi tidak cocok.', 'error');
            return;
        }
        
        if (!terms) {
            this.showNotification('Anda harus menyetujui syarat & ketentuan.', 'error');
            return;
        }
        
        try {
            // Simulate API call
            const response = await this.mockApiCall('/register', { name, email, password });
            
            if (response.success) {
                this.showNotification('Pendaftaran berhasil! Silakan masuk.');
                
                // Switch to login tab
                document.querySelector('[data-tab="login"]').click();
                
                // Pre-fill email
                document.getElementById('loginEmail').value = email;
            } else {
                this.showNotification(response.message || 'Pendaftaran gagal.', 'error');
            }
        } catch (error) {
            console.error('Register error:', error);
            this.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        }
    }
    
    handleSocialLogin(e) {
        const provider = e.currentTarget.classList.contains('google') ? 'google' :
                        e.currentTarget.classList.contains('facebook') ? 'facebook' : 'github';
        
        // Simulate OAuth flow
        this.showNotification(`Mengarahkan ke ${provider}...`);
        
        setTimeout(() => {
            this.currentUser = {
                name: 'User ' + provider,
                email: 'user@' + provider + '.com',
                provider: provider
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
            this.updateUIForLoggedInUser();
            this.showNotification('Login dengan ' + provider + ' berhasil!');
            closeAuthModal();
        }, 1500);
    }
    
    logout() {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.storageKey);
        this.currentUser = null;
        this.updateUIForLoggedOutUser();
        this.showNotification('Anda telah keluar.');
    }
    
    updateUIForLoggedInUser() {
        const loginBtn = document.querySelector('.btn-login');
        const registerBtn = document.querySelector('.btn-register');
        
        if (loginBtn && registerBtn) {
            loginBtn.textContent = this.currentUser.name;
            registerBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Keluar';
            registerBtn.onclick = () => this.logout();
        }
        
        // Update notification badge
        const badge = document.querySelector('.badge');
        if (badge) {
            badge.style.display = 'block';
        }
    }
    
    updateUIForLoggedOutUser() {
        const loginBtn = document.querySelector('.btn-login');
        const registerBtn = document.querySelector('.btn-register');
        
        if (loginBtn && registerBtn) {
            loginBtn.textContent = 'Masuk';
            loginBtn.onclick = () => openAuthModal();
            registerBtn.innerHTML = 'Daftar';
            registerBtn.onclick = () => openAuthModal();
        }
    }
    
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#00cc66' : '#ff4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    async mockApiCall(endpoint, data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock responses
        if (endpoint === '/login') {
            return {
                success: true,
                user: {
                    name: data.email.split('@')[0],
                    email: data.email,
                    avatar: null
                }
            };
        }
        
        if (endpoint === '/register') {
            return {
                success: true,
                message: 'Account created successfully'
            };
        }
        
        return { success: false };
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getUser() {
        return this.currentUser;
    }
}

// Initialize auth manager when DOM is ready
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

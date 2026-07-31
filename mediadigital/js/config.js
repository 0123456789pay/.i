/**
 * Environment Configuration - Production Ready
 * Media Digital Platform
 * 
 * IMPORTANT: Copy this file and customize for your environment
 * Never commit sensitive credentials to version control
 */

const APP_CONFIG = {
    // Application Settings
    APP_NAME: 'Media Digital Platform',
    APP_VERSION: '2.0.0',
    ENVIRONMENT: 'production', // Change to 'development' for local testing
    
    // Security Settings
    SECURITY: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        PASSWORD_MIN_LENGTH: 8,
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
        ENABLE_INPUT_SANITIZATION: true,
        ENABLE_XSS_PROTECTION: true,
        ENABLE_CSRF_PROTECTION: true
    },
    
    // GitHub API Configuration
    GITHUB: {
        USERNAME: 'jenisprotokol',
        API_BASE_URL: 'https://api.github.com',
        RATE_LIMIT_WARNING: 40,
        CACHE_DURATION: 5 * 60 * 1000
    },
    
    // Admin Configuration - CHANGE THESE IN PRODUCTION!
    ADMIN: {
        DEFAULT_EMAIL: 'admin@adminroot.innn',
        ROLE: 'admin'
    },
    
    // Storage Keys
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        IS_LOGGED_IN: 'isLoggedIn',
        ADMIN_USER: 'adminUser',
        USERS: 'users',
        LOGIN_ATTEMPTS: 'loginAttempts',
        SESSION_START: 'sessionStart',
        CSRF_TOKEN: 'csrfToken'
    },
    
    // UI Settings
    UI: {
        AUTO_REFRESH_INTERVAL: 300000, // 5 minutes
        ANIMATION_DURATION: 600,
        SCROLL_OFFSET: 50,
        TOAST_DURATION: 3000
    },
    
    // Validation Patterns
    VALIDATION: {
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        USERNAME_PATTERN: /^[a-zA-Z0-9_]{3,20}$/,
        PASSWORD_PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        URL_PATTERN: /^https?:\/\/.+\..+$/
    },
    
    // Error Messages (Bahasa Indonesia)
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
        UNAUTHORIZED: 'Anda tidak memiliki akses ke halaman ini.',
        SESSION_EXPIRED: 'Sesi Anda telah berakhir. Silakan login kembali.',
        INVALID_INPUT: 'Input tidak valid. Mohon periksa kembali.',
        SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
    }
};

// Freeze configuration to prevent modifications
Object.freeze(APP_CONFIG.SECURITY);
Object.freeze(APP_CONFIG.GITHUB);
Object.freeze(APP_CONFIG.ADMIN);
Object.freeze(APP_CONFIG.STORAGE_KEYS);
Object.freeze(APP_CONFIG.UI);
Object.freeze(APP_CONFIG.VALIDATION);
Object.freeze(APP_CONFIG.ERROR_MESSAGES);
Object.freeze(APP_CONFIG);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
}

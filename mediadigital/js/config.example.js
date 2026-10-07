/**
 * Environment pengaturan
 * media digital landasan - konfigurasi berkas
 * 
 * Instructions:
 * 1. Copy ini berkas to konfigurasi.js
 * 2. perbarui ini values according to your environment
 * 3. Never commit konfigurasi.js dengan sensitive data to versi control
 */

const APP_CONFIG = {
    // aplikasi pengaturan
    APP_NAME: 'Media Digital Platform',
    APP_VERSION: '2.0.0',
    ENVIRONMENT: 'development', // 'development' | 'production' | 'testing'
    
    // keamanan pengaturan
    SECURITY: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
        PASSWORD_MIN_LENGTH: 8,
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
        ENABLE_INPUT_SANITIZATION: true,
        ENABLE_XSS_PROTECTION: true,
        ENABLE_CSRF_PROTECTION: true
    },
    
    // GitHub API pengaturan
    GITHUB: {
        USERNAME: 'jenisprotokol',
        API_BASE_URL: 'https://api.github.com',
        RATE_LIMIT_WARNING: 40, // Warn when remaining requests below ini
        CACHE_DURATION: 5 * 60 * 1000 // 5 minutes tembolok
    },
    
    // pengelola pengaturan (Change these in production!)
    ADMIN: {
        DEFAULT_EMAIL: 'admin@adminroot.innn',
        DEFAULT_PASSWORD_HASH: '$2a$10$example_hash_change_in_production', // Use hashed passwords
        ROLE: 'admin'
    },
    
    // penyimpanan kunci-kunci
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        IS_LOGGED_IN: 'isLoggedIn',
        ADMIN_USER: 'adminUser',
        USERS: 'users',
        LOGIN_ATTEMPTS: 'loginAttempts',
        SESSION_START: 'sessionStart',
        CSRF_TOKEN: 'csrfToken'
    },
    
    // API Endpoints
    API: {
        BASE_URL: '/api',
        AUTH: '/auth',
        USERS: '/users',
        REPOS: '/repos',
        SESSION: '/session'
    },
    
    // UI pengaturan
    UI: {
        AUTO_REFRESH_INTERVAL: 300000, // 5 minutes
        ANIMATION_DURATION: 600, // ms
        SCROLL_OFFSET: 50,
        TOAST_DURATION: 3000 // ms
    },
    
    // Validation Patterns
    VALIDATION: {
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        USERNAME_PATTERN: /^[a-zA-Z0-9_]{3,20}$/,
        PASSWORD_PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        URL_PATTERN: /^https?:\/\/.+\..+$/
    },
    
    // galat Messages
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
        UNAUTHORIZED: 'Anda tidak memiliki akses ke halaman ini.',
        SESSION_EXPIRED: 'Sesi Anda telah berakhir. Silakan login kembali.',
        INVALID_INPUT: 'Input tidak valid. Mohon periksa kembali.',
        SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
    }
};

// Freeze pengaturan to prevent modifications
Object.freeze(APP_CONFIG.SECURITY);
Object.freeze(APP_CONFIG.GITHUB);
Object.freeze(APP_CONFIG.ADMIN);
Object.freeze(APP_CONFIG.STORAGE_KEYS);
Object.freeze(APP_CONFIG.API);
Object.freeze(APP_CONFIG.UI);
Object.freeze(APP_CONFIG.VALIDATION);
Object.freeze(APP_CONFIG.ERROR_MESSAGES);
Object.freeze(APP_CONFIG);

// Export untuk module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
}

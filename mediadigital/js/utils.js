/**
 * Utility Functions - keamanan, Validation, dan Helpers
 * media digital landasan
 */

// Import konfigurasi (make sure konfigurasi.js exists)
const CONFIG = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : {
    SECURITY: {
        SESSION_TIMEOUT: 30 * 60 * 1000,
        PASSWORD_MIN_LENGTH: 8,
        ENABLE_INPUT_SANITIZATION: true
    },
    VALIDATION: {
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PASSWORD_PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
    },
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        SESSION_START: 'sessionStart',
        USERS: 'users'
    }
};

/**
 * masukan Sanitization Module
 */
const Sanitizer = {
    /**
     * singkirkan potentially dangerous characters dari masukan
     * @param {rentetan} masukan - Raw masukan rentetan
     * @returns {rentetan} - Sanitized rentetan
     */
    sanitize(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // singkirkan HTML tags
        let sanitized = input.replace(/<[^>]*>/g, '');
        
        // singkirkan skrip tags dan skrip-skrip-javascript: protocols
        sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        sanitized = sanitized.replace(/javascript:/gi, '');
        
        // Encode special characters
        sanitized = sanitized
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
        
        // Trim whitespace
        return sanitized.trim();
    },

    /**
     * Sanitize object properties
     * @param {Object} obj - Object dengan rentetan values
     * @returns {Object} - Object dengan sanitized values
     */
    sanitizeObject(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key] = this.sanitize(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
};

/**
 * Validation Module
 */
const Validator = {
    /**
     * sahkan sur-el format
     * @param {rentetan} sur-el - sur-el to sahkan
     * @returns {boolean} - benar if valid
     */
    isValidEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        return CONFIG.VALIDATION.EMAIL_PATTERN.test(email);
    },

    /**
     * sahkan sandian strength
     * @param {rentetan} sandian - sandian to sahkan
     * @returns {Object} - { valid: boolean, errors: rentetan[] }
     */
    isValidPassword(password) {
        const errors = [];
        
        if (!password || typeof password !== 'string') {
            errors.push('Password diperlukan');
            return { valid: false, errors };
        }
        
        if (password.length < CONFIG.SECURITY.PASSWORD_MIN_LENGTH) {
            errors.push(`Password minimal ${CONFIG.SECURITY.PASSWORD_MIN_LENGTH} karakter`);
        }
        
        if (!/(?=.*[A-Za-z])/.test(password)) {
            errors.push('Password harus mengandung huruf');
        }
        
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Password harus mengandung angka');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    },

    /**
     * periksa if username is valid
     * @param {rentetan} username - Username to sahkan
     * @returns {boolean} - benar if valid
     */
    isValidUsername(username) {
        if (!username || typeof username !== 'string') {
            return false;
        }
        return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    },

    /**
     * sahkan required fields
     * @param {Object} fields - Object dengan field nama dan values
     * @returns {Object} - { valid: boolean, missingFields: rentetan[] }
     */
    validateRequired(fields) {
        const missingFields = [];
        
        for (const [fieldName, value] of Object.entries(fields)) {
            if (!value || (typeof value === 'string' && !value.trim())) {
                missingFields.push(fieldName);
            }
        }
        
        return {
            valid: missingFields.length === 0,
            missingFields
        };
    }
};

/**
 * sesi pengelolaan Module
 */
const SessionManager = {
    /**
     * mulai a baru sesi
     */
    startSession() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION_START, Date.now().toString());
    },

    /**
     * Get sesi mulai waktu
     * @returns {angka|null} - cap-waktu atau null
     */
    getSessionStart() {
        const start = localStorage.getItem(CONFIG.STORAGE_KEYS.SESSION_START);
        return start ? parseInt(start, 10) : null;
    },

    /**
     * periksa if sesi has expired
     * @returns {boolean} - benar if expired
     */
    isSessionExpired() {
        const sessionStart = this.getSessionStart();
        if (!sessionStart) {
            return true;
        }
        
        const elapsed = Date.now() - sessionStart;
        return elapsed > CONFIG.SECURITY.SESSION_TIMEOUT;
    },

    /**
     * Refresh sesi timeout
     */
    refreshSession() {
        this.startSession();
    },

    /**
     * End current sesi
     */
    endSession() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.SESSION_START);
    },

    /**
     * periksa sesi dan logout if expired
     * @returns {boolean} - benar if sesi is valid
     */
    checkSession() {
        if (this.isSessionExpired()) {
            this.endSession();
            localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('adminUser');
            return false;
        }
        
        // Refresh sesi on activity
        this.refreshSession();
        return true;
    },

    /**
     * Setup automatic sesi checking
     */
    setupAutoCheck() {
        // periksa every minute
        setInterval(() => {
            if (!this.checkSession()) {
                alert(CONFIG.ERROR_MESSAGES?.SESSION_EXPIRED || 'Sesi Anda telah berakhir. Silakan login kembali.');
                window.location.href = 'login.html';
            }
        }, 60000);
    }
};

/**
 * CSRF Token Manager
 */
const CSRFManager = {
    /**
     * hasilkan a random CSRF token
     * @returns {rentetan} - Random token
     */
    generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Get atau buat CSRF token
     * @returns {rentetan} - CSRF token
     */
    getToken() {
        let token = localStorage.getItem(CONFIG.STORAGE_KEYS.CSRF_TOKEN);
        if (!token) {
            token = this.generateToken();
            localStorage.setItem(CONFIG.STORAGE_KEYS.CSRF_TOKEN, token);
        }
        return token;
    },

    /**
     * sahkan CSRF token
     * @param {rentetan} token - Token to sahkan
     * @returns {boolean} - benar if valid
     */
    validateToken(token) {
        const storedToken = this.getToken();
        return token === storedToken;
    }
};

/**
 * Simple Hash fungsi (untuk demo purposes - use bcrypt in production)
 * @param {rentetan} str - rentetan to hash
 * @returns {rentetan} - Hashed rentetan
 */
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
}

/**
 * Debounce fungsi untuk performance optimization
 * @param {fungsi} func - fungsi to debounce
 * @param {angka} tunggu - tunggu waktu in ms
 * @returns {fungsi} - Debounced fungsi
 */
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

/**
 * Throttle fungsi untuk limiting execution rate
 * @param {fungsi} func - fungsi to throttle
 * @param {angka} limit - waktu limit in ms
 * @returns {fungsi} - Throttled fungsi
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Sanitizer,
        Validator,
        SessionManager,
        CSRFManager,
        simpleHash,
        debounce,
        throttle
    };
}

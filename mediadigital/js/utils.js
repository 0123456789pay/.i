/**
 * Utility Functions - Security, Validation, and Helpers
 * Media Digital Platform
 */

// Import config (make sure config.js exists)
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
 * Input Sanitization Module
 */
const Sanitizer = {
    /**
     * Remove potentially dangerous characters from input
     * @param {string} input - Raw input string
     * @returns {string} - Sanitized string
     */
    sanitize(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // Remove HTML tags
        let sanitized = input.replace(/<[^>]*>/g, '');
        
        // Remove script tags and javascript: protocols
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
     * @param {Object} obj - Object with string values
     * @returns {Object} - Object with sanitized values
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
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    isValidEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        return CONFIG.VALIDATION.EMAIL_PATTERN.test(email);
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} - { valid: boolean, errors: string[] }
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
     * Check if username is valid
     * @param {string} username - Username to validate
     * @returns {boolean} - True if valid
     */
    isValidUsername(username) {
        if (!username || typeof username !== 'string') {
            return false;
        }
        return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    },

    /**
     * Validate required fields
     * @param {Object} fields - Object with field names and values
     * @returns {Object} - { valid: boolean, missingFields: string[] }
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
 * Session Management Module
 */
const SessionManager = {
    /**
     * Start a new session
     */
    startSession() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION_START, Date.now().toString());
    },

    /**
     * Get session start time
     * @returns {number|null} - Timestamp or null
     */
    getSessionStart() {
        const start = localStorage.getItem(CONFIG.STORAGE_KEYS.SESSION_START);
        return start ? parseInt(start, 10) : null;
    },

    /**
     * Check if session has expired
     * @returns {boolean} - True if expired
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
     * Refresh session timeout
     */
    refreshSession() {
        this.startSession();
    },

    /**
     * End current session
     */
    endSession() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.SESSION_START);
    },

    /**
     * Check session and logout if expired
     * @returns {boolean} - True if session is valid
     */
    checkSession() {
        if (this.isSessionExpired()) {
            this.endSession();
            localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('adminUser');
            return false;
        }
        
        // Refresh session on activity
        this.refreshSession();
        return true;
    },

    /**
     * Setup automatic session checking
     */
    setupAutoCheck() {
        // Check every minute
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
     * Generate a random CSRF token
     * @returns {string} - Random token
     */
    generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Get or create CSRF token
     * @returns {string} - CSRF token
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
     * Validate CSRF token
     * @param {string} token - Token to validate
     * @returns {boolean} - True if valid
     */
    validateToken(token) {
        const storedToken = this.getToken();
        return token === storedToken;
    }
};

/**
 * Simple Hash Function (for demo purposes - use bcrypt in production)
 * @param {string} str - String to hash
 * @returns {string} - Hashed string
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
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
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
 * Throttle function for limiting execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} - Throttled function
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

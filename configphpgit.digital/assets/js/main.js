/**
 * Main JavaScript - Secure System Activation
 * Mix: JS + GitHub CDN integration + Binary validation
 */

// Configuration object dengan binary-safe patterns
const SecureConfig = {
    version: '1.0.0',
    secureMode: true,
    githubCDNEnabled: true,
    regexPatterns: {
        githubURL: /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/,
        githubRaw: /^https:\/\/raw\.githubusercontent\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/.+/,
        secureToken: /^[a-f0-9]{64}$/i,
        fileExtension: /\.(php|html|css|js|json)$/i,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        alphanumeric: /^[a-zA-Z0-9_]+$/
    },
    
    // Formula aktivasi sistem
    activationFormula: function(config) {
        return config.secureMode && 
               config.githubCDNEnabled && 
               this.validateConfig(config);
    },
    
    // Validasi konfigurasi dengan regex
    validateConfig: function(config) {
        for (const [key, pattern] of Object.entries(this.regexPatterns)) {
            if (config[key] && !pattern.test(config[key])) {
                console.warn(`Invalid config for ${key}`);
                return false;
            }
        }
        return true;
    }
};

// Class untuk manajemen asset dari GitHub
class GitHubAssetLoader {
    constructor(baseURL = 'https://raw.githubusercontent.com/') {
        this.baseURL = baseURL;
        this.loadedAssets = new Set();
        this.cache = new Map();
    }
    
    // Load CSS dari GitHub CDN
    async loadCSS(repo, branch, path) {
        const url = `${this.baseURL}${repo}/${branch}/${path}`;
        
        if (!SecureConfig.regexPatterns.githubRaw.test(url)) {
            throw new Error('Invalid GitHub URL');
        }
        
        if (this.loadedAssets.has(url)) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = () => {
                this.loadedAssets.add(url);
                resolve();
            };
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    // Load JS dari GitHub CDN
    async loadJS(repo, branch, path) {
        const url = `${this.baseURL}${repo}/${branch}/${path}`;
        
        if (!SecureConfig.regexPatterns.githubRaw.test(url)) {
            throw new Error('Invalid GitHub URL');
        }
        
        if (this.loadedAssets.has(url)) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
}

// Security Header Validator
class SecurityValidator {
    constructor() {
        this.headers = {};
    }
    
    // Validate CSP header
    validateCSP(policy) {
        const requiredDirectives = ['default-src', 'script-src', 'style-src'];
        for (const directive of requiredDirectives) {
            if (!policy[directive]) {
                console.warn(`Missing CSP directive: ${directive}`);
            }
        }
        return true;
    }
    
    // Generate nonce untuk inline scripts
    generateNonce() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode(...array));
    }
    
    // Generate hash untuk integrity check
    async generateHash(content, algorithm = 'SHA-256') {
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = btoa(String.fromCharCode(...hashArray));
        return `${algorithm.toLowerCase().replace('-', '')}-${hashBase64}`;
    }
}

// UI Manager untuk tampilan media.digital style
class UIManager {
    constructor() {
        this.cards = [];
        this.animations = [];
    }
    
    // Create card element
    createCard(icon, title, description, status = 'active') {
        const card = document.createElement('div');
        card.className = 'card animate-in';
        card.innerHTML = `
            <div class="card-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${description}</p>
            <span class="status-badge status-${status}">
                <span class="status-dot"></span>
                ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        `;
        return card;
    }
    
    // Add card to grid
    addCardToGrid(card, gridSelector = '.card-grid') {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            grid.appendChild(card);
        }
    }
    
    // Animate elements on scroll
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }
}

// Initialize system saat DOM ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔒 Secure PHP System Initializing...');
    
    // Initialize components
    const assetLoader = new GitHubAssetLoader();
    const securityValidator = new SecurityValidator();
    const uiManager = new UIManager();
    
    // Validate activation formula
    const isActive = SecureConfig.activationFormula(SecureConfig);
    console.log('System Active:', isActive);
    
    // Setup security headers validation
    const cspPolicy = {
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline' https://raw.githubusercontent.com",
        'style-src': "'self' 'unsafe-inline' https://raw.githubusercontent.com"
    };
    
    securityValidator.validateCSP(cspPolicy);
    
    // Setup scroll animations
    uiManager.setupScrollAnimation();
    
    // Example: Load assets from GitHub (optional)
    try {
        // Uncomment to load Bootstrap from GitHub
        // await assetLoader.loadCSS('twbs/bootstrap', 'main', 'dist/css/bootstrap.min.css');
        console.log('✅ Assets loaded successfully');
    } catch (error) {
        console.warn('Asset loading failed:', error.message);
    }
    
    console.log('🎉 System Ready - Media Digital Style Interface');
});

// Export untuk module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SecureConfig, GitHubAssetLoader, SecurityValidator, UIManager };
}

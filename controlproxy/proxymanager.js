/**
 * Proxy Configuration Manager
 * Loads and manages proxy settings from /controlproxy/proxyconfig.json
 */

const ProxyConfig = {
    config: null,
    
    // Default configuration as fallback
    defaultConfig: {
        proxy: {
            enabled: true,
            provider: "allorigins",
            endpoints: {
                allorigins: "https://api.allorigins.win/get?url=",
                corsproxy: "https://corsproxy.io/?",
                thingproxy: "https://thingproxy.freeboard.io/fetch/"
            },
            defaultEndpoint: "allorigins",
            bypassRules: ["localhost", "127.0.0.1", "*.github.io"]
        },
        domains: {
            google: {
                patterns: ["accounts.google.com", "google.com", "gmail.com"],
                requireProxy: true,
                allowIframe: true
            },
            coder: {
                patterns: ["coder.qwen.ai", "qwen.ai"],
                requireProxy: false,
                allowIframe: true,
                defaultUser: "logreg197@gmail.com"
            }
        },
        iframe: {
            defaultSandbox: "allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation",
            permissions: ["geolocation", "microphone", "camera", "fullscreen", "payment", "clipboard-write", "autoplay"]
        },
        user: {
            defaultEmail: "logreg197@gmail.com",
            storageKey: "browserUserEmail"
        }
    },

    /**
     * Load configuration from JSON file
     */
    async load() {
        try {
            const response = await fetch('/controlproxy/proxyconfig.json');
            if (response.ok) {
                this.config = await response.json();
                console.log('[ProxyConfig] Configuration loaded successfully');
                return this.config;
            }
        } catch (error) {
            console.warn('[ProxyConfig] Failed to load config, using defaults:', error);
        }
        this.config = this.defaultConfig;
        return this.config;
    },

    /**
     * Get proxy endpoint URL
     */
    getProxyUrl(url, endpoint = null) {
        const cfg = this.config || this.defaultConfig;
        const ep = endpoint || cfg.proxy.defaultEndpoint;
        const baseUrl = cfg.proxy.endpoints[ep];
        
        if (!baseUrl) {
            console.warn('[ProxyConfig] Unknown endpoint:', ep);
            return url;
        }
        
        return baseUrl + encodeURIComponent(url);
    },

    /**
     * Check if domain requires proxy
     */
    requiresProxy(url) {
        const cfg = this.config || this.defaultConfig;
        const domain = this.extractDomain(url);
        
        for (const [key, domainCfg] of Object.entries(cfg.domains)) {
            for (const pattern of domainCfg.patterns) {
                if (this.matchesPattern(domain, pattern)) {
                    return domainCfg.requireProxy || false;
                }
            }
        }
        
        // Default: don't require proxy unless explicitly configured
        return false;
    },

    /**
     * Check if domain allows iframe embedding
     */
    allowsIframe(url) {
        const cfg = this.config || this.defaultConfig;
        const domain = this.extractDomain(url);
        
        for (const [key, domainCfg] of Object.entries(cfg.domains)) {
            for (const pattern of domainCfg.patterns) {
                if (this.matchesPattern(domain, pattern)) {
                    return domainCfg.allowIframe !== false;
                }
            }
        }
        
        return true; // Default allow
    },

    /**
     * Get sandbox attributes for domain
     */
    getSandboxAttributes(url) {
        const cfg = this.config || this.defaultConfig;
        const domain = this.extractDomain(url);
        
        for (const [key, domainCfg] of Object.entries(cfg.domains)) {
            for (const pattern of domainCfg.patterns) {
                if (this.matchesPattern(domain, pattern)) {
                    if (domainCfg.sandbox) {
                        return domainCfg.sandbox;
                    }
                }
            }
        }
        
        return cfg.iframe.defaultSandbox;
    },

    /**
     * Get default user email for domain
     */
    getDefaultUser(url) {
        const cfg = this.config || this.defaultConfig;
        const domain = this.extractDomain(url);
        
        for (const [key, domainCfg] of Object.entries(cfg.domains)) {
            for (const pattern of domainCfg.patterns) {
                if (this.matchesPattern(domain, pattern)) {
                    return domainCfg.defaultUser || cfg.user.defaultEmail;
                }
            }
        }
        
        return cfg.user.defaultEmail;
    },

    /**
     * Extract domain from URL
     */
    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (e) {
            return url;
        }
    },

    /**
     * Check if domain matches pattern (supports wildcards)
     */
    matchesPattern(domain, pattern) {
        if (pattern.startsWith('*.')) {
            const suffix = pattern.substring(1);
            return domain.endsWith(suffix);
        }
        return domain === pattern || domain.includes(pattern);
    },

    /**
     * Check if URL should bypass proxy
     */
    shouldBypassProxy(url) {
        const cfg = this.config || this.defaultConfig;
        const domain = this.extractDomain(url);
        
        for (const rule of cfg.proxy.bypassRules) {
            if (this.matchesPattern(domain, rule)) {
                return true;
            }
        }
        
        return false;
    },

    /**
     * Get all permissions for iframe
     */
    getPermissions() {
        const cfg = this.config || this.defaultConfig;
        return cfg.iframe.permissions || [];
    },

    /**
     * Build permission string for iframe
     */
    buildPermissionString() {
        const permissions = this.getPermissions();
        return permissions.map(p => `${p};`).join(' ');
    }
};

// Auto-load configuration on module load
ProxyConfig.load();

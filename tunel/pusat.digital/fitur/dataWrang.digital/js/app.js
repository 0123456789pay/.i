/**
 * Feature Module - Pusat.Digital Ecosystem
 */
class FeatureModule {
    constructor(name) {
        this.name = name;
        this.version = '1.0.0';
        this.status = 'active';
        this.config = null;
    }
    async init() {
        console.log('[' + this.name + '] Initializing...');
        await this.loadConfig();
        this.setupEventListeners();
        this.registerServiceWorker();
        console.log('[' + this.name + '] Initialized successfully');
    }
    async loadConfig() {
        try {
            const response = await fetch('../config.json');
            this.config = await response.json();
            console.log('[' + this.name + '] Config loaded:', this.config);
        } catch (error) {
            console.error('[' + this.name + '] Config load error:', error);
        }
    }
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('[' + this.name + '] DOM ready');
        });
        window.addEventListener('online', () => {
            console.log('[' + this.name + '] Back online');
        });
        window.addEventListener('offline', () => {
            console.log('[' + this.name + '] Offline mode');
        });
    }
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('../../sw.js')
                .then(reg => console.log('[' + this.name + '] SW registered:', reg))
                .catch(err => console.error('[' + this.name + '] SW error:', err));
        }
    }
}
const featureModule = new FeatureModule('dataWrang');
featureModule.init();
window.Feature = featureModule;

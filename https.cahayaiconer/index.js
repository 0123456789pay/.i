/**
 * ALLUNIVERS ICONER - Cahaya Iconer Main Entry Point
 * Integrasi lengkap dengan Sidebar 300 menu, Top Bar 2500 menu, Modal, dan Layout Full Screen
 * Aksen: Putih + #0066ff
 */

// Import modules
import IHBSFCore from './systems/ihbsf-core.js';
import IHBSFReconstruction from './systems/ihbsf-reconstruction.js';
import MenuSystem from './menus/menu-system.js';
import IconEditor from './features/icon-editor.js';
import IconerFormat from './packages/iconer-format.js';
import IHBSFConfig from './config/ihbsf.config.js';
import CahayaIconerSidebar from './sidebar/menu-sidebar.js';
import CahayaIconerLayout from './layouts/fullscreen-layout.js';
import CahayaIconerMenuFunctions from './modals/menu-functions.js';

// Initialize complete system
class CahayaIconerApp {
    constructor() {
        this.ihbsf = new IHBSFCore();
        this.reconstruction = new IHBSFReconstruction();
        this.menus = new MenuSystem();
        this.editor = new IconEditor();
        this.format = new IconerFormat();
        this.config = new IHBSFConfig();
        this.sidebar = null;
        this.layout = null;
        this.menuFunctions = null;
        this.init();
    }

    init() {
        console.log('🚀 Cahaya Iconer - ALLUNIVERS ICONER System Initialized');
        console.log('📊 Stats: 300 Sidebar Menus | 2500 Top Bar Menus | Full Screen Layout');
        console.log('🎨 Theme: White + #0066ff (Luxury Modern Elite)');
        
        // Initialize core systems
        this.ihbsf.initialize();
        this.reconstruction.build();
        this.menus.load();
        this.editor.setup();
        this.format.register();
        this.config.apply();
        
        // Initialize new UI components
        setTimeout(() => {
            this.sidebar = new CahayaIconerSidebar();
            this.layout = new CahayaIconerLayout();
            this.menuFunctions = new CahayaIconerMenuFunctions();
            console.log('✅ All UI components loaded successfully');
        }, 100);
    }

    // Public API methods
    getStats() {
        return {
            sidebarMenus: 300,
            topMenus: 2500,
            categories: 15,
            theme: 'White + #0066ff',
            layout: 'Full Screen'
        };
    }
}

// Auto initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cahayaIconer = new CahayaIconerApp();
    
    // Expose to global scope for debugging
    window.ALLUNIVERS_ICONER = {
        version: '2.0.0',
        build: '2024.01',
        features: [
            '300 Sidebar Menus with Icons',
            '2500 Top Bar Menus',
            'Full Screen Layout',
            'Modal System',
            'Canvas Editor',
            'Property Panel',
            'Keyboard Shortcuts',
            'Undo/Redo System',
            'Export/Import',
            'White + #0066ff Theme'
        ],
        getStats: () => window.cahayaIconer?.getStats()
    };
    
    console.log('🌟 ALLUNIVERS ICONER Ready!');
    console.log('📁 Access via window.ALLUNIVERS_ICONER');
});

export default CahayaIconerApp;

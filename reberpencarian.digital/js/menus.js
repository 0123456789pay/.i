// ============================================
// ReberPencarian.digital - Menu Components JavaScript
// Sistem Menu Terintegrasi dengan Config-Driven Architecture
// ============================================

class MenuSystem {
    constructor() {
        this.currentContextMenu = null;
        this.sidebarOpen = false;
        this.activeDropdown = null;
        this.menuConfig = this.loadMenuConfig();
        this.regexPatterns = this.initRegexPatterns();
        
        this.init();
    }

    // Load konfigurasi dari file .conf
    loadMenuConfig() {
        return {
            core: {
                name: 'ReberCore-TRUE',
                version: '1.0.0',
                selector_symbol: 'TRUE'
            },
            protocol: {
                all_protocols: true,
                all_ports: true,
                all_hosts: true
            },
            menu: {
                enableAnimations: true,
                enableShortcuts: true,
                maxHistoryItems: 50
            }
        };
    }

    // Regex Patterns untuk validasi dan parsing
    initRegexPatterns() {
        return {
            url: /^(https?:\/\/|ftp:\/\/|file:\/\/|data:|reber:\/\/)[^\s]+$/,
            domain: /^[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
            ip: /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            query: /[^\w\s\-\.\/\?=&]/gi,
            sanitize: /<[^>]*>/g,
            configKey: /^\[([a-z_]+)\]$/,
            configValue: /^([a-z_]+)\s*=\s*(.+)$/
        };
    }

    init() {
        this.bindEvents();
        this.initNavigation();
        this.initSidebar();
        this.initContextMenu();
        this.initDropdowns();
        this.initQuickSearch();
        this.updateMenuBadges();
        console.log('Menu System initialized with ReberCore-TRUE');
    }

    // Bind semua event listeners
    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Sidebar close
        const sidebarClose = document.getElementById('sidebarClose');
        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => this.closeSidebar());
        }

        // Overlay click
        const overlay = document.getElementById('menuOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeAllMenus());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Close context menu on click elsewhere
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.context-menu')) {
                this.hideContextMenu();
            }
        });

        // Prevent default context menu and show custom one
        document.addEventListener('contextmenu', (e) => this.handleContextMenu(e));

        // Nav menu item clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Sidebar menu clicks
        document.querySelectorAll('.sidebar-menu-item a').forEach(item => {
            item.addEventListener('click', (e) => this.handleSidebarClick(e));
        });

        // Dropdown toggles
        document.querySelectorAll('.dropdown-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDropdownToggle(e));
        });

        // Profile button
        const profileBtn = document.getElementById('btnUserProfile');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileDropdown();
            });
        }

        // Settings dropdown
        const settingsBtn = document.getElementById('btnSettingsDropdown');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSettingsDropdown();
            });
        }
    }

    // Navigation handling
    initNavigation() {
        // Set active state based on current page
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-item').forEach(item => {
            const menuType = item.dataset.menu;
            if ((currentPage === '' && menuType === 'home') || 
                currentPage.includes(menuType)) {
                item.querySelector('.nav-link')?.classList.add('active');
            }
        });
    }

    // Sidebar handling
    initSidebar() {
        // Search in sidebar
        const sidebarSearch = document.getElementById('sidebarSearch');
        if (sidebarSearch) {
            sidebarSearch.addEventListener('input', (e) => {
                this.filterSidebarMenu(e.target.value);
            });
        }
    }

    // Context menu handling
    initContextMenu() {
        this.contextMenu = document.getElementById('contextMenu');
    }

    handleContextMenu(e) {
        e.preventDefault();
        
        const target = e.target;
        const menuItem = target.closest('.nav-item, .sidebar-menu-item, [data-action]');
        
        if (menuItem) {
            this.showContextMenu(e.clientX, e.clientY, menuItem);
        }
    }

    showContextMenu(x, y, target) {
        if (!this.contextMenu) return;

        // Position context menu
        this.contextMenu.style.left = `${x}px`;
        this.contextMenu.style.top = `${y}px`;
        this.contextMenu.classList.add('active');

        // Store reference to target
        this.currentContextMenuTarget = target;

        // Ensure menu stays within viewport
        const rect = this.contextMenu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            this.contextMenu.style.left = `${x - rect.width}px`;
        }
        if (rect.bottom > window.innerHeight) {
            this.contextMenu.style.top = `${y - rect.height}px`;
        }

        // Handle context menu item clicks
        this.contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.onclick = () => this.handleContextAction(item.dataset.action);
        });
    }

    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.classList.remove('active');
        }
        this.currentContextMenuTarget = null;
    }

    handleContextAction(action) {
        const target = this.currentContextMenuTarget;
        if (!target) return;

        switch (action) {
            case 'open':
                const link = target.querySelector('a');
                if (link) link.click();
                break;
            case 'bookmark':
                this.addBookmark(target);
                break;
            case 'copy-link':
                this.copyLink(target);
                break;
            case 'share':
                this.shareItem(target);
                break;
            case 'properties':
                this.showProperties(target);
                break;
        }

        this.hideContextMenu();
    }

    // Dropdown handling
    initDropdowns() {
        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (!menu.classList.contains('profile-dropdown') && 
                    !menu.classList.contains('settings-dropdown')) {
                    menu.classList.remove('active');
                }
            });
        });
    }

    toggleProfileDropdown() {
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            const isActive = dropdown.classList.contains('active');
            this.closeAllDropdowns();
            if (!isActive) {
                dropdown.classList.add('active');
            }
        }
    }

    toggleSettingsDropdown() {
        const dropdown = document.getElementById('settingsDropdown');
        if (dropdown) {
            const isActive = dropdown.classList.contains('active');
            this.closeAllDropdowns();
            if (!isActive) {
                dropdown.classList.add('active');
            }
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }

    // Quick search handling
    initQuickSearch() {
        const navSearch = document.getElementById('navQuickSearch');
        if (navSearch) {
            navSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performQuickSearch(navSearch.value);
                }
            });
        }
    }

    performQuickSearch(query) {
        if (!query.trim()) return;

        // Sanitize input
        query = query.replace(this.regexPatterns.sanitize, '');

        // Redirect to search with query
        if (window.ReberPencarian) {
            window.ReberPencarian.search(query);
        } else {
            window.location.href = `../index.html?q=${encodeURIComponent(query)}`;
        }
    }

    // Toggle sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebarMenu');
        const overlay = document.getElementById('menuOverlay');
        
        if (sidebar && overlay) {
            this.sidebarOpen = !this.sidebarOpen;
            sidebar.classList.toggle('active', this.sidebarOpen);
            overlay.classList.toggle('active', this.sidebarOpen);
            document.body.style.overflow = this.sidebarOpen ? 'hidden' : '';
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebarMenu');
        const overlay = document.getElementById('menuOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            this.sidebarOpen = false;
            document.body.style.overflow = '';
        }
    }

    closeAllMenus() {
        this.closeSidebar();
        this.closeAllDropdowns();
        this.hideContextMenu();
    }

    // Filter sidebar menu items
    filterSidebarMenu(query) {
        const items = document.querySelectorAll('.sidebar-menu-item');
        const searchTerm = query.toLowerCase();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Handle navigation clicks
    handleNavClick(e) {
        const link = e.currentTarget;
        const parent = link.closest('.nav-item');
        
        // Remove active class from all items
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked item
        link.classList.add('active');

        // Handle submenu items
        if (parent?.classList.contains('has-submenu')) {
            e.preventDefault();
        }
    }

    // Handle sidebar clicks
    handleSidebarClick(e) {
        const link = e.currentTarget;
        const parent = link.closest('.sidebar-menu-item');

        // Remove active class from all items
        document.querySelectorAll('.sidebar-menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        parent?.classList.add('active');

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 1024) {
            setTimeout(() => this.closeSidebar(), 300);
        }
    }

    // Handle dropdown toggle
    handleDropdownToggle(e) {
        e.stopPropagation();
        const btn = e.currentTarget;
        const dropdown = btn.nextElementSibling;
        
        if (dropdown?.classList.contains('dropdown-menu')) {
            dropdown.classList.toggle('active');
        }
    }

    // Keyboard shortcuts
    handleKeyboard(e) {
        // Don't trigger if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const shortcuts = {
            'Escape': () => this.closeAllMenus(),
            'Alt+M': () => this.toggleSidebar(),
            'Alt+S': () => this.focusQuickSearch(),
            'Alt+B': () => this.openBookmarks(),
            'Alt+H': () => this.openHistory()
        };

        const key = e.altKey ? `Alt+${e.key.toUpperCase()}` : e.key;
        
        if (shortcuts[key]) {
            e.preventDefault();
            shortcuts[key]();
        }
    }

    focusQuickSearch() {
        const searchInput = document.getElementById('navQuickSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    openBookmarks() {
        // Implement bookmark opening logic
        console.log('Opening bookmarks...');
    }

    openHistory() {
        // Implement history opening logic
        console.log('Opening history...');
    }

    // Update menu badges
    updateMenuBadges() {
        // Update bookmark count
        const bookmarkCount = document.getElementById('bookmarkCount');
        if (bookmarkCount) {
            const count = localStorage.getItem('reber_bookmarks') ? 
                JSON.parse(localStorage.getItem('reber_bookmarks')).length : 0;
            bookmarkCount.textContent = count;
            bookmarkCount.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    // Bookmark management
    addBookmark(target) {
        const link = target.querySelector('a');
        if (!link) return;

        const bookmark = {
            title: link.textContent.trim(),
            url: link.href,
            timestamp: Date.now()
        };

        const bookmarks = JSON.parse(localStorage.getItem('reber_bookmarks') || '[]');
        bookmarks.push(bookmark);
        localStorage.setItem('reber_bookmarks', JSON.stringify(bookmarks));

        this.updateMenuBadges();
        this.showNotification('Bookmark ditambahkan!', 'success');
    }

    copyLink(target) {
        const link = target.querySelector('a');
        if (!link) return;

        navigator.clipboard.writeText(link.href).then(() => {
            this.showNotification('Tautan disalin!', 'success');
        });
    }

    shareItem(target) {
        const link = target.querySelector('a');
        if (!link) return;

        if (navigator.share) {
            navigator.share({
                title: link.textContent.trim(),
                url: link.href
            });
        } else {
            this.copyLink(target);
        }
    }

    showProperties(target) {
        const link = target.querySelector('a');
        if (!link) return;

        const properties = {
            Title: link.textContent.trim(),
            URL: link.href,
            Category: target.dataset.category || 'General'
        };

        console.log('Properties:', properties);
        alert(JSON.stringify(properties, null, 2));
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-blue)'};
            color: white;
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize menu system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.MenuSystem = new MenuSystem();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

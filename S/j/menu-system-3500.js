/**
 * ALLUNIVERS ICONER - Icon Maker Menu System
 * 3500+ Menu Items dengan Icon dan Teks
 * Tema: Putih + #0066ff (Mewah Modern Elite)
 */

class IconMakerMenuSystem {
    constructor() {
        this.totalMenus = 3500;
        this.categories = this.generateCategories();
        this.menus = this.generateAllMenus();
        this.activeMenu = null;
        this.searchQuery = '';
        this.favoriteMenus = new Set();
        
        console.log(`🎨 Icon Maker Menu System Initialized: ${this.totalMenus} menus loaded`);
    }

    // Generate 50 Kategori Utama
    generateCategories() {
        return [
            { id: 'file', name: 'File Operations', icon: 'fa-folder', count: 100 },
            { id: 'edit', name: 'Edit Tools', icon: 'fa-edit', count: 80 },
            { id: 'view', name: 'View Options', icon: 'fa-eye', count: 70 },
            { id: 'insert', name: 'Insert Elements', icon: 'fa-plus-circle', count: 120 },
            { id: 'shape', name: 'Shape Tools', icon: 'fa-draw-polygon', count: 150 },
            { id: 'path', name: 'Path & Vector', icon: 'fa-bezier-curve', count: 130 },
            { id: 'text', name: 'Text Tools', icon: 'fa-font', count: 140 },
            { id: 'color', name: 'Color Management', icon: 'fa-palette', count: 160 },
            { id: 'gradient', name: 'Gradient Systems', icon: 'fa-swatchbook', count: 110 },
            { id: 'pattern', name: 'Pattern Library', icon: 'fa-th', count: 120 },
            { id: 'effect', name: 'Effects & Filters', icon: 'fa-magic', count: 180 },
            { id: 'blur', name: 'Blur Effects', icon: 'fa-tint', count: 90 },
            { id: 'sharpen', name: 'Sharpen Tools', icon: 'fa-adjust', count: 70 },
            { id: 'distort', name: 'Distortion', icon: 'fa-compress-arrows-alt', count: 85 },
            { id: 'light', name: 'Lighting', icon: 'fa-lightbulb', count: 95 },
            { id: 'shadow', name: 'Shadow Systems', icon: 'fa-cloud-moon', count: 100 },
            { id: 'glow', name: 'Glow Effects', icon: 'fa-star', count: 80 },
            { id: 'texture', name: 'Texture Library', icon: 'fa-border-all', count: 140 },
            { id: 'material', name: 'Materials', icon: 'fa-layer-group', count: 130 },
            { id: 'brush', name: 'Brush Engine', icon: 'fa-paint-brush', count: 200 },
            { id: 'pencil', name: 'Pencil Tools', icon: 'fa-pencil-alt', count: 110 },
            { id: 'eraser', name: 'Eraser Systems', icon: 'fa-eraser', count: 75 },
            { id: 'fill', name: 'Fill Tools', icon: 'fa-fill-drip', count: 90 },
            { id: 'select', name: 'Selection Tools', icon: 'fa-vector-square', count: 120 },
            { id: 'transform', name: 'Transform', icon: 'fa-sync-alt', count: 100 },
            { id: 'rotate', name: 'Rotation Tools', icon: 'fa-redo', count: 85 },
            { id: 'scale', name: 'Scale & Resize', icon: 'fa-expand', count: 80 },
            { id: 'crop', name: 'Crop Tools', icon: 'fa-crop', count: 70 },
            { id: 'slice', name: 'Slice Tools', icon: 'fa-cut', count: 65 },
            { id: 'layer', name: 'Layer Management', icon: 'fa-layers', count: 150 },
            { id: 'mask', name: 'Mask Systems', icon: 'fa-mask', count: 95 },
            { id: 'blend', name: 'Blend Modes', icon: 'fa-random', count: 110 },
            { id: 'adjust', name: 'Adjustments', icon: 'fa-sliders-h', count: 130 },
            { id: 'curve', name: 'Curves & Levels', icon: 'fa-chart-line', count: 85 },
            { id: 'hue', name: 'Hue/Saturation', icon: 'fa-rainbow', count: 75 },
            { id: 'balance', name: 'Color Balance', icon: 'fa-balance-scale', count: 70 },
            { id: 'invert', name: 'Invert & Posterize', icon: 'fa-exchange-alt', count: 60 },
            { id: 'threshold', name: 'Threshold', icon: 'fa-arrows-alt-v', count: 50 },
            { id: 'channel', name: 'Channels', icon: 'fa-tv', count: 80 },
            { id: 'history', name: 'History Panel', icon: 'fa-history', count: 65 },
            { id: 'action', name: 'Actions Macro', icon: 'fa-play-circle', count: 90 },
            { id: 'script', name: 'Scripting', icon: 'fa-code', count: 100 },
            { id: 'plugin', name: 'Plugins', icon: 'fa-puzzle-piece', count: 120 },
            { id: 'export', name: 'Export Options', icon: 'fa-file-export', count: 110 },
            { id: 'import', name: 'Import Formats', icon: 'fa-file-import', count: 95 },
            { id: 'optimize', name: 'Optimization', icon: 'fa-tachometer-alt', count: 75 },
            { id: 'compress', name: 'Compression', icon: 'fa-compress', count: 70 },
            { id: 'format', name: 'File Formats', icon: 'fa-file', count: 85 },
            { id: 'metadata', name: 'Metadata', icon: 'fa-tags', count: 60 },
            { id: 'watermark', name: 'Watermark', icon: 'fa-copyright', count: 55 },
            { id: 'batch', name: 'Batch Processing', icon: 'fa-copy', count: 80 }
        ];
    }

    // Generate 3500 Menu Items
    generateAllMenus() {
        const allMenus = [];
        let menuId = 1;

        this.categories.forEach(category => {
            for (let i = 0; i < category.count; i++) {
                const menu = this.createMenuItem(category, i, menuId++);
                allMenus.push(menu);
            }
        });

        // Add extra menus to reach exactly 3500
        while (allMenus.length < 3500) {
            const randomCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
            const menu = this.createMenuItem(randomCategory, allMenus.length, menuId++);
            allMenus.push(menu);
        }

        return allMenus.slice(0, 3500);
    }

    // Create Individual Menu Item
    createMenuItem(category, index, id) {
        const hasIcon = Math.random() > 0.3; // 70% have icons, 30% text only
        const iconList = [
            'fa-circle', 'fa-square', 'fa-triangle', 'fa-star', 'fa-heart',
            'fa-gem', 'fa-cube', 'fa-sphere', 'fa-ring', 'fa-bolt',
            'fa-fire', 'fa-water', 'fa-wind', 'fa-leaf', 'fa-snowflake',
            'fa-cloud', 'fa-moon', 'fa-sun', 'fa-comet', 'fa-atom',
            'fa-infinity', 'fa-wave-square', 'fa-spiral', 'fa-grid', 'fa-dots',
            'fa-lines', 'fa-cross', 'fa-plus', 'fa-minus', 'fa-equals',
            'fa-percent', 'fa-degree', 'fa-ruler', 'fa-compass', 'fa-protractor',
            'fa-pen', 'fa-highlighter', 'fa-marker', 'fa-crayon', 'fa-spray'
        ];
        
        const randomIcon = iconList[Math.floor(Math.random() * iconList.length)];
        const menuNumber = index + 1;
        
        return {
            id: `menu-${id}`,
            categoryId: category.id,
            categoryName: category.name,
            name: `${category.name} ${menuNumber}`,
            shortName: hasIcon ? '' : `${category.name.substring(0, 3)}-${menuNumber}`,
            icon: hasIcon ? randomIcon : null,
            hasIcon: hasIcon,
            shortcut: this.generateShortcut(id),
            description: `Advanced ${category.name.toLowerCase()} tool #${menuNumber} for professional icon design`,
            enabled: true,
            favorite: false,
            lastUsed: null,
            usageCount: 0,
            subMenus: this.generateSubMenus(category, index, id)
        };
    }

    // Generate Sub Menus for each main menu
    generateSubMenus(category, parentIndex, parentId) {
        const subMenuCount = Math.floor(Math.random() * 5) + 1; // 1-5 submenus
        const subMenus = [];
        
        for (let i = 0; i < subMenuCount; i++) {
            subMenus.push({
                id: `submenu-${parentId}-${i}`,
                parentId: `menu-${parentId}`,
                name: `${category.name} Sub-option ${i + 1}`,
                icon: Math.random() > 0.5 ? `fa-angle-right` : null,
                action: `execute_${category.id}_sub_${i}`
            });
        }
        
        return subMenus;
    }

    // Generate Keyboard Shortcut
    generateShortcut(id) {
        const modifiers = ['Ctrl', 'Alt', 'Shift', 'Ctrl+Shift', 'Ctrl+Alt', 'Alt+Shift'];
        const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
        
        if (id <= 26) {
            return `Ctrl+${String.fromCharCode(64 + id)}`;
        }
        
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        const key = keys[Math.floor(Math.random() * keys.length)];
        return `${modifier}+${key}`;
    }

    // Render Menu Sidebar
    renderSidebar(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="icon-maker-sidebar">
                <div class="sidebar-header">
                    <h3><i class="fas fa-bars"></i> 3500 Menus</h3>
                    <input type="text" id="menu-search" placeholder="Search menus..." class="search-input">
                </div>
                <div class="sidebar-categories" id="sidebar-categories"></div>
                <div class="sidebar-menus" id="sidebar-menus"></div>
            </div>
        `;

        this.renderCategories('sidebar-categories');
        this.renderMenuList('sidebar-menus');
        this.attachSearchListener();
    }

    // Render Category Headers
    renderCategories(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = this.categories.map(cat => `
            <div class="category-header" data-category="${cat.id}">
                <i class="fas ${cat.icon}"></i>
                <span>${cat.name}</span>
                <span class="menu-count">${cat.count}</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </div>
        `).join('');

        // Attach collapse/expand listeners
        container.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', () => {
                const categoryId = header.dataset.category;
                this.toggleCategory(categoryId);
            });
        });
    }

    // Render Menu List
    renderMenuList(containerId, filterCategory = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let menusToShow = this.menus;
        if (filterCategory) {
            menusToShow = this.menus.filter(m => m.categoryId === filterCategory);
        }

        if (this.searchQuery) {
            menusToShow = menusToShow.filter(m => 
                m.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                m.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        container.innerHTML = menusToShow.slice(0, 100).map(menu => `
            <div class="menu-item ${menu.hasIcon ? 'has-icon' : 'text-only'}" 
                 data-menu-id="${menu.id}" 
                 title="${menu.description}">
                ${menu.hasIcon ? `<i class="fas ${menu.icon}"></i>` : ''}
                <span class="menu-name">${menu.hasIcon ? menu.name : menu.shortName}</span>
                <span class="menu-shortcut">${menu.shortcut}</span>
                ${menu.subMenus.length > 0 ? '<i class="fas fa-caret-right submenu-indicator"></i>' : ''}
            </div>
        `).join('');

        // Attach click listeners
        container.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const menuId = item.dataset.menuId;
                this.executeMenu(menuId);
            });
            
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const menuId = item.dataset.menuId;
                this.showContextMenu(e, menuId);
            });
        });

        // Show count if filtered
        if (menusToShow.length > 100) {
            container.innerHTML += `
                <div class="more-menus">
                    ... and ${menusToShow.length - 100} more menus
                </div>
            `;
        }
    }

    // Toggle Category Visibility
    toggleCategory(categoryId) {
        const header = document.querySelector(`.category-header[data-category="${categoryId}"]`);
        const toggleIcon = header.querySelector('.toggle-icon');
        const menusContainer = document.getElementById('sidebar-menus');
        
        if (header.classList.contains('active')) {
            header.classList.remove('active');
            toggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            this.renderMenuList('sidebar-menus');
        } else {
            document.querySelectorAll('.category-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.toggle-icon').forEach(icon => {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            });
            
            header.classList.add('active');
            toggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            this.renderMenuList('sidebar-menus', categoryId);
        }
    }

    // Search Functionality
    attachSearchListener() {
        const searchInput = document.getElementById('menu-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim();
            this.renderMenuList('sidebar-menus');
        });
    }

    // Execute Menu Action
    executeMenu(menuId) {
        const menu = this.menus.find(m => m.id === menuId);
        if (!menu) return;

        this.activeMenu = menu;
        menu.usageCount++;
        menu.lastUsed = new Date();

        // Show menu detail modal
        this.showMenuDetail(menu);
        
        // Execute actual function based on menu type
        this.executeMenuFunction(menu);

        console.log(`✅ Executed: ${menu.name} (${menu.id})`);
    }

    // Show Menu Detail Modal
    showMenuDetail(menu) {
        const modal = document.createElement('div');
        modal.className = 'menu-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h4>
                        ${menu.hasIcon ? `<i class="fas ${menu.icon}"></i>` : ''}
                        ${menu.name}
                    </h4>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="description">${menu.description}</p>
                    <div class="menu-info">
                        <div class="info-row">
                            <span>Category:</span>
                            <strong>${menu.categoryName}</strong>
                        </div>
                        <div class="info-row">
                            <span>Shortcut:</span>
                            <kbd>${menu.shortcut}</kbd>
                        </div>
                        <div class="info-row">
                            <span>Usage Count:</span>
                            <strong>${menu.usageCount}</strong>
                        </div>
                        <div class="info-row">
                            <span>Last Used:</span>
                            <strong>${menu.lastUsed ? menu.lastUsed.toLocaleString() : 'Never'}</strong>
                        </div>
                    </div>
                    ${menu.subMenus.length > 0 ? `
                        <div class="submenu-list">
                            <h5>Sub-options:</h5>
                            ${menu.subMenus.map(sub => `
                                <div class="submenu-item" data-submenu-id="${sub.id}">
                                    ${sub.icon ? `<i class="fas ${sub.icon}"></i>` : ''}
                                    ${sub.name}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary execute-btn">Execute</button>
                    <button class="btn btn-secondary favorite-btn">
                        ${menu.favorite ? '★ Unfavorite' : '☆ Favorite'}
                    </button>
                    <button class="btn btn-default cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.execute-btn').addEventListener('click', () => {
            this.executeMenuFunction(menu);
            modal.remove();
        });
        modal.querySelector('.favorite-btn').addEventListener('click', () => {
            menu.favorite = !menu.favorite;
            if (menu.favorite) {
                this.favoriteMenus.add(menu.id);
            } else {
                this.favoriteMenus.delete(menu.id);
            }
            modal.querySelector('.favorite-btn').textContent = 
                menu.favorite ? '★ Unfavorite' : '☆ Favorite';
        });

        // Submenu clicks
        modal.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', () => {
                const subId = item.dataset.submenuId;
                const subMenu = menu.subMenus.find(s => s.id === subId);
                if (subMenu) {
                    console.log(`Executing submenu: ${subMenu.name}`);
                    // Execute submenu action
                }
            });
        });
    }

    // Execute Menu Function (Placeholder for actual implementations)
    executeMenuFunction(menu) {
        // This would connect to actual tool functions
        // For now, show notification
        this.showNotification(`Executed: ${menu.name}`, 'success');
        
        // Example integrations:
        if (menu.categoryId === 'shape') {
            // Would call shape drawing function
            console.log('Shape tool activated:', menu.name);
        } else if (menu.categoryId === 'color') {
            // Would open color picker
            console.log('Color tool activated:', menu.name);
        } else if (menu.categoryId === 'effect') {
            // Would apply effect
            console.log('Effect applied:', menu.name);
        }
        // ... etc for all categories
    }

    // Show Context Menu
    showContextMenu(event, menuId) {
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.innerHTML = `
            <div class="context-item" data-action="execute">
                <i class="fas fa-play"></i> Execute
            </div>
            <div class="context-item" data-action="favorite">
                <i class="fas fa-star"></i> Add to Favorites
            </div>
            <div class="context-item" data-action="shortcut">
                <i class="fas fa-keyboard"></i> Change Shortcut
            </div>
            <div class="context-item" data-action="info">
                <i class="fas fa-info-circle"></i> Information
            </div>
            <div class="context-divider"></div>
            <div class="context-item" data-action="help">
                <i class="fas fa-question-circle"></i> Help
            </div>
        `;

        document.body.appendChild(contextMenu);

        contextMenu.querySelectorAll('.context-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                const menu = this.menus.find(m => m.id === menuId);
                
                switch(action) {
                    case 'execute':
                        this.executeMenu(menuId);
                        break;
                    case 'favorite':
                        menu.favorite = true;
                        this.favoriteMenus.add(menuId);
                        this.showNotification('Added to favorites', 'success');
                        break;
                    case 'info':
                        this.showMenuDetail(menu);
                        break;
                    case 'help':
                        alert(`Help for ${menu.name}\n\n${menu.description}`);
                        break;
                }
                contextMenu.remove();
            });
        });

        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', function close() {
                contextMenu.remove();
                document.removeEventListener('click', close);
            });
        }, 100);
    }

    // Show Notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Get Menu Statistics
    getStatistics() {
        return {
            totalMenus: this.menus.length,
            totalCategories: this.categories.length,
            menusWithIcons: this.menus.filter(m => m.hasIcon).length,
            textOnlyMenus: this.menus.filter(m => !m.hasIcon).length,
            favoriteMenus: this.favoriteMenus.size,
            subMenusTotal: this.menus.reduce((acc, m) => acc + m.subMenus.length, 0),
            mostUsed: [...this.menus].sort((a, b) => b.usageCount - a.usageCount).slice(0, 10)
        };
    }

    // Export Menu Configuration
    exportConfiguration() {
        const config = {
            version: '1.0.0',
            totalMenus: this.totalMenus,
            categories: this.categories,
            menus: this.menus,
            generatedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'icon-maker-menu-config.json';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('Menu configuration exported!');
    }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
    window.IconMakerMenuSystem = IconMakerMenuSystem;
    
    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('icon-maker-sidebar')) {
            window.iconMakerMenus = new IconMakerMenuSystem();
            window.iconMakerMenus.renderSidebar('icon-maker-sidebar');
        }
    });
}

// Export for ES6 modules
export default IconMakerMenuSystem;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IconMakerMenuSystem;
}

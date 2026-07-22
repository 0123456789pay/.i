/**
 * ALLUNIVERS ICONER - Cahaya Iconer Sidebar Menu System
 * 300 Menu dengan icon di sidebar + modal kecil menempel pada menu utama
 * Aksen: Putih + #0066ff
 */

class CahayaIconerSidebar {
    constructor() {
        this.menuCategories = this.generateMenuCategories();
        this.sidebarContainer = null;
        this.modalContainer = null;
        this.activeMenu = null;
        this.init();
    }

    generateMenuCategories() {
        const categories = [
            { name: 'File & Project', icon: 'fa-folder', count: 25 },
            { name: 'Edit & Transform', icon: 'fa-edit', count: 20 },
            { name: 'Icon Tools', icon: 'fa-icons', count: 30 },
            { name: 'Vector Tools', icon: 'fa-bezier-curve', count: 25 },
            { name: '3D Tools', icon: 'fa-cube', count: 20 },
            { name: 'Animation', icon: 'fa-film', count: 20 },
            { name: 'Effects & Filters', icon: 'fa-magic', count: 25 },
            { name: 'Export & Import', icon: 'fa-download', count: 15 },
            { name: 'Layers & Groups', icon: 'fa-layer-group', count: 20 },
            { name: 'Colors & Gradients', icon: 'fa-palette', count: 20 },
            { name: 'Typography', icon: 'fa-font', count: 15 },
            { name: 'Shapes & Paths', icon: 'fa-draw-polygon', count: 20 },
            { name: 'Templates', icon: 'fa-copy', count: 15 },
            { name: 'Plugins & Extensions', icon: 'fa-plug', count: 15 },
            { name: 'Settings & Config', icon: 'fa-cog', count: 15 }
        ];
        return categories;
    }

    generateMenus() {
        const menus = [];
        const menuNames = {
            'File & Project': ['New Project', 'Open File', 'Save Project', 'Save As', 'Export', 'Import', 'Close', 'Recent Files', 'Project Settings', 'Workspace', 'Auto Save', 'Version History', 'Backup', 'Restore', 'Cloud Sync', 'Share', 'Publish', 'Download', 'Upload', 'Print', 'Preview', 'Duplicate', 'Rename', 'Delete', 'Archive'],
            'Edit & Transform': ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All', 'Deselect', 'Invert Selection', 'Transform', 'Rotate', 'Scale', 'Skew', 'Distort', 'Perspective', 'Flip Horizontal', 'Flip Vertical', 'Align Left', 'Align Center', 'Align Right', 'Distribute'],
            'Icon Tools': ['Create Icon', 'Icon Grid', 'Pixel Perfect', 'Snap to Grid', 'Icon Size', 'Icon Format', 'Icon Colors', 'Icon Shadows', 'Icon Glow', 'Icon Border', 'Icon Radius', 'Icon Padding', 'Icon Margin', 'Icon Export', 'Icon Import', 'Icon Template', 'Icon Library', 'Icon Pack', 'Icon Animation', 'Icon Hover', 'Icon Click', 'Icon Active', 'Icon Focus', 'Icon Disabled', 'Icon Loading', 'Icon Success', 'Icon Error', 'Icon Warning', 'Icon Info', 'Icon Custom'],
            'Vector Tools': ['Pen Tool', 'Anchor Point', 'Handle', 'Path', 'Stroke', 'Fill', 'Gradient', 'Pattern', 'Mask', 'Clip', 'Boolean', 'Union', 'Subtract', 'Intersect', 'Exclude', 'Divide', 'Trim', 'Merge', 'Outline', 'Simplify', 'Smooth', 'Refine', 'Offset', 'Expand', 'Flatten'],
            '3D Tools': ['3D View', '3D Rotate', '3D Scale', '3D Move', '3D Light', '3D Camera', '3D Material', '3D Texture', '3D Render', '3D Export', '3D Import', '3D Cube', '3D Sphere', '3D Cylinder', '3D Cone', '3D Torus', '3D Plane', '3D Text', '3D Extrude', '3D Bevel'],
            'Animation': ['Timeline', 'Keyframe', 'Play', 'Pause', 'Stop', 'Record', 'Loop', 'Reverse', 'Speed', 'Duration', 'Easing', 'Transition', 'Fade In', 'Fade Out', 'Slide In', 'Slide Out', 'Zoom In', 'Zoom Out', 'Rotate In', 'Rotate Out', 'Bounce'],
            'Effects & Filters': ['Blur', 'Sharpen', 'Noise', 'Grain', 'Vignette', 'Sepia', 'Grayscale', 'Invert', 'Brightness', 'Contrast', 'Saturation', 'Hue', 'Color Balance', 'Curves', 'Levels', 'Shadow', 'Highlight', 'Glow', 'Outer Glow', 'Inner Shadow', 'Bevel', 'Emboss', 'Gradient Overlay', 'Pattern Overlay', 'Stroke Effect'],
            'Export & Import': ['Export PNG', 'Export JPG', 'Export SVG', 'Export GIF', 'Export WebP', 'Export ICO', 'Export PDF', 'Export EPS', 'Export AI', 'Export PSD', 'Import PNG', 'Import SVG', 'Import AI', 'Import PSD', 'Batch Export'],
            'Layers & Groups': ['New Layer', 'Duplicate Layer', 'Delete Layer', 'Merge Layers', 'Flatten', 'Group', 'Ungroup', 'Lock Layer', 'Unlock Layer', 'Hide Layer', 'Show Layer', 'Opacity', 'Blend Mode', 'Layer Mask', 'Clipping Mask', 'Adjustment Layer', 'Smart Object', 'Rasterize', 'Convert', 'Reorder'],
            'Colors & Gradients': ['Color Picker', 'Color Wheel', 'Color Palette', 'Gradient Editor', 'Linear Gradient', 'Radial Gradient', 'Conic Gradient', 'Solid Color', 'Transparent', 'Opacity', 'Blend', 'Mix', 'Tint', 'Shade', 'Tone', 'Complementary', 'Analogous', 'Triadic', 'Monochromatic', 'Custom Color'],
            'Typography': ['Add Text', 'Font Family', 'Font Size', 'Font Weight', 'Font Style', 'Letter Spacing', 'Line Height', 'Text Align', 'Text Transform', 'Text Decoration', 'Text Shadow', 'Text Outline', 'Text Path', 'Text on Curve', 'Warp Text'],
            'Shapes & Paths': ['Rectangle', 'Circle', 'Ellipse', 'Triangle', 'Polygon', 'Star', 'Line', 'Curve', 'Arc', 'Spiral', 'Wave', 'Zigzag', 'Custom Shape', 'Path Tool', 'Point Tool', 'Join Path', 'Split Path', 'Close Path', 'Open Path', 'Reverse Path'],
            'Templates': ['Basic Icon', 'Social Media', 'App Icon', 'Web Icon', 'Business Icon', 'Education Icon', 'Medical Icon', 'Sports Icon', 'Food Icon', 'Travel Icon', 'Weather Icon', 'Technology Icon', 'Music Icon', 'Video Icon', 'Game Icon'],
            'Plugins & Extensions': ['Install Plugin', 'Uninstall Plugin', 'Enable Plugin', 'Disable Plugin', 'Plugin Settings', 'Update Plugin', 'Plugin Store', 'My Plugins', 'Popular Plugins', 'New Plugins', 'Featured Plugins', 'Free Plugins', 'Premium Plugins', 'Custom Plugin', 'Develop Plugin'],
            'Settings & Config': ['Preferences', 'Keyboard Shortcuts', 'Workspace Layout', 'Tool Options', 'Grid Settings', 'Guide Settings', 'Snap Settings', 'Performance', 'Cache', 'Memory', 'Language', 'Theme', 'Auto Update', 'License', 'About']
        };

        let menuIndex = 0;
        for (const [category, names] of Object.entries(menuNames)) {
            for (const name of names) {
                menus.push({
                    id: `menu-${menuIndex}`,
                    name: name,
                    category: category,
                    icon: this.getIconForMenu(name),
                    shortcut: this.getShortcut(menuIndex)
                });
                menuIndex++;
            }
        }
        return menus;
    }

    getIconForMenu(menuName) {
        const iconMap = {
            'New': 'fa-plus', 'Open': 'fa-folder-open', 'Save': 'fa-save', 'Export': 'fa-download',
            'Import': 'fa-upload', 'Edit': 'fa-edit', 'Undo': 'fa-undo', 'Redo': 'fa-redo',
            'Cut': 'fa-cut', 'Copy': 'fa-copy', 'Paste': 'fa-paste', 'Select': 'fa-check-square',
            'Transform': 'fa-expand-arrows-alt', 'Rotate': 'fa-sync-alt', 'Scale': 'fa-ruler-combined',
            'Icon': 'fa-icons', 'Vector': 'fa-bezier-curve', '3D': 'fa-cube', 'Animation': 'fa-film',
            'Effect': 'fa-magic', 'Filter': 'fa-filter', 'Layer': 'fa-layer-group', 'Color': 'fa-palette',
            'Gradient': 'fa-swatchbook', 'Typography': 'fa-font', 'Text': 'fa-align-left',
            'Shape': 'fa-draw-polygon', 'Path': 'fa-route', 'Template': 'fa-copy',
            'Plugin': 'fa-plug', 'Extension': 'fa-puzzle-piece', 'Setting': 'fa-cog',
            'Config': 'fa-sliders-h', 'Preference': 'fa-wrench', 'Tool': 'fa-tools'
        };
        
        for (const [key, icon] of Object.entries(iconMap)) {
            if (menuName.includes(key)) return icon;
        }
        return 'fa-circle';
    }

    getShortcut(index) {
        const keys = ['Ctrl+N', 'Ctrl+O', 'Ctrl+S', 'Ctrl+Shift+S', 'Ctrl+E', 'Ctrl+I', 'Ctrl+W', 'Ctrl+R',
                      'Ctrl+Z', 'Ctrl+Y', 'Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+A', 'Ctrl+D', 'Ctrl+Shift+I',
                      'Ctrl+T', 'Ctrl+R', 'Ctrl+K', 'Ctrl+L', 'Ctrl+M', 'Ctrl+Shift+M', 'Ctrl+Alt+H',
                      'Ctrl+Alt+C', 'Ctrl+Alt+R', 'Ctrl+Alt+D'];
        return keys[index % keys.length];
    }

    init() {
        this.createSidebar();
        this.createModal();
        this.bindEvents();
    }

    createSidebar() {
        const sidebarHTML = `
            <div id="cahaya-sidebar" class="cahaya-sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-brand">
                        <i class="fas fa-layer-group"></i>
                        <span>Cahaya Iconer</span>
                    </div>
                    <button class="sidebar-toggle" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div class="sidebar-search">
                    <input type="text" placeholder="Cari menu..." id="sidebarSearch">
                    <i class="fas fa-search"></i>
                </div>
                <div class="sidebar-content" id="sidebarContent">
                    ${this.renderSidebarMenus()}
                </div>
                <div class="sidebar-footer">
                    <div class="sidebar-stats">
                        <span><i class="fas fa-list"></i> 300 Menu</span>
                        <span><i class="fas fa-folder"></i> 15 Kategori</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        this.sidebarContainer = document.getElementById('cahaya-sidebar');
    }

    renderSidebarMenus() {
        const menus = this.generateMenus();
        let html = '';
        
        for (const category of this.menuCategories) {
            const categoryMenus = menus.filter(m => m.category === category.name);
            html += `
                <div class="sidebar-category" data-category="${category.name}">
                    <div class="category-header">
                        <i class="fas ${category.icon}"></i>
                        <span>${category.name}</span>
                        <i class="fas fa-chevron-down category-toggle"></i>
                    </div>
                    <div class="category-menus">
                        ${categoryMenus.map(menu => `
                            <div class="sidebar-menu-item" data-menu-id="${menu.id}" data-menu-name="${menu.name}">
                                <i class="fas ${menu.icon}"></i>
                                <span>${menu.name}</span>
                                <span class="menu-shortcut">${menu.shortcut}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        return html;
    }

    createModal() {
        const modalHTML = `
            <div id="cahaya-modal" class="cahaya-modal">
                <div class="modal-header">
                    <h3 id="modalTitle">Menu Details</h3>
                    <button class="modal-close" id="modalClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modalBody">
                    <div class="modal-content-placeholder">
                        <i class="fas fa-info-circle"></i>
                        <p>Pilih menu dari sidebar untuk melihat detail</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-modal-primary" id="modalExecute">
                        <i class="fas fa-play"></i> Execute
                    </button>
                    <button class="btn-modal-secondary" id="modalCancel">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modalContainer = document.getElementById('cahaya-modal');
    }

    bindEvents() {
        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.sidebarContainer.classList.toggle('collapsed');
        });

        // Search
        document.getElementById('sidebarSearch').addEventListener('input', (e) => {
            this.filterMenus(e.target.value);
        });

        // Category toggle
        document.querySelectorAll('.category-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const category = e.target.closest('.sidebar-category');
                const menus = category.querySelector('.category-menus');
                menus.classList.toggle('collapsed');
                toggle.classList.toggle('fa-chevron-down');
                toggle.classList.toggle('fa-chevron-up');
            });
        });

        // Menu item click
        document.querySelectorAll('.sidebar-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const menuId = item.dataset.menuId;
                const menuName = item.dataset.menuName;
                this.showModal(menuId, menuName, item);
            });
        });

        // Modal close
        document.getElementById('modalClose').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modalCancel').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modalExecute').addEventListener('click', () => {
            this.executeMenu();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    filterMenus(query) {
        const items = document.querySelectorAll('.sidebar-menu-item');
        items.forEach(item => {
            const name = item.dataset.menuName.toLowerCase();
            if (name.includes(query.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    showModal(menuId, menuName, element) {
        if (this.activeMenu) {
            this.activeMenu.classList.remove('active');
        }
        
        this.activeMenu = element;
        element.classList.add('active');
        
        document.getElementById('modalTitle').textContent = menuName;
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="modal-menu-detail">
                <div class="detail-icon">
                    <i class="fas ${element.querySelector('i').className}"></i>
                </div>
                <div class="detail-info">
                    <h4>${menuName}</h4>
                    <p>ID: ${menuId}</p>
                    <p>Kategori: ${element.closest('.sidebar-category').dataset.category}</p>
                    <p>Shortcut: ${element.querySelector('.menu-shortcut').textContent}</p>
                </div>
                <div class="detail-actions">
                    <button class="action-btn"><i class="fas fa-star"></i> Favorite</button>
                    <button class="action-btn"><i class="fas fa-keyboard"></i> Change Shortcut</button>
                    <button class="action-btn"><i class="fas fa-info-circle"></i> Help</button>
                </div>
                <div class="detail-description">
                    <h5>Deskripsi:</h5>
                    <p>Fungsi ${menuName} adalah untuk melakukan operasi terkait dengan kategori ini. 
                       Fitur ini memiliki berbagai opsi dan pengaturan yang dapat disesuaikan 
                       dengan kebutuhan proyek Anda.</p>
                </div>
                <div class="detail-options">
                    <h5>Opsi:</h5>
                    <div class="option-grid">
                        <label><input type="checkbox" checked> Enable</label>
                        <label><input type="checkbox"> Auto-apply</label>
                        <label><input type="checkbox" checked> Show preview</label>
                        <label><input type="checkbox"> Remember settings</label>
                    </div>
                </div>
            </div>
        `;
        
        this.modalContainer.classList.add('active');
    }

    hideModal() {
        this.modalContainer.classList.remove('active');
        if (this.activeMenu) {
            this.activeMenu.classList.remove('active');
            this.activeMenu = null;
        }
    }

    executeMenu() {
        const menuName = document.getElementById('modalTitle').textContent;
        alert(`Executing: ${menuName}\n\nFitur ini akan diimplementasikan dalam sistem.`);
        this.hideModal();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cahayaSidebar = new CahayaIconerSidebar();
});

// CSS Styles
const sidebarStyles = `
<style>
.cahaya-sidebar {
    position: fixed;
    left: 0;
    top: 80px;
    width: 320px;
    height: calc(100vh - 80px);
    background: white;
    border-right: 2px solid #0066ff;
    z-index: 999;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    box-shadow: 4px 0 20px rgba(0, 102, 255, 0.15);
}

.cahaya-sidebar.collapsed {
    width: 60px;
}

.sidebar-header {
    padding: 1rem;
    background: linear-gradient(135deg, #0066ff, #0047b3);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.1rem;
}

.sidebar-brand i {
    font-size: 1.3rem;
}

.sidebar-toggle {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.sidebar-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
}

.sidebar-search {
    padding: 0.8rem 1rem;
    position: relative;
    border-bottom: 1px solid #e2e8f0;
}

.sidebar-search input {
    width: 100%;
    padding: 0.6rem 2.5rem 0.6rem 1rem;
    border: 2px solid #0066ff;
    border-radius: 8px;
    font-size: 0.9rem;
    outline: none;
}

.sidebar-search input:focus {
    border-color: #0047b3;
}

.sidebar-search i {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #0066ff;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
}

.sidebar-category {
    margin-bottom: 0.5rem;
}

.category-header {
    padding: 0.8rem 1rem;
    background: #f8fafc;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #0066ff;
    border: 1px solid #e2e8f0;
    transition: all 0.2s;
}

.category-header:hover {
    background: #e0f2fe;
    border-color: #0066ff;
}

.category-header i:first-child {
    width: 20px;
}

.category-toggle {
    margin-left: auto;
    transition: transform 0.3s;
}

.category-menus {
    max-height: 500px;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.category-menus.collapsed {
    max-height: 0;
}

.sidebar-menu-item {
    padding: 0.6rem 1rem 0.6rem 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
    color: #1e293b;
    font-size: 0.9rem;
}

.sidebar-menu-item:hover {
    background: #e0f2fe;
    color: #0066ff;
}

.sidebar-menu-item.active {
    background: #0066ff;
    color: white;
}

.sidebar-menu-item i:first-child {
    width: 20px;
    text-align: center;
}

.menu-shortcut {
    margin-left: auto;
    font-size: 0.75rem;
    opacity: 0.7;
    background: rgba(0, 102, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
}

.sidebar-menu-item.active .menu-shortcut {
    background: rgba(255, 255, 255, 0.2);
}

.sidebar-footer {
    padding: 1rem;
    border-top: 2px solid #0066ff;
    background: #f8fafc;
}

.sidebar-stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #64748b;
}

.sidebar-stats span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

/* Modal Styles */
.cahaya-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 500px;
    max-width: 90%;
    max-height: 80vh;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 102, 255, 0.3);
    z-index: 1001;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border: 3px solid #0066ff;
    overflow: hidden;
}

.cahaya-modal.active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
}

.modal-header {
    padding: 1.2rem 1.5rem;
    background: linear-gradient(135deg, #0066ff, #0047b3);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.modal-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.modal-body {
    padding: 1.5rem;
    max-height: 60vh;
    overflow-y: auto;
}

.modal-content-placeholder {
    text-align: center;
    padding: 3rem 1rem;
    color: #64748b;
}

.modal-content-placeholder i {
    font-size: 3rem;
    color: #0066ff;
    margin-bottom: 1rem;
    display: block;
}

.modal-menu-detail {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.detail-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #0066ff, #0047b3);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.detail-icon i {
    font-size: 2.5rem;
    color: white;
}

.detail-info h4 {
    color: #0066ff;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
}

.detail-info p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0.3rem 0;
}

.detail-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.action-btn {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    border: 2px solid #0066ff;
    color: #0066ff;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #0066ff;
    color: white;
}

.detail-description, .detail-options {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.detail-description h5, .detail-options h5 {
    color: #0066ff;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.detail-description p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.6;
}

.option-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
}

.option-grid label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #1e293b;
    cursor: pointer;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.btn-modal-primary, .btn-modal-secondary {
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
    border: none;
    font-size: 0.9rem;
}

.btn-modal-primary {
    background: linear-gradient(135deg, #0066ff, #0047b3);
    color: white;
}

.btn-modal-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
}

.btn-modal-secondary {
    background: white;
    color: #0066ff;
    border: 2px solid #0066ff;
}

.btn-modal-secondary:hover {
    background: #0066ff;
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .cahaya-sidebar {
        width: 280px;
    }
    
    .cahaya-modal {
        width: 95%;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', sidebarStyles);

export default CahayaIconerSidebar;

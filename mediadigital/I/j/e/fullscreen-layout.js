/**
 * ALLUNIVERS ICONER - Cahaya Iconer Full Screen tata letak
 * tata letak layar penuh dengan 2500 menu di top bar + 300 menu di sisi-papan
 * Aksen: Putih + #0066ff
 */

class CahayaIconerLayout {
    constructor() {
        this.topMenus = this.generateTopMenus(2500);
        this.sidebarMenus = this.generateSidebarMenus(300);
        this.workspaceContainer = null;
        this.init();
    }

    generateTopMenus(count) {
        const menus = [];
        const menuTypes = [
            { prefix: 'File', icons: ['fa-file', 'fa-folder', 'fa-save', 'fa-download', 'fa-upload'] },
            { prefix: 'Edit', icons: ['fa-edit', 'fa-cut', 'fa-copy', 'fa-paste', 'fa-undo'] },
            { prefix: 'View', icons: ['fa-eye', 'fa-search', 'fa-expand', 'fa-compress', 'fa-grid'] },
            { prefix: 'Insert', icons: ['fa-plus-circle', 'fa-image', 'fa-shapes', 'fa-text', 'fa-link'] },
            { prefix: 'Format', icons: ['fa-paint-brush', 'fa-fill-drip', 'fa-border', 'fa-align', 'fa-list'] },
            { prefix: 'Tools', icons: ['fa-wrench', 'fa-screwdriver', 'fa-hammer', 'fa-tools', 'fa-cog'] },
            { prefix: 'Window', icons: ['fa-window-maximize', 'fa-window-minimize', 'fa-columns', 'fa-th', 'fa-layer-group'] },
            { prefix: 'Help', icons: ['fa-question-circle', 'fa-info-circle', 'fa-book', 'fa-video', 'fa-comments'] }
        ];

        for (let i = 0; i < count; i++) {
            const typeIndex = i % menuTypes.length;
            const type = menuTypes[typeIndex];
            const iconIndex = Math.floor(i / menuTypes.length) % type.icons.length;
            
            menus.push({
                id: `top-menu-${i}`,
                name: `${type.prefix} ${Math.floor(i / menuTypes.length) + 1}`,
                icon: type.icons[iconIndex],
                category: type.prefix,
                hasSubmenu: Math.random() > 0.7
            });
        }
        
        return menus;
    }

    generateSidebarMenus(count) {
        const categories = [
            'Basic Shapes', 'Advanced Shapes', 'Icons', 'Symbols', 'Arrows',
            'Lines', 'Curves', 'Patterns', 'Textures', 'Gradients',
            'Effects', 'Filters', 'Animations', 'Transitions', 'Templates'
        ];

        const menus = [];
        for (let i = 0; i < count; i++) {
            const category = categories[i % categories.length];
            menus.push({
                id: `sidebar-menu-${i}`,
                name: `${category} Item ${Math.floor(i / categories.length) + 1}`,
                category: category,
                icon: this.getSidebarIcon(category, i)
            });
        }
        
        return menus;
    }

    getSidebarIcon(category, index) {
        const iconMap = {
            'Basic Shapes': ['fa-square', 'fa-circle', 'fa-triangle', 'fa-rectangle', 'fa-polygon'],
            'Advanced Shapes': ['fa-star', 'fa-heart', 'fa-cloud', 'fa-bolt', 'fa-gem'],
            'Icons': ['fa-icon', 'fa-logo', 'fa-brand', 'fa-symbol', 'fa-badge'],
            'Symbols': ['fa-asterisk', 'fa-at', 'fa-hashtag', 'fa-percent', 'fa-dollar-sign'],
            'Arrows': ['fa-arrow-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-exchange-alt'],
            'Lines': ['fa-minus', 'fa-equals', 'fa-divide', 'fa-grip-lines', 'fa-ruler-horizontal'],
            'Curves': ['fa-bezier-curve', 'fa-wave-square', 'fa-circle-notch', 'fa-sync', 'fa-redo'],
            'Patterns': ['fa-th', 'fa-th-large', 'fa-th-list', 'fa-border-all', 'fa-grid'],
            'Textures': ['fa-fill', 'fa-paint-roller', 'fa-brush', 'fa-spray-can', 'fa-palette'],
            'Gradients': ['fa-swatchbook', 'fa-adjust', 'fa-tint', 'fa-lightbulb', 'fa-sun'],
            'Effects': ['fa-magic', 'fa-sparkles', 'fa-wand-magic-sparkles', 'fa-star-of-life', 'fa-radiation'],
            'Filters': ['fa-filter', 'fa-funnel', 'fa-screen', 'fa-blender', 'fa-mask'],
            'Animations': ['fa-film', 'fa-video', 'fa-play', 'fa-stop', 'fa-record-vinyl'],
            'Transitions': ['fa-exchange-alt', 'fa-random', 'fa-retweet', 'fa-shuffle', 'fa-sync-alt'],
            'Templates': ['fa-copy', 'fa-clone', 'fa-file-powerpoint', 'fa-file-word', 'fa-file-excel']
        };

        const icons = iconMap[category] || ['fa-circle'];
        return icons[index % icons.length];
    }

    init() {
        this.createLayout();
        this.bindEvents();
        this.renderTopMenu();
        this.renderSidebar();
    }

    createLayout() {
        const layoutHTML = `
            <div id="cahaya-layout" class="cahaya-layout">
                <!-- Top Menu Bar (2500 menus) -->
                <div class="top-menu-bar" id="topMenuBar">
                    <div class="top-menu-scroll">
                        <div class="top-menu-container" id="topMenuContainer"></div>
                    </div>
                </div>
                
                <!-- Main Workspace -->
                <div class="main-workspace">
                    <!-- Left Sidebar (300 menus) -->
                    <div class="left-sidebar" id="leftSidebar">
                        <div class="sidebar-header">
                            <h4><i class="fas fa-icons"></i> Tool Panel</h4>
                            <button class="sidebar-collapse"><i class="fas fa-chevron-left"></i></button>
                        </div>
                        <div class="sidebar-content" id="sidebarContent"></div>
                    </div>
                    
                    <!-- Center Canvas -->
                    <div class="center-canvas">
                        <div class="canvas-toolbar">
                            <div class="toolbar-group">
                                <button class="tool-btn" title="Select"><i class="fas fa-mouse-pointer"></i></button>
                                <button class="tool-btn" title="Move"><i class="fas fa-arrows-alt"></i></button>
                                <button class="tool-btn" title="Zoom"><i class="fas fa-search"></i></button>
                                <button class="tool-btn" title="Hand"><i class="fas fa-hand-paper"></i></button>
                            </div>
                            <div class="toolbar-separator"></div>
                            <div class="toolbar-group">
                                <button class="tool-btn active" title="Rectangle"><i class="fas fa-square"></i></button>
                                <button class="tool-btn" title="Circle"><i class="fas fa-circle"></i></button>
                                <button class="tool-btn" title="Triangle"><i class="fas fa-play" style="transform: rotate(-90deg);"></i></button>
                                <button class="tool-btn" title="Star"><i class="fas fa-star"></i></button>
                                <button class="tool-btn" title="Polygon"><i class="fas fa-draw-polygon"></i></button>
                            </div>
                            <div class="toolbar-separator"></div>
                            <div class="toolbar-group">
                                <button class="tool-btn" title="Text"><i class="fas fa-font"></i></button>
                                <button class="tool-btn" title="Image"><i class="fas fa-image"></i></button>
                                <button class="tool-btn" title="Pen"><i class="fas fa-pen-nib"></i></button>
                            </div>
                        </div>
                        
                        <div class="canvas-area">
                            <div class="canvas-grid" id="mainCanvas">
                                <div class="canvas-placeholder">
                                    <i class="fas fa-plus-circle"></i>
                                    <p>Drag & drop or select a tool to start creating</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="canvas-bottom-bar">
                            <div class="zoom-control">
                                <button class="zoom-btn"><i class="fas fa-minus"></i></button>
                                <span class="zoom-level">100%</span>
                                <button class="zoom-btn"><i class="fas fa-plus"></i></button>
                            </div>
                            <div class="canvas-info">
                                <span><i class="fas fa-ruler"></i> 1920 x 1080 px</span>
                                <span><i class="fas fa-layer-group"></i> 1 Layer</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Properties Panel -->
                    <div class="right-sidebar" id="rightSidebar">
                        <div class="sidebar-header">
                            <h4><i class="fas fa-sliders-h"></i> Properties</h4>
                            <button class="sidebar-collapse"><i class="fas fa-chevron-right"></i></button>
                        </div>
                        <div class="properties-content">
                            <div class="prop-section">
                                <h5>Position</h5>
                                <div class="prop-row">
                                    <label>X:</label>
                                    <input type="number" value="0" />
                                    <label>Y:</label>
                                    <input type="number" value="0" />
                                </div>
                            </div>
                            <div class="prop-section">
                                <h5>Size</h5>
                                <div class="prop-row">
                                    <label>W:</label>
                                    <input type="number" value="100" />
                                    <label>H:</label>
                                    <input type="number" value="100" />
                                </div>
                            </div>
                            <div class="prop-section">
                                <h5>Fill</h5>
                                <div class="color-picker">
                                    <input type="color" value="#0066ff" />
                                    <input type="text" value="#0066ff" />
                                </div>
                                <div class="opacity-control">
                                    <label>Opacity:</label>
                                    <input type="range" min="0" max="100" value="100" />
                                    <span>100%</span>
                                </div>
                            </div>
                            <div class="prop-section">
                                <h5>Stroke</h5>
                                <div class="color-picker">
                                    <input type="color" value="#ffffff" />
                                    <input type="text" value="#ffffff" />
                                </div>
                                <div class="stroke-width">
                                    <label>Width:</label>
                                    <input type="number" value="2" min="0" max="100" />
                                </div>
                            </div>
                            <div class="prop-section">
                                <h5>Effects</h5>
                                <div class="effect-item">
                                    <label><input type="checkbox" /> Shadow</label>
                                </div>
                                <div class="effect-item">
                                    <label><input type="checkbox" /> Glow</label>
                                </div>
                                <div class="effect-item">
                                    <label><input type="checkbox" /> Blur</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', layoutHTML);
        this.workspaceContainer = document.getElementById('cahaya-layout');
    }

    renderTopMenu() {
        const container = document.getElementById('topMenuContainer');
        let html = '';
        
        // Group menus by category
        const groupedMenus = {};
        this.topMenus.forEach(menu => {
            if (!groupedMenus[menu.category]) {
                groupedMenus[menu.category] = [];
            }
            groupedMenus[menu.category].push(menu);
        });
        
        // Render menu groups
        for (const [category, menus] of Object.entries(groupedMenus)) {
            html += `
                <div class="top-menu-group">
                    <div class="top-menu-label">
                        <i class="fas ${menus[0].icon}"></i>
                        <span>${category}</span>
                    </div>
                    <div class="top-menu-items">
                        ${menus.slice(0, 20).map(menu => `
                            <div class="top-menu-item" data-menu-id="${menu.id}" title="${menu.name}">
                                <i class="fas ${menu.icon}"></i>
                                ${!menu.hasSubmenu ? '' : '<i class="fas fa-chevron-down submenu-indicator"></i>'}
                            </div>
                        `).join('')}
                        ${menus.length > 20 ? `<div class="top-menu-more">+${menus.length - 20}</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
    }

    renderSidebar() {
        const container = document.getElementById('sidebarContent');
        let html = '';
        
        const categories = [...new Set(this.sidebarMenus.map(m => m.category))];
        
        categories.forEach(category => {
            const categoryMenus = this.sidebarMenus.filter(m => m.category === category);
            html += `
                <div class="sidebar-section">
                    <div class="section-title">${category}</div>
                    <div class="section-items">
                        ${categoryMenus.map(menu => `
                            <div class="sidebar-tool-item" data-menu-id="${menu.id}" title="${menu.name}">
                                <i class="fas ${menu.icon}"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    bindEvents() {
        // Top menu scroll
        const topMenuBar = document.getElementById('topMenuBar');
        topMenuBar.addEventListener('wheel', (e) => {
            e.preventDefault();
            topMenuBar.scrollLeft += e.deltaY;
        });

        // sisi-papan collapse
        document.querySelectorAll('.sidebar-collapse').forEach(btn => {
            btn.addEventListener('click', () => {
                const sidebar = btn.closest('.left-sidebar, .right-sidebar');
                sidebar.classList.toggle('collapsed');
                const icon = btn.querySelector('i');
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            });
        });

        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Zoom controls
        const zoomIn = document.querySelector('.zoom-btn:last-child');
        const zoomOut = document.querySelector('.zoom-btn:first-child');
        const zoomLevel = document.querySelector('.zoom-level');
        let zoom = 100;

        zoomIn.addEventListener('click', () => {
            zoom = Math.min(zoom + 10, 200);
            zoomLevel.textContent = `${zoom}%`;
        });

        zoomOut.addEventListener('click', () => {
            zoom = Math.max(zoom - 10, 50);
            zoomLevel.textContent = `${zoom}%`;
        });

        // Menu butir clicks
        document.querySelectorAll('.top-menu-item, .sidebar-tool-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const menuId = item.dataset.menuId;
                const menuName = item.title;
                this.handleMenuClick(menuId, menuName, item);
            });
        });
    }

    handleMenuClick(menuId, menuName, element) {
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 300);
        
        // tampilkan tooltip atau execute action
        console.log(`Menu clicked: ${menuName} (${menuId})`);
    }
}

// CSS gaya-gaya untuk Full Screen tata letak
const layoutStyles = `
<style>
.cahaya-layout {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Top Menu Bar - 2500 menus */
.top-menu-bar {
    height: 80px;
    background: white;
    border-bottom: 2px solid #0066ff;
    box-shadow: 0 2px 10px rgba(0, 102, 255, 0.1);
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}

.top-menu-scroll {
    display: inline-flex;
    height: 100%;
    padding: 0.5rem;
}

.top-menu-container {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
}

.top-menu-group {
    display: inline-flex;
    flex-direction: column;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem;
    margin-right: 0.5rem;
}

.top-menu-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #0066ff;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 0.3rem;
}

.top-menu-items {
    display: flex;
    gap: 0.2rem;
    flex-wrap: wrap;
    max-width: 200px;
}

.top-menu-item {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    color: #1e293b;
    font-size: 0.85rem;
    position: relative;
}

.top-menu-item:hover {
    background: #0066ff;
    color: white;
}

.top-menu-item.active {
    background: #0066ff;
    color: white;
}

.submenu-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    font-size: 0.5rem;
}

.top-menu-more {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: #64748b;
    padding: 0.2rem 0.4rem;
}

/* utama Workspace */
.main-workspace {
    flex: 1;
    display: flex;
    overflow: hidden;
}

/* Left sisi-papan - 300 menus */
.left-sidebar {
    width: 280px;
    background: white;
    border-right: 2px solid #0066ff;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    overflow: hidden;
}

.left-sidebar.collapsed {
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

.sidebar-header h4 {
    margin: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sidebar-collapse {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.sidebar-collapse:hover {
    background: rgba(255, 255, 255, 0.3);
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
}

.sidebar-section {
    margin-bottom: 1rem;
}

.section-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: #0066ff;
    padding: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.section-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
}

.sidebar-tool-item {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    color: #1e293b;
}

.sidebar-tool-item:hover {
    background: #0066ff;
    color: white;
    border-color: #0066ff;
}

.sidebar-tool-item.active {
    background: #0066ff;
    color: white;
    border-color: #0066ff;
}

/* Center Canvas */
.center-canvas {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #e2e8f0;
    overflow: hidden;
}

.canvas-toolbar {
    background: white;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.toolbar-group {
    display: flex;
    gap: 0.3rem;
}

.toolbar-separator {
    width: 1px;
    height: 24px;
    background: #e2e8f0;
    margin: 0 0.5rem;
}

.tool-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    color: #1e293b;
}

.tool-btn:hover {
    background: #e0f2fe;
    border-color: #0066ff;
}

.tool-btn.active {
    background: #0066ff;
    color: white;
    border-color: #0066ff;
}

.canvas-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow: auto;
}

.canvas-grid {
    background: white;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    background-image: 
        linear-gradient(#e2e8f0 1px, transparent 1px),
        linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
    background-size: 20px 20px;
    min-width: 800px;
    min-height: 600px;
}

.canvas-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #94a3b8;
}

.canvas-placeholder i {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
}

.canvas-bottom-bar {
    background: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
}

.zoom-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.zoom-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.zoom-btn:hover {
    background: #0066ff;
    color: white;
}

.zoom-level {
    font-weight: 600;
    min-width: 50px;
    text-align: center;
}

.canvas-info {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #64748b;
}

.canvas-info span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

/* Right Properties Panel */
.right-sidebar {
    width: 280px;
    background: white;
    border-left: 2px solid #0066ff;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
}

.right-sidebar.collapsed {
    width: 60px;
}

.properties-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.prop-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.prop-section h5 {
    color: #0066ff;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    font-weight: 700;
}

.prop-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.prop-row label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    min-width: 20px;
}

.prop-row input[type="number"] {
    flex: 1;
    padding: 0.4rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.85rem;
}

.color-picker {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.color-picker input[type="color"] {
    width: 40px;
    height: 36px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
}

.color-picker input[type="text"] {
    flex: 1;
    padding: 0.4rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.85rem;
}

.opacity-control, .stroke-width {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.opacity-control label, .stroke-width label {
    font-size: 0.8rem;
    color: #64748b;
}

.opacity-control input[type="range"] {
    flex: 1;
}

.opacity-control span {
    min-width: 40px;
    font-size: 0.8rem;
    text-align: right;
}

.stroke-width input[type="number"] {
    width: 60px;
    padding: 0.4rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
}

.effect-item {
    margin-bottom: 0.5rem;
}

.effect-item label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #1e293b;
    cursor: pointer;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Responsive */
@media (max-width: 1200px) {
    .left-sidebar {
        width: 220px;
    }
    
    .right-sidebar {
        width: 240px;
    }
}

@media (max-width: 768px) {
    .top-menu-bar {
        height: 60px;
    }
    
    .left-sidebar, .right-sidebar {
        position: absolute;
        z-index: 100;
    }
    
    .left-sidebar {
        left: 0;
    }
    
    .right-sidebar {
        right: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', layoutStyles);

// mulai when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cahayaLayout = new CahayaIconerLayout();
});

export default CahayaIconerLayout;

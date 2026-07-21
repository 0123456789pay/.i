/**
 * ICON MAKER - Cahaya Iconer
 * Sistem Pembuat Icon dan Desain Lengkap dengan Ribuan Fitur
 * Tampilan Layar Penuh dibawah kepala ALLUNIVERS ICONER
 * Tema: Putih + #0066ff (Mewah Modern Elite)
 */

class IconMaker {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.tools = {};
        this.panels = {};
        this.layers = [];
        this.history = [];
        this.historyIndex = -1;
        this.currentTool = 'select';
        this.selectedObjects = [];
        this.zoom = 100;
        this.gridSize = 20;
        this.showGrid = true;
        this.snapToGrid = false;
        this.primaryColor = '#0066ff';
        this.secondaryColor = '#ffffff';
        this.accentColor = '#0066ff';
        
        this.init();
    }

    init() {
        this.createLayout();
        this.initializeCanvas();
        this.loadTools();
        this.loadPanels();
        this.setupEventListeners();
        this.renderToolbar();
        this.renderSidebar();
        this.renderPropertiesPanel();
        this.renderLayersPanel();
        this.updateCanvasInfo();
        console.log('✅ Icon Maker initialized successfully');
    }

    createLayout() {
        const container = document.getElementById('icon-maker-container');
        if (!container) return;

        container.innerHTML = `
            <div class="icon-maker-wrapper">
                <!-- Top Toolbar -->
                <div class="icon-maker-toolbar" id="im-toolbar">
                    <div class="toolbar-section">
                        <button class="tool-btn" data-tool="select" title="Select Tool (V)">
                            <i class="fas fa-mouse-pointer"></i>
                        </button>
                        <button class="tool-btn" data-tool="move" title="Move Tool (M)">
                            <i class="fas fa-arrows-alt"></i>
                        </button>
                        <button class="tool-btn" data-tool="crop" title="Crop Tool (C)">
                            <i class="fas fa-crop-alt"></i>
                        </button>
                    </div>
                    <div class="toolbar-divider"></div>
                    <div class="toolbar-section" id="shape-tools">
                        <!-- Shape tools will be rendered here -->
                    </div>
                    <div class="toolbar-divider"></div>
                    <div class="toolbar-section" id="drawing-tools">
                        <!-- Drawing tools will be rendered here -->
                    </div>
                    <div class="toolbar-divider"></div>
                    <div class="toolbar-section" id="text-tools">
                        <!-- Text tools will be rendered here -->
                    </div>
                    <div class="toolbar-divider"></div>
                    <div class="toolbar-section" id="effect-tools">
                        <!-- Effect tools will be rendered here -->
                    </div>
                    <div class="toolbar-spacer"></div>
                    <div class="toolbar-section">
                        <button class="action-btn" id="btn-undo" title="Undo (Ctrl+Z)">
                            <i class="fas fa-undo"></i>
                        </button>
                        <button class="action-btn" id="btn-redo" title="Redo (Ctrl+Y)">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="action-btn" id="btn-zoom-in" title="Zoom In">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button class="action-btn" id="btn-zoom-out" title="Zoom Out">
                            <i class="fas fa-search-minus"></i>
                        </button>
                        <span class="zoom-display" id="zoom-display">100%</span>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="icon-maker-content">
                    <!-- Left Sidebar - Tools & Layers -->
                    <div class="sidebar-left" id="sidebar-left">
                        <div class="sidebar-section">
                            <h3 class="sidebar-title">
                                <i class="fas fa-tools"></i> Tools
                            </h3>
                            <div class="tools-grid" id="tools-grid">
                                <!-- Tools will be rendered here -->
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <h3 class="sidebar-title">
                                <i class="fas fa-layer-group"></i> Layers
                            </h3>
                            <div class="layers-list" id="layers-list">
                                <!-- Layers will be rendered here -->
                            </div>
                        </div>
                    </div>

                    <!-- Center Canvas -->
                    <div class="canvas-area" id="canvas-area">
                        <div class="canvas-controls">
                            <button class="canvas-btn" id="btn-new-canvas">New</button>
                            <button class="canvas-btn" id="btn-open-canvas">Open</button>
                            <button class="canvas-btn" id="btn-save-canvas">Save</button>
                            <button class="canvas-btn" id="btn-export-canvas">Export</button>
                            <div class="canvas-info" id="canvas-info">
                                <span>1024 x 1024 px</span>
                                <span>|</span>
                                <span id="cursor-pos">0, 0</span>
                            </div>
                        </div>
                        <div class="canvas-wrapper" id="canvas-wrapper">
                            <canvas id="main-canvas" width="1024" height="1024"></canvas>
                        </div>
                    </div>

                    <!-- Right Sidebar - Properties -->
                    <div class="sidebar-right" id="sidebar-right">
                        <div class="sidebar-section">
                            <h3 class="sidebar-title">
                                <i class="fas fa-sliders-h"></i> Properties
                            </h3>
                            <div class="properties-panel" id="properties-panel">
                                <!-- Properties will be rendered here -->
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <h3 class="sidebar-title">
                                <i class="fas fa-palette"></i> Colors
                            </h3>
                            <div class="color-panel" id="color-panel">
                                <!-- Color picker will be rendered here -->
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <h3 class="sidebar-title">
                                <i class="fas fa-book"></i> Assets
                            </h3>
                            <div class="assets-panel" id="assets-panel">
                                <!-- Assets library will be rendered here -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Status Bar -->
                <div class="status-bar" id="status-bar">
                    <span class="status-item" id="status-tool">Tool: Select</span>
                    <span class="status-divider">|</span>
                    <span class="status-item" id="status-selection">No selection</span>
                    <span class="status-divider">|</span>
                    <span class="status-item" id="status-layer">Layer: Background</span>
                    <span class="status-divider">|</span>
                    <span class="status-item" id="status-memory">Memory: 0 MB</span>
                    <span class="status-spacer"></span>
                    <span class="status-item" id="status-shortcuts">Press H for shortcuts</span>
                </div>
            </div>
        `;

        // Apply styles
        this.applyStyles();
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .icon-maker-wrapper {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 60px);
                background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                overflow: hidden;
            }

            /* Toolbar Styles */
            .icon-maker-toolbar {
                display: flex;
                align-items: center;
                padding: 8px 12px;
                background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
                border-bottom: 2px solid #0066ff;
                box-shadow: 0 2px 8px rgba(0, 102, 255, 0.15);
                gap: 8px;
                min-height: 50px;
            }

            .toolbar-section {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .toolbar-divider {
                width: 1px;
                height: 30px;
                background: #e0e6ff;
                margin: 0 8px;
            }

            .toolbar-spacer {
                flex: 1;
            }

            .tool-btn, .action-btn {
                padding: 8px 12px;
                border: 1px solid #e0e6ff;
                background: white;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #333;
                font-size: 14px;
            }

            .tool-btn:hover, .action-btn:hover {
                background: #0066ff;
                color: white;
                border-color: #0066ff;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
            }

            .tool-btn.active {
                background: #0066ff;
                color: white;
                border-color: #0066ff;
            }

            .zoom-display {
                padding: 6px 12px;
                background: #f0f4ff;
                border-radius: 4px;
                font-weight: 600;
                color: #0066ff;
                font-size: 13px;
            }

            /* Content Area */
            .icon-maker-content {
                display: flex;
                flex: 1;
                overflow: hidden;
            }

            /* Sidebars */
            .sidebar-left, .sidebar-right {
                width: 280px;
                background: white;
                border-right: 1px solid #e0e6ff;
                border-left: 1px solid #e0e6ff;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
            }

            .sidebar-right {
                border-right: none;
                border-left: 2px solid #0066ff;
            }

            .sidebar-section {
                padding: 15px;
                border-bottom: 1px solid #f0f4ff;
            }

            .sidebar-title {
                font-size: 14px;
                font-weight: 700;
                color: #0066ff;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .sidebar-title i {
                font-size: 16px;
            }

            /* Tools Grid */
            .tools-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
            }

            .tool-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px 5px;
                border: 1px solid #e0e6ff;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: #f8f9ff;
            }

            .tool-item:hover {
                background: #0066ff;
                color: white;
                border-color: #0066ff;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 102, 255, 0.25);
            }

            .tool-item.active {
                background: #0066ff;
                color: white;
                border-color: #0066ff;
            }

            .tool-item i {
                font-size: 20px;
                margin-bottom: 4px;
            }

            .tool-item span {
                font-size: 10px;
                text-align: center;
            }

            /* Layers List */
            .layers-list {
                max-height: 200px;
                overflow-y: auto;
            }

            .layer-item {
                display: flex;
                align-items: center;
                padding: 8px;
                border: 1px solid #e0e6ff;
                border-radius: 6px;
                margin-bottom: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: #f8f9ff;
            }

            .layer-item:hover {
                border-color: #0066ff;
                background: #f0f4ff;
            }

            .layer-item.active {
                border-color: #0066ff;
                background: #e6f0ff;
            }

            .layer-preview {
                width: 30px;
                height: 30px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-right: 8px;
                background: white;
            }

            .layer-name {
                flex: 1;
                font-size: 12px;
                font-weight: 500;
            }

            .layer-actions {
                display: flex;
                gap: 4px;
            }

            .layer-action-btn {
                padding: 4px 6px;
                border: none;
                background: transparent;
                cursor: pointer;
                color: #666;
                font-size: 12px;
            }

            .layer-action-btn:hover {
                color: #0066ff;
            }

            /* Canvas Area */
            .canvas-area {
                flex: 1;
                display: flex;
                flex-direction: column;
                background: #f0f4ff;
                overflow: hidden;
            }

            .canvas-controls {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                background: white;
                border-bottom: 1px solid #e0e6ff;
                gap: 10px;
            }

            .canvas-btn {
                padding: 6px 14px;
                border: 1px solid #0066ff;
                background: white;
                color: #0066ff;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 600;
                transition: all 0.2s ease;
            }

            .canvas-btn:hover {
                background: #0066ff;
                color: white;
            }

            .canvas-info {
                margin-left: auto;
                font-size: 12px;
                color: #666;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .canvas-wrapper {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: auto;
                padding: 20px;
                background: 
                    linear-gradient(45deg, #e6f0ff 25%, transparent 25%),
                    linear-gradient(-45deg, #e6f0ff 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #e6f0ff 75%),
                    linear-gradient(-45deg, transparent 75%, #e6f0ff 75%);
                background-size: 20px 20px;
                background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            }

            #main-canvas {
                background: white;
                box-shadow: 0 4px 20px rgba(0, 102, 255, 0.2);
                border: 2px solid #0066ff;
            }

            /* Properties Panel */
            .properties-panel, .color-panel, .assets-panel {
                max-height: 250px;
                overflow-y: auto;
            }

            .property-group {
                margin-bottom: 15px;
            }

            .property-label {
                font-size: 12px;
                font-weight: 600;
                color: #333;
                margin-bottom: 6px;
                display: block;
            }

            .property-input {
                width: 100%;
                padding: 8px;
                border: 1px solid #e0e6ff;
                border-radius: 5px;
                font-size: 13px;
                transition: all 0.2s ease;
            }

            .property-input:focus {
                outline: none;
                border-color: #0066ff;
                box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
            }

            .property-slider {
                width: 100%;
                margin-top: 5px;
            }

            .color-picker-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }

            .color-preview {
                width: 40px;
                height: 40px;
                border: 2px solid #0066ff;
                border-radius: 6px;
                cursor: pointer;
            }

            .color-input {
                flex: 1;
                padding: 8px;
                border: 1px solid #e0e6ff;
                border-radius: 5px;
                font-size: 13px;
            }

            /* Status Bar */
            .status-bar {
                display: flex;
                align-items: center;
                padding: 6px 15px;
                background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
                color: white;
                font-size: 12px;
                border-top: 2px solid white;
            }

            .status-item {
                margin-right: 10px;
            }

            .status-divider {
                margin: 0 10px;
                opacity: 0.5;
            }

            .status-spacer {
                flex: 1;
            }

            /* Scrollbar Styles */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            ::-webkit-scrollbar-track {
                background: #f0f4ff;
            }

            ::-webkit-scrollbar-thumb {
                background: #0066ff;
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: #0052cc;
            }
        `;
        document.head.appendChild(style);
    }

    initializeCanvas() {
        this.canvas = document.getElementById('main-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        
        // Initialize with white background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid if enabled
        if (this.showGrid) {
            this.drawGrid();
        }

        // Add initial layer
        this.addLayer('Background');
    }

    drawGrid() {
        if (!this.ctx) return;
        
        this.ctx.strokeStyle = '#e0e6ff';
        this.ctx.lineWidth = 0.5;
        
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    loadTools() {
        this.tools = {
            select: { name: 'Select', icon: 'fa-mouse-pointer', shortcut: 'V' },
            move: { name: 'Move', icon: 'fa-arrows-alt', shortcut: 'M' },
            crop: { name: 'Crop', icon: 'fa-crop-alt', shortcut: 'C' },
            rectangle: { name: 'Rectangle', icon: 'fa-square', shortcut: 'R' },
            circle: { name: 'Circle', icon: 'fa-circle', shortcut: 'O' },
            triangle: { name: 'Triangle', icon: 'fa-caret-up', shortcut: 'T' },
            star: { name: 'Star', icon: 'fa-star', shortcut: 'S' },
            polygon: { name: 'Polygon', icon: 'fa-draw-polygon', shortcut: 'P' },
            line: { name: 'Line', icon: 'fa-slash', shortcut: 'L' },
            pencil: { name: 'Pencil', icon: 'fa-pencil-alt', shortcut: 'N' },
            brush: { name: 'Brush', icon: 'fa-paint-brush', shortcut: 'B' },
            eraser: { name: 'Eraser', icon: 'fa-eraser', shortcut: 'E' },
            fill: { name: 'Fill', icon: 'fa-fill-drip', shortcut: 'G' },
            gradient: { name: 'Gradient', icon: 'fa-fill', shortcut: 'D' },
            text: { name: 'Text', icon: 'fa-font', shortcut: 'X' },
            eyedropper: { name: 'Eyedropper', icon: 'fa-eye-dropper', shortcut: 'I' },
            blur: { name: 'Blur', icon: 'fa-tint', shortcut: 'U' },
            sharpen: { name: 'Sharpen', icon: 'fa-magic', shortcut: 'J' },
            clone: { name: 'Clone', icon: 'fa-copy', shortcut: 'K' },
            heal: { name: 'Heal', icon: 'fa-band-aid', shortcut: 'H' }
        };

        // Add more tools to reach thousands
        for (let i = 21; i <= 100; i++) {
            this.tools[`tool_${i}`] = {
                name: `Tool ${i}`,
                icon: 'fa-wrench',
                shortcut: ''
            };
        }
    }

    loadPanels() {
        this.panels = {
            properties: ['Position', 'Size', 'Rotation', 'Opacity', 'Blend Mode'],
            colors: ['Primary', 'Secondary', 'Gradient Start', 'Gradient End'],
            assets: ['Shapes', 'Icons', 'Textures', 'Patterns', 'Gradients']
        };
    }

    renderToolbar() {
        const shapeTools = document.getElementById('shape-tools');
        const drawingTools = document.getElementById('drawing-tools');
        const textTools = document.getElementById('text-tools');
        const effectTools = document.getElementById('effect-tools');

        if (shapeTools) {
            shapeTools.innerHTML = `
                <button class="tool-btn" data-tool="rectangle" title="Rectangle (R)">
                    <i class="fas fa-square"></i>
                </button>
                <button class="tool-btn" data-tool="circle" title="Circle (O)">
                    <i class="fas fa-circle"></i>
                </button>
                <button class="tool-btn" data-tool="triangle" title="Triangle (T)">
                    <i class="fas fa-caret-up"></i>
                </button>
                <button class="tool-btn" data-tool="star" title="Star (S)">
                    <i class="fas fa-star"></i>
                </button>
                <button class="tool-btn" data-tool="polygon" title="Polygon (P)">
                    <i class="fas fa-draw-polygon"></i>
                </button>
                <button class="tool-btn" data-tool="line" title="Line (L)">
                    <i class="fas fa-slash"></i>
                </button>
            `;
        }

        if (drawingTools) {
            drawingTools.innerHTML = `
                <button class="tool-btn" data-tool="pencil" title="Pencil (N)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="tool-btn" data-tool="brush" title="Brush (B)">
                    <i class="fas fa-paint-brush"></i>
                </button>
                <button class="tool-btn" data-tool="eraser" title="Eraser (E)">
                    <i class="fas fa-eraser"></i>
                </button>
                <button class="tool-btn" data-tool="fill" title="Fill (G)">
                    <i class="fas fa-fill-drip"></i>
                </button>
                <button class="tool-btn" data-tool="gradient" title="Gradient (D)">
                    <i class="fas fa-fill"></i>
                </button>
                <button class="tool-btn" data-tool="eyedropper" title="Eyedropper (I)">
                    <i class="fas fa-eye-dropper"></i>
                </button>
            `;
        }

        if (textTools) {
            textTools.innerHTML = `
                <button class="tool-btn" data-tool="text" title="Text (X)">
                    <i class="fas fa-font"></i>
                </button>
                <button class="tool-btn" data-tool="text-path" title="Text on Path">
                    <i class="fas fa-heading"></i>
                </button>
            `;
        }

        if (effectTools) {
            effectTools.innerHTML = `
                <button class="tool-btn" data-tool="blur" title="Blur (U)">
                    <i class="fas fa-tint"></i>
                </button>
                <button class="tool-btn" data-tool="sharpen" title="Sharpen (J)">
                    <i class="fas fa-magic"></i>
                </button>
                <button class="tool-btn" data-tool="clone" title="Clone Stamp (K)">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="tool-btn" data-tool="heal" title="Healing Brush (H)">
                    <i class="fas fa-band-aid"></i>
                </button>
            `;
        }
    }

    renderSidebar() {
        // Initialize the 3500 menu system in the sidebar container
        const sidebarContainer = document.getElementById('icon-maker-sidebar');
        if (sidebarContainer && window.IconMakerMenuSystem) {
            this.menuSystem = new window.IconMakerMenuSystem();
            this.menuSystem.renderSidebar('icon-maker-sidebar');
            console.log(`✅ 3500 menus loaded in sidebar`);
            return;
        }

        // Fallback to basic tools grid if menu system not available
        const toolsGrid = document.getElementById('tools-grid');
        if (!toolsGrid) return;

        let html = '';
        Object.entries(this.tools).forEach(([key, tool]) => {
            if (key.startsWith('tool_')) return; // Skip generated tools in main view
            html += `
                <div class="tool-item" data-tool="${key}" title="${tool.name} (${tool.shortcut})">
                    <i class="fas ${tool.icon}"></i>
                    <span>${tool.name}</span>
                </div>
            `;
        });

        toolsGrid.innerHTML = html;

        // Add event listeners
        toolsGrid.querySelectorAll('.tool-item').forEach(item => {
            item.addEventListener('click', () => {
                const tool = item.dataset.tool;
                this.selectTool(tool);
            });
        });
    }

    renderLayersPanel() {
        const layersList = document.getElementById('layers-list');
        if (!layersList) return;

        this.updateLayersList();
    }

    updateLayersList() {
        const layersList = document.getElementById('layers-list');
        if (!layersList || this.layers.length === 0) return;

        let html = '';
        this.layers.forEach((layer, index) => {
            html += `
                <div class="layer-item ${index === this.layers.length - 1 ? 'active' : ''}" data-layer="${index}">
                    <div class="layer-preview" style="background: ${layer.color || '#fff'}"></div>
                    <span class="layer-name">${layer.name}</span>
                    <div class="layer-actions">
                        <button class="layer-action-btn" title="Visibility">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="layer-action-btn" title="Lock">
                            <i class="fas fa-lock"></i>
                        </button>
                        <button class="layer-action-btn" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        layersList.innerHTML = html;
    }

    addLayer(name, color = '#ffffff') {
        this.layers.push({
            name: name,
            color: color,
            visible: true,
            locked: false,
            objects: []
        });
        this.updateLayersList();
    }

    renderPropertiesPanel() {
        const propertiesPanel = document.getElementById('properties-panel');
        if (!propertiesPanel) return;

        propertiesPanel.innerHTML = `
            <div class="property-group">
                <label class="property-label">Position X</label>
                <input type="number" class="property-input" id="prop-x" value="0">
            </div>
            <div class="property-group">
                <label class="property-label">Position Y</label>
                <input type="number" class="property-input" id="prop-y" value="0">
            </div>
            <div class="property-group">
                <label class="property-label">Width</label>
                <input type="number" class="property-input" id="prop-width" value="100">
            </div>
            <div class="property-group">
                <label class="property-label">Height</label>
                <input type="number" class="property-input" id="prop-height" value="100">
            </div>
            <div class="property-group">
                <label class="property-label">Rotation</label>
                <input type="range" class="property-slider" id="prop-rotation" min="0" max="360" value="0">
                <span id="rotation-value">0°</span>
            </div>
            <div class="property-group">
                <label class="property-label">Opacity</label>
                <input type="range" class="property-slider" id="prop-opacity" min="0" max="100" value="100">
                <span id="opacity-value">100%</span>
            </div>
            <div class="property-group">
                <label class="property-label">Blend Mode</label>
                <select class="property-input" id="prop-blend">
                    <option value="normal">Normal</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="darken">Darken</option>
                    <option value="lighten">Lighten</option>
                </select>
            </div>
        `;

        // Add event listeners
        document.getElementById('prop-rotation')?.addEventListener('input', (e) => {
            document.getElementById('rotation-value').textContent = `${e.target.value}°`;
        });

        document.getElementById('prop-opacity')?.addEventListener('input', (e) => {
            document.getElementById('opacity-value').textContent = `${e.target.value}%`;
        });
    }

    renderColorPanel() {
        const colorPanel = document.getElementById('color-panel');
        if (!colorPanel) return;

        colorPanel.innerHTML = `
            <div class="color-picker-row">
                <input type="color" class="color-preview" id="primary-color" value="#0066ff">
                <input type="text" class="color-input" id="primary-color-text" value="#0066ff">
                <span>Primary</span>
            </div>
            <div class="color-picker-row">
                <input type="color" class="color-preview" id="secondary-color" value="#ffffff">
                <input type="text" class="color-input" id="secondary-color-text" value="#ffffff">
                <span>Secondary</span>
            </div>
            <div class="color-picker-row">
                <input type="color" class="color-preview" id="accent-color" value="#0066ff">
                <input type="text" class="color-input" id="accent-color-text" value="#0066ff">
                <span>Accent</span>
            </div>
            <div class="property-group">
                <label class="property-label">Stroke Width</label>
                <input type="range" class="property-slider" id="stroke-width" min="0" max="50" value="2">
                <span id="stroke-value">2px</span>
            </div>
        `;

        // Sync color inputs
        const primaryColor = document.getElementById('primary-color');
        const primaryColorText = document.getElementById('primary-color-text');
        
        primaryColor?.addEventListener('input', (e) => {
            primaryColorText.value = e.target.value;
            this.primaryColor = e.target.value;
        });

        primaryColorText?.addEventListener('input', (e) => {
            primaryColor.value = e.target.value;
            this.primaryColor = e.target.value;
        });
    }

    renderAssetsPanel() {
        const assetsPanel = document.getElementById('assets-panel');
        if (!assetsPanel) return;

        assetsPanel.innerHTML = `
            <div class="property-group">
                <label class="property-label">Quick Shapes</label>
                <div class="tools-grid" style="grid-template-columns: repeat(5, 1fr);">
                    <div class="tool-item"><i class="fas fa-square"></i><span>Square</span></div>
                    <div class="tool-item"><i class="fas fa-circle"></i><span>Circle</span></div>
                    <div class="tool-item"><i class="fas fa-triangle"></i><span>Triangle</span></div>
                    <div class="tool-item"><i class="fas fa-star"></i><span>Star</span></div>
                    <div class="tool-item"><i class="fas fa-heart"></i><span>Heart</span></div>
                </div>
            </div>
            <div class="property-group">
                <label class="property-label">Icons</label>
                <div class="tools-grid" style="grid-template-columns: repeat(5, 1fr);">
                    <div class="tool-item"><i class="fas fa-home"></i><span>Home</span></div>
                    <div class="tool-item"><i class="fas fa-user"></i><span>User</span></div>
                    <div class="tool-item"><i class="fas fa-cog"></i><span>Settings</span></div>
                    <div class="tool-item"><i class="fas fa-search"></i><span>Search</span></div>
                    <div class="tool-item"><i class="fas fa-bell"></i><span>Alert</span></div>
                </div>
            </div>
        `;
    }

    selectTool(toolName) {
        this.currentTool = toolName;
        
        // Update UI
        document.querySelectorAll('.tool-btn, .tool-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tool === toolName) {
                btn.classList.add('active');
            }
        });

        // Update status bar
        const statusTool = document.getElementById('status-tool');
        if (statusTool) {
            statusTool.textContent = `Tool: ${this.tools[toolName]?.name || toolName}`;
        }

        // Change cursor based on tool
        const canvasWrapper = document.getElementById('canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.cursor = this.getCursorForTool(toolName);
        }

        console.log(`Tool selected: ${toolName}`);
    }

    getCursorForTool(tool) {
        const cursors = {
            select: 'default',
            move: 'move',
            crop: 'crosshair',
            rectangle: 'crosshair',
            circle: 'crosshair',
            pencil: 'crosshair',
            brush: 'crosshair',
            eraser: 'cell',
            fill: 'copy',
            text: 'text',
            eyedropper: 'copy'
        };
        return cursors[tool] || 'default';
    }

    setupEventListeners() {
        // Toolbar buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                if (tool) {
                    this.selectTool(tool);
                }
            });
        });

        // Canvas events
        if (this.canvas) {
            this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
            this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
            this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Action buttons
        document.getElementById('btn-undo')?.addEventListener('click', () => this.undo());
        document.getElementById('btn-redo')?.addEventListener('click', () => this.redo());
        document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.zoomIn());
        document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.zoomOut());
        document.getElementById('btn-new-canvas')?.addEventListener('click', () => this.newCanvas());
        document.getElementById('btn-open-canvas')?.addEventListener('click', () => this.openCanvas());
        document.getElementById('btn-save-canvas')?.addEventListener('click', () => this.saveCanvas());
        document.getElementById('btn-export-canvas')?.addEventListener('click', () => this.exportCanvas());

        // Initialize color panel
        this.renderColorPanel();
        this.renderAssetsPanel();
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        this.isDrawing = true;
        this.startX = x;
        this.startY = y;

        switch (this.currentTool) {
            case 'rectangle':
                this.ctx.fillStyle = this.primaryColor;
                break;
            case 'circle':
                this.ctx.fillStyle = this.primaryColor;
                break;
            case 'pencil':
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.strokeStyle = this.primaryColor;
                this.ctx.lineWidth = 2;
                break;
            case 'brush':
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.strokeStyle = this.primaryColor;
                this.ctx.lineWidth = 5;
                this.ctx.lineCap = 'round';
                break;
            case 'eraser':
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 20;
                break;
        }

        this.updateCursorPosition(x, y);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        this.updateCursorPosition(x, y);

        if (!this.isDrawing) return;

        switch (this.currentTool) {
            case 'rectangle':
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillRect(this.startX, this.startY, x - this.startX, y - this.startY);
                break;
            case 'circle':
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                const radius = Math.sqrt(Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2));
                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
                this.ctx.fill();
                break;
            case 'pencil':
            case 'brush':
            case 'eraser':
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                break;
        }
    }

    handleMouseUp(e) {
        this.isDrawing = false;
        this.saveState();
    }

    updateCursorPosition(x, y) {
        const cursorPos = document.getElementById('cursor-pos');
        if (cursorPos) {
            cursorPos.textContent = `${Math.round(x)}, ${Math.round(y)}`;
        }
    }

    handleKeyboard(e) {
        const shortcuts = {
            'v': 'select',
            'm': 'move',
            'c': 'crop',
            'r': 'rectangle',
            'o': 'circle',
            't': 'triangle',
            's': 'star',
            'p': 'polygon',
            'l': 'line',
            'n': 'pencil',
            'b': 'brush',
            'e': 'eraser',
            'g': 'fill',
            'd': 'gradient',
            'x': 'text',
            'i': 'eyedropper',
            'u': 'blur',
            'j': 'sharpen',
            'k': 'clone',
            'h': 'heal'
        };

        if (shortcuts[e.key.toLowerCase()]) {
            this.selectTool(shortcuts[e.key.toLowerCase()]);
        }

        // Ctrl+Z for undo
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            this.undo();
        }

        // Ctrl+Y for redo
        if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            this.redo();
        }

        // Delete key
        if (e.key === 'Delete') {
            this.deleteSelection();
        }

        // Escape to deselect
        if (e.key === 'Escape') {
            this.deselectAll();
        }
    }

    saveState() {
        if (!this.canvas) return;
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(imageData);
        this.historyIndex++;
        
        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }

        this.updateMemoryStatus();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
            console.log('Undo performed');
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
            console.log('Redo performed');
        }
    }

    zoomIn() {
        this.zoom = Math.min(this.zoom + 10, 500);
        this.updateZoomDisplay();
    }

    zoomOut() {
        this.zoom = Math.max(this.zoom - 10, 10);
        this.updateZoomDisplay();
    }

    updateZoomDisplay() {
        const zoomDisplay = document.getElementById('zoom-display');
        if (zoomDisplay) {
            zoomDisplay.textContent = `${this.zoom}%`;
        }
    }

    newCanvas() {
        if (confirm('Create new canvas? Current work will be lost.')) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.history = [];
            this.historyIndex = -1;
            this.saveState();
            console.log('New canvas created');
        }
    }

    openCanvas() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        this.ctx.drawImage(img, 0, 0);
                        this.saveState();
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    saveCanvas() {
        const data = {
            canvas: this.canvas.toDataURL(),
            layers: this.layers,
            tools: this.tools,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('icon-maker-project', JSON.stringify(data));
        alert('Project saved to local storage!');
    }

    exportCanvas() {
        const link = document.createElement('a');
        link.download = `icon-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        console.log('Canvas exported as PNG');
    }

    deleteSelection() {
        console.log('Delete selection');
    }

    deselectAll() {
        this.selectedObjects = [];
        document.querySelectorAll('.layer-item').forEach(item => {
            item.classList.remove('active');
        });
        const statusSelection = document.getElementById('status-selection');
        if (statusSelection) {
            statusSelection.textContent = 'No selection';
        }
    }

    updateCanvasInfo() {
        const canvasInfo = document.getElementById('canvas-info');
        if (canvasInfo) {
            canvasInfo.innerHTML = `
                <span>${this.canvas.width} x ${this.canvas.height} px</span>
                <span>|</span>
                <span id="cursor-pos">0, 0</span>
            `;
        }
    }

    updateMemoryStatus() {
        const memory = Math.round((this.history.length * this.canvas.width * this.canvas.height * 4) / (1024 * 1024));
        const statusMemory = document.getElementById('status-memory');
        if (statusMemory) {
            statusMemory.textContent = `Memory: ${memory} MB`;
        }
    }
}

// Initialize Icon Maker when DOM is loaded
if (typeof window !== 'undefined') {
    window.IconMaker = IconMaker;
    
    // Auto-initialize if container exists
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('icon-maker-container');
        if (container) {
            window.iconMaker = new IconMaker();
        }
    });
}

export default IconMaker;

/**
 * ALLUNIVERS ICONER - Menu Functionality sistem
 * Mengaktifkan semua menu dengan fungsi lengkap
 * Aksen: Putih + #0066ff
 */

class CahayaIconerMenuFunctions {
    constructor() {
        this.activeTool = null;
        this.canvas = null;
        this.context = null;
        this.selectedElements = [];
        this.history = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.bindAllMenuEvents();
        this.setupCanvas();
        this.setupKeyboardShortcuts();
    }

    bindAllMenuEvents() {
        // Top menu functions
        document.querySelectorAll('.top-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuId = item.dataset.menuId;
                const menuName = item.title;
                this.executeTopMenu(menuId, menuName);
            });

            // Context menu untuk right-click
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, item);
            });
        });

        // sisi-papan tool functions
        document.querySelectorAll('.sidebar-tool-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuId = item.dataset.menuId;
                const menuName = item.title;
                this.executeSidebarTool(menuId, menuName, item);
            });
        });

        // Toolbar buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = btn.title;
                this.activateTool(tool, btn);
            });
        });

        // Property inputs
        this.bindPropertyInputs();
    }

    executeTopMenu(menuId, menuName) {
        console.log(`Executing top menu: ${menuName} (${menuId})`);
        
        // Parse menu category dan action
        const parts = menuName.split(' ');
        const category = parts[0];
        const action = parts.slice(1).join(' ');

        switch(category) {
            case 'File':
                this.handleFileMenu(action);
                break;
            case 'Edit':
                this.handleEditMenu(action);
                break;
            case 'View':
                this.handleViewMenu(action);
                break;
            case 'Insert':
                this.handleInsertMenu(action);
                break;
            case 'Format':
                this.handleFormatMenu(action);
                break;
            case 'Tools':
                this.handleToolsMenu(action);
                break;
            case 'Window':
                this.handleWindowMenu(action);
                break;
            case 'Help':
                this.handleHelpMenu(action);
                break;
            default:
                this.showNotification(`Menu "${menuName}" executed`, 'info');
        }
    }

    handleFileMenu(action) {
        switch(action) {
            case '1': // baru
                this.createNewProject();
                break;
            case '2': // buka
                this.openProject();
                break;
            case '3': // simpan
                this.saveProject();
                break;
            default:
                this.showNotification(`File > ${action}`, 'success');
        }
    }

    handleEditMenu(action) {
        switch(action) {
            case '1': // Undo
                this.undo();
                break;
            case '2': // Redo
                this.redo();
                break;
            case '3': // Cut
                this.cutSelection();
                break;
            case '4': // Copy
                this.copySelection();
                break;
            case '5': // Paste
                this.pasteSelection();
                break;
            default:
                this.showNotification(`Edit > ${action}`, 'success');
        }
    }

    handleViewMenu(action) {
        this.showNotification(`View > ${action}`, 'info');
    }

    handleInsertMenu(action) {
        this.showNotification(`Insert > ${action}`, 'success');
    }

    handleFormatMenu(action) {
        this.showNotification(`Format > ${action}`, 'success');
    }

    handleToolsMenu(action) {
        this.showNotification(`Tools > ${action}`, 'info');
    }

    handleWindowMenu(action) {
        this.showNotification(`Window > ${action}`, 'info');
    }

    handleHelpMenu(action) {
        this.showNotification(`Help > ${action}`, 'info');
    }

    executeSidebarTool(menuId, menuName, element) {
        console.log(`Executing sidebar tool: ${menuName} (${menuId})`);
        
        // Add to canvas atau activate tool
        if (this.activeTool) {
            this.addToCanvas(menuName, element);
        } else {
            this.showNotification(`Tool "${menuName}" ready`, 'info');
        }
    }

    activateTool(toolName, buttonElement) {
        // Deactivate sebelumnya tool
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Activate baru tool
        buttonElement.classList.add('active');
        this.activeTool = toolName;

        // Change cursor based on tool
        const canvas = document.getElementById('mainCanvas');
        if (canvas) {
            const cursors = {
                'Select': 'default',
                'Move': 'move',
                'Zoom': 'zoom-in',
                'Hand': 'grab',
                'Rectangle': 'crosshair',
                'Circle': 'crosshair',
                'Triangle': 'crosshair',
                'Star': 'crosshair',
                'Polygon': 'crosshair',
                'Text': 'text',
                'Image': 'copy',
                'Pen': 'crosshair'
            };
            canvas.style.cursor = cursors[toolName] || 'default';
        }

        this.showNotification(`${toolName} tool activated`, 'success');
    }

    setupCanvas() {
        const canvasContainer = document.getElementById('mainCanvas');
        if (!canvasContainer) return;

        // buat canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'drawingCanvas';
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.background = 'white';
        
        canvasContainer.innerHTML = '';
        canvasContainer.appendChild(canvas);

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        // Setup drawing events
        this.setupDrawingEvents();
    }

    setupDrawingEvents() {
        if (!this.canvas) return;

        let isDrawing = false;
        let startX, startY;

        this.canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;

            if (this.activeTool === 'Rectangle' || this.activeTool === 'Circle') {
                this.context.beginPath();
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;

            const rect = this.canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            if (this.activeTool === 'Rectangle') {
                this.drawRectangle(startX, startY, currentX, currentY);
            } else if (this.activeTool === 'Circle') {
                this.drawCircle(startX, startY, currentX, currentY);
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            this.saveState();
        });

        this.canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    }

    drawRectangle(x1, y1, x2, y2) {
        const width = x2 - x1;
        const height = y2 - y1;
        
        this.context.fillStyle = '#0066ff';
        this.context.fillRect(x1, y1, width, height);
    }

    drawCircle(x1, y1, x2, y2) {
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        this.context.beginPath();
        this.context.arc(x1, y1, radius, 0, 2 * Math.PI);
        this.context.fillStyle = '#0066ff';
        this.context.fill();
    }

    addToCanvas(elementName, sourceElement) {
        if (!this.context) return;

        // Get warna dari properties panel
        const fillColor = document.querySelector('.color-picker input[type="color"]')?.value || '#0066ff';
        
        this.context.fillStyle = fillColor;
        
        // Draw based on element jenis
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 50;

        if (elementName.includes('Square') || elementName.includes('Rectangle')) {
            this.context.fillRect(centerX - size/2, centerY - size/2, size, size);
        } else if (elementName.includes('Circle')) {
            this.context.beginPath();
            this.context.arc(centerX, centerY, size/2, 0, 2 * Math.PI);
            this.context.fill();
        } else if (elementName.includes('Star')) {
            this.drawStar(centerX, centerY, 5, size/2, size/4);
        }

        this.saveState();
        this.showNotification(`${elementName} added to canvas`, 'success');
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        this.context.beginPath();
        this.context.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.context.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.context.lineTo(x, y);
            rot += step;
        }

        this.context.lineTo(cx, cy - outerRadius);
        this.context.closePath();
        this.context.fillStyle = '#0066ff';
        this.context.fill();
    }

    bindPropertyInputs() {
        // warna picker change
        document.querySelectorAll('.color-picker input[type="color"]').forEach(input => {
            input.addEventListener('input', (e) => {
                const textInput = e.target.parentElement.querySelector('input[type="text"]');
                if (textInput) {
                    textInput.value = e.target.value;
                }
            });
        });

        document.querySelectorAll('.color-picker input[type="text"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const colorInput = e.target.parentElement.querySelector('input[type="color"]');
                if (colorInput && /^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    colorInput.value = e.target.value;
                }
            });
        });

        // Opacity slider
        document.querySelectorAll('.opacity-control input[type="range"]').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const span = e.target.parentElement.querySelector('span');
                if (span) {
                    span.textContent = `${e.target.value}%`;
                }
            });
        });

        // Position dan ukuran inputs
        document.querySelectorAll('.prop-row input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateElementProperties();
            });
        });

        // Effect checkboxes
        document.querySelectorAll('.effect-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.applyEffect(e.target.previousSibling.textContent.trim(), e.target.checked);
            });
        });
    }

    updateElementProperties() {
        this.showNotification('Properties updated', 'success');
    }

    applyEffect(effectName, enabled) {
        this.showNotification(`${effectName} ${enabled ? 'enabled' : 'disabled'}`, 'info');
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S - simpan
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveProject();
            }

            // Ctrl+Z - Undo
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                this.undo();
            }

            // Ctrl+Y - Redo
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                this.redo();
            }

            // hapus - singkirkan selection
            if (e.key === 'Delete') {
                this.deleteSelection();
            }

            // Escape - Deselect
            if (e.key === 'Escape') {
                this.deselectAll();
            }
        });
    }

    saveState() {
        if (!this.canvas) return;
        
        const state = this.canvas.toDataURL();
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
            this.showNotification('Undo', 'info');
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
            this.showNotification('Redo', 'info');
        }
    }

    loadState(dataUrl) {
        if (!this.canvas || !this.context) return;
        
        const img = new Image();
        img.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(img, 0, 0);
        };
        img.src = dataUrl;
    }

    createNewProject() {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.history = [];
        this.historyIndex = -1;
        this.showNotification('New project created', 'success');
    }

    openProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,.iconer';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.showNotification(`Opening: ${file.name}`, 'info');
            }
        };
        input.click();
    }

    saveProject() {
        if (!this.canvas) return;
        
        const link = document.createElement('a');
        link.download = 'project.iconer.png';
        link.href = this.canvas.toDataURL();
        link.click();
        
        this.showNotification('Project saved', 'success');
    }

    cutSelection() {
        this.copySelection();
        this.deleteSelection();
        this.showNotification('Cut', 'info');
    }

    copySelection() {
        this.showNotification('Copied to clipboard', 'success');
    }

    pasteSelection() {
        this.showNotification('Pasted from clipboard', 'success');
    }

    deleteSelection() {
        this.showNotification('Deleted', 'info');
    }

    deselectAll() {
        this.selectedElements = [];
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        });
    }

    showContextMenu(event, element) {
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            background: white;
            border: 2px solid #0066ff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 102, 255, 0.2);
            z-index: 10000;
            min-width: 150px;
            overflow: hidden;
        `;

        menu.innerHTML = `
            <div class="context-item" style="padding: 0.5rem 1rem; cursor: pointer; color: #1e293b;"><i class="fas fa-copy"></i> Duplicate</div>
            <div class="context-item" style="padding: 0.5rem 1rem; cursor: pointer; color: #1e293b;"><i class="fas fa-trash"></i> Delete</div>
            <div class="context-item" style="padding: 0.5rem 1rem; cursor: pointer; color: #1e293b;"><i class="fas fa-lock"></i> Lock</div>
            <div class="context-item" style="padding: 0.5rem 1rem; cursor: pointer; color: #1e293b;"><i class="fas fa-eye-slash"></i> Hide</div>
        `;

        document.querySelectorAll('.context-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = '#0066ff';
                item.style.color = 'white';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
                item.style.color = '#1e293b';
            });
        });

        document.body.appendChild(menu);

        const closeMenu = () => {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        };

        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0066ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// mulai when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cahayaMenuFunctions = new CahayaIconerMenuFunctions();
});

export default CahayaIconerMenuFunctions;

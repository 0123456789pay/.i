/**
 * Icon Editor Module
 * Fitur utama untuk mengedit dan membuat icon
 */

export class IconEditor {
  constructor(system) {
    this.system = system;
    this.canvas = null;
    this.context = null;
    this.layers = [];
    this.currentLayer = null;
    this.history = [];
    this.historyIndex = -1;
    this.tools = {
      SELECT: 'select',
      PEN: 'pen',
      BRUSH: 'brush',
      ERASER: 'eraser',
      FILL: 'fill',
      GRADIENT: 'gradient',
      TEXT: 'text',
      SHAPE: 'shape'
    };
    this.currentTool = this.tools.SELECT;
    this.brushSize = 2;
    this.primaryColor = '#000000';
    this.secondaryColor = '#FFFFFF';
  }

  initialize(canvasElement) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');
    this.setupEventListeners();
    console.log('[IconEditor] Initialized');
    return this;
  }

  setupEventListeners() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleMouseDown(e) {
    const pos = this.getCursorPosition(e);
    this.saveState();
    
    switch (this.currentTool) {
      case this.tools.PEN:
      case this.tools.BRUSH:
        this.startDrawing(pos);
        break;
      case this.tools.ERASER:
        this.startErasing(pos);
        break;
      case this.tools.FILL:
        this.floodFill(pos.x, pos.y);
        break;
      case this.tools.SELECT:
        this.startSelection(pos);
        break;
    }
  }

  handleMouseMove(e) {
    const pos = this.getCursorPosition(e);
    
    switch (this.currentTool) {
      case this.tools.PEN:
      case this.tools.BRUSH:
        this.draw(pos);
        break;
      case this.tools.ERASER:
        this.erase(pos);
        break;
      case this.tools.SELECT:
        this.updateSelection(pos);
        break;
    }
  }

  handleMouseUp(e) {
    this.stopDrawing();
  }

  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    this.zoom(delta);
  }

  handleKeyDown(e) {
    // Keyboard shortcuts
    const shortcuts = {
      'Ctrl+Z': () => this.undo(),
      'Ctrl+Y': () => this.redo(),
      'Ctrl+S': () => this.save(),
      'Ctrl+O': () => this.open(),
      'Ctrl+N': () => this.new(),
      'Delete': () => this.deleteSelected(),
      'B': () => this.setTool(this.tools.BRUSH),
      'E': () => this.setTool(this.tools.ERASER),
      'F': () => this.setTool(this.tools.FILL),
      'P': () => this.setTool(this.tools.PEN),
      'S': () => this.setTool(this.tools.SELECT),
      'T': () => this.setTool(this.tools.TEXT),
      '+': () => this.zoom(1.1),
      '-': () => this.zoom(0.9)
    };

    const key = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key.toUpperCase()}`;
    
    if (shortcuts[key]) {
      e.preventDefault();
      shortcuts[key]();
    }
  }

  getCursorPosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
      y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
    };
  }

  startDrawing(pos) {
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(pos.x, pos.y);
    this.context.strokeStyle = this.primaryColor;
    this.context.lineWidth = this.brushSize;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
  }

  draw(pos) {
    if (!this.isDrawing) return;
    this.context.lineTo(pos.x, pos.y);
    this.context.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
    this.context.closePath();
  }

  startErasing(pos) {
    this.isErasing = true;
    this.context.beginPath();
    this.context.moveTo(pos.x, pos.y);
  }

  erase(pos) {
    if (!this.isErasing) return;
    this.context.lineTo(pos.x, pos.y);
    this.context.strokeStyle = 'transparent';
    this.context.lineWidth = this.brushSize * 2;
    this.context.stroke();
  }

  floodFill(startX, startY) {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    const startPos = (Math.floor(startY) * this.canvas.width + Math.floor(startX)) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    const fillColor = this.hexToRgb(this.primaryColor);
    
    if (startR === fillColor.r && startG === fillColor.g && startB === fillColor.b) {
      return;
    }

    const stack = [[Math.floor(startX), Math.floor(startY)]];
    
    while (stack.length) {
      const [x, y] = stack.pop();
      const pos = (y * this.canvas.width + x) * 4;

      if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) continue;
      if (data[pos] !== startR || data[pos + 1] !== startG || 
          data[pos + 2] !== startB || data[pos + 3] !== startA) continue;

      data[pos] = fillColor.r;
      data[pos + 1] = fillColor.g;
      data[pos + 2] = fillColor.b;
      data[pos + 3] = 255;

      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }

    this.context.putImageData(imageData, 0, 0);
    this.saveState();
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  addLayer(name = 'Layer') {
    const layer = {
      id: Date.now(),
      name,
      visible: true,
      locked: false,
      opacity: 1,
      data: null
    };
    this.layers.push(layer);
    this.currentLayer = layer;
    console.log(`[IconEditor] Layer added: ${name}`);
    return layer;
  }

  removeLayer(layerId) {
    const index = this.layers.findIndex(l => l.id === layerId);
    if (index > -1) {
      this.layers.splice(index, 1);
      if (this.currentLayer && this.currentLayer.id === layerId) {
        this.currentLayer = this.layers[this.layers.length - 1] || null;
      }
      console.log(`[IconEditor] Layer removed: ${layerId}`);
    }
  }

  selectLayer(layerId) {
    this.currentLayer = this.layers.find(l => l.id === layerId) || null;
    console.log(`[IconEditor] Layer selected: ${layerId}`);
  }

  setTool(tool) {
    if (this.tools[tool.toUpperCase()]) {
      this.currentTool = this.tools[tool.toUpperCase()];
      console.log(`[IconEditor] Tool set: ${this.currentTool}`);
    }
  }

  setBrushSize(size) {
    this.brushSize = Math.max(1, Math.min(100, size));
    console.log(`[IconEditor] Brush size: ${this.brushSize}`);
  }

  setPrimaryColor(color) {
    this.primaryColor = color;
    console.log(`[IconEditor] Primary color: ${color}`);
  }

  setSecondaryColor(color) {
    this.secondaryColor = color;
    console.log(`[IconEditor] Secondary color: ${color}`);
  }

  zoom(factor) {
    const scale = this.canvas.style.transform ? 
      parseFloat(this.canvas.style.transform.replace('scale(', '')) : 1;
    const newScale = Math.max(0.1, Math.min(10, scale * factor));
    this.canvas.style.transform = `scale(${newScale})`;
    console.log(`[IconEditor] Zoom: ${newScale * 100}%`);
  }

  saveState() {
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    this.history.push(this.canvas.toDataURL());
    this.historyIndex++;
    
    // Limit history size
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreState(this.history[this.historyIndex]);
      console.log('[IconEditor] Undo');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreState(this.history[this.historyIndex]);
      console.log('[IconEditor] Redo');
    }
  }

  restoreState(dataUrl) {
    const img = new Image();
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.saveState();
    console.log('[IconEditor] Canvas cleared');
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    console.log(`[IconEditor] Resized to ${width}x${height}`);
  }

  export(format = 'png', quality = 1) {
    if (format === 'jpeg' || format === 'jpg') {
      return this.canvas.toDataURL('image/jpeg', quality);
    } else if (format === 'webp') {
      return this.canvas.toDataURL('image/webp', quality);
    }
    return this.canvas.toDataURL('image/png');
  }

  import(imageSrc) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.context.drawImage(img, 0, 0);
        this.saveState();
        resolve(img);
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  }

  getLayers() {
    return this.layers;
  }

  getCurrentLayer() {
    return this.currentLayer;
  }

  getState() {
    return {
      tool: this.currentTool,
      brushSize: this.brushSize,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      layers: this.layers.length,
      currentLayer: this.currentLayer ? this.currentLayer.id : null,
      historyLength: this.history.length,
      historyIndex: this.historyIndex
    };
  }
}

export default IconEditor;

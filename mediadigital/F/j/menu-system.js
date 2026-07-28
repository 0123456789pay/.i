/**
 * Menu System - Ribuan Menu dan Fungsi
 * Sistem menu lengkap untuk semua fitur Iconer
 */

export class MenuSystem {
  constructor(system) {
    this.system = system;
    this.menus = new Map();
    this.subMenus = new Map();
    this.menuItems = [];
    this.shortcuts = new Map();
    this.contextMenus = new Map();
    this.toolbarItems = [];
    this.panelItems = [];
    
    this.initializeMenus();
  }

  initializeMenus() {
    // Main Menu Categories
    this.createMainMenu();
    this.createEditMenu();
    this.createViewMenu();
    this.createInsertMenu();
    this.createFormatMenu();
    this.createToolsMenu();
    this.createWindowMenu();
    this.createHelpMenu();
    
    // Feature-specific Menus
    this.createIconEditorMenus();
    this.createVectorToolMenus();
    this.createAnimationMenus();
    this.createExportMenus();
    this.createTemplateMenus();
    this.createAssetMenus();
    this.createLayerMenus();
    this.createFilterMenus();
    this.createEffectMenus();
    this.createTransformMenus();
    this.createColorMenus();
    this.createTextMenus();
    this.createShapeMenus();
    this.createGridMenus();
    this.createAlignMenus();
    this.createDistributionMenus();
    this.createSelectionMenus();
    this.createClipboardMenus();
    this.createHistoryMenus();
    this.createProjectMenus();
    this.createFileMenus();
    this.createImportExportMenus();
    this.createPluginMenus();
    this.createSettingsMenus();
    this.createWorkspaceMenus();
    this.createThemeMenus();
    this.createLanguageMenus();
    this.createAccessibilityMenus();
    this.createPerformanceMenus();
    this.createCloudMenus();
    this.createCollaborationMenus();
    this.createVersionControlMenus();
    this.createAnalyticsMenus();
    this.createAIMenus();
    this.createBatchProcessingMenus();
    this.createAutomationMenus();
    this.createIntegrationMenus();
    this.createAPIMenus();
    this.createWebhookMenus();
    this.createNotificationMenus();
    this.createSecurityMenus();
    this.createBackupMenus();
    this.createRestoreMenus();
    this.createDebugMenus();
    this.createDeveloperMenus();
    this.createExperimentalMenus();
    
    console.log('[MenuSystem] Initialized with extensive menu structure');
  }

  createMainMenu() {
    const fileMenu = {
      id: 'file',
      label: 'File',
      icon: 'folder',
      shortcut: 'Alt+F',
      items: [
        { id: 'new', label: 'New', icon: 'file-plus', shortcut: 'Ctrl+N', action: 'newFile' },
        { id: 'new-from-template', label: 'New from Template', icon: 'template', submenu: 'templates' },
        { id: 'open', label: 'Open...', icon: 'folder-open', shortcut: 'Ctrl+O', action: 'openFile' },
        { id: 'open-recent', label: 'Open Recent', icon: 'history', submenu: 'recent' },
        { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S', action: 'saveFile' },
        { id: 'save-as', label: 'Save As...', icon: 'save-as', shortcut: 'Ctrl+Shift+S', action: 'saveFileAs' },
        { id: 'save-copy', label: 'Save a Copy', icon: 'copy', action: 'saveCopy' },
        { id: 'save-all', label: 'Save All', icon: 'save-all', shortcut: 'Ctrl+Alt+S', action: 'saveAll' },
        { id: 'export', label: 'Export', icon: 'export', shortcut: 'Ctrl+E', submenu: 'export' },
        { id: 'import', label: 'Import', icon: 'import', shortcut: 'Ctrl+I', submenu: 'import' },
        { id: 'package', label: 'Package as .iconer', icon: 'package', action: 'createPackage' },
        { id: 'print', label: 'Print...', icon: 'printer', shortcut: 'Ctrl+P', action: 'print' },
        { id: 'close', label: 'Close', icon: 'close', shortcut: 'Ctrl+W', action: 'closeFile' },
        { id: 'close-all', label: 'Close All', icon: 'close-all', action: 'closeAllFiles' },
        { id: 'exit', label: 'Exit', icon: 'exit', shortcut: 'Alt+F4', action: 'exit' }
      ]
    };
    
    this.menus.set('file', fileMenu);
  }

  createEditMenu() {
    const editMenu = {
      id: 'edit',
      label: 'Edit',
      icon: 'edit',
      shortcut: 'Alt+E',
      items: [
        { id: 'undo', label: 'Undo', icon: 'undo', shortcut: 'Ctrl+Z', action: 'undo' },
        { id: 'redo', label: 'Redo', icon: 'redo', shortcut: 'Ctrl+Y', action: 'redo' },
        { id: 'repeat', label: 'Repeat', icon: 'repeat', shortcut: 'Ctrl+Shift+Z', action: 'repeat' },
        { separator: true },
        { id: 'cut', label: 'Cut', icon: 'cut', shortcut: 'Ctrl+X', action: 'cut' },
        { id: 'copy', label: 'Copy', icon: 'copy', shortcut: 'Ctrl+C', action: 'copy' },
        { id: 'paste', label: 'Paste', icon: 'paste', shortcut: 'Ctrl+V', action: 'paste' },
        { id: 'paste-special', label: 'Paste Special', icon: 'paste-special', submenu: 'pasteSpecial' },
        { id: 'duplicate', label: 'Duplicate', icon: 'duplicate', shortcut: 'Ctrl+D', action: 'duplicate' },
        { separator: true },
        { id: 'select-all', label: 'Select All', icon: 'select-all', shortcut: 'Ctrl+A', action: 'selectAll' },
        { id: 'deselect', label: 'Deselect', icon: 'deselect', shortcut: 'Ctrl+Shift+A', action: 'deselect' },
        { id: 'invert-selection', label: 'Invert Selection', icon: 'invert', action: 'invertSelection' },
        { separator: true },
        { id: 'find', label: 'Find', icon: 'search', shortcut: 'Ctrl+F', action: 'find' },
        { id: 'replace', label: 'Replace', icon: 'replace', shortcut: 'Ctrl+H', action: 'replace' },
        { id: 'goto', label: 'Go To', icon: 'goto', shortcut: 'Ctrl+G', action: 'goto' },
        { separator: true },
        { id: 'preferences', label: 'Preferences', icon: 'settings', shortcut: 'Ctrl+,', action: 'openPreferences' }
      ]
    };
    
    this.menus.set('edit', editMenu);
  }

  createViewMenu() {
    const viewMenu = {
      id: 'view',
      label: 'View',
      icon: 'eye',
      shortcut: 'Alt+V',
      items: [
        { id: 'zoom-in', label: 'Zoom In', icon: 'zoom-in', shortcut: 'Ctrl++', action: 'zoomIn' },
        { id: 'zoom-out', label: 'Zoom Out', icon: 'zoom-out', shortcut: 'Ctrl+-', action: 'zoomOut' },
        { id: 'zoom-fit', label: 'Fit to Screen', icon: 'fit', shortcut: 'Ctrl+1', action: 'zoomFit' },
        { id: 'zoom-actual', label: 'Actual Size', icon: 'actual', shortcut: 'Ctrl+0', action: 'zoomActual' },
        { id: 'zoom-selection', label: 'Zoom to Selection', icon: 'zoom-select', shortcut: 'Ctrl+2', action: 'zoomToSelection' },
        { separator: true },
        { id: 'grid', label: 'Show Grid', icon: 'grid', shortcut: 'Ctrl+\'', toggle: true, action: 'toggleGrid' },
        { id: 'grid-settings', label: 'Grid Settings...', icon: 'grid-settings', action: 'openGridSettings' },
        { id: 'guides', label: 'Show Guides', icon: 'guides', shortcut: 'Ctrl+;', toggle: true, action: 'toggleGuides' },
        { id: 'rulers', label: 'Show Rulers', icon: 'rulers', shortcut: 'Ctrl+R', toggle: true, action: 'toggleRulers' },
        { separator: true },
        { id: 'fullscreen', label: 'Full Screen', icon: 'fullscreen', shortcut: 'F11', toggle: true, action: 'toggleFullscreen' },
        { id: 'presentation-mode', label: 'Presentation Mode', icon: 'presentation', shortcut: 'F5', action: 'presentationMode' },
        { separator: true },
        { id: 'layers-panel', label: 'Layers Panel', icon: 'layers', shortcut: 'F7', toggle: true, action: 'toggleLayersPanel' },
        { id: 'properties-panel', label: 'Properties Panel', icon: 'properties', shortcut: 'F8', toggle: true, action: 'togglePropertiesPanel' },
        { id: 'assets-panel', label: 'Assets Panel', icon: 'assets', shortcut: 'F9', toggle: true, action: 'toggleAssetsPanel' },
        { id: 'library-panel', label: 'Library Panel', icon: 'library', shortcut: 'F10', toggle: true, action: 'toggleLibraryPanel' }
      ]
    };
    
    this.menus.set('view', viewMenu);
  }

  createToolsMenu() {
    const toolsMenu = {
      id: 'tools',
      label: 'Tools',
      icon: 'tool',
      shortcut: 'Alt+T',
      items: [
        { id: 'select-tool', label: 'Select Tool', icon: 'cursor', shortcut: 'V', active: true, action: 'setSelectTool' },
        { id: 'move-tool', label: 'Move Tool', icon: 'move', shortcut: 'M', action: 'setMoveTool' },
        { separator: true },
        { id: 'pen-tool', label: 'Pen Tool', icon: 'pen', shortcut: 'P', action: 'setPenTool' },
        { id: 'brush-tool', label: 'Brush Tool', icon: 'brush', shortcut: 'B', action: 'setBrushTool' },
        { id: 'pencil-tool', label: 'Pencil Tool', icon: 'pencil', shortcut: 'N', action: 'setPencilTool' },
        { id: 'eraser-tool', label: 'Eraser Tool', icon: 'eraser', shortcut: 'E', action: 'setEraserTool' },
        { separator: true },
        { id: 'fill-tool', label: 'Fill Tool', icon: 'fill', shortcut: 'G', action: 'setFillTool' },
        { id: 'gradient-tool', label: 'Gradient Tool', icon: 'gradient', shortcut: 'L', action: 'setGradientTool' },
        { id: 'pattern-tool', label: 'Pattern Tool', icon: 'pattern', action: 'setPatternTool' },
        { id: 'eyedropper-tool', label: 'Eyedropper Tool', icon: 'eyedropper', shortcut: 'I', action: 'setEyedropperTool' },
        { separator: true },
        { id: 'text-tool', label: 'Text Tool', icon: 'text', shortcut: 'T', action: 'setTextTool' },
        { id: 'shape-tool', label: 'Shape Tool', icon: 'shape', shortcut: 'U', submenu: 'shapes' },
        { separator: true },
        { id: 'slice-tool', label: 'Slice Tool', icon: 'slice', action: 'setSliceTool' },
        { id: 'measure-tool', label: 'Measure Tool', icon: 'measure', action: 'setMeasureTool' },
        { separator: true },
        { id: 'hand-tool', label: 'Hand Tool', icon: 'hand', shortcut: 'H', action: 'setHandTool' },
        { id: 'zoom-tool', label: 'Zoom Tool', icon: 'zoom', shortcut: 'Z', action: 'setZoomTool' }
      ]
    };
    
    this.menus.set('tools', toolsMenu);
  }

  createIconEditorMenus() {
    const editorMenus = {
      'editor': {
        id: 'editor',
        label: 'Editor',
        items: [
          { id: 'canvas-size', label: 'Canvas Size...', action: 'resizeCanvas' },
          { id: 'crop', label: 'Crop', action: 'crop' },
          { id: 'trim', label: 'Trim', action: 'trim' },
          { id: 'rotate-canvas', label: 'Rotate Canvas', submenu: 'rotation' },
          { id: 'flip-canvas', label: 'Flip Canvas', submenu: 'flip' },
          { separator: true },
          { id: 'snap-to-grid', label: 'Snap to Grid', toggle: true, action: 'toggleSnapToGrid' },
          { id: 'snap-to-guides', label: 'Snap to Guides', toggle: true, action: 'toggleSnapToGuides' },
          { id: 'snap-to-pixels', label: 'Snap to Pixels', toggle: true, action: 'toggleSnapToPixels' },
          { separator: true },
          { id: 'pixel-preview', label: 'Pixel Preview', toggle: true, action: 'togglePixelPreview' },
          { id: 'outline-mode', label: 'Outline Mode', toggle: true, action: 'toggleOutlineMode' }
        ]
      }
    };
    
    Object.entries(editorMenus).forEach(([key, menu]) => this.menus.set(key, menu));
  }

  createLayerMenus() {
    const layerMenu = {
      id: 'layer',
      label: 'Layer',
      icon: 'layers',
      shortcut: 'Alt+L',
      items: [
        { id: 'new-layer', label: 'New Layer', icon: 'layer-plus', shortcut: 'Ctrl+Shift+N', action: 'addLayer' },
        { id: 'new-layer-group', label: 'New Layer Group', icon: 'group-plus', shortcut: 'Ctrl+G', action: 'addGroup' },
        { id: 'duplicate-layer', label: 'Duplicate Layer', icon: 'duplicate', shortcut: 'Ctrl+J', action: 'duplicateLayer' },
        { id: 'delete-layer', label: 'Delete Layer', icon: 'delete', shortcut: 'Delete', action: 'deleteLayer' },
        { separator: true },
        { id: 'merge-down', label: 'Merge Down', icon: 'merge', shortcut: 'Ctrl+E', action: 'mergeDown' },
        { id: 'merge-visible', label: 'Merge Visible', icon: 'merge-all', action: 'mergeVisible' },
        { id: 'flatten-image', label: 'Flatten Image', action: 'flattenImage' },
        { separator: true },
        { id: 'layer-opacity', label: 'Opacity', submenu: 'opacity' },
        { id: 'layer-blend-mode', label: 'Blend Mode', submenu: 'blendModes' },
        { separator: true },
        { id: 'layer-style', label: 'Layer Style...', icon: 'style', action: 'openLayerStyle' },
        { id: 'layer-mask', label: 'Layer Mask', submenu: 'masks' },
        { id: 'clipping-mask', label: 'Clipping Mask', shortcut: 'Ctrl+Alt+G', action: 'createClippingMask' },
        { separator: true },
        { id: 'lock-transparent', label: 'Lock Transparent Pixels', icon: 'lock-alpha', toggle: true, action: 'lockTransparent' },
        { id: 'lock-position', label: 'Lock Position', icon: 'lock-pos', toggle: true, action: 'lockPosition' },
        { id: 'lock-all', label: 'Lock All', icon: 'lock-all', toggle: true, action: 'lockAll' }
      ]
    };
    
    this.menus.set('layer', layerMenu);
  }

  createFilterMenus() {
    const filterMenu = {
      id: 'filter',
      label: 'Filter',
      icon: 'filter',
      shortcut: 'Alt+F',
      items: [
        { id: 'last-filter', label: 'Last Filter', shortcut: 'Ctrl+F', action: 'applyLastFilter' },
        { separator: true },
        { id: 'blur', label: 'Blur', submenu: 'blurFilters' },
        { id: 'sharpen', label: 'Sharpen', submenu: 'sharpenFilters' },
        { id: 'noise', label: 'Noise', submenu: 'noiseFilters' },
        { id: 'distort', label: 'Distort', submenu: 'distortFilters' },
        { id: 'stylize', label: 'Stylize', submenu: 'stylizeFilters' },
        { separator: true },
        { id: 'adjustments', label: 'Adjustments', submenu: 'adjustments' },
        { id: 'color-filters', label: 'Color Filters', submenu: 'colorFilters' },
        { separator: true },
        { id: 'smart-filter', label: 'Convert to Smart Filter', action: 'convertToSmartFilter' },
        { id: 'filter-gallery', label: 'Filter Gallery...', action: 'openFilterGallery' }
      ]
    };
    
    this.menus.set('filter', filterMenu);
  }

  createEffectMenus() {
    const effectMenu = {
      id: 'effects',
      label: 'Effects',
      icon: 'sparkles',
      items: [
        { id: 'drop-shadow', label: 'Drop Shadow', action: 'addDropShadow' },
        { id: 'inner-shadow', label: 'Inner Shadow', action: 'addInnerShadow' },
        { id: 'outer-glow', label: 'Outer Glow', action: 'addOuterGlow' },
        { id: 'inner-glow', label: 'Inner Glow', action: 'addInnerGlow' },
        { id: 'bevel-emboss', label: 'Bevel & Emboss', action: 'addBevelEmboss' },
        { id: 'satin', label: 'Satin', action: 'addSatin' },
        { id: 'color-overlay', label: 'Color Overlay', action: 'addColorOverlay' },
        { id: 'gradient-overlay', label: 'Gradient Overlay', action: 'addGradientOverlay' },
        { id: 'pattern-overlay', label: 'Pattern Overlay', action: 'addPatternOverlay' },
        { id: 'stroke', label: 'Stroke', action: 'addStroke' },
        { separator: true },
        { id: 'clear-effects', label: 'Clear All Effects', action: 'clearEffects' }
      ]
    };
    
    this.menus.set('effects', effectMenu);
  }

  createColorMenus() {
    const colorMenu = {
      id: 'color',
      label: 'Color',
      icon: 'palette',
      items: [
        { id: 'foreground-color', label: 'Foreground Color', icon: 'color-fg', action: 'pickForegroundColor' },
        { id: 'background-color', label: 'Background Color', icon: 'color-bg', action: 'pickBackgroundColor' },
        { id: 'swap-colors', label: 'Swap Colors', icon: 'swap', shortcut: 'X', action: 'swapColors' },
        { id: 'default-colors', label: 'Default Colors', icon: 'default', shortcut: 'D', action: 'resetColors' },
        { separator: true },
        { id: 'color-picker', label: 'Color Picker...', icon: 'picker', action: 'openColorPicker' },
        { id: 'color-swatches', label: 'Color Swatches', icon: 'swatches', action: 'openSwatches' },
        { id: 'color-themes', label: 'Color Themes', icon: 'themes', action: 'openColorThemes' },
        { id: 'color-harmony', label: 'Color Harmony', icon: 'harmony', action: 'openColorHarmony' },
        { separator: true },
        { id: 'gradient-editor', label: 'Gradient Editor...', icon: 'gradient', action: 'openGradientEditor' },
        { id: 'pattern-editor', label: 'Pattern Editor...', icon: 'pattern', action: 'openPatternEditor' }
      ]
    };
    
    this.menus.set('color', colorMenu);
  }

  createTransformMenus() {
    const transformMenu = {
      id: 'transform',
      label: 'Transform',
      icon: 'transform',
      items: [
        { id: 'free-transform', label: 'Free Transform', icon: 'free-transform', shortcut: 'Ctrl+T', action: 'freeTransform' },
        { separator: true },
        { id: 'translate', label: 'Translate', action: 'translate' },
        { id: 'scale', label: 'Scale', action: 'scale' },
        { id: 'rotate', label: 'Rotate', submenu: 'rotation' },
        { id: 'skew', label: 'Skew', action: 'skew' },
        { id: 'distort', label: 'Distort', action: 'distort' },
        { id: 'perspective', label: 'Perspective', action: 'perspective' },
        { id: 'warp', label: 'Warp', action: 'warp' },
        { separator: true },
        { id: 'flip-horizontal', label: 'Flip Horizontal', action: 'flipHorizontal' },
        { id: 'flip-vertical', label: 'Flip Vertical', action: 'flipVertical' },
        { separator: true },
        { id: 'reset-transform', label: 'Reset Transform', action: 'resetTransform' }
      ]
    };
    
    this.menus.set('transform', transformMenu);
  }

  createAlignMenus() {
    const alignMenu = {
      id: 'align',
      label: 'Align',
      icon: 'align',
      items: [
        { id: 'align-left', label: 'Align Left', icon: 'align-left', action: 'alignLeft' },
        { id: 'align-center', label: 'Align Center', icon: 'align-center', action: 'alignCenter' },
        { id: 'align-right', label: 'Align Right', icon: 'align-right', action: 'alignRight' },
        { id: 'align-top', label: 'Align Top', icon: 'align-top', action: 'alignTop' },
        { id: 'align-middle', label: 'Align Middle', icon: 'align-middle', action: 'alignMiddle' },
        { id: 'align-bottom', label: 'Align Bottom', icon: 'align-bottom', action: 'alignBottom' },
        { separator: true },
        { id: 'align-to-canvas', label: 'Align to Canvas', toggle: true, action: 'alignToCanvas' },
        { id: 'align-to-selection', label: 'Align to Selection', toggle: true, action: 'alignToSelection' },
        { id: 'align-to-key-object', label: 'Align to Key Object', toggle: true, action: 'alignToKeyObject' }
      ]
    };
    
    this.menus.set('align', alignMenu);
  }

  createExportMenus() {
    const exportMenu = {
      id: 'export',
      label: 'Export',
      icon: 'export',
      items: [
        { id: 'export-as', label: 'Export As...', icon: 'export-as', shortcut: 'Ctrl+Alt+E', action: 'exportAs' },
        { id: 'quick-export', label: 'Quick Export', icon: 'quick-export', shortcut: 'Ctrl+Shift+E', action: 'quickExport' },
        { separator: true },
        { id: 'export-png', label: 'Export as PNG', icon: 'png', action: () => this.export('png') },
        { id: 'export-jpg', label: 'Export as JPG', icon: 'jpg', action: () => this.export('jpg') },
        { id: 'export-svg', label: 'Export as SVG', icon: 'svg', action: () => this.export('svg') },
        { id: 'export-webp', label: 'Export as WebP', icon: 'webp', action: () => this.export('webp') },
        { id: 'export-gif', label: 'Export as GIF', icon: 'gif', action: () => this.export('gif') },
        { id: 'export-iconer', label: 'Export as .iconer', icon: 'iconer', action: () => this.export('iconer') },
        { separator: true },
        { id: 'export-slices', label: 'Export Slices...', action: 'exportSlices' },
        { id: 'export-assets', label: 'Generate Assets...', action: 'generateAssets' },
        { id: 'export-settings', label: 'Export Settings...', action: 'openExportSettings' }
      ]
    };
    
    this.menus.set('export', exportMenu);
  }

  createAIMenus() {
    const aiMenu = {
      id: 'ai',
      label: 'AI Assistant',
      icon: 'robot',
      items: [
        { id: 'ai-generate', label: 'Generate Icon', icon: 'generate', action: 'aiGenerate' },
        { id: 'ai-enhance', label: 'Enhance Quality', icon: 'enhance', action: 'aiEnhance' },
        { id: 'ai-upscale', label: 'Upscale Image', icon: 'upscale', action: 'aiUpscale' },
        { id: 'ai-remove-bg', label: 'Remove Background', icon: 'remove-bg', action: 'aiRemoveBackground' },
        { id: 'ai-vectorize', label: 'Vectorize', icon: 'vectorize', action: 'aiVectorize' },
        { separator: true },
        { id: 'ai-suggest', label: 'Design Suggestions', icon: 'suggest', action: 'aiSuggest' },
        { id: 'ai-color-palette', label: 'Generate Color Palette', icon: 'palette', action: 'aiColorPalette' },
        { id: 'ai-auto-trace', label: 'Auto Trace', icon: 'trace', action: 'aiAutoTrace' },
        { separator: true },
        { id: 'ai-settings', label: 'AI Settings...', icon: 'settings', action: 'openAISettings' }
      ]
    };
    
    this.menus.set('ai', aiMenu);
  }

  createBatchProcessingMenus() {
    const batchMenu = {
      id: 'batch',
      label: 'Batch Processing',
      icon: 'batch',
      items: [
        { id: 'batch-convert', label: 'Batch Convert...', action: 'batchConvert' },
        { id: 'batch-resize', label: 'Batch Resize...', action: 'batchResize' },
        { id: 'batch-rename', label: 'Batch Rename...', action: 'batchRename' },
        { id: 'batch-optimize', label: 'Batch Optimize...', action: 'batchOptimize' },
        { id: 'batch-watermark', label: 'Batch Watermark...', action: 'batchWatermark' },
        { separator: true },
        { id: 'batch-actions', label: 'Batch Apply Actions...', action: 'batchActions' },
        { id: 'batch-export', label: 'Batch Export...', action: 'batchExport' },
        { separator: true },
        { id: 'create-droplet', label: 'Create Droplet...', action: 'createDroplet' }
      ]
    };
    
    this.menus.set('batch', batchMenu);
  }

  createSettingsMenus() {
    const settingsMenu = {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      items: [
        { id: 'general', label: 'General', icon: 'general', action: 'openGeneralSettings' },
        { id: 'interface', label: 'Interface', icon: 'interface', action: 'openInterfaceSettings' },
        { id: 'performance', label: 'Performance', icon: 'performance', action: 'openPerformanceSettings' },
        { id: 'file-handling', label: 'File Handling', icon: 'files', action: 'openFileHandlingSettings' },
        { id: 'tools', label: 'Tools', icon: 'tools', action: 'openToolSettings' },
        { separator: true },
        { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts...', icon: 'keyboard', action: 'openShortcuts' },
        { id: 'workspace', label: 'Workspace', icon: 'workspace', submenu: 'workspaces' },
        { id: 'plugins', label: 'Plugins', icon: 'plugins', action: 'openPluginManager' },
        { separator: true },
        { id: 'check-updates', label: 'Check for Updates', icon: 'update', action: 'checkUpdates' },
        { id: 'about', label: 'About Iconer', icon: 'info', action: 'showAbout' }
      ]
    };
    
    this.menus.set('settings', settingsMenu);
  }

  createContextMenu(triggerElement, menuItems) {
    const contextMenu = {
      trigger: triggerElement,
      items: menuItems,
      position: { x: 0, y: 0 }
    };
    
    this.contextMenus.set(triggerElement, contextMenu);
    return contextMenu;
  }

  addMenuItem(menuId, item, position = -1) {
    const menu = this.menus.get(menuId);
    if (!menu) {
      console.warn(`[MenuSystem] Menu ${menuId} not found`);
      return false;
    }
    
    if (position === -1) {
      menu.items.push(item);
    } else {
      menu.items.splice(position, 0, item);
    }
    
    console.log(`[MenuSystem] Added item to menu ${menuId}`);
    return true;
  }

  removeMenuItem(menuId, itemId) {
    const menu = this.menus.get(menuId);
    if (!menu) return false;
    
    const index = menu.items.findIndex(item => item.id === itemId);
    if (index > -1) {
      menu.items.splice(index, 1);
      console.log(`[MenuSystem] Removed item ${itemId} from menu ${menuId}`);
      return true;
    }
    
    return false;
  }

  registerShortcut(shortcut, action) {
    this.shortcuts.set(shortcut.toLowerCase(), action);
    console.log(`[MenuSystem] Registered shortcut: ${shortcut}`);
  }

  executeShortcut(shortcut) {
    const action = this.shortcuts.get(shortcut.toLowerCase());
    if (action) {
      action();
      return true;
    }
    return false;
  }

  getMenu(menuId) {
    return this.menus.get(menuId);
  }

  getAllMenus() {
    return Array.from(this.menus.values());
  }

  getContextMenu(element) {
    return this.contextMenus.get(element);
  }

  showContextMenu(element, x, y) {
    const menu = this.contextMenus.get(element);
    if (menu) {
      menu.position = { x, y };
      return menu;
    }
    return null;
  }

  hideContextMenu() {
    this.contextMenus.forEach(menu => {
      menu.position = { x: -9999, y: -9999 };
    });
  }

  enableMenuItem(itemId) {
    this.findMenuItem(itemId).disabled = false;
  }

  disableMenuItem(itemId) {
    this.findMenuItem(itemId).disabled = true;
  }

  checkMenuItem(itemId, checked = true) {
    const item = this.findMenuItem(itemId);
    if (item) {
      item.checked = checked;
    }
  }

  findMenuItem(itemId) {
    for (const menu of this.menus.values()) {
      const item = menu.items.find(i => i.id === itemId);
      if (item) return item;
      
      if (item && item.submenu) {
        const subMenu = this.menus.get(item.submenu);
        if (subMenu) {
          const subItem = subMenu.items.find(i => i.id === itemId);
          if (subItem) return subItem;
        }
      }
    }
    return null;
  }

  updateMenuLabel(menuId, newLabel) {
    const menu = this.menus.get(menuId);
    if (menu) {
      menu.label = newLabel;
    }
  }

  destroy() {
    this.menus.clear();
    this.subMenus.clear();
    this.contextMenus.clear();
    this.shortcuts.clear();
    console.log('[MenuSystem] Destroyed');
  }
}

export default MenuSystem;

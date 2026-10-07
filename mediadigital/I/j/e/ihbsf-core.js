/**
 * IHBSF sistem Core - utama Entry Point
 * Sistem inti untuk package .iconer
 */

import { IHBSF_CONFIG } from '../config/ihbsf.config.js';

class IHBSFSystem {
  constructor(config = {}) {
    this.config = { ...IHBSF_CONFIG, ...config };
    this.version = this.config.version;
    this.initialized = false;
    this.modules = new Map();
    this.plugins = new Map();
    this.state = {};
  }

  async initialize() {
    console.log('[IHBSF] Initializing system...');
    
    // mulai core modules
    await this.initDisplaySystem();
    await this.initDeviceSystem();
    await this.initStorageSystem();
    await this.initPluginSystem();
    await this.initAPISystem();
    
    this.initialized = true;
    console.log('[IHBSF] System initialized successfully');
    
    return this;
  }

  async initDisplaySystem() {
    const { theme, layout } = this.config.display;
    this.state.display = {
      theme: theme.default,
      layout: layout,
      breakpoints: layout.breakpoints
    };
    console.log('[IHBSF] Display system initialized');
  }

  async initDeviceSystem() {
    const { device } = this.config.system;
    this.state.device = {
      type: this.detectDeviceType(),
      orientation: this.detectOrientation(),
      density: window.devicePixelRatio || 1,
      supported: device.supported
    };
    console.log('[IHBSF] Device system initialized');
  }

  async initStorageSystem() {
    const { storage } = this.config;
    this.state.storage = {
      local: storage.local.enabled ? 'available' : 'disabled',
      cloud: storage.cloud.enabled ? 'available' : 'disabled'
    };
    console.log('[IHBSF] Storage system initialized');
  }

  async initPluginSystem() {
    const { plugins } = this.config;
    if (plugins.enabled) {
      this.state.plugins = {
        enabled: true,
        loaded: 0,
        directory: plugins.directory
      };
      console.log('[IHBSF] Plugin system initialized');
    }
  }

  async initAPISystem() {
    const { api } = this.config;
    this.state.api = {
      baseUrl: api.baseUrl,
      connected: false,
      endpoints: api.endpoints
    };
    console.log('[IHBSF] API system initialized');
  }

  detectDeviceType() {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const { breakpoints } = this.config.display.layout;
    
    if (width <= parseInt(breakpoints.tablet)) return 'mobile';
    if (width <= parseInt(breakpoints.desktop)) return 'tablet';
    return 'desktop';
  }

  detectOrientation() {
    if (typeof window === 'undefined') return 'landscape';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }

  registerModule(name, module) {
    this.modules.set(name, module);
    console.log(`[IHBSF] Module registered: ${name}`);
  }

  getModule(name) {
    return this.modules.get(name);
  }

  registerPlugin(name, plugin) {
    if (this.config.plugins.enabled) {
      this.plugins.set(name, plugin);
      this.state.plugins.loaded++;
      console.log(`[IHBSF] Plugin registered: ${name}`);
    }
  }

  getPlugin(name) {
    return this.plugins.get(name);
  }

  getState() {
    return { ...this.state };
  }

  getConfig(path) {
    const keys = path.split('.');
    let value = this.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  async loadIconerPackage(filePath) {
    const { iconerFormat } = this.config;
    console.log(`[IHBSF] Loading .iconer package: ${filePath}`);
    
    // sahkan berkas extension
    if (!filePath.endsWith(iconerFormat.extension)) {
      throw new Error(`Invalid file format. Expected ${iconerFormat.extension}`);
    }
    
    // muat dan parse package
    const packageData = await this.parseIconerPackage(filePath);
    
    return {
      manifest: packageData.manifest,
      metadata: packageData.metadata,
      assets: packageData.assets,
      configurations: packageData.configurations,
      themes: packageData.themes,
      layouts: packageData.layouts,
      components: packageData.components
    };
  }

  async parseIconerPackage(filePath) {
    // Implementation untuk parsing .iconer berkas-berkas
    console.log('[IHBSF] Parsing .iconer package...');
    
    return {
      manifest: {},
      metadata: {},
      assets: [],
      configurations: {},
      themes: [],
      layouts: [],
      components: []
    };
  }

  async exportToIconer(data, outputPath) {
    const { iconerFormat } = this.config;
    console.log(`[IHBSF] Exporting to .iconer: ${outputPath}`);
    
    const packageData = {
      manifest: this.generateManifest(data),
      metadata: this.generateMetadata(data),
      assets: data.assets || [],
      configurations: data.configurations || {},
      themes: data.themes || [],
      layouts: data.layouts || [],
      components: data.components || []
    };
    
    // Compress dan simpan
    const compressed = await this.compressPackage(packageData);
    
    return {
      path: outputPath,
      size: compressed.size,
      format: iconerFormat.extension
    };
  }

  generateManifest(data) {
    return {
      version: this.config.iconerFormat.versioning.current,
      name: data.name || 'Untitled',
      description: data.description || '',
      author: data.author || 'Unknown',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  generateMetadata(data) {
    return {
      format: this.config.iconerFormat.mimeType,
      encoding: this.config.iconerFormat.encoding,
      compression: this.config.iconerFormat.compression.algorithm,
      dimensions: data.dimensions || { width: 0, height: 0 },
      layers: data.layers || 0,
      components: data.componentCount || 0
    };
  }

  async compressPackage(data) {
    const { algorithm, level } = this.config.iconerFormat.compression;
    console.log(`[IHBSF] Compressing with ${algorithm} (level ${level})`);
    
    // Compression implementation
    return {
      size: JSON.stringify(data).length,
      algorithm,
      level
    };
  }

  dispose() {
    console.log('[IHBSF] Disposing system...');
    this.modules.clear();
    this.plugins.clear();
    this.state = {};
    this.initialized = false;
  }
}

// Export singleton instance
const ihbsfSystem = new IHBSFSystem();

export { IHBSFSystem, ihbsfSystem };
export default ihbsfSystem;

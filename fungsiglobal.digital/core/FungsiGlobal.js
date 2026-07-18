/**
 * FungsiGlobal - Sistem Fungsi Umum Keseluruhan Menyeluruh
 * Rekonstruksi otomatis dari file-file southeastapp /component/ /components/
 * 
 * Fitur Utama:
 * - Auto-detection: Otomatis aktif ketika menambahkan folder atau file
 * - Multi-tag Support: css, js, taghtml, tagphp, tagdb
 * - Dynamic Rendering: Menjadi tampilan, fungsi, konfigurasi, pengaturan
 * - Hot Reload: Deteksi perubahan file secara real-time
 * 
 * @version 1.0.0
 * @author SoutheastApp Team
 */

import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

// Import dari southeastapp
import { southeastConfig } from '../southeastapp/config/index.js';
import { UnlimitedStorage } from '../southeastapp/storage/UnlimitedStorage.js';
import { ComponentService } from '../southeastapp/services/ComponentService.js';

class FungsiGlobal extends EventEmitter {
  constructor(options = {}) {
    super();
    this.name = 'FungsiGlobal';
    this.version = '1.0.0';
    
    // Konfigurasi
    this.config = {
      watchPaths: [
        '/workspace/southeastapp',
        '/workspace/southeastapp/components',
        '/workspace/southeastapp/component',
        '/workspace'
      ],
      fileExtensions: ['.js', '.css', '.html', '.php', '.db', '.json'],
      autoReload: true,
      debug: options.debug || false,
      storage: new UnlimitedStorage(),
      componentService: new ComponentService()
    };

    // Registry untuk semua komponen
    this.registry = {
      files: new Map(),
      components: new Map(),
      tags: {
        html: new Map(),
        php: new Map(),
        db: new Map(),
        css: new Map(),
        js: new Map()
      },
      functions: new Map(),
      configurations: new Map(),
      settings: new Map()
    };

    // State
    this.initialized = false;
    this.watchers = [];
    this.scanInterval = null;

    this.log('🌍 FungsiGlobal initialized');
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.name}]`;
    
    if (this.config.debug || level !== 'debug') {
      console.log(`${prefix} ${message}`);
    }
  }

  /**
   * Initialize sistem FungsiGlobal
   */
  async initialize() {
    this.log('🚀 Initializing FungsiGlobal system...');
    
    // Load semua komponen dari southeastapp
    await this.reconstructFromSoutheastApp();
    
    // Setup auto-loader
    await this.setupAutoLoader();
    
    // Start file watcher
    if (this.config.autoReload) {
      this.startFileWatcher();
    }

    this.initialized = true;
    this.emit('initialized', this.getStatus());
    this.log('✅ FungsiGlobal fully initialized!');
    
    return this;
  }

  /**
   * Rekonstruksi dari file-file southeastapp
   */
  async reconstructFromSoutheastApp() {
    this.log('📦 Reconstructing from southeastapp components...');
    
    const paths = [
      '/workspace/southeastapp',
      '/workspace/southeastapp/components',
      '/workspace/southeastapp/component',
      '/workspace/southeastapp/services',
      '/workspace/southeastapp/utils',
      '/workspace/southeastapp/hooks',
      '/workspace/southeastapp/middleware',
      '/workspace/southeastapp/assets',
      '/workspace/southeastapp/locales',
      '/workspace/southeastapp/api',
      '/workspace/southeastapp/storage',
      '/workspace/southeastapp/config'
    ];

    let totalFiles = 0;
    let totalComponents = 0;

    for (const basePath of paths) {
      if (fs.existsSync(basePath)) {
        const files = await this.scanDirectory(basePath);
        totalFiles += files.length;
        
        for (const file of files) {
          await this.processFile(file);
          totalComponents++;
        }
      }
    }

    this.log(`📊 Reconstructed ${totalComponents} components from ${totalFiles} files`);
    
    return {
      totalFiles,
      totalComponents,
      success: true
    };
  }

  /**
   * Scan directory untuk semua file
   */
  async scanDirectory(dirPath, fileList = []) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          await this.scanDirectory(fullPath, fileList);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (this.config.fileExtensions.includes(ext)) {
            fileList.push({
              path: fullPath,
              name: entry.name,
              ext: ext,
              size: fs.statSync(fullPath).size,
              mtime: fs.statSync(fullPath).mtime
            });
          }
        }
      }
    } catch (error) {
      this.log(`Error scanning ${dirPath}: ${error.message}`, 'error');
    }
    
    return fileList;
  }

  /**
   * Process individual file
   */
  async processFile(fileInfo) {
    const { path: filePath, name, ext } = fileInfo;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Simpan ke storage
      await this.config.storage.store(`file:${filePath}`, {
        ...fileInfo,
        content,
        processedAt: Date.now()
      });

      // Register ke registry berdasarkan tipe
      this.registry.files.set(filePath, fileInfo);

      // Categorize berdasarkan ekstensi dan konten
      if (ext === '.js') {
        await this.categorizeAsJS(name, content, filePath);
      } else if (ext === '.css') {
        await this.categorizeAsCSS(name, content, filePath);
      } else if (ext === '.html') {
        await this.categorizeAsHTML(name, content, filePath);
      } else if (ext === '.php') {
        await this.categorizeAsPHP(name, content, filePath);
      } else if (ext === '.db' || ext === '.json') {
        await this.categorizeAsDB(name, content, filePath);
      }

      this.log(`Processed: ${name} (${ext})`, 'debug');
      
    } catch (error) {
      this.log(`Error processing ${filePath}: ${error.message}`, 'error');
    }
  }

  /**
   * Categorize sebagai JavaScript
   */
  async categorizeAsJS(name, content, filePath) {
    const componentName = this.extractComponentName(name);
    
    // Extract functions
    const functions = this.extractFunctions(content);
    functions.forEach(fn => {
      this.registry.functions.set(fn.name, {
        ...fn,
        source: filePath,
        type: 'javascript'
      });
    });

    // Extract classes
    const classes = this.extractClasses(content);
    classes.forEach(cls => {
      this.registry.components.set(cls.name, {
        ...cls,
        source: filePath,
        type: 'javascript'
      });
    });

    // Register di component service
    this.config.componentService.register(componentName, {
      name: componentName,
      content,
      filePath,
      type: 'js'
    });

    this.registry.tags.js.set(componentName, {
      name: componentName,
      content,
      filePath,
      functions: functions.map(f => f.name),
      classes: classes.map(c => c.name)
    });
  }

  /**
   * Categorize sebagai CSS
   */
  async categorizeAsCSS(name, content, filePath) {
    const componentName = this.extractComponentName(name);
    
    // Extract selectors and rules
    const styles = this.extractCSSRules(content);
    
    this.registry.tags.css.set(componentName, {
      name: componentName,
      content,
      filePath,
      selectors: styles.selectors,
      rules: styles.rulesCount
    });

    this.config.componentService.register(componentName, {
      name: componentName,
      content,
      filePath,
      type: 'css'
    });
  }

  /**
   * Categorize sebagai HTML
   */
  async categorizeAsHTML(name, content, filePath) {
    const componentName = this.extractComponentName(name);
    
    // Extract tags
    const tags = this.extractHTMLTags(content);
    
    this.registry.tags.html.set(componentName, {
      name: componentName,
      content,
      filePath,
      tags: tags,
      tagCount: tags.length
    });
  }

  /**
   * Categorize sebagai PHP
   */
  async categorizeAsPHP(name, content, filePath) {
    const componentName = this.extractComponentName(name);
    
    // Extract PHP functions and classes
    const phpFunctions = this.extractPHPPatterns(content);
    
    this.registry.tags.php.set(componentName, {
      name: componentName,
      content,
      filePath,
      functions: phpFunctions.functions,
      classes: phpFunctions.classes
    });
  }

  /**
   * Categorize sebagai Database
   */
  async categorizeAsDB(name, content, filePath) {
    const componentName = this.extractComponentName(name);
    
    // Parse database structure
    const dbStructure = this.parseDBContent(content, path.extname(name));
    
    this.registry.tags.db.set(componentName, {
      name: componentName,
      content,
      filePath,
      structure: dbStructure
    });
  }

  /**
   * Extract component name from filename
   */
  extractComponentName(filename) {
    return path.basename(filename, path.extname(filename));
  }

  /**
   * Extract functions from JS content
   */
  extractFunctions(content) {
    const functions = [];
    
    // Match function declarations
    const funcRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\([^)]*\)/g;
    let match;
    
    while ((match = funcRegex.exec(content)) !== null) {
      functions.push({
        name: match[1],
        type: 'function'
      });
    }

    // Match arrow functions assigned to variables
    const arrowRegex = /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>/g;
    
    while ((match = arrowRegex.exec(content)) !== null) {
      functions.push({
        name: match[1],
        type: 'arrow'
      });
    }

    // Match class methods
    const methodRegex = /(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{/g;
    
    while ((match = methodRegex.exec(content)) !== null) {
      const name = match[1];
      if (!['if', 'for', 'while', 'switch', 'catch'].includes(name)) {
        functions.push({
          name: name,
          type: 'method'
        });
      }
    }

    return functions;
  }

  /**
   * Extract classes from JS content
   */
  extractClasses(content) {
    const classes = [];
    const classRegex = /(?:export\s+)?class\s+(\w+)(?:\s+extends\s+(\w+))?/g;
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push({
        name: match[1],
        extends: match[2] || null,
        type: 'class'
      });
    }
    
    return classes;
  }

  /**
   * Extract CSS rules
   */
  extractCSSRules(content) {
    const selectors = [];
    const selectorRegex = /([.#]?[\w-]+)\s*\{/g;
    let match;
    
    while ((match = selectorRegex.exec(content)) !== null) {
      selectors.push(match[1]);
    }
    
    return {
      selectors: [...new Set(selectors)],
      rulesCount: selectors.length
    };
  }

  /**
   * Extract HTML tags
   */
  extractHTMLTags(content) {
    const tags = [];
    const tagRegex = /<(\w+)(?:\s+[^>]*)?>/g;
    let match;
    
    while ((match = tagRegex.exec(content)) !== null) {
      tags.push(match[1]);
    }
    
    return [...new Set(tags)];
  }

  /**
   * Extract PHP patterns
   */
  extractPHPPatterns(content) {
    const functions = [];
    const classes = [];
    
    // PHP functions
    const funcRegex = /function\s+(\w+)\s*\(/g;
    let match;
    
    while ((match = funcRegex.exec(content)) !== null) {
      functions.push(match[1]);
    }
    
    // PHP classes
    const classRegex = /class\s+(\w+)/g;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push(match[1]);
    }
    
    return { functions, classes };
  }

  /**
   * Parse database content
   */
  parseDBContent(content, ext) {
    if (ext === '.json') {
      try {
        const data = JSON.parse(content);
        return {
          type: 'json',
          keys: Object.keys(data),
          size: Object.keys(data).length
        };
      } catch (e) {
        return { type: 'json', error: 'Invalid JSON' };
      }
    }
    
    return {
      type: ext,
      raw: content.substring(0, 500) + '...'
    };
  }

  /**
   * Setup auto-loader untuk deteksi file baru
   */
  async setupAutoLoader() {
    this.log('⚙️ Setting up auto-loader...');
    
    // Scan interval untuk deteksi file baru
    this.scanInterval = setInterval(async () => {
      await this.checkForNewFiles();
    }, 5000); // Check setiap 5 detik

    this.log('✅ Auto-loader configured');
  }

  /**
   * Check untuk file baru
   */
  async checkForNewFiles() {
    for (const watchPath of this.config.watchPaths) {
      if (fs.existsSync(watchPath)) {
        const files = await this.scanDirectory(watchPath);
        
        for (const file of files) {
          if (!this.registry.files.has(file.path)) {
            this.log(`🆕 New file detected: ${file.name}`);
            await this.processFile(file);
            this.emit('fileAdded', file);
          }
        }
      }
    }
  }

  /**
   * Start file watcher dengan fs.watch
   */
  startFileWatcher() {
    this.log('👁️ Starting file watcher...');
    
    for (const watchPath of this.config.watchPaths) {
      if (fs.existsSync(watchPath)) {
        try {
          const watcher = fs.watch(watchPath, { recursive: true }, async (eventType, filename) => {
            if (filename) {
              const filePath = path.join(watchPath, filename);
              
              if (eventType === 'change' || eventType === 'rename') {
                this.log(`🔄 File changed: ${filename}`);
                
                // Cek apakah file masih ada
                if (fs.existsSync(filePath)) {
                  const ext = path.extname(filename).toLowerCase();
                  if (this.config.fileExtensions.includes(ext)) {
                    const stat = fs.statSync(filePath);
                    await this.processFile({
                      path: filePath,
                      name: filename,
                      ext: ext,
                      size: stat.size,
                      mtime: stat.mtime
                    });
                    this.emit('fileChanged', { path: filePath, eventType });
                  }
                } else {
                  // File deleted
                  this.registry.files.delete(filePath);
                  this.emit('fileRemoved', { path: filePath });
                }
              }
            }
          });
          
          this.watchers.push(watcher);
        } catch (error) {
          this.log(`Warning: Could not watch ${watchPath}: ${error.message}`, 'warn');
        }
      }
    }
    
    this.log('✅ File watcher active');
  }

  /**
   * Stop file watcher
   */
  stopFileWatcher() {
    this.watchers.forEach(watcher => watcher.close());
    this.watchers = [];
    
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
    
    this.log('⏹️ File watcher stopped');
  }

  /**
   * Get status sistem
   */
  getStatus() {
    return {
      name: this.name,
      version: this.version,
      initialized: this.initialized,
      registry: {
        files: this.registry.files.size,
        components: this.registry.components.size,
        functions: this.registry.functions.size,
        tags: {
          html: this.registry.tags.html.size,
          php: this.registry.tags.php.size,
          db: this.registry.tags.db.size,
          css: this.registry.tags.css.size,
          js: this.registry.tags.js.size
        }
      },
      storage: this.config.storage.getStats(),
      watchers: this.watchers.length,
      config: {
        watchPaths: this.config.watchPaths,
        autoReload: this.config.autoReload,
        debug: this.config.debug
      }
    };
  }

  /**
   * Render komponen sebagai tampilan
   */
  render(componentName, options = {}) {
    const component = this.registry.components.get(componentName) ||
                     this.registry.tags.js.get(componentName) ||
                     this.registry.tags.css.get(componentName);
    
    if (!component) {
      return { error: `Component '${componentName}' not found` };
    }

    return {
      name: component.name,
      type: component.type,
      content: component.content,
      rendered: true,
      timestamp: Date.now()
    };
  }

  /**
   * Execute function
   */
  execute(functionName, ...args) {
    const fn = this.registry.functions.get(functionName);
    
    if (!fn) {
      return { error: `Function '${functionName}' not found` };
    }

    // Note: Actual execution would require dynamic eval which is not recommended
    // This is a placeholder for the execution logic
    return {
      name: functionName,
      source: fn.source,
      type: fn.type,
      executed: false,
      message: 'Function found - execution requires secure context'
    };
  }

  /**
   * Get configuration
   */
  getConfig(key) {
    if (key) {
      return this.config[key];
    }
    return this.config;
  }

  /**
   * Update settings
   */
  updateSettings(settings) {
    Object.assign(this.config, settings);
    this.emit('settingsUpdated', settings);
    return { success: true, settings };
  }

  /**
   * Export semua data
   */
  exportData(format = 'json') {
    const data = this.getStatus();
    
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }
    
    return data;
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.stopFileWatcher();
    this.removeAllListeners();
    this.registry = {
      files: new Map(),
      components: new Map(),
      tags: {
        html: new Map(),
        php: new Map(),
        db: new Map(),
        css: new Map(),
        js: new Map()
      },
      functions: new Map(),
      configurations: new Map(),
      settings: new Map()
    };
    this.initialized = false;
    this.log('🧹 FungsiGlobal destroyed');
  }
}

// Export
export default FungsiGlobal;
export { FungsiGlobal };

// Auto-initialize jika dijalankan langsung
if (typeof process !== 'undefined' && process.argv[1]?.includes('fungsiglobal')) {
  const app = new FungsiGlobal({ debug: true });
  app.initialize()
    .then(() => {
      console.log('\n📊 Status:', JSON.stringify(app.getStatus(), null, 2));
    })
    .catch(console.error);
}

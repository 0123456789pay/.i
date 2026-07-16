/**
 * AutoLoader - Sistem Pemuatan Otomatis
 * Mendeteksi dan memuat file/folder baru secara otomatis
 */

import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

class AutoLoader extends EventEmitter {
  constructor(options = {}) {
    super();
    
    this.config = {
      watchPaths: options.watchPaths || ['/workspace'],
      extensions: options.extensions || ['.js', '.css', '.html', '.php', '.db', '.json'],
      ignorePatterns: options.ignorePatterns || [/node_modules/, /\.git/, /dist/, /build/],
      scanInterval: options.scanInterval || 5000,
      recursive: options.recursive !== false,
      debounceMs: options.debounceMs || 500
    };

    this.loadedFiles = new Map();
    this.pendingChanges = new Map();
    this.watchers = [];
    this.scanTimer = null;
    this.debounceTimers = new Map();
    this.active = false;

    this.log('🔄 AutoLoader constructed');
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [AutoLoader] ${message}`);
  }

  /**
   * Start auto-loading system
   */
  async start() {
    if (this.active) {
      this.log('⚠️ Already running');
      return;
    }

    this.log('🚀 Starting AutoLoader...');
    this.active = true;

    // Start file watchers
    await this.startWatchers();

    // Start periodic scan
    this.startPeriodicScan();

    this.emit('started');
    this.log('✅ AutoLoader started');
  }

  /**
   * Stop auto-loading system
   */
  stop() {
    this.log('⏹️ Stopping AutoLoader...');
    this.active = false;

    // Stop watchers
    this.stopWatchers();

    // Stop periodic scan
    if (this.scanTimer) {
      clearInterval(this.scanTimer);
      this.scanTimer = null;
    }

    // Clear debounce timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();

    this.emit('stopped');
    this.log('✅ AutoLoader stopped');
  }

  /**
   * Start file system watchers
   */
  async startWatchers() {
    for (const watchPath of this.config.watchPaths) {
      if (fs.existsSync(watchPath)) {
        try {
          const watcher = fs.watch(watchPath, { 
            recursive: this.config.recursive 
          }, (eventType, filename) => {
            if (filename) {
              this.handleFileChange(eventType, filename, watchPath);
            }
          });

          this.watchers.push({
            path: watchPath,
            watcher
          });

          this.log(`👁️ Watching: ${watchPath}`);
        } catch (error) {
          this.log(`⚠️ Cannot watch ${watchPath}: ${error.message}`, 'warn');
        }
      }
    }
  }

  /**
   * Stop all watchers
   */
  stopWatchers() {
    for (const { watcher } of this.watchers) {
      watcher.close();
    }
    this.watchers = [];
  }

  /**
   * Start periodic scanning
   */
  startPeriodicScan() {
    this.scanTimer = setInterval(async () => {
      await this.periodicScan();
    }, this.config.scanInterval);
  }

  /**
   * Periodic scan for new files
   */
  async periodicScan() {
    for (const watchPath of this.config.watchPaths) {
      if (fs.existsSync(watchPath)) {
        const files = await this.scanDirectory(watchPath);
        
        for (const file of files) {
          if (!this.loadedFiles.has(file.path)) {
            this.log(`🆕 Discovered: ${file.name}`);
            await this.loadFile(file);
          }
        }
      }
    }
  }

  /**
   * Handle file change event
   */
  handleFileChange(eventType, filename, basePath) {
    const filePath = path.join(basePath, filename);
    
    // Check if should ignore
    if (this.shouldIgnore(filePath)) {
      return;
    }

    // Check extension
    const ext = path.extname(filename).toLowerCase();
    if (!this.config.extensions.includes(ext)) {
      return;
    }

    // Debounce handling
    if (this.debounceTimers.has(filePath)) {
      clearTimeout(this.debounceTimers.get(filePath));
    }

    const timer = setTimeout(() => {
      this.processFileChange(eventType, filePath, filename);
      this.debounceTimers.delete(filePath);
    }, this.config.debounceMs);

    this.debounceTimers.set(filePath, timer);
  }

  /**
   * Process file change
   */
  async processFileChange(eventType, filePath, filename) {
    if (eventType === 'rename' || eventType === 'change') {
      // Check if file exists (might be deleted)
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          const ext = path.extname(filename).toLowerCase();
          
          if (this.loadedFiles.has(filePath)) {
            // Update existing
            this.log(`🔄 Updated: ${filename}`);
            await this.updateFile({
              path: filePath,
              name: filename,
              ext,
              size: stat.size,
              mtime: stat.mtime
            });
          } else {
            // Load new
            this.log(`📥 Loaded: ${filename}`);
            await this.loadFile({
              path: filePath,
              name: filename,
              ext,
              size: stat.size,
              mtime: stat.mtime
            });
          }
        }
      } else {
        // File deleted
        if (this.loadedFiles.has(filePath)) {
          this.log(`🗑️ Deleted: ${filename}`);
          this.unloadFile(filePath);
        }
      }
    }
  }

  /**
   * Scan directory recursively
   */
  async scanDirectory(dirPath, fileList = []) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (this.shouldIgnore(fullPath)) {
          continue;
        }

        if (entry.isDirectory()) {
          await this.scanDirectory(fullPath, fileList);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (this.config.extensions.includes(ext)) {
            fileList.push({
              path: fullPath,
              name: entry.name,
              ext,
              size: fs.statSync(fullPath).size,
              mtime: fs.statSync(fullPath).mtime
            });
          }
        }
      }
    } catch (error) {
      // Ignore errors
    }
    
    return fileList;
  }

  /**
   * Check if path should be ignored
   */
  shouldIgnore(filePath) {
    return this.config.ignorePatterns.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(filePath);
      }
      return filePath.includes(pattern);
    });
  }

  /**
   * Load a file
   */
  async loadFile(fileInfo) {
    try {
      const content = fs.readFileSync(fileInfo.path, 'utf8');
      
      const fileData = {
        ...fileInfo,
        content,
        loadedAt: Date.now(),
        type: this.getFileType(fileInfo.ext)
      };

      this.loadedFiles.set(fileInfo.path, fileData);
      
      this.emit('fileLoaded', fileData);
      
      return fileData;
    } catch (error) {
      this.log(`❌ Error loading ${fileInfo.name}: ${error.message}`, 'error');
      return null;
    }
  }

  /**
   * Update a file
   */
  async updateFile(fileInfo) {
    try {
      const content = fs.readFileSync(fileInfo.path, 'utf8');
      
      const existing = this.loadedFiles.get(fileInfo.path);
      const fileData = {
        ...fileInfo,
        content,
        loadedAt: Date.now(),
        previousVersion: existing,
        type: this.getFileType(fileInfo.ext)
      };

      this.loadedFiles.set(fileInfo.path, fileData);
      
      this.emit('fileUpdated', fileData);
      
      return fileData;
    } catch (error) {
      this.log(`❌ Error updating ${fileInfo.name}: ${error.message}`, 'error');
      return null;
    }
  }

  /**
   * Unload a file
   */
  unloadFile(filePath) {
    const fileData = this.loadedFiles.get(filePath);
    this.loadedFiles.delete(filePath);
    
    if (fileData) {
      this.emit('fileUnloaded', fileData);
    }
  }

  /**
   * Get file type from extension
   */
  getFileType(ext) {
    const typeMap = {
      '.js': 'javascript',
      '.css': 'stylesheet',
      '.html': 'html',
      '.php': 'php',
      '.db': 'database',
      '.json': 'json'
    };
    
    return typeMap[ext] || 'unknown';
  }

  /**
   * Get all loaded files
   */
  getLoadedFiles() {
    return Array.from(this.loadedFiles.values());
  }

  /**
   * Get loaded files by type
   */
  getByType(type) {
    return this.getLoadedFiles().filter(file => file.type === type);
  }

  /**
   * Get statistics
   */
  getStats() {
    const stats = {
      totalFiles: this.loadedFiles.size,
      byType: {},
      watchers: this.watchers.length,
      active: this.active
    };

    for (const file of this.loadedFiles.values()) {
      if (!stats.byType[file.type]) {
        stats.byType[file.type] = 0;
      }
      stats.byType[file.type]++;
    }

    return stats;
  }

  /**
   * Find files by pattern
   */
  find(pattern) {
    const regex = new RegExp(pattern, 'i');
    return this.getLoadedFiles().filter(file => 
      regex.test(file.name) || regex.test(file.path)
    );
  }

  /**
   * Clear all loaded files
   */
  clear() {
    this.loadedFiles.clear();
    this.emit('cleared');
  }
}

export default AutoLoader;
export { AutoLoader };

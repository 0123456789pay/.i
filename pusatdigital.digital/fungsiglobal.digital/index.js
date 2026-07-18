/**
 * FungsiGlobal - Main Index
 * Entry point untuk sistem FungsiGlobal
 */

// Core
export { default as FungsiGlobal } from './core/FungsiGlobal.js';
export { FungsiGlobal as FG } from './core/FungsiGlobal.js';

// Tags
export { default as TagHTML } from './tags/TagHTML.js';
export { default as TagPHP } from './tags/TagPHP.js';
export { default as TagDB } from './tags/TagDB.js';

// Auto-loader
export { default as AutoLoader } from './auto-loader/AutoLoader.js';

// Config
export { default as fungsiGlobalConfig } from './config/index.js';
export { fungsiGlobalConfig as config } from './config/index.js';

// Utils
export { default as Helpers, formatFileSize, formatDate, deepClone } from './utils/helpers.js';

/**
 * Quick initialization helper
 */
export async function createFungsiGlobal(options = {}) {
  const { FungsiGlobal } = await import('./core/FungsiGlobal.js');
  const app = new FungsiGlobal(options);
  await app.initialize();
  return app;
}

/**
 * Create individual tag handlers
 */
export function createTagHandlers() {
  return {
    html: new (await import('./tags/TagHTML.js')).default(),
    php: new (await import('./tags/TagPHP.js')).default(),
    db: new (await import('./tags/TagDB.js')).default()
  };
}

/**
 * Create auto-loader instance
 */
export function createAutoLoader(options = {}) {
  return new (await import('./auto-loader/AutoLoader.js')).default(options);
}

// Default export
export default {
  FungsiGlobal: null, // Will be set on import
  TagHTML: null,
  TagPHP: null,
  TagDB: null,
  AutoLoader: null,
  config: null,
  
  async init() {
    this.FungsiGlobal = (await import('./core/FungsiGlobal.js')).FungsiGlobal;
    this.TagHTML = (await import('./tags/TagHTML.js')).default;
    this.TagPHP = (await import('./tags/TagPHP.js')).default;
    this.TagDB = (await import('./tags/TagDB.js')).default;
    this.AutoLoader = (await import('./auto-loader/AutoLoader.js')).default;
    this.config = (await import('./config/index.js')).default;
    
    return this;
  }
};

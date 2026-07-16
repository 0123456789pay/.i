/**
 * FungsiGlobal Configuration
 * Konfigurasi utama untuk sistem FungsiGlobal
 */

export const fungsiGlobalConfig = {
  // Nama dan versi
  name: 'FungsiGlobal',
  version: '1.0.0',
  
  // Paths yang di-watch
  watchPaths: [
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
    '/workspace/southeastapp/config',
    '/workspace'
  ],

  // Ekstensi file yang didukung
  fileExtensions: [
    '.js',   // JavaScript
    '.css',  // Stylesheet
    '.html', // HTML
    '.php',  // PHP
    '.db',   // Database
    '.json', // JSON data
    '.sql',  // SQL queries
    '.ts',   // TypeScript
    '.jsx',  // React JSX
    '.vue',  // Vue components
    '.svelte' // Svelte components
  ],

  // Tag types yang didukung
  tagTypes: {
    html: {
      enabled: true,
      extractTags: true,
      extractAttributes: true,
      validateSyntax: true
    },
    php: {
      enabled: true,
      extractFunctions: true,
      extractClasses: true,
      extractMethods: true,
      extractVariables: true
    },
    db: {
      enabled: true,
      parseJSON: true,
      parseSQL: true,
      createTables: true,
      executeQueries: true
    },
    css: {
      enabled: true,
      extractSelectors: true,
      extractRules: true,
      validateSyntax: true
    },
    js: {
      enabled: true,
      extractFunctions: true,
      extractClasses: true,
      extractExports: true
    }
  },

  // Auto-loader settings
  autoLoader: {
    enabled: true,
    scanInterval: 5000,        // Scan setiap 5 detik
    debounceMs: 500,           // Debounce 500ms
    recursive: true,           // Scan rekursif
    ignorePatterns: [
      /node_modules/,
      /\.git/,
      /dist/,
      /build/,
      /\.tmp/,
      /\.cache/
    ]
  },

  // Storage settings
  storage: {
    type: 'hybrid',
    localPath: '/workspace/fungsiglobal/storage',
    cloudSync: false,
    compression: 'adaptive',
    deduplication: true,
    maxFileSize: 'unlimited',
    chunkSize: 1024 * 1024 * 10  // 10MB chunks
  },

  // Rendering options
  rendering: {
    enablePlaceholders: true,
    placeholderPattern: /\{\{(\w+)\}\}/g,
    enableTemplating: true,
    escapeHTML: true
  },

  // Event system
  events: {
    emitOnFileLoad: true,
    emitOnFileChange: true,
    emitOnFileUnload: true,
    emitOnComponentRegister: true
  },

  // Debug mode
  debug: {
    enabled: false,
    logLevel: 'info',  // debug, info, warn, error
    logToFile: false,
    logFilePath: '/workspace/fungsiglobal/logs/debug.log'
  },

  // Performance settings
  performance: {
    maxCachedFiles: 1000,
    cacheExpirationMs: 3600000,  // 1 hour
    enableOptimization: true,
    minifyOutput: false
  },

  // Integration dengan SoutheastApp
  southeastApp: {
    enabled: true,
    importComponents: true,
    importServices: true,
    importUtils: true,
    syncMode: 'bidirectional'
  }
};

// Export default
export default fungsiGlobalConfig;

/**
 * IHBSF (Iconer Hierarchical dasar sistem Framework) pengaturan
 * Package lengkap sistem tampilan, konfigurasi, dan sistem perangkat untuk .iconer
 */

export const IHBSF_CONFIG = {
  version: '1.0.0',
  name: 'IHBSF Iconer System',
  description: 'Sistem paket lengkap untuk file .iconer',
  
  // Sistem Tampilan
  display: {
    theme: {
      default: 'dark',
      modes: ['light', 'dark', 'auto', 'custom'],
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        accent: '#FF2D55',
        background: '#1C1C1E',
        surface: '#2C2C2E',
        text: '#FFFFFF',
        textSecondary: '#8E8E93'
      },
      typography: {
        fontFamily: 'System, -apple-system, BlinkMacSystemFont, sans-serif',
        sizes: {
          xs: '10px',
          sm: '12px',
          md: '14px',
          lg: '16px',
          xl: '20px',
          '2xl': '24px',
          '3xl': '32px'
        }
      },
      animations: {
        duration: {
          fast: '150ms',
          normal: '300ms',
          slow: '500ms'
        },
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    layout: {
      grid: {
        columns: 12,
        gutter: '16px',
        margins: {
          mobile: '16px',
          tablet: '24px',
          desktop: '32px'
        }
      },
      breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
        widescreen: '1440px'
      }
    }
  },

  // Konfigurasi Sistem
  system: {
    device: {
      supported: ['mobile', 'tablet', 'desktop', 'wearable', 'tv', 'automotive'],
      orientations: ['portrait', 'landscape'],
      densities: [1, 1.5, 2, 2.5, 3, 3.5, 4]
    },
    performance: {
      lazyLoading: true,
      caching: {
        enabled: true,
        strategy: 'stale-while-revalidate',
        maxAge: 3600000
      },
      optimization: {
        imageCompression: true,
        codeSplitting: true,
        treeShaking: true
      }
    },
    security: {
      encryption: 'AES-256',
      validation: true,
      sandbox: true
    }
  },

  // Format .iconer
  iconerFormat: {
    extension: '.iconer',
    mimeType: 'application/x-iconer-package',
    structure: {
      manifest: 'manifest.json',
      metadata: 'metadata.json',
      assets: 'assets/',
      configurations: 'config/',
      themes: 'themes/',
      layouts: 'layouts/',
      components: 'components/'
    },
    compression: {
      algorithm: 'gzip',
      level: 6
    },
    encoding: 'UTF-8',
    versioning: {
      scheme: 'semver',
      current: '1.0.0'
    }
  },

  // Fitur dan Menu
  features: {
    core: [
      'icon-editor',
      'vector-tools',
      'raster-tools',
      'animation-builder',
      'export-manager',
      'template-library',
      'asset-manager',
      'collaboration',
      'version-control',
      'cloud-sync'
    ],
    advanced: [
      'ai-assistant',
      'batch-processing',
      'smart-resize',
      'color-harmony',
      'accessibility-checker',
      'performance-analyzer',
      'seo-optimizer',
      'analytics-dashboard'
    ],
    integration: [
      'api-connector',
      'plugin-system',
      'webhook-manager',
      'third-party-sync',
      'social-sharing',
      'cdn-integration'
    ]
  },

  // Menu Structure
  menus: {
    main: {
      file: ['new', 'open', 'save', 'save-as', 'export', 'import', 'print', 'close'],
      edit: ['undo', 'redo', 'cut', 'copy', 'paste', 'select-all', 'find', 'replace'],
      view: ['zoom-in', 'zoom-out', 'fit-screen', 'actual-size', 'grid', 'guides', 'rulers'],
      insert: ['shape', 'text', 'image', 'icon', 'symbol', 'component', 'layer'],
      format: ['align', 'distribute', 'group', 'ungroup', 'lock', 'unlock', 'hide', 'show'],
      tools: ['select', 'pen', 'brush', 'eraser', 'fill', 'gradient', 'pattern', 'text-tool'],
      window: ['layers', 'properties', 'assets', 'library', 'console', 'settings'],
      help: ['documentation', 'tutorials', 'shortcuts', 'about', 'support', 'feedback']
    },
    context: {
      canvas: ['zoom', 'pan', 'grid-settings', 'guide-settings', 'background'],
      layer: ['duplicate', 'delete', 'rename', 'merge', 'flatten', 'effects'],
      object: ['transform', 'style', 'effects', 'animation', 'interaction', 'export']
    }
  },

  // Plugin sistem
  plugins: {
    enabled: true,
    directory: './plugins',
    autoLoad: true,
    whitelist: [],
    blacklist: []
  },

  // API pengaturan
  api: {
    baseUrl: 'https://api.iconer.com/v1',
    timeout: 30000,
    retries: 3,
    endpoints: {
      auth: '/auth',
      users: '/users',
      projects: '/projects',
      assets: '/assets',
      exports: '/exports',
      sync: '/sync'
    }
  },

  // penyimpanan
  storage: {
    local: {
      enabled: true,
      path: './storage/local',
      maxSize: '5GB'
    },
    cloud: {
      enabled: true,
      provider: 'iconer-cloud',
      syncInterval: 300000
    }
  },

  // Localization
  i18n: {
    defaultLocale: 'id-ID',
    supportedLocales: ['id-ID', 'en-US', 'zh-CN', 'ja-JP', 'ko-KR', 'ar-SA'],
    fallbackLocale: 'en-US'
  }
};

export default IHBSF_CONFIG;

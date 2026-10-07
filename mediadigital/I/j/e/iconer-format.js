/**
 * Iconer Package Format Specification
 * Format berkas .iconer - Package lengkap untuk ikon dan aset desain
 */

export const ICONER_FORMAT = {
  version: '1.0.0',
  extension: '.iconer',
  mimeType: 'application/x-iconer-package',
  
  // Struktur package .iconer
  structure: {
    root: {
      manifest: 'manifest.json',      // Metadata utama package
      metadata: 'metadata.json',      // Informasi detail package
      preview: 'preview.png',         // Preview thumbnail
      index: 'index.json'             // indeks struktur package
    },
    directories: {
      assets: 'assets/',              // Semua aset gambar
      vectors: 'assets/vectors/',     // berkas vektor (SVG, AI, EPS)
      rasters: 'assets/rasters/',     // berkas raster (PNG, JPG, WebP)
      fonts: 'assets/fonts/',         // huruf yang digunakan
      config: 'config/',              // Konfigurasi package
      themes: 'themes/',              // Tema warna dan gaya
      layouts: 'layouts/',            // tata letak dan komposisi
      components: 'components/',      // Komponen reusable
      animations: 'animations/',      // berkas animasi
      exports: 'exports/',            // Hasil export
      backups: 'backups/',            // Backup otomatis
      plugins: 'plugins/',            // Plugin khusus
      scripts: 'scripts/'             // skrip suai
    }
  },

  // Schema manifest.json
  manifestSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['name', 'version', 'author', 'createdAt'],
    properties: {
      name: { type: 'string', description: 'Nama package' },
      version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$', description: 'Versi dalam format semver' },
      description: { type: 'string', description: 'Deskripsi package' },
      author: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          url: { type: 'string', format: 'uri' }
        }
      },
      license: { type: 'string', description: 'License identifier (MIT, Apache-2.0, etc)' },
      keywords: { type: 'array', items: { type: 'string' } },
      category: { type: 'string', enum: ['icons', 'illustrations', 'patterns', 'templates', 'components', 'fonts', 'mixed'] },
      tags: { type: 'array', items: { type: 'string' } },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      iconerVersion: { type: 'string', description: 'Versi Iconer yang digunakan' },
      dependencies: {
        type: 'object',
        additionalProperties: { type: 'string' }
      },
      devDependencies: {
        type: 'object',
        additionalProperties: { type: 'string' }
      },
      scripts: {
        type: 'object',
        additionalProperties: { type: 'string' }
      },
      configuration: {
        type: 'object',
        properties: {
          theme: { type: 'string' },
          colorspace: { type: 'string', enum: ['sRGB', 'Adobe RGB', 'Display P3', 'CMYK'] },
          units: { type: 'string', enum: ['px', 'pt', 'mm', 'cm', 'in'] },
          grid: {
            type: 'object',
            properties: {
              size: { type: 'number' },
              subdivisions: { type: 'number' },
              color: { type: 'string' },
              visible: { type: 'boolean' }
            }
          }
        }
      }
    }
  },

  // Schema metadata.json
  metadataSchema: {
    type: 'object',
    properties: {
      dimensions: {
        type: 'object',
        properties: {
          width: { type: 'number' },
          height: { type: 'number' },
          aspectRatio: { type: 'string' }
        }
      },
      layers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['vector', 'raster', 'text', 'group', 'adjustment', 'smart'] },
            visible: { type: 'boolean' },
            locked: { type: 'boolean' },
            opacity: { type: 'number', minimum: 0, maximum: 1 },
            blendMode: { type: 'string' },
            effects: { type: 'array' },
            mask: { type: 'object' }
          }
        }
      },
      components: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            category: { type: 'string' },
            variants: { type: 'array' },
            states: { type: 'array' }
          }
        }
      },
      colors: {
        type: 'object',
        properties: {
          palette: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'string' },
                space: { type: 'string' }
              }
            }
          },
          gradients: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                type: { type: 'string', enum: ['linear', 'radial', 'angular', 'diamond'] },
                stops: { type: 'array' }
              }
            }
          }
        }
      },
      typography: {
        type: 'object',
        properties: {
          fonts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                family: { type: 'string' },
                variant: { type: 'string' },
                weight: { type: 'number' },
                style: { type: 'string' }
              }
            }
          },
          styles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                fontSize: { type: 'string' },
                lineHeight: { type: 'string' },
                letterSpacing: { type: 'string' }
              }
            }
          }
        }
      },
      exports: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            format: { type: 'string' },
            scale: { type: 'string' },
            suffix: { type: 'string' },
            prefix: { type: 'string' }
          }
        }
      },
      statistics: {
        type: 'object',
        properties: {
          totalLayers: { type: 'number' },
          totalComponents: { type: 'number' },
          totalAssets: { type: 'number' },
          fileSize: { type: 'number' },
          lastModified: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // Compression pengaturan
  compression: {
    algorithm: 'gzip',
    alternatives: ['brotli', 'lzma', 'deflate'],
    level: {
      min: 1,
      max: 9,
      default: 6
    },
    options: {
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: 0
    }
  },

  // Encoding
  encoding: {
    text: 'UTF-8',
    binary: 'base64',
    json: {
      spaces: 2,
      sortKeys: false
    }
  },

  // Validation rules
  validation: {
    required: ['manifest.json', 'metadata.json'],
    maxSize: {
      value: 500,
      unit: 'MB'
    },
    maxLayers: 10000,
    maxComponents: 5000,
    supportedFormats: {
      vector: ['svg', 'ai', 'eps', 'pdf', 'sketch', 'fig'],
      raster: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'tiff', 'bmp', 'ico'],
      font: ['ttf', 'otf', 'woff', 'woff2'],
      animation: ['gif', 'apng', 'lottie', 'svg']
    }
  },

  // keamanan
  security: {
    encryption: {
      enabled: true,
      algorithm: 'AES-256-GCM',
      keyDerivation: 'PBKDF2'
    },
    signature: {
      enabled: true,
      algorithm: 'RSA-SHA256'
    },
    sandbox: {
      enabled: true,
      permissions: ['read', 'write', 'execute']
    }
  },

  // versi compatibility
  compatibility: {
    minimumVersion: '0.9.0',
    currentVersion: '1.0.0',
    breakingChanges: [],
    deprecatedFeatures: [],
    migrationGuide: 'https://docs.iconer.com/migration'
  },

  // Export presets
  exportPresets: {
    web: {
      formats: ['png', 'svg', 'webp'],
      scales: ['1x', '2x', '3x'],
      optimization: true
    },
    mobile: {
      formats: ['png', 'svg'],
      scales: ['1x', '2x', '3x'],
      optimization: true
    },
    print: {
      formats: ['pdf', 'tiff', 'eps'],
      resolution: 300,
      colorSpace: 'CMYK'
    },
    social: {
      formats: ['png', 'jpg'],
      sizes: {
        facebook: { width: 1200, height: 630 },
        twitter: { width: 1200, height: 675 },
        instagram: { width: 1080, height: 1080 },
        linkedin: { width: 1200, height: 627 }
      }
    }
  },

  // Template categories
  templateCategories: [
    'social-media',
    'mobile-app',
    'web-design',
    'presentation',
    'print',
    'branding',
    'marketing',
    'ecommerce',
    'ui-kit',
    'icon-set',
    'illustration',
    'infographic',
    'dashboard',
    'landing-page',
    'email-template'
  ],

  // Component jenis-jenis
  componentTypes: [
    'button',
    'input',
    'card',
    'modal',
    'navigation',
    'form',
    'table',
    'list',
    'grid',
    'chart',
    'widget',
    'badge',
    'avatar',
    'tooltip',
    'dropdown',
    'tabs',
    'accordion',
    'breadcrumb',
    'pagination',
    'progress',
    'slider',
    'toggle',
    'checkbox',
    'radio',
    'select',
    'datepicker',
    'autocomplete',
    'notification',
    'toast',
    'alert'
  ]
};

export default ICONER_FORMAT;

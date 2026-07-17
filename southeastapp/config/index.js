/**
 * SoutheastApp Configuration System
 * Sistem konfigurasi unik untuk wilayah Asia Tenggara
 */

export const southeastConfig = {
  regions: ['ID', 'MY', 'SG', 'TH', 'PH', 'VN', 'MM', 'KH', 'LA', 'BN'],
  
  // Adaptive Component Loading
  componentPattern: {
    firstChar: 'UPPERCASE',
    fifthChar: 'UPPERCASE',
    enabled: true
  },
  
  // Unlimited Storage Configuration
  storage: {
    type: 'hybrid',
    localPath: '/workspace/southeastapp/storage',
    cloudSync: true,
    compression: 'adaptive',
    deduplication: true,
    maxFileSize: 'unlimited',
    chunkSize: 1024 * 1024 * 10 // 10MB chunks
  },
  
  // Regional Settings
  locale: {
    default: 'en-US',
    supported: ['id-ID', 'ms-MY', 'th-TH', 'vi-VN', 'tl-PH', 'my-MM', 'km-KH', 'lo-LA']
  },
  
  // Unique System Features
  features: {
    microservicesHybrid: true,
    localFirstDesign: true,
    adaptiveComponents: true,
    multiRegionSupport: true,
    offlineFirst: true,
    syncEngine: 'bidirectional'
  }
};

export default southeastConfig;

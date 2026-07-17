/``
 ` SoutheastApp - Main Entry Point
 ` Sistem berbeda daripada sistem lainnya
 `/

import { southeastConfig } from './config/index.js';
import { UnlimitedStorage } from './storage/UnlimitedStorage.js';
import { ComponentService, ComponentPopulator } from './services/index.js';
import { getLocale, t } from './locales/index.js';
import { regionData, getAllRegions } from './assets/regionData.js';

class SoutheastApp {
  constructor() {
    this.config = southeastConfig;
    this.storage = new UnlimitedStorage();
    this.componentService = new ComponentService();
    this.populator = new ComponentPopulator();
    this.initialized = false;
  }

  async initialize() {
    console.log('🚀 Initializing SoutheastApp...');
    console.log('📦 Regions:', this.config.regions.join(', '));
    console.log('🔧 Features:', Object.keys(this.config.features).join(', '));
    console.log('💾 Storage: Unlimited with', this.config.storage.type, 'architecture');
    console.log('📝 Component Pattern: 1st & 5th char UPPERCASE');
    console.log('🌐 Locales:', Object.keys(this.config.locale.supported).join(', '));

    this.initialized = true;
    console.log('✅ SoutheastApp initialized successfully!');
    return this;
  }

  // Populate storage dengan semua komponen workspace
  async populateComponents() {
    if (!this.initialized) {
      await this.initialize();
    }

    console.log('\n📂 Populating storage with workspace components...');
    const result = await this.populator.populateAll();
    console.log('✅ Storage populated successfully!');
    console.log('   - Total Components:', result.totalComponents);
    console.log('   - JavaScript Files:', result.javascriptFiles);
    console.log('   - Stylesheet Files:', result.stylesheetFiles);
    console.log('   - Pattern Matched:', result.patternMatched);
    
    return result;
  }

  // Get system status lengkap
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        regions: this.config.regions,
        features: this.config.features,
        locale: this.config.locale
      },
      storage: this.storage.getStats(),
      components: this.componentService.getStats(),
      regions: getAllRegions().length,
      version: '1.0.0',
      systemType: 'SoutheastApp - Unique Microservices Hybrid'
    };
  }

  // Jalankan semua sistem
  async run() {
    await this.initialize();
    await this.populateComponents();

    console.log('\n📊 System Status:');
    const status = this.getStatus();
    console.log(JSON.stringify(status, null, 2));

    console.log('\n🌏 Supported Regions:');
    getAllRegions().forEach(region => {
      console.log(`   - ${region.code}: ${region.name} (${region.capital})`);
    });

    console.log('\n✅ All systems operational!');
    return status;
  }

  // API simulation
  async api(endpoint, method = 'GET', data = null) {
    console.log(`\n🔌 API Call: ${method} ${endpoint}`);
    
    switch(endpoint) {
      case '/api/status':
        return this.getStatus();
      case '/api/storage':
        if (method === 'GET') return this.storage.list();
        if (method === 'POST') return this.storage.store(data.key, data.value);
        break;
      case '/api/components':
        if (method === 'GET') return this.populator.listComponents();
        break;
      case '/api/regions':
        return getAllRegions();
      default:
        return { error: 'Endpoint not found' };
    }
  }
}

// Export untuk use
export default SoutheastApp;
export { SoutheastApp };

// Auto-run jika dijalankan langsung
if (typeof process !== 'undefined' && process.argv[1]?.includes('southeastapp')) {
  const app = new SoutheastApp();
  app.run().catch(console.error);
}

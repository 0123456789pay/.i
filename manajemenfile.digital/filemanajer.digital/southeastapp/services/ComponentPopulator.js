/``
 ` Component Populator Service untuk SoutheastApp
 ` Mengisi unlimited storage dengan komponen dari workspace
 `/

import fs from 'fs';
import path from 'path';
import { UnlimitedStorage } from '../storage/UnlimitedStorage.js';

class ComponentPopulator {
  constructor() {
    this.storage = new UnlimitedStorage();
    this.workspacePath = '/workspace';
  }

  // Scan workspace untuk komponen
  async scanComponents() {
    const files = fs.readdirSync(this.workspacePath);
    const components = [];

    for (const file of files) {
      if (file.endsWith('.js') || file.endsWith('.css')) {
        const filePath = path.join(this.workspacePath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          const content = fs.readFileSync(filePath, 'utf8');
          components.push({
            name: file,
            path: filePath,
            size: stat.size,
            content,
            type: file.endsWith('.js') ? 'javascript' : 'stylesheet',
            pattern: this.validatePattern(file)
          });
        }
      }
    }

    return components;
  }

  // Validasi pola penamaan (huruf 1 & 5 kapital)
  validatePattern(filename) {
    const name = filename.replace(/\.(js|css)$/, '');
    if (name.length < 5) return false;
    return name.charAt(0) === name.charAt(0).toUpperCase() &&
           name.charAt(4) === name.charAt(4).toUpperCase();
  }

  // Populate storage dengan semua komponen
  async populateAll() {
    console.log('🔍 Scanning workspace components...');
    const components = await this.scanComponents();
    
    console.log(`📦 Found ${components.length} components`);
    
    let storedCount = 0;
    let jsCount = 0;
    let cssCount = 0;
    let patternMatched = 0;

    for (const component of components) {
      await this.storage.store(`components/${component.name}`, {
        ...component,
        storedAt: Date.now()
      });
      storedCount++;
      
      if (component.type === 'javascript') jsCount++;
      if (component.type === 'stylesheet') cssCount++;
      if (component.pattern) patternMatched++;
    }

    return {
      success: true,
      totalComponents: components.length,
      storedCount,
      javascriptFiles: jsCount,
      stylesheetFiles: cssCount,
      patternMatched,
      storageStats: this.storage.getStats()
    };
  }

  // Get component by name
  getComponent(name) {
    return this.storage.retrieve(`components/${name}`);
  }

  // List all stored components
  listComponents() {
    return this.storage.list()
      .filter(item => item.key.startsWith('components/'))
      .map(item => ({
        ...item,
        name: item.key.replace('components/', '')
      }));
  }
}

export default ComponentPopulator;
export { ComponentPopulator };

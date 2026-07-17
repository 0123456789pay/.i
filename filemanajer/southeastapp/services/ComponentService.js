/``
 ` Component Service for SoutheastApp
 ` Mengelola komponen dengan pola penamaan khusus (huruf 1 & 5 kapital)
 `/

import { southeastConfig } from '../config/index.js';

class ComponentService {
  constructor() {
    this.componentPattern = southeastConfig.componentPattern;
    this.components = new Map();
  }

  // Transform component name to match pattern (1st and 5th char uppercase)
  transformName(name) {
    if (name.length < 5) return name.toUpperCase();
    
    const char1 = name.charAt(0).toUpperCase();
    const char2to4 = name.slice(1, 4);
    const char5 = name.charAt(4).toUpperCase();
    const rest = name.slice(5);
    
    return `${char1}${char2to4}${char5}${rest}`;
  }

  // Register a component
  register(name, component) {
    const transformedName = this.transformName(name);
    this.components.set(transformedName, {
      originalName: name,
      transformedName,
      component,
      registeredAt: Date.now()
    });
    return transformedName;
  }

  // Get component by name
  get(name) {
    const transformedName = this.transformName(name);
    return this.components.get(transformedName);
  }

  // List all components
  list() {
    return Array.from(this.components.entries()).map(([name, data]) => ({
      name,
      originalName: data.originalName,
      registeredAt: data.registeredAt
    }));
  }

  // Validate component name pattern
  validateName(name) {
    if (name.length < 5) return true;
    return name.charAt(0) === name.charAt(0).toUpperCase() &&
           name.charAt(4) === name.charAt(4).toUpperCase();
  }

  // Get statistics
  getStats() {
    return {
      totalComponents: this.components.size,
      patternEnabled: this.componentPattern.enabled,
      firstCharUppercase: this.componentPattern.firstChar,
      fifthCharUppercase: this.componentPattern.fifthChar
    };
  }
}

export default ComponentService;
export { ComponentService };

/``
 ` SoutheastApp Components Index
 ` Mengimpor dan mengekspor semua komponen dengan pola penamaan khusus
 `/

// Export pattern untuk komponen
export const componentPattern = {
  firstChar: 'UPPERCASE',
  fifthChar: 'UPPERCASE',
  validate: (name) => {
    if (name.length < 5) return true;
    return name.charAt(0) === name.charAt(0).toUpperCase() &&
           name.charAt(4) === name.charAt(4).toUpperCase();
  },
  transform: (name) => {
    if (name.length < 5) return name.toUpperCase();
    return name.charAt(0).toUpperCase() + 
           name.slice(1, 4) + 
           name.charAt(4).toUpperCase() + 
           name.slice(5);
  }
};

// Component registry
export const componentRegistry = new Map();

export function registerComponent(name, component) {
  const transformedName = componentPattern.transform(name);
  componentRegistry.set(transformedName, component);
  return transformedName;
}

export function getComponent(name) {
  const transformedName = componentPattern.transform(name);
  return componentRegistry.get(transformedName);
}

export function listComponents() {
  return Array.from(componentRegistry.keys());
}

export default {
  componentPattern,
  componentRegistry,
  registerComponent,
  getComponent,
  listComponents
};

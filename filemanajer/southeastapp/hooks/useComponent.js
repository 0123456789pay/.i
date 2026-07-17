/**
 * Custom Hook untuk Component Management
 * useComponent - Hook untuk mengelola komponen dengan pola penamaan khusus
 */

import { componentRegistry, getComponent, registerComponent } from '../components/index.js';

export function useComponent(name) {
  const transformedName = name.charAt(0).toUpperCase() + 
                          name.slice(1, 4) + 
                          name.charAt(4).toUpperCase() + 
                          name.slice(5);
  
  const component = getComponent(transformedName);
  
  return {
    name: transformedName,
    component,
    registered: component !== undefined,
    registry: componentRegistry
  };
}

export function useComponentRegistry() {
  return {
    register: registerComponent,
    get: getComponent,
    list: () => Array.from(componentRegistry.keys()),
    size: componentRegistry.size
  };
}

export default useComponent;

/**
 * TagPHP - Sistem Tag PHP Otomatis
 * Mengelola dan menganalisis kode PHP dari komponen yang terdeteksi
 */

class TagPHP {
  constructor() {
    this.phpFiles = new Map();
    this.functions = new Map();
    this.classes = new Map();
    this.methods = new Map();
  }

  /**
   * Register file PHP
   */
  register(name, content, options = {}) {
    const phpInfo = {
      name,
      content,
      ...options,
      registeredAt: Date.now()
    };

    this.phpFiles.set(name, phpInfo);

    // Extract PHP elements
    phpInfo.extracted = this.extractAll(content);

    return phpInfo;
  }

  /**
   * Extract semua elemen PHP
   */
  extractAll(content) {
    return {
      functions: this.extractFunctions(content),
      classes: this.extractClasses(content),
      methods: this.extractMethods(content),
      namespaces: this.extractNamespaces(content),
      uses: this.extractUses(content),
      constants: this.extractConstants(content),
      variables: this.extractVariables(content)
    };
  }

  /**
   * Extract functions
   */
  extractFunctions(content) {
    const functions = [];
    const regex = /(?:public\s+|private\s+|protected\s+)?(?:static\s+)?function\s+(\w+)\s*\(([^)]*)\)(?:\s*:\s*(\w+))?/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      functions.push({
        name: match[1],
        parameters: this.parseParameters(match[2]),
        returnType: match[3] || null,
        visibility: this.getVisibility(content.substring(0, match.index))
      });
    }

    return functions;
  }

  /**
   * Extract classes
   */
  extractClasses(content) {
    const classes = [];
    const regex = /(?:abstract\s+)?class\s+(\w+)(?:\s+extends\s+(\w+))?(?:\s+implements\s+([\w,\s]+))?/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      classes.push({
        name: match[1],
        extends: match[2] || null,
        implements: match[3] ? match[3].split(',').map(s => s.trim()) : [],
        isAbstract: content.match(/abstract\s+class\s+/)?.test(content) || false
      });
    }

    return classes;
  }

  /**
   * Extract methods from classes
   */
  extractMethods(content) {
    const methods = [];
    const classRegex = /class\s+\w+\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
    let classMatch;

    while ((classMatch = classRegex.exec(content)) !== null) {
      const classContent = classMatch[1];
      const methodRegex = /(?:public|private|protected)\s+(?:static\s+)?(?:function\s+)?(\w+)\s*\(/g;
      let methodMatch;

      while ((methodMatch = methodRegex.exec(classContent)) !== null) {
        methods.push({
          name: methodMatch[1],
          inClass: this.getCurrentClass(content, match.index)
        });
      }
    }

    return methods;
  }

  /**
   * Extract namespaces
   */
  extractNamespaces(content) {
    const namespaces = [];
    const regex = /namespace\s+([\w\\]+);/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      namespaces.push(match[1]);
    }

    return namespaces;
  }

  /**
   * Extract use statements
   */
  extractUses(content) {
    const uses = [];
    const regex = /use\s+([\w\\]+(?:\s+as\s+\w+)?);/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      uses.push(match[1]);
    }

    return uses;
  }

  /**
   * Extract constants
   */
  extractConstants(content) {
    const constants = [];
    
    // define() constants
    const defineRegex = /define\s*\(\s*['"](\w+)['"]\s*,/g;
    let match;

    while ((match = defineRegex.exec(content)) !== null) {
      constants.push({
        name: match[1],
        type: 'define'
      });
    }

    // const declarations
    const constRegex = /const\s+(\w+)\s*=/g;

    while ((match = constRegex.exec(content)) !== null) {
      constants.push({
        name: match[1],
        type: 'const'
      });
    }

    return constants;
  }

  /**
   * Extract variables
   */
  extractVariables(content) {
    const variables = new Set();
    const regex = /\$(\w+)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      variables.add(match[1]);
    }

    return Array.from(variables);
  }

  /**
   * Parse parameters string
   */
  parseParameters(paramString) {
    if (!paramString || paramString.trim() === '') {
      return [];
    }

    return paramString.split(',').map(param => {
      const parts = param.trim().split(/\s+/);
      return {
        type: parts.length > 1 ? parts[0] : null,
        name: parts[parts.length - 1]
      };
    });
  }

  /**
   * Get visibility modifier
   */
  getVisibility(context) {
    if (context.includes('public')) return 'public';
    if (context.includes('private')) return 'private';
    if (context.includes('protected')) return 'protected';
    return 'default';
  }

  /**
   * Get current class name
   */
  getCurrentClass(content, position) {
    const beforePosition = content.substring(0, position);
    const classMatch = beforePosition.match(/class\s+(\w+)/g);
    
    if (classMatch && classMatch.length > 0) {
      const lastClass = classMatch[classMatch.length - 1];
      return lastClass.replace('class ', '');
    }
    
    return null;
  }

  /**
   * Render PHP component
   */
  render(componentName, context = {}) {
    const component = this.phpFiles.get(componentName);
    
    if (!component) {
      return `<?php // Component '${componentName}' not found ?>`;
    }

    // Simple placeholder replacement
    let output = component.content;
    Object.keys(context).forEach(key => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      output = output.replace(regex, context[key]);
    });

    return output;
  }

  /**
   * Execute PHP function (simulation)
   */
  executeFunction(functionName, ...args) {
    const func = this.functions.get(functionName);
    
    if (!func) {
      return { error: `Function '${functionName}' not found` };
    }

    return {
      name: functionName,
      parameters: func.parameters,
      argsReceived: args.length,
      executed: false,
      message: 'Function found - execution requires PHP runtime'
    };
  }

  /**
   * Get all registered PHP files
   */
  list() {
    return Array.from(this.phpFiles.entries()).map(([name, data]) => ({
      name,
      extracted: data.extracted,
      registeredAt: data.registeredAt
    }));
  }

  /**
   * Get statistics
   */
  getStats() {
    let totalFunctions = 0;
    let totalClasses = 0;
    let totalMethods = 0;

    for (const [_, data] of this.phpFiles.entries()) {
      if (data.extracted) {
        totalFunctions += data.extracted.functions?.length || 0;
        totalClasses += data.extracted.classes?.length || 0;
        totalMethods += data.extracted.methods?.length || 0;
      }
    }

    return {
      totalFiles: this.phpFiles.size,
      totalFunctions,
      totalClasses,
      totalMethods,
      files: Array.from(this.phpFiles.keys())
    };
  }

  /**
   * Analyze dependencies
   */
  analyzeDependencies(componentName) {
    const component = this.phpFiles.get(componentName);
    
    if (!component) {
      return null;
    }

    return {
      namespaces: component.extracted.namespaces,
      uses: component.extracted.uses,
      extends: component.extracted.classes?.map(c => c.extends).filter(e => e),
      implements: component.extracted.classes?.flatMap(c => c.implements) || []
    };
  }

  /**
   * Clear all data
   */
  clear() {
    this.phpFiles.clear();
    this.functions.clear();
    this.classes.clear();
    this.methods.clear();
  }
}

export default TagPHP;
export { TagPHP };

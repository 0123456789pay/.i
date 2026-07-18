/**
 * TagHTML - Sistem Tag HTML Otomatis
 * Mengelola dan merender tag HTML dari komponen yang terdeteksi
 */

class TagHTML {
  constructor() {
    this.tags = new Map();
    this.templates = new Map();
    this.components = new Map();
  }

  /**
   * Register tag HTML
   */
  register(name, content, options = {}) {
    const tagInfo = {
      name,
      content,
      ...options,
      registeredAt: Date.now()
    };

    this.tags.set(name, tagInfo);

    // Extract dan categorize tags
    const extracted = this.extractTags(content);
    tagInfo.extractedTags = extracted;

    return tagInfo;
  }

  /**
   * Extract semua tag dari konten HTML
   */
  extractTags(content) {
    const tags = {
      structural: [],
      form: [],
      interactive: [],
      media: [],
      semantic: [],
      custom: []
    };

    // Structural tags
    const structural = ['div', 'span', 'section', 'article', 'header', 'footer', 'nav', 'aside', 'main'];
    
    // Form tags
    const form = ['form', 'input', 'button', 'select', 'option', 'textarea', 'label'];
    
    // Interactive tags
    const interactive = ['a', 'script', 'canvas', 'details', 'summary'];
    
    // Media tags
    const media = ['img', 'video', 'audio', 'source', 'track'];
    
    // Semantic tags
    const semantic = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th'];

    const tagRegex = /<(\w+)(?:\s+[^>]*)?>/g;
    let match;

    while ((match = tagRegex.exec(content)) !== null) {
      const tagName = match[1].toLowerCase();
      
      if (structural.includes(tagName)) tags.structural.push(tagName);
      else if (form.includes(tagName)) tags.form.push(tagName);
      else if (interactive.includes(tagName)) tags.interactive.push(tagName);
      else if (media.includes(tagName)) tags.media.push(tagName);
      else if (semantic.includes(tagName)) tags.semantic.push(tagName);
      else tags.custom.push(tagName);
    }

    // Remove duplicates
    Object.keys(tags).forEach(key => {
      tags[key] = [...new Set(tags[key])];
    });

    return tags;
  }

  /**
   * Render komponen sebagai HTML
   */
  render(componentName, data = {}) {
    const component = this.tags.get(componentName);
    
    if (!component) {
      return `<!-- Component '${componentName}' not found -->`;
    }

    let html = component.content;

    // Replace placeholders dengan data
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      html = html.replace(regex, data[key]);
    });

    return html;
  }

  /**
   * Generate template dari komponen
   */
  generateTemplate(componentName) {
    const component = this.tags.get(componentName);
    
    if (!component) {
      return null;
    }

    const template = {
      name: componentName,
      tags: component.extractedTags,
      structure: this.analyzeStructure(component.content),
      dependencies: this.extractDependencies(component.content)
    };

    this.templates.set(componentName, template);
    return template;
  }

  /**
   * Analyze struktur HTML
   */
  analyzeStructure(content) {
    const depth = this.calculateDepth(content);
    const tagCount = this.countTags(content);
    const hasDoctype = content.includes('<!DOCTYPE');
    const hasHead = content.includes('<head>');
    const hasBody = content.includes('<body>');

    return {
      depth,
      tagCount,
      hasDoctype,
      hasHead,
      hasBody,
      isComplete: hasDoctype && hasHead && hasBody
    };
  }

  /**
   * Calculate depth nesting
   */
  calculateDepth(content) {
    let maxDepth = 0;
    let currentDepth = 0;

    const tagOpenRegex = /<(\w+)(?:\s+[^>]*)?(?<!\/)>/g;
    const tagCloseRegex = /<\/(\w+)>/g;

    // Simple depth calculation
    const lines = content.split('\n');
    for (const line of lines) {
      const opens = (line.match(/<(?!\/)/g) || []).length;
      const closes = (line.match(/<\//g) || []).length;
      
      currentDepth += opens - closes;
      if (currentDepth > maxDepth) {
        maxDepth = currentDepth;
      }
    }

    return maxDepth;
  }

  /**
   * Count total tags
   */
  countTags(content) {
    return (content.match(/<\w+/g) || []).length;
  }

  /**
   * Extract dependencies (scripts, styles)
   */
  extractDependencies(content) {
    const dependencies = {
      scripts: [],
      styles: [],
      links: []
    };

    // Extract script sources
    const scriptRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/g;
    let match;
    
    while ((match = scriptRegex.exec(content)) !== null) {
      dependencies.scripts.push(match[1]);
    }

    // Extract style links
    const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']stylesheet["'][^>]*>/g;
    
    while ((match = linkRegex.exec(content)) !== null) {
      dependencies.styles.push(match[1]);
    }

    // Extract all links
    const allLinksRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/g;
    
    while ((match = allLinksRegex.exec(content)) !== null) {
      dependencies.links.push(match[1]);
    }

    return dependencies;
  }

  /**
   * Get all registered tags
   */
  list() {
    return Array.from(this.tags.entries()).map(([name, data]) => ({
      name,
      extractedTags: data.extractedTags,
      registeredAt: data.registeredAt
    }));
  }

  /**
   * Get statistics
   */
  getStats() {
    const allTags = [];
    for (const [_, data] of this.tags.entries()) {
      if (data.extractedTags) {
        Object.values(data.extractedTags).forEach(arr => {
          allTags.push(...arr);
        });
      }
    }

    return {
      totalComponents: this.tags.size,
      totalTemplates: this.templates.size,
      uniqueTags: [...new Set(allTags)].length,
      tagDistribution: this.getTagDistribution()
    };
  }

  /**
   * Get tag distribution
   */
  getTagDistribution() {
    const distribution = {};
    
    for (const [_, data] of this.tags.entries()) {
      if (data.extractedTags) {
        Object.entries(data.extractedTags).forEach(([category, tags]) => {
          if (!distribution[category]) distribution[category] = 0;
          distribution[category] += tags.length;
        });
      }
    }

    return distribution;
  }

  /**
   * Clear all tags
   */
  clear() {
    this.tags.clear();
    this.templates.clear();
    this.components.clear();
  }
}

export default TagHTML;
export { TagHTML };

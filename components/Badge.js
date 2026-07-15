// Badge Component - Development
class Badge {
  constructor(options = {}) {
    this.text = options.text || 'Badge';
    this.type = options.type || 'primary';
    this.pill = options.pill || false;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('span');
    this.element.className = `Badge Badge${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
    
    if (this.pill) {
      this.element.classList.add('BadgePill');
    }
    
    this.element.textContent = this.text;
  }

  setText(text) {
    this.text = text;
    this.element.textContent = text;
  }

  setType(type) {
    this.element.className = `Badge Badge${type.charAt(0).toUpperCase() + type.slice(1)}`;
    if (this.pill) {
      this.element.classList.add('BadgePill');
    }
  }

  setPill(isPill) {
    this.pill = isPill;
    if (isPill) {
      this.element.classList.add('BadgePill');
    } else {
      this.element.classList.remove('BadgePill');
    }
  }

  render(container) {
    if (container) {
      container.appendChild(this.element);
    }
    return this.element;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Badge;

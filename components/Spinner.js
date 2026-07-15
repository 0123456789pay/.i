// Spinner Component - Development
class Spinner {
  constructor(options = {}) {
    this.size = options.size || 'medium';
    this.type = options.type || 'primary';
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = `Spinner Spinner${this.size.charAt(0).toUpperCase() + this.size.slice(1)}`;
    
    if (this.size === 'small') {
      this.element.classList.add('SpinnerSmall');
    } else if (this.size === 'large') {
      this.element.classList.add('SpinnerLarge');
    }

    this.element.classList.add(`Spinner${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`);
  }

  setSize(size) {
    this.element.className = 'Spinner';
    this.size = size;
    
    if (size === 'small') {
      this.element.classList.add('SpinnerSmall');
    } else if (size === 'large') {
      this.element.classList.add('SpinnerLarge');
    }
    
    this.element.classList.add(`Spinner${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`);
  }

  setType(type) {
    this.type = type;
    this.element.className = `Spinner Spinner${this.size.charAt(0).toUpperCase() + this.size.slice(1)}`;
    this.element.classList.add(`Spinner${type.charAt(0).toUpperCase() + type.slice(1)}`);
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

export default Spinner;

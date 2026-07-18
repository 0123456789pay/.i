// Button Component - Development
class Button {
  constructor(options = {}) {
    this.label = options.label || 'Click Me';
    this.type = options.type || 'primary';
    this.onClick = options.onClick || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('button');
    this.element.className = `btn btn-${this.type}`;
    this.element.textContent = this.label;
    
    if (this.onClick) {
      this.element.addEventListener('click', this.onClick);
    }
  }

  render(container) {
    if (container) {
      container.appendChild(this.element);
    }
    return this.element;
  }

  setLabel(label) {
    this.label = label;
    this.element.textContent = label;
  }

  setType(type) {
    this.element.classList.remove(`btn-${this.type}`);
    this.type = type;
    this.element.classList.add(`btn-${this.type}`);
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Button;

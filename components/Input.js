// Input Component - Development
class Input {
  constructor(options = {}) {
    this.type = options.type || 'text';
    this.placeholder = options.placeholder || '';
    this.value = options.value || '';
    this.label = options.label || '';
    this.required = options.required || false;
    this.disabled = options.disabled || false;
    this.onChange = options.onChange || null;
    this.element = null;
    this.labelElement = null;
    this.groupElement = null;
    this.init();
  }

  init() {
    this.groupElement = document.createElement('div');
    this.groupElement.className = 'input-group';

    if (this.label) {
      this.labelElement = document.createElement('label');
      this.labelElement.className = 'input-label';
      this.labelElement.textContent = this.label;
      this.groupElement.appendChild(this.labelElement);
    }

    this.element = document.createElement('input');
    this.element.className = 'input';
    this.element.type = this.type;
    this.element.placeholder = this.placeholder;
    this.element.value = this.value;
    this.element.required = this.required;
    this.element.disabled = this.disabled;

    if (this.onChange) {
      this.element.addEventListener('input', (e) => this.onChange(e.target.value));
    }

    this.groupElement.appendChild(this.element);
  }

  render(container) {
    if (container) {
      container.appendChild(this.groupElement);
    }
    return this.groupElement;
  }

  setValue(value) {
    this.value = value;
    this.element.value = value;
  }

  getValue() {
    return this.element.value;
  }

  setError(hasError) {
    if (hasError) {
      this.element.classList.add('input-error');
      this.element.classList.remove('input-success');
    } else {
      this.element.classList.remove('input-error');
    }
  }

  setSuccess(hasSuccess) {
    if (hasSuccess) {
      this.element.classList.add('input-success');
      this.element.classList.remove('input-error');
    } else {
      this.element.classList.remove('input-success');
    }
  }

  destroy() {
    if (this.groupElement && this.groupElement.parentNode) {
      this.groupElement.parentNode.removeChild(this.groupElement);
    }
  }
}

export default Input;

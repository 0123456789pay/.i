// Alert Component - Development
class Alert {
  constructor(options = {}) {
    this.message = options.message || 'Alert message';
    this.type = options.type || 'info';
    this.dismissible = options.dismissible !== false;
    this.onClose = options.onClose || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = `Alert Alert${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = this.message;
    this.element.appendChild(messageSpan);

    if (this.dismissible) {
      const closeButton = document.createElement('button');
      closeButton.className = 'AlertClose';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', () => this.close());
      this.element.appendChild(closeButton);
    }
  }

  close() {
    this.element.classList.add('AlertFade');
    setTimeout(() => {
      if (this.onClose) {
        this.onClose();
      }
      this.destroy();
    }, 300);
  }

  setMessage(message) {
    const messageSpan = this.element.querySelector('span');
    if (messageSpan) {
      messageSpan.textContent = message;
    }
  }

  setType(type) {
    this.element.className = `Alert Alert${type.charAt(0).toUpperCase() + type.slice(1)}`;
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

export default Alert;

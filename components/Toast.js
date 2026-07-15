// Toast Component - Development
class Toast {
  constructor(options = {}) {
    this.message = options.message || 'Toast message';
    this.type = options.type || 'info';
    this.duration = options.duration || 3000;
    this.onClose = options.onClose || null;
    this.element = null;
    this.container = null;
    this.init();
  }

  static createContainer() {
    let container = document.querySelector('.ToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.className = 'ToastContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = `Toast Toast${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;

    const messageSpan = document.createElement('span');
    messageSpan.className = 'ToastMessage';
    messageSpan.textContent = this.message;
    this.element.appendChild(messageSpan);

    const closeButton = document.createElement('button');
    closeButton.className = 'ToastClose';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => this.close());
    this.element.appendChild(closeButton);

    this.container = Toast.createContainer();
    
    if (this.duration > 0) {
      setTimeout(() => this.close(), this.duration);
    }
  }

  close() {
    this.element.classList.add('ToastFadeOut');
    setTimeout(() => {
      if (this.onClose) {
        this.onClose();
      }
      this.destroy();
    }, 300);
  }

  setMessage(message) {
    this.message = message;
    const messageSpan = this.element.querySelector('.ToastMessage');
    if (messageSpan) {
      messageSpan.textContent = message;
    }
  }

  setType(type) {
    this.element.className = `Toast Toast${type.charAt(0).toUpperCase() + type.slice(1)}`;
  }

  render() {
    if (this.container && !this.element.parentNode) {
      this.container.appendChild(this.element);
    }
    return this.element;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Toast;

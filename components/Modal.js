// Modal Component - Development
class Modal {
  constructor(options = {}) {
    this.title = options.title || '';
    this.content = options.content || '';
    this.showFooter = options.showFooter !== false;
    this.onClose = options.onClose || null;
    this.onConfirm = options.onConfirm || null;
    this.confirmText = options.confirmText || 'OK';
    this.cancelText = options.cancelText || 'Cancel';
    this.element = null;
    this.overlay = null;
    this.init();
  }

  init() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    // Create modal
    this.element = document.createElement('div');
    this.element.className = 'modal';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'modal-title';
    titleEl.textContent = this.title;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.hide());

    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    this.element.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = this.content;
    this.element.appendChild(body);

    // Footer
    if (this.showFooter) {
      const footer = document.createElement('div');
      footer.className = 'modal-footer';

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-secondary';
      cancelBtn.textContent = this.cancelText;
      cancelBtn.addEventListener('click', () => this.hide());

      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'btn btn-primary';
      confirmBtn.textContent = this.confirmText;
      confirmBtn.addEventListener('click', () => {
        if (this.onConfirm) this.onConfirm();
        this.hide();
      });

      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      this.element.appendChild(footer);
    }

    this.overlay.appendChild(this.element);
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });
  }

  show() {
    document.body.appendChild(this.overlay);
    setTimeout(() => {
      this.overlay.classList.add('active');
    }, 10);
  }

  hide() {
    this.overlay.classList.remove('active');
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      if (this.onClose) this.onClose();
    }, 300);
  }

  setContent(content) {
    const body = this.element.querySelector('.modal-body');
    if (body) {
      body.innerHTML = content;
    }
  }

  setTitle(title) {
    this.title = title;
    const titleEl = this.element.querySelector('.modal-title');
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  destroy() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}

export default Modal;

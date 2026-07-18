// Card Component - Development
class Card {
  constructor(options = {}) {
    this.title = options.title || '';
    this.body = options.body || '';
    this.footer = options.footer || '';
    this.imageSrc = options.imageSrc || null;
    this.onFooterClick = options.onFooterClick || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'card';

    if (this.imageSrc) {
      const img = document.createElement('img');
      img.className = 'card-image';
      img.src = this.imageSrc;
      img.alt = this.title;
      this.element.appendChild(img);
    }

    if (this.title) {
      const header = document.createElement('div');
      header.className = 'card-header';
      
      const titleEl = document.createElement('h3');
      titleEl.className = 'card-title';
      titleEl.textContent = this.title;
      
      header.appendChild(titleEl);
      this.element.appendChild(header);
    }

    if (this.body) {
      const bodyEl = document.createElement('div');
      bodyEl.className = 'card-body';
      
      const textEl = document.createElement('p');
      textEl.className = 'card-text';
      textEl.textContent = this.body;
      
      bodyEl.appendChild(textEl);
      this.element.appendChild(bodyEl);
    }

    if (this.footer) {
      const footerEl = document.createElement('div');
      footerEl.className = 'card-footer';
      footerEl.textContent = this.footer;
      
      if (this.onFooterClick) {
        footerEl.style.cursor = 'pointer';
        footerEl.addEventListener('click', this.onFooterClick);
      }
      
      this.element.appendChild(footerEl);
    }
  }

  render(container) {
    if (container) {
      container.appendChild(this.element);
    }
    return this.element;
  }

  setTitle(title) {
    this.title = title;
    const header = this.element.querySelector('.card-header');
    if (header) {
      const titleEl = header.querySelector('.card-title');
      if (titleEl) titleEl.textContent = title;
    }
  }

  setBody(body) {
    this.body = body;
    const bodyEl = this.element.querySelector('.card-body');
    if (bodyEl) {
      const textEl = bodyEl.querySelector('.card-text');
      if (textEl) textEl.textContent = body;
    }
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Card;

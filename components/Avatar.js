// Avatar Component - Development
class Avatar {
  constructor(options = {}) {
    this.src = options.src || null;
    this.alt = options.alt || 'Avatar';
    this.name = options.name || '';
    this.size = options.size || 'medium';
    this.type = options.type || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = `Avatar Avatar${this.size.charAt(0).toUpperCase() + this.size.slice(1)}`;
    
    if (this.type) {
      this.element.classList.add(`Avatar${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`);
    }

    if (this.src) {
      const img = document.createElement('img');
      img.className = 'AvatarImage';
      img.src = this.src;
      img.alt = this.alt;
      img.onerror = () => this.showFallback();
      this.element.appendChild(img);
    } else {
      this.showFallback();
    }
  }

  showFallback() {
    this.element.innerHTML = '';
    const initials = this.getInitials();
    const span = document.createElement('span');
    span.textContent = initials;
    this.element.appendChild(span);
  }

  getInitials() {
    if (!this.name) return '?';
    const parts = this.name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  setSrc(src) {
    this.src = src;
    const img = this.element.querySelector('.AvatarImage');
    if (img) {
      img.src = src;
    } else {
      this.element.innerHTML = '';
      const newImg = document.createElement('img');
      newImg.className = 'AvatarImage';
      newImg.src = src;
      newImg.alt = this.alt;
      newImg.onerror = () => this.showFallback();
      this.element.appendChild(newImg);
    }
  }

  setName(name) {
    this.name = name;
    if (!this.element.querySelector('.AvatarImage')) {
      this.showFallback();
    }
  }

  setSize(size) {
    this.element.className = `Avatar Avatar${size.charAt(0).toUpperCase() + size.slice(1)}`;
    if (this.type) {
      this.element.classList.add(`Avatar${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`);
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

export default Avatar;

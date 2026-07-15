// Navbar Component - Development
class Navbar {
  constructor(options = {}) {
    this.brand = options.brand || 'Brand';
    this.items = options.items || [];
    this.onItemClick = options.onItemClick || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('nav');
    this.element.className = 'Navbar';
    
    const brandLink = document.createElement('a');
    brandLink.className = 'NavbarBrand';
    brandLink.href = '#';
    brandLink.textContent = this.brand;
    this.element.appendChild(brandLink);

    const menu = document.createElement('ul');
    menu.className = 'NavbarMenu';
    
    this.items.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'NavbarItem';
      a.href = item.href || '#';
      a.textContent = item.label;
      if (this.onItemClick) {
        a.addEventListener('click', (e) => this.onItemClick(e, item));
      }
      li.appendChild(a);
      menu.appendChild(li);
    });
    
    this.element.appendChild(menu);

    const toggle = document.createElement('button');
    toggle.className = 'NavbarToggle';
    toggle.innerHTML = '☰';
    toggle.addEventListener('click', () => this.toggleMenu());
    this.element.appendChild(toggle);
  }

  toggleMenu() {
    const menu = this.element.querySelector('.NavbarMenu');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
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

export default Navbar;

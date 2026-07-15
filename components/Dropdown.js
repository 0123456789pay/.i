// Dropdown Component - Development
class Dropdown {
  constructor(options = {}) {
    this.label = options.label || 'Dropdown';
    this.items = options.items || [];
    this.onSelect = options.onSelect || null;
    this.element = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'Dropdown';

    const toggle = document.createElement('button');
    toggle.className = 'DropdownToggle';
    toggle.innerHTML = `${this.label} <span>▼</span>`;
    toggle.addEventListener('click', () => this.toggle());
    this.element.appendChild(toggle);

    const menu = document.createElement('div');
    menu.className = 'DropdownMenu';
    
    this.items.forEach((item, index) => {
      if (item.divider) {
        const divider = document.createElement('div');
        divider.className = 'DropdownDivider';
        menu.appendChild(divider);
      } else {
        const button = document.createElement('button');
        button.className = 'DropdownItem';
        button.textContent = item.label;
        button.addEventListener('click', () => this.select(item, index));
        menu.appendChild(button);
      }
    });
    
    this.element.appendChild(menu);

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const menu = this.element.querySelector('.DropdownMenu');
    if (this.isOpen) {
      menu.classList.add('DropdownMenuOpen');
    } else {
      menu.classList.remove('DropdownMenuOpen');
    }
  }

  open() {
    this.isOpen = true;
    const menu = this.element.querySelector('.DropdownMenu');
    menu.classList.add('DropdownMenuOpen');
  }

  close() {
    this.isOpen = false;
    const menu = this.element.querySelector('.DropdownMenu');
    menu.classList.remove('DropdownMenuOpen');
  }

  select(item, index) {
    if (this.onSelect) {
      this.onSelect(item, index);
    }
    this.close();
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

export default Dropdown;

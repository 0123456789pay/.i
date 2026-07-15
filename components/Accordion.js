// Accordion Component - Development
class Accordion {
  constructor(options = {}) {
    this.items = options.items || [];
    this.allowMultiple = options.allowMultiple || false;
    this.activeIndex = options.activeIndex !== undefined ? options.activeIndex : -1;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'Accordion';

    this.items.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.className = `AccordionItem ${index === this.activeIndex ? 'AccordionOpen' : ''}`;

      const header = document.createElement('div');
      header.className = 'AccordionHeader';
      header.innerHTML = `
        <span>${item.title}</span>
        <span class="AccordionIcon ${index === this.activeIndex ? 'AccordionIconOpen' : ''}">▼</span>
      `;
      header.addEventListener('click', () => this.toggle(index));
      accordionItem.appendChild(header);

      const content = document.createElement('div');
      content.className = 'AccordionContent';
      content.style.maxHeight = index === this.activeIndex ? '500px' : '0';
      
      const inner = document.createElement('div');
      inner.className = 'AccordionContentInner';
      inner.innerHTML = item.content || '';
      content.appendChild(inner);
      
      accordionItem.appendChild(content);
      this.element.appendChild(accordionItem);
    });
  }

  toggle(index) {
    const items = this.element.querySelectorAll('.AccordionItem');
    const contents = this.element.querySelectorAll('.AccordionContent');
    const icons = this.element.querySelectorAll('.AccordionIcon');

    if (this.activeIndex === index) {
      // Close current
      items[index].classList.remove('AccordionOpen');
      contents[index].style.maxHeight = '0';
      icons[index].classList.remove('AccordionIconOpen');
      this.activeIndex = -1;
    } else {
      if (!this.allowMultiple && this.activeIndex !== -1) {
        // Close others
        items[this.activeIndex].classList.remove('AccordionOpen');
        contents[this.activeIndex].style.maxHeight = '0';
        icons[this.activeIndex].classList.remove('AccordionIconOpen');
      }
      
      // Open new
      items[index].classList.add('AccordionOpen');
      contents[index].style.maxHeight = '500px';
      icons[index].classList.add('AccordionIconOpen');
      this.activeIndex = index;
    }
  }

  expand(index) {
    if (index >= 0 && index < this.items.length) {
      this.activeIndex = index;
      this.render(document.createElement('div'));
    }
  }

  collapseAll() {
    this.activeIndex = -1;
    const items = this.element.querySelectorAll('.AccordionItem');
    const contents = this.element.querySelectorAll('.AccordionContent');
    const icons = this.element.querySelectorAll('.AccordionIcon');

    items.forEach(item => item.classList.remove('AccordionOpen'));
    contents.forEach(content => content.style.maxHeight = '0');
    icons.forEach(icon => icon.classList.remove('AccordionIconOpen'));
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

export default Accordion;

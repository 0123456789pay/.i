// Tooltip Component - Development
class Tooltip {
  constructor(options = {}) {
    this.content = options.content || 'Tooltip text';
    this.position = options.position || 'top';
    this.trigger = options.trigger || 'hover';
    this.delay = options.delay || 200;
    this.element = null;
    this.tooltipElement = null;
    this.timeoutId = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'Tooltip';

    const trigger = document.createElement('span');
    trigger.className = 'TooltipTrigger';
    trigger.setAttribute('data-tooltip', this.content);
    trigger.innerHTML = '<slot></slot>';
    
    if (this.trigger === 'hover') {
      trigger.addEventListener('mouseenter', () => this.show());
      trigger.addEventListener('mouseleave', () => this.hide());
    } else if (this.trigger === 'click') {
      trigger.addEventListener('click', () => this.toggle());
      document.addEventListener('click', (e) => {
        if (!this.element.contains(e.target)) {
          this.hide();
        }
      });
    } else if (this.trigger === 'focus') {
      trigger.setAttribute('tabindex', '0');
      trigger.addEventListener('focus', () => this.show());
      trigger.addEventListener('blur', () => this.hide());
    }

    this.element.appendChild(trigger);
  }

  createTooltip() {
    if (this.tooltipElement) return;

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = `TooltipContent Tooltop${this.position.charAt(0).toUpperCase() + this.position.slice(1)}`;
    this.tooltipElement.textContent = this.content;

    const arrow = document.createElement('div');
    arrow.className = 'TooltipArrow';
    this.tooltipElement.appendChild(arrow);

    this.element.appendChild(this.tooltipElement);
  }

  show() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      if (!this.tooltipElement) {
        this.createTooltip();
      }
      this.tooltipElement.classList.add('TooltipContentVisible');
    }, this.delay);
  }

  hide() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.tooltipElement) {
      this.tooltipElement.classList.remove('TooltipContentVisible');
    }
  }

  toggle() {
    if (this.tooltipElement && this.tooltipElement.classList.contains('TooltipContentVisible')) {
      this.hide();
    } else {
      this.show();
    }
  }

  setContent(content) {
    this.content = content;
    if (this.tooltipElement) {
      const textNode = this.tooltipElement.childNodes[0];
      if (textNode.nodeType === Node.TEXT_NODE) {
        textNode.textContent = content;
      }
    }
  }

  setPosition(position) {
    this.position = position;
    if (this.tooltipElement) {
      this.tooltipElement.className = `TooltipContent Tooltop${position.charAt(0).toUpperCase() + position.slice(1)} TooltipContentVisible`;
    }
  }

  render(container) {
    if (container) {
      container.appendChild(this.element);
    }
    return this.element;
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Tooltip;

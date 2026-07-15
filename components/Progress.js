// Progress Component - Development
class Progress {
  constructor(options = {}) {
    this.value = options.value || 0;
    this.max = options.max || 100;
    this.type = options.type || 'primary';
    this.striped = options.striped || false;
    this.animated = options.animated || false;
    this.showLabel = options.showLabel !== false;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'Progress';

    const bar = document.createElement('div');
    bar.className = `ProgressBar ProgressBar${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
    
    if (this.striped) {
      bar.classList.add('ProgressBarStriped');
    }
    
    if (this.animated) {
      bar.classList.add('ProgressBarAnimated');
    }

    const percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    bar.style.width = `${percentage}%`;
    
    if (this.showLabel) {
      bar.textContent = `${percentage.toFixed(0)}%`;
    }

    this.element.appendChild(bar);
    this.barElement = bar;
  }

  setValue(value) {
    this.value = value;
    const percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    this.barElement.style.width = `${percentage}%`;
    if (this.showLabel) {
      this.barElement.textContent = `${percentage.toFixed(0)}%`;
    }
  }

  setMax(max) {
    this.max = max;
    this.setValue(this.value);
  }

  setType(type) {
    this.barElement.className = `ProgressBar ProgressBar${type.charAt(0).toUpperCase() + type.slice(1)}`;
    if (this.striped) {
      this.barElement.classList.add('ProgressBarStriped');
    }
    if (this.animated) {
      this.barElement.classList.add('ProgressBarAnimated');
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

export default Progress;

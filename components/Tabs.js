// Tabs Component - Development
class Tabs {
  constructor(options = {}) {
    this.tabs = options.tabs || [];
    this.activeTab = options.activeTab || 0;
    this.vertical = options.vertical || false;
    this.onChange = options.onChange || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = this.vertical ? 'Tabs TabsVertical' : 'Tabs';

    const tabList = document.createElement('ul');
    tabList.className = 'TabList';

    this.tabs.forEach((tab, index) => {
      const li = document.createElement('li');
      li.className = `TabItem ${index === this.activeTab ? 'TabItemActive' : ''}`;
      li.textContent = tab.label;
      li.addEventListener('click', () => this.setActiveTab(index));
      tabList.appendChild(li);
    });

    this.element.appendChild(tabList);

    const content = document.createElement('div');
    content.className = 'TabContent';

    this.tabs.forEach((tab, index) => {
      const pane = document.createElement('div');
      pane.className = `TabPane ${index === this.activeTab ? 'TabPaneActive' : ''}`;
      pane.innerHTML = tab.content || '';
      content.appendChild(pane);
    });

    this.element.appendChild(content);
  }

  setActiveTab(index) {
    if (index < 0 || index >= this.tabs.length) return;
    
    this.activeTab = index;
    
    const tabItems = this.element.querySelectorAll('.TabItem');
    const tabPanes = this.element.querySelectorAll('.TabPane');
    
    tabItems.forEach((item, i) => {
      item.classList.toggle('TabItemActive', i === index);
    });
    
    tabPanes.forEach((pane, i) => {
      pane.classList.toggle('TabPaneActive', i === index);
    });

    if (this.onChange) {
      this.onChange(index, this.tabs[index]);
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

export default Tabs;

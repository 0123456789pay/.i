// Table Component - Development
class Table {
  constructor(options = {}) {
    this.columns = options.columns || [];
    this.data = options.data || [];
    this.striped = options.striped || false;
    this.onRowClick = options.onRowClick || null;
    this.element = null;
    this.init();
  }

  init() {
    this.element = document.createElement('table');
    this.element.className = 'Table';
    if (this.striped) {
      this.element.classList.add('TableStriped');
    }

    const thead = document.createElement('thead');
    thead.className = 'TableHead';
    const headerRow = document.createElement('tr');
    
    this.columns.forEach(col => {
      const th = document.createElement('th');
      th.className = 'TableHeaderCell';
      th.textContent = col.header;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    this.element.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'TableBody';
    
    this.data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      tr.className = 'TableRow';
      
      this.columns.forEach(col => {
        const td = document.createElement('td');
        td.className = 'TableCell';
        td.textContent = row[col.key] || '';
        tr.appendChild(td);
      });
      
      if (this.onRowClick) {
        tr.addEventListener('click', (e) => this.onRowClick(e, row, rowIndex));
      }
      
      tbody.appendChild(tr);
    });
    
    this.element.appendChild(tbody);
  }

  render(container) {
    if (container) {
      container.appendChild(this.element);
    }
    return this.element;
  }

  setData(newData) {
    this.data = newData;
    const tbody = this.element.querySelector('.TableBody');
    tbody.innerHTML = '';
    
    this.data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      tr.className = 'TableRow';
      
      this.columns.forEach(col => {
        const td = document.createElement('td');
        td.className = 'TableCell';
        td.textContent = row[col.key] || '';
        tr.appendChild(td);
      });
      
      if (this.onRowClick) {
        tr.addEventListener('click', (e) => this.onRowClick(e, row, rowIndex));
      }
      
      tbody.appendChild(tr);
    });
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Table;

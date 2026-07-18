/**
 * DIGITAL SYSTEM MASTER JS - Core Functionality
 * Terintegrasi dari component/js/ dan components/
 * Versi: 1.0 Digital Core
 */

// Digital System Namespace
const DigitalSystem = {
    version: '1.0',
    theme: 'white-blue',
    initialized: false,
    
    // Inisialisasi sistem
    init: function() {
        if (this.initialized) return;
        
        console.log('[Digital System] Initializing v' + this.version);
        this.setupEventListeners();
        this.setupModals();
        this.setupForms();
        this.setupTables();
        this.setupNavigation();
        this.initialized = true;
        console.log('[Digital System] Initialization complete');
    },
    
    // Setup Event Listeners Global
    setupEventListeners: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.addLoadingStates();
            this.initializeTooltips();
            this.setupKeyboardShortcuts();
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    },
    
    // Setup Modals
    setupModals: function() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-modal-target');
                this.openModal(targetId);
            });
        });
        
        const closeButtons = document.querySelectorAll('.modal-digital-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        document.querySelectorAll('.modal-digital-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeAllModals();
                }
            });
        });
    },
    
    // Buka Modal
    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.announceToScreenReader('Modal opened: ' + modalId);
        }
    },
    
    // Tutup Semua Modal
    closeAllModals: function() {
        document.querySelectorAll('.modal-digital-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    },
    
    // Setup Forms
    setupForms: function() {
        const forms = document.querySelectorAll('form.digital-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
            
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    },
    
    // Handle Form Submit
    handleFormSubmit: function(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-digital" style="width:20px;height:20px;border-width:2px;"></span> Processing...';
        }
        
        // Simulasi submit
        setTimeout(() => {
            this.showAlert('Form submitted successfully!', 'success');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            form.reset();
        }, 1500);
    },
    
    // Validate Field
    validateField: function(field) {
        if (!field.hasAttribute('required')) return;
        
        const isValid = field.value.trim() !== '';
        const parent = field.closest('.form-group');
        
        if (parent) {
            if (!isValid) {
                parent.classList.add('has-error');
            } else {
                parent.classList.remove('has-error');
            }
        }
    },
    
    // Setup Tables
    setupTables: function() {
        const tables = document.querySelectorAll('.table-digital');
        tables.forEach(table => {
            this.makeTableSortable(table);
            this.addTableHoverEffects(table);
        });
    },
    
    // Make Table Sortable
    makeTableSortable: function(table) {
        const headers = table.querySelectorAll('th[data-sortable]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const column = header.cellIndex;
                this.sortTableColumn(table, column);
            });
        });
    },
    
    // Sort Table Column
    sortTableColumn: function(table, column) {
        const tbody = table.querySelector('tbody');
        if (!tbody) return;
        
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const isAscending = !table.dataset.sortAsc || table.dataset.sortAsc === 'false';
        
        rows.sort((a, b) => {
            const aText = a.cells[column].textContent.trim();
            const bText = b.cells[column].textContent.trim();
            return isAscending 
                ? aText.localeCompare(bText, undefined, { numeric: true })
                : bText.localeCompare(aText, undefined, { numeric: true });
        });
        
        rows.forEach(row => tbody.appendChild(row));
        table.dataset.sortAsc = isAscending;
    },
    
    // Add Table Hover Effects
    addTableHoverEffects: function(table) {
        // Already handled by CSS
    },
    
    // Setup Navigation
    setupNavigation: function() {
        const navLinks = document.querySelectorAll('.nav-digital-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.parentElement.classList.remove('active'));
                link.parentElement.classList.add('active');
            });
        });
    },
    
    // Add Loading States
    addLoadingStates: function() {
        document.body.classList.add('digital-loaded');
    },
    
    // Initialize Tooltips
    initializeTooltips: function() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                this.showTooltip(el, e);
            });
            el.addEventListener('mouseleave', () => {
                this.hideTooltip(el);
            });
        });
    },
    
    // Show Tooltip
    showTooltip: function(element, event) {
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'digital-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0, 61, 128, 0.9)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '0.5rem 1rem';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.875rem';
        tooltip.style.zIndex = '10000';
        tooltip.style.pointerEvents = 'none';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        
        element._tooltip = tooltip;
    },
    
    // Hide Tooltip
    hideTooltip: function(element) {
        if (element._tooltip) {
            element._tooltip.remove();
            element._tooltip = null;
        }
    },
    
    // Setup Keyboard Shortcuts
    setupKeyboardShortcuts: function() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Ctrl/Cmd + K untuk search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    },
    
    // Handle Resize
    handleResize: function() {
        // Debounced resize handler
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.closeAllModals();
        }, 250);
    },
    
    // Show Alert
    showAlert: function(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-digital alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.digital-container') || document.body;
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    },
    
    // Announce to Screen Reader
    announceToScreenReader: function(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0,0,0,0)';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    },
    
    // Utility: Generate ID unik
    generateId: function(prefix = 'digital') {
        return prefix + '-' + Math.random().toString(36).substr(2, 9);
    },
    
    // Utility: Format tanggal
    formatDate: function(date) {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    },
    
    // Utility: Format currency
    formatCurrency: function(amount, currency = 'IDR') {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Utility: Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Utility: Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Component-specific modules
const DigitalComponents = {
    // Card Component
    Card: {
        create: function(title, content, options = {}) {
            const card = document.createElement('div');
            card.className = 'digital-card';
            if (options.id) card.id = options.id;
            
            const header = document.createElement('div');
            header.className = 'digital-card-header';
            header.innerHTML = `<h3 class="digital-card-title">${title}</h3>`;
            
            if (options.actions) {
                const actionsDiv = document.createElement('div');
                options.actions.forEach(action => {
                    const btn = document.createElement('button');
                    btn.className = `btn-digital ${action.class || ''}`;
                    btn.textContent = action.label;
                    btn.onclick = action.handler;
                    actionsDiv.appendChild(btn);
                });
                header.appendChild(actionsDiv);
            }
            
            const body = document.createElement('div');
            body.innerHTML = content;
            
            card.appendChild(header);
            card.appendChild(body);
            
            return card;
        }
    },
    
    // Button Component
    Button: {
        create: function(label, options = {}) {
            const btn = document.createElement('button');
            btn.className = `btn-digital ${options.variant || ''} ${options.size || ''}`;
            btn.textContent = label;
            if (options.onClick) btn.onclick = options.onClick;
            if (options.disabled) btn.disabled = true;
            return btn;
        }
    },
    
    // Input Component
    Input: {
        create: function(type = 'text', options = {}) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-group';
            
            if (options.label) {
                const label = document.createElement('label');
                label.className = 'input-digital-label';
                label.textContent = options.label;
                label.htmlFor = options.id;
                wrapper.appendChild(label);
            }
            
            const input = document.createElement('input');
            input.type = type;
            input.className = 'input-digital';
            if (options.id) input.id = options.id;
            if (options.placeholder) input.placeholder = options.placeholder;
            if (options.required) input.required = true;
            if (options.value) input.value = options.value;
            
            wrapper.appendChild(input);
            return wrapper;
        }
    },
    
    // Modal Component
    Modal: {
        create: function(id, title, content) {
            const overlay = document.createElement('div');
            overlay.className = 'modal-digital-overlay';
            overlay.id = id;
            
            const modal = document.createElement('div');
            modal.className = 'modal-digital';
            
            modal.innerHTML = `
                <div class="modal-digital-header">
                    <h2 class="modal-digital-title">${title}</h2>
                    <button class="modal-digital-close">&times;</button>
                </div>
                <div class="modal-digital-body">${content}</div>
            `;
            
            overlay.appendChild(modal);
            return overlay;
        }
    },
    
    // Table Component
    Table: {
        create: function(columns, data, options = {}) {
            const table = document.createElement('table');
            table.className = 'table-digital';
            
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            columns.forEach(col => {
                const th = document.createElement('th');
                th.textContent = col.label;
                if (col.sortable) th.setAttribute('data-sortable', 'true');
                if (col.width) th.style.width = col.width;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = row[col.key] || '';
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            
            return table;
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DigitalSystem.init());
} else {
    DigitalSystem.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DigitalSystem, DigitalComponents };
}

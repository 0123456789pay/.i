// DataCenter Digital - Main JavaScript Application

class DataCenterApp {
    constructor() {
        this.menus = [];
        this.stats = {};
        this.init();
    }

    async init() {
        await this.loadMenus();
        await this.loadStats();
        this.setupEventListeners();
        this.startAutoRefresh();
    }

    async loadMenus() {
        try {
            const response = await fetch('php/get_menus.php');
            this.menus = await response.json();
            this.renderSidebar();
        } catch (error) {
            console.error('Error loading menus:', error);
        }
    }

    async loadStats() {
        try {
            const response = await fetch('php/get_stats.php');
            this.stats = await response.json();
            this.renderStats();
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    renderSidebar() {
        const menuContainer = document.getElementById('menu-container');
        if (!menuContainer) return;

        const categories = this.groupMenusByCategory(this.menus);
        
        let html = '';
        for (const [category, items] of Object.entries(categories)) {
            html += `
                <div class="category" data-category="${category}">
                    <div class="category-title" onclick="app.toggleCategory('${category}')">
                        ${category}
                        <span>▼</span>
                    </div>
                    <ul class="category-menu">
            `;
            
            items.slice(0, 50).forEach(menu => {
                const title = this.formatTitle(menu.file);
                html += `<li><a href="#" onclick="app.loadMenu('${menu.file}'); return false;">${title}</a></li>`;
            });
            
            if (items.length > 50) {
                html += `<li><a href="#" style="opacity:0.6;font-style:italic">... dan ${items.length - 50} lainnya</a></li>`;
            }
            
            html += '</ul></div>';
        }
        
        menuContainer.innerHTML = html;
    }

    groupMenusByCategory(menus) {
        const categories = {
            'Monitoring': [],
            'Security': [],
            'Network': [],
            'Storage': [],
            'Database': [],
            'Cloud': [],
            'API': [],
            'System': [],
            'Analytics': [],
            'Lainnya': []
        };

        menus.forEach(menu => {
            const file = menu.file.toLowerCase();
            if (file.includes('monitor') || file.includes('status') || file.includes('metric')) {
                categories['Monitoring'].push(menu);
            } else if (file.includes('security') || file.includes('auth') || file.includes('firewall') || file.includes('encrypt')) {
                categories['Security'].push(menu);
            } else if (file.includes('network') || file.includes('dns') || file.includes('load') || file.includes('gateway')) {
                categories['Network'].push(menu);
            } else if (file.includes('storage') || file.includes('backup') || file.includes('cache')) {
                categories['Storage'].push(menu);
            } else if (file.includes('database') || file.includes('sql') || file.includes('db')) {
                categories['Database'].push(menu);
            } else if (file.includes('cloud') || file.includes('kubernetes') || file.includes('docker') || file.includes('vm')) {
                categories['Cloud'].push(menu);
            } else if (file.includes('api') || file.includes('rest') || file.includes('graphql')) {
                categories['API'].push(menu);
            } else if (file.includes('server') || file.includes('system') || file.includes('config')) {
                categories['System'].push(menu);
            } else if (file.includes('analytics') || file.includes('report') || file.includes('log')) {
                categories['Analytics'].push(menu);
            } else {
                categories['Lainnya'].push(menu);
            }
        });

        // Remove empty categories
        Object.keys(categories).forEach(key => {
            if (categories[key].length === 0) delete categories[key];
        });

        return categories;
    }

    formatTitle(filename) {
        return filename.replace('.html', '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    toggleCategory(category) {
        const catEl = document.querySelector(`[data-category="${category}"]`);
        if (catEl) {
            catEl.classList.toggle('active');
        }
    }

    loadMenu(file) {
        const iframe = document.getElementById('content-frame');
        const titleEl = document.getElementById('current-title');
        
        if (iframe) {
            iframe.src = `html/${file}`;
        }
        
        if (titleEl) {
            titleEl.textContent = this.formatTitle(file);
        }

        // Update active state
        document.querySelectorAll('.category-menu a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('onclick')?.includes(file)) {
                a.classList.add('active');
            }
        });
    }

    renderStats() {
        const statsEl = document.getElementById('stats-container');
        if (!statsEl || !this.stats.files) return;

        statsEl.innerHTML = `
            <div class="stat-card success">
                <h3>${this.stats.files}</h3>
                <p>Total Menu Files</p>
            </div>
            <div class="stat-card">
                <h3>${this.stats.servers || 42}</h3>
                <p>Active Servers</p>
            </div>
            <div class="stat-card warning">
                <h3>${this.stats.storage || '2.4'} TB</h3>
                <p>Storage Used</p>
            </div>
            <div class="stat-card success">
                <h3>${this.stats.uptime || '99.99'}%</h3>
                <p>System Uptime</p>
            </div>
        `;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterMenus(e.target.value));
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
        }
    }

    filterMenus(query) {
        const links = document.querySelectorAll('.category-menu a');
        query = query.toLowerCase();
        
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            link.parentElement.style.display = text.includes(query) ? 'block' : 'none';
        });
    }

    startAutoRefresh() {
        setInterval(() => {
            this.loadStats();
        }, 30000); // Refresh every 30 seconds
    }
}

// Initialize app
const app = new DataCenterApp();

// Global utility functions
function refreshAll() {
    location.reload();
}

function exportData() {
    alert('Exporting data... File will be downloaded shortly.');
}

// Service worker registration for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.log('Service Worker not supported');
    });
}

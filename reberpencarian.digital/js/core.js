// ReberPencarian.digital - Core JavaScript Functionality

class ReberPencarian {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.history = [];
        this.bookmarks = [];
        this.settings = { gridColumns: 7 };
        this.allSites = [];
        
        this.init();
    }

    async init() {
        await this.scanDigitalFolders();
        this.loadFromStorage();
        this.bindEvents();
        this.renderSites(this.allSites);
        this.renderTabs();
        this.updateSettingsUI();
    }

    async scanDigitalFolders() {
        // Daftar semua folder .digital dari workspace (tanpa pengungsisuaka.digital)
        const digitalFolders = [
            { name: 'ai_machinelearning.digital', path: '/workspace/ai_machinelearning.digital', category: 'ai', icon: '🤖' },
            { name: 'analisisdata.digital', path: '/workspace/analisisdata.digital', category: 'tech', icon: '📈' },
            { name: 'arsipversi.digital', path: '/workspace/arsipversi.digital', category: 'tech', icon: '🗃️' },
            { name: 'bantuansupport.digital', path: '/workspace/bantuansupport.digital', category: 'support', icon: '❓' },
            { name: 'bisnisstartup.digital', path: '/workspace/bisnisstartup.digital', category: 'business', icon: '💼' },
            { name: 'blockchaincrypto.digital', path: '/workspace/blockchaincrypto.digital', category: 'finance', icon: '₿' },
            { name: 'configphpgit.digital', path: '/workspace/configphpgit.digital', category: 'config', icon: '🐘' },
            { name: 'configprotokol.digital', path: '/workspace/configprotokol.digital', category: 'config', icon: '⚙️' },
            { name: 'configselectortrue.digital', path: '/workspace/configselectortrue.digital', category: 'config', icon: '✓' },
            { name: 'configsimbolakar.digital', path: '/workspace/configsimbolakar.digital', category: 'config', icon: '√' },
            { name: 'desainkreatif.digital', path: '/workspace/desainkreatif.digital', category: 'creative', icon: '🎨' },
            { name: 'dns_domain.digital', path: '/workspace/dns_domain.digital', category: 'infra', icon: '🌐' },
            { name: 'ecommerceretail.digital', path: '/workspace/ecommerceretail.digital', category: 'business', icon: '🛒' },
            { name: 'energilingkungan.digital', path: '/workspace/energilingkungan.digital', category: 'energy', icon: '⚡' },
            { name: 'gameentertainment.digital', path: '/workspace/gameentertainment.digital', category: 'media', icon: '🎮' },
            { name: 'hukumkepatuhan.digital', path: '/workspace/hukumkepatuhan.digital', category: 'legal', icon: '⚖️' },
            { name: 'identitasakses.digital', path: '/workspace/identitasakses.digital', category: 'security', icon: '🔐' },
            { name: 'infrastrukturcloud.digital', path: '/workspace/infrastrukturcloud.digital', category: 'infra', icon: '☁️' },
            { name: 'iot_perangkat.digital', path: '/workspace/iot_perangkat.digital', category: 'tech', icon: '📱' },
            { name: 'jaringanaktuaris.digital', path: '/workspace/jaringanaktuaris.digital', category: 'tech', icon: '🌐' },
            { name: 'keamanansiber.digital', path: '/workspace/keamanansiber.digital', category: 'security', icon: '🛡️' },
            { name: 'kesehatandigital.digital', path: '/workspace/kesehatandigital.digital', category: 'health', icon: '🏥' },
            { name: 'keuanganperbankan.digital', path: '/workspace/keuanganperbankan.digital', category: 'finance', icon: '💰' },
            { name: 'klaimpenyesuaian.digital', path: '/workspace/klaimpenyesuaian.digital', category: 'business', icon: '📋' },
            { name: 'komunikasi.digital', path: '/workspace/komunikasi.digital', category: 'comm', icon: '📞' },
            { name: 'konstruksigedung.digital', path: '/workspace/konstruksigedung.digital', category: 'construction', icon: '🏗️' },
            { name: 'manajemendata.digital', path: '/workspace/manajemendata.digital', category: 'tech', icon: '🗄️' },
            { name: 'manajemenfile.digital', path: '/workspace/manajemenfile.digital', category: 'config', icon: '📁' },
            { name: 'manajemenproyek.digital', path: '/workspace/manajemenproyek.digital', category: 'business', icon: '📊' },
            { name: 'media.digital', path: '/workspace/media.digital', category: 'media', icon: '📺' },
            { name: 'mediakonten.digital', path: '/workspace/mediakonten.digital', category: 'media', icon: '📱' },
            { name: 'pendidikanpelatihan.digital', path: '/workspace/pendidikanpelatihan.digital', category: 'education', icon: '📚' },
            { name: 'pengaturansistem.digital', path: '/workspace/pengaturansistem.digital', category: 'config', icon: '⚙️' },
            { name: 'pengembangansoftware.digital', path: '/workspace/pengembangansoftware.digital', category: 'tech', icon: '⌨️' },
            { name: 'pertanianakuakultur.digital', path: '/workspace/pertanianakuakultur.digital', category: 'agriculture', icon: '🌾' },
            { name: 'pusatdigital.digital', path: '/workspace/pusatdigital.digital', category: 'tech', icon: '🎯' },
            { name: 'ragreber.digital', path: '/workspace/ragreber.digital', category: 'ai', icon: '🔍' },
            { name: 'reberpencarian.digital', path: '/workspace/reberpencarian.digital', category: 'search', icon: '🔎' },
            { name: 'tanggapdarurat.digital', path: '/workspace/tanggapdarurat.digital', category: 'emergency', icon: '🚨' },
            { name: 'tiketevent.digital', path: '/workspace/tiketevent.digital', category: 'media', icon: '🎫' },
            { name: 'transportasilogistik.digital', path: '/workspace/transportasilogistik.digital', category: 'logistics', icon: '🚚' },
            { name: 'visualisasireporting.digital', path: '/workspace/visualisasireporting.digital', category: 'tech', icon: '📊' }
        ];
        
        this.allSites = digitalFolders;
    }

    loadFromStorage() {
        const savedTabs = localStorage.getItem('reber_tabs');
        const savedHistory = localStorage.getItem('reber_history');
        const savedBookmarks = localStorage.getItem('reber_bookmarks');
        const savedSettings = localStorage.getItem('reber_settings');
        
        if (savedTabs) this.tabs = JSON.parse(savedTabs);
        if (savedHistory) this.history = JSON.parse(savedHistory);
        if (savedBookmarks) this.bookmarks = JSON.parse(savedBookmarks);
        if (savedSettings) this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }

    saveToStorage() {
        localStorage.setItem('reber_tabs', JSON.stringify(this.tabs));
        localStorage.setItem('reber_history', JSON.stringify(this.history));
        localStorage.setItem('reber_bookmarks', JSON.stringify(this.bookmarks));
        localStorage.setItem('reber_settings', JSON.stringify(this.settings));
    }

    bindEvents() {
        // Navigation Buttons
        document.getElementById('btnBack')?.addEventListener('click', () => this.navigate('back'));
        document.getElementById('btnForward')?.addEventListener('click', () => this.navigate('forward'));
        document.getElementById('btnRefresh')?.addEventListener('click', () => this.navigate('refresh'));
        document.getElementById('btnHome')?.addEventListener('click', () => this.navigate('home'));

        // Search Button
        document.getElementById('searchBtn')?.addEventListener('click', () => this.performSearch());
        
        // URL Input Enter Key
        document.getElementById('urlInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // Menu Buttons
        document.getElementById('btnHistory')?.addEventListener('click', () => this.showMenu('history'));
        document.getElementById('btnBookmarks')?.addEventListener('click', () => this.showMenu('bookmarks'));
        document.getElementById('btnDownloads')?.addEventListener('click', () => this.showMenu('downloads'));
        document.getElementById('btnSettings')?.addEventListener('click', () => this.showMenu('settings'));
        document.getElementById('btnMoreOptions')?.addEventListener('click', () => this.showMenu('more'));

        // Close All Tabs
        document.getElementById('closeAllTabs')?.addEventListener('click', () => this.closeAllTabs());

        // Close Tab Content Overlay
        document.getElementById('closeTabBtn')?.addEventListener('click', () => this.closeActiveTabContent());
    }

    // Render Sites Grid
    renderSites(sites = this.allSites) {
        const grid = document.getElementById('sitesGridMain');
        
        if (!grid) return;
        
        if (sites.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">🔍</div>
                    <h3>Tidak ada situs ditemukan</h3>
                    <p>Coba gunakan kata kunci pencarian lain</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = '';
        sites.forEach((site, index) => {
            const card = document.createElement('div');
            card.className = 'site-card animate-fade-in';
            card.style.animationDelay = `${index * 0.03}s`;
            card.innerHTML = `
                <div class="site-card-icon">${site.icon}</div>
                <div class="site-card-name">${site.name}</div>
                <div class="site-card-path">${site.path}</div>
                <div class="site-card-category">${site.category}</div>
            `;
            
            card.addEventListener('click', () => {
                this.openTab(site);
            });
            
            grid.appendChild(card);
        });
    }

    // Open Tab for Site
    openTab(site) {
        const tabId = Date.now();
        const newTab = {
            id: tabId,
            site: site,
            title: site.name,
            timestamp: new Date().toISOString()
        };
        
        this.tabs.push(newTab);
        this.activeTabId = tabId;
        
        // Add to history
        this.history.unshift({
            site: site,
            timestamp: new Date().toISOString()
        });
        
        // Keep history max 50 items
        if (this.history.length > 50) this.history = this.history.slice(0, 50);
        
        this.saveToStorage();
        this.renderTabs();
        this.showTabContent(tabId);
    }

    // Render Tabs
    renderTabs() {
        const tabList = document.getElementById('tabList');
        const tabBarSection = document.getElementById('tabBarSection');
        
        if (!tabList) return;
        
        if (this.tabs.length === 0) {
            tabBarSection.classList.remove('active');
            tabList.innerHTML = '';
            return;
        }
        
        tabBarSection.classList.add('active');
        tabList.innerHTML = '';
        
        this.tabs.forEach(tab => {
            const tabItem = document.createElement('div');
            tabItem.className = `tab-item ${tab.id === this.activeTabId ? 'active' : ''}`;
            tabItem.innerHTML = `
                <span>${tab.site.icon} ${tab.title}</span>
                <button class="tab-item-close" data-tab-id="${tab.id}">×</button>
            `;
            
            tabItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tab-item-close')) {
                    this.activeTabId = tab.id;
                    this.renderTabs();
                    this.showTabContent(tab.id);
                }
            });
            
            const closeBtn = tabItem.querySelector('.tab-item-close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(tab.id);
            });
            
            tabList.appendChild(tabItem);
        });
    }

    // Show Tab Content
    showTabContent(tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;
        
        const overlay = document.getElementById('tabContentOverlay');
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        titleEl.textContent = `${tab.site.icon} ${tab.title}`;
        bodyEl.innerHTML = `
            <div class="site-detail-view">
                <div class="site-detail-header">
                    <div class="site-detail-icon">${tab.site.icon}</div>
                    <div class="site-detail-info">
                        <h2>${tab.site.name}</h2>
                        <div class="site-detail-path">${tab.site.path}</div>
                        <div class="site-detail-category">${tab.site.category}</div>
                    </div>
                </div>
                
                <div class="site-detail-content">
                    <div class="site-action-buttons">
                        <button class="action-btn primary" onclick="window.reberPencarian.openIndexHtml('${tab.site.path}')">
                            📄 Buka index.html
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.toggleBookmark('${tab.site.name}')">
                            ⭐ ${this.isBookmarked(tab.site.name) ? 'Hapus Bookmark' : 'Tambah Bookmark'}
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.copyPath('${tab.site.path}')">
                            📋 Salin Path
                        </button>
                    </div>
                    
                    <div class="site-info-section">
                        <h3>Informasi Situs</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Nama Domain</label>
                                <span>${tab.site.name}</span>
                            </div>
                            <div class="info-item">
                                <label>Path Lengkap</label>
                                <span>${tab.site.path}</span>
                            </div>
                            <div class="info-item">
                                <label>Kategori</label>
                                <span>${tab.site.category}</span>
                            </div>
                            <div class="info-item">
                                <label>Status</label>
                                <span class="status-active">● Aktif</span>
                            </div>
                            <div class="info-item">
                                <label>Protokol</label>
                                <span>FILE://</span>
                            </div>
                            <div class="info-item">
                                <label>Port</label>
                                <span>8080</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="site-info-section">
                        <h3>Preview Konten</h3>
                        <p style="color: var(--text-secondary); line-height: 1.8;">
                            Halaman utama <strong>${tab.site.name}</strong> akan ditampilkan di sini. 
                            File <code>index.html</code> dari folder ini berisi konten utama situs yang dapat diakses langsung.
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        overlay.classList.add('active');
    }

    // Close Tab
    closeTab(tabId) {
        this.tabs = this.tabs.filter(t => t.id !== tabId);
        
        if (this.tabs.length === 0) {
            this.activeTabId = null;
            document.getElementById('tabContentOverlay').classList.remove('active');
        } else if (this.activeTabId === tabId) {
            this.activeTabId = this.tabs[this.tabs.length - 1].id;
            this.showTabContent(this.activeTabId);
        }
        
        this.saveToStorage();
        this.renderTabs();
    }

    // Close All Tabs
    closeAllTabs() {
        this.tabs = [];
        this.activeTabId = null;
        document.getElementById('tabContentOverlay').classList.remove('active');
        this.saveToStorage();
        this.renderTabs();
    }

    // Close Active Tab Content
    closeActiveTabContent() {
        document.getElementById('tabContentOverlay').classList.remove('active');
    }

    // Open Index HTML
    openIndexHtml(path) {
        const indexPath = `${path}/index.html`;
        console.log('Membuka:', indexPath);
        alert(`Membuka file: ${indexPath}\n\n(Dalam implementasi nyata, file ini akan dibuka di viewer)`);
    }

    // Toggle Bookmark
    toggleBookmark(siteName) {
        const index = this.bookmarks.findIndex(b => b.name === siteName);
        
        if (index >= 0) {
            this.bookmarks.splice(index, 1);
        } else {
            const site = this.allSites.find(s => s.name === siteName);
            if (site) {
                this.bookmarks.push({
                    ...site,
                    bookmarkedAt: new Date().toISOString()
                });
            }
        }
        
        this.saveToStorage();
        this.renderTabs(); // Re-render to update button text
        if (this.activeTabId) this.showTabContent(this.activeTabId);
    }

    // Check if Bookmarked
    isBookmarked(siteName) {
        return this.bookmarks.some(b => b.name === siteName);
    }

    // Copy Path
    copyPath(path) {
        navigator.clipboard.writeText(path).then(() => {
            alert('Path disalin ke clipboard: ' + path);
        }).catch(err => {
            console.error('Gagal menyalin:', err);
        });
    }

    // Show Menu
    showMenu(menuType) {
        const overlay = document.getElementById('tabContentOverlay');
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        let content = '';
        
        switch(menuType) {
            case 'history':
                titleEl.textContent = '🕐 Riwayat';
                if (this.history.length === 0) {
                    content = '<div class="empty-state"><p>Belum ada riwayat</p></div>';
                } else {
                    content = `<ul class="history-list">
                        ${this.history.map(h => `
                            <li onclick="window.reberPencarian.openTab(${JSON.stringify(h.site).replace(/"/g, '&quot;')})">
                                <span>${h.site.icon} ${h.site.name}</span>
                                <small>${new Date(h.timestamp).toLocaleString('id-ID')}</small>
                            </li>
                        `).join('')}
                    </ul>`;
                }
                break;
                
            case 'bookmarks':
                titleEl.textContent = '⭐ Bookmark';
                if (this.bookmarks.length === 0) {
                    content = '<div class="empty-state"><p>Belum ada bookmark</p></div>';
                } else {
                    content = `<ul class="bookmarks-list">
                        ${this.bookmarks.map(b => `
                            <li onclick="window.reberPencarian.openTab(${JSON.stringify(b).replace(/"/g, '&quot;')})">
                                <span>${b.icon} ${b.name}</span>
                                <button class="action-btn secondary" onclick="event.stopPropagation(); window.reberPencarian.toggleBookmark('${b.name}')">Hapus</button>
                            </li>
                        `).join('')}
                    </ul>`;
                }
                break;
                
            case 'downloads':
                titleEl.textContent = '⬇️ Unduhan';
                content = '<div class="empty-state"><p>Belum ada unduhan</p></div>';
                break;
                
            case 'settings':
                titleEl.textContent = '⚙ Pengaturan';
                content = `
                    <div class="settings-panel">
                        <div class="setting-item">
                            <label>Jumlah Kolom Grid</label>
                            <div class="grid-selector">
                                ${[1,2,3,4,5,6,7,8,9,10].map(n => `
                                    <button class="grid-btn ${this.settings.gridColumns === n ? 'active' : ''}" 
                                            onclick="window.reberPencarian.setGridColumns(${n})">${n}</button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="setting-item">
                            <label>Tema</label>
                            <select class="theme-selector">
                                <option value="light">Terang (Default)</option>
                                <option value="dark">Gelap</option>
                                <option value="auto">Otomatis</option>
                            </select>
                        </div>
                    </div>
                `;
                break;
                
            case 'more':
                titleEl.textContent = '⋮ Opsi Lainnya';
                content = `
                    <div class="more-options">
                        <button class="action-btn secondary" onclick="window.reberPencarian.clearHistory()">
                            🗑️ Hapus Riwayat
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.exportBookmarks()">
                            📤 Export Bookmarks
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.importBookmarks()">
                            📥 Import Bookmarks
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.resetSettings()">
                            🔄 Reset Pengaturan
                        </button>
                    </div>
                `;
                break;
        }
        
        bodyEl.innerHTML = content;
        overlay.classList.add('active');
    }

    // Set Grid Columns
    setGridColumns(columns) {
        this.settings.gridColumns = columns;
        this.saveToStorage();
        this.updateSettingsUI();
        this.showMenu('settings');
    }

    // Update Settings UI
    updateSettingsUI() {
        const grid = document.getElementById('sitesGridMain');
        if (grid) {
            grid.style.gridTemplateColumns = `repeat(${this.settings.gridColumns}, 1fr)`;
        }
    }

    // Clear History
    clearHistory() {
        if (confirm('Yakin ingin menghapus semua riwayat?')) {
            this.history = [];
            this.saveToStorage();
            this.showMenu('history');
        }
    }

    // Export Bookmarks
    exportBookmarks() {
        const data = JSON.stringify(this.bookmarks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bookmarks.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import Bookmarks
    importBookmarks() {
        alert('Fitur import bookmarks akan tersedia segera.');
    }

    // Reset Settings
    resetSettings() {
        if (confirm('Yakin ingin mereset semua pengaturan?')) {
            this.settings = { gridColumns: 7 };
            this.saveToStorage();
            this.updateSettingsUI();
            this.showMenu('settings');
        }
    }

    // Perform Search
    performSearch() {
        const urlInput = document.getElementById('urlInput');
        const query = urlInput.value.trim().toLowerCase();
        
        if (!query) {
            this.renderSites(this.allSites);
        } else {
            const filtered = this.allSites.filter(site => 
                site.name.toLowerCase().includes(query) ||
                site.path.toLowerCase().includes(query) ||
                site.category.toLowerCase().includes(query)
            );
            this.renderSites(filtered);
        }
    }

    // Navigate
    navigate(action) {
        console.log('Navigate:', action);
        switch(action) {
            case 'back': /* Implement back */ break;
            case 'forward': /* Implement forward */ break;
            case 'refresh': location.reload(); break;
            case 'home': 
                this.tabs = [];
                this.activeTabId = null;
                this.renderTabs();
                document.getElementById('tabContentOverlay').classList.remove('active');
                break;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.reberPencarian = new ReberPencarian();
});

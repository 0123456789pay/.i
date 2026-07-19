// ReberPencarian.digital - Core JavaScript Functionality (Optimized v2.0)

class ReberPencarian {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.history = [];
        this.bookmarks = [];
        this.settings = { 
            gridColumns: 7, 
            itemsPerPage: 20,
            theme: 'light',
            enableFuzzySearch: true,
            enableSuggestions: true,
            maxHistoryItems: 100
        };
        this.allSites = [];
        
        // Search Engine View Properties
        this.currentQuery = '';
        this.currentResults = [];
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.isIndexing = false;
        this.currentFilter = 'all';
        this.navigationStack = [];
        this.navigationIndex = -1;
        
        // Tab System State - Full Width Tab System
        this.searchTabs = [{ id: 1, title: '🏠 Beranda - Situs Digital', query: '', results: [], isHome: true }];
        this.activeSearchTabId = 1;
        
        // Advanced Search Features
        this.searchSuggestions = [];
        this.recentSearches = [];
        this.searchFrequency = {};
        this.bookmarkTags = {};
        this.selectedItems = new Set();
        this.keyboardShortcutsEnabled = true;
        
        // Analytics Data
        this.analytics = {
            totalSearches: 0,
            popularQueries: [],
            lastSearchTime: null,
            averageResultsCount: 0
        };
        
        // Virtual Scrolling
        this.virtualScrollConfig = {
            itemHeight: 200,
            visibleItems: 20,
            scrollTop: 0
        };
        
        this.init();
    }

    async init() {
        await this.scanDigitalFolders();
        this.loadFromStorage();
        this.bindEvents();
        this.initAdvancedFeatures();
        // Render langsung ke search content frame (WebView) dengan tab system
        this.renderWebViewContent();
        this.renderSearchTabs();
        this.updateSettingsUI();
        this.setupKeyboardShortcuts();
        this.trackAnalytics('init');
    }

    // 1. Inisialisasi Fitur Lanjutan
    initAdvancedFeatures() {
        this.buildSearchIndex();
        this.generateSuggestions();
        this.loadBookmarkTags();
        this.calculateSearchFrequency();
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
            { name: 'visualisasireporting.digital', path: '/workspace/visualisasireporting.digital', category: 'tech', icon: '📊' },
            { name: 'Coder Qwen AI', path: 'https://coder.qwen.ai/', category: 'ai', icon: '🤖', isExternal: true, url: 'https://coder.qwen.ai/' }
        ];
        
        this.allSites = digitalFolders;
        
        // 2. Bangun indeks pencarian untuk performa lebih cepat
        this.buildSearchIndex();
    }

    // 2. Build Search Index (Inverted Index)
    buildSearchIndex() {
        this.searchIndex = new Map();
        
        this.allSites.forEach((site, index) => {
            // Index nama
            const nameTokens = site.name.toLowerCase().split(/[\s_]+/);
            nameTokens.forEach(token => {
                if (!this.searchIndex.has(token)) {
                    this.searchIndex.set(token, []);
                }
                this.searchIndex.get(token).push(index);
            });
            
            // Index kategori
            const categoryToken = site.category.toLowerCase();
            if (!this.searchIndex.has(categoryToken)) {
                this.searchIndex.set(categoryToken, []);
            }
            this.searchIndex.get(categoryToken).push(index);
            
            // Index path
            const pathTokens = site.path.toLowerCase().split('/');
            pathTokens.forEach(token => {
                if (token && !this.searchIndex.has(token)) {
                    this.searchIndex.set(token, []);
                }
                if (token) this.searchIndex.get(token).push(index);
            });
        });
        
        console.log('Indeks pencarian dibangun:', this.searchIndex.size, 'token');
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
        if (savedTags) this.bookmarkTags = JSON.parse(savedTags);
        if (savedAnalytics) this.analytics = { ...this.analytics, ...JSON.parse(savedAnalytics) };
        
        // Load recent searches for suggestions
        this.recentSearches = this.history.slice(0, 10).map(h => h.query || '').filter(q => q);
    }

    saveToStorage() {
        localStorage.setItem('reber_tabs', JSON.stringify(this.tabs));
        localStorage.setItem('reber_history', JSON.stringify(this.history));
        localStorage.setItem('reber_bookmarks', JSON.stringify(this.bookmarks));
        localStorage.setItem('reber_settings', JSON.stringify(this.settings));
        localStorage.setItem('reber_bookmark_tags', JSON.stringify(this.bookmarkTags));
        localStorage.setItem('reber_analytics', JSON.stringify(this.analytics));
    }

    bindEvents() {
        // Navigation Buttons
        document.getElementById('btnBack')?.addEventListener('click', () => this.navigate('back'));
        document.getElementById('btnForward')?.addEventListener('click', () => this.navigate('forward'));
        document.getElementById('btnRefresh')?.addEventListener('click', () => this.navigate('refresh'));
        // Tombol Home Active - Tampilkan Beranda Situs Digital
        document.getElementById('btnHomeActive')?.addEventListener('click', () => this.showHomeView());

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
        document.getElementById('btnMoreOptions')?.addEventListener('click', () => this.toggleMenuDropdown());

        // Dropdown close button
        document.getElementById('dropdownCloseBtn')?.addEventListener('click', () => this.hideMenuDropdown());

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('menuDropdown');
            const moreBtn = document.getElementById('btnMoreOptions');
            if (dropdown && moreBtn && !dropdown.contains(e.target) && e.target !== moreBtn) {
                this.hideMenuDropdown();
            }
        });

        // Menu dropdown item clicks
        document.querySelectorAll('.menu-dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.handleMenuAction(action);
                this.hideMenuDropdown();
            });
        });

        // Close All Tabs - Dinonaktifkan karena tab bar section telah dihapus
        // document.getElementById('closeAllTabs')?.addEventListener('click', () => this.closeAllTabs());

        // Close Tab Content Overlay
        document.getElementById('closeTabBtn')?.addEventListener('click', () => this.closeActiveTabContent());

        // Search Engine View - Query Action Buttons
        document.getElementById('btnClearQuery')?.addEventListener('click', () => this.clearQuery());
        document.getElementById('btnExportResults')?.addEventListener('click', () => this.exportResults());
        document.getElementById('btnRefreshIndex')?.addEventListener('click', () => this.refreshIndex());

        // Search Engine View - View Toggle Buttons
        document.getElementById('viewGrid')?.addEventListener('click', () => this.setViewMode('grid'));
        document.getElementById('viewList')?.addEventListener('click', () => this.setViewMode('list'));
        document.getElementById('viewCompact')?.addEventListener('click', () => this.setViewMode('compact'));

        // Search Engine View - Pagination Buttons
        document.getElementById('btnFirstPage')?.addEventListener('click', () => this.goToPage(1));
        document.getElementById('btnPrevPage')?.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        document.getElementById('btnNextPage')?.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        document.getElementById('btnLastPage')?.addEventListener('click', () => this.goToPage(this.getTotalPages()));

        // Filter Buttons - Jenis Domain
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.currentTarget.dataset.filter;
                this.setFilter(filterType);
            });
        });
    }

    // Render Sites Grid (untuk fallback)
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

    // Render ke Main Content Frame (WebView Full Screen)
    renderToMainContentFrame(sites = this.allSites) {
        const frame = document.getElementById('searchContentFrame');
        
        if (!frame) return;
        
        if (sites.length === 0) {
            frame.innerHTML = `
                <div class="iframe-placeholder">
                    <div class="placeholder-icon">🔍</div>
                    <h3>Tidak ada situs ditemukan</h3>
                    <p>Coba gunakan kata kunci pencarian lain</p>
                </div>
            `;
            return;
        }
        
        // Buat grid layout untuk kartu-kartu situs
        let html = `
            <div class="main-sites-grid">
        `;
        
        sites.forEach((site, index) => {
            const delay = index * 0.03;
            html += `
                <div class="main-site-card animate-fade-in" style="animation-delay: ${delay}s" data-path="${this.escapeHtml(site.path)}" data-name="${this.escapeHtml(site.name)}">
                    <div class="main-site-card-icon">${site.icon}</div>
                    <div class="main-site-card-name">${this.escapeHtml(site.name)}</div>
                    <div class="main-site-card-path">${this.escapeHtml(site.path)}</div>
                    <div class="main-site-card-category">${this.escapeHtml(site.category)}</div>
                    <div class="main-site-card-actions">
                        <button class="main-site-btn primary" onclick="window.reberPencarian.openIndexHtml('${this.escapeHtml(site.path)}')" title="Buka index.html">📄</button>
                        <button class="main-site-btn secondary" onclick="window.reberPencarian.showSiteDetail('${this.escapeHtml(site.name)}')" title="Lihat Detail">👁️</button>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        frame.innerHTML = html;
        
        // Bind click events untuk kartu
        setTimeout(() => {
            frame.querySelectorAll('.main-site-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Jangan trigger jika klik tombol aksi
                    if (e.target.closest('.main-site-btn')) return;
                    
                    const siteName = card.dataset.name;
                    const sitePath = card.dataset.path;
                    const site = sites.find(s => s.name === siteName);
                    if (site) {
                        this.openTab(site);
                    }
                });
            });
        }, 100);
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

    // Open Index HTML - Buka di Tab WebView
    openIndexHtml(path) {
        const indexPath = `${path}/index.html`;
        console.log('Membuka:', indexPath);
        
        // Buat search tab baru untuk menampilkan index.html
        const site = this.allSites.find(s => s.path === path);
        if (site) {
            const newTabId = Date.now();
            this.searchTabs.push({
                id: newTabId,
                title: `📄 ${site.name}`,
                query: '',
                results: [],
                isFileView: true,
                filePath: indexPath,
                site: site,
                isHome: false
            });
            this.activeSearchTabId = newTabId;
            this.renderSearchTabs();
            this.loadSearchTab(newTabId);
        } else {
            alert(`File tidak ditemukan: ${indexPath}`);
        }
    }
    
    // Load Search Tab Content - Support File View
    loadSearchTab(tabId) {
        const tab = this.searchTabs.find(t => t.id === tabId);
        if (!tab) return;

        if (tab.isExternalView && tab.externalUrl) {
            // Tampilkan URL eksternal dalam iframe
            const frame = document.getElementById('searchContentFrame');
            if (frame) {
                frame.innerHTML = `
                    <div class="external-viewer-container" style="height: 100%; display: flex; flex-direction: column;">
                        <div class="external-viewer-header" style="background: var(--gradient-blue); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                            <h3 style="margin: 0; font-size: 16px;">🔗 ${this.escapeHtml(tab.site.name)} - External URL</h3>
                            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${this.escapeHtml(tab.externalUrl)}</p>
                        </div>
                        <iframe src="${this.escapeHtml(tab.externalUrl)}" style="flex: 1; width: 100%; border: none; background: white;" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
                    </div>
                `;
            }
        } else if (tab.isFileView && tab.filePath) {
            // Tampilkan file index.html dalam frame
            const frame = document.getElementById('searchContentFrame');
            if (frame) {
                frame.innerHTML = `
                    <div class="file-viewer-container" style="height: 100%; display: flex; flex-direction: column;">
                        <div class="file-viewer-header" style="background: var(--gradient-blue); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                            <h3 style="margin: 0; font-size: 16px;">📄 ${this.escapeHtml(tab.site.name)} - index.html</h3>
                            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${this.escapeHtml(tab.filePath)}</p>
                        </div>
                        <iframe src="${this.escapeHtml(tab.filePath)}" style="flex: 1; width: 100%; border: none; background: white;" onload="console.log('File loaded:', this.src)"></iframe>
                    </div>
                `;
            }
        } else if (tab.query && tab.results.length > 0) {
            this.currentQuery = tab.query;
            this.currentResults = tab.results;
            this.renderResults();
        } else {
            this.clearSearchFrame();
        }
    }
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        titleEl.textContent = `📄 ${site.name} - index.html`;
        bodyEl.innerHTML = `
            <div class="file-viewer">
                <div class="file-viewer-header">
                    <h3>${filePath}</h3>
                    <p>Membuka file index.html dari folder ${site.name}</p>
                </div>
                <div class="file-viewer-content">
                    <iframe src="${filePath}" style="width: 100%; height: 100%; border: none; min-height: 600px;" onload="this.style.minHeight='600px'"></iframe>
                </div>
            </div>
        `;
        overlay.classList.add('active');
    }
    
    // Show Site Detail
    showSiteDetail(siteName) {
        const site = this.allSites.find(s => s.name === siteName);
        if (!site) return;
        
        const overlay = document.getElementById('tabContentOverlay');
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        titleEl.textContent = `${site.icon} ${site.name}`;
        bodyEl.innerHTML = `
            <div class="site-detail-view">
                <div class="site-detail-header">
                    <div class="site-detail-icon">${site.icon}</div>
                    <div class="site-detail-info">
                        <h2>${site.name}</h2>
                        <div class="site-detail-path">${site.path}</div>
                        <div class="site-detail-category">${site.category}</div>
                    </div>
                </div>
                
                <div class="site-detail-content">
                    <div class="site-action-buttons">
                        <button class="action-btn primary" onclick="window.reberPencarian.openIndexHtml('${site.path}')">
                            📄 Buka index.html
                        </button>
                        <button class="action-btn secondary" onclick="window.reberPencarian.toggleBookmark('${site.name}')">
                            ⭐ ${this.isBookmarked(site.name) ? 'Hapus Bookmark' : 'Tambah Bookmark'}
                        </button>
                        <button class="action-btn tertiary" onclick="window.reberPencarian.copyPath('${site.path}')">
                            📋 Salin Path
                        </button>
                    </div>
                    
                    <div class="site-info-section">
                        <h4>Informasi Situs</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Nama:</span>
                                <span class="info-value">${site.name}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Kategori:</span>
                                <span class="info-value">${site.category}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Path:</span>
                                <span class="info-value">${site.path}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Status:</span>
                                <span class="info-value ${this.isBookmarked(site.name) ? 'bookmarked' : ''}">${this.isBookmarked(site.name) ? '⭐ Dibookmark' : '○ Tidak dibookmark'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        overlay.classList.add('active');
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
                            <label>Jumlah Hasil Pencarian per Halaman</label>
                            <div class="grid-selector">
                                ${[20, 50, 100].map(n => `
                                    <button class="grid-btn ${this.itemsPerPage === n ? 'active' : ''}" 
                                            onclick="window.reberPencarian.setItemsPerPage(${n})">${n}</button>
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

    // Toggle Menu Dropdown (Small Modal)
    toggleMenuDropdown() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }

    // Hide Menu Dropdown
    hideMenuDropdown() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }

    // Handle Menu Action from Dropdown
    handleMenuAction(action) {
        switch(action) {
            case 'history':
                this.showMenu('history');
                break;
            case 'bookmarks':
                this.showMenu('bookmarks');
                break;
            case 'downloads':
                this.showMenu('downloads');
                break;
            case 'settings':
                this.showMenu('settings');
                break;
            case 'export':
                this.exportAllData();
                break;
            case 'import':
                this.importData();
                break;
            case 'help':
                this.showHelp();
                break;
            case 'about':
                this.showAbout();
                break;
        }
    }

    // Export All Data
    exportAllData() {
        const data = {
            tabs: this.tabs,
            history: this.history,
            bookmarks: this.bookmarks,
            settings: this.settings,
            exportedAt: new Date().toISOString()
        };
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reber_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import Data
    importData() {
        alert('Fitur import data akan tersedia segera.');
    }

    // Show Help
    showHelp() {
        const overlay = document.getElementById('tabContentOverlay');
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        titleEl.textContent = '❓ Bantuan';
        bodyEl.innerHTML = `
            <div class="help-content">
                <h3>Panduan Penggunaan ReberPencarian.digital</h3>
                <div class="help-section">
                    <h4>🔍 Pencarian</h4>
                    <p>Masukkan kata kunci di kolom pencarian untuk mencari situs dari daftar digital yang tersedia.</p>
                </div>
                <div class="help-section">
                    <h4>📑 Tab</h4>
                    <p>Klik pada kartu situs untuk membuka tab baru. Anda dapat membuka banyak tab sekaligus.</p>
                </div>
                <div class="help-section">
                    <h4>⭐ Bookmark</h4>
                    <p>Tambahkan situs ke bookmark untuk akses cepat.</p>
                </div>
                <div class="help-section">
                    <h4>⚙ Pengaturan</h4>
                    <p>Sesuaikan jumlah kolom grid dan preferensi lainnya.</p>
                </div>
            </div>
        `;
        overlay.classList.add('active');
    }

    // Show About
    showAbout() {
        const overlay = document.getElementById('tabContentOverlay');
        const titleEl = document.getElementById('tabContentTitle');
        const bodyEl = document.getElementById('tabContentBody');
        
        if (!overlay || !titleEl || !bodyEl) return;
        
        titleEl.textContent = 'ℹ️ Tentang';
        bodyEl.innerHTML = `
            <div class="about-content">
                <h3>ReberPencarian.digital</h3>
                <p class="version">Versi 1.0.0</p>
                <p>Mesin pencari universal untuk menelusuri berbagai folder digital dalam workspace.</p>
                <div class="about-features">
                    <h4>Fitur Utama:</h4>
                    <ul>
                        <li>🔍 Pencarian cepat di semua folder digital</li>
                        <li>📑 Manajemen tab multi-jendela</li>
                        <li>⭐ Sistem bookmark</li>
                        <li>📊 Tampilan hasil dalam 3 mode (Grid, List, Compact)</li>
                        <li>📤 Export/Import data</li>
                        <li>⚙ Pengaturan kustomisasi grid</li>
                    </ul>
                </div>
                <p class="copyright">&copy; 2025 ReberPencarian.digital</p>
            </div>
        `;
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
        
        // Update items per page selector jika ada
        const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
        if (itemsPerPageSelect) {
            itemsPerPageSelect.value = this.itemsPerPage;
        }
    }

    // Set Items Per Page
    setItemsPerPage(value) {
        this.itemsPerPage = parseInt(value);
        this.currentPage = 1;
        this.settings.itemsPerPage = this.itemsPerPage;
        this.saveToStorage();
        this.renderWebViewContent();
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
            this.itemsPerPage = 20;
            this.currentFilter = 'all';
            this.currentPage = 1;
            this.saveToStorage();
            this.updateSettingsUI();
            this.renderWebViewContent();
            this.showMenu('settings');
        }
    }

    // Perform Search - Updated with Search Engine View
    performSearch() {
        const urlInput = document.getElementById('urlInput');
        const query = urlInput.value.trim().toLowerCase();
        
        // Show search engine view
        this.showSearchEngineView();
        
        if (!query) {
            this.currentQuery = '';
            this.currentResults = [];
            this.renderSites(this.allSites);
            this.updateSearchEngineStats();
            this.showPlaceholder();
            this.clearSearchFrame();
        } else {
            this.currentQuery = query;
            this.currentResults = this.allSites.filter(site => 
                site.name.toLowerCase().includes(query) ||
                site.path.toLowerCase().includes(query) ||
                site.category.toLowerCase().includes(query)
            );
            
            this.renderSites(this.currentResults);
            this.updateSearchEngineStats();
            this.updateSearchTabTitle(query);
            this.saveResultsToTab(this.currentResults);
            this.renderResults();
            this.renderWebViewContent();
        }
    }

    // Show Search Engine View
    showSearchEngineView() {
        const viewSection = document.getElementById('searchEngineView');
        if (viewSection) {
            viewSection.classList.add('active');
        }
    }

    // Hide Search Engine View
    hideSearchEngineView() {
        const viewSection = document.getElementById('searchEngineView');
        if (viewSection) {
            viewSection.classList.remove('active');
        }
    }

    // Update Search Engine Stats
    updateSearchEngineStats() {
        document.getElementById('totalIndexed').textContent = this.allSites.length;
        document.getElementById('totalResults').textContent = this.currentResults.length;
        document.getElementById('activeQuery').textContent = this.currentQuery || '-';
        document.getElementById('currentQueryText').textContent = this.currentQuery || 'Tidak ada query aktif';
    }

    // Render Results in Search Engine View
    renderResults() {
        const placeholder = document.getElementById('resultsPlaceholder');
        const gridView = document.getElementById('resultsGridView');
        const listView = document.getElementById('resultsListView');
        const compactView = document.getElementById('resultsCompactView');
        const paginationControls = document.getElementById('paginationControls');

        if (this.currentResults.length === 0) {
            this.showPlaceholder();
            return;
        }

        placeholder.style.display = 'none';
        paginationControls.style.display = 'flex';

        // Get current page items
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageItems = this.currentResults.slice(startIndex, endIndex);

        // Clear all views
        gridView.innerHTML = '';
        listView.innerHTML = '';
        compactView.innerHTML = '';

        // Render based on current view mode
        if (this.currentView === 'grid') {
            gridView.style.display = 'grid';
            listView.style.display = 'none';
            compactView.style.display = 'none';
            pageItems.forEach((site, index) => {
                const card = this.createResultCard(site, startIndex + index);
                gridView.appendChild(card);
            });
        } else if (this.currentView === 'list') {
            gridView.style.display = 'none';
            listView.style.display = 'block';
            compactView.style.display = 'none';
            pageItems.forEach((site, index) => {
                const item = this.createResultListItem(site, startIndex + index);
                listView.appendChild(item);
            });
        } else if (this.currentView === 'compact') {
            gridView.style.display = 'none';
            listView.style.display = 'none';
            compactView.style.display = 'block';
            pageItems.forEach((site, index) => {
                const item = this.createResultCompactItem(site, startIndex + index);
                compactView.appendChild(item);
            });
        }

        this.updatePagination();
    }

    // Create Result Card for Grid View
    createResultCard(site, index) {
        const card = document.createElement('div');
        card.className = 'result-card animate-fade-in';
        card.style.animationDelay = `${index * 0.03}s`;
        card.innerHTML = `
            <div class="result-card-header">
                <div class="result-card-icon">${site.icon}</div>
                <div class="result-card-title">${this.highlightMatch(site.name, this.currentQuery)}</div>
            </div>
            <div class="result-card-path">${site.path}</div>
            <div class="result-card-category">${site.category}</div>
            <div class="result-card-match">
                <span class="match-highlight">Cocok: ${this.getMatchType(site)}</span>
            </div>
        `;
        card.addEventListener('click', () => this.openTab(site));
        return card;
    }

    // Create Result List Item for List View
    createResultListItem(site, index) {
        const item = document.createElement('div');
        item.className = 'result-list-item animate-fade-in';
        item.style.animationDelay = `${index * 0.02}s`;
        item.innerHTML = `
            <div class="result-list-icon">${site.icon}</div>
            <div class="result-list-content">
                <div class="result-list-title">${this.highlightMatch(site.name, this.currentQuery)}</div>
                <div class="result-list-path">${site.path}</div>
            </div>
            <div class="result-list-meta">
                <span class="result-list-category">${site.category}</span>
            </div>
        `;
        item.addEventListener('click', () => this.openTab(site));
        return item;
    }

    // Create Result Compact Item for Compact View
    createResultCompactItem(site, index) {
        const item = document.createElement('div');
        item.className = 'result-compact-item animate-fade-in';
        item.style.animationDelay = `${index * 0.01}s`;
        item.innerHTML = `
            <div class="result-compact-icon">${site.icon}</div>
            <div class="result-compact-name">${this.highlightMatch(site.name, this.currentQuery)}</div>
            <div class="result-compact-category">${site.category}</div>
        `;
        item.addEventListener('click', () => this.openTab(site));
        return item;
    }

    // Highlight Match in Text
    highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="match-highlight">$1</mark>');
    }

    // Get Match Type
    getMatchType(site) {
        const query = this.currentQuery.toLowerCase();
        if (site.name.toLowerCase().includes(query)) return 'Nama';
        if (site.path.toLowerCase().includes(query)) return 'Path';
        if (site.category.toLowerCase().includes(query)) return 'Kategori';
        return 'Umum';
    }

    // Show Placeholder
    showPlaceholder() {
        const placeholder = document.getElementById('resultsPlaceholder');
        const gridView = document.getElementById('resultsGridView');
        const listView = document.getElementById('resultsListView');
        const compactView = document.getElementById('resultsCompactView');
        const paginationControls = document.getElementById('paginationControls');

        placeholder.style.display = 'flex';
        gridView.style.display = 'none';
        listView.style.display = 'none';
        compactView.style.display = 'none';
        paginationControls.style.display = 'none';
    }

    // Set View Mode
    setViewMode(mode) {
        this.currentView = mode;
        
        // Update button states
        document.querySelectorAll('.activity-control-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${mode}"]`)?.classList.add('active');
        
        this.renderResults();
    }

    // Get Total Pages
    getTotalPages() {
        return Math.ceil(this.currentResults.length / this.itemsPerPage) || 1;
    }

    // Go to Page
    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderResults();
    }

    // Update Pagination Controls
    updatePagination() {
        const totalPages = this.getTotalPages();
        document.getElementById('pageInfo').textContent = `Halaman ${this.currentPage} dari ${totalPages}`;
        
        document.getElementById('btnFirstPage').disabled = this.currentPage === 1;
        document.getElementById('btnPrevPage').disabled = this.currentPage === 1;
        document.getElementById('btnNextPage').disabled = this.currentPage === totalPages;
        document.getElementById('btnLastPage').disabled = this.currentPage === totalPages;
    }

    // Clear Query
    clearQuery() {
        document.getElementById('urlInput').value = '';
        this.currentQuery = '';
        this.currentResults = [];
        this.currentPage = 1;
        this.updateSearchEngineStats();
        this.showPlaceholder();
        this.renderSites(this.allSites);
    }

    // Export Results
    exportResults() {
        if (this.currentResults.length === 0) {
            alert('Tidak ada hasil untuk diekspor');
            return;
        }
        
        const data = JSON.stringify(this.currentResults, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hasil_pencarian_${this.currentQuery || 'semua'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Refresh Index
    refreshIndex() {
        this.isIndexing = true;
        this.updateIndexProgress(0, 'Mengindeks...');
        
        // Simulate indexing progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            this.updateIndexProgress(progress, 'Mengindeks...');
            
            if (progress >= 100) {
                clearInterval(interval);
                this.isIndexing = false;
                this.updateIndexProgress(100, 'Siap');
                
                // Re-render results
                if (this.currentQuery) {
                    this.renderResults();
                }
                
                alert('Indeks berhasil disegarkan!');
            }
        }, 100);
    }

    // Update Index Progress
    updateIndexProgress(percentage, status) {
        document.getElementById('indexProgressFill').style.width = `${percentage}%`;
        document.getElementById('indexStatus').textContent = status;
        document.getElementById('indexPercentage').textContent = `${percentage}%`;
    }

    // ===== Search Tabs Management (Full Width Tab System) =====
    
    // Open new search tab with site parameter - Opens in new tab
    openNewSearchTab(site = null) {
        const newId = Date.now();
        let title = '🏠 Beranda - Situs Digital';
        let isHome = true;
        
        if (site) {
            title = `📄 ${site.name}`;
            isHome = false;
        }
        
        this.searchTabs.push({
            id: newId,
            title: title,
            query: '',
            results: [],
            isHome: isHome,
            site: site || null
        });
        this.activeSearchTabId = newId;
        this.renderSearchTabs();
        this.loadSearchTab(newId);
    }

    // Close search tab
    closeSearchTab(event, tabId) {
        event.stopPropagation();
        if (this.searchTabs.length === 1) {
            // Reset last tab to home instead of closing
            this.searchTabs[0] = { id: 1, title: '🏠 Beranda - Situs Digital', query: '', results: [], isHome: true };
            this.activeSearchTabId = 1;
            this.renderWebViewContent();
        } else {
            const index = this.searchTabs.findIndex(t => t.id === tabId);
            if (index > -1) {
                this.searchTabs.splice(index, 1);
                // If closing active tab, switch to previous or first tab
                if (this.activeSearchTabId === tabId) {
                    const newIndex = Math.max(0, index - 1);
                    this.activeSearchTabId = this.searchTabs[newIndex].id;
                }
            }
        }
        this.renderSearchTabs();
        this.loadSearchTab(this.activeSearchTabId);
    }

    // Switch search tab
    switchSearchTab(tabId) {
        this.activeSearchTabId = tabId;
        this.renderSearchTabs();
        this.loadSearchTab(tabId);
    }

    // Render search tabs with proper active state
    renderSearchTabs() {
        const container = document.getElementById('searchTabsContainer');
        if (!container) return;
        
        let html = '';
        this.searchTabs.forEach(tab => {
            const isActive = tab.id === this.activeSearchTabId ? 'active' : '';
            html += `
                <div class="tab ${isActive}" data-id="${tab.id}" onclick="window.reberPencarian.switchSearchTab(${tab.id})">
                    <span class="tab-title">${this.escapeHtml(tab.title)}</span>
                    <span class="tab-close" onclick="window.reberPencarian.closeSearchTab(event, ${tab.id})">&times;</span>
                </div>
            `;
        });
        html += '<button class="new-tab-btn" onclick="window.reberPencarian.openNewSearchTab()" title="Tab Baru">+</button>';
        container.innerHTML = html;
    }

    // Load search tab content - Support home view, file view, and search results
    loadSearchTab(tabId) {
        const tab = this.searchTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        const frame = document.getElementById('searchContentFrame');
        if (!frame) return;
        
        if (tab.isFileView && tab.filePath) {
            // Tampilkan file index.html dalam frame
            frame.innerHTML = `
                <div class="file-viewer-container" style="height: 100%; display: flex; flex-direction: column;">
                    <div class="file-viewer-header" style="background: var(--gradient-blue); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h3 style="margin: 0; font-size: 16px;">📄 ${this.escapeHtml(tab.site.name)} - index.html</h3>
                        <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${this.escapeHtml(tab.filePath)}</p>
                    </div>
                    <iframe src="${this.escapeHtml(tab.filePath)}" style="flex: 1; width: 100%; border: none; background: white;" onload="console.log('File loaded:', this.src)"></iframe>
                </div>
            `;
        } else if (tab.isHome) {
            // Render home view with site cards grid
            this.renderWebViewContent();
        } else if (tab.query && tab.results.length > 0) {
            // Render search results
            this.currentQuery = tab.query;
            this.currentResults = tab.results;
            this.renderResults();
        } else {
            // Default to home view
            this.renderWebViewContent();
        }
    }

    // Clear search frame
    clearSearchFrame() {
        const frame = document.getElementById('searchContentFrame');
        if (frame) {
            frame.innerHTML = `
                <div class="iframe-placeholder">
                    <i class="fas fa-search">🔎</i>
                    <h3>Hasil Pencarian</h3>
                    <p>Masukkan kata kunci untuk melihat hasil indeks</p>
                </div>
            `;
        }
        this.currentQuery = '';
        this.currentResults = [];
        this.updateQueryDisplay();
    }

    // Update search tab title with query
    updateSearchTabTitle(query) {
        const tab = this.searchTabs.find(t => t.id === this.activeSearchTabId);
        if (tab) {
            tab.title = query.length > 20 ? query.substring(0, 20) + '...' : query;
            tab.query = query;
            tab.isHome = false;
            this.renderSearchTabs();
        }
    }

    // Save results to current tab
    saveResultsToTab(results) {
        const tab = this.searchTabs.find(t => t.id === this.activeSearchTabId);
        if (tab) {
            tab.results = results;
        }
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render WebView Content - Menampilkan grid kartu situs di dalam tab (Home View) dengan filter dan pagination
    renderWebViewContent(sites = null, isDetailView = false, detailData = null) {
        const frame = document.getElementById('searchContentFrame');
        if (!frame) return;
        
        // Jika ini tampilan detail (setelah klik "Lihat Detail")
        if (isDetailView && detailData) {
            this.navigationStack.push({ type: 'home', sites: sites || this.allSites });
            this.navigationIndex++;
            
            let html = `
                <div class="site-detail-view" style="padding: 30px;">
                    <div class="site-detail-header">
                        <button class="back-btn" onclick="window.reberPencarian.navigateBack()" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: var(--gradient-blue); color: white; border: none; border-radius: 50px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-arrow-left"></i> Kembali
                        </button>
                    </div>
                    <div class="site-detail-content">
                        <div class="site-detail-icon">${detailData.icon}</div>
                        <h2 class="site-detail-name">${this.escapeHtml(detailData.name)}</h2>
                        <p class="site-detail-path">${this.escapeHtml(detailData.path)}</p>
                        <span class="site-detail-category">${this.escapeHtml(detailData.category)}</span>
                        <div class="site-detail-description">
                            <h4>Deskripsi Singkat:</h4>
                            <p>${detailData.description || 'Tidak ada deskripsi tersedia.'}</p>
                        </div>
                        <div class="site-detail-actions">
                            <button class="detail-action-btn primary" onclick="window.reberPencarian.openIndexHtml('${this.escapeHtml(detailData.path)}')">
                                <i class="fas fa-external-link-alt"></i> Buka Situs
                            </button>
                        </div>
                    </div>
                </div>
            `;
            frame.innerHTML = html;
            this.updateResultsInfo(1);
            return;
        }
        
        // Filter situs berdasarkan tipe domain
        let displaySites = sites || this.allSites;
        if (this.currentFilter !== 'all') {
            displaySites = this.filterSitesByType(displaySites);
        }
        
        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedSites = displaySites.slice(startIndex, endIndex);
        
        // Render home view with all sites grid
        let html = '<div class="main-sites-grid">';
        
        paginatedSites.forEach((site, index) => {
            const delay = index * 0.03;
            html += `\n                <div class="main-site-card animate-fade-in" style="animation-delay: ${delay}s" data-name="${this.escapeHtml(site.name)}" data-path="${this.escapeHtml(site.path)}">\n                    <div class="main-site-card-icon">${site.icon}</div>\n                    <div class="main-site-card-name">${this.escapeHtml(site.name)}</div>\n                    <div class="main-site-card-path">${this.escapeHtml(site.path)}</div>\n                    <div class="main-site-card-category">${this.escapeHtml(site.category)}</div>\n                    <div class="main-site-card-actions">\n                        <button class="main-site-btn primary" onclick="window.reberPencarian.openIndexHtml('${this.escapeHtml(site.path)}')" title="Buka index.html"><i class="fas fa-external-link-alt"></i></button>\n                        <button class="main-site-btn secondary" onclick="window.reberPencarian.showSiteDetailInTab('${this.escapeHtml(site.name)}')" title="Lihat Detail"><i class="fas fa-eye"></i></button>\n                    </div>\n                </div>\n            `;
        });
        
        html += '</div>';
        
        // Tambahkan pagination controls jika lebih dari 1 halaman
        const totalPages = Math.ceil(displaySites.length / this.itemsPerPage);
        if (totalPages > 1) {
            html += `\n                <div class="pagination-controls" style="display: flex; justify-content: center; gap: 8px; padding: 20px; align-items: center;">\n                    <button class="filter-btn" onclick="window.reberPencarian.goToPage(1)" ${this.currentPage === 1 ? 'disabled' : ''}><i class="fas fa-angle-double-left"></i></button>\n                    <button class="filter-btn" onclick="window.reberPencarian.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i></button>\n                    <span style="font-weight: 600; color: var(--text-primary);">Halaman ${this.currentPage} dari ${totalPages}</span>\n                    <button class="filter-btn" onclick="window.reberPencarian.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-angle-right"></i></button>\n                    <button class="filter-btn" onclick="window.reberPencarian.goToPage(${totalPages})" ${this.currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-angle-double-right"></i></button>\n                </div>\n            `;
        }
        
        frame.innerHTML = html;
        this.updateResultsInfo(displaySites.length);
        
        // Bind click events untuk kartu - Buka tab baru dengan judul situs
        setTimeout(() => {
            frame.querySelectorAll('.main-site-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Jangan trigger jika klik tombol aksi
                    if (e.target.closest('.main-site-btn')) return;
                    
                    const siteName = card.dataset.name;
                    const site = this.allSites.find(s => s.name === siteName);
                    if (site) {
                        // Buka tab baru dengan judul otomatis dari nama situs
                        window.reberPencarian.openNewSearchTab(site);
                    }
                });
            });
        }, 100);
    }

    // Filter situs berdasarkan tipe domain
    filterSitesByType(sites) {
        return sites.filter(site => {
            const category = site.category.toLowerCase();
            const name = site.name.toLowerCase();
            
            switch(this.currentFilter) {
                case 'text':
                    return category === 'tech' || category === 'config' || category === 'education';
                case 'image':
                    return category === 'creative' || category === 'media' || category === 'desain';
                case 'video':
                    return category === 'media' || name.includes('video') || name.includes('stream');
                case 'movie':
                    return name.includes('film') || name.includes('movie') || category === 'entertainment';
                case 'shopping':
                    return category === 'business' || category === 'ecommerce' || name.includes('shop') || name.includes('store');
                default:
                    return true;
            }
        });
    }

    // Set filter dan reset ke halaman pertama
    setFilter(filterType) {
        this.currentFilter = filterType;
        this.currentPage = 1;
        
        // Update UI tombol filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filterType) {
                btn.classList.add('active');
            }
        });
        
        this.renderWebViewContent();
    }

    // Update info jumlah hasil
    updateResultsInfo(count) {
        const infoEl = document.getElementById('resultsCountInfo');
        if (infoEl) {
            infoEl.textContent = `Menampilkan ${count} hasil`;
        }
    }

    // Navigate Back - Kembali ke tampilan sebelumnya
    navigateBack() {
        if (this.navigationStack.length > 0) {
            const prevState = this.navigationStack.pop();
            this.navigationIndex--;
            this.renderWebViewContent(prevState.sites, false, null);
        } else {
            this.renderWebViewContent();
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
                this.hideSearchEngineView();
                this.renderTabs();
                document.getElementById('tabContentOverlay').classList.remove('active');
                break;
        }
    }

    // Show Home View - Tampilkan Beranda dengan kartu-kartu situs .digital
    showHomeView() {
        const frame = document.getElementById('searchContentFrame');
        if (!frame) return;
        
        // Reset ke tampilan beranda dengan semua situs menggunakan renderWebViewContent
        this.renderWebViewContent();
        
        // Update tab title untuk tab aktif
        const activeTab = this.searchTabs.find(t => t.id === this.activeSearchTabId);
        if (activeTab) {
            activeTab.title = '🏠 Beranda - Situs Digital';
            activeTab.isHome = true;
            activeTab.site = null;
            this.renderSearchTabs();
        }
        
        // Scroll to top
        frame.scrollTop = 0;
    }
    
    // Show Site Detail in Tab - Tampilkan detail situs dengan deskripsi singkat
    showSiteDetailInTab(siteName) {
        const site = this.allSites.find(s => s.name === siteName);
        if (!site) return;
        
        // Tambahkan deskripsi singkat berdasarkan kategori
        const descriptions = {
            'ai': 'Platform kecerdasan buatan dan pembelajaran mesin untuk otomatisasi cerdas.',
            'tech': 'Teknologi dan solusi digital untuk kebutuhan modern.',
            'business': 'Solusi bisnis dan startup untuk pertumbuhan perusahaan.',
            'media': 'Konten media dan hiburan digital berkualitas tinggi.',
            'education': 'Sumber daya pendidikan dan pelatihan online.',
            'health': 'Layanan kesehatan digital dan telemedisin.',
            'finance': 'Layanan keuangan dan perbankan digital.',
            'security': 'Keamanan siber dan perlindungan data.',
            'config': 'Konfigurasi sistem dan pengaturan teknis.',
            'creative': 'Desain kreatif dan konten visual.',
            'infrastructure': 'Infrastruktur cloud dan jaringan.',
            'default': 'Situs digital terpercaya dengan berbagai layanan unggulan.'
        };
        
        const description = descriptions[site.category] || descriptions['default'];
        site.description = description;
        
        // Render tampilan detail
        this.renderWebViewContent(null, true, site);
    }

    // Open External URL - Membuka URL eksternal (seperti coder.qwen.ai) dalam iframe
    openExternalUrl(url) {
        const site = this.allSites.find(s => s.url === url);
        if (site) {
            const newTabId = Date.now();
            this.searchTabs.push({
                id: newTabId,
                title: `🔗 ${site.name}`,
                query: '',
                results: [],
                isExternalView: true,
                externalUrl: url,
                site: site,
                isHome: false
            });
            this.activeSearchTabId = newTabId;
            this.renderSearchTabs();
            this.loadSearchTab(newTabId);
        } else {
            // Fallback untuk URL yang tidak ada di allSites
            const newTabId = Date.now();
            this.searchTabs.push({
                id: newTabId,
                title: `🔗 External URL`,
                query: '',
                results: [],
                isExternalView: true,
                externalUrl: url,
                site: { name: 'External Site', icon: '🌐' },
                isHome: false
            });
            this.activeSearchTabId = newTabId;
            this.renderSearchTabs();
            this.loadSearchTab(newTabId);
        }
    }

    // 3. Generate Search Suggestions
    generateSuggestions() {
        this.searchSuggestions = [
            ...new Set([
                ...this.allSites.map(s => s.name.toLowerCase()),
                ...this.allSites.map(s => s.category.toLowerCase()),
                ...this.recentSearches
            ])
        ].slice(0, 50);
    }

    // 4. Load Bookmark Tags
    loadBookmarkTags() {
        this.bookmarks.forEach(bookmark => {
            const tag = bookmark.category || 'general';
            if (!this.bookmarkTags[tag]) {
                this.bookmarkTags[tag] = [];
            }
            this.bookmarkTags[tag].push(bookmark.name);
        });
    }

    // 5. Calculate Search Frequency
    calculateSearchFrequency() {
        this.history.forEach(item => {
            const query = item.query || '';
            if (query) {
                this.searchFrequency[query] = (this.searchFrequency[query] || 0) + 1;
            }
        });
    }

    // 6. Setup Keyboard Shortcuts
    setupKeyboardShortcuts() {
        if (!this.keyboardShortcutsEnabled) return;

        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('urlInput')?.focus();
            }
            
            // Ctrl + H: History
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.showMenu('history');
            }
            
            // Ctrl + D: Add bookmark
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                // Add current site to bookmarks
            }
            
            // Escape: Close overlays
            if (e.key === 'Escape') {
                document.getElementById('tabContentOverlay')?.classList.remove('active');
                this.hideMenuDropdown();
            }
            
            // F5: Refresh
            if (e.key === 'F5') {
                e.preventDefault();
                this.navigate('refresh');
            }
        });
    }

    // 7. Track Analytics
    trackAnalytics(event, data = {}) {
        switch(event) {
            case 'search':
                this.analytics.totalSearches++;
                this.analytics.lastSearchTime = new Date().toISOString();
                this.updatePopularQueries(data.query);
                break;
            case 'init':
                console.log('Analytics initialized');
                break;
        }
        this.saveToStorage();
    }

    // Update Popular Queries
    updatePopularQueries(query) {
        const existingIndex = this.analytics.popularQueries.findIndex(pq => pq.query === query);
        
        if (existingIndex >= 0) {
            this.analytics.popularQueries[existingIndex].count++;
        } else {
            this.analytics.popularQueries.push({ query, count: 1 });
        }
        
        // Sort by count and keep top 10
        this.analytics.popularQueries.sort((a, b) => b.count - a.count);
        this.analytics.popularQueries = this.analytics.popularQueries.slice(0, 10);
    }

    // 8. Fuzzy Search Implementation
    fuzzySearch(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        this.allSites.forEach(site => {
            let score = 0;
            
            // Exact match
            if (site.name.toLowerCase() === lowerQuery) score += 100;
            // Starts with
            if (site.name.toLowerCase().startsWith(lowerQuery)) score += 50;
            // Contains
            if (site.name.toLowerCase().includes(lowerQuery)) score += 20;
            // Category match
            if (site.category.toLowerCase().includes(lowerQuery)) score += 15;
            // Path contains
            if (site.path.toLowerCase().includes(lowerQuery)) score += 10;
            
            // Levenshtein-like partial match scoring
            const nameTokens = site.name.toLowerCase().split(/[\s_]+/);
            nameTokens.forEach(token => {
                if (token.startsWith(lowerQuery)) score += 5;
                if (token.includes(lowerQuery)) score += 2;
            });
            
            if (score > 0) {
                results.push({ ...site, score });
            }
        });
        
        return results.sort((a, b) => b.score - a.score);
    }

    // 9. Advanced Search with Index
    advancedSearch(query) {
        const tokens = query.toLowerCase().split(/[\s_]+/).filter(t => t.length > 0);
        const resultIndices = new Set();
        
        tokens.forEach(token => {
            // Direct index lookup
            for (const [key, indices] of this.searchIndex.entries()) {
                if (key.includes(token) || token.includes(key)) {
                    indices.forEach(idx => resultIndices.add(idx));
                }
            }
        });
        
        // Convert indices to site objects
        const results = Array.from(resultIndices).map(idx => this.allSites[idx]);
        
        // If no index results, fallback to fuzzy search
        if (results.length === 0) {
            return this.fuzzySearch(query);
        }
        
        return results;
    }

    // 10. Virtual Scroll Rendering
    renderVirtualScroll(container, items) {
        const containerEl = document.getElementById(container);
        if (!containerEl) return;
        
        const totalHeight = items.length * this.virtualScrollConfig.itemHeight;
        containerEl.style.height = `${totalHeight}px`;
        containerEl.style.position = 'relative';
        containerEl.style.overflowY = 'auto';
        
        const renderVisibleItems = () => {
            const scrollTop = containerEl.scrollTop;
            const startIndex = Math.floor(scrollTop / this.virtualScrollConfig.itemHeight);
            const endIndex = Math.min(
                startIndex + this.virtualScrollConfig.visibleItems,
                items.length
            );
            
            // Render only visible items
            let html = '';
            for (let i = startIndex; i < endIndex; i++) {
                const item = items[i];
                const top = i * this.virtualScrollConfig.itemHeight;
                html += `<div class=\"virtual-item\" style=\"position: absolute; top: ${top}px; height: ${this.virtualScrollConfig.itemHeight}px;\">
                    ${item.name}
                </div>`;
            }
            
            containerEl.innerHTML = html;
        };
        
        containerEl.addEventListener('scroll', renderVisibleItems);
        renderVisibleItems();
    }

    // 11. Debounce Function for Search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 12. Show Search Suggestions Dropdown
    showSearchSuggestions(query) {
        const suggestions = this.searchSuggestions
            .filter(s => s.includes(query.toLowerCase()))
            .slice(0, 8);
        
        // Show suggestions UI (to be implemented in HTML)
        console.log('Suggestions:', suggestions);
        return suggestions;
    }

    // 13. Multi-Select Items
    toggleItemSelection(index) {
        if (this.selectedItems.has(index)) {
            this.selectedItems.delete(index);
        } else {
            this.selectedItems.add(index);
        }
        this.renderSelectionUI();
    }

    // Render Selection UI
    renderSelectionUI() {
        const count = this.selectedItems.size;
        const actionPanel = document.getElementById('selectionActionPanel');
        if (actionPanel) {
            actionPanel.style.display = count > 0 ? 'flex' : 'none';
            actionPanel.querySelector('.selected-count').textContent = count;
        }
    }

    // 14. Batch Operations
    batchDeleteSelected() {
        if (this.selectedItems.size === 0) return;
        
        if (confirm(`Hapus ${this.selectedItems.size} item yang dipilih?`)) {
            // Implement batch delete logic
            this.selectedItems.clear();
            this.renderSelectionUI();
        }
    }

    batchBookmarkSelected() {
        if (this.selectedItems.size === 0) return;
        
        this.selectedItems.forEach(index => {
            const site = this.currentResults[index] || this.allSites[index];
            if (site && !this.isBookmarked(site.name)) {
                this.bookmarks.push(site);
            }
        });
        
        this.saveToStorage();
        this.selectedItems.clear();
        this.renderSelectionUI();
        alert(`${this.selectedItems.size} item ditambahkan ke bookmark`);
    }

    // 15. Export Selected Items
    exportSelectedItems() {
        if (this.selectedItems.size === 0) {
            alert('Tidak ada item yang dipilih');
            return;
        }
        
        const selectedData = Array.from(this.selectedItems).map(index => {
            return this.currentResults[index] || this.allSites[index];
        }).filter(Boolean);
        
        const jsonData = JSON.stringify(selectedData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `selected_items_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.selectedItems.clear();
        this.renderSelectionUI();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.reberPencarian = new ReberPencarian();
});

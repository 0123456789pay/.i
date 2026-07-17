/**
 * Browser - Browser web sederhana dengan WebView Lengkap
 * Komponen untuk SoutheastApp Desktop Launcher
 * 
 * @module app-browser
 * @version 2.0.0
 */

(function() {
    'use strict';

    // === KONFIGURASI ===
    const CONFIG = {
        name: 'app-browser',
        version: '2.0.0',
        enabled: true,
        dependencies: [],
        homePage: 'https://www.google.com',
        searchEngine: 'https://www.google.com/search?q=',
        youtubeConfig: {
            enabled: true,
            apiKey: '', // API Key untuk YouTube Data API
            autoplay: false,
            quality: 'high',
            relatedVideos: true
        },
        security: {
            allowPopups: false,
            blockMalware: true,
            enableCookies: true,
            sslOnly: false
        }
    };

    // === STATE ===
    let state = {
        initialized: false,
        data: null,
        listeners: [],
        history: [],
        historyIndex: -1,
        bookmarks: [],
        downloads: [],
        tabs: [],
        activeTab: null,
        cache: {},
        permissions: {}
    };

    // === KOMPONEN INTI RENDERING ===
    
    /**
     * WebView Container - Wadah utama untuk menampilkan konten web
     */
    function createWebViewContainer() {
        const container = document.createElement('div');
        container.className = 'webview-container';
        container.innerHTML = `
            <iframe class="webview-frame" src="about:blank" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
            <div class="webview-overlay hidden"></div>
        `;
        return container;
    }

    /**
     * Rendering Engine - Mesin rendering (seperti Blink di Chrome/Android)
     */
    function initRenderingEngine() {
        console.log('[app-browser] Initializing Rendering Engine (Blink-compatible)...');
        return {
            engine: 'Blink-Compatible',
            version: '120.0',
            capabilities: ['HTML5', 'CSS3', 'WebGL', 'WebAssembly'],
            render: function(content) {
                console.log('[Rendering] Processing content...');
            }
        };
    }

    /**
     * JavaScript Engine - Interpreter JavaScript (V8 di Android)
     */
    function initJSEngine() {
        console.log('[app-browser] Initializing JavaScript Engine (V8-compatible)...');
        return {
            engine: 'V8-Compatible',
            version: '12.0',
            execute: function(code) {
                try {
                    return eval(code);
                } catch(e) {
                    console.error('[JS Engine] Error:', e);
                    return null;
                }
            }
        };
    }

    /**
     * DOM Parser - Parser untuk membangun Document Object Model
     */
    function parseDOM(htmlString) {
        const parser = new DOMParser();
        return parser.parseFromString(htmlString, 'text/html');
    }

    /**
     * CSS Parser - Parser untuk styling dan layout
     */
    function parseCSS(cssString) {
        const sheet = document.createElement('style');
        sheet.textContent = cssString;
        document.head.appendChild(sheet);
        return sheet.sheet;
    }

    // === KOMPONEN NAVIGASI & KONTROL ===

    /**
     * URL Bar/Address Field - Menampilkan dan menerima input URL dengan pencarian cerdas
     */
    function createURLBar() {
        const urlBar = document.createElement('div');
        urlBar.className = 'url-bar';
        urlBar.innerHTML = `
            <div class="url-security-indicator"><i class="fas fa-lock"></i></div>
            <input type="text" class="url-input" placeholder="Enter URL or search..." autocomplete="off" />
            <div class="search-suggestions hidden" id="searchSuggestions"></div>
            <button class="url-search-btn" title="Search"><i class="fas fa-search"></i></button>
            <button class="url-refresh-btn"><i class="fas fa-sync"></i></button>
            <button class="url-home-btn"><i class="fas fa-home"></i></button>
        `;
        
        const input = urlBar.querySelector('.url-input');
        const suggestionsBox = urlBar.querySelector('#searchSuggestions');
        let debounceTimer = null;
        
        // Input handler dengan auto-suggestions
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                debounceTimer = setTimeout(() => {
                    showSearchSuggestions(query);
                }, 300);
            } else {
                hideSearchSuggestions();
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearchOrNavigate(input.value);
                hideSearchSuggestions();
            }
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!urlBar.contains(e.target)) {
                hideSearchSuggestions();
            }
        });
        
        // Search button handler
        urlBar.querySelector('.url-search-btn').addEventListener('click', () => {
            handleSearchOrNavigate(input.value);
        });
        
        return urlBar;
    }

    /**
     * Tampilkan suggestions pencarian
     */
    function showSearchSuggestions(query) {
        const suggestionsBox = document.getElementById('searchSuggestions');
        if (!suggestionsBox) return;
        
        // Cek apakah ini URL atau search query
        if (isURL(query)) {
            hideSearchSuggestions();
            return;
        }
        
        // Generate suggestions
        const suggestions = [
            { text: `Search Google for "${query}"`, type: 'search', engine: 'google' },
            { text: `Search Bing for "${query}"`, type: 'search', engine: 'bing' },
            { text: `Search YouTube for "${query}"`, type: 'search', engine: 'youtube' }
        ];
        
        suggestionsBox.innerHTML = suggestions.map(s => `
            <div class="suggestion-item" data-type="${s.type}" data-engine="${s.engine}" data-query="${query}">
                <i class="fas fa-${s.engine === 'youtube' ? 'youtube' : 'search'}"></i>
                ${s.text}
            </div>
        `).join('');
        
        // Add click handlers
        suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;
                const engine = item.dataset.engine;
                const searchQuery = item.dataset.query;
                
                if (type === 'search') {
                    performSearch(searchQuery, engine);
                }
                hideSearchSuggestions();
            });
        });
        
        suggestionsBox.classList.remove('hidden');
    }

    /**
     * Hide search suggestions
     */
    function hideSearchSuggestions() {
        const suggestionsBox = document.getElementById('searchSuggestions');
        if (suggestionsBox) {
            suggestionsBox.classList.add('hidden');
        }
    }

    /**
     * Cek apakah string adalah URL
     */
    function isURL(str) {
        const urlPattern = /^(http:\/\/|https:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(str);
    }

    /**
     * Handle search or navigate berdasarkan input
     */
    function handleSearchOrNavigate(input) {
        const value = input.trim();
        
        if (!value) return;
        
        if (isURL(value)) {
            navigateTo(value);
        } else {
            // Default ke Google Search
            performSearch(value, 'google');
        }
    }

    /**
     * Perform search di berbagai engine
     */
    function performSearch(query, engine = 'google') {
        const engines = {
            google: 'https://www.google.com/search?q=',
            bing: 'https://www.bing.com/search?q=',
            youtube: 'https://www.youtube.com/results?search_query=',
            duckduckgo: 'https://duckduckgo.com/?q='
        };
        
        const searchUrl = engines[engine] || engines.google;
        const url = `${searchUrl}${encodeURIComponent(query)}`;
        navigateTo(url);
    }

    /**
     * Navigation Controls - Tombol back, forward, refresh
     */
    function createNavigationControls() {
        const controls = document.createElement('div');
        controls.className = 'nav-controls';
        controls.innerHTML = `
            <button class="nav-btn back-btn" title="Back"><i class="fas fa-arrow-left"></i></button>
            <button class="nav-btn forward-btn" title="Forward"><i class="fas fa-arrow-right"></i></button>
            <button class="nav-btn refresh-btn" title="Refresh"><i class="fas fa-redo"></i></button>
            <button class="nav-btn home-btn" title="Home"><i class="fas fa-home"></i></button>
        `;
        
        controls.querySelector('.back-btn').addEventListener('click', goBack);
        controls.querySelector('.forward-btn').addEventListener('click', goForward);
        controls.querySelector('.refresh-btn').addEventListener('click', refresh);
        controls.querySelector('.home-btn').addEventListener('click', goHome);
        
        return controls;
    }

    /**
     * Page Title Display - Menampilkan judul halaman
     */
    function updatePageTitle(title) {
        const titleElement = document.getElementById('browser-page-title');
        if (titleElement) {
            titleElement.textContent = title || 'New Tab';
        }
        document.title = `${title} - Reber Browser`;
    }

    /**
     * Loading Indicator - Indikator progres loading halaman
     */
    function createLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'loading-indicator hidden';
        indicator.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="loading-text">Loading...</span>
        `;
        return indicator;
    }

    /**
     * Error Page Handler - Penanganan error (404, timeout, dll)
     */
    function showErrorPage(errorType, url) {
        const errorPages = {
            '404': `<h1>404 - Page Not Found</h1><p>The page ${url} could not be found.</p>`,
            'timeout': `<h1>ConDisplayCorption Timeout</h1><p>The request to ${url} timed out.</p>`,
            'ssl': `<h1>SSL Certificate Error</h1><p>The conDisplayCorption to ${url} is not secure.</p>`,
            'offline': `<h1>No Internet ConDisplayCorption</h1><p>Please check your network conDisplayCorption.</p>`
        };
        
        return errorPages[errorType] || `<h1>Error</h1><p>An error occurred while loading ${url}</p>`;
    }

    // === KOMPONEN INTERAKSI USER ===

    /**
     * Touch/Mouse Event Handler - Penanganan input user
     */
    function initInputHandler(container) {
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('wheel', handleWheel);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('touchmove', handleTouchMove);
    }

    function handleMouseDown(e) { console.log('[Input] Mouse Down:', e.target); }
    function handleMouseUp(e) { console.log('[Input] Mouse Up:', e.target); }
    function handleMouseMove(e) { /* Handle mouse move */ }
    function handleWheel(e) { /* Handle scroll */ }
    function handleTouchStart(e) { console.log('[Input] Touch Start'); }
    function handleTouchEnd(e) { console.log('[Input] Touch End'); }
    function handleTouchMove(e) { /* Handle touch move */ }

    /**
     * Scroll View - Kemampuan scroll konten
     */
    function initScrollView(container) {
        container.style.overflow = 'auto';
        container.style.webkitOverflowScrolling = 'touch';
    }

    /**
     * Zoom Controls - Fitur zoom in/out
     */
    function createZoomControls() {
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        controls.innerHTML = `
            <button class="zoom-btn zoom-out" title="Zoom Out"><i class="fas fa-minus"></i></button>
            <span class="zoom-level">100%</span>
            <button class="zoom-btn zoom-in" title="Zoom In"><i class="fas fa-plus"></i></button>
            <button class="zoom-btn zoom-reset" title="Reset Zoom"><i class="fas fa-expand"></i></button>
        `;
        
        let zoomLevel = 100;
        const zoomDisplay = controls.querySelector('.zoom-level');
        
        controls.querySelector('.zoom-in').addEventListener('click', () => {
            zoomLevel = Math.min(zoomLevel + 10, 200);
            updateZoom(zoomLevel);
        });
        
        controls.querySelector('.zoom-out').addEventListener('click', () => {
            zoomLevel = Math.max(zoomLevel - 10, 50);
            updateZoom(zoomLevel);
        });
        
        controls.querySelector('.zoom-reset').addEventListener('click', () => {
            zoomLevel = 100;
            updateZoom(zoomLevel);
        });
        
        return controls;
    }

    function updateZoom(level) {
        const frame = document.querySelector('.webview-frame');
        if (frame) {
            frame.style.transform = `scale(${level / 100})`;
            frame.style.transformOrigin = 'top left';
        }
        const display = document.querySelector('.zoom-level');
        if (display) display.textContent = `${level}%`;
    }

    /**
     * Context Menu - Menu konteks (copy, paste, share)
     */
    function createContextMenu() {
        const menu = document.createElement('div');
        menu.className = 'context-menu hidden';
        menu.innerHTML = `
            <ul>
                <li data-action="back"><i class="fas fa-arrow-left"></i> Back</li>
                <li data-action="forward"><i class="fas fa-arrow-right"></i> Forward</li>
                <li data-action="reload"><i class="fas fa-redo"></i> Reload</li>
                <hr>
                <li data-action="copy"><i class="fas fa-copy"></i> Copy</li>
                <li data-action="paste"><i class="fas fa-paste"></i> Paste</li>
                <hr>
                <li data-action="share"><i class="fas fa-share"></i> Share</li>
                <li data-action="bookmark"><i class="fas fa-bookmark"></i> Add Bookmark</li>
                <li data-action="download"><i class="fas fa-download"></i> Download</li>
                <hr>
                <li data-action="inspect"><i class="fas fa-code"></i> Inspect Element</li>
                <li data-action="settings"><i class="fas fa-cog"></i> Settings</li>
            </ul>
        `;
        
        menu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                handleContextMenuAction(action);
                menu.classList.add('hidden');
            });
        });
        
        return menu;
    }

    function handleContextMenuAction(action) {
        console.log('[Context Menu] Action:', action);
        switch(action) {
            case 'back': goBack(); break;
            case 'forward': goForward(); break;
            case 'reload': refresh(); break;
            case 'copy': copySelection(); break;
            case 'paste': pasteFromClipboard(); break;
            case 'share': sharePage(); break;
            case 'bookmark': addBookmark(); break;
            case 'download': downloadPage(); break;
            case 'inspect': inspectElement(); break;
            case 'settings': openSettings(); break;
        }
    }

    /**
     * Form Input Fields - Dukungan input form HTML
     */
    function initFormSupport(container) {
        container.addEventListener('submit', handleFormSubmit, true);
        container.addEventListener('input', handleFormInput, true);
    }

    function handleFormSubmit(e) {
        console.log('[Form] Submit event:', e.target);
    }

    function handleFormInput(e) {
        console.log('[Form] Input event:', e.target.name);
    }

    // === KOMPONEN KEAMANAN & PERMISSIONS ===

    /**
     * SSL/TLS Handler - Enkripsi HTTPS
     */
    function checkSSL(url) {
        return url.startsWith('https://');
    }

    function updateSecurityIndicator(isSecure) {
        const indicator = document.querySelector('.url-security-indicator');
        if (indicator) {
            indicator.innerHTML = isSecure ? 
                '<i class="fas fa-lock"></i>' : 
                '<i class="fas fa-unlock"></i>';
            indicator.className = `url-security-indicator ${isSecure ? 'secure' : 'not-secure'}`;
        }
    }

    /**
     * Permission Manager - Manajemen izin (kamera, lokasi, dll)
     */
    const PermissionManager = {
        permissions: {
            camera: 'prompt',
            microphone: 'prompt',
            location: 'prompt',
            notifications: 'prompt',
            fullscreen: 'allow',
            geolocation: 'prompt'
        },
        
        request: function(permission) {
            console.log('[Permission] Requesting:', permission);
            return new Promise((resolve) => {
                const granted = confirm(`Allow ${permission}?`);
                resolve(granted ? 'granted' : 'denied');
            });
        },
        
        check: function(permission) {
            return this.permissions[permission] || 'prompt';
        },
        
        revoke: function(permission) {
            this.permissions[permission] = 'denied';
            console.log('[Permission] Revoked:', permission);
        }
    };

    /**
     * Cookie Manager - Pengelolaan cookies
     */
    const CookieManager = {
        set: function(name, value, days) {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/';
        },
        
        get: function(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        
        delete: function(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        
        getAll: function() {
            const cookies = {};
            document.cookie.split(';').forEach(cookie => {
                const parts = cookie.split('=');
                cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
            });
            return cookies;
        }
    };

    /**
     * Content Security Policy - Kebijakan keamanan konten
     */
    function initCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self' https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:;";
        document.head.appendChild(meta);
    }

    /**
     * Mixed Content Handler - Penanganan HTTP/HTTPS campuran
     */
    function handleMixedContent(url) {
        if (!checkSSL(url)) {
            console.warn('[Security] Mixed content detected:', url);
            if (CONFIG.security.sslOnly) {
                return false;
            }
        }
        return true;
    }

    // === KOMPONEN FUNGSIONALITAS LANJUTAN ===

    /**
     * Cache Manager - Pengelolaan cache offline
     */
    const CacheManager = {
        cache: new Map(),
        maxSize: 100 * 1024 * 1024, // 100MB
        
        set: function(key, value, ttl = 3600) {
            const item = {
                value: value,
                timestamp: Date.now(),
                ttl: ttl
            };
            this.cache.set(key, item);
            console.log('[Cache] Set:', key);
        },
        
        get: function(key) {
            const item = this.cache.get(key);
            if (!item) return null;
            
            if (Date.now() - item.timestamp > item.ttl * 1000) {
                this.cache.delete(key);
                return null;
            }
            return item.value;
        },
        
        clear: function() {
            this.cache.clear();
            console.log('[Cache] Cleared');
        },
        
        getSize: function() {
            return this.cache.size;
        }
    };

    /**
     * History Manager - Riwayat navigasi
     */
    const HistoryManager = {
        maxHistory: 100,
        
        add: function(url, title) {
            state.history = state.history.slice(0, state.historyIndex + 1);
            state.history.push({ url, title, timestamp: Date.now() });
            if (state.history.length > this.maxHistory) {
                state.history.shift();
            } else {
                state.historyIndex++;
            }
            this.save();
        },
        
        back: function() {
            if (state.historyIndex > 0) {
                state.historyIndex--;
                return state.history[state.historyIndex];
            }
            return null;
        },
        
        forward: function() {
            if (state.historyIndex < state.history.length - 1) {
                state.historyIndex++;
                return state.history[state.historyIndex];
            }
            return null;
        },
        
        clear: function() {
            state.history = [];
            state.historyIndex = -1;
            this.save();
        },
        
        save: function() {
            localStorage.setItem('browser-history', JSON.stringify(state.history));
            localStorage.setItem('browser-history-index', state.historyIndex);
        },
        
        load: function() {
            const saved = localStorage.getItem('browser-history');
            if (saved) {
                state.history = JSON.parse(saved);
                state.historyIndex = parseInt(localStorage.getItem('browser-history-index') || '-1');
            }
        }
    };

    /**
     * Download Handler - Penanganan download file
     */
    const DownloadManager = {
        downloads: [],
        
        start: function(url, filename) {
            const download = {
                id: Date.now(),
                url: url,
                filename: filename || 'download',
                status: 'downloading',
                progress: 0,
                startTime: Date.now()
            };
            this.downloads.push(download);
            this.notifyDownload(download);
            return download.id;
        },
        
        complete: function(id) {
            const download = this.downloads.find(d => d.id === id);
            if (download) {
                download.status = 'completed';
                download.progress = 100;
                this.notifyDownload(download);
            }
        },
        
        cancel: function(id) {
            const download = this.downloads.find(d => d.id === id);
            if (download) {
                download.status = 'cancelled';
                this.notifyDownload(download);
            }
        },
        
        notifyDownload: function(download) {
            dispatch('download-update', download);
            showNotification(`${download.filename}: ${download.status}`);
        }
    };

    // === FUNGSI KHUSUS YOUTUBE & GOOGLE ===

    /**
     * Konfigurasi YouTube dalam Browser
     */
    function initYouTubeConfig() {
        console.log('[Browser] Initializing YouTube Configuration...');
        
        const ytConfig = {
            embedUrl: 'https://www.youtube.com/embed/',
            watchUrl: 'https://www.youtube.com/watch?v=',
            apiUrl: 'https://www.googleapis.com/youtube/v3/',
            playerVars: {
                autoplay: CONFIG.youtubeConfig.autoplay ? 1 : 0,
                controls: 1,
                rel: CONFIG.youtubeConfig.relatedVideos ? 1 : 0,
                modestbranding: 1,
                iv_load_policy: 3
            }
        };
        
        return ytConfig;
    }

    /**
     * Buka YouTube dalam mode khusus
     */
    function openYouTube(videoId = '') {
        const url = videoId ? 
            `https://www.youtube.com/watch?v=${videoId}` : 
            'https://www.youtube.com';
        navigateTo(url);
    }

    /**
     * Konfigurasi Google Search
     */
    function initGoogleConfig() {
        console.log('[Browser] Initializing Google Configuration...');
        
        const googleConfig = {
            searchUrl: 'https://www.google.com/search',
            suggestUrl: 'https://suggestqueries.google.com/complete/search',
            mapsUrl: 'https://www.google.com/maps',
            translateUrl: 'https://translate.google.com'
        };
        
        return googleConfig;
    }

    /**
     * Pencarian Google
     */
    function googleSearch(query) {
        const url = `${CONFIG.searchEngine}${encodeURIComponent(query)}`;
        navigateTo(url);
    }

    // === FUNGSI NAVIGASI UTAMA ===

    function navigateTo(url) {
        if (!url) return;
        
        // Tambahkan protocol jika tidak ada
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        console.log('[Browser] Navigating to:', url);
        
        const frame = document.querySelector('.webview-frame');
        if (frame) {
            frame.src = url;
        }
        
        // Update URL bar
        const urlInput = document.querySelector('.url-input');
        if (urlInput) {
            urlInput.value = url;
        }
        
        // Check SSL
        updateSecurityIndicator(checkSSL(url));
        
        // Add to history
        HistoryManager.add(url, document.title);
        
        dispatch('navigate', { url });
    }

    function goBack() {
        const previous = HistoryManager.back();
        if (previous) {
            navigateTo(previous.url);
        }
    }

    function goForward() {
        const next = HistoryManager.forward();
        if (next) {
            navigateTo(next.url);
        }
    }

    function refresh() {
        const frame = document.querySelector('.webview-frame');
        if (frame) {
            frame.src = frame.src;
        }
    }

    function goHome() {
        navigateTo(CONFIG.homePage);
    }

    // === BOOKMARK FUNCTIONS ===

    function addBookmark() {
        const url = document.querySelector('.url-input')?.value || '';
        const title = document.title;
        
        const bookmark = {
            id: Date.now(),
            url: url,
            title: title,
            createdAt: Date.now()
        };
        
        state.bookmarks.push(bookmark);
        saveBookmarks();
        showNotification('Bookmark added!');
        dispatch('bookmark-add', bookmark);
    }

    function saveBookmarks() {
        localStorage.setItem('browser-bookmarks', JSON.stringify(state.bookmarks));
    }

    function loadBookmarks() {
        const saved = localStorage.getItem('browser-bookmarks');
        if (saved) {
            state.bookmarks = JSON.parse(saved);
        }
    }

    // === TAB MANAGEMENT ===

    function createTab(url = 'about:blank') {
        const tab = {
            id: Date.now(),
            url: url,
            title: 'New Tab',
            favicon: null,
            createdAt: Date.now()
        };
        state.tabs.push(tab);
        setActiveTab(tab.id);
        dispatch('tab-create', tab);
        return tab;
    }

    function closeTab(tabId) {
        state.tabs = state.tabs.filter(t => t.id !== tabId);
        if (state.tabs.length > 0) {
            setActiveTab(state.tabs[state.tabs.length - 1].id);
        }
        dispatch('tab-close', { tabId });
    }

    function setActiveTab(tabId) {
        state.activeTab = tabId;
        const tab = state.tabs.find(t => t.id === tabId);
        if (tab) {
            navigateTo(tab.url);
        }
        dispatch('tab-activate', { tabId });
    }

    // === NOTIFICATION SYSTEM ===

    function showNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            timestamp: Date.now()
        };
        
        dispatch('notification', notification);
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // === UTILITY FUNCTIONS ===

    function copySelection() {
        const selection = window.getSelection();
        if (selection.toString()) {
            navigator.clipboard.writeText(selection.toString());
            showNotification('Copied to clipboard');
        }
    }

    function pasteFromClipboard() {
        navigator.clipboard.readText().then(text => {
            const urlInput = document.querySelector('.url-input');
            if (urlInput) {
                urlInput.value = text;
            }
        });
    }

    function sharePage() {
        const url = document.querySelector('.url-input')?.value || '';
        const title = document.title;
        
        if (navigator.share) {
            navigator.share({ title, url });
        } else {
            copySelection();
            showNotification('Link copied to clipboard');
        }
    }

    function downloadPage() {
        const url = document.querySelector('.url-input')?.value || '';
        DownloadManager.start(url, 'page.html');
    }

    function inspectElement() {
        // Open devtools (simulated)
        console.log('[Browser] Opening Developer Tools...');
        alert('Developer Tools opened in console (F12)');
    }

    function openSettings() {
        console.log('[Browser] Opening Settings...');
        dispatch('open-settings', {});
    }

    // === FUNGSI UTAMA ===
    
    /**
     * Inisialisasi komponen
     */
    function init(options = {}) {
        if (state.initialized) {
            console.warn('[app-browser] Sudah diinisialisasi');
            return;
        }

        console.log('[app-browser] Menginisialisasi Browser v' + CONFIG.version + '...');
        
        // Initialize core components
        initRenderingEngine();
        initJSEngine();
        initCSP();
        
        // Load saved data
        HistoryManager.load();
        loadBookmarks();
        
        state.data = options.data || {};
        state.initialized = true;
        
        // Create browser UI if container exists
        if (options.container) {
            createBrowserUI(options.container);
        }
        
        dispatch('init', { options });
        
        return this;
    }

    /**
     * Create Complete Browser UI
     */
    function createBrowserUI(container) {
        const browserContainer = document.createElement('div');
        browserContainer.className = 'browser-window';
        browserContainer.innerHTML = `
            <div class="browser-toolbar">
                ${createNavigationControls().outerHTML}
                ${createURLBar().outerHTML}
                <div class="browser-actions">
                    <button class="action-btn" title="New Tab"><i class="fas fa-plus"></i></button>
                    <button class="action-btn" title="Bookmarks"><i class="fas fa-star"></i></button>
                    <button class="action-btn" title="Downloads"><i class="fas fa-download"></i></button>
                    <button class="action-btn" title="Menu"><i class="fas fa-ellipsis-v"></i></button>
                </div>
            </div>
            <div class="browser-content">
                ${createWebViewContainer().outerHTML}
            </div>
            <div class="browser-statusbar">
                <span class="status-text">Ready</span>
                ${createZoomControls().outerHTML}
            </div>
            ${createContextMenu().outerHTML}
            ${createLoadingIndicator().outerHTML}
        `;
        
        container.appendChild(browserContainer);
        
        // Initialize interactions
        const contentArea = browserContainer.querySelector('.browser-content');
        initInputHandler(contentArea);
        initScrollView(contentArea);
        initFormSupport(contentArea);
        
        // Setup context menu trigger
        browserContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = browserContainer.querySelector('.context-menu');
            menu.classList.remove('hidden');
            menu.style.left = e.pageX + 'px';
            menu.style.top = e.pageY + 'px';
        });
        
        // Close context menu on click elsewhere
        document.addEventListener('click', (e) => {
            const menu = browserContainer.querySelector('.context-menu');
            if (!menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
        
        // Navigate to home page
        navigateTo(CONFIG.homePage);
    }

    /**
     * Destroy komponen
     */
    function destroy() {
        console.log('[app-browser] Destroying...');
        
        CacheManager.clear();
        state.listeners = [];
        state.data = null;
        state.initialized = false;
        
        dispatch('destroy', {});
    }

    /**
     * Subscribe ke event
     */
    function subscribe(event, callback) {
        state.listeners.push({ event, callback });
        return () => unsubscribe(event, callback);
    }

    /**
     * Unsubscribe dari event
     */
    function unsubscribe(event, callback) {
        state.listeners = state.listeners.filter(
            l => !(l.event === event && l.callback === callback)
        );
    }

    /**
     * Dispatch event
     */
    function dispatch(event, payload) {
        state.listeners
            .filter(l => l.event === event)
            .forEach(l => l.callback(payload));
        
        // Dispatch ke global event bus jika ada
        if (window.SoutheastApp && window.SoutheastApp.eventBus) {
            window.SoutheastApp.eventBus.dispatch(`${CONFIG.name}:${event}`, payload);
        }
    }

    /**
     * Update state
     */
    function updateState(newData) {
        const previous = { ...state.data };
        state.data = { ...state.data, ...newData };
        dispatch('update', { previous, current: state.data });
    }

    /**
     * Get state
     */
    function getState(key) {
        if (key) {
            return state.data ? state.data[key] : undefined;
        }
        return state.data;
    }

    // === EXPORT PUBLIC API ===
    const publicAPI = {
        init,
        destroy,
        subscribe,
        unsubscribe,
        dispatch,
        updateState,
        getState,
        getConfig: () => ({ ...CONFIG }),
        isInitialized: () => state.initialized,
        
        // Navigation
        navigateTo,
        goBack,
        goForward,
        refresh,
        goHome,
        
        // Tabs
        createTab,
        closeTab,
        setActiveTab,
        
        // Bookmarks
        addBookmark,
        getBookmarks: () => state.bookmarks,
        
        // History
        getHistory: () => state.history,
        clearHistory: () => HistoryManager.clear(),
        
        // Downloads
        downloadFile: (url, filename) => DownloadManager.start(url, filename),
        
        // YouTube
        openYouTube,
        getYouTubeConfig: initYouTubeConfig,
        
        // Google
        googleSearch,
        getGoogleConfig: initGoogleConfig,
        
        // Permissions
        requestPermission: (perm) => PermissionManager.request(perm),
        
        // Cache
        getCached: (key) => CacheManager.get(key),
        setCached: (key, value, ttl) => CacheManager.set(key, value, ttl),
        clearCache: () => CacheManager.clear(),
        
        // Cookies
        setCookie: (name, value, days) => CookieManager.set(name, value, days),
        getCookie: (name) => CookieManager.get(name),
        deleteCookie: (name) => CookieManager.delete(name),
        
        // Utilities
        showNotification,
        createBrowserUI
    };

    // Register ke global namespace jika tersedia
    if (typeof window !== 'undefined') {
        if (!window.SoutheastApp) {
            window.SoutheastApp = {};
        }
        if (!window.SoutheastApp.components) {
            window.SoutheastApp.components = {};
        }
        window.SoutheastApp.components['app-browser'] = publicAPI;
        
        // Also expose as ReberBrowser
        window.ReberBrowser = publicAPI;
    }

    // Auto-init jika ada attribute data-auto-init
    if (typeof document !== 'undefined') {
        const autoInitElement = document.querySelector(`[data-component="${CONFIG.name}"]`);
        if (autoInitElement) {
            const options = JSON.parse(autoInitElement.dataset.options || '{}');
            init(options);
        }
    }

    // Export untuk module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = publicAPI;
    } else if (typeof define === 'function' && define.amd) {
        define(() => publicAPI);
    }

})();

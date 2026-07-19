// ReberPencarian.digital - Core JavaScript Functionality

class ReberPencarian {
    constructor() {
        this.currentMode = 'text';
        this.crawlerActive = false;
        this.stats = {
            urlIndexed: 0,
            domainsDetected: 0,
            activePorts: 0
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.animateStats();
        this.setupFileUpload();
    }

    bindEvents() {
        // Mode Selector
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
            });
        });

        // Navigation Buttons
        document.getElementById('btnBack')?.addEventListener('click', () => this.navigate('back'));
        document.getElementById('btnForward')?.addEventListener('click', () => this.navigate('forward'));
        document.getElementById('btnRefresh')?.addEventListener('click', () => this.navigate('refresh'));
        document.getElementById('btnHome')?.addEventListener('click', () => this.navigate('home'));

        // Search Button
        document.getElementById('searchBtn')?.addEventListener('click', () => this.performSearch());
        
        // URL Input Enter Key
        document.getElementById('urlInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Action Buttons
        document.getElementById('btnCrawl')?.addEventListener('click', () => this.startCrawler());
        document.getElementById('btnRender')?.addEventListener('click', () => this.renderContent());
        document.getElementById('btnClear')?.addEventListener('click', () => this.clearAll());
        document.getElementById('btnExport')?.addEventListener('click', () => this.exportResults());

        // Content Type Tabs
        document.querySelectorAll('.content-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.filterContent(e.target.dataset.content);
            });
        });

        // Protocol Selector
        document.getElementById('protocolSelector')?.addEventListener('change', (e) => {
            console.log('Protocol changed to:', e.target.value);
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
        });
        
        document.querySelector(`.mode-card[data-mode="${mode}"]`)?.classList.add('active');
        
        // Update placeholder based on mode
        const placeholders = {
            text: 'Masukkan kata kunci pencarian teks...',
            image: 'Masukkan URL atau kata kunci untuk gambar...',
            video: 'Masukkan URL video atau kata kunci...',
            film: 'Masukkan judul film atau URL...',
            document: 'Masukkan nama dokumen atau kata kunci...',
            binary: 'Masukkan data biner atau upload file...'
        };
        
        document.getElementById('searchQuery').placeholder = placeholders[mode] || placeholders.text;
        
        console.log('Mode set to:', mode);
    }

    navigate(action) {
        const iframe = document.getElementById('urlContentFrame');
        
        switch(action) {
            case 'back':
                if (iframe) iframe.contentWindow?.history.back();
                break;
            case 'forward':
                if (iframe) iframe.contentWindow?.history.forward();
                break;
            case 'refresh':
                if (iframe) iframe.contentWindow?.location.reload();
                break;
            case 'home':
                this.clearDisplay();
                break;
        }
    }

    performSearch() {
        const urlInput = document.getElementById('urlInput');
        const query = urlInput.value.trim();
        
        if (!query) {
            alert('Masukkan URL atau kata kunci pencarian');
            return;
        }

        // Detect if it's a URL or search query
        const isURL = this.isValidURL(query);
        
        if (isURL) {
            this.loadURL(query);
        } else {
            this.searchNetwork(query);
        }
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    loadURL(url) {
        const protocol = document.getElementById('protocolSelector').value;
        const fullURL = url.startsWith('http') ? url : protocol + url;
        
        const iframe = document.getElementById('urlContentFrame');
        const placeholder = document.getElementById('contentPlaceholder');
        
        if (iframe && placeholder) {
            placeholder.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = fullURL;
            
            // Update URL input
            document.getElementById('urlInput').value = fullURL;
        }
    }

    searchNetwork(query) {
        // Simulate network crawling
        console.log('Searching network for:', query);
        this.showCrawlerStatus();
        
        // Simulate finding results
        setTimeout(() => {
            this.displayResults(query);
        }, 2000);
    }

    showCrawlerStatus() {
        const statusPanel = document.getElementById('crawlerStatus');
        if (statusPanel) {
            statusPanel.style.display = 'block';
            this.crawlerActive = true;
            this.simulateCrawlerProgress();
        }
    }

    simulateCrawlerProgress() {
        const progressBar = document.getElementById('crawlerProgress');
        const statsElement = document.getElementById('crawlStats');
        const timeElement = document.getElementById('crawlTime');
        
        let progress = 0;
        let time = 0;
        
        const interval = setInterval(() => {
            if (!this.crawlerActive) {
                clearInterval(interval);
                return;
            }
            
            progress += Math.random() * 15;
            time++;
            
            if (progress >= 100) {
                progress = 100;
                this.crawlerActive = false;
                clearInterval(interval);
                
                setTimeout(() => {
                    document.getElementById('crawlerStatus').style.display = 'none';
                }, 2000);
            }
            
            if (progressBar) progressBar.style.width = progress + '%';
            
            if (statsElement) {
                this.stats.urlIndexed = Math.floor(progress * 12.5);
                this.stats.domainsDetected = Math.floor(progress * 0.8);
                this.stats.activePorts = Math.floor(progress * 1.5);
                
                statsElement.textContent = 
                    `URL Terindeks: ${this.stats.urlIndexed} | Domain: ${this.stats.domainsDetected} | Port Terdeteksi: ${this.stats.activePorts}`;
            }
            
            if (timeElement) {
                timeElement.textContent = `Waktu: ${time}s`;
            }
        }, 200);
    }

    displayResults(query) {
        const resultsGrid = document.getElementById('resultsGrid');
        const contentArea = document.getElementById('urlContentArea');
        
        if (!resultsGrid) return;
        
        // Generate sample results
        const results = [
            { title: `${query} - Hasil 1`, url: `https://example.com/${query}-1`, type: 'Teks' },
            { title: `${query} - Hasil 2`, url: `https://example.com/${query}-2`, type: 'Media' },
            { title: `${query} - Hasil 3`, url: `https://example.com/${query}-3`, type: 'Dokumen' },
            { title: `${query} - Hasil 4`, url: `https://example.com/${query}-4`, type: 'Biner' }
        ];
        
        resultsGrid.innerHTML = '';
        results.forEach(result => {
            const card = document.createElement('div');
            card.className = 'result-card animate-fade-in';
            card.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.url}</p>
                <p style="font-size: 12px; color: #718096; margin-top: 8px;">Tipe: ${result.type}</p>
            `;
            card.addEventListener('click', () => {
                this.loadURL(result.url);
            });
            resultsGrid.appendChild(card);
        });
        
        resultsGrid.style.display = 'grid';
    }

    startCrawler() {
        const searchQuery = document.getElementById('searchQuery').value;
        const targetDomain = document.getElementById('targetDomain').value;
        const portRange = document.getElementById('portRange').value;
        
        if (!searchQuery && !targetDomain) {
            alert('Masukkan kata kunci atau domain target');
            return;
        }
        
        console.log('Starting crawler with:', { searchQuery, targetDomain, portRange });
        this.showCrawlerStatus();
    }

    renderContent() {
        const iframe = document.getElementById('urlContentFrame');
        const currentSrc = iframe?.src;
        
        if (currentSrc && iframe) {
            iframe.src = currentSrc; // Reload
        } else {
            alert('Tidak ada konten untuk dirender');
        }
    }

    clearAll() {
        document.getElementById('searchQuery').value = '';
        document.getElementById('targetDomain').value = '';
        document.getElementById('portRange').value = '';
        document.getElementById('urlInput').value = '';
        this.clearDisplay();
    }

    clearDisplay() {
        const iframe = document.getElementById('urlContentFrame');
        const placeholder = document.getElementById('contentPlaceholder');
        const resultsGrid = document.getElementById('resultsGrid');
        
        if (iframe) {
            iframe.src = '';
            iframe.style.display = 'none';
        }
        
        if (placeholder) placeholder.style.display = 'flex';
        if (resultsGrid) resultsGrid.style.display = 'none';
    }

    exportResults() {
        alert('Fitur export akan segera hadir!');
    }

    filterContent(type) {
        console.log('Filtering content by type:', type);
        // Implement filtering logic here
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileInput');
        
        if (!uploadArea || !fileInput) return;
        
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                console.log('Files selected:', files);
                this.handleFiles(files);
            }
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#0066ff';
            uploadArea.style.background = '#f0f4ff';
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#e2e8f0';
            uploadArea.style.background = '#fafbff';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#e2e8f0';
            uploadArea.style.background = '#fafbff';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                console.log('Files dropped:', files);
                this.handleFiles(files);
            }
        });
    }

    handleFiles(files) {
        console.log('Handling files:', files);
        // Implement file handling logic here
        alert(`${files.length} file(s) siap diproses`);
    }

    animateStats() {
        // Animate statistics in hero section
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || 0;
            this.countUp(stat, target);
        });
    }

    countUp(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, stepTime);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.reberPencarian = new ReberPencarian();
});

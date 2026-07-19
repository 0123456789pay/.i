// ReberPencarian.digital - Core JavaScript Functionality

class ReberPencarian {
    constructor() {
        this.currentMode = 'all';
        this.currentCategory = 'all';
        this.allSites = [];
        this.filteredSites = [];
        
        // Mapping kategori ke folder parent
        this.categoryMapping = {
            'ai_machinelearning': ['ai_machinelearning'],
            'media': ['mediakonten', 'media.digital'],
            'business': ['bisnisstartup', 'ecommerceretail'],
            'education': ['pendidikanpelatihan'],
            'tech': ['infrastrukturcloud', 'jaringanaktuaris', 'manajemendata'],
            'health': ['kesehatandigital'],
            'finance': ['keuanganperbankan', 'blockchaincrypto'],
            'infrastructure': ['dns_domain', 'configprotokol', 'pengaturansistem'],
            'config': ['configphpgit', 'configselectortrue', 'configsimbolakar', 'manajemenfile']
        };
        
        this.init();
    }

    async init() {
        await this.scanDigitalFolders();
        this.bindEvents();
        this.animateStats();
        this.renderSites(this.allSites);
    }

    async scanDigitalFolders() {
        // Simulasi scanning folder .digital dari workspace
        // Dalam implementasi nyata, ini akan menggunakan API atau fetch
        const digitalFolders = [
            // AI & Machine Learning
            { name: 'ai_machinelearning.digital', path: '/workspace/ai_machinelearning.digital', category: 'ai_machinelearning', icon: '🤖' },
            { name: 'nexchat-ai.digital', path: '/workspace/ai_machinelearning.digital/nexchat-ai.digital', category: 'ai_machinelearning', icon: '💬' },
            { name: 'aichatreber.digital', path: '/workspace/ai_machinelearning.digital/aichatreber.digital', category: 'ai_machinelearning', icon: '🤖' },
            { name: 'ragreber.digital', path: '/workspace/ai_machinelearning.digital/ragreber.digital', category: 'ai_machinelearning', icon: '🔍' },
            
            // Media & Konten
            { name: 'mediakonten.digital', path: '/workspace/mediakonten.digital', category: 'media', icon: '📺' },
            { name: 'medsos.digital', path: '/workspace/mediakonten.digital/medsos.digital', category: 'media', icon: '📱' },
            { name: 'newsdigital.digital', path: '/workspace/mediakonten.digital/newsdigital.digital', category: 'media', icon: '📰' },
            { name: 'videolife.digital', path: '/workspace/mediakonten.digital/videolife.digital', category: 'media', icon: '🎬' },
            { name: 'vidastream.digital', path: '/workspace/mediakonten.digital/vidastream.digital', category: 'media', icon: '▶️' },
            
            // Bisnis & Startup
            { name: 'bisnisstartup.digital', path: '/workspace/bisnisstartup.digital', category: 'business', icon: '💼' },
            { name: 'ecommerceretail.digital', path: '/workspace/ecommerceretail.digital', category: 'business', icon: '🛒' },
            { name: 'ModelFreemium.digital', path: '/workspace/bisnisstartup.digital/ModelFreemium.digital', category: 'business', icon: '💰' },
            { name: 'RencanaBisnis.digital', path: '/workspace/bisnisstartup.digital/RencanaBisnis.digital', category: 'business', icon: '📊' },
            
            // Pendidikan
            { name: 'pendidikanpelatihan.digital', path: '/workspace/pendidikanpelatihan.digital', category: 'education', icon: '📚' },
            { name: 'MateriKursus.digital', path: '/workspace/pendidikanpelatihan.digital/MateriKursus.digital', category: 'education', icon: '📖' },
            { name: 'SertifikasiProfesi.digital', path: '/workspace/pendidikanpelatihan.digital/SertifikasiProfesi.digital', category: 'education', icon: '🎓' },
            { name: 'PembelajaranDaring.digital', path: '/workspace/pendidikanpelatihan.digital/PembelajaranDaring.digital', category: 'education', icon: '💻' },
            
            // Teknologi
            { name: 'infrastrukturcloud.digital', path: '/workspace/infrastrukturcloud.digital', category: 'tech', icon: '☁️' },
            { name: 'jaringanaktuaris.digital', path: '/workspace/jaringanaktuaris.digital', category: 'tech', icon: '🌐' },
            { name: 'manajemendata.digital', path: '/workspace/manajemendata.digital', category: 'tech', icon: '🗄️' },
            { name: 'pengembangansoftware.digital', path: '/workspace/pengembangansoftware.digital', category: 'tech', icon: '⌨️' },
            
            // Kesehatan
            { name: 'kesehatandigital.digital', path: '/workspace/kesehatandigital.digital', category: 'health', icon: '🏥' },
            
            // Keuangan
            { name: 'keuanganperbankan.digital', path: '/workspace/keuanganperbankan.digital', category: 'finance', icon: '💰' },
            { name: 'blockchaincrypto.digital', path: '/workspace/blockchaincrypto.digital', category: 'finance', icon: '₿' },
            
            // Infrastruktur
            { name: 'dns_domain.digital', path: '/workspace/dns_domain.digital', category: 'infrastructure', icon: '🌐' },
            { name: 'configprotokol.digital', path: '/workspace/configprotokol.digital', category: 'infrastructure', icon: '⚙️' },
            
            // Config
            { name: 'configphpgit.digital', path: '/workspace/configphpgit.digital', category: 'config', icon: '🐘' },
            { name: 'configselectortrue.digital', path: '/workspace/configselectortrue.digital', category: 'config', icon: '✓' },
            { name: 'configsimbolakar.digital', path: '/workspace/configsimbolakar.digital', category: 'config', icon: '√' },
            
            // Lainnya
            { name: 'reberpencarian.digital', path: '/workspace/reberpencarian.digital', category: 'tech', icon: '🔍' },
            { name: 'media.digital', path: '/workspace/media.digital', category: 'media', icon: '📺' },
            { name: 'pusatdigital.digital', path: '/workspace/pusatdigital.digital', category: 'tech', icon: '🎯' },
            { name: 'bantuansupport.digital', path: '/workspace/bantuansupport.digital', category: 'tech', icon: '❓' },
            { name: 'identitasakses.digital', path: '/workspace/identitasakses.digital', category: 'tech', icon: '🔐' },
            { name: 'keamanansiber.digital', path: '/workspace/keamanansiber.digital', category: 'tech', icon: '🛡️' },
            { name: 'transportasilogistik.digital', path: '/workspace/transportasilogistik.digital', category: 'business', icon: '🚚' },
            { name: 'pertanianakuakultur.digital', path: '/workspace/pertanianakuakultur.digital', category: 'business', icon: '🌾' },
            { name: 'energilingkungan.digital', path: '/workspace/energilingkungan.digital', category: 'tech', icon: '⚡' },
            { name: 'konstruksigedung.digital', path: '/workspace/konstruksigedung.digital', category: 'business', icon: '🏗️' },
            { name: 'desainkreatif.digital', path: '/workspace/desainkreatif.digital', category: 'tech', icon: '🎨' },
            { name: 'gameentertainment.digital', path: '/workspace/gameentertainment.digital', category: 'media', icon: '🎮' },
            { name: 'komunikasi.digital', path: '/workspace/komunikasi.digital', category: 'tech', icon: '📞' },
            { name: 'hukumkepatuhan.digital', path: '/workspace/hukumkepatuhan.digital', category: 'business', icon: '⚖️' },
            { name: 'manajemenproyek.digital', path: '/workspace/manajemenproyek.digital', category: 'business', icon: '📋' },
            { name: 'visualisasireporting.digital', path: '/workspace/visualisasireporting.digital', category: 'tech', icon: '📊' },
            { name: 'tanggapdarurat.digital', path: '/workspace/tanggapdarurat.digital', category: 'health', icon: '🚨' },
            { name: 'tiketevent.digital', path: '/workspace/tiketevent.digital', category: 'media', icon: '🎫' },
            { name: 'analisisdata.digital', path: '/workspace/analisisdata.digital', category: 'tech', icon: '📈' },
            { name: 'arsipversi.digital', path: '/workspace/arsipversi.digital', category: 'tech', icon: '🗃️' },
            { name: 'iot_perangkat.digital', path: '/workspace/iot_perangkat.digital', category: 'tech', icon: '📱' },
            { name: 'pengungsisuaka.digital', path: '/workspace/pengungsisuaka.digital', category: 'health', icon: '🏠' }
        ];
        
        this.allSites = digitalFolders;
        this.filteredSites = [...this.allSites];
    }

    bindEvents() {
        // Mode Selector
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
            });
        });

        // Category Tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                const category = e.target.dataset.category;
                this.filterByCategory(category);
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
    }

    setMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
        });
        
        document.querySelector(`.mode-card[data-mode="${mode}"]`)?.classList.add('active');
        
        // Filter berdasarkan mode
        if (mode === 'all') {
            this.filteredSites = [...this.allSites];
        } else {
            const categoryMap = {
                'ai': 'ai_machinelearning',
                'media': 'media',
                'business': 'business',
                'education': 'education',
                'tech': 'tech'
            };
            const category = categoryMap[mode];
            if (category) {
                this.filterByCategory(category);
            }
        }
        
        this.renderSites(this.filteredSites);
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredSites = [...this.allSites];
            document.getElementById('resultsTitle').textContent = 'Semua Situs .digital';
        } else {
            this.filteredSites = this.allSites.filter(site => site.category === category);
            const categoryNames = {
                'ai_machinelearning': 'AI & Machine Learning',
                'media': 'Media & Konten',
                'business': 'Bisnis & Startup',
                'education': 'Pendidikan',
                'tech': 'Teknologi',
                'health': 'Kesehatan',
                'finance': 'Keuangan',
                'infrastructure': 'Infrastruktur',
                'config': 'Config'
            };
            document.getElementById('resultsTitle').textContent = categoryNames[category] || category;
        }
        
        this.renderSites(this.filteredSites);
    }

    renderSites(sites) {
        const grid = document.getElementById('sitesGrid');
        const countElement = document.getElementById('resultsCount');
        
        if (!grid) return;
        
        countElement.textContent = `${sites.length} situs ditemukan`;
        
        if (sites.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">🔍</div>
                    <h3>Tidak ada situs ditemukan</h3>
                    <p>Coba pilih kategori lain atau gunakan kata kunci pencarian</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = '';
        sites.forEach((site, index) => {
            const card = document.createElement('div');
            card.className = 'site-card animate-fade-in';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="site-card-icon">${site.icon}</div>
                <div class="site-card-name">${site.name}</div>
                <div class="site-card-path">${site.path}</div>
                <div class="site-card-category">${site.category}</div>
            `;
            
            card.addEventListener('click', () => {
                this.openSite(site);
            });
            
            grid.appendChild(card);
        });
    }

    openSite(site) {
        // Membuka halaman index.html dari folder .digital
        const indexPath = `${site.path}/index.html`;
        
        // Dalam implementasi nyata, ini akan membuka konten di viewer
        // Untuk saat ini, kita tampilkan alert
        console.log('Membuka situs:', indexPath);
        
        // Membuat modal atau overlay untuk menampilkan konten
        this.showSiteViewer(site, indexPath);
    }

    showSiteViewer(site, path) {
        // Membuat viewer overlay
        const viewer = document.createElement('div');
        viewer.className = 'site-viewer-overlay';
        viewer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeInUp 0.3s ease-out;
        `;
        
        viewer.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                width: 90%;
                max-width: 1200px;
                height: 90%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, #0047b3 0%, #0066ff 100%);
                    color: white;
                ">
                    <h3 style="font-size: 18px; font-weight: 700;">${site.name}</h3>
                    <button onclick="this.closest('.site-viewer-overlay').remove()" style="
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                </div>
                <div style="
                    flex: 1;
                    background: #f0f4ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 20px;
                    padding: 40px;
                ">
                    <div style="font-size: 80px;">${site.icon}</div>
                    <h2 style="color: #1a1a2e; font-size: 24px;">${site.name}</h2>
                    <p style="color: #718096; text-align: center;">Path: ${site.path}</p>
                    <p style="color: #718096; text-align: center;">Kategori: ${site.category}</p>
                    <div style="
                        background: white;
                        padding: 20px 40px;
                        border-radius: 50px;
                        box-shadow: 0 4px 15px rgba(0, 71, 179, 0.1);
                        margin-top: 20px;
                    ">
                        <p style="color: #0047b3; font-weight: 600;">Halaman utama akan ditampilkan di sini</p>
                        <p style="color: #718096; font-size: 14px; margin-top: 8px;">index.html dari folder .digital</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(viewer);
        
        // Close on outside click
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) {
                viewer.remove();
            }
        });
    }

    navigate(action) {
        console.log('Navigate:', action);
        // Implementasi navigasi browser
    }

    performSearch() {
        const urlInput = document.getElementById('urlInput');
        const query = urlInput.value.trim().toLowerCase();
        
        if (!query) {
            this.filteredSites = [...this.allSites];
        } else {
            this.filteredSites = this.allSites.filter(site => 
                site.name.toLowerCase().includes(query) ||
                site.path.toLowerCase().includes(query) ||
                site.category.toLowerCase().includes(query)
            );
        }
        
        this.renderSites(this.filteredSites);
        document.getElementById('resultsTitle').textContent = query ? `Hasil pencarian: "${query}"` : 'Semua Situs .digital';
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

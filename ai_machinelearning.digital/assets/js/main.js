// AI_MACHINELEARNING.DIGITAL - Main JavaScript
// Sistem manajemen untuk 41+ folder .digital sebagai menu sistem AI

// Data sistem AI dari folder .digital
const aiSystemsData = [
    { name: "AI Tepi", path: "AITepi.digital", category: "jaringan", icon: "fa-network-wired", files: 15, folders: 9 },
    { name: "Agen RAG", path: "AgenRAG.digital", category: "analitik", icon: "fa-robot", files: 12, folders: 7 },
    { name: "Desain Aplikasi", path: "DesainAplikasi.digital", category: "desain", icon: "fa-paint-brush", files: 18, folders: 10 },
    { name: "Desain Arsitektur", path: "DesainArsitektur.digital", category: "desain", icon: "fa-building", files: 16, folders: 9 },
    { name: "Desain Fesyen", path: "DesainFesyen.digital", category: "desain", icon: "fa-tshirt", files: 14, folders: 8 },
    { name: "Desain Grafis", path: "DesainGrafis.digital", category: "desain", icon: "fa-palette", files: 20, folders: 11 },
    { name: "Desain Industri", path: "DesainIndustri.digital", category: "desain", icon: "fa-cogs", files: 15, folders: 9 },
    { name: "Desain Interior", path: "DesainInterior.digital", category: "desain", icon: "fa-couch", files: 13, folders: 8 },
    { name: "Desain Karakter", path: "DesainKarakter.digital", category: "desain", icon: "fa-user-astronaut", files: 17, folders: 10 },
    { name: "Desain Lingkungan", path: "DesainLingkungan.digital", category: "desain", icon: "fa-tree", files: 14, folders: 8 },
    { name: "Desain Makanan", path: "DesainMakanan.digital", category: "desain", icon: "fa-utensils", files: 12, folders: 7 },
    { name: "Embedding Vektor", path: "EmbeddingVektor.digital", category: "analitik", icon: "fa-vector-square", files: 10, folders: 6 },
    { name: "Generasi Gambar", path: "GenerasiGambar.digital", category: "generatif", icon: "fa-image", files: 22, folders: 12 },
    { name: "Inferensi Kausal", path: "InferensiKausal.digital", category: "analitik", icon: "fa-project-diagram", files: 11, folders: 7 },
    { name: "Investor Malaikat", path: "InvestorMalaikat.digital", category: "lainnya", icon: "fa-hand-holding-usd", files: 9, folders: 5 },
    { name: "Jaringan Bayes", path: "JaringanBayes.digital", category: "jaringan", icon: "fa-project-diagram", files: 13, folders: 8 },
    { name: "Jaringan Generatif", path: "JaringanGeneratif.digital", category: "generatif", icon: "fa-brain", files: 19, folders: 11 },
    { name: "Jaringan Saraf", path: "JaringanSaraf.digital", category: "jaringan", icon: "fa-brain", files: 25, folders: 14 },
    { name: "Keanekaragaman Hayati", path: "KeanekaragamanHayati.digital", category: "lainnya", icon: "fa-leaf", files: 11, folders: 7 },
    { name: "Lintas Rantai", path: "LintasRantai.digital", category: "jaringan", icon: "fa-link", files: 14, folders: 8 },
    { name: "Listrik Tenaga Air", path: "ListrikTenagaAir.digital", category: "lainnya", icon: "fa-bolt", files: 10, folders: 6 },
    { name: "Pembelajaran Federasi", path: "PembelajaranFederasi.digital", category: "pembelajaran", icon: "fa-users", files: 16, folders: 9 },
    { name: "Pemindaian Dep", path: "PemindaianDep.digital", category: "analitik", icon: "fa-search", files: 12, folders: 7 },
    { name: "Penilaian Darurat", path: "PenilaianDarurat.digital", category: "analitik", icon: "fa-exclamation-triangle", files: 11, folders: 6 },
    { name: "Penjelasan AI", path: "PenjelasanAI.digital", category: "analitik", icon: "fa-lightbulb", files: 15, folders: 8 },
    { name: "Penyesuai Klaim", path: "PenyesuaiKlaim.digital", category: "analitik", icon: "fa-clipboard-check", files: 10, folders: 6 },
    { name: "Penyimpanan Baterai", path: "PenyimpananBaterai.digital", category: "lainnya", icon: "fa-car-battery", files: 9, folders: 5 },
    { name: "Perbaiki Otentikasi", path: "PerbaikiOtentikasi.digital", category: "lainnya", icon: "fa-shield-alt", files: 13, folders: 7 },
    { name: "Proyek AI", path: "ProyekAI.digital", category: "lainnya", icon: "fa-folder-open", files: 20, folders: 11 },
    { name: "Rantai Blok", path: "RantaiBlok.digital", category: "lainnya", icon: "fa-link", files: 17, folders: 10 },
    { name: "Reduksi Dimensi", path: "ReduksiDimensi.digital", category: "analitik", icon: "fa-compress-arrows-alt", files: 12, folders: 7 },
    { name: "Rekayasa Fitur", path: "RekayasaFitur.digital", category: "analitik", icon: "fa-tools", files: 14, folders: 8 },
    { name: "Vendor Email", path: "VendorEmail.digital", category: "lainnya", icon: "fa-envelope", files: 8, folders: 5 },
    { name: "AI Studio", path: "ai.digital", category: "jaringan", icon: "fa-robot", files: 21, folders: 12 },
    { name: "AI Chat Reber", path: "aichatreber.digital", category: "generatif", icon: "fa-comments", files: 18, folders: 10 },
    { name: "AI Studio Digital", path: "aistudiodigital.digital", category: "desain", icon: "fa-laptop-code", files: 23, folders: 13 },
    { name: "AutoMind", path: "automind.digital", category: "jaringan", icon: "fa-cogs", files: 16, folders: 9 },
    { name: "BotWise", path: "botwise.digital", category: "generatif", icon: "fa-robot", files: 19, folders: 11 },
    { name: "Digital Core", path: "digital.digital", category: "jaringan", icon: "fa-microchip", files: 24, folders: 14 },
    { name: "NexChat AI", path: "nexchat-ai.digital", category: "generatif", icon: "fa-comment-dots", files: 20, folders: 11 },
    { name: "RAG Engine", path: "rag.digital", category: "analitik", icon: "fa-database", files: 17, folders: 10 }
];

// Statistik global
let totalSystems = 0;
let totalFolders = 0;
let totalFiles = 0;

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    calculateStatistics();
    renderFeaturesGrid(aiSystemsData);
    renderQuickAccessBox();
    renderDirectoryGrid();
    setupEventListeners();
    updateStatisticsDisplay();
}

// Hitung statistik dari data
function calculateStatistics() {
    totalSystems = aiSystemsData.length;
    totalFolders = aiSystemsData.reduce((sum, system) => sum + system.folders, 0);
    totalFiles = aiSystemsData.reduce((sum, system) => sum + system.files, 0);
}

// Update tampilan statistik
function updateStatisticsDisplay() {
    animateNumber('totalSystems', totalSystems, 2000);
    animateNumber('totalFolders', totalFolders, 2000);
    animateNumber('totalFiles', totalFiles, 2000);
}

// Animasi angka
function animateNumber(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('id-ID');
        }
    }, 16);
}

// Render grid fitur (5 item pertama)
function renderFeaturesGrid(data) {
    const grid = document.getElementById('featuresGrid');
    if (!grid) return;
    
    const firstFive = data.slice(0, 5);
    grid.innerHTML = firstFive.map(system => createFeatureCard(system)).join('');
}

// Buat kartu fitur
function createFeatureCard(system) {
    return `
        <div class="feature-card" onclick="openSystemDetail('${system.path}')">
            <span class="status-badge status-active">Aktif</span>
            <div class="feature-icon">
                <i class="fas ${system.icon}"></i>
            </div>
            <h3 class="feature-name">${system.name}</h3>
            <div class="feature-path">${system.path}</div>
            <div class="feature-stats">
                <div class="feature-stat">
                    <i class="fas fa-folder"></i>
                    <span>${system.folders} Folder</span>
                </div>
                <div class="feature-stat">
                    <i class="fas fa-file"></i>
                    <span>${system.files} File</span>
                </div>
            </div>
        </div>
    `;
}

// Render kotak akses cepat
function renderQuickAccessBox() {
    const box = document.getElementById('quickAccessBox');
    if (!box) return;
    
    const studios = [
        { name: "Chat Generation", icon: "fa-comments", path: "studio/chat-generation/index.html", desc: "Asisten AI chat interaktif" },
        { name: "Web App Builder", icon: "fa-code", path: "studio/web-app-builder/index.html", desc: "Pembuat aplikasi web + preview kode" },
        { name: "Design Editor", icon: "fa-palette", path: "studio/design-editor/index.html", desc: "Editor desain grafis AI" },
        { name: "Image Generator", icon: "fa-image", path: "studio/image-generator/index.html", desc: "Pembuat gambar dari prompt" },
        { name: "Video Maker", icon: "fa-video", path: "studio/video-maker/index.html", desc: "Editor video pendek AI" },
        { name: "Search Engine", icon: "fa-search", path: "studio/search-engine/index.html", desc: "Mesin pencari cerdas" }
    ];
    
    box.innerHTML = studios.map(studio => `
        <a href="${studio.path}" class="box-item studio-card" target="_blank">
            <div class="studio-icon-wrapper">
                <i class="fas ${studio.icon}"></i>
            </div>
            <span class="studio-name">${studio.name}</span>
            <span class="studio-desc">${studio.desc}</span>
            <span class="studio-open"><i class="fas fa-external-link-alt"></i></span>
        </a>
    `).join('');
}

// Render grid direktori footer
function renderDirectoryGrid() {
    const grid = document.getElementById('directoryGrid');
    if (!grid) return;
    
    grid.innerHTML = aiSystemsData.map(system => `
        <a href="#" class="directory-link" onclick="openSystemDetail('${system.path}'); return false;" title="${system.name}">
            ${system.path}
        </a>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            if (filter === 'all') {
                renderFeaturesGrid(aiSystemsData);
            } else {
                const filtered = aiSystemsData.filter(s => s.category === filter);
                renderFeaturesGrid(filtered);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchFeatures();
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Scroll to top
    window.addEventListener('scroll', handleScroll);
}

// Fungsi pencarian
function searchFeatures() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const grid = document.getElementById('featuresGrid');
    const noResults = document.getElementById('noResults');
    const loading = document.getElementById('loading');
    
    if (!grid) return;
    
    // Show loading
    if (loading) loading.style.display = 'block';
    grid.innerHTML = '';
    
    setTimeout(() => {
        const filtered = aiSystemsData.filter(system => 
            system.name.toLowerCase().includes(query) ||
            system.path.toLowerCase().includes(query) ||
            system.category.toLowerCase().includes(query)
        );
        
        if (loading) loading.style.display = 'none';
        
        if (filtered.length === 0) {
            grid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            if (noResults) noResults.style.display = 'none';
            renderFeaturesGrid(filtered);
        }
    }, 300);
}

// Filter by category
function filterByCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    const filtered = category === 'all' ? aiSystemsData : aiSystemsData.filter(s => s.category === category);
    renderFeaturesGrid(filtered);
    
    // Scroll to features grid
    document.getElementById('featuresGrid').scrollIntoView({ behavior: 'smooth' });
}

// Toggle directory panel
function toggleDirectoryPanel() {
    const panel = document.getElementById('directoryPanel');
    if (!panel) return;
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        renderSystemsDirectory();
        panel.scrollIntoView({ behavior: 'smooth' });
    } else {
        panel.style.display = 'none';
    }
}

// Render systems directory
function renderSystemsDirectory() {
    const directory = document.getElementById('systemsDirectory');
    if (!directory) return;
    
    directory.innerHTML = aiSystemsData.map(system => `
        <div class="box-item" onclick="openSystemDetail('${system.path}')">
            <i class="fas ${system.icon}"></i>
            <span>${system.name}</span>
        </div>
    `).join('');
}

// Open system detail (modal or new page)
function openSystemDetail(systemPath) {
    // Create detail modal
    const system = aiSystemsData.find(s => s.path === systemPath);
    if (!system) return;
    
    const modalHTML = `
        <div class="modal fade" id="systemDetailModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas ${system.icon} me-2"></i>${system.name}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <h6><i class="fas fa-folder me-2"></i>Path Sistem</h6>
                            <code class="bg-light p-2 d-block">${system.path}</code>
                        </div>
                        
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <i class="fas fa-folder fa-3x text-primary mb-2"></i>
                                        <h3>${system.folders}</h3>
                                        <p class="mb-0">Total Folder</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <i class="fas fa-file fa-3x text-success mb-2"></i>
                                        <h3>${system.files}</h3>
                                        <p class="mb-0">Total File</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <h6><i class="fas fa-list me-2"></i>Menu Sistem</h6>
                            <ul class="list-group">
                                <li class="list-group-item"><i class="fas fa-home me-2"></i>Beranda</li>
                                <li class="list-group-item"><i class="fas fa-cog me-2"></i>Konfigurasi</li>
                                <li class="list-group-item"><i class="fas fa-database me-2"></i>Database</li>
                                <li class="list-group-item"><i class="fas fa-code me-2"></i>API Endpoint</li>
                                <li class="list-group-item"><i class="fas fa-shield-alt me-2"></i>Keamanan</li>
                                <li class="list-group-item"><i class="fas fa-chart-bar me-2"></i>Analitik</li>
                                <li class="list-group-item"><i class="fas fa-question-circle me-2"></i>Bantuan</li>
                            </ul>
                        </div>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Sistem ini siap digunakan. Klik tombol di bawah untuk mengakses.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                        <a href="${system.path}/index.html" class="btn btn-primary">
                            <i class="fas fa-external-link-alt me-2"></i>Akses Sistem
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('systemDetailModal');
    if (existingModal) existingModal.remove();
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('systemDetailModal'));
    modal.show();
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (replace with actual authentication)
    console.log('Login attempt:', email);
    alert('Login berhasil! Selamat datang di AI_MACHINELEARNING.DIGITAL');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
}

// Handle register
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
    }
    
    // Simulate registration (replace with actual registration)
    console.log('Register attempt:', name, email);
    alert('Registrasi berhasil! Silakan login dengan akun Anda.');
    
    // Close modal and open login
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (modal) {
        modal.hide();
        setTimeout(() => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }, 500);
    }
}

// Handle scroll
function handleScroll() {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }
}

// Export functions for external use
window.searchFeatures = searchFeatures;
window.toggleDirectoryPanel = toggleDirectoryPanel;
window.openSystemDetail = openSystemDetail;
window.filterByCategory = filterByCategory;

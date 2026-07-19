// KOMUNIKASI.DIGITAL - Main JavaScript

// Module data structure
const modulesData = [
    {
        id: 'alatkolaborasi',
        name: 'Alat Kolaborasi',
        description: 'Tools untuk kolaborasi tim dan berbagi dokumen',
        icon: 'fa-users',
        status: 'active',
        path: 'AlatKolaborasi.digital/',
        features: ['Chat Tim', 'Berbagi File', 'Kalender Bersama', 'Task Management']
    },
    {
        id: 'komunikasiinternal',
        name: 'Komunikasi Internal',
        description: 'Sistem komunikasi internal organisasi',
        icon: 'fa-building',
        status: 'active',
        path: 'KomunikasiInternal.digital/',
        features: ['Pengumuman', 'Direktori Karyawan', 'Polling', 'Feedback']
    },
    {
        id: 'komunikasikorporat',
        name: 'Komunikasi Korporat',
        description: 'Platform komunikasi untuk kebutuhan korporat',
        icon: 'fa-briefcase',
        status: 'active',
        path: 'KomunikasiKorporat.digital/',
        features: ['Presentasi', 'Laporan', 'Meeting Notes', 'Dokumen Resmi']
    },
    {
        id: 'komunikasikrisis',
        name: 'Komunikasi Krisis',
        description: 'Sistem komunikasi darurat dan krisis',
        icon: 'fa-exclamation-triangle',
        status: 'active',
        path: 'KomunikasiKrisis.digital/',
        features: ['Alert System', 'Emergency Contacts', 'Status Updates', 'Evacuation Plans']
    },
    {
        id: 'konferensivirtual',
        name: 'Konferensi Virtual',
        description: 'Platform konferensi dan meeting online',
        icon: 'fa-video',
        status: 'active',
        path: 'KonferensiVirtual.digital/',
        features: ['Video HD', 'Screen Sharing', 'Recording', 'Breakout Rooms']
    },
    {
        id: 'pertemuanhibrida',
        name: 'Pertemuan Hibrida',
        description: 'Solusi pertemuan hybrid online-offline',
        icon: 'fa-mix',
        status: 'active',
        path: 'PertemuanHibrida.digital/',
        features: ['Hybrid Setup', 'Live Streaming', 'Interactive Q&A', 'Attendance Tracking']
    },
    {
        id: 'syncmate',
        name: 'SyncMate',
        description: 'Sinkronisasi data dan perangkat',
        icon: 'fa-sync',
        status: 'active',
        path: 'syncmate.digital/',
        features: ['Cloud Sync', 'Device Pairing', 'Auto Backup', 'Version Control']
    }
];

// Configuration data
const configData = {
    general: {
        title: 'Pengaturan Umum',
        description: 'Konfigurasi dasar sistem komunikasi digital',
        settings: [
            { name: 'Nama Platform', value: 'Komunikasi.Digital', type: 'text' },
            { name: 'Bahasa Default', value: 'Indonesia', type: 'select' },
            { name: 'Zona Waktu', value: 'Asia/Jakarta', type: 'select' },
            { name: 'Mode Pemeliharaan', value: 'Nonaktif', type: 'toggle' }
        ]
    },
    users: {
        title: 'Manajemen Pengguna',
        description: 'Kelola akses dan izin pengguna sistem',
        settings: [
            { name: 'Registrasi Pengguna', value: 'Diizinkan', type: 'toggle' },
            { name: 'Verifikasi Email', value: 'Wajib', type: 'select' },
            { name: 'Password Minimum', value: '8 karakter', type: 'text' },
            { name: 'Session Timeout', value: '30 menit', type: 'number' }
        ]
    },
    database: {
        title: 'Database & Penyimpanan',
        description: 'Kelola data dan backup sistem',
        settings: [
            { name: 'Auto Backup', value: 'Aktif', type: 'toggle' },
            { name: 'Jadwal Backup', value: 'Harian', type: 'select' },
            { name: 'Retensi Data', value: '90 hari', type: 'select' },
            { name: 'Kompresi Data', value: 'Aktif', type: 'toggle' }
        ]
    },
    network: {
        title: 'Jaringan & API',
        description: 'Konfigurasi koneksi dan integrasi',
        settings: [
            { name: 'API Endpoint', value: 'https://api.komunikasi.digital', type: 'text' },
            { name: 'Rate Limit', value: '1000 request/jam', type: 'text' },
            { name: 'CORS Enabled', value: 'Ya', type: 'toggle' },
            { name: 'SSL/TLS', value: 'Aktif', type: 'toggle' }
        ]
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    setupEventListeners();
    checkAuthStatus();
});

// Load modules dynamically
function loadModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    const moduleDropdown = document.getElementById('moduleDropdown');
    
    if (modulesGrid) {
        modulesGrid.innerHTML = modulesData.map(module => `
            <div class="module-card" onclick="showModuleDetail('${module.id}')">
                <div class="module-icon">
                    <i class="fas fa-${module.icon}"></i>
                </div>
                <h3>${module.name}</h3>
                <p>${module.description}</p>
                <span class="module-status status-${module.status}">
                    ${module.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
            </div>
        `).join('');
    }
    
    if (moduleDropdown) {
        moduleDropdown.innerHTML = modulesData.map(module => `
            <li><a href="#" onclick="showModuleDetail('${module.id}'); return false;">${module.name}</a></li>
        `).join('');
    }
}

// Show module detail
function showModuleDetail(moduleId) {
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return;
    
    const detailModal = document.getElementById('detailModal');
    const detailTitle = document.getElementById('detailTitle');
    const detailBadge = document.getElementById('detailBadge');
    const detailContent = document.getElementById('detailContent');
    const detailActionBtn = document.getElementById('detailActionBtn');
    
    detailTitle.textContent = module.name;
    detailBadge.textContent = module.status === 'active' ? 'Aktif' : 'Nonaktif';
    detailBadge.className = `badge ${module.status === 'active' ? 'status-active' : 'status-inactive'}`;
    
    detailContent.innerHTML = `
        <h3>Deskripsi</h3>
        <p>${module.description}</p>
        
        <h3>Fitur Utama</h3>
        <ul>
            ${module.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>Lokasi Modul</h3>
        <p><code>${module.path}</code></p>
        
        <h3>Status Sistem</h3>
        <p>Modul ini siap digunakan dan terintegrasi dengan sistem Komunikasi.Digital</p>
    `;
    
    detailActionBtn.onclick = function() {
        window.location.href = module.path;
    };
    
    detailModal.classList.add('active');
}

// Close detail modal
function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// Auth modal functions
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authTitle').textContent = 'Masuk';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Daftar';
}

// Config modal functions
function openConfig(configType) {
    const config = configData[configType];
    if (!config) return;
    
    const detailModal = document.getElementById('detailModal');
    const detailTitle = document.getElementById('detailTitle');
    const detailBadge = document.getElementById('detailBadge');
    const detailContent = document.getElementById('detailContent');
    const detailActionBtn = document.getElementById('detailActionBtn');
    
    detailTitle.textContent = config.title;
    detailBadge.style.display = 'none';
    
    detailContent.innerHTML = `
        <h3>${config.description}</h3>
        <form class="config-form">
            ${config.settings.map(setting => `
                <div class="form-group">
                    <label>${setting.name}</label>
                    <input type="${setting.type === 'toggle' ? 'checkbox' : setting.type === 'number' ? 'number' : 'text'}" 
                           value="${setting.value}" 
                           ${setting.type === 'checkbox' && setting.value === 'Aktif' ? 'checked' : ''}>
                </div>
            `).join('')}
        </form>
        <div style="margin-top: 20px; padding: 15px; background: #e6f2ff; border-radius: 8px;">
            <p><strong>Catatan:</strong> Perubahan konfigurasi akan diterapkan setelah menyimpan pengaturan.</p>
        </div>
    `;
    
    detailActionBtn.textContent = 'Simpan Konfigurasi';
    detailActionBtn.onclick = function() {
        alert('Konfigurasi berhasil disimpan!');
        closeDetailModal();
    };
    
    detailModal.classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    // Login form submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulate login
            console.log('Login attempt:', email);
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            closeAuthModal();
            checkAuthStatus();
            alert('Login berhasil! Selamat datang di Komunikasi.Digital');
        });
    }
    
    // Register form submit
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirm').value;
            
            if (password !== confirm) {
                alert('Kata sandi tidak cocok!');
                return;
            }
            
            // Simulate registration
            console.log('Registration:', name, email);
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            closeAuthModal();
            checkAuthStatus();
            alert('Pendaftaran berhasil! Selamat bergabung dengan Komunikasi.Digital');
        });
    }
    
    // Close modals on outside click
    window.addEventListener('click', function(e) {
        const authModal = document.getElementById('authModal');
        const detailModal = document.getElementById('detailModal');
        
        if (e.target === authModal) {
            closeAuthModal();
        }
        if (e.target === detailModal) {
            closeDetailModal();
        }
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userProfile = document.getElementById('userProfile');
    const authButton = document.querySelector('.header-actions .btn-outline');
    
    if (isLoggedIn) {
        const userName = localStorage.getItem('userName') || 'User';
        const userEmail = localStorage.getItem('userEmail') || '';
        
        if (userProfile) {
            userProfile.style.display = 'flex';
            userProfile.querySelector('.username').textContent = userName;
        }
        if (authButton) {
            authButton.style.display = 'none';
        }
    } else {
        if (userProfile) {
            userProfile.style.display = 'none';
        }
        if (authButton) {
            authButton.style.display = 'block';
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    checkAuthStatus();
    alert('Anda telah keluar dari sistem');
}

// Export for external use
window.KomunikasiDigital = {
    modules: modulesData,
    configs: configData,
    showModuleDetail,
    openConfig,
    logout
};

console.log('Komunikasi.Digital initialized successfully!');

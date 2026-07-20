<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArsipVersi.Digital - Platform Manajemen Konten Digital</title>
    
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-container">
            <a href="/" class="logo">
                <div class="logo-icon">📁</div>
                <span>ArsipVersi.Digital</span>
            </a>
            
            <nav class="nav-menu">
                <div class="nav-item">
                    <a href="/" class="nav-link active">Beranda</a>
                </div>
                <div class="nav-item has-dropdown">
                    <a href="#modules" class="nav-link">Modul <span class="arrow">▼</span></a>
                    <ul class="dropdown-menu" id="category-menu">
                        <li><a href="#" onclick="filterByCategory('all')">Semua Modul</a></li>
                        <li class="dropdown-divider"></li>
                        <!-- Categories will be loaded dynamically -->
                    </ul>
                </div>
                <div class="nav-item">
                    <a href="#about" class="nav-link">Tentang</a>
                </div>
                <div class="nav-item">
                    <a href="#contact" class="nav-link">Kontak</a>
                </div>
            </nav>
            
            <div class="auth-buttons" id="auth-buttons">
                <button class="btn-login" onclick="showLoginModal()">Masuk</button>
                <button class="btn-register" onclick="showRegisterModal()">Daftar</button>
            </div>
            
            <div class="user-menu hidden" id="user-menu">
                <span id="user-greeting"></span>
                <button class="btn-login" onclick="handleLogout()">Keluar</button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-wrapper">
        <div class="container">
            <!-- Page Header -->
            <div class="page-header">
                <h1 class="page-title">Selamat Datang di ArsipVersi.Digital</h1>
                <p class="page-subtitle">Platform manajemen konten digital terintegrasi dengan antarmuka modern dan fungsionalitas lengkap</p>
            </div>
            
            <!-- Search Bar -->
            <div class="search-container mb-3">
                <input type="text" id="module-search" class="form-input" placeholder="Cari modul..." style="max-width: 500px; margin: 0 auto; display: block;">
            </div>
            
            <!-- Modules Grid -->
            <div class="modules-grid" id="modules-grid">
                <!-- Modules will be loaded dynamically -->
                <div class="loading-state">
                    <p>Memuat modul...</p>
                </div>
            </div>
        </div>
    </main>

    <!-- Login Modal -->
    <div id="login-modal" class="modal hidden">
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-header">
                    <div class="auth-logo">📁</div>
                    <h2 class="auth-title">Masuk</h2>
                    <p class="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
                </div>
                
                <form id="login-form">
                    <input type="hidden" name="csrf_token" value="<?php echo generateCsrfToken(); ?>">
                    
                    <div class="form-group">
                        <label class="form-label" for="login-username">Username atau Email</label>
                        <input type="text" id="login-username" name="username" class="form-input" placeholder="Masukkan username atau email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="login-password">Password</label>
                        <input type="password" id="login-password" name="password" class="form-input" placeholder="Masukkan password" required>
                    </div>
                    
                    <div class="form-checkbox">
                        <input type="checkbox" id="remember-me" name="remember" class="checkbox-input">
                        <label for="remember-me" class="checkbox-label">Ingat saya</label>
                    </div>
                    
                    <button type="submit" class="btn-submit">Masuk</button>
                </form>
                
                <div class="auth-footer">
                    <p>Belum punya akun? <a href="#" onclick="showRegisterModal()">Daftar sekarang</a></p>
                    <p><a href="#" onclick="showForgotPasswordModal()">Lupa password?</a></p>
                </div>
                
                <button class="btn-secondary mt-2" onclick="closeModal('login-modal')" style="width: 100%;">Tutup</button>
            </div>
        </div>
    </div>

    <!-- Register Modal -->
    <div id="register-modal" class="modal hidden">
        <div class="auth-container">
            <div class="auth-box">
                <div class="auth-header">
                    <div class="auth-logo">📁</div>
                    <h2 class="auth-title">Daftar</h2>
                    <p class="auth-subtitle">Buat akun baru untuk memulai</p>
                </div>
                
                <form id="register-form">
                    <input type="hidden" name="csrf_token" value="<?php echo generateCsrfToken(); ?>">
                    
                    <div class="form-group">
                        <label class="form-label" for="register-username">Username</label>
                        <input type="text" id="register-username" name="username" class="form-input" placeholder="Pilih username" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-email">Email</label>
                        <input type="email" id="register-email" name="email" class="form-input" placeholder="Masukkan email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-fullname">Nama Lengkap</label>
                        <input type="text" id="register-fullname" name="full_name" class="form-input" placeholder="Masukkan nama lengkap">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-password">Password</label>
                        <input type="password" id="register-password" name="password" class="form-input" placeholder="Minimal 6 karakter" required minlength="6">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="register-confirm-password">Konfirmasi Password</label>
                        <input type="password" id="register-confirm-password" name="confirm_password" class="form-input" placeholder="Ulangi password" required>
                    </div>
                    
                    <button type="submit" class="btn-submit">Daftar</button>
                </form>
                
                <div class="auth-footer">
                    <p>Sudah punya akun? <a href="#" onclick="showLoginModal()">Masuk sekarang</a></p>
                </div>
                
                <button class="btn-secondary mt-2" onclick="closeModal('register-modal')" style="width: 100%;">Tutup</button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>Tentang ArsipVersi.Digital</h3>
                    <p>Platform manajemen konten digital terintegrasi yang menyediakan berbagai modul untuk kebutuhan bisnis dan organisasi Anda.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Tautan Cepat</h3>
                    <ul class="footer-links">
                        <li><a href="/">Beranda</a></li>
                        <li><a href="#modules">Modul</a></li>
                        <li><a href="#about">Tentang Kami</a></li>
                        <li><a href="#contact">Kontak</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Kategori</h3>
                    <ul class="footer-links" id="footer-categories">
                        <!-- Categories will be loaded dynamically -->
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Informasi</h3>
                    <ul class="footer-links">
                        <li><a href="#">Kebijakan Privasi</a></li>
                        <li><a href="#">Syarat & Ketentuan</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Bantuan</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p class="footer-copyright">© <?php echo date('Y'); ?> ArsipVersi.Digital. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    
    <script>
        // Load modules on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadModules();
            loadCategories();
            checkAuthStatus();
        });
        
        // Load all modules
        async function loadModules() {
            try {
                const response = await fetch('/system/api/modules.php?action=list');
                const data = await response.json();
                
                if (data.success) {
                    renderModules(data.data.modules);
                    renderCategories(data.data.categories);
                } else {
                    document.getElementById('modules-grid').innerHTML = '<p class="text-center">Gagal memuat modul</p>';
                }
            } catch (error) {
                console.error('Error loading modules:', error);
                document.getElementById('modules-grid').innerHTML = '<p class="text-center">Terjadi kesalahan saat memuat modul</p>';
            }
        }
        
        // Render modules grid
        function renderModules(modules) {
            const grid = document.getElementById('modules-grid');
            
            if (modules.length === 0) {
                grid.innerHTML = '<p class="text-center">Tidak ada modul yang ditemukan</p>';
                return;
            }
            
            grid.innerHTML = modules.map(module => `
                <div class="module-card" data-module-id="${module.id}" data-module-slug="${module.slug}" data-category="${module.category}">
                    <div class="module-icon">${module.icon}</div>
                    <h3 class="module-title">${module.title}</h3>
                    <p class="module-description">${truncateText(module.description, 100)}</p>
                    <div class="module-meta">
                        <span class="module-version">v${module.version}</span>
                        <div class="module-status">
                            <span class="status-indicator"></span>
                            <span>${module.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Load and render categories
        async function loadCategories() {
            try {
                const response = await fetch('/system/api/modules.php?action=categories');
                const data = await response.json();
                
                if (data.success) {
                    renderCategoryMenu(data.data);
                    renderFooterCategories(data.data);
                }
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        }
        
        function renderCategoryMenu(categories) {
            const menu = document.getElementById('category-menu');
            const categoryItems = categories.map(cat => `
                <li><a href="#" onclick="filterByCategory('${cat.name}')">${cat.icon} ${cat.name} (${cat.count})</a></li>
            `).join('');
            
            menu.innerHTML = `
                <li><a href="#" onclick="filterByCategory('all')">Semua Modul</a></li>
                <li class="dropdown-divider"></li>
                ${categoryItems}
            `;
        }
        
        function renderFooterCategories(categories) {
            const footerList = document.getElementById('footer-categories');
            footerList.innerHTML = categories.slice(0, 8).map(cat => `
                <li><a href="#" onclick="filterByCategory('${cat.name}')">${cat.icon} ${cat.name}</a></li>
            `).join('');
        }
        
        // Filter by category
        function filterByCategory(category) {
            const cards = document.querySelectorAll('.module-card');
            
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Check authentication status
        async function checkAuthStatus() {
            try {
                const response = await fetch('/system/api/auth.php?action=check');
                const data = await response.json();
                
                if (data.success && data.authenticated) {
                    showUserMenu(data.user);
                } else {
                    showAuthButtons();
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                showAuthButtons();
            }
        }
        
        function showUserMenu(user) {
            document.getElementById('auth-buttons').classList.add('hidden');
            document.getElementById('user-menu').classList.remove('hidden');
            document.getElementById('user-greeting').textContent = 'Halo, ' + (user.full_name || user.username);
        }
        
        function showAuthButtons() {
            document.getElementById('auth-buttons').classList.remove('hidden');
            document.getElementById('user-menu').classList.add('hidden');
        }
        
        // Modal functions
        function showLoginModal() {
            openModal('login-modal');
        }
        
        function showRegisterModal() {
            openModal('register-modal');
        }
        
        function showForgotPasswordModal() {
            alert('Fitur lupa password akan segera tersedia');
        }
        
        // Logout handler
        async function handleLogout() {
            if (!confirm('Apakah Anda yakin ingin keluar?')) return;
            
            try {
                const response = await fetch('/system/api/auth.php?action=logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    window.location.reload();
                }
            } catch (error) {
                console.error('Logout error:', error);
                window.location.reload();
            }
        }
        
        // Utility function
        function truncateText(text, maxLength) {
            if (!text) return '';
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        }
    </script>
</body>
</html>

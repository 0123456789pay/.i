/**
 * newsnia.digital - Main JavaScript
 * Fungsi untuk menu bertingkat, interaksi UI, dan komponen dinamis
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Bertingkat Interaktif
    initDropdownMenus();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Search Functionality
    initSearch();
    
    // Login/Register Modal
    initAuthModal();
    
    // Load Dynamic Content
    loadMenuItems();
});

// Initialize Dropdown Menus
function initDropdownMenus() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown) {
            // Desktop hover
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'block';
            });
            
            item.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!item.matches(':hover')) {
                        dropdown.style.display = 'none';
                    }
                }, 200);
            });
            
            // Mobile click
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isVisible = dropdown.style.display === 'block';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        if (menu !== dropdown) {
                            menu.style.display = 'none';
                        }
                    });
                    
                    dropdown.style.display = isVisible ? 'none' : 'block';
                }
            });
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Search Functionality
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Redirect to search results
                window.location.href = `search.php?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Auth Modal Functions
function initAuthModal() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const closeBtn = document.querySelector('.modal-close');
    const modal = document.querySelector('.auth-modal');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showAuthModal('login');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showAuthModal('register');
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}

function showAuthModal(type) {
    const modal = document.querySelector('.auth-modal');
    const loginForm = document.querySelector('.login-form-container');
    const registerForm = document.querySelector('.register-form-container');
    
    if (modal) {
        modal.classList.remove('hidden');
        
        if (type === 'login' && loginForm) {
            loginForm.classList.remove('hidden');
            if (registerForm) registerForm.classList.add('hidden');
        } else if (type === 'register' && registerForm) {
            registerForm.classList.remove('hidden');
            if (loginForm) loginForm.classList.add('hidden');
        }
    }
}

// Load Menu Items Dynamically
function loadMenuItems() {
    fetch('includes/menu_loader.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderMenu(data.menus);
            }
        })
        .catch(error => console.error('Error loading menus:', error));
}

function renderMenu(menus) {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    
    const mainMenus = menus.filter(menu => menu.parent_id === null);
    
    let html = '';
    mainMenus.forEach(menu => {
        const hasChildren = menus.some(m => m.parent_id === menu.id);
        
        html += `<li class="nav-item ${hasChildren ? 'dropdown' : ''}">`;
        html += `<a href="${menu.slug}" class="nav-link">${menu.title}`;
        
        if (hasChildren) {
            html += ' <span class="dropdown-arrow">▼</span>';
        }
        
        html += '</a>';
        
        if (hasChildren) {
            html += '<ul class="dropdown-menu">';
            const children = menus.filter(m => m.parent_id === menu.id);
            
            children.forEach(child => {
                const hasSubChildren = menus.some(m => m.parent_id === child.id);
                
                html += `<li class="${hasSubChildren ? 'dropdown-submenu' : ''}">`;
                html += `<a href="${child.slug}">${child.title}`;
                
                if (hasSubChildren) {
                    html += ' <span class="submenu-arrow">▶</span>';
                }
                
                html += '</a>';
                
                if (hasSubChildren) {
                    html += '<ul class="sub-dropdown-menu">';
                    const subChildren = menus.filter(m => m.parent_id === child.id);
                    
                    subChildren.forEach(subChild => {
                        html += `<li><a href="${subChild.slug}">${subChild.title}</a></li>`;
                    });
                    
                    html += '</ul>';
                }
                
                html += '</li>';
            });
            
            html += '</ul>';
        }
        
        html += '</li>';
    });
    
    navList.innerHTML = html;
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('.form-control[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#dee2e6';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#dc3545';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// AJAX Form Submission
function submitForm(formId, url) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    if (!validateForm(formId)) {
        alert('Mohon lengkapi semua field yang wajib diisi');
        return;
    }
    
    const formData = new FormData(form);
    
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } else {
            alert(data.message || 'Terjadi kesalahan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan pada server');
    });
}

// Load News Content
function loadNews(category = '', page = 1) {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    const url = category 
        ? `modules/berita/news_loader.php?category=${category}&page=${page}`
        : `modules/berita/news_loader.php?page=${page}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderNewsCards(data.posts, newsGrid);
            }
        })
        .catch(error => console.error('Error loading news:', error));
}

function renderNewsCards(posts, container) {
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="text-center">Tidak ada berita ditemukan</p>';
        return;
    }
    
    let html = '';
    posts.forEach(post => {
        html += `
            <article class="news-card">
                <img src="${post.featured_image || 'assets/images/placeholder.jpg'}" 
                     alt="${post.title}" class="news-card-image">
                <div class="news-card-content">
                    <span class="news-card-category">${post.category_name || 'Umum'}</span>
                    <h3 class="news-card-title">
                        <a href="detail.php?slug=${post.slug}">${post.title}</a>
                    </h3>
                    <p class="news-card-excerpt">${post.excerpt || post.content.substring(0, 150)}...</p>
                    <div class="news-card-meta">
                        <span>${formatDate(post.published_at)}</span>
                        <span>${post.views || 0} views</span>
                    </div>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Utility: Debounce function for search
function debounce(func, wait) {
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

// Export functions for global use
window.newsnia = {
    loadNews,
    submitForm,
    validateForm,
    showAuthModal
};

// ============================================
// Fungsi untuk halaman HTML (tanpa PHP)
// ============================================

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    const authButtons = document.getElementById('authButtons');
    const headerAuthButtons = document.getElementById('headerAuthButtons');
    
    if (isLoggedIn === 'true' && username) {
        if (authButtons) {
            authButtons.innerHTML = `
                <span style="color: white; margin-right: 15px;">Halo, ${username}</span>
                <a href="logout.html" class="btn btn-outline" style="border-color: white; color: white;">Logout</a>
            `;
        }
        if (headerAuthButtons) {
            headerAuthButtons.style.display = 'none';
        }
    }
}

// Load main menu from API or simulate
function loadMainMenu() {
    const menuElement = document.getElementById('mainMenu');
    if (!menuElement) return;
    
    // Simulate menu data (in real implementation, fetch from API)
    const menus = [
        { title: 'Beranda', slug: 'index.html', children: [] },
        { 
            title: 'Berita', 
            slug: 'modules/berita/index.html',
            children: [
                { title: 'Nasional', slug: 'kategori/nasional.html', children: [] },
                { title: 'Internasional', slug: 'kategori/internasional.html', children: [] },
                { title: 'Ekonomi', slug: 'kategori/ekonomi.html', children: [] }
            ]
        },
        { 
            title: 'Publikasi', 
            slug: 'modules/publikasi/index.html',
            children: []
        },
        { 
            title: 'Galeri', 
            slug: 'modules/galeri/index.html',
            children: []
        },
        { 
            title: 'Event', 
            slug: 'modules/event/index.html',
            children: []
        },
        { 
            title: 'Direktori', 
            slug: 'modules/direktori/index.html',
            children: []
        }
    ];
    
    menuElement.innerHTML = renderMenuHTML(menus);
}

function renderMenuHTML(menus, level = 0) {
    let html = level === 0 ? '<ul class="nav-list">' : (level === 1 ? '<ul class="dropdown-menu">' : '<ul class="sub-dropdown-menu">');
    
    menus.forEach(menu => {
        const hasChildren = menu.children && menu.children.length > 0;
        const submenuClass = hasChildren ? 'dropdown-submenu' : '';
        
        html += `<li class="nav-item ${submenuClass}">`;
        html += `<a href="${menu.slug}" class="nav-link">${menu.title}`;
        
        if (hasChildren && level === 0) {
            html += ' <span class="dropdown-arrow">▼</span>';
        } else if (hasChildren && level > 0) {
            html += ' <span class="submenu-arrow">▶</span>';
        }
        
        html += '</a>';
        
        if (hasChildren) {
            html += renderMenuHTML(menu.children, level + 1);
        }
        
        html += '</li>';
    });
    
    html += '</ul>';
    return html;
}

// Load latest posts with professional news layout
function loadLatestPosts() {
    const container = document.getElementById('latestPosts');
    if (!container) return;
    
    // Simulate posts data with realistic news content
    const posts = [
        {
            title: 'Pemerintah Luncurkan Strategi Baru Transformasi Digital Nasional',
            excerpt: 'Pemerintah resmi meluncurkan roadmap transformasi digital 2024-2029 yang fokus pada peningkatan infrastruktur digital, pengembangan SDM, dan akselerasi adopsi teknologi di sektor publik...',
            category_name: 'Nasional',
            published_at: '2024-01-15',
            views: 12340,
            slug: 'pemerintah-luncurkan-strategi-transformasi-digital'
        },
        {
            title: 'Ekonomi Digital Indonesia Diproyeksikan Tumbuh 25% Tahun Ini',
            excerpt: 'Bank Indonesia memproyeksikan ekonomi digital tanah air akan tumbuh signifikan didorong oleh peningkatan transaksi e-commerce, fintech, dan layanan digital lainnya...',
            category_name: 'Ekonomi',
            published_at: '2024-01-14',
            views: 9876,
            slug: 'ekonomi-digital-indonesia-tumbuh-25-persen'
        },
        {
            title: 'Inovasi AI Terbaru Revolusioner untuk Industri Kreatif',
            excerpt: 'Perkembangan kecerdasan buatan terus berlanjut dengan hadirnya tools AI generatif yang mampu membantu pekerja kreatif dalam menghasilkan konten berkualitas tinggi...',
            category_name: 'Teknologi',
            published_at: '2024-01-13',
            views: 8765,
            slug: 'inovasi-ai-terbaru-revolusioner'
        },
        {
            title: 'Timnas Indonesia Siap Hadapi Turnamen Internasional',
            excerpt: 'Pelatih kepala optimis dengan persiapan yang telah dilakukan, tim nasional sepak bola Indonesia siap bersaing di turnamen bergengsi tingkat Asia...',
            category_name: 'Olahraga',
            published_at: '2024-01-12',
            views: 15432,
            slug: 'timnas-indonesia-siap-turnamen-internasional'
        },
        {
            title: 'Festival Budaya Digital 2024 Angkat Tema Kearifan Lokal',
            excerpt: 'Event tahunan yang menggabungkan teknologi dan budaya tradisional ini akan menampilkan berbagai instalasi interaktif dan pertunjukan seni kontemporer...',
            category_name: 'Budaya',
            published_at: '2024-01-11',
            views: 6543,
            slug: 'festival-budaya-digital-2024'
        },
        {
            title: 'Startup Lokal Raih Pendanaan Seri B Senilai USD 50 Juta',
            excerpt: 'Perusahaan rintisan berbasis teknologi finansial ini berhasil menarik minat investor global berkat inovasi produk dan pertumbuhan pengguna yang pesat...',
            category_name: 'Bisnis',
            published_at: '2024-01-10',
            views: 7654,
            slug: 'startup-lokal-raih-pendanaan-seri-b'
        }
    ];
    
    let html = '';
    posts.forEach((post, index) => {
        const isFeatured = index === 0;
        const gradient = getRandomGradient();
        html += `
        <article class="news-card${isFeatured ? ' featured' : ''}">
            <div class="news-card-image" style="background: linear-gradient(135deg, ${gradient});"></div>
            <div class="news-card-content">
                <span class="news-card-category">${post.category_name}</span>
                <h3 class="news-card-title">
                    <a href="detail.html?slug=${post.slug}">${post.title}</a>
                </h3>
                <p class="news-card-excerpt">${post.excerpt}</p>
                <div class="news-card-meta">
                    <span class="news-card-meta-item">
                        <svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${formatDate(post.published_at)}
                    </span>
                    <span class="news-card-meta-item">
                        <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        ${formatNumber(post.views)} views
                    </span>
                </div>
            </div>
        </article>`;
    });
    
    container.innerHTML = html;
}

// Helper function for random gradient backgrounds
function getRandomGradient() {
    const gradients = [
        '#1a56db, #1e40af',
        '#0ea5e9, #0284c7',
        '#3b82f6, #2563eb',
        '#1e3a8a, #1e40af',
        '#60a5fa, #3b82f6',
        '#2563eb, #1d4ed8'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Format number with K suffix
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Load trending posts with realistic news content
function loadTrendingPosts() {
    const container = document.getElementById('trendingPosts');
    if (!container) return;
    
    const posts = [
        { title: 'Pemerintah Luncurkan Strategi Baru Transformasi Digital Nasional', slug: 'pemerintah-luncurkan-strategi-transformasi-digital' },
        { title: 'Ekonomi Digital Indonesia Diproyeksikan Tumbuh 25% Tahun Ini', slug: 'ekonomi-digital-indonesia-tumbuh-25-persen' },
        { title: 'Timnas Indonesia Siap Hadapi Turnamen Internasional', slug: 'timnas-indonesia-siap-turnamen-internasional' },
        { title: 'Inovasi AI Terbaru Revolusioner untuk Industri Kreatif', slug: 'inovasi-ai-terbaru-revolusioner' },
        { title: 'Startup Lokal Raih Pendanaan Seri B Senilai USD 50 Juta', slug: 'startup-lokal-raih-pendanaan-seri-b' }
    ];
    
    let html = '';
    posts.forEach((post, index) => {
        html += `
        <li>
            <div class="trending-item">
                <span class="trending-number">${index + 1}</span>
                <div>
                    <a href="detail.html?slug=${post.slug}">${post.title}</a>
                    <div class="trending-meta">
                        <svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${index + 1} jam yang lalu
                    </div>
                </div>
            </div>
        </li>`;
    });
    
    container.innerHTML = html;
}

// Load categories
function loadCategories() {
    const container = document.getElementById('categoriesList');
    if (!container) return;
    
    const categories = [
        { name: 'Nasional', count: 124 },
        { name: 'Internasional', count: 89 },
        { name: 'Ekonomi', count: 156 },
        { name: 'Teknologi', count: 203 },
        { name: 'Olahraga', count: 178 },
        { name: 'Hiburan', count: 145 },
        { name: 'Bisnis', count: 167 },
        { name: 'Budaya', count: 92 }
    ];
    
    let html = '';
    categories.forEach(cat => {
        html += `
        <a href="kategori/${cat.name.toLowerCase()}.html" class="category-pill">
            ${cat.name}
            <span class="count">${cat.count}</span>
        </a>`;
    });
    
    container.innerHTML = html;
}

// Load article detail
function loadArticleDetail(slug) {
    const container = document.getElementById('articleContent');
    if (!container) return;
    
    // Simulate article data
    const article = {
        title: 'Detail Berita: ' + slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        category_name: 'Nasional',
        author_name: 'Redaksi newsnia.digital',
        published_at: '2024-01-15 10:30:00',
        views: 1234,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        featured_image: 'assets/images/placeholder.jpg',
        excerpt: 'Ini adalah cuplikan dari artikel berita yang sedang ditampilkan.'
    };
    
    document.getElementById('breadcrumbTitle').textContent = article.title;
    
    let html = `
        <header class="detail-header">
            <span class="news-card-category" style="margin-bottom: 15px; display: inline-block;">
                ${article.category_name}
            </span>
            <h1 class="detail-title">${article.title}</h1>
            
            <div class="detail-meta">
                <span>👤 Oleh: ${article.author_name}</span>
                <span>📅 ${new Date(article.published_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})} WIB</span>
                <span>👁️ ${article.views.toLocaleString()} kali dibaca</span>
            </div>
        </header>
        
        <figure style="margin: 30px 0;">
            <img src="${article.featured_image}" alt="${article.title}" 
                 style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 8px;">
            <figcaption style="text-align: center; color: var(--gray); font-size: 14px; margin-top: 10px; font-style: italic;">
                ${article.excerpt}
            </figcaption>
        </figure>
        
        <div class="detail-body">
            ${article.content.split('\n\n').map(p => '<p>' + p + '</p>').join('')}
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <strong style="color: var(--gray);">Bagikan:</strong>
                    <div style="display: inline-flex; gap: 10px; margin-left: 10px;">
                        <a href="#" style="background: #3b5998; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">Facebook</a>
                        <a href="#" style="background: #1da1f2; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">Twitter</a>
                        <a href="#" style="background: #25d366; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Load related posts
function loadRelatedPosts(slug) {
    const container = document.getElementById('relatedPosts');
    if (!container) return;
    
    const posts = [
        {
            title: 'Berita Terkait 1',
            category_name: 'Nasional',
            published_at: '2024-01-14',
            views: 890,
            slug: 'berita-terkait-1',
            featured_image: 'assets/images/placeholder.jpg'
        },
        {
            title: 'Berita Terkait 2',
            category_name: 'Ekonomi',
            published_at: '2024-01-13',
            views: 654,
            slug: 'berita-terkait-2',
            featured_image: 'assets/images/placeholder.jpg'
        }
    ];
    
    let html = '';
    posts.forEach(post => {
        html += `
        <article class="news-card">
            <img src="${post.featured_image}" alt="${post.title}" class="news-card-image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="news-card-content">
                <span class="news-card-category">${post.category_name}</span>
                <h3 class="news-card-title">
                    <a href="detail.html?slug=${post.slug}">${post.title}</a>
                </h3>
                <div class="news-card-meta">
                    <span>${new Date(post.published_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    <span>${post.views.toLocaleString()} views</span>
                </div>
            </div>
        </article>`;
    });
    
    container.innerHTML = html;
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

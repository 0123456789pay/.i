/**
 * Main JavaScript for manajemenfile.digital
 * Shared functionality for all .digital sites
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initLoginForm();
    initRegisterForm();
    initLogout();
    loadDynamicMenus();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });
    }
}

/**
 * Login Form Handler
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('loginMessage');
            
            messageDiv.innerHTML = '<div class="alert alert-info">Memproses login...</div>';
            
            try {
                const formData = new FormData();
                formData.append('action', 'login');
                formData.append('username', username);
                formData.append('password', password);
                
                const response = await fetch('/manajemenfile.digital/api/auth.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    messageDiv.innerHTML = '<div class="alert alert-success">' + result.message + '</div>';
                    setTimeout(() => {
                        window.location.href = result.redirect || '/newsnia.digital/';
                    }, 1000);
                } else {
                    messageDiv.innerHTML = '<div class="alert alert-error">' + result.message + '</div>';
                }
            } catch (error) {
                messageDiv.innerHTML = '<div class="alert alert-error">Terjadi kesalahan. Silakan coba lagi.</div>';
                console.error('Login error:', error);
            }
        });
    }
}

/**
 * Register Form Handler
 */
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg_username').value;
            const email = document.getElementById('reg_email').value;
            const password = document.getElementById('reg_password').value;
            const confirmPassword = document.getElementById('reg_confirm_password').value;
            const messageDiv = document.getElementById('registerMessage');
            
            // Validation
            if (password !== confirmPassword) {
                messageDiv.innerHTML = '<div class="alert alert-error">Password tidak cocok!</div>';
                return;
            }
            
            if (password.length < 6) {
                messageDiv.innerHTML = '<div class="alert alert-error">Password minimal 6 karakter!</div>';
                return;
            }
            
            messageDiv.innerHTML = '<div class="alert alert-info">Memproses registrasi...</div>';
            
            // Note: Registration API needs to be implemented
            messageDiv.innerHTML = '<div class="alert alert-info">Fitur registrasi akan segera tersedia. Hubungi administrator.</div>';
        });
    }
}

/**
 * Logout Handler
 */
function initLogout() {
    const logoutLinks = document.querySelectorAll('.logout-link');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            
            try {
                const formData = new FormData();
                formData.append('action', 'logout');
                
                const response = await fetch('/manajemenfile.digital/api/auth.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    window.location.href = result.redirect || '/newsnia.digital/login.php';
                }
            } catch (error) {
                console.error('Logout error:', error);
                window.location.href = '/newsnia.digital/login.php';
            }
        });
    });
}

/**
 * Load Dynamic Menus from Database
 */
async function loadDynamicMenus() {
    const navContainer = document.querySelector('.main-nav > ul');
    
    if (!navContainer) return;
    
    try {
        const response = await fetch('/manajemenfile.digital/api/menus.php?action=all');
        const result = await response.json();
        
        if (result.success && result.menus && result.menus.length > 0) {
            navContainer.innerHTML = buildMenuHTML(result.menus);
        }
    } catch (error) {
        console.error('Error loading menus:', error);
    }
}

/**
 * Build Menu HTML recursively
 */
function buildMenuHTML(menus, level = 0) {
    let html = '';
    
    menus.forEach(menu => {
        const hasChildren = menu.children && menu.children.length > 0;
        const submenuClass = hasChildren ? 'has-submenu' : '';
        
        if (level === 0) {
            html += `<li class="${submenuClass}">`;
            if (menu.url) {
                html += `<a href="${menu.url}">${menu.title}</a>`;
            } else {
                html += `<a href="#">${menu.title}</a>`;
            }
            
            if (hasChildren) {
                html += `<ul class="dropdown-menu">`;
                html += buildMenuHTML(menu.children, level + 1);
                html += `</ul>`;
            }
            html += `</li>`;
        } else {
            html += `<li class="${submenuClass}">`;
            if (menu.url) {
                html += `<a href="${menu.url}">${menu.title}</a>`;
            } else {
                html += `<a href="#">${menu.title}</a>`;
            }
            
            if (hasChildren) {
                html += `<ul class="dropdown-menu">`;
                html += buildMenuHTML(menu.children, level + 1);
                html += `</ul>`;
            }
            html += `</li>`;
        }
    });
    
    return html;
}

/**
 * Load Posts Dynamically
 */
async function loadPosts(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const params = new URLSearchParams({
        action: 'list',
        limit: options.limit || 10,
        page: options.page || 1
    });
    
    if (options.categoryId) {
        params.append('category_id', options.categoryId);
    }
    
    try {
        const response = await fetch('/manajemenfile.digital/api/posts.php?' + params);
        const result = await response.json();
        
        if (result.success) {
            renderPosts(container, result.posts, result.pagination);
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

/**
 * Render Posts to Container
 */
function renderPosts(container, posts, pagination) {
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="text-center">Tidak ada artikel ditemukan.</p>';
        return;
    }
    
    let html = '<div class="news-grid">';
    
    posts.forEach(post => {
        const imageUrl = post.featured_image || '/assets/images/placeholder.jpg';
        const date = new Date(post.published_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        html += `
            <article class="news-card">
                <img src="${imageUrl}" alt="${post.title}" class="news-card-image" onerror="this.src='/assets/images/placeholder.jpg'">
                <div class="news-card-content">
                    ${post.category_name ? `<span class="news-card-category">${post.category_name}</span>` : ''}
                    <h3 class="news-card-title">
                        <a href="/newsnia.digital/detail.php?slug=${post.slug}">${post.title}</a>
                    </h3>
                    <p class="news-card-excerpt">${post.excerpt || post.content.substring(0, 100)}...</p>
                    <div class="news-card-meta">
                        <span>${date}</span>
                        <a href="/newsnia.digital/detail.php?slug=${post.slug}" class="news-card-link">Baca Selengkapnya →</a>
                    </div>
                </div>
            </article>
        `;
    });
    
    html += '</div>';
    
    // Add pagination
    if (pagination && pagination.total_pages > 1) {
        html += '<div class="pagination">';
        
        if (pagination.current_page > 1) {
            html += `<a href="#" data-page="${pagination.current_page - 1}">« Prev</a>`;
        }
        
        for (let i = 1; i <= pagination.total_pages; i++) {
            if (i === pagination.current_page) {
                html += `<span class="active">${i}</span>`;
            } else {
                html += `<a href="#" data-page="${i}">${i}</a>`;
            }
        }
        
        if (pagination.current_page < pagination.total_pages) {
            html += `<a href="#" data-page="${pagination.current_page + 1}">Next »</a>`;
        }
        
        html += '</div>';
    }
    
    container.innerHTML = html;
}

/**
 * Load Post Detail
 */
async function loadPostDetail(slug) {
    try {
        const response = await fetch('/manajemenfile.digital/api/posts.php?action=detail&slug=' + slug);
        const result = await response.json();
        
        if (result.success) {
            renderPostDetail(result.post, result.related);
        } else {
            document.getElementById('postDetail').innerHTML = '<p class="alert alert-error">Artikel tidak ditemukan.</p>';
        }
    } catch (error) {
        console.error('Error loading post detail:', error);
    }
}

/**
 * Render Post Detail
 */
function renderPostDetail(post, related) {
    const date = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    let html = `
        <article class="detail-article">
            <header class="detail-header">
                <h1 class="detail-title">${post.title}</h1>
                <div class="detail-meta">
                    <span>📅 ${date}</span>
                    ${post.category_name ? `<span>📁 ${post.category_name}</span>` : ''}
                    ${post.author_name ? `<span>✍️ ${post.author_name}</span>` : ''}
                    <span>👁️ ${post.views || 0} views</span>
                </div>
            </header>
            
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="detail-image">` : ''}
            
            <div class="detail-content">
                ${post.content}
            </div>
        </article>
    `;
    
    if (related && related.length > 0) {
        html += '<section class="related-posts">';
        html += '<h2 class="section-title">Berita Terkait</h2>';
        html += '<div class="news-grid">';
        
        related.forEach(relPost => {
            html += `
                <article class="news-card">
                    <div class="news-card-content">
                        <h3 class="news-card-title">
                            <a href="/newsnia.digital/detail.php?slug=${relPost.slug}">${relPost.title}</a>
                        </h3>
                        <p class="news-card-excerpt">${relPost.excerpt || relPost.content.substring(0, 80)}...</p>
                    </div>
                </article>
            `;
        });
        
        html += '</div></section>';
    }
    
    document.getElementById('postDetail').innerHTML = html;
}

/**
 * Check Authentication Status
 */
async function checkAuth() {
    try {
        const response = await fetch('/manajemenfile.digital/api/auth.php?action=check');
        const result = await response.json();
        
        const authContainer = document.getElementById('authStatus');
        if (authContainer) {
            if (result.authenticated) {
                authContainer.innerHTML = `
                    <span>Halo, ${result.user.full_name}</span>
                    <a href="#" class="logout-link btn btn-outline" style="margin-left: 10px;">Logout</a>
                `;
                initLogout();
            } else {
                authContainer.innerHTML = `
                    <a href="/newsnia.digital/login.php" class="btn btn-outline">Login</a>
                    <a href="/newsnia.digital/register.php" class="btn" style="margin-left: 10px;">Register</a>
                `;
            }
        }
        
        return result;
    } catch (error) {
        console.error('Auth check error:', error);
        return { authenticated: false };
    }
}

// Run auth check on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}

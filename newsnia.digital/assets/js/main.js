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

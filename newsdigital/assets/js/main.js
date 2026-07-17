// Auto-refresh news every 5 minutes
let lastNewsCheck = Date.now();
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Check for new news periodically
function checkForNewNews() {
    const now = Date.now();
    if (now - lastNewsCheck >= REFRESH_INTERVAL) {
        location.reload();
        lastNewsCheck = now;
    }
}

// Update countdown timer
function updateCountdown() {
    const countdownEl = document.getElementById('next-news-countdown');
    if (!countdownEl) return;
    
    setInterval(() => {
        const now = Date.now();
        const timeSinceLastCheck = now - lastNewsCheck;
        const timeRemaining = REFRESH_INTERVAL - timeSinceLastCheck;
        
        if (timeRemaining > 0) {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
            countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
            countdownEl.textContent = '0:00';
        }
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    // Smooth scroll for category links
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('news-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.news-card').forEach(card => {
                const title = card.querySelector('.news-card-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.news-card-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Category filter
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            document.querySelectorAll('.news-card').forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update active state
            document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // File manager navigation
    document.querySelectorAll('.folder-item').forEach(folder => {
        folder.addEventListener('click', function() {
            const folderName = this.dataset.folder;
            console.log('Navigating to folder:', folderName);
            // Implement folder navigation logic here
        });
    });
    
    // Pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
    
    // Share functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                }).catch(console.error);
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copied to clipboard!');
                });
            }
        });
    });
    
    // Reading progress bar
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #3498db, #2c3e50);
            z-index: 9999;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
    }
    
    // Dark mode toggle (optional feature)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/newsdigital/sw.js').then(registration => {
            console.log('SW registered:', registration);
        }).catch(error => {
            console.log('SW registration failed:', error);
        });
    });
}

/**
 * Repository Manager - Mengambil data dari GitHub API
 * Fixed & Enhanced Version with Error Handling and Rate Limiting
 */

const GITHUB_USER = 'jenisprotokol';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

// Cache for repositories
let repoCache = {
    data: null,
    timestamp: 0,
    ttl: 5 * 60 * 1000 // 5 minutes cache
};

// Fungsi untuk menampilkan section tertentu
function showSection(sectionName) {
    const reposSection = document.getElementById('repos-section');
    const filesSection = document.getElementById('files-section');
    
    if (sectionName === 'repos') {
        if (reposSection) reposSection.style.display = 'block';
        if (filesSection) filesSection.style.display = 'none';
    } else if (sectionName === 'files') {
        if (reposSection) reposSection.style.display = 'none';
        if (filesSection) filesSection.style.display = 'block';
    }
}

// Fungsi logout yang diperbarui
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('currentUser');
    
    // End session if SessionManager is available
    if (typeof SessionManager !== 'undefined') {
        SessionManager.endSession();
    }
    
    alert('Anda telah logout.');
    window.location.href = '../login.html';
}

// Cek autentikasi admin dengan session validation
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adminUser = localStorage.getItem('adminUser');
    let currentUser = null;
    
    try {
        const userData = localStorage.getItem('currentUser');
        currentUser = userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error('Error parsing user data:', e);
        currentUser = null;
    }
    
    // Check session expiration
    if (typeof SessionManager !== 'undefined' && !SessionManager.checkSession()) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        window.location.href = '../login.html';
        return false;
    }
    
    // Cek jika user adalah admin
    if (isLoggedIn !== 'true' || adminUser !== 'admin') {
        window.location.href = '../login.html';
        return false;
    }
    
    // Tampilkan nama admin dengan sanitization
    const adminNameEl = document.getElementById('adminName');
    if (adminNameEl) {
        if (currentUser && currentUser.name) {
            adminNameEl.textContent = Sanitizer ? Sanitizer.sanitize(currentUser.name) : currentUser.name;
        } else {
            adminNameEl.textContent = 'Super Admin';
        }
    }
    
    // Tampilkan identitas user di dashboard
    displayUserIdentity();
    
    return true;
}

// Fungsi untuk menampilkan identitas user di dashboard
function displayUserIdentity() {
    let user;
    try {
        const userData = localStorage.getItem('currentUser');
        user = userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error('Error parsing user data:', e);
        user = null;
    }
    
    const displayContainer = document.getElementById('user-identity-display');
    
    if (user && displayContainer) {
        const displayName = Sanitizer ? Sanitizer.sanitize(user.name || user.email) : (user.name || user.email);
        displayContainer.innerHTML = `
            <div class="user-display" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 25px; color: white; font-weight: 500;">
                <span class="user-greeting">Halo, <strong>${displayName}</strong></span>
                ${user.role === 'admin' ? '<span class="badge-admin" style="background: #ff9800; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Admin</span>' : ''}
            </div>
        `;
    }
}

// Mengambil repositori dari GitHub dengan caching dan rate limit handling
async function fetchRepositories() {
    const repoListContainer = document.getElementById('repo-list');
    
    if (!repoListContainer) {
        console.error('Repo list container not found');
        return;
    }
    
    // Check cache first
    const now = Date.now();
    if (repoCache.data && (now - repoCache.timestamp) < repoCache.ttl) {
        renderRepositories(repoCache.data, repoListContainer);
        return;
    }
    
    // Show loading state
    repoListContainer.innerHTML = '<div class="loading">Memuat repositori...</div>';
    
    try {
        const response = await fetch(GITHUB_API_URL);
        
        // Check for rate limiting
        const remainingRequests = response.headers.get('X-RateLimit-Remaining');
        if (remainingRequests && parseInt(remainingRequests) < 10) {
            console.warn(`GitHub API rate limit warning: ${remainingRequests} requests remaining`);
        }
        
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Rate limit exceeded. Silakan coba lagi nanti.');
            } else if (response.status === 404) {
                throw new Error('User atau repositori tidak ditemukan.');
            } else {
                throw new Error(`Gagal mengambil data: ${response.status} ${response.statusText}`);
            }
        }
        
        const repos = await response.json();
        
        // Update cache
        repoCache.data = repos;
        repoCache.timestamp = now;
        
        // Tampilkan repositori
        renderRepositories(repos, repoListContainer);
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        repoListContainer.innerHTML = `
            <div class="error-message" style="padding: 20px; text-align: center; color: #dc3545;">
                <p><strong>Gagal memuat repositori</strong></p>
                <p>${error.message}</p>
                <p>Silakan coba lagi nanti.</p>
                <button onclick="fetchRepositories()" style="margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Coba Lagi</button>
            </div>
        `;
    }
}

// Render repositories to DOM
function renderRepositories(repos, container) {
    container.innerHTML = '';
    
    if (!repos || repos.length === 0) {
        container.innerHTML = '<p>Tidak ada repositori ditemukan.</p>';
        return;
    }
    
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        
        // Sanitize content if Sanitizer is available
        const safeName = Sanitizer ? Sanitizer.sanitize(repo.name) : repo.name;
        const safeDescription = Sanitizer ? Sanitizer.sanitize(repo.description || 'Tidak ada deskripsi') : (repo.description || 'Tidak ada deskripsi');
        const safeLanguage = Sanitizer ? Sanitizer.sanitize(repo.language || 'N/A') : (repo.language || 'N/A');
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        
        repoCard.innerHTML = `
            <h3>${safeName}</h3>
            <p>${safeDescription}</p>
            <div class="repo-meta">
                <span>🌟 ${stars}</span>
                <span>🍴 ${forks}</span>
                <span>💻 ${safeLanguage}</span>
            </div>
            <br>
            <a href="${Sanitizer ? Sanitizer.sanitize(repo.html_url) : repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-url">
                🔗 Lihat di GitHub →
            </a>
        `;
        
        container.appendChild(repoCard);
    });
}

// Inisialisasi dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Cek autentikasi
    if (!checkAdminAuth()) {
        return;
    }
    
    // Muat repositori
    fetchRepositories();
    
    // Auto-refresh setiap 5 menit
    setInterval(fetchRepositories, 300000);
    
    console.log('Dashboard initialized successfully');
    console.log('Current user:', JSON.parse(localStorage.getItem('currentUser')));
});

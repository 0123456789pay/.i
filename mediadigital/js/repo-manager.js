// Repository Manager - Mengambil data dari GitHub API
const GITHUB_USER = 'jenisprotokol';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

// Fungsi untuk menampilkan section tertentu
function showSection(sectionName) {
    const reposSection = document.getElementById('repos-section');
    const filesSection = document.getElementById('files-section');
    
    if (sectionName === 'repos') {
        reposSection.style.display = 'block';
        filesSection.style.display = 'none';
    } else if (sectionName === 'files') {
        reposSection.style.display = 'none';
        filesSection.style.display = 'block';
    }
}

// Fungsi logout yang diperbarui
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('currentUser');
    alert('Anda telah logout.');
    window.location.href = '../login.html';
}

// Cek autentikasi admin
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adminUser = localStorage.getItem('adminUser');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Cek jika user adalah admin
    if (isLoggedIn !== 'true' || adminUser !== 'admin') {
        window.location.href = '../login.html';
        return false;
    }
    
    // Tampilkan nama admin
    if (currentUser && currentUser.name) {
        document.getElementById('adminName').textContent = currentUser.name;
    } else {
        document.getElementById('adminName').textContent = 'Super Admin';
    }
    
    // Tampilkan identitas user di dashboard
    displayUserIdentity();
    
    return true;
}

// Fungsi untuk menampilkan identitas user di dashboard
function displayUserIdentity() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const displayContainer = document.getElementById('user-identity-display');
    
    if (user && displayContainer) {
        displayContainer.innerHTML = `
            <div class="user-display" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 25px; color: white; font-weight: 500;">
                <span class="user-greeting">Halo, <strong>${user.name || user.email}</strong></span>
                ${user.role === 'admin' ? '<span class="badge-admin" style="background: #ff9800; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Admin</span>' : ''}
            </div>
        `;
    }
}

// Mengambil repositori dari GitHub
async function fetchRepositories() {
    const repoListContainer = document.getElementById('repo-list');
    
    try {
        const response = await fetch(GITHUB_API_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data repositori');
        }
        
        const repos = await response.json();
        
        // Tampilkan repositori
        repoListContainer.innerHTML = '';
        
        if (repos.length === 0) {
            repoListContainer.innerHTML = '<p>Tidak ada repositori ditemukan.</p>';
            return;
        }
        
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            
            const description = repo.description || 'Tidak ada deskripsi';
            const language = repo.language || 'N/A';
            const stars = repo.stargazers_count;
            const forks = repo.forks_count;
            
            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <div class="repo-meta">
                    <span>🌟 ${stars}</span>
                    <span>🍴 ${forks}</span>
                    <span>💻 ${language}</span>
                </div>
                <br>
                <a href="${repo.html_url}" target="_blank" class="repo-url">
                    🔗 Lihat di GitHub →
                </a>
            `;
            
            repoListContainer.appendChild(repoCard);
        });
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        repoListContainer.innerHTML = `
            <div class="error-message">
                <p>Gagal memuat repositori: ${error.message}</p>
                <p>Silakan coba lagi nanti.</p>
            </div>
        `;
    }
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

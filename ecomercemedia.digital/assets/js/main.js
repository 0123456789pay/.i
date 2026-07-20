// Produk Data - Ecommerce Marketplace Media Digital
const productsData = [
    // Audio Products
    {
        name: "Musik Digital",
        path: "produk/audio/musik",
        category: "audio",
        icon: "fa-music",
        items: 150,
        subcategories: 8,
        description: "Koleksi musik digital berbagai genre untuk konten dan komersial",
        features: ["MP3 High Quality", "WAV Lossless", "License Komersial", "Multi Genre", "Instant Download"]
    },
    {
        name: "Podcast",
        path: "produk/audio/podcast",
        category: "audio",
        icon: "fa-microphone",
        items: 85,
        subcategories: 5,
        description: "Episode podcast dari berbagai topik dan kreator",
        features: ["Episode Regular", "Exclusive Content", "Early Access", "Ad-Free", "Download Offline"]
    },
    {
        name: "Audio Book",
        path: "produk/audio/audio-book",
        category: "audio",
        icon: "fa-book",
        items: 200,
        subcategories: 12,
        description: "Buku audio dalam berbagai bahasa dan genre",
        features: ["Narrator Professional", "Full Unabridged", "Multiple Languages", "Bookmark Feature", "Speed Control"]
    },
    {
        name: "Sound Effect",
        path: "produk/audio/sound-effect",
        category: "audio",
        icon: "fa-volume-up",
        items: 500,
        subcategories: 20,
        description: "Library sound effect untuk produksi media",
        features: ["High Quality WAV", "Royalty Free", "Categorized Library", "Search Function", "Bundle Packs"]
    },
    
    // Video Products
    {
        name: "Film Digital",
        path: "produk/video/film",
        category: "video",
        icon: "fa-film",
        items: 300,
        subcategories: 15,
        description: "Film full length dalam berbagai genre",
        features: ["HD/4K Quality", "Subtitle Multi Bahasa", "Behind The Scenes", "Director Commentary", "Digital Extras"]
    },
    {
        name: "Short Video",
        path: "produk/video/short-video",
        category: "video",
        icon: "fa-video",
        items: 1000,
        subcategories: 25,
        description: "Konten video pendek untuk sosial media",
        features: ["Vertical Format", "Trending Styles", "Ready to Post", "Customizable", "Pack Bundles"]
    },
    {
        name: "Animasi",
        path: "produk/video/animasi",
        category: "video",
        icon: "fa-film",
        items: 250,
        subcategories: 10,
        description: "Konten animasi 2D dan 3D",
        features: ["2D Animation", "3D Animation", "Motion Graphics", "Character Rig", "Source Files"]
    },
    {
        name: "Streaming Content",
        path: "produk/video/streaming",
        category: "video",
        icon: "fa-broadcast-tower",
        items: 180,
        subcategories: 8,
        description: "Konten eksklusif untuk streaming",
        features: ["Live Streaming", "VOD Library", "Exclusive Series", "Multi Device", "Offline View"]
    },
    
    // Gambar Products
    {
        name: "Foto Stock",
        path: "produk/gambar/foto",
        category: "gambar",
        icon: "fa-camera",
        items: 5000,
        subcategories: 50,
        description: "Foto stock berkualitas tinggi",
        features: ["High Resolution", "Commercial License", "Model Released", "Diverse Topics", "RAW Available"]
    },
    {
        name: "Ilustrasi",
        path: "produk/gambar/ilustrasi",
        category: "gambar",
        icon: "fa-paint-brush",
        items: 800,
        subcategories: 30,
        description: "Ilustrasi digital artistik",
        features: ["Hand Drawn", "Digital Art", "Various Styles", "Editable Layers", "Print Ready"]
    },
    {
        name: "Vektor",
        path: "produk/gambar/vektor",
        category: "gambar",
        icon: "fa-bezier-curve",
        items: 1200,
        subcategories: 35,
        description: "Grafis vektor scalable",
        features: ["AI/EPS/SVG", "Infinite Scale", "Editable Colors", "Layered Files", "Icon Sets"]
    },
    {
        name: "3D Model",
        path: "produk/gambar/3d",
        category: "gambar",
        icon: "fa-cube",
        items: 400,
        subcategories: 20,
        description: "Model 3D untuk rendering dan game",
        features: ["Multiple Formats", "Textured", "Rigged Models", "PBR Materials", "LOD Versions"]
    },
    
    // Software Products
    {
        name: "Aplikasi",
        path: "produk/software/aplikasi",
        category: "software",
        icon: "fa-mobile-alt",
        items: 350,
        subcategories: 18,
        description: "Aplikasi mobile dan desktop",
        features: ["Cross Platform", "Regular Updates", "Cloud Sync", "Premium Features", "Support Included"]
    },
    {
        name: "Game",
        path: "produk/software/game",
        category: "software",
        icon: "fa-gamepad",
        items: 280,
        subcategories: 15,
        description: "Game digital berbagai genre",
        features: ["PC/Mobile", "Multiplayer", "Achievements", "DLC Available", "Cloud Save"]
    },
    {
        name: "Plugin",
        path: "produk/software/plugin",
        category: "software",
        icon: "fa-plug",
        items: 450,
        subcategories: 22,
        description: "Plugin untuk software kreatif",
        features: ["Adobe Compatible", "DAW Plugins", "Browser Extensions", "Easy Install", "Auto Update"]
    },
    {
        name: "Theme & Template",
        path: "produk/software/theme",
        category: "software",
        icon: "fa-palette",
        items: 600,
        subcategories: 25,
        description: "Theme dan template siap pakai",
        features: ["WordPress", "HTML/CSS", "Responsive", "Customizable", "Documentation"]
    },
    
    // Dokumen Products
    {
        name: "E-Book",
        path: "produk/dokumen/ebook",
        category: "dokumen",
        icon: "fa-book",
        items: 2000,
        subcategories: 40,
        description: "Buku digital berbagai kategori",
        features: ["EPUB/PDF", "Interactive", "Searchable", "Bookmark", "Multi Device"]
    },
    {
        name: "Majalah Digital",
        path: "produk/dokumen/majalah",
        category: "dokumen",
        icon: "fa-newspaper",
        items: 150,
        subcategories: 12,
        description: "Majalah digital edisi terkini",
        features: ["Monthly Issues", "Interactive Pages", "Video Embed", "Archive Access", "Subscription"]
    },
    {
        name: "Jurnal Akademik",
        path: "produk/dokumen/jurnal",
        category: "dokumen",
        icon: "fa-file-contract",
        items: 500,
        subcategories: 25,
        description: "Publikasi jurnal penelitian",
        features: ["Peer Reviewed", "PDF Format", "Citation Tools", "Open Access", "Research Data"]
    },
    {
        name: "Laporan Bisnis",
        path: "produk/dokumen/laporan",
        category: "dokumen",
        icon: "fa-chart-bar",
        items: 300,
        subcategories: 15,
        description: "Laporan dan analisis bisnis",
        features: ["Market Analysis", "Financial Reports", "Industry Insights", "Forecasting", "Custom Reports"]
    },
    
    // Edukasi Products
    {
        name: "Online Course",
        path: "produk/edukasi/course",
        category: "edukasi",
        icon: "fa-chalkboard-teacher",
        items: 400,
        subcategories: 30,
        description: "Kursus online dengan sertifikat",
        features: ["Video Lessons", "Quizzes", "Certificate", "Lifetime Access", "Mentor Support"]
    },
    {
        name: "E-Learning Platform",
        path: "produk/edukasi/e-learning",
        category: "edukasi",
        icon: "fa-laptop",
        items: 250,
        subcategories: 20,
        description: "Platform pembelajaran interaktif",
        features: ["Interactive Content", "Progress Tracking", "Gamification", "Social Learning", "Mobile App"]
    },
    {
        name: "Training Program",
        path: "produk/edukasi/training",
        category: "edukasi",
        icon: "fa-users",
        items: 180,
        subcategories: 15,
        description: "Program pelatihan profesional",
        features: ["Live Sessions", "Hands-on Projects", "Expert Instructors", "Career Guidance", "Job Placement"]
    },
    {
        name: "Certification",
        path: "produk/edukasi/certification",
        category: "edukasi",
        icon: "fa-certificate",
        items: 120,
        subcategories: 10,
        description: "Sertifikasi profesional",
        features: ["Industry Recognized", "Exam Included", "Valid 3 Years", "Continuing Education", "Alumni Network"]
    }
];

let currentFilter = 'all';
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    renderProducts(productsData, true);
    renderQuickAccess();
    setupEventListeners();
    updateStats();
    setTimeout(() => { document.getElementById('loading').style.display = 'none'; }, 500);
});

function updateStats() {
    const totalCategories = new Set(productsData.map(p => p.category)).size;
    const totalSubcategories = productsData.reduce((sum, p) => sum + p.subcategories, 0);
    const totalItems = productsData.reduce((sum, p) => sum + p.items, 0);

    animateNumber('totalProducts', totalCategories * 10);
    animateNumber('totalSubcategories', totalSubcategories);
    animateNumber('totalVendors', Math.floor(totalItems / 50));
}

function animateNumber(id, target) {
    const element = document.getElementById(id);
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            element.textContent = current.toLocaleString('id-ID');
        }
    }, 30);
}

function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterProducts(currentFilter);
        });
    });

    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchProducts(e.target.value);
    });

    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchProducts(this.value);
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simpan ke localStorage untuk simulasi login
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        alert('Login berhasil!\nEmail: ' + email);
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        
        // Update UI setelah login
        updateLoginState(true, email);
    });

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak sama!');
            return;
        }

        // Simpan ke localStorage untuk simulasi registrasi
        localStorage.setItem('userRegistered', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        
        alert('Registrasi berhasil!\nNama: ' + name + '\nEmail: ' + email);
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        
        // Auto login setelah register
        updateLoginState(true, email);
    });
    
    // Check login state on load
    checkLoginState();
}

function checkLoginState() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    if (isLoggedIn && email) {
        updateLoginState(true, email);
    }
}

function updateLoginState(isLoggedIn, email) {
    const navMenu = document.querySelector('.nav-menu');
    if (isLoggedIn) {
        // Replace login/register buttons with user menu
        const userMenu = `
            <div class="dropdown-menu-container">
                <a href="#" class="nav-link"><i class="fas fa-user-circle me-2"></i>${email.split('@')[0]}</a>
                <div class="dropdown-menu" style="right: 0; left: auto;">
                    <a href="auth/dashboard.html" class="dropdown-item"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                    <a href="auth/profile.html" class="dropdown-item"><i class="fas fa-user me-2"></i>Profil</a>
                    <a href="auth/orders.html" class="dropdown-item"><i class="fas fa-shopping-bag me-2"></i>Pesanan</a>
                    <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
                </div>
            </div>
        `;
        // Remove old buttons and add user menu
        const buttons = navMenu.querySelectorAll('button');
        buttons.forEach(btn => btn.remove());
        navMenu.insertAdjacentHTML('beforeend', userMenu);
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    location.reload();
}

function renderProducts(data, limitToFive = false) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    if (data.length === 0) { 
        document.getElementById('noResults').style.display = 'block'; 
        return; 
    }
    document.getElementById('noResults').style.display = 'none';

    const displayData = limitToFive ? data.slice(0, 8) : data;

    displayData.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.02}s both`;
        card.onclick = () => showDetail(product);
        card.innerHTML = `
            <span class="status-badge status-active">Available</span>
            <div class="product-image"><i class="fas ${product.icon}"></i></div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-path">/${product.path}</div>
                <div class="product-stats">
                    <span class="product-stat"><i class="fas fa-box"></i> ${product.items.toLocaleString('id-ID')} items</span>
                    <span class="product-stat"><i class="fas fa-folder"></i> ${product.subcategories} sub</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function showDetail(product) {
    currentProduct = product;
    const modalBody = document.getElementById('detailModalBody');
    const featuresList = product.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');

    modalBody.innerHTML = `
        <div class="text-center mb-4">
            <div class="feature-icon mx-auto" style="width: 100px; height: 100px; font-size: 3rem;">
                <i class="fas ${product.icon}"></i>
            </div>
            <h3 class="mt-3" style="color: var(--primary-dark);">${product.name}</h3>
            <p class="text-muted">/${product.path}</p>
        </div>

        <div class="detail-info">
            <h6><i class="fas fa-info-circle me-2"></i>Deskripsi</h6>
            <p>${product.description}</p>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="detail-info">
                    <h6><i class="fas fa-box me-2"></i>Statistik</h6>
                    <p><strong>Items:</strong> ${product.items.toLocaleString('id-ID')}</p>
                    <p><strong>Subcategories:</strong> ${product.subcategories}</p>
                    <p><strong>Kategori:</strong> ${product.category.toUpperCase()}</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="detail-info">
                    <h6><i class="fas fa-star me-2"></i>Status</h6>
                    <p><span class="badge bg-success">Available</span></p>
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Last Update:</strong> 2026</p>
                </div>
            </div>
        </div>

        <div class="detail-info">
            <h6><i class="fas fa-cogs me-2"></i>Fitur Utama</h6>
            <ul class="feature-list">
                ${featuresList}
            </ul>
        </div>

        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg" onclick="openProductCategory()">
                <i class="fas fa-folder-open me-2"></i>Buka Kategori
            </button>
            <button class="btn btn-outline-primary btn-lg ms-2" onclick="viewAllProducts()">
                <i class="fas fa-th me-2"></i>Lihat Semua
            </button>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    modal.show();
}

function openProductCategory() {
    if (currentProduct) {
        window.location.href = currentProduct.path + '/index.html';
    }
}

function viewAllProducts() {
    renderProducts(productsData, false);
    bootstrap.Modal.getInstance(document.getElementById('detailModal')).hide();
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
}

function toggleDirectoryPanel() {
    const panel = document.getElementById('directoryPanel');
    const btn = document.querySelector('button[onclick="toggleDirectoryPanel()"]');
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-minus me-2"></i>Tutup Direktori';
        renderDirectory();
        window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-folder-tree me-2"></i>Lihat Direktori Lengkap';
    }
}

function filterProducts(category) {
    if (category === 'all') {
        renderProducts(productsData, true);
    } else {
        renderProducts(productsData.filter(p => p.category === category), true);
    }
}

function searchProducts(query) {
    if (!query) { 
        filterProducts(currentFilter); 
        return; 
    }
    const lowerQuery = query.toLowerCase();
    renderProducts(productsData.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.path.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.features.some(f => f.toLowerCase().includes(lowerQuery))
    ), true);
}

function renderQuickAccess() {
    const categories = [
        { name: 'Audio', icon: 'fa-music', count: 4, filter: 'audio' },
        { name: 'Video', icon: 'fa-video', count: 4, filter: 'video' },
        { name: 'Gambar', icon: 'fa-image', count: 4, filter: 'gambar' },
        { name: 'Software', icon: 'fa-laptop-code', count: 4, filter: 'software' },
        { name: 'Dokumen', icon: 'fa-file-alt', count: 4, filter: 'dokumen' },
        { name: 'Edukasi', icon: 'fa-graduation-cap', count: 4, filter: 'edukasi' },
        { name: 'Layanan', icon: 'fa-concierge-bell', count: 3, filter: 'layanan' },
        { name: 'Bundle', icon: 'fa-box-open', count: 5, filter: 'bundle' }
    ];
    const container = document.getElementById('quickAccessBox');
    container.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'box-item';
        item.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`[data-filter="${cat.filter}"]`)?.classList.add('active');
            filterProducts(cat.filter);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        };
        item.innerHTML = `<i class="fas ${cat.icon}"></i><span>${cat.name}</span><small style="color: #e6f0ff; font-size: 0.75rem;">${cat.count} kategori</small>`;
        container.appendChild(item);
    });
}

function renderDirectory() {
    const container = document.getElementById('productsDirectory');
    container.innerHTML = '';
    productsData.forEach(product => {
        const item = document.createElement('div');
        item.className = 'box-item';
        item.onclick = () => showDetail(product);
        item.innerHTML = `<i class="fas ${product.icon}" style="color: white;"></i><span style="font-size: 0.75rem; color: white;">${product.name}</span><br><small style="color: #e6f0ff; font-size: 0.65rem;"><i class="fas fa-box"></i> ${product.items} items | <i class="fas fa-folder"></i> ${product.subcategories} sub</small>`;
        container.appendChild(item);
    });
}

window.addEventListener('scroll', function() {
    let scrollTop = document.querySelector('.scroll-top');
    if (!scrollTop) {
        const btn = document.createElement('div');
        btn.className = 'scroll-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
        scrollTop = btn;
    }
    scrollTop.style.opacity = window.scrollY > 500 ? '1' : '0';
    scrollTop.style.visibility = window.scrollY > 500 ? 'visible' : 'hidden';
});

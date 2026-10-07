#!/bin/bash

# skrip untuk mengupdate indeks.html dengan semua direktori .digital
# Menambahkan 255+ fitur ke halaman utama

DIGITAL_DIRS=$(find /workspace -maxdepth 2 -type d -name "*.digital" | sort)

# hasilkan daftar fitur dalam format skrip-skrip-javascript array
FEATURES_JSON="["
first=true

for dir in $DIGITAL_DIRS; do
    name=$(basename "$dir" .digital)
    # Capitalize pertama letter of each word
    capName=$(echo "$name" | sed 's/\b\(.\)/\u\1/g' | sed 's/_/ /g')
    
    # Tentukan kategori berdasarkan nama
    category="General"
    if [[ "$name" =~ ^(ai|ml|neural|chat|nlp) ]]; then
        category="AI & ML"
    elif [[ "$name" =~ ^(data|analytics|bin|qual|lake|pipe|clea) ]]; then
        category="Data"
    elif [[ "$name" =~ ^(security|auth|firewall|hsm|hpkp|blue|block) ]]; then
        category="Security"
    elif [[ "$name" =~ ^(business|acct|bill|bank|finance|insur) ]]; then
        category="Business"
    elif [[ "$name" =~ ^(media|video|news|ad|stream) ]]; then
        category="Media"
    elif [[ "$name" =~ ^(iot|sensor|device|edge) ]]; then
        category="IoT"
    elif [[ "$name" =~ ^(center|server|cloud|host|infra) ]]; then
        category="Infrastructure"
    fi
    
    if [ "$first" = true ]; then
        first=false
    else
        FEATURES_JSON+=","
    fi
    
    FEATURES_JSON+="{\"name\":\"$capName\",\"path\":\"$name.digital\",\"category\":\"$category\"}"
done

FEATURES_JSON+="]"

# Buat berkas indeks.html baru
cat > /workspace/index.html << INDEXEOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEDIA.DIGITAL - Enterprise Digital Solutions Platform</title>
    <meta name="description" content="MEDIA.DIGITAL - 255+ enterprise digital solutions including AI, Data Analytics, Security, Business Tools, Media Management, and IoT platforms.">
    <meta name="keywords" content="digital solutions, enterprise software, AI, machine learning, data analytics, security, business tools">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="manifest" href="manifest.json">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <style>
        :root {
            --primary-blue: #0066cc;
            --secondary-blue: #0088ff;
            --light-blue: #0099ff;
            --dark-blue: #004499;
            --white: #ffffff;
            --off-white: #f8fbff;
            --accent-blue: #e6f2ff;
            --text-dark: #1a1a2e;
            --text-muted: #6c757d;
            --shadow-sm: 0 2px 8px rgba(0, 102, 204, 0.1);
            --shadow-md: 0 4px 16px rgba(0, 102, 204, 0.15);
            --shadow-lg: 0 8px 24px rgba(0, 102, 204, 0.2);
            --gradient-primary: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
            --gradient-light: linear-gradient(135deg, var(--off-white) 0%, var(--accent-blue) 100%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            background: var(--off-white);
            color: var(--text-dark);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Header */
        header {
            background: var(--gradient-primary);
            color: var(--white);
            padding: 2.5rem 1rem;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
        }

        .logo {
            font-size: 3.5rem;
            font-weight: 900;
            letter-spacing: 3px;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        }

        .logo i {
            margin-right: 0.5rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .tagline {
            font-size: 1.3rem;
            opacity: 0.95;
            font-weight: 300;
            max-width: 800px;
            margin: 0 auto;
        }

        /* Search & Filter Section */
        .search-section {
            background: var(--white);
            padding: 2rem 1rem;
            border-bottom: 1px solid var(--accent-blue);
            position: sticky;
            top: 120px;
            z-index: 999;
            box-shadow: var(--shadow-sm);
        }

        .search-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .search-box {
            position: relative;
            max-width: 600px;
            margin: 0 auto 1.5rem;
        }

        .search-box input {
            width: 100%;
            padding: 1rem 1.5rem 1rem 3rem;
            border: 2px solid var(--accent-blue);
            border-radius: 50px;
            font-size: 1.1rem;
            transition: all 0.3s;
            background: var(--off-white);
        }

        .search-box input:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
        }

        .search-box i {
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary-blue);
            font-size: 1.2rem;
        }

        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
        }

        .filter-btn {
            padding: 0.5rem 1.2rem;
            border: 2px solid var(--primary-blue);
            background: var(--white);
            color: var(--primary-blue);
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            font-size: 0.9rem;
        }

        .filter-btn:hover,
        .filter-btn.active {
            background: var(--primary-blue);
            color: var(--white);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        /* Features Grid */
        .features-section {
            padding: 3rem 1rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .section-header h2 {
            color: var(--primary-blue);
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .section-header p {
            color: var(--text-muted);
            font-size: 1.1rem;
        }

        .stats-bar {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .stat-item {
            text-align: center;
            padding: 1rem 1.5rem;
            background: var(--white);
            border-radius: 12px;
            box-shadow: var(--shadow-sm);
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary-blue);
        }

        .stat-label {
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .feature-card {
            background: var(--white);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
            transition: all 0.3s;
            cursor: pointer;
            border: 1px solid var(--accent-blue);
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            background: var(--gradient-light);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            color: var(--primary-blue);
        }

        .feature-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 0.5rem;
        }

        .feature-path {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-family: 'Courier New', monospace;
            background: var(--off-white);
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 0.5rem;
        }

        .feature-category {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: var(--accent-blue);
            color: var(--primary-blue);
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .status-indicator {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background: #28a745;
            border-radius: 50%;
            animation: blink 2s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .status-text {
            font-size: 0.7rem;
            color: #28a745;
            font-weight: 600;
        }

        /* Footer */
        footer {
            background: var(--white);
            border-top: 1px solid var(--accent-blue);
            padding: 2rem 1rem;
            text-align: center;
            margin-top: 3rem;
        }

        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 1rem 0;
        }

        .social-links a {
            width: 45px;
            height: 45px;
            background: var(--gradient-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-blue);
            font-size: 1.2rem;
            transition: all 0.3s;
        }

        .social-links a:hover {
            background: var(--gradient-primary);
            color: var(--white);
            transform: translateY(-3px);
        }

        .copyright {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        /* Scroll to top */
        .scroll-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }

        .scroll-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-top:hover {
            transform: translateY(-5px);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .logo { font-size: 2.5rem; }
            .tagline { font-size: 1rem; }
            .features-grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
            .search-section { top: 100px; }
            .stats-bar { gap: 1rem; }
            .stat-item { padding: 0.8rem 1rem; }
        }

        /* Loading Animation */
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid var(--accent-blue);
            border-top-color: var(--primary-blue);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .no-results {
            text-align: center;
            padding: 3rem;
            color: var(--text-muted);
        }

        .no-results i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: var(--primary-blue);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-bolt"></i>MEDIA.DIGITAL
            </div>
            <p class="tagline">Enterprise Digital Solutions Platform - 255+ Integrated Features for Modern Business</p>
        </div>
    </header>

    <!-- Search & Filter -->
    <section class="search-section">
        <div class="search-container">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Search features... (e.g., AI, Data, Security)">
            </div>
            <div class="filter-buttons" id="filterButtons">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="AI & ML">AI & ML</button>
                <button class="filter-btn" data-filter="Data">Data</button>
                <button class="filter-btn" data-filter="Security">Security</button>
                <button class="filter-btn" data-filter="Business">Business</button>
                <button class="filter-btn" data-filter="Media">Media</button>
                <button class="filter-btn" data-filter="IoT">IoT</button>
                <button class="filter-btn" data-filter="Infrastructure">Infrastructure</button>
                <button class="filter-btn" data-filter="General">General</button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="section-header">
            <h2>All Digital Solutions</h2>
            <p>Explore our comprehensive suite of enterprise tools</p>
        </div>

        <div class="stats-bar">
            <div class="stat-item">
                <div class="stat-number" id="totalCount">0</div>
                <div class="stat-label">Total Features</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="activeCount">0</div>
                <div class="stat-label">Active Now</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">99.9%</div>
                <div class="stat-label">Uptime</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
            </div>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
        </div>

        <div class="features-grid" id="featuresGrid"></div>

        <div class="no-results" id="noResults" style="display: none;">
            <i class="fas fa-search"></i>
            <h3>No features found</h3>
            <p>Try adjusting your search or filter criteria</p>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <h3 style="color: var(--primary-blue); font-weight: 800; margin-bottom: 0.5rem;">
                <i class="fas fa-bolt me-2"></i>MEDIA.DIGITAL
            </h3>
            <p style="color: var(--text-muted);">Empowering businesses with cutting-edge digital solutions</p>
            <div class="social-links">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-discord"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
            <p class="copyright">&copy; 2024 MEDIA.DIGITAL. All rights reserved.</p>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem;">
                <a href="#" style="color: var(--primary-blue);">Documentation</a> • 
                <a href="#" style="color: var(--primary-blue);">API</a> • 
                <a href="#" style="color: var(--primary-blue);">Support</a>
            </p>
        </div>
    </footer>

    <!-- Scroll to Top -->
    <div class="scroll-top" id="scrollTop">
        <i class="fas fa-arrow-up"></i>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Features data
        const features = ${FEATURES_JSON};

        // DOM Elements
        const featuresGrid = document.getElementById('featuresGrid');
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('noResults');
        const scrollTop = document.getElementById('scrollTop');
        const totalCount = document.getElementById('totalCount');
        const activeCount = document.getElementById('activeCount');

        let currentFilter = 'all';
        let searchTerm = '';

        // Initialize
        function init() {
            totalCount.textContent = features.length;
            activeCount.textContent = features.length;
            renderFeatures(features);
            setupEventListeners();
            
            // Hide loading after render
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }

        // Render features
        function renderFeatures(items) {
            if (items.length === 0) {
                featuresGrid.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }

            featuresGrid.style.display = 'grid';
            noResults.style.display = 'none';

            featuresGrid.innerHTML = items.map(feature => \`
                <div class="feature-card" onclick="window.open('\${feature.path}/index.html', '_blank')">
                    <div class="status-indicator">
                        <div class="status-dot"></div>
                        <span class="status-text">Active</span>
                    </div>
                    <div class="feature-icon">
                        <i class="getIcon(feature.category)"></i>
                    </div>
                    <h3 class="feature-name">\${feature.name}</h3>
                    <div class="feature-path">/\${feature.path}/</div>
                    <span class="feature-category">\${feature.category}</span>
                </div>
            \`).join('');

            activeCount.textContent = items.length;
        }

        // Get icon based on category
        function getIcon(category) {
            const icons = {
                'AI & ML': 'fas fa-brain',
                'Data': 'fas fa-database',
                'Security': 'fas fa-shield-alt',
                'Business': 'fas fa-briefcase',
                'Media': 'fas fa-play-circle',
                'IoT': 'fas fa-wifi',
                'Infrastructure': 'fas fa-server',
                'General': 'fas fa-cube'
            };
            return icons[category] || 'fas fa-cube';
        }

        // Filter features
        function filterFeatures() {
            let filtered = features;

            // Apply category filter
            if (currentFilter !== 'all') {
                filtered = filtered.filter(f => f.category === currentFilter);
            }

            // Apply search filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(f => 
                    f.name.toLowerCase().includes(term) ||
                    f.path.toLowerCase().includes(term) ||
                    f.category.toLowerCase().includes(term)
                );
            }

            renderFeatures(filtered);
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search input
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value.trim();
                filterFeatures();
            });

            // Filter buttons
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    filterFeatures();
                });
            });

            // Scroll to top
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTop.classList.add('visible');
                } else {
                    scrollTop.classList.remove('visible');
                }
            });

            scrollTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Start
        init();
    </script>
</body>
</html>
INDEXEOF

echo "✅ index.html updated with all $(echo "$DIGITAL_DIRS" | wc -w) features!"

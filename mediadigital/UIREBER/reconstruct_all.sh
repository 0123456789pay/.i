#!/bin/bash

# skrip untuk merekonstruksi seluruh sistem direktori .digital
# Menambahkan filemanajer.html, navigasi unik, dan fitur khusus

DIGITAL_DIRS=$(find /workspace -maxdepth 2 -type d -name "*.digital" | sort)

# Fungsi untuk membuat filemanajer.html
create_filemanajer() {
    local dir=$1
    local name=$(basename "$dir" .digital)
    local capName=$(echo "$name" | sed 's/\b\(.\)/\u\1/g')
    
    cat > "$dir/filemanajer.html" << 'FILEMANAGER_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Manager | MEDIA.DIGITAL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-blue: #0066cc;
            --light-blue: #0099ff;
            --bg-white: #ffffff;
            --bg-light: #f8fbff;
        }
        body { background: var(--bg-light); font-family: 'Segoe UI', sans-serif; }
        .navbar { background: linear-gradient(135deg, var(--primary-blue), var(--light-blue)); }
        .sidebar { background: var(--bg-white); border-right: 1px solid #e0e7ff; min-tinggi: calc(100vh - 56px); }
        .file-item { background: var(--bg-white); border: 1px solid #e0e7ff; batas-radius: 8px; bantalan: 15px; jarak-luar-bottom: 10px; transition: semua 0.3s; }
        .file-item:hover { box-shadow: 0 4px 12px rgba(0,102,204,0.15); transform: translateY(-2px); }
        .file-icon { font-size: 2rem; color: var(--primary-blue); }
        .btn-primary { background: var(--primary-blue); border: none; }
        .btn-primary:hover { background: var(--light-blue); }
        .folder-tree { list-style: none; padding-left: 0; }
        .folder-tree li { padding: 8px 12px; cursor: pointer; border-radius: 6px; }
        .folder-tree li:hover { background: var(--bg-light); }
        .folder-tree li.active { background: #e6f2ff; warna: var(--primary-blue); huruf-weight: 600; }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark px-4">
        <a class="navbar-brand fw-bold" href="index.html">
            <i class="fas fa-bolt me-2"></i>MEDIA.DIGITAL <span class="fw-normal">| File Manager</span>
        </a>
        <div class="d-flex">
            <button class="btn btn-light btn-sm me-2"><i class="fas fa-upload me-1"></i>Upload</button>
            <button class="btn btn-outline-light btn-sm"><i class="fas fa-folder-plus me-1"></i>New Folder</button>
        </div>
    </nav>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 sidebar p-3">
                <h6 class="text-primary fw-bold mb-3"><i class="fas fa-folder-tree me-2"></i>Directories</h6>
                <ul class="folder-tree">
                    <li class="active"><i class="fas fa-folder me-2"></i>All Files</li>
                    <li><i class="fas fa-folder me-2"></i>Documents</li>
                    <li><i class="fas fa-folder me-2"></i>Images</li>
                    <li><i class="fas fa-folder me-2"></i>Media</li>
                    <li><i class="fas fa-folder me-2"></i>System</li>
                    <li><i class="fas fa-folder me-2"></i>Config</li>
                </ul>
                <hr>
                <h6 class="text-primary fw-bold mb-3"><i class="fas fa-tags me-2"></i>Tags</h6>
                <ul class="folder-tree">
                    <li><i class="fas fa-circle me-2 text-primary"></i>Important</li>
                    <li><i class="fas fa-circle me-2 text-success"></i>Completed</li>
                    <li><i class="fas fa-circle me-2 text-warning"></i>Pending</li>
                </ul>
            </div>
            
            <div class="col-md-10 p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="text-primary fw-bold"><i class="fas fa-folder-open me-2"></i>File Manager</h4>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm active"><i class="fas fa-th-large me-1"></i>Grid</button>
                        <button class="btn btn-outline-primary btn-sm"><i class="fas fa-list me-1"></i>List</button>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Search files...">
                    </div>
                    <div class="col-md-6 text-end">
                        <button class="btn btn-sm btn-primary"><i class="fas fa-filter me-1"></i>Filter</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-sort me-1"></i>Sort</button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                        <div class="file-item text-center">
                            <div class="file-icon mb-2"><i class="fas fa-file-alt"></i></div>
                            <div class="fw-bold">config.json</div>
                            <small class="text-muted">2.4 KB • Modified today</small>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="file-item text-center">
                            <div class="file-icon mb-2"><i class="fas fa-file-code"></i></div>
                            <div class="fw-bold">script.js</div>
                            <small class="text-muted">15.8 KB • Modified yesterday</small>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="file-item text-center">
                            <div class="file-icon mb-2"><i class="fas fa-file-image"></i></div>
                            <div class="fw-bold">logo.png</div>
                            <small class="text-muted">48.2 KB • Modified 2 days ago</small>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="file-item text-center">
                            <div class="file-icon mb-2"><i class="fas fa-database"></i></div>
                            <div class="fw-bold">database.sql</div>
                            <small class="text-muted">1.2 MB • Modified 3 days ago</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
FILEMANAGER_EOF
}

# Fungsi untuk membuat indeks.html dengan navigasi unik
create_index_html() {
    local dir=$1
    local name=$(basename "$dir" .digital)
    local capName=$(echo "$name" | sed 's/\b\(.\)/\u\1/g' | sed 's/_/ /g')
    
    # Tentukan menu berdasarkan nama direktori
    local menu1="Features"
    local menu2="Services"
    local menu3="Resources"
    local submenu1="Overview|Documentation|API|Settings"
    local submenu2="Analytics|Reports|Integration|Support"
    local submenu3="Tutorials|Guides|Templates|Community"
    
    # suai menu untuk fitur khusus
    if [[ "$name" == "datacenter" ]]; then
        menu1="Infrastructure"; menu2="Security"; menu3="Monitoring"
        submenu1="Servers|Network|Storage|Backup"
        submenu2="Firewall|Encryption|Access|Audit"
        submenu3="Dashboard|Alerts|Logs|Performance"
    elif [[ "$name" == "aichatreber" ]]; then
        menu1="AI Models"; menu2="Conversations"; menu3="Analytics"
        submenu1="Chatbot|NLP|ML|Training"
        submenu2="History|Sessions|Export|Import"
        submenu3="Metrics|Insights|Trends|Reports"
    elif [[ "$name" == "videolife" ]]; then
        menu1="Library"; menu2="Editor"; menu3="Publish"
        submenu1="Uploads|Streams|Playlists|Archives"
        submenu2="Trim|Effects|Subtitles|Transitions"
        submenu3="YouTube|Vimeo|Social|Embed"
    elif [[ "$name" == "situsmanajemeniklan" ]]; then
        menu1="Campaigns"; menu2="Targeting"; menu3="ROI"
        submenu1="Active|Paused|Draft|Archived"
        submenu2="Demographics|Interests|Behavior|Location"
        submenu3="Revenue|CTR|Conversion|Attribution"
    elif [[ "$name" == "situsnews" ]]; then
        menu1="Articles"; menu2="Categories"; menu3="Audience"
        submenu1="Draft|Published|Scheduled|Archived"
        submenu2="Politics|Tech|Business|Sports"
        submenu3="Readers|Engagement|Subscriptions|Analytics"
    fi
    
    cat > "$dir/index.html" << INDEXEOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${capName} | MEDIA.DIGITAL</title>
    <meta name="description" content="${capName} - Enterprise digital solution with advanced features.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm border-bottom border-primary">
        <div class="container-fluid px-4">
            <a class="navbar-brand fw-bold d-flex align-items-center" href="../../index.html">
                <span style="font-size: 1.8rem; margin-right: 0.5rem;">⚡</span>
                <div>
                    <div style="font-size: 1.1rem; color: #0066cc;">${capName}</div>
                    <div style="font-size: 0.7rem; color: #666; huruf-weight: normal;">media.digital</div>
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link active" href="#home">Home</a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="menu1Dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${menu1} ▾
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="menu1Dropdown">
                            <li><a href="#item1">$(echo $submenu1 | cut -d'|' -f1)</a></li>
                            <li><a href="#item2">$(echo $submenu1 | cut -d'|' -f2)</a></li>
                            <li><a href="#item3">$(echo $submenu1 | cut -d'|' -f3)</a></li>
                            <li><a href="#item4">$(echo $submenu1 | cut -d'|' -f4)</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="menu2Dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${menu2} ▾
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="menu2Dropdown">
                            <li><a href="#item5">$(echo $submenu2 | cut -d'|' -f1)</a></li>
                            <li><a href="#item6">$(echo $submenu2 | cut -d'|' -f2)</a></li>
                            <li><a href="#item7">$(echo $submenu2 | cut -d'|' -f3)</a></li>
                            <li><a href="#item8">$(echo $submenu2 | cut -d'|' -f4)</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="menu3Dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${menu3} ▾
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="menu3Dropdown">
                            <li><a href="#item9">$(echo $submenu3 | cut -d'|' -f1)</a></li>
                            <li><a href="#item10">$(echo $submenu3 | cut -d'|' -f2)</a></li>
                            <li><a href="#item11">$(echo $submenu3 | cut -d'|' -f3)</a></li>
                            <li><a href="#item12">$(echo $submenu3 | cut -d'|' -f4)</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="filemanajer.html"><i class="fas fa-folder me-1"></i>Files</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="py-5 bg-gradient">
        <div class="container py-5">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold text-primary mb-4">${capName}</h1>
                    <p class="lead text-muted mb-4">Advanced digital solution for enterprise needs. Streamline your workflow with powerful tools and seamless integration.</p>
                    <div class="d-flex gap-3">
                        <a href="#features" class="btn btn-primary btn-lg px-4"><i class="fas fa-rocket me-2"></i>Get Started</a>
                        <a href="filemanajer.html" class="btn btn-outline-primary btn-lg px-4"><i class="fas fa-folder-open me-2"></i>File Manager</a>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="position-relative">
                        <div class="bg-white rounded-4 shadow-lg p-4 mx-auto" style="max-width: 500px;">
                            <div class="row g-3">
                                <div class="col-6"><div class="p-3 bg-light rounded-3 text-center"><i class="fas fa-cog fa-2x text-primary mb-2"></i><br><small>Configuration</small></div></div>
                                <div class="col-6"><div class="p-3 bg-light rounded-3 text-center"><i class="fas fa-chart-line fa-2x text-primary mb-2"></i><br><small>Analytics</small></div></div>
                                <div class="col-6"><div class="p-3 bg-light rounded-3 text-center"><i class="fas fa-shield-alt fa-2x text-primary mb-2"></i><br><small>Security</small></div></div>
                                <div class="col-6"><div class="p-3 bg-light rounded-3 text-center"><i class="fas fa-sync fa-2x text-primary mb-2"></i><br><small>Sync</small></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5">
        <div class="container py-5">
            <div class="text-center mb-5">
                <h2 class="fw-bold text-primary">Powerful Features</h2>
                <p class="text-muted">Everything you need to manage your digital operations</p>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-bolt fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">Fast Performance</h5>
                            <p class="text-muted">Optimized for speed and efficiency</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-lock fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">Secure by Default</h5>
                            <p class="text-muted">Enterprise-grade security built-in</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-plug fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">Easy Integration</h5>
                            <p class="text-muted">Connect with your favorite tools</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-chart-bar fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">Advanced Analytics</h5>
                            <p class="text-muted">Deep insights into your data</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-cloud fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">Cloud Native</h5>
                            <p class="text-muted">Built for modern cloud infrastructure</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        <div class="card-body text-center p-4">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                                <i class="fas fa-headset fa-2x"></i>
                            </div>
                            <h5 class="fw-bold">24/7 Support</h5>
                            <p class="text-muted">Always here when you need us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3">
                    <h3 class="display-5 fw-bold text-primary">99.9%</h3>
                    <p class="text-muted">Uptime Guarantee</p>
                </div>
                <div class="col-md-3">
                    <h3 class="display-5 fw-bold text-primary">10M+</h3>
                    <p class="text-muted">Requests/Day</p>
                </div>
                <div class="col-md-3">
                    <h3 class="display-5 fw-bold text-primary">24/7</h3>
                    <p class="text-muted">Customer Support</p>
                </div>
                <div class="col-md-3">
                    <h3 class="display-5 fw-bold text-primary">150+</h3>
                    <p class="text-muted">Integrations</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-top border-primary py-4">
        <div class="container text-center">
            <p class="text-muted mb-2">&copy; 2024 ${capName} | MEDIA.DIGITAL. All rights reserved.</p>
            <div>
                <a href="#" class="text-primary me-3"><i class="fab fa-github"></i></a>
                <a href="#" class="text-primary me-3"><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-primary me-3"><i class="fab fa-linkedin"></i></a>
                <a href="#" class="text-primary"><i class="fab fa-discord"></i></a>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
INDEXEOF
}

# Counter
count=0
total=$(echo "$DIGITAL_DIRS" | wc -l)

echo "Starting reconstruction of $total .digital folders..."

for dir in $DIGITAL_DIRS; do
    count=$((count + 1))
    name=$(basename "$dir")
    echo "[$count/$total] Processing: $name"
    
    # buat filemanajer.html
    create_filemanajer "$dir"
    
    # buat indeks.html dengan unique navigation
    create_index_html "$dir"
    
done

echo ""
echo "✅ Reconstruction complete! All $total folders updated."
echo "✅ Added filemanajer.html to each folder"
echo "✅ Created unique navigation menus"
echo "✅ Applied white-blue accent theme"

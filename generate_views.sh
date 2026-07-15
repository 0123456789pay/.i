#!/bin/bash

# Script untuk menghasilkan ratusan file HTML views
echo "Memulai generasi file HTML views..."

# Pastikan folder views ada
mkdir -p views

# Daftar modul berdasarkan file JS yang ada
js_files=$(ls js/*.js 2>/dev/null | sed 's|js/||g' | sed 's|\.js||g')

count=0
for module in $js_files; do
    # Skip file utilitas inti jika diperlukan
    if [[ "$module" == "core"* ]]; then
        continue
    fi

    # Buat nama file HTML
    html_file="views/${module}.html"
    
    # Buat konten HTML dinamis
    cat > "$html_file" << HTMLEOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${module^} - WebOS</title>
    <link rel="stylesheet" href="../css/${module}.css">
    <link rel="stylesheet" href="../css/system.css">
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .nav-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
        .nav-links a { text-decoration: none; color: #007bff; padding: 8px 12px; border: 1px solid #007bff; border-radius: 4px; transition: all 0.3s; }
        .nav-links a:hover { background: #007bff; color: white; }
        .content { min-height: 400px; padding: 20px; background: #fafafa; border-radius: 4px; border: 1px solid #eee; }
        .back-link { display: inline-block; margin-bottom: 15px; color: #666; text-decoration: none; }
        .back-link:hover { color: #007bff; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🖥️ ${module^} Interface</h1>
            <span class="badge">Module: ${module}</span>
        </div>
        
        <a href="index.html" class="back-link">← Kembali ke Dashboard Utama</a>
        
        <div class="content" id="app-content">
            <h2>Selamat datang di Modul ${module^}</h2>
            <p>Ini adalah antarmuka utama untuk modul <strong>${module}</strong>.</p>
            <div id="dynamic-content">
                <!-- Konten dinamis akan dimuat di sini oleh JavaScript -->
                <p>Memuat komponen...</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
                <h3>Status Sistem</h3>
                <p>Modul ini terhubung dengan:</p>
                <ul>
                    <li>Database: <code>../db/${module}.js</code></li>
                    <li>Server: <code>../srv/${module}.js</code></li>
                    <li>Style: <code>../css/${module}.css</code></li>
                    <li>Logic: <code>../js/${module}.js</code></li>
                </ul>
            </div>
        </div>

        <div class="nav-links">
            <a href="index.html">🏠 Dashboard</a>
            <a href="terminal.html">💻 Terminal</a>
            <a href="#" onclick="loadModule('${module}')">🔄 Refresh</a>
            <!-- Tautan ke modul terkait -->
            <a href="ui-window-manager.html">🪟 Window Manager</a>
            <a href="service-auth.html">🔐 Auth Service</a>
            <a href="app-browser.html">🌐 Browser</a>
        </div>
    </div>

    <script src="../js/${module}.js"></script>
    <script>
        // Inisialisasi modul
        console.log('Memuat modul: ${module}');
        
        function loadModule(moduleName) {
            document.getElementById('dynamic-content').innerHTML = 
                '<p>Memuat ulang komponen ' + moduleName + '...</p>' +
                '<p>Timestamp: ' + new Date().toLocaleString() + '</p>';
            
            // Simulasi pemuatan data
            setTimeout(() => {
                document.getElementById('dynamic-content').innerHTML += 
                    '<p style="color: green;">✓ Modul berhasil dimuat!</p>';
            }, 500);
        }

        // Auto-load saat halaman dibuka
        window.addEventListener('DOMContentLoaded', () => {
            loadModule('${module}');
        });
    </script>
</body>
</html>
HTMLEOF

    count=$((count + 1))
    echo "Dibuat: $html_file"
done

# Buat file index.html khusus untuk views jika belum ada atau update
cat > views/index.html << 'INDEXEOF'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebOS Views Index</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #1a1a2e; color: #eee; margin: 0; padding: 20px; }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 { text-align: center; color: #00d4ff; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
        .card { background: #16213e; padding: 15px; border-radius: 8px; border: 1px solid #0f3460; transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); border-color: #00d4ff; }
        .card a { text-decoration: none; color: #fff; display: block; }
        .card h3 { margin: 0 0 10px 0; font-size: 14px; color: #00d4ff; }
        .card p { margin: 0; font-size: 12px; color: #aaa; }
        .back-home { text-align: center; margin-bottom: 20px; }
        .back-home a { color: #00d4ff; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="back-home">
            <a href="../index.html">← Kembali ke Home Utama</a> | 
            <a href="../terminal.html">Buka Terminal</a>
        </div>
        <h1>📂 Daftar Semua Views WebOS</h1>
        <div class="grid" id="views-grid">
            <!-- Akan diisi oleh JavaScript -->
        </div>
    </div>

    <script>
        // Load daftar file HTML secara dinamis
        fetch('../build_manifest.json')
            .then(r => r.json())
            .then(data => {
                const grid = document.getElementById('views-grid');
                const views = data.views || [];
                
                views.forEach(view => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = \`
                        <a href="\${view}">
                            <h3>\${view.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                            <p>Klik untuk membuka</p>
                        </a>
                    \`;
                    grid.appendChild(card);
                });
            })
            .catch(() => {
                // Fallback jika manifest belum ada
                const grid = document.getElementById('views-grid');
                grid.innerHTML = '<p style="text-align:center; width:100%;">Memuat daftar views...</p>';
            });
    </script>
</body>
</html>
INDEXEOF

echo ""
echo "=========================================="
echo "Generasi Selesai!"
echo "Total file HTML dibuat: $count"
echo "Lokasi: /workspace/views/"
echo "Index views: /workspace/views/index.html"
echo "=========================================="

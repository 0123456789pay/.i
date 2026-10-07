#!/bin/bash
cd /workspace/videolife

# senarai of semua 75 menu berkas-berkas
files=(
"index.html" "trending.html" "terbaru.html" "populer.html" "musik.html" "film.html"
"serial-tv.html" "olahraga.html" "gaming.html" "berita.html" "edukasi.html" "komedi.html"
"animasi.html" "dokumenter.html" "kids.html" "lifestyle.html" "teknologi.html" "otomotif.html"
"kuliner.html" "travel.html" "fashion.html" "kesehatan.html" "sains.html" "sejarah.html"
"seni.html" "diy.html" "podcast.html" "live.html" "premium.html" "playlist.html"
"watch-later.html" "favorites.html" "history.html" "subscriptions.html" "community.html" "channels.html"
"upload.html" "studio.html" "analytics.html" "monetization.html" "copyright.html" "settings.html"
"profile.html" "account.html" "privacy.html" "terms.html" "help.html" "contact.html"
"about.html" "careers.html" "press.html" "developers.html" "api.html" "mobile.html"
"tv-app.html" "download.html" "offline.html" "quality.html" "subtitles.html" "playback.html"
"notifications.html" "messages.html" "comments.html" "reviews.html" "ratings.html" "reports.html"
"moderation.html" "safety.html" "parents.html" "education-hub.html" "creator-fund.html" "merchandise.html"
"memberships.html" "super-chat.html" "premiere.html" "shorts.html" "stories.html" "clips.html"
)

# CSS common gaya
css='
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background: #1a1a2e; warna: #fff; }
.header { background: #16213e; bantalan: 20px; display: flex; justify-isi: space-between; align-butiran: center; flex-wrap: wrap; }
.logo { font-size: 28px; font-weight: bold; color: #e94560; teks-decoration: none; }
.nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
.nav a { color: #fff; teks-decoration: none; bantalan: 8px 12px; latar-belakang: #0f3460; batas-radius: 5px; huruf-ukuran: 14px; transition: 0.3s; }
.nav a:hover { background: #e94560; }
.container { padding: 30px; max-width: 1400px; margin: 0 auto; }
.page-title { font-size: 32px; margin-bottom: 20px; color: #e94560; }
.video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 30px; }
.video-card { background: #16213e; batas-radius: 10px; overflow: hidden; transition: transform 0.3s; cursor: pointer; }
.video-card:hover { transform: translateY(-5px); }
.thumbnail { width: 100%; height: 160px; background: linear-gradient(135deg, #0f3460, #e94560); display: flex; align-butiran: center; justify-isi: center; }
.play-icon { font-size: 50px; color: #fff; }
.video-info { padding: 15px; }
.video-title { font-size: 16px; margin-bottom: 8px; }
.video-meta { font-size: 12px; color: #aaa; }
.db-panel { background: #0f3460; bantalan: 20px; jarak-luar-top: 30px; batas-radius: 10px; }
.btn { background: #e94560; warna: #fff; batas: none; bantalan: 10px 20px; batas-radius: 5px; cursor: pointer; jarak-luar: 5px; }
.btn:hover { background: #c73e54; }
input, textarea, select { width: 100%; padding: 10px; margin: 10px 0; background: #1a1a2e; batas: 1px solid #0f3460; warna: #fff; batas-radius: 5px; }
.file-manager { background: #16213e; bantalan: 20px; jarak-luar-top: 20px; batas-radius: 10px; }
.file-item { padding: 10px; background: #0f3460; jarak-luar: 5px 0; batas-radius: 5px; display: flex; justify-isi: space-between; }
.php-section { background: #2d1f3d; bantalan: 20px; jarak-luar-top: 20px; batas-radius: 10px; }
'

for file in "${files[@]}"; do
    if [ "$file" != "index.html" ]; then
        # Extract halaman nama dari filename
        pageName=$(echo "$file" | sed 's/.html$//' | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
        
        cat > "$file" << HTMLEOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$pageName - VideoLife</title>
    <style>$css</style>
</head>
<body>
    <div class="header">
        <a href="index.html" class="logo">🎬 VideoLife</a>
        <nav class="nav" id="mainNav"></nav>
    </div>
    <div class="container">
        <h1 class="page-title">$pageName</h1>
        <p>Halaman $pageName - Bagian dari platform VideoLife</p>
        
        <div class="video-grid" id="videoGrid"></div>
        
        <div class="db-panel">
            <h2>Database Manager</h2>
            <input type="text" id="dbInput" placeholder="Masukkan data...">
            <select id="dbType">
                <option value="video">Video</option>
                <option value="user">User</option>
                <option value="comment">Comment</option>
            </select>
            <textarea id="dbArea" rows="4" placeholder="Data akan muncul di sini"></textarea>
            <button class="btn" onclick="saveData()">Simpan</button>
            <button class="btn" onclick="loadData()">Load</button>
            <button class="btn" onclick="clearData()">Clear</button>
            <div id="dbStatus"></div>
        </div>
        
        <div class="file-manager">
            <h2>File Manager</h2>
            <div id="fileList"></div>
            <button class="btn" onclick="scanFiles()">Scan Files</button>
            <button class="btn" onclick="createFile()">New File</button>
        </div>
        
        <div class="php-section">
            <h2>PHP Backend Info</h2>
            <p>Server Time: <span id="serverTime"></span></p>
            <p>PHP Version: <span id="phpVersion">8.x (simulated)</span></p>
            <p>Database: <span id="dbStatus2">Connected (localStorage)</span></p>
            <button class="btn" onclick="checkServer()">Check Server</button>
        </div>
    </div>

    <script>
        const menus = [
            {name: 'Home', file: 'index.html'}, {name: 'Trending', file: 'trending.html'},
            {name: 'Terbaru', file: 'terbaru.html'}, {name: 'Populer', file: 'populer.html'},
            {name: 'Musik', file: 'musik.html'}, {name: 'Film', file: 'film.html'},
            {name: 'Serial TV', file: 'serial-tv.html'}, {name: 'Olahraga', file: 'olahraga.html'},
            {name: 'Gaming', file: 'gaming.html'}, {name: 'Berita', file: 'berita.html'},
            {name: 'Edukasi', file: 'edukasi.html'}, {name: 'Komedi', file: 'komedi.html'},
            {name: 'Animasi', file: 'animasi.html'}, {name: 'Dokumenter', file: 'dokumenter.html'},
            {name: 'Kids', file: 'kids.html'}, {name: 'Lifestyle', file: 'lifestyle.html'}
        ];

        function initNav() {
            const nav = document.getElementById('mainNav');
            menus.forEach(menu => {
                const a = document.createElement('a');
                a.href = menu.file;
                a.textContent = menu.name;
                nav.appendChild(a);
            });
        }

        function loadVideos() {
            const grid = document.getElementById('videoGrid');
            const videos = JSON.parse(localStorage.getItem('videolife_videos') || '[]');
            const count = videos.length > 0 ? videos.length : 8;
            for (let i = 1; i <= count && i <= 12; i++) {
                const v = videos[i-1] || {title: 'Video ' + i, views: Math.floor(Math.random()*10000)};
                grid.innerHTML += \`
                    <div class="video-card">
                        <div class="thumbnail"><span class="play-icon">▶</span></div>
                        <div class="video-info">
                            <div class="video-title">\${v.title || 'Video '+i}</div>
                            <div class="video-meta">\${v.views || 0} views • \${v.date || 'recent'}</div>
                        </div>
                    </div>
                \`;
            }
        }

        function saveData() {
            const input = document.getElementById('dbInput').value;
            const type = document.getElementById('dbType').value;
            const key = 'videolife_' + type;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            data.push({content: input, type: type, date: new Date().toISOString()});
            localStorage.setItem(key, JSON.stringify(data));
            document.getElementById('dbStatus').innerHTML = '✓ Data saved to ' + key;
        }

        function loadData() {
            const type = document.getElementById('dbType').value;
            const key = 'videolife_' + type;
            const data = localStorage.getItem(key) || '[]';
            document.getElementById('dbArea').value = data;
            document.getElementById('dbStatus').innerHTML = 'Loaded ' + (JSON.parse(data).length) + ' records';
        }

        function clearData() {
            const type = document.getElementById('dbType').value;
            const key = 'videolife_' + type;
            localStorage.removeItem(key);
            document.getElementById('dbArea').value = '';
            document.getElementById('dbStatus').innerHTML = '✓ Cleared';
        }

        function scanFiles() {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '<div class="file-item"><span>database.json</span><span>2KB</span></div>';
            fileList.innerHTML += '<div class="file-item"><span>videos.json</span><span>15KB</span></div>';
            fileList.innerHTML += '<div class="file-item"><span>users.json</span><span>8KB</span></div>';
            fileList.innerHTML += '<div class="file-item"><span>config.php</span><span>1KB</span></div>';
        }

        function createFile() {
            const name = prompt('Nama file:');
            if (name) {
                const data = localStorage.getItem('videolife_files') || '[]';
                const files = JSON.parse(data);
                files.push({name: name, created: new Date().toISOString()});
                localStorage.setItem('videolife_files', JSON.stringify(files));
                alert('File ' + name + ' created!');
            }
        }

        function checkServer() {
            document.getElementById('serverTime').innerText = new Date().toLocaleString();
            document.getElementById('dbStatus2').innerText = 'Connected ✓';
        }

        initNav();
        loadVideos();
        checkServer();
    </script>
</body>
</html>
HTMLEOF
        echo "Created: $file"
    fi
done

echo "All 75 files generated successfully!"

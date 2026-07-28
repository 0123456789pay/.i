<?php
session_start();

// Database simulation using JSON files
$db_file = __DIR__ . '/db/data.json';
if (!file_exists($db_file)) {
    mkdir(__DIR__ . '/db', 0755, true);
    file_put_contents($db_file, json_encode([
        'users' => [],
        'pages' => [],
        'logs' => []
    ], JSON_PRETTY_PRINT));
}

// File manager storage
$fm_dir = __DIR__ . '/filemanajer';
if (!is_dir($fm_dir)) {
    mkdir($fm_dir, 0755, true);
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');
    
    if ($_POST['action'] === 'login') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        // Simple authentication (in production, use proper hashing)
        if ($username === 'admin' && $password === 'admin123') {
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $username;
            echo json_encode(['success' => true, 'redirect' => 'dashboard.php']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Username atau password salah']);
        }
        exit;
    }
    
    if ($_POST['action'] === 'save_page') {
        $data = json_decode(file_get_contents($db_file), true);
        $page_data = [
            'id' => uniqid(),
            'title' => $_POST['title'] ?? '',
            'content' => $_POST['content'] ?? '',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        $data['pages'][] = $page_data;
        file_put_contents($db_file, json_encode($data, JSON_PRETTY_PRINT));
        
        // Save to file manager
        file_put_contents("$fm_dir/{$page_data['id']}.html", $page_data['content']);
        
        echo json_encode(['success' => true]);
        exit;
    }
}

// Check if logged in for dashboard access
$is_logged_in = $_SESSION['logged_in'] ?? false;
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design Digital - Creative Agency</title>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .header { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; }
        .logo { color: white; font-size: 28px; font-weight: bold; text-decoration: none; }
        .nav-menu { display: flex; gap: 20px; }
        .nav-menu a { color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; transition: all 0.3s; }
        .nav-menu a:hover { background: rgba(255,255,255,0.2); }
        .hero { text-align: center; padding: 100px 20px; color: white; }
        .hero h1 { font-size: 48px; margin-bottom: 20px; }
        .hero p { font-size: 20px; max-width: 600px; margin: 0 auto 40px; opacity: 0.9; }
        .cta-btn { background: white; color: #667eea; padding: 15px 40px; border: none; border-radius: 30px; font-size: 18px; cursor: pointer; text-decoration: none; display: inline-block; transition: transform 0.3s; }
        .cta-btn:hover { transform: translateY(-3px); }
        .services { background: white; padding: 80px 50px; }
        .services h2 { text-align: center; color: #333; margin-bottom: 50px; font-size: 36px; }
        .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }
        .service-card { background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center; transition: transform 0.3s; }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .service-card h3 { color: #667eea; margin-bottom: 15px; }
        .footer { background: #333; color: white; padding: 40px 50px; text-align: center; }
        .login-btn { background: transparent; border: 2px solid white; color: white; padding: 10px 25px; border-radius: 25px; cursor: pointer; text-decoration: none; }
        .login-btn:hover { background: white; color: #667eea; }
    </style>
</head>
<body>
    <header class="header">
        <a href="index.php" class="logo">🎨 Design Digital</a>
        <nav class="nav-menu">
            <a href="tentang-kami.html">Tentang Kami</a>
            <a href="layanan.html">Layanan</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="kontak.html">Kontak</a>
            <?php if (!$is_logged_in): ?>
            <button onclick="showLoginModal()" class="login-btn">Login</button>
            <?php else: ?>
            <a href="dashboard.php" class="login-btn">Dashboard</a>
            <?php endif; ?>
        </nav>
    </header>

    <section class="hero">
        <h1>Solusi Desain Digital Kreatif</h1>
        <p>Kami membantu bisnis Anda berkembang dengan desain website, branding, dan strategi digital yang inovatif dan profesional.</p>
        <a href="konsultasi-gratis.html" class="cta-btn">Konsultasi Gratis</a>
    </section>

    <section class="services">
        <h2>Layanan Unggulan</h2>
        <div class="service-grid">
            <div class="service-card">
                <h3>🖥️ Web Design</h3>
                <p>Desain website modern dan responsif yang menarik pengunjung dan meningkatkan konversi.</p>
            </div>
            <div class="service-card">
                <h3>📱 Mobile App</h3>
                <p>Aplikasi mobile user-friendly untuk iOS dan Android dengan pengalaman pengguna terbaik.</p>
            </div>
            <div class="service-card">
                <h3>🎯 Branding</h3>
                <p>Identitas brand yang kuat dan memorable untuk membedakan bisnis Anda dari kompetitor.</p>
            </div>
        </div>
    </section>

    <footer class="footer">
        <p>&copy; 2025 Design Digital. All rights reserved.</p>
        <p style="margin-top: 10px;">
            <a href="kebijakan-privasi.html" style="color: #aaa; text-decoration: none; margin: 0 10px;">Kebijakan Privasi</a> |
            <a href="syarat-ketentuan.html" style="color: #aaa; text-decoration: none; margin: 0 10px;">Syarat & Ketentuan</a>
        </p>
    </footer>

    <!-- Login Modal -->
    <div id="loginModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:1000; justify-content:center; align-items:center;">
        <div style="background:white; padding:40px; border-radius:10px; width:400px; max-width:90%;">
            <h2 style="margin-bottom:20px; color:#333;">Login Dashboard</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Username" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ddd; border-radius:5px;" required>
                <input type="password" id="password" placeholder="Password" style="width:100%; padding:12px; margin-bottom:20px; border:1px solid #ddd; border-radius:5px;" required>
                <button type="submit" style="width:100%; padding:12px; background:#667eea; color:white; border:none; border-radius:5px; cursor:pointer;">Login</button>
            </form>
            <button onclick="hideLoginModal()" style="margin-top:15px; width:100%; padding:10px; background:#f0f0f0; border:none; border-radius:5px; cursor:pointer;">Batal</button>
        </div>
    </div>

    <script>
        function showLoginModal() {
            document.getElementById('loginModal').style.display = 'flex';
        }
        function hideLoginModal() {
            document.getElementById('loginModal').style.display = 'none';
        }
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'login');
            formData.append('username', document.getElementById('username').value);
            formData.append('password', document.getElementById('password').value);
            
            const response = await fetch('index.php', { method: 'POST', body: formData });
            const result = await response.json();
            
            if (result.success) {
                window.location.href = result.redirect;
            } else {
                alert(result.message);
            }
        });
    </script>
</body>
</html>

<?php
/**
 * PUSAT.DIGITAL - Main Entry Point
 * Gateway to all .digital features
 */

// Performance optimization
ob_start("ob_gzhandler");
header("Content-Type: text/html; charset=utf-8");
header("Cache-Control: public, max-age=31536000");
header("X-Powered-By: Pusat.Digital/1.0");

// Load system config
$config = json_decode(file_get_contents(__DIR__ . '/system/config.json'), true);
$featuresCount = $config['features_count'] ?? 0;

// Get feature list
$fiturPath = __DIR__ . '/fitur';
$features = array_map(function($f) {
    return basename($f, '.digital');
}, glob($fiturPath . '/*.digital'));
sort($features);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>PUSAT.DIGITAL | Universal Digital Platform</title>
    <meta name="description" content="<?= $config['system']['description'] ?>">
    <meta name="keywords" content="digital, platform, features, hosting, ai, marketing, domain">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="PUSAT.DIGITAL">
    <meta property="og:description" content="<?= $config['system']['description'] ?>">
    <meta property="og:type" content="website">
    
    <!-- PWA -->
    <link rel="manifest" href="/tunel/pusat.digital/manifest.json">
    <meta name="theme-color" content="#8b5cf6">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    
    <style>
        :root {
            --primary: #8b5cf6;
            --secondary: #ec4899;
            --dark: #0a0a0f;
            --light: #ffffff;
            --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: var(--dark);
            color: var(--light);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .hero {
            background: var(--gradient);
            padding: 5rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate { to { transform: rotate(360deg); } }
        
        .hero h1 {
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .hero p {
            font-size: 1.5rem;
            opacity: 0.95;
            position: relative;
            z-index: 1;
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 2rem;
            position: relative;
            z-index: 1;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: white;
        }
        
        .stat-label {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        
        .search-box {
            max-width: 600px;
            margin: -3rem auto 3rem;
            position: relative;
            z-index: 10;
        }
        
        .search-input {
            width: 100%;
            padding: 1.5rem 2rem;
            border-radius: 50px;
            border: none;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            color: white;
            font-size: 1.1rem;
            outline: none;
            transition: all 0.3s;
        }
        
        .search-input:focus {
            background: rgba(255,255,255,0.2);
            box-shadow: 0 0 30px rgba(139,92,246,0.5);
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .feature-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 1.5rem;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(139,92,246,0.3);
        }
        
        .feature-name {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .feature-url {
            font-size: 0.85rem;
            opacity: 0.6;
            font-family: monospace;
        }
        
        footer {
            text-align: center;
            padding: 3rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 3rem;
        }
        
        .paths {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
            font-family: monospace;
            font-size: 1.5rem;
        }
        
        .path {
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }
        
        .loading { opacity: 0.5; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>PUSAT.DIGITAL</h1>
        <p>Universal Digital Platform - <?= $config['system']['ecosystem'] ?> Ecosystem</p>
        <div class="stats">
            <div class="stat">
                <div class="stat-number"><?= $featuresCount ?></div>
                <div class="stat-label">Features</div>
            </div>
            <div class="stat">
                <div class="stat-number">∞</div>
                <div class="stat-label">Possibilities</div>
            </div>
            <div class="stat">
                <div class="stat-number">⚡</div>
                <div class="stat-label">Fast Load</div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="search-box">
            <input type="text" class="search-input" id="searchInput" placeholder="Search features... (e.g., ai, hosting, domain)">
        </div>
        
        <div class="paths">
            <span class="path">/</span>
            <span class="path">`</span>
            <span class="path">.</span>
            <span class="path">\</span>
            <span class="path">|</span>
        </div>
        
        <div class="feature-grid" id="featureGrid">
            <?php foreach ($features as $feature): ?>
            <a href="/tunel/pusat.digital/fitur/<?= htmlspecialchars($feature) ?>.digital" class="feature-card">
                <div class="feature-name"><?= htmlspecialchars(ucfirst($feature)) ?></div>
                <div class="feature-url"><?= htmlspecialchars($feature) ?>.digital</div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
    
    <footer>
        <p>&copy; <?= date('Y') ?> PUSAT.DIGITAL | Part of tunel() Ecosystem</p>
        <p style="margin-top: 1rem; opacity: 0.7;">All <?= $featuresCount ?> features are independent domains ready for deployment</p>
    </footer>
    
    <script>
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.feature-card');
            
            cards.forEach(card => {
                const name = card.querySelector('.feature-name').textContent.toLowerCase();
                const url = card.querySelector('.feature-url').textContent.toLowerCase();
                
                if (name.includes(query) || url.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Service Worker registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/tunel/pusat.digital/sw.js');
        }
        
        // Performance monitoring
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page loaded in ' + loadTime + 'ms');
        });
    </script>
</body>
</html>

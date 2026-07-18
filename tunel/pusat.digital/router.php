<?php
/**
 * PUSAT.DIGITAL - Universal Router & Integration System
 * Handles all .digital folders as independent domains
 * Optimized for fast loading, SEO, and crawler rendering
 */

// Performance Optimization
ob_start("ob_gzhandler");
header("X-Powered-By: Pusat.Digital/1.0");
header("Cache-Control: public, max-age=31536000, immutable");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");

// Define base paths
define('BASE_PATH', dirname(__DIR__));
define('FITUR_PATH', BASE_PATH . '/fitur');
define('SYSTEM_PATH', BASE_PATH . '/system');

// Get requested feature from URL
$requestUri = $_SERVER['REQUEST_URI'];
$hostName = $_SERVER['HTTP_HOST'] ?? 'localhost';

// Parse .digital domain/folder
preg_match('/([a-zA-Z0-9]+)\.digital/', $hostName . $requestUri, $matches);
$featureName = $matches[1] ?? 'index';

// Map feature to folder
$featureFolder = FITUR_PATH . '/' . $featureName . '.digital';

// Check if feature exists
if (!is_dir($featureFolder)) {
    // Try to find similar feature
    $folders = glob(FITUR_PATH . '/*.digital');
    foreach ($folders as $folder) {
        $fname = basename($folder, '.digital');
        if (stripos($fname, $featureName) !== false) {
            $featureFolder = $folder;
            $featureName = $fname;
            break;
        }
    }
}

// Load feature configuration
$configFile = $featureFolder . '/config.json';
if (file_exists($configFile)) {
    $featureConfig = json_decode(file_get_contents($configFile), true);
} else {
    $featureConfig = [
        'name' => $featureName,
        'title' => ucfirst($featureName),
        'description' => 'Feature: ' . $featureName,
        'version' => '1.0.0',
        'theme' => 'default',
        'layout' => 'standard',
        'seo' => [
            'enabled' => true,
            'keywords' => [$featureName, 'digital', 'feature'],
            'author' => 'Pusat.Digital'
        ]
    ];
}

// Determine request type
$requestType = 'html';
if (strpos($requestUri, '.json') !== false) {
    $requestType = 'json';
} elseif (strpos($requestUri, '.css') !== false) {
    $requestType = 'css';
} elseif (strpos($requestUri, '.js') !== false) {
    $requestType = 'js';
} elseif (strpos($requestUri, '/api/') !== false) {
    $requestType = 'api';
}

// Route to appropriate handler
switch ($requestType) {
    case 'json':
        header('Content-Type: application/json');
        $dataFile = $featureFolder . '/data.json';
        if (file_exists($dataFile)) {
            echo file_get_contents($dataFile);
        } else {
            echo json_encode(['status' => 'success', 'feature' => $featureName, 'config' => $featureConfig]);
        }
        break;
        
    case 'css':
        header('Content-Type: text/css');
        $cssFile = $featureFolder . '/style.css';
        if (file_exists($cssFile)) {
            readfile($cssFile);
        } else {
            echo "/* Default styles for {$featureName} */";
        }
        break;
        
    case 'js':
        header('Content-Type: application/javascript');
        $jsFile = $featureFolder . '/app.js';
        if (file_exists($jsFile)) {
            readfile($jsFile);
        } else {
            echo "// Default JS for {$featureName}";
        }
        break;
        
    case 'api':
        header('Content-Type: application/json');
        $apiFile = $featureFolder . '/api.php';
        if (file_exists($apiFile)) {
            include $apiFile;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'API not available']);
        }
        break;
        
    default:
        // HTML rendering with SEO optimization
        $htmlFile = $featureFolder . '/index.html';
        if (file_exists($htmlFile)) {
            include $htmlFile;
        } else {
            // Generate default page
            generateDefaultPage($featureName, $featureConfig);
        }
        break;
}

/**
 * Generate default optimized page for feature
 */
function generateDefaultPage($featureName, $config) {
    $title = $config['title'] ?? ucfirst($featureName);
    $desc = $config['description'] ?? 'Digital Feature: ' . $featureName;
    $keywords = implode(', ', $config['seo']['keywords'] ?? [$featureName]);
    
    // Unique color scheme based on feature name hash
    $hash = crc32($featureName);
    $hue = $hash % 360;
    $color1 = "hsl({$hue}, 70%, 50%)";
    $color2 = "hsl(" . (($hue + 40) % 360) . ", 70%, 40%)";
    
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Optimization -->
    <title><?= htmlspecialchars($title) ?> | Pusat.Digital</title>
    <meta name="description" content="<?= htmlspecialchars($desc) ?>">
    <meta name="keywords" content="<?= htmlspecialchars($keywords) ?>">
    <meta name="author" content="<?= htmlspecialchars($config['seo']['author'] ?? 'Pusat.Digital') ?>">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?= htmlspecialchars($title) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($desc) ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://<?= $featureName ?>.digital">
    
    <!-- Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="//<?= $featureName ?>.digital">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    
    <style>
        :root {
            --primary: <?= $color1 ?>;
            --secondary: <?= $color2 ?>;
            --dark: #0a0a0f;
            --light: #ffffff;
            --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: var(--dark);
            color: var(--light);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        header {
            background: var(--gradient);
            padding: 3rem 2rem;
            border-radius: 20px;
            margin-bottom: 3rem;
            position: relative;
            overflow: hidden;
        }
        
        header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 2rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .card h3 {
            color: var(--primary);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: var(--gradient);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
        }
        
        footer {
            text-align: center;
            padding: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 3rem;
        }
        
        .loading {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 15, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.1);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading" id="loading">
        <div class="spinner"></div>
    </div>
    
    <div class="container">
        <header>
            <h1><?= htmlspecialchars($title) ?></h1>
            <p class="subtitle"><?= htmlspecialchars($desc) ?></p>
            <p style="margin-top: 1rem; opacity: 0.8;">Feature ID: <?= $featureName ?>.digital</p>
        </header>
        
        <div class="feature-grid">
            <div class="card">
                <h3>🚀 Fast Loading</h3>
                <p>Optimized for instant load with minimal latency. Browser refresh rate maximized for smooth experience.</p>
            </div>
            <div class="card">
                <h3>🔍 SEO Optimized</h3>
                <p>Fully indexed by search engines with proper meta tags, structured data, and semantic HTML.</p>
            </div>
            <div class="card">
                <h3>🤖 Crawler Ready</h3>
                <p>Fast rendering for web crawlers and bots. Instant indexing across all platforms.</p>
            </div>
            <div class="card">
                <h3>📱 Responsive</h3>
                <p>Perfect display on all devices - desktop, tablet, mobile, and emerging platforms.</p>
            </div>
            <div class="card">
                <h3>⚡ High Performance</h3>
                <p>Gzip compression, lazy loading, and resource optimization for maximum speed.</p>
            </div>
            <div class="card">
                <h3>🔒 Secure</h3>
                <p>Built-in security headers, XSS protection, and secure communication protocols.</p>
            </div>
        </div>
        
        <div style="text-align: center; margin: 3rem 0;">
            <a href="/api/status" class="btn">Check Status</a>
            <a href="/docs" class="btn" style="background: transparent; border: 2px solid var(--primary); margin-left: 1rem;">Documentation</a>
        </div>
    </div>
    
    <footer>
        <p>&copy; <?= date('Y') ?> <?= htmlspecialchars($title) ?> | Powered by Pusat.Digital</p>
        <p style="margin-top: 0.5rem; opacity: 0.7;">Part of the Tunel() Ecosystem</p>
    </footer>
    
    <script>
        // Performance monitoring
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Hide loading indicator
            document.getElementById('loading').style.display = 'none';
            
            // Preload resources
            preloadResources();
        });
        
        function preloadResources() {
            // Prefetch related features
            const links = document.createElement('link');
            links.rel = 'prefetch';
            links.href = '/fitur/index.digital';
            document.head.appendChild(links);
        }
        
        // Service Worker registration for offline support
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log('Service Worker registered');
            });
        }
        
        // Intersection Observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });
    </script>
</body>
</html>
    <?php
}
?>

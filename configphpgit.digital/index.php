<?php
/**
 * Main PHP Entry Point - Secure Display System
 * Tampilan style media.digital (tanpa footer)
 * Mix: HTML + CSS + JS + PHP + DB Config
 */

// Load konfigurasi
$mainConfig = require_once __DIR__ . '/config/main.config.php';
$dbConfig = require_once __DIR__ . '/config/database.config.php';
$securityConfig = require_once __DIR__ . '/config/security.config.php';

// Terapkan security headers
foreach ($securityConfig['headers'] as $header => $value) {
    if (is_callable($value)) {
        $value = $value($securityConfig['csp_policy']);
    }
    header("$header: $value");
}

// Fungsi helper untuk render card
function renderCard($icon, $title, $description, $status = 'active') {
    return "
    <div class='card animate-in'>
        <div class='card-icon'>{$icon}</div>
        <h3>{$title}</h3>
        <p>{$description}</p>
        <span class='status-badge status-{$status}'>
            <span class='status-dot'></span>
            " . ucfirst($status) . "
        </span>
    </div>";
}

// Data cards untuk ditampilkan
$cards = [
    [
        'icon' => '🔒',
        'title' => 'Secure Mode',
        'description' => 'Sistem keamanan aktif dengan regex validation dan CSP headers untuk proteksi maksimal di browser.',
        'status' => 'active'
    ],
    [
        'icon' => '⚡',
        'title' => 'GitHub CDN',
        'description' => 'Integrasi dengan GitHub CDN untuk loading asset eksternal yang cepat dan aman.',
        'status' => 'active'
    ],
    [
        'icon' => '🎨',
        'title' => 'Media Digital UI',
        'description' => 'Tampilan modern inspired by media.digital dengan dark theme dan animasi smooth.',
        'status' => 'active'
    ],
    [
        'icon' => '🗄️',
        'title' => 'Database Secure',
        'description' => 'Koneksi database dengan binary-safe validation dan prepared statements.',
        'status' => 'active'
    ],
    [
        'icon' => '📊',
        'title' => 'Config System',
        'description' => 'Mix configuration HTML, CSS, JS, PHP, DB dalam satu sistem terintegrasi.',
        'status' => 'active'
    ],
    [
        'icon' => '🚀',
        'title' => 'Performance',
        'description' => 'Optimasi performa dengan caching, lazy loading, dan minimal HTTP requests.',
        'status' => 'active'
    ]
];

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Security Meta Tags -->
    <meta name="robots" content="noindex, nofollow">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    
    <title>ConfigPHP Git Digital - Secure Display System</title>
    
    <!-- Fonts dari Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- Inline critical CSS untuk performance -->
    <style>
        .critical-loaded { opacity: 1 !important; }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="header-content">
            <a href="/" class="logo">
                <div class="logo-icon">C</div>
                <span>ConfigPHP Git Digital</span>
            </a>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#config">Config</a></li>
                    <li><a href="#status">Status</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container">
        <!-- Hero Section -->
        <section class="hero" id="home">
            <h1>Secure PHP Display System</h1>
            <p>Sistem tampilan PHP secure dengan konfigurasi biner, regex validation, dan integrasi GitHub CDN. Tampilan modern tanpa footer, inspired by media.digital.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <a href="#features" class="btn btn-primary">Explore Features</a>
                <a href="#config" class="btn btn-secondary">View Config</a>
            </div>
        </section>

        <!-- Features Grid -->
        <section id="features">
            <div class="card-grid">
                <?php foreach ($cards as $card): ?>
                    <?= renderCard($card['icon'], $card['title'], $card['description'], $card['status']) ?>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Configuration Panel -->
        <section id="config">
            <h2 style="font-size: 2rem; margin: 3rem 0 2rem; text-align: center;">System Configuration</h2>
            <div class="config-panel">
                <div class="config-item">
                    <span class="config-key">Secure Mode</span>
                    <span class="config-value"><?= SECURE_MODE ? 'ENABLED ✓' : 'DISABLED ✗' ?></span>
                </div>
                <div class="config-item">
                    <span class="config-key">GitHub CDN</span>
                    <span class="config-value"><?= ALLOW_GITHUB_CDN ? 'ENABLED ✓' : 'DISABLED ✗' ?></span>
                </div>
                <div class="config-item">
                    <span class="config-key">XSS Protection</span>
                    <span class="config-value"><?= XSS_PROTECTION ? 'ACTIVE ✓' : 'INACTIVE ✗' ?></span>
                </div>
                <div class="config-item">
                    <span class="config-key">CSP Enabled</span>
                    <span class="config-value"><?= CSP_ENABLED ? 'YES ✓' : 'NO ✗' ?></span>
                </div>
                <div class="config-item">
                    <span class="config-key">PHP Version</span>
                    <span class="config-value"><?= phpversion() ?></span>
                </div>
                <div class="config-item">
                    <span class="config-key">Server</span>
                    <span class="config-value"><?= htmlspecialchars($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') ?></span>
                </div>
            </div>
        </section>

        <!-- Regex Patterns Display -->
        <section id="patterns" style="margin: 3rem 0;">
            <h2 style="font-size: 2rem; margin-bottom: 2rem; text-align: center;">Active Regex Patterns</h2>
            <div class="config-panel">
                <?php foreach ($mainConfig['patterns'] as $name => $pattern): ?>
                <div class="config-item">
                    <span class="config-key"><?= htmlspecialchars($name) ?></span>
                    <span class="config-value" style="font-family: 'Fira Code', monospace; font-size: 0.75rem;"><?= htmlspecialchars($pattern) ?></span>
                </div>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Status Section -->
        <section id="status" style="text-align: center; padding: 3rem 0;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">System Status</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">All systems operational and secure</p>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid var(--success-color);">
                <span style="width: 10px; height: 10px; background: var(--success-color); border-radius: 50%; display: inline-block;"></span>
                <span style="color: var(--success-color); font-weight: 600;">All Systems Operational</span>
            </div>
        </section>
    </main>

    <!-- JavaScript -->
    <script src="assets/js/main.js"></script>
    
    <!-- Inline script untuk initialization -->
    <script>
        // Log system info
        console.log('%c🔒 ConfigPHP Git Digital', 'font-size: 20px; font-weight: bold; color: #2563eb;');
        console.log('%cSecure Display System Active', 'font-size: 14px; color: #10b981;');
        console.log('Config loaded:', <?= json_encode([
            'secureMode' => SECURE_MODE,
            'githubCDN' => ALLOW_GITHUB_CDN,
            'xssProtection' => XSS_PROTECTION,
            'cspEnabled' => CSP_ENABLED
        ]) ?>);
    </script>
</body>
</html>

<?php
/**
 * KOMUNIKASI.DIGITAL - System Configuration
 * File konfigurasi utama untuk sistem komunikasi digital
 */

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'komunikasi_digital');
define('DB_USER', 'root');
define('DB_PASS', '');

// System configuration
define('SYSTEM_NAME', 'Komunikasi.Digital');
define('SYSTEM_VERSION', '1.0.0');
define('SYSTEM_URL', 'http://localhost/komunikasi.digital/');

// Theme configuration
$theme = [
    'primary' => '#0066cc',
    'secondary' => '#0099ff',
    'light' => '#e6f2ff',
    'dark' => '#003366',
    'white' => '#ffffff'
];

// Module paths
$modules = [
    'alatkolaborasi' => [
        'name' => 'Alat Kolaborasi',
        'path' => 'AlatKolaborasi.digital/',
        'enabled' => true,
        'icon' => 'fa-users'
    ],
    'komunikasiinternal' => [
        'name' => 'Komunikasi Internal',
        'path' => 'KomunikasiInternal.digital/',
        'enabled' => true,
        'icon' => 'fa-building'
    ],
    'komunikasikorporat' => [
        'name' => 'Komunikasi Korporat',
        'path' => 'KomunikasiKorporat.digital/',
        'enabled' => true,
        'icon' => 'fa-briefcase'
    ],
    'komunikasikrisis' => [
        'name' => 'Komunikasi Krisis',
        'path' => 'KomunikasiKrisis.digital/',
        'enabled' => true,
        'icon' => 'fa-exclamation-triangle'
    ],
    'konferensivirtual' => [
        'name' => 'Konferensi Virtual',
        'path' => 'KonferensiVirtual.digital/',
        'enabled' => true,
        'icon' => 'fa-video'
    ],
    'pertemuanhibrida' => [
        'name' => 'Pertemuan Hibrida',
        'path' => 'PertemuanHibrida.digital/',
        'enabled' => true,
        'icon' => 'fa-mix'
    ],
    'syncmate' => [
        'name' => 'SyncMate',
        'path' => 'syncmate.digital/',
        'enabled' => true,
        'icon' => 'fa-sync'
    ]
];

// Authentication settings
$auth = [
    'login_enabled' => true,
    'register_enabled' => true,
    'remember_me' => true,
    'email_verification' => false,
    'session_timeout' => 1800 // 30 minutes
];

// Security settings
$security = [
    'csrf_protection' => true,
    'xss_protection' => true,
    'password_min_length' => 8,
    'max_login_attempts' => 5,
    'lockout_time' => 900 // 15 minutes
];

// File upload settings
$upload = [
    'max_size' => 10485760, // 10MB
    'allowed_types' => ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
    'upload_path' => 'uploads/'
];

/**
 * Database connection function
 */
function getDbConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * Get active modules
 */
function getActiveModules() {
    global $modules;
    $activeModules = [];
    foreach ($modules as $key => $module) {
        if ($module['enabled']) {
            $module['id'] = $key;
            $activeModules[] = $module;
        }
    }
    return $activeModules;
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && $_SESSION['user_id'] > 0;
}

/**
 * Get current user data
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    return $_SESSION['user_data'] ?? null;
}

/**
 * Generate CSRF token
 */
function generateCsrfToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Sanitize input
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Redirect to URL
 */
function redirect($url) {
    header("Location: " . $url);
    exit;
}

/**
 * JSON response
 */
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set security headers
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');

?>

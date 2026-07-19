<?php
/**
 * Konfigurasi Utama - ArsipVersi.Digital
 * Sistem Manajemen Konten Digital Terintegrasi
 */

// Definisi konstanta dasar
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_PATH', dirname(__DIR__));
define('SYSTEM_PATH', ROOT_PATH . DS . 'system');
define('CONFIG_PATH', SYSTEM_PATH . DS . 'config');
define('INCLUDES_PATH', SYSTEM_PATH . DS . 'includes');
define('ASSETS_PATH', SYSTEM_PATH . DS . 'assets');
define('API_PATH', SYSTEM_PATH . DS . 'api');
define('PAGES_PATH', SYSTEM_PATH . DS . 'pages');
define('MODULES_PATH', SYSTEM_PATH . DS . 'modules');

// Konfigurasi Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'arsipversi_digital');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Konfigurasi Aplikasi
define('APP_NAME', 'ArsipVersi.Digital');
define('APP_VERSION', '1.0.0');
define('APP_URL', 'http://localhost/arsipversi.digital');
define('APP_LANG', 'id');
define('APP_TIMEZONE', 'Asia/Jakarta');

// Konfigurasi Keamanan
define('HASH_COST', 10);
define('SESSION_LIFETIME', 3600);
define('CSRF_TOKEN_NAME', 'csrf_token');
define('SECURE_COOKIES', false);

// Konfigurasi Upload
define('UPLOAD_MAX_SIZE', 10485760); // 10MB
define('UPLOAD_ALLOWED_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xlsx', 'zip']);
define('UPLOAD_PATH', ROOT_PATH . DS . 'uploads');

// Konfigurasi Tampilan
define('THEME_DEFAULT', 'digital-white-blue');
define('ITEMS_PER_PAGE', 20);
define('DATE_FORMAT', 'd/m/Y');
define('DATETIME_FORMAT', 'd/m/Y H:i:s');

// Error Reporting (Production: 0, Development: E_ALL)
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Timezone
date_default_timezone_set(APP_TIMEZONE);

// Session Configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    session_start();
}

// Autoloader
spl_autoload_register(function ($class) {
    $paths = [
        SYSTEM_PATH . DS . 'includes',
        SYSTEM_PATH . DS . 'modules'
    ];
    
    foreach ($paths as $path) {
        $file = $path . DS . str_replace('\\', DS, $class) . '.php';
        if (file_exists($file)) {
            require_once $file;
            return true;
        }
    }
    return false;
});

// Helper function untuk konfigurasi
function config($key = null, $default = null) {
    static $config = [];
    
    if (empty($config)) {
        $configFiles = glob(CONFIG_PATH . DS . '*.php');
        foreach ($configFiles as $file) {
            $cfg = include $file;
            if (is_array($cfg)) {
                $config = array_merge($config, $cfg);
            }
        }
    }
    
    if ($key === null) {
        return $config;
    }
    
    return isset($config[$key]) ? $config[$key] : $default;
}

return [
    'app' => [
        'name' => APP_NAME,
        'version' => APP_VERSION,
        'url' => APP_URL,
        'lang' => APP_LANG,
        'timezone' => APP_TIMEZONE
    ],
    'database' => [
        'host' => DB_HOST,
        'name' => DB_NAME,
        'user' => DB_USER,
        'pass' => DB_PASS,
        'charset' => DB_CHARSET
    ],
    'security' => [
        'hash_cost' => HASH_COST,
        'session_lifetime' => SESSION_LIFETIME,
        'csrf_token_name' => CSRF_TOKEN_NAME,
        'secure_cookies' => SECURE_COOKIES
    ],
    'upload' => [
        'max_size' => UPLOAD_MAX_SIZE,
        'allowed_types' => UPLOAD_ALLOWED_TYPES,
        'path' => UPLOAD_PATH
    ],
    'theme' => [
        'default' => THEME_DEFAULT,
        'items_per_page' => ITEMS_PER_PAGE,
        'date_format' => DATE_FORMAT,
        'datetime_format' => DATETIME_FORMAT
    ]
];

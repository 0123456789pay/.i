<?php
/**
 * Konfigurasi Database untuk amd
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'amd_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Konfigurasi aplikasi
define('APP_NAME', 'amd');
define('APP_VERSION', '1.0.0');
define('APP_DEBUG', true);

// Timezone
date_default_timezone_set('Asia/Jakarta');

// Error reporting
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

return [
    'database' => [
        'host' => DB_HOST,
        'name' => DB_NAME,
        'user' => DB_USER,
        'pass' => DB_PASS,
        'charset' => DB_CHARSET
    ],
    'app' => [
        'name' => APP_NAME,
        'version' => APP_VERSION,
        'debug' => APP_DEBUG
    ]
];

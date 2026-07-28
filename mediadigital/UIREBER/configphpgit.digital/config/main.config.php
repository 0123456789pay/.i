<?php
/**
 * Config Utama - Sistem Tampilan PHP Secure
 * Menggunakan regex dan formula untuk aktivasi sistem
 * INTERNAL ONLY - No External CDNs
 */

// Konfigurasi keamanan browser
define('SECURE_MODE', true);
define('ALLOW_GITHUB_CDN', false);  // Disabled - Internal CSS/JS only
define('XSS_PROTECTION', true);
define('CSP_ENABLED', true);

// Regex pattern untuk validasi input
$config_patterns = [
    'secure_token' => '/^[a-f0-9]{64}$/i',
    'file_extension' => '/\.(php|html|css|js|json)$/i',
    'db_connection' => '/^(mysql|pgsql|sqlite):\/\/[a-zA-Z0-9_:@.\/-]+$/'
];

// Formula aktivasi sistem tampilan (Internal Only)
$system_formula = [
    'activate_css' => 'SECURE_MODE && !ALLOW_GITHUB_CDN',
    'activate_js' => 'SECURE_MODE && XSS_PROTECTION',
    'activate_db' => 'SECURE_MODE && defined("DB_CREDENTIALS")',
    'render_content' => 'CSP_ENABLED && !headers_sent()'
];
    // Header keamanan untuk browser
$security_headers = [
    'X-Frame-Options' => 'DENY',
    'X-Content-Type-Options' => 'nosniff',
    'X-XSS-Protection' => '1; mode=block',
    'Referrer-Policy' => 'strict-origin-when-cross-origin',
    'Permissions-Policy' => 'geolocation=(), microphone=(), camera=()'
];

return [
    'patterns' => $config_patterns,
    'formulas' => $system_formula,
    'internal_only' => true,
    'external_cdns_disabled' => true,
    'headers' => $security_headers
];

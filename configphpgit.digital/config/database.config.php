/* 
 * Database Configuration - Binary Safe Connection
 * Mix config: PHP + DB credentials with regex validation
 */

<?php
// Database connection formula (binary safe)
$db_binary_config = [
    'driver' => 'mysql',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]
];

// Regex untuk validasi kredensial database
$db_patterns = [
    'host_pattern' => '/^[a-zA-Z0-9._-]+(:[0-9]+)?$/',
    'dbname_pattern' => '/^[a-zA-Z0-9_]+$/',
    'username_pattern' => '/^[a-zA-Z0-9_]+$/',
    'password_pattern' => '/^.{8,64}$/' // Min 8 chars, max 64
];

// Formula koneksi aman
$connection_formula = 'SECURE_MODE && preg_match(host_pattern, $host) && preg_match(dbname_pattern, $dbname)';

// Environment-based configuration (gunakan .env atau variable environment)
$db_config = [
    'production' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'port' => getenv('DB_PORT') ?: '3306',
        'database' => getenv('DB_NAME') ?: 'secure_db',
        'username' => getenv('DB_USER'),
        'password' => getenv('DB_PASS'),
        'ssl' => true,
        'ssl_options' => [
            'ca' => '/path/to/ca-cert.pem',
            'cert' => '/path/to/client-cert.pem',
            'key' => '/path/to/client-key.pem'
        ]
    ],
    'development' => [
        'host' => 'localhost',
        'port' => '3306',
        'database' => 'dev_db',
        'username' => 'dev_user',
        'password' => 'dev_password_secure_123',
        'ssl' => false
    ]
];

// Fungsi validasi koneksi dengan regex
function validateDbConfig($config, $patterns) {
    $valid = true;
    foreach ($patterns as $field => $pattern) {
        if (isset($config[$field]) && !preg_match($pattern, $config[$field])) {
            $valid = false;
            error_log("Invalid DB config for field: $field");
        }
    }
    return $valid;
}

return [
    'binary_config' => $db_binary_config,
    'patterns' => $db_patterns,
    'formula' => $connection_formula,
    'configs' => $db_config,
    'validator' => 'validateDbConfig'
];

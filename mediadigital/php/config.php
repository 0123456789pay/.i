<?php
// Konfigurasi Database Media Digital
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'media_digital');

// Konfigurasi Aplikasi
define('APP_NAME', 'Media Digital');
define('APP_VERSION', '1.0.0');
define('APP_LANG', 'id');

// Koneksi Database
function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }
    return $conn;
}
?>

<?php
/**
 * Konfigurasi Database newsnia.digital
 * TERHUBUNG KE manajemenfile.digital - Centralized Database
 * Aksen: Putih Biru seperti media.digital
 */

// Connect to centralized manajemenfile.digital database
require_once __DIR__ . '/../../manajemenfile.digital/config/database.php';

// Legacy compatibility - use centralized database
define('DB_HOST', 'localhost');
define('DB_NAME', 'manajemenfile_digital');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

try {
    $database = new Database();
    $pdo = $database->getConnection();
} catch (PDOException $e) {
    die("Koneksi database gagal: " . $e->getMessage());
}
?>

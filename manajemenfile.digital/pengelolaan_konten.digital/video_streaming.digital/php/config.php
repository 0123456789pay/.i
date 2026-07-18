<?php
// Konfigurasi modul digital
define('DB_HOST', 'localhost');
define('DB_NAME', 'digital_db');
define('DB_USER', 'root');
define('DB_PASS', '');

class DigitalModule {
    public function __construct() {
        // Inisialisasi modul
    }
    
    public function getData() {
        return ['status' => 'success', 'message' => 'Data berhasil diambil'];
    }
}
?>

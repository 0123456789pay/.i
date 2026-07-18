#!/bin/bash

# Fungsi untuk membuat struktur folder lengkap dengan html, css, js, php, db
create_full_structure() {
    local base_path="$1"
    
    # Buat folder dasar
    mkdir -p "$base_path/html"
    mkdir -p "$base_path/css"
    mkdir -p "$base_path/js"
    mkdir -p "$base_path/php"
    mkdir -p "$base_path/db"
    
    # Buat file index.html
    cat > "$base_path/html/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modul Digital</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="container">
        <h1>Modul Digital</h1>
        <p>Sistem manajemen konten digital terpadu</p>
    </div>
    <script src="../js/app.js"></script>
</body>
</html>
EOF

    # Buat file CSS
    cat > "$base_path/css/style.css" << 'EOF'
/* Style dasar untuk modul digital */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; color: #333; }
.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
h1 { color: #667eea; margin-bottom: 1rem; }
.card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin: 1rem 0; }
.btn { background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn:hover { background: #764ba2; }
EOF

    # Buat file JS
    cat > "$base_path/js/app.js" << 'EOF'
// Aplikasi JavaScript untuk modul digital
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modul Digital siap digunakan');
});

function initModule() {
    console.log('Inisialisasi modul...');
}

initModule();
EOF

    # Buat file PHP
    cat > "$base_path/php/config.php" << 'EOF'
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
EOF

    # Buat file SQL
    cat > "$base_path/db/schema.sql" << 'EOF'
-- Skema database untuk modul digital
CREATE TABLE IF NOT EXISTS digital_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_title ON digital_content(title);
EOF
}

# Daftar 5 Menu Utama dengan sub-menu dalam Bahasa Indonesia
# Menu 1: Dasbor (Dashboard)
declare -a DASHBOARD_SUBMENUS=(
    "ringkasan"
    "statistik_realtime"
    "notifikasi"
    "aktivitas_terkini"
    "peta_pengguna"
    "laporan_harian"
    "kalender_event"
    "target_kinerja"
    "monitoring_sistem"
    "analisis_kinerja"
)

# Menu 2: Pengelolaan Konten
declare -a KONTEN_SUBMENUS=(
    "artikel_blog"
    "galeri_foto"
    "video_streaming"
    "dokumen_pdf"
    "manajemen_kategori"
    "tagar_trending"
    "komentar_ulasan"
    "jadwal_publikasi"
    "arsip_konten"
    "media_pustaka"
    "editor_rich_text"
    "upload_massal"
)

# Menu 3: Analitik dan Laporan
declare -a ANALITIK_SUBMENUS=(
    "lalu_lintas_web"
    "perilaku_pengguna"
    "konversi_penjualan"
    "seo_performance"
    "laporan_keuangan"
    "retensi_pelanggan"
    "heatmap_klik"
    "eksport_data"
    "prediksi_ai"
    "dashboard_executive"
)

# Menu 4: Pengaturan Sistem
declare -a PENGATURAN_SUBMENUS=(
    "umum"
    "keamanan"
    "pengguna_hak_akses"
    "backup_data"
    "integrasi_api"
    "email_smtp"
    "penyimpanan_cloud"
    "log_sistem"
    "pembaruan_otomatis"
    "manajemen_database"
    "konfigurasi_server"
)

# Menu 5: Bantuan dan Dukungan
declare -a BANTUAN_SUBMENUS=(
    "faq_pertanyaan"
    "panduan_pengguna"
    "tiket_support"
    "chat_langsung"
    "forum_komunitas"
    "video_tutorial"
    "kontak_admin"
    "status_server"
    "lapor_bug"
    "pusat_download"
)

echo "Membuat struktur folder .digital..."

# Buat folder utama untuk setiap menu
mkdir -p "/workspace/dasbor.digital"
mkdir -p "/workspace/pengelolaan_konten.digital"
mkdir -p "/workspace/analitik_laporan.digital"
mkdir -p "/workspace/pengaturan_sistem.digital"
mkdir -p "/workspace/bantuan_dukungan.digital"

# Fungsi untuk membuat sub-menu dengan struktur lengkap
create_submenu() {
    local parent="$1"
    local submenu="$2"
    local full_path="${parent}/${submenu}.digital"
    
    mkdir -p "$full_path"
    create_full_structure "$full_path"
}

# Buat semua sub-menu untuk Dasbor
for submenu in "${DASHBOARD_SUBMENUS[@]}"; do
    create_submenu "/workspace/dasbor.digital" "$submenu"
done

# Buat semua sub-menu untuk Pengelolaan Konten
for submenu in "${KONTEN_SUBMENUS[@]}"; do
    create_submenu "/workspace/pengelolaan_konten.digital" "$submenu"
done

# Buat semua sub-menu untuk Analitik
for submenu in "${ANALITIK_SUBMENUS[@]}"; do
    create_submenu "/workspace/analitik_laporan.digital" "$submenu"
done

# Buat semua sub-menu untuk Pengaturan
for submenu in "${PENGATURAN_SUBMENUS[@]}"; do
    create_submenu "/workspace/pengaturan_sistem.digital" "$submenu"
done

# Buat semua sub-menu untuk Bantuan
for submenu in "${BANTUAN_SUBMENUS[@]}"; do
    create_submenu "/workspace/bantuan_dukungan.digital" "$submenu"
done

echo "Struktur folder .digital selesai dibuat!"

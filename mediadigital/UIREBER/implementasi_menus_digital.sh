#!/bin/bash

# Daftar 5 Menu Utama dan Sub-menu dalam Bahasa Indonesia
declare -A MENUS
MENUS["Dashboard"]="dashboard|statistik|laporan|notifikasi|widget|grafik|ringkasan|monitoring"
MENUS["Pengaturan"]="pengaturan|profil|keamanan|privasi|akun|preferensi|tema|bahasa|backup|restore"
MENUS["Konten"]="konten|artikel|galeri|media|dokumen|arsip|kategori|tag|komentar|moderasi"
MENUS["Analitik"]="analitik|metrik|kinerja|tren|prediksi|eksperimen|segmentasi|konversi|retensi"
MENUS["Bantuan"]="bantuan|faq|panduan|tutorial|kontak|dukungan|feedback|pelaporan|komunitas"

# Fungsi untuk membuat struktur direktori bertingkat
buat_struktur() {
    local base_dir="$1"
    local menu_name="$2"
    local sub_menu="$3"
    
    # Buat direktori utama .digital
    mkdir -p "${base_dir}"
    
    # Buat berkas .digital di akar
    echo "MENU_UTAMA=${menu_name}" > "${base_dir}/config.digital"
    echo "SUB_MENU=${sub_menu}" >> "${base_dir}/config.digital"
    echo "BAHASA=id" >> "${base_dir}/config.digital"
    echo "STATUS=aktif" >> "${base_dir}/config.digital"
    
    # Struktur bertingkat html/css/js/php/db
    mkdir -p "${base_dir}/html"
    mkdir -p "${base_dir}/css"
    mkdir -p "${base_dir}/js"
    mkdir -p "${base_dir}/php"
    mkdir -p "${base_dir}/db"
    
    # berkas HTML
    cat > "${base_dir}/html/index.html" << EOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${menu_name} - ${sub_menu}</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <nav class="navbar">
        <div class="brand">${menu_name}</div>
        <ul class="menu">
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Fitur</a></li>
            <li><a href="#">Pengaturan</a></li>
        </ul>
    </nav>
    <main class="content">
        <h1>${sub_menu}</h1>
        <p>Selamat datang di modul ${sub_menu} pada menu ${menu_name}</p>
    </main>
    <script src="../js/app.js"></script>
</body>
</html>
EOF
    
    # berkas CSS
    cat > "${base_dir}/css/style.css" << EOF
/* Style untuk ${menu_name} - ${sub_menu} */
:root {
    --primary-color: #4f46e5;
    --secondary-color: #7c3aed;
    --bg-gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f3f4f6;
    color: #1f2937;
}

.navbar {
    background: var(--bg-gradient);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.menu {
    display: flex;
    list-style: none;
    gap: 1.5rem;
}

.menu a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.menu a:hover {
    opacity: 0.8;
}

.content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}
EOF
    
    # berkas skrip-skrip-javascript
    cat > "${base_dir}/js/app.js" << EOF
// Aplikasi ${menu_name} - ${sub_menu}
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modul ${sub_menu} dimuat');
    
    // Inisialisasi komponen
    initNavigation();
    initDataBinding();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigasi ke:', this.textContent);
        });
    });
}

function initDataBinding() {
    // Binding data untuk ${sub_menu}
    const data = {
        menu: '${menu_name}',
        submenu: '${sub_menu}',
        bahasa: 'id',
        timestamp: new Date().toISOString()
    };
    console.log('Data binding:', data);
}
EOF
    
    # berkas PHP
    cat > "${base_dir}/php/index.php" << EOF
<?php
/**
 * Backend untuk ${menu_name} - ${sub_menu}
 * Bahasa: Indonesia
 */

header('Content-Type: application/json; charset=utf-8');

\$config = [
    'menu_utama' => '${menu_name}',
    'sub_menu' => '${sub_menu}',
    'bahasa' => 'id',
    'status' => 'aktif',
    'versi' => '1.0.0'
];

\$response = [
    'success' => true,
    'data' => \$config,
    'message' => 'Data ${sub_menu} berhasil dimuat',
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode(\$response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
EOF
    
    # berkas basis-data Schema
    cat > "${base_dir}/db/schema.sql" << EOF
-- Schema database untuk ${menu_name} - ${sub_menu}
-- Bahasa: Indonesia

CREATE DATABASE IF NOT EXISTS media_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE media_digital;

-- Tabel utama untuk ${sub_menu}
CREATE TABLE IF NOT EXISTS ${sub_menu}_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    konten TEXT,
    kategori VARCHAR(100),
    status ENUM('aktif', 'nonaktif', 'arsip') DEFAULT 'aktif',
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_kategori (kategori),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel metadata
CREATE TABLE IF NOT EXISTS metadata_${sub_menu} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kunci VARCHAR(100) NOT NULL,
    nilai TEXT,
    tipe_data VARCHAR(50),
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data awal
INSERT INTO ${sub_menu}_data (judul, konten, kategori, status) VALUES
('Contoh Data 1', 'Konten contoh untuk ${sub_menu}', 'umum', 'aktif'),
('Contoh Data 2', 'Konten contoh tambahan', 'khusus', 'aktif');
EOF
    
    # berkas README
    cat > "${base_dir}/README.digital" << EOF
# ${menu_name} - ${sub_menu}

# Deskripsi
Modul ${sub_menu} merupakan bagian dari menu ${menu_name} dalam sistem Media Digital.

# Struktur direktori
- \`html/\` - File antarmuka pengguna
- \`css/\` - File styling
- \`js/\` - File JavaScript
- \`php/\` - File backend
- \`db/\` - Schema database

# Fitur
- Antarmuka Bahasa Indonesia
- Responsive design
- API endpoint terintegrasi
- Database schema lengkap

# Versi
1.0.0

# Status
Aktif
EOF
}

# Counter untuk tracking
total_dirs=0
total_files=0

echo "=== Mulai Implementasi Sistem Media Digital ==="
echo "Bahasa: Indonesia"
echo ""

# Proses setiap menu utama
for menu in "${!MENUS[@]}"; do
    echo "Memproses Menu: $menu"
    IFS='|' read -ra SUBMENUS <<< "${MENUS[$menu]}"
    
    for submenu in "${SUBMENUS[@]}"; do
        # Buat beberapa variasi direktori .digital untuk setiap sub-menu
        for i in {1..5}; do
            base_path="./${menu}_${submenu}_v${i}.digital"
            buat_struktur "$base_path" "$menu" "$submenu"
            ((total_dirs++))
            total_files=$((total_files + 7)) # 7 berkas-berkas per direktori
        done
    done
done

echo ""
echo "=== Implementasi Selesai ==="
echo "Total direktori .digital dibuat: $total_dirs"
echo "Total file dibuat: $total_files"

#!/usr/bin/env python3
# Script untuk mengupdate index.html mediadigital dengan menu baru dalam Bahasa Indonesia

menu_data = {
    'dasbor': {
        'title': '📊 Dasbor Utama',
        'badge': '10 Sub-modul',
        'desc': 'Ringkasan statistik, notifikasi realtime, monitoring sistem, dan analisis kinerja.',
        'submenus': [
            {'name': 'Ringkasan', 'icon': '📄', 'path': 'ringkasan.digital/html/index.html'},
            {'name': 'Statistik Realtime', 'icon': '⚡', 'path': 'statistik_realtime.digital/html/index.html'},
            {'name': 'Notifikasi', 'icon': '🔔', 'path': 'notifikasi.digital/html/index.html'},
            {'name': 'Aktivitas Terkini', 'icon': '📝', 'path': 'aktivitas_terkini.digital/html/index.html'},
            {'name': 'Peta Pengguna', 'icon': '🗺️', 'path': 'peta_pengguna.digital/html/index.html'},
            {'name': 'Laporan Harian', 'icon': '📋', 'path': 'laporan_harian.digital/html/index.html'},
            {'name': 'Kalender Event', 'icon': '📅', 'path': 'kalender_event.digital/html/index.html'},
            {'name': 'Target Kinerja', 'icon': '🎯', 'path': 'target_kinerja.digital/html/index.html'},
            {'name': 'Monitoring Sistem', 'icon': '🖥️', 'path': 'monitoring_sistem.digital/html/index.html'},
            {'name': 'Analisis Kinerja', 'icon': '📈', 'path': 'analisis_kinerja.digital/html/index.html'},
        ]
    },
    'pengelolaan_konten': {
        'title': '📝 Pengelolaan Konten',
        'badge': '12 Sub-modul',
        'desc': 'Artikel, galeri, video, dokumen, dan manajemen media pustaka lengkap.',
        'submenus': [
            {'name': 'Artikel Blog', 'icon': '✍️', 'path': 'artikel_blog.digital/html/index.html'},
            {'name': 'Galeri Foto', 'icon': '🖼️', 'path': 'galeri_foto.digital/html/index.html'},
            {'name': 'Video Streaming', 'icon': '🎬', 'path': 'video_streaming.digital/html/index.html'},
            {'name': 'Dokumen PDF', 'icon': '📕', 'path': 'dokumen_pdf.digital/html/index.html'},
            {'name': 'Manajemen Kategori', 'icon': '🏷️', 'path': 'manajemen_kategori.digital/html/index.html'},
            {'name': 'Tagar Trending', 'icon': '#️⃣', 'path': 'tagar_trending.digital/html/index.html'},
            {'name': 'Komentar Ulasan', 'icon': '💬', 'path': 'komentar_ulasan.digital/html/index.html'},
            {'name': 'Jadwal Publikasi', 'icon': '📆', 'path': 'jadwal_publikasi.digital/html/index.html'},
            {'name': 'Arsip Konten', 'icon': '🗂️', 'path': 'arsip_konten.digital/html/index.html'},
            {'name': 'Media Pustaka', 'icon': '📚', 'path': 'media_pustaka.digital/html/index.html'},
            {'name': 'Editor Rich Text', 'icon': '📝', 'path': 'editor_rich_text.digital/html/index.html'},
            {'name': 'Upload Massal', 'icon': '⬆️', 'path': 'upload_massal.digital/html/index.html'},
        ]
    },
    'analitik_laporan': {
        'title': '📈 Analitik & Laporan',
        'badge': '10 Sub-modul',
        'desc': 'Lalu lintas web, perilaku pengguna, konversi, SEO, dan laporan keuangan.',
        'submenus': [
            {'name': 'Lalu Lintas Web', 'icon': '🌐', 'path': 'lalu_lintas_web.digital/html/index.html'},
            {'name': 'Perilaku Pengguna', 'icon': '👤', 'path': 'perilaku_pengguna.digital/html/index.html'},
            {'name': 'Konversi Penjualan', 'icon': '💰', 'path': 'konversi_penjualan.digital/html/index.html'},
            {'name': 'SEO Performance', 'icon': '🔍', 'path': 'seo_performance.digital/html/index.html'},
            {'name': 'Laporan Keuangan', 'icon': '💵', 'path': 'laporan_keuangan.digital/html/index.html'},
            {'name': 'Retensi Pelanggan', 'icon': '🔄', 'path': 'retensi_pelanggan.digital/html/index.html'},
            {'name': 'Heatmap Klik', 'icon': '🔥', 'path': 'heatmap_klik.digital/html/index.html'},
            {'name': 'Eksport Data', 'icon': '📤', 'path': 'eksport_data.digital/html/index.html'},
            {'name': 'Prediksi AI', 'icon': '🤖', 'path': 'prediksi_ai.digital/html/index.html'},
            {'name': 'Dashboard Executive', 'icon': '📊', 'path': 'dashboard_executive.digital/html/index.html'},
        ]
    },
    'pengaturan_sistem': {
        'title': '⚙️ Pengaturan Sistem',
        'badge': '11 Sub-modul',
        'desc': 'Keamanan, pengguna, backup, integrasi API, dan konfigurasi server.',
        'submenus': [
            {'name': 'Umum', 'icon': '🔧', 'path': 'umum.digital/html/index.html'},
            {'name': 'Keamanan', 'icon': '🔒', 'path': 'keamanan.digital/html/index.html'},
            {'name': 'Pengguna & Hak Akses', 'icon': '👥', 'path': 'pengguna_hak_akses.digital/html/index.html'},
            {'name': 'Backup Data', 'icon': '💾', 'path': 'backup_data.digital/html/index.html'},
            {'name': 'Integrasi API', 'icon': '🔌', 'path': 'integrasi_api.digital/html/index.html'},
            {'name': 'Email SMTP', 'icon': '📧', 'path': 'email_smtp.digital/html/index.html'},
            {'name': 'Penyimpanan Cloud', 'icon': '☁️', 'path': 'penyimpanan_cloud.digital/html/index.html'},
            {'name': 'Log Sistem', 'icon': '📜', 'path': 'log_sistem.digital/html/index.html'},
            {'name': 'Pembaruan Otomatis', 'icon': '🔄', 'path': 'pembaruan_otomatis.digital/html/index.html'},
            {'name': 'Manajemen Database', 'icon': '🗄️', 'path': 'manajemen_database.digital/html/index.html'},
            {'name': 'Konfigurasi Server', 'icon': '🖥️', 'path': 'konfigurasi_server.digital/html/index.html'},
        ]
    },
    'bantuan_dukungan': {
        'title': '❓ Bantuan & Dukungan',
        'badge': '10 Sub-modul',
        'desc': 'FAQ, tiket support, chat langsung, forum, dan pusat download.',
        'submenus': [
            {'name': 'FAQ Pertanyaan', 'icon': '❓', 'path': 'faq_pertanyaan.digital/html/index.html'},
            {'name': 'Panduan Pengguna', 'icon': '📘', 'path': 'panduan_pengguna.digital/html/index.html'},
            {'name': 'Tiket Support', 'icon': '🎫', 'path': 'tiket_support.digital/html/index.html'},
            {'name': 'Chat Langsung', 'icon': '💬', 'path': 'chat_langsung.digital/html/index.html'},
            {'name': 'Forum Komunitas', 'icon': '👥', 'path': 'forum_komunitas.digital/html/index.html'},
            {'name': 'Video Tutorial', 'icon': '🎥', 'path': 'video_tutorial.digital/html/index.html'},
            {'name': 'Kontak Admin', 'icon': '📞', 'path': 'kontak_admin.digital/html/index.html'},
            {'name': 'Status Server', 'icon': '🖥️', 'path': 'status_server.digital/html/index.html'},
            {'name': 'Lapor Bug', 'icon': '🐛', 'path': 'lapor_bug.digital/html/index.html'},
            {'name': 'Pusat Download', 'icon': '⬇️', 'path': 'pusat_download.digital/html/index.html'},
        ]
    },
}

html_header = '''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Media Digital Terpadu</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
        header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center; }
        nav { display: flex; justify-content: center; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex-wrap: wrap; position: sticky; top: 0; z-index: 1000; }
        nav a { padding: 1rem 2rem; text-decoration: none; color: #333; font-weight: bold; transition: 0.3s; }
        nav a:hover { background: #eee; color: #764ba2; }
        .container { max-width: 1400px; margin: 2rem auto; padding: 0 1rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .card h3 { color: #764ba2; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
        .badge { background: #e0e7ff; color: #4f46e5; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
        .card ul { list-style: none; padding: 0; }
        .card ul li { margin: 0.5rem 0; }
        .card ul li a { color: #007bff; text-decoration: none; font-size: 0.9rem; display: block; padding: 0.3rem 0; }
        .card ul li a:hover { text-decoration: underline; color: #764ba2; }
        footer { text-align: center; padding: 2rem; color: #666; font-size: 0.9rem; margin-top: 2rem; }
        .stats { background: white; padding: 1.5rem; border-radius: 8px; margin-top: 2rem; }
        .submenu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
    </style>
</head>
<body>
    <header>
        <h1>🚀 Sistem Media Digital</h1>
        <p>Platform Terintegrasi dengan Struktur Folder .digital</p>
    </header>
    <nav>
        <a href="#dasbor">Dasbor</a>
        <a href="#pengelolaan_konten">Konten</a>
        <a href="#analitik_laporan">Analitik</a>
        <a href="#pengaturan_sistem">Pengaturan</a>
        <a href="#bantuan_dukungan">Bantuan</a>
    </nav>
    <div class="container">
        <div class="stats">
            <h3>📊 Statistik Sistem</h3>
            <p><strong>Total Menu Utama:</strong> 5 | <strong>Total Sub-menu:</strong> 53 | <strong>Struktur File:</strong> html, css, js, php, db</p>
            <p><strong>Bahasa:</strong> Indonesia | <strong>Ekstensi Folder:</strong> .digital</p>
            <p><strong>Total Folder .digital:</strong> 575+ folder dengan struktur bertingkat lengkap</p>
        </div>
        <div class="grid">'''

html_footer = '''
        </div>
    </div>
    <footer>
        &copy; 2024 Media Digital System. Dibangun dengan teknologi stack lengkap (HTML/CSS/JS/PHP/DB).
        <br>Seluruh menu dan tampilan menggunakan Bahasa Indonesia.
    </footer>
</body>
</html>'''

html_content = html_header

for key, menu in menu_data.items():
    html_content += f'''
            <div class="card" id="{key}">
                <h3>{menu['title']}</h3>
                <span class="badge">{menu['badge']}</span>
                <p>{menu['desc']}</p>
                <div class="submenu-grid">
                    <ul>'''
    
    half = (len(menu['submenus']) + 1) // 2
    for i, submenu in enumerate(menu['submenus']):
        if i == half:
            html_content += '</ul></div><div class="submenu-grid"><ul>'
        html_content += f'<li><a href="{key}.digital/{submenu["path"]}">{submenu["icon"]} {submenu["name"]}</a></li>'
    
    html_content += '''
                    </ul>
                </div>
            </div>'''

html_content += html_footer

with open('/workspace/mediadigital/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Index.html berhasil diupdate!")

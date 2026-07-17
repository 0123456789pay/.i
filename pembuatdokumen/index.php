<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Pembuat Dokumen</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .dashboard { display: flex; min-height: 100vh; }
        .sidebar { width: 280px; background: #2c3e50; color: white; padding: 20px; overflow-y: auto; }
        .sidebar h2 { margin-bottom: 20px; font-size: 1.5em; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .menu-section { margin-bottom: 25px; }
        .menu-section h3 { font-size: 0.9em; color: #bdc3c7; margin-bottom: 10px; text-transform: uppercase; }
        .menu-item { display: block; padding: 10px 15px; color: #ecf0f1; text-decoration: none; border-radius: 5px; margin-bottom: 5px; transition: all 0.3s; }
        .menu-item:hover { background: #3498db; transform: translateX(5px); }
        .main-content { flex: 1; padding: 30px; }
        .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
        .stat-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid #3498db; }
        .stat-card h3 { color: #7f8c8d; font-size: 0.9em; margin-bottom: 10px; }
        .stat-card .number { font-size: 2.5em; color: #2c3e50; font-weight: bold; }
        .quick-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 30px; }
        .action-btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; text-decoration: none; transition: transform 0.3s; }
        .action-btn:hover { transform: translateY(-5px); }
    </style>
</head>
<body>
    <div class="dashboard">
        <aside class="sidebar">
            <h2>📄 Pembuat Dokumen</h2>
            
            <div class="menu-section">
                <h3>Utama</h3>
                <a href="index.pTechHP" class="menu-item">🏠 Dashboard</a>
                <a href="filemanajer/index.pTechHP" class="menu-item">📁 File Manager</a>
                <a href="dokumen/list.pTechHP" class="menu-item">📋 Daftar Dokumen</a>
            </div>

            <div class="menu-section">
                <h3>Pembuatan Dokumen</h3>
                <a href="menu/dokumen_baru.pTechHP" class="menu-item">001 - Dokumen Baru</a>
                <a href="menu/buat_dokumen_kosong.pTechHP" class="menu-item">002 - Template Standar</a>
                <a href="menu/dokumen_dari_template.pTechHP" class="menu-item">003 - Template Formal</a>
                <a href="menu/impor_dokumen.pTechHP" class="menu-item">004 - Template Kreatif</a>
                <a href="menu/ekspor_dokumen.pTechHP" class="menu-item">005 - Editor HTML</a>
                <a href="menu/simpan_dokumen.pTechHP" class="menu-item">006 - Editor CSS</a>
                <a href="menu/simpan_sebagai.pTechHP" class="menu-item">007 - Editor JavaScript</a>
                <a href="menu/cetak_dokumen.pTechHP" class="menu-item">008 - Preview Dokumen</a>
                <a href="menu/pratinjau_cetak.pTechHP" class="menu-item">009 - Export PDF</a>
                <a href="menu/bagikan_dokumen.pTechHP" class="menu-item">010 - Export Word</a>
            </div>

            <div class="menu-section">
                <h3>Kategori Dokumen</h3>
                <a href="menu/dokumen_teks.pTechHP" class="menu-item">011 - Surat Resmi</a>
                <a href="menu/dokumen_spreadsheet.pTechHP" class="menu-item">012 - Laporan</a>
                <a href="menu/presentasi.pTechHP" class="menu-item">013 - Proposal</a>
                <a href="menu/formulir_online.pTechHP" class="menu-item">014 - Invoice</a>
                <a href="menu/surat_resmi.pTechHP" class="menu-item">015 - Kontrak</a>
                <a href="menu/laporan_keuangan.pTechHP" class="menu-item">016 - Memo</a>
                <a href="menu/proposal_proyek.pTechHP" class="menu-item">017 - Presentasi</a>
                <a href="menu/kontrak_perjanjian.pTechHP" class="menu-item">018 - Brosur</a>
                <a href="menu/invoice_faktur.pTechHP" class="menu-item">019 - Flyer</a>
                <a href="menu/resume_cv.pTechHP" class="menu-item">020 - Poster</a>
            </div>

            <div class="menu-section">
                <h3>Tools & Utilitas</h3>
                <a href="menu/cari_ganti.pTechHP" class="menu-item">021 - Spell Checker</a>
                <a href="menu/format_teks.pTechHP" class="menu-item">022 - Grammar Check</a>
                <a href="menu/atur_paragraf.pTechHP" class="menu-item">023 - Word Counter</a>
                <a href="menu/sisipkan_gambar.pTechHP" class="menu-item">024 - Format Converter</a>
                <a href="menu/sisipkan_tabel.pTechHP" class="menu-item">025 - Image Insert</a>
                <a href="menu/sisipkan_link.pTechHP" class="menu-item">026 - Table Editor</a>
                <a href="menu/buat_daftar_isi.pTechHP" class="menu-item">027 - Link Manager</a>
                <a href="menu/nomor_halaman.pTechHP" class="menu-item">028 - Bookmark</a>
                <a href="menu/header_footer.pTechHP" class="menu-item">029 - Search & Replace</a>
                <a href="menu/catatan_kaki.pTechHP" class="menu-item">030 - Version History</a>
            </div>

            <div class="menu-section">
                <h3>Template Lanjutan</h3>
                <a href="menu/template_surat.pTechHP" class="menu-item">031 - Resume/CV</a>
                <a href="menu/template_laporan.pTechHP" class="menu-item">032 - Cover Letter</a>
                <a href="menu/template_presentasi.pTechHP" class="menu-item">033 - Business Plan</a>
                <a href="menu/template_invoice.pTechHP" class="menu-item">034 - Meeting Notes</a>
                <a href="menu/template_formulir.pTechHP" class="menu-item">035 - Project Plan</a>
                <a href="menu/template_sertifikat.pTechHP" class="menu-item">036 - Technical Doc</a>
                <a href="menu/template_brosur.pTechHP" class="menu-item">037 - User Manual</a>
                <a href="menu/template_flyer.pTechHP" class="menu-item">038 - API Documentation</a>
                <a href="menu/template_poster.pTechHP" class="menu-item">039 - Release Notes</a>
                <a href="menu/template_kartu_nama.pTechHP" class="menu-item">040 - Change Log</a>
            </div>

            <div class="menu-section">
                <h3>Format Khusus</h3>
                <a href="menu/ekspor_pdf.pTechHP" class="menu-item">041 - HTML Document</a>
                <a href="menu/ekspor_word.pTechHP" class="menu-item">042 - Markdown</a>
                <a href="menu/ekspor_excel.pTechHP" class="menu-item">043 - LaTeX</a>
                <a href="menu/ekspor_html.pTechHP" class="menu-item">044 - JSON Data</a>
                <a href="menu/ekspor_txt.pTechHP" class="menu-item">045 - XML Document</a>
                <a href="menu/impor_pdf.pTechHP" class="menu-item">046 - CSV Export</a>
                <a href="menu/impor_word.pTechHP" class="menu-item">047 - Email Template</a>
                <a href="menu/impor_excel.pTechHP" class="menu-item">048 - Newsletter</a>
                <a href="menu/impor_html.pTechHP" class="menu-item">049 - Blog Post</a>
                <a href="menu/konversi_format.pTechHP" class="menu-item">050 - Social Media</a>
            </div>

            <div class="menu-section">
                <h3>Kelola Dokumen</h3>
                <a href="menu/kelola_file.pTechHP" class="menu-item">051 - Organize Files</a>
                <a href="menu/hapus_dokumen.pTechHP" class="menu-item">052 - Tag Manager</a>
                <a href="menu/duplikat_dokumen.pTechHP" class="menu-item">053 - Folder Structure</a>
                <a href="menu/pindah_dokumen.pTechHP" class="menu-item">054 - Batch Operations</a>
                <a href="menu/salin_dokumen.pTechHP" class="menu-item">055 - Archive Docs</a>
                <a href="menu/ganti_nama_file.pTechHP" class="menu-item">056 - Restore Backup</a>
                <a href="menu/arsip_dokumen.pTechHP" class="menu-item">057 - Sync Cloud</a>
                <a href="menu/restore_dokumen.pTechHP" class="menu-item">058 - Share Document</a>
                <a href="menu/riwayat_versi.pTechHP" class="menu-item">059 - Permission Set</a>
                <a href="menu/bandingkan_versi.pTechHP" class="menu-item">060 - Audit Trail</a>
            </div>

            <div class="menu-section">
                <h3>Collaboration</h3>
                <a href="menu/kolaborasi_realtime.pTechHP" class="menu-item">061 - Team Workspace</a>
                <a href="menu/komentar_dokumen.pTechHP" class="menu-item">062 - Comments</a>
                <a href="menu/saran_edit.pTechHP" class="menu-item">063 - Review Mode</a>
                <a href="menu/lacak_perubahan.pTechHP" class="menu-item">064 - Track Changes</a>
                <a href="menu/undang_kolaborator.pTechHP" class="menu-item">065 - Approval Workflow</a>
                <a href="menu/atur_hak_akses.pTechHP" class="menu-item">066 - Notifications</a>
                <a href="menu/chat_dokumentasi.pTechHP" class="menu-item">067 - Chat Integration</a>
                <a href="menu/notifikasi_dokumen.pTechHP" class="menu-item">068 - Video Call</a>
                <a href="menu/review_dokumen.pTechHP" class="menu-item">069 - Screen Share</a>
                <a href="menu/approve_dokumen.pTechHP" class="menu-item">070 - Task Assignment</a>
            </div>

            <div class="menu-section">
                <h3>Settings & Config</h3>
                <a href="menu/pengaturan_dokumen.pTechHP" class="menu-item">071 - General Settings</a>
                <a href="menu/preferensi_editor.pTechHP" class="menu-item">072 - Profile Setup</a>
                <a href="menu/atur_font.pTechHP" class="menu-item">073 - Security</a>
                <a href="menu/atur_warna.pTechHP" class="menu-item">074 - Privacy</a>
                <a href="menu/tema_gelap.pTechHP" class="menu-item">075 - Language</a>
                <a href="menu/bahasa_antarmuka.pTechHP" class="menu-item">076 - Theme Custom</a>
                <a href="menu/autosave_pengaturan.pTechHP" class="menu-item">077 - Keyboard Shortcuts</a>
                <a href="menu/backup_otomatis.pTechHP" class="menu-item">078 - Auto Save</a>
                <a href="menu/sinkronisasi_cloud.pTechHP" class="menu-item">079 - Backup Settings</a>
                <a href="menu/privasi_dokumen.pTechHP" class="menu-item">080 - API Keys</a>
            </div>

            <div class="menu-section">
                <h3>Analytics & Reports</h3>
                <a href="menu/statistik_dokumen.pTechHP" class="menu-item">081 - Usage Stats</a>
                <a href="menu/analisis_kata.pTechHP" class="menu-item">082 - Document Analytics</a>
                <a href="menu/hitung_halaman.pTechHP" class="menu-item">083 - Performance</a>
                <a href="menu/waktu_pembacaan.pTechHP" class="menu-item">084 - Activity Log</a>
                <a href="menu/riwayat_edit.pTechHP" class="menu-item">085 - Export Report</a>
                <a href="menu/laporan_aktivitas.pTechHP" class="menu-item">086 - Custom Reports</a>
                <a href="menu/grafik_produktivitas.pTechHP" class="menu-item">087 - Dashboard Widgets</a>
                <a href="menu/ekspor_log.pTechHP" class="menu-item">088 - Data Visualization</a>
                <a href="menu/audit_trail.pTechHP" class="menu-item">089 - Trend Analysis</a>
                <a href="menu/dashboard_analytics.pTechHP" class="menu-item">090 - Comparative Study</a>
            </div>

            <div class="menu-section">
                <h3>Help & Support</h3>
                <a href="menu/bantuan_panduan.pTechHP" class="menu-item">091 - Documentation</a>
                <a href="menu/tutorial_video.pTechHP" class="menu-item">092 - Tutorials</a>
                <a href="menu/faq_dokumen.pTechHP" class="menu-item">093 - FAQ</a>
                <a href="menu/kontak_support.pTechHP" class="menu-item">094 - Contact Support</a>
                <a href="menu/laporkan_bug.pTechHP" class="menu-item">095 - Community Forum</a>
                <a href="menu/minta_fitur.pTechHP" class="menu-item">096 - Feature Request</a>
                <a href="menu/update_aplikasi.pTechHP" class="menu-item">097 - Bug Report</a>
                <a href="menu/tentang_aplikasi.pTechHP" class="menu-item">098 - Changelog</a>
                <a href="menu/lisensi_software.pTechHP" class="menu-item">099 - About System</a>
                <a href="menu/keluar_aplikasi.pTechHP" class="menu-item">100 - License Info</a>
            </div>
        </aside>

        <main class="main-content">
            <div class="header">
                <h1>📊 Dashboard Pembuat Dokumen</h1>
                <p>Selamat datang di sistem pembuatan dokumen terpadu</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Dokumen</h3>
                    <div class="number" id="total-docs">0</div>
                </div>
                <div class="stat-card">
                    <h3>File Tersimpan</h3>
                    <div class="number" id="total-files">0</div>
                </div>
                <div class="stat-card">
                    <h3>Templates</h3>
                    <div class="number">100</div>
                </div>
                <div class="stat-card">
                    <h3>Menu Aktif</h3>
                    <div class="number">100</div>
                </div>
            </div>

            <div class="quick-actions">
                <a href="dokumen/baru.pTechHP" class="action-btn">📝 Buat Dokumen Baru</a>
                <a href="filemanajer/index.pTechHP" class="action-btn">📁 Buka File Manager</a>
                <a href="template/pilih.pTechHP" class="action-btn">🎨 Pilih Template</a>
                <a href="pengaturan/index.pTechHP" class="action-btn">⚙️ Pengaturan</a>
            </div>
        </main>
    </div>

    <script src="assets/js/dashboard.js"></script>
    <script>
        // Load stats from database
        fetch('api.pTechHP?action=list')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('total-files').textContent = data.data.length;
                }
            });
    </script>
</body>
</html>

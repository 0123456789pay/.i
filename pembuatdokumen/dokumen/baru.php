<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buat Dokumen Baru - Pembuat Dokumen</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { display: flex; min-height: 100vh; }
        .sidebar { width: 250px; background: #2c3e50; color: white; padding: 20px; }
        .sidebar a { color: white; text-decoration: none; display: block; padding: 10px; margin-bottom: 5px; border-radius: 5px; }
        .sidebar a:hover { background: #3498db; }
        .main-content { flex: 1; padding: 30px; }
        .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .form-card { background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #bdc3c7; border-radius: 5px; font-size: 14px; }
        .form-group textarea { height: 300px; font-family: monospace; }
        .btn { background: #3498db; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px; }
        .btn-success { background: #27ae60; }
        .btn-secondary { background: #95a5a6; }
    </style>
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <a href="../index.pTechHP">🏠 Dashboard</a>
            <a href="../filemanajer/index.pTechHP">📁 File Manager</a>
            <a href="list.pTechHP">📋 Daftar Dokumen</a>
            <hr style="border-color: #4a6278; margin: 15px 0;">
            <a href="../menu/menu_001.pTechHP">Menu 001</a>
            <a href="../menu/menu_002.pTechHP">Menu 002</a>
            <a href="../menu/menu_003.pTechHP">Menu 003</a>
        </nav>
        <main class="main-content">
            <div class="header">
                <h1>📝 Buat Dokumen Baru</h1>
                <p>Mulai membuat dokumen baru Anda</p>
            </div>
            
            <div class="form-card">
                <form id="docForm">
                    <div class="form-group">
                        <label for="judul">Judul Dokumen</label>
                        <input type="text" id="judul" name="judul" placeholder="Masukkan judul dokumen..." required>
                    </div>
                    
                    <div class="form-group">
                        <label for="kategori">Kategori</label>
                        <select id="kategori" name="kategori">
                            <option value="">Pilih Kategori</option>
                            <option value="umum">Dokumen Umum</option>
                            <option value="surat">Surat Resmi</option>
                            <option value="laporan">Laporan</option>
                            <option value="proposal">Proposal</option>
                            <option value="invoice">Invoice</option>
                            <option value="kontrak">Kontrak</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="template">Template (Opsional)</label>
                        <select id="template" name="template">
                            <option value="">Tanpa Template</option>
                            <option value="standar">Template Standar</option>
                            <option value="formal">Template Formal</option>
                            <option value="kreatif">Template Kreatif</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="konten">Konten Dokumen</label>
                        <textarea id="konten" name="konten" placeholder="Tulis konten dokumen Anda di sini..."></textarea>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <button type="submit" class="btn btn-success">💾 Simpan Dokumen</button>
                        <button type="button" class="btn">👁️ Preview</button>
                        <a href="list.pTechHP" class="btn btn-secondary">❌ Batal</a>
                    </div>
                </form>
            </div>
        </main>
    </div>
    
    <script>
        document.getElementById('docForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Dokumen berhasil disimpan! (Demo mode)');
            window.location.href = 'list.pTechHP';
        });
        
        // Auto-save functionality
        let timeout;
        document.getElementById('konten').addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                localStorage.setItem('draft_content', this.value);
                console.log('Auto-saved draft!');
            }, 2000);
        });
        
        // Load saved draft
        window.addEventListener('load', () => {
            const saved = localStorage.getItem('draft_content');
            if (saved) {
                document.getElementById('konten').value = saved;
                console.log('Draft loaded from local storage');
            }
        });
    </script>
</body>
</html>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notifikasi Dokumen - Pembuat Dokumen</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #ecf0f1; }
        .container { display: flex; min-height: 100vh; }
        .back-nav { width: 250px; background: #34495e; padding: 20px; }
        .back-nav a { color: white; text-decoration: none; display: block; padding: 10px; margin-bottom: 5px; border-radius: 5px; }
        .back-nav a:hover { background: #3498db; }
        .content { flex: 1; padding: 40px; }
        .card { background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .card h1 { color: #2c3e50; margin-bottom: 10px; }
        .card .category { color: #7f8c8d; margin-bottom: 30px; }
        .editor-area { width: 100%; height: 400px; border: 1px solid #bdc3c7; border-radius: 5px; padding: 15px; font-family: monospace; margin-bottom: 20px; }
        .btn { background: #3498db; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px; }
        .btn:hover { background: #2980b9; }
        .btn-success { background: #27ae60; }
        .btn-success:hover { background: #229954; }
        .info-box { background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <nav class="back-nav">
            <a href="../index.php">🏠 Dashboard</a>
            <a href="../filemanajer/index.php">📁 File Manager</a>
            <a href="../dokumen/list.php">📋 Daftar Dokumen</a>
            <hr style="border-color: #4a6278; margin: 15px 0;">
            <a href="menu_067.php">⬅ Menu Sebelumnya</a>
            <a href="menu_068.php">🔄 Refresh</a>
            <a href="menu_069.php">➡ Menu Selanjutnya</a>
        </nav>
        <main class="content">
            <div class="card">
                <h1>📄 Menu 068 - Video Call</h1>
                <p class="category">Kategori: Collaboration</p>
                
                <textarea class="editor-area" placeholder="Area kerja untuk Video Call..."></textarea>
                
                <button class="btn">💾 Simpan</button>
                <button class="btn btn-success">✅ Terapkan</button>
                <button class="btn">🗑️ Hapus</button>
                
                <div class="info-box">
                    <strong>ℹ️ Informasi:</strong><br>
                    Menu ini adalah bagian dari sistem Pembuat Dokumen. Fitur lengkap tersedia untuk menu 068 - Video Call.
                    Data akan disimpan di File Manager dan terindeks di database.
                </div>
            </div>
        </main>
    </div>
    <script>
        const editor = document.querySelector('.editor-area');
        let timeout;
        editor.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                localStorage.setItem('menu_68_content', editor.value);
                console.log('Auto-saved!');
            }, 1000);
        });
        
        window.addEventListener('load', () => {
            const saved = localStorage.getItem('menu_68_content');
            if (saved) editor.value = saved;
        });
    </script>
</body>
</html>
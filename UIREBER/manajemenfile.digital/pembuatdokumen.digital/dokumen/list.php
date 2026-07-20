<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Dokumen - Pembuat Dokumen</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { display: flex; min-height: 100vh; }
        .sidebar { width: 250px; background: #2c3e50; color: white; padding: 20px; }
        .sidebar a { color: white; text-decoration: none; display: block; padding: 10px; margin-bottom: 5px; border-radius: 5px; }
        .sidebar a:hover { background: #3498db; }
        .main-content { flex: 1; padding: 30px; }
        .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .doc-list { background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .doc-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #ecf0f1; }
        .doc-item:last-child { border-bottom: none; }
        .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-success { background: #27ae60; }
        .status-badge { padding: 5px 10px; border-radius: 15px; font-size: 0.8em; }
        .status-published { background: #d5f5e3; color: #27ae60; }
        .status-draft { background: #fdebd0; color: #e67e22; }
    </style>
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <a href="../index.php">🏠 Dashboard</a>
            <a href="../filemanajer/index.php">📁 File Manager</a>
            <a href="list.php">📋 Daftar Dokumen</a>
            <hr style="border-color: #4a6278; margin: 15px 0;">
            <a href="../menu/menu_001.php">⬅ Menu 001</a>
            <a href="baru.php">➕ Buat Baru</a>
        </nav>
        <main class="main-content">
            <div class="header">
                <h1>📋 Daftar Dokumen</h1>
                <p>Kelola semua dokumen yang telah dibuat</p>
            </div>
            
            <div class="doc-list">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Semua Dokumen</h3>
                    <a href="baru.php" class="btn btn-success">➕ Buat Dokumen Baru</a>
                </div>
                
                <div id="docs-container">
                    <div class="doc-item">
                        <div>
                            <strong>Dokumen Contoh 1</strong><br>
                            <small>Dibuat: 2025-01-15 | Terakhir diubah: 2025-01-15</small>
                        </div>
                        <div>
                            <span class="status-badge status-published">Published</span>
                            <a href="#" class="btn" style="margin-left: 10px;">✏️ Edit</a>
                        </div>
                    </div>
                    
                    <div class="doc-item">
                        <div>
                            <strong>Dokumen Contoh 2</strong><br>
                            <small>Dibuat: 2025-01-14 | Terakhir diubah: 2025-01-14</small>
                        </div>
                        <div>
                            <span class="status-badge status-draft">Draft</span>
                            <a href="#" class="btn" style="margin-left: 10px;">✏️ Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script>
        console.log('Daftar Dokumen loaded');
    </script>
</body>
</html>

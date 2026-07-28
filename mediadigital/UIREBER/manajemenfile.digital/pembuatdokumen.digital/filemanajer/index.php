<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Manager - Pembuat Dokumen</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { display: flex; min-height: 100vh; }
        .sidebar { width: 250px; background: #2c3e50; color: white; padding: 20px; }
        .sidebar a { color: white; text-decoration: none; display: block; padding: 10px; margin-bottom: 5px; border-radius: 5px; }
        .sidebar a:hover { background: #3498db; }
        .main-content { flex: 1; padding: 30px; }
        .header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .upload-area { border: 2px dashed #3498db; padding: 40px; text-align: center; border-radius: 10px; background: white; margin-bottom: 20px; }
        .file-list { background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .file-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #ecf0f1; }
        .file-item:last-child { border-bottom: none; }
        .btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        .btn-danger { background: #e74c3c; }
    </style>
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <a href="../index.php">🏠 Dashboard</a>
            <a href="index.php">📁 File Manager</a>
            <a href="../dokumen/list.php">📋 Daftar Dokumen</a>
            <hr style="border-color: #4a6278; margin: 15px 0;">
            <a href="../menu/menu_001.php">Menu 001</a>
            <a href="../menu/menu_050.php">Menu 050</a>
            <a href="../menu/menu_100.php">Menu 100</a>
        </nav>
        <main class="main-content">
            <div class="header">
                <h1>📁 File Manager</h1>
                <p>Kelola file dokumen Anda di sini</p>
            </div>
            
            <div class="upload-area">
                <h3>Upload File Baru</h3>
                <p>Drag & drop file atau klik untuk upload</p>
                <input type="file" id="fileInput" style="margin-top: 15px;">
                <button class="btn" onclick="uploadFile()" style="margin-top: 15px;">📤 Upload</button>
            </div>
            
            <div class="file-list">
                <h3>File Tersimpan</h3>
                <div id="files-container">
                    <p style="padding: 20px; color: #7f8c8d;">Memuat daftar file...</p>
                </div>
            </div>
        </main>
    </div>
    
    <script>
        function loadFiles() {
            fetch('../api.php?action=list')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('files-container');
                    if (data.success && data.data.length > 0) {
                        let html = '';
                        data.data.forEach(file => {
                            html += `
                                <div class="file-item">
                                    <div>
                                        <strong>${file.nama_file}</strong><br>
                                        <small>${file.ukuran} bytes | ${file.diupload}</small>
                                    </div>
                                    <button class="btn btn-danger" onclick="deleteFile(${file.id})">🗑️ Hapus</button>
                                </div>
                            `;
                        });
                        container.innerHTML = html;
                    } else {
                        container.innerHTML = '<p style="padding: 20px; color: #7f8c8d;">Belum ada file tersimpan</p>';
                    }
                });
        }
        
        function uploadFile() {
            alert('Fitur upload akan menyimpan file ke folder filemanajer/');
            loadFiles();
        }
        
        function deleteFile(id) {
            if (confirm('Yakin ingin menghapus file ini?')) {
                fetch(`../api.php?action=delete&id=${id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            loadFiles();
                        }
                    });
            }
        }
        
        window.addEventListener('load', loadFiles);
    </script>
</body>
</html>

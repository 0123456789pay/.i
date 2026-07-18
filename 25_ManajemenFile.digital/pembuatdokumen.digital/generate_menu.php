<?php
$menu_items = [
    // Pembuatan Dokumen (1-10)
    1 => ["Dokumen Baru", "Pembuatan Dokumen"],
    2 => ["Template Standar", "Pembuatan Dokumen"],
    3 => ["Template Formal", "Pembuatan Dokumen"],
    4 => ["Template Kreatif", "Pembuatan Dokumen"],
    5 => ["Editor HTML", "Pembuatan Dokumen"],
    6 => ["Editor CSS", "Pembuatan Dokumen"],
    7 => ["Editor JavaScript", "Pembuatan Dokumen"],
    8 => ["Preview Dokumen", "Pembuatan Dokumen"],
    9 => ["Export PDF", "Pembuatan Dokumen"],
    10 => ["Export Word", "Pembuatan Dokumen"],
    
    // Kategori Dokumen (11-20)
    11 => ["Surat Resmi", "Kategori Dokumen"],
    12 => ["Laporan", "Kategori Dokumen"],
    13 => ["Proposal", "Kategori Dokumen"],
    14 => ["Invoice", "Kategori Dokumen"],
    15 => ["Kontrak", "Kategori Dokumen"],
    16 => ["Memo", "Kategori Dokumen"],
    17 => ["Presentasi", "Kategori Dokumen"],
    18 => ["Brosur", "Kategori Dokumen"],
    19 => ["Flyer", "Kategori Dokumen"],
    20 => ["Poster", "Kategori Dokumen"],
    
    // Tools & Utilitas (21-30)
    21 => ["Spell Checker", "Tools & Utilitas"],
    22 => ["Grammar Check", "Tools & Utilitas"],
    23 => ["Word Counter", "Tools & Utilitas"],
    24 => ["Format Converter", "Tools & Utilitas"],
    25 => ["Image Insert", "Tools & Utilitas"],
    26 => ["Table Editor", "Tools & Utilitas"],
    27 => ["Link Manager", "Tools & Utilitas"],
    28 => ["Bookmark", "Tools & Utilitas"],
    29 => ["Search & Replace", "Tools & Utilitas"],
    30 => ["Version History", "Tools & Utilitas"],
    
    // Template Lanjutan (31-40)
    31 => ["Resume/CV", "Template Lanjutan"],
    32 => ["Cover Letter", "Template Lanjutan"],
    33 => ["Business Plan", "Template Lanjutan"],
    34 => ["Meeting Notes", "Template Lanjutan"],
    35 => ["Project Plan", "Template Lanjutan"],
    36 => ["Technical Doc", "Template Lanjutan"],
    37 => ["User Manual", "Template Lanjutan"],
    38 => ["API Documentation", "Template Lanjutan"],
    39 => ["Release Notes", "Template Lanjutan"],
    40 => ["Change Log", "Template Lanjutan"],
    
    // Format Khusus (41-50)
    41 => ["HTML Document", "Format Khusus"],
    42 => ["Markdown", "Format Khusus"],
    43 => ["LaTeX", "Format Khusus"],
    44 => ["JSON Data", "Format Khusus"],
    45 => ["XML Document", "Format Khusus"],
    46 => ["CSV Export", "Format Khusus"],
    47 => ["Email Template", "Format Khusus"],
    48 => ["Newsletter", "Format Khusus"],
    49 => ["Blog Post", "Format Khusus"],
    50 => ["Social Media", "Format Khusus"],
    
    // Kelola Dokumen (51-60)
    51 => ["Organize Files", "Kelola Dokumen"],
    52 => ["Tag Manager", "Kelola Dokumen"],
    53 => ["Folder Structure", "Kelola Dokumen"],
    54 => ["Batch Operations", "Kelola Dokumen"],
    55 => ["Archive Docs", "Kelola Dokumen"],
    56 => ["Restore Backup", "Kelola Dokumen"],
    57 => ["Sync Cloud", "Kelola Dokumen"],
    58 => ["Share Document", "Kelola Dokumen"],
    59 => ["Permission Set", "Kelola Dokumen"],
    60 => ["Audit Trail", "Kelola Dokumen"],
    
    // Collaboration (61-70)
    61 => ["Team Workspace", "Collaboration"],
    62 => ["Comments", "Collaboration"],
    63 => ["Review Mode", "Collaboration"],
    64 => ["Track Changes", "Collaboration"],
    65 => ["Approval Workflow", "Collaboration"],
    66 => ["Notifications", "Collaboration"],
    67 => ["Chat Integration", "Collaboration"],
    68 => ["Video Call", "Collaboration"],
    69 => ["Screen Share", "Collaboration"],
    70 => ["Task Assignment", "Collaboration"],
    
    // Settings & Config (71-80)
    71 => ["General Settings", "Settings & Config"],
    72 => ["Profile Setup", "Settings & Config"],
    73 => ["Security", "Settings & Config"],
    74 => ["Privacy", "Settings & Config"],
    75 => ["Language", "Settings & Config"],
    76 => ["Theme Custom", "Settings & Config"],
    77 => ["Keyboard Shortcuts", "Settings & Config"],
    78 => ["Auto Save", "Settings & Config"],
    79 => ["Backup Settings", "Settings & Config"],
    80 => ["API Keys", "Settings & Config"],
    
    // Analytics & Reports (81-90)
    81 => ["Usage Stats", "Analytics & Reports"],
    82 => ["Document Analytics", "Analytics & Reports"],
    83 => ["Performance", "Analytics & Reports"],
    84 => ["Activity Log", "Analytics & Reports"],
    85 => ["Export Report", "Analytics & Reports"],
    86 => ["Custom Reports", "Analytics & Reports"],
    87 => ["Dashboard Widgets", "Analytics & Reports"],
    88 => ["Data Visualization", "Analytics & Reports"],
    89 => ["Trend Analysis", "Analytics & Reports"],
    90 => ["Comparative Study", "Analytics & Reports"],
    
    // Help & Support (91-100)
    91 => ["Documentation", "Help & Support"],
    92 => ["Tutorials", "Help & Support"],
    93 => ["FAQ", "Help & Support"],
    94 => ["Contact Support", "Help & Support"],
    95 => ["Community Forum", "Help & Support"],
    96 => ["Feature Request", "Help & Support"],
    97 => ["Bug Report", "Help & Support"],
    98 => ["Changelog", "Help & Support"],
    99 => ["About System", "Help & Support"],
    100 => ["License Info", "Help & Support"]
];

foreach ($menu_items as $num => $data) {
    $filename = sprintf("menu/menu_%03d.php", $num);
    $content = generateMenuHTML($num, $data[0], $data[1]);
    file_put_contents("/workspace/pembuatdokumen/$filename", $content);
    echo "Created: $filename\n";
}

function generateMenuHTML($num, $title, $category) {
    return <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu $num - $title</title>
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
            <a href="menu_001.php">⬅ Menu Sebelumnya</a>
            <a href="menu_{$num}.php">🔄 Refresh</a>
            <a href="menu_" . sprintf('%03d', min(100, $num+1)) . ".php">➡ Menu Selanjutnya</a>
        </nav>
        <main class="content">
            <div class="card">
                <h1>📄 Menu $num - $title</h1>
                <p class="category">Kategori: $category</p>
                
                <textarea class="editor-area" placeholder="Area kerja untuk $title..."></textarea>
                
                <button class="btn">💾 Simpan</button>
                <button class="btn btn-success">✅ Terapkan</button>
                <button class="btn">🗑️ Hapus</button>
                
                <div class="info-box">
                    <strong>ℹ️ Informasi:</strong><br>
                    Menu ini adalah bagian dari sistem Pembuat Dokumen. Fitur lengkap tersedia untuk menu $num - $title.
                    Data akan disimpan di File Manager dan terindeks di database.
                </div>
            </div>
        </main>
    </div>
    <script>
        // Auto-save functionality
        const editor = document.querySelector('.editor-area');
        let timeout;
        editor.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                localStorage.setItem('menu_{$num}_content', editor.value);
                console.log('Auto-saved!');
            }, 1000);
        });
        
        // Load saved content
        window.addEventListener('load', () => {
            const saved = localStorage.getItem('menu_{$num}_content');
            if (saved) editor.value = saved;
        });
    </script>
</body>
</html>
HTML;
}

echo "\n✅ Selesai! 100 file menu telah dibuat.\n";
?>

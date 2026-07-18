<?php
// Script to generate 100 HTML menu files for AI Chat Reber

$menuItems = [
    "obrolan-baru", "riwayat-chat", "pesan-tersimpan", "pengaturan", "profil",
    "bantuan", "tentang", "kontak", "feedback", "notifikasi",
    "keamanan", "privasi", "tema", "bahasa", "audio",
    "video", "file-manager", "database", "export-data", "import-data",
    "backup", "restore", "hapus-cache", "log-aktivitas", "statistik",
    "api-keys", "integrasi", "plugin", "extensions", "templates",
    "quick-reply", "auto-response", "schedule", "reminder", "tasks",
    "calendar", "notes", "bookmarks", "favorites", "recent",
    "archive", "trash", "search", "filter", "sort",
    "share", "download", "upload", "sync", "cloud",
    "kirimi-pesan", "terima-pesan", "balas-chat", "forward-pesan", "hapus-pesan",
    "edit-pesan", "salin-pesan", "tempel-pesan", "cari-chat", "pilih-chat",
    "arsip-chat", "unarchive-chat", "mute-chat", "unmute-chat", "pin-chat",
    "unpin-chat", "blokir-user", "unblokir-user", "lapor-user", "info-user",
    "grup-chat", "buat-grup", "kelola-grup", "undang-member", "keluar-grup",
    "broadcast", "siaran", "promo", "iklan", "marketing",
    "analytics", "laporan", "metrik", "kinerja", "evaluasi",
    "optimasi", "testing", "debug", "error-log", "system-info",
    "update", "upgrade", "downgrade", "rollback", "migrate",
    "konfigurasi", "custom", "personalisasi", "widget", "shortcut",
    "voice-note", "call-audio", "call-video", "screen-share", "location-share",
    "sticker", "emoji", "gif", "image-share", "document-share"
];

$baseDir = __DIR__;

foreach ($menuItems as $index => $menuItem) {
    $fileName = $menuItem . ".html";
    $filePath = $baseDir . "/" . $fileName;
    
    $title = ucwords(str_replace("-", " ", $menuItem));
    $icon = "💬";
    
    $htmlContent = <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - AI Chat Reber</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .back-btn {
            display: inline-block;
            margin: 20px;
            padding: 10px 20px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
        }
        .back-btn:hover {
            background: #f0f0f0;
        }
        .page-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <a href="dashboard/digital.html" class="back-btn">← Kembali ke Dashboard</a>
    
    <div class="chat-container">
        <div class="chat-header">
            <h1>$icon $title</h1>
        </div>
        
        <div class="chat-messages" id="chatMessages">
            <div class="message ai">
                Halo! Selamat datang di fitur $title. Ada yang bisa saya bantu?
            </div>
        </div>
        
        <div class="chat-input-area">
            <input type="text" id="messageInput" placeholder="Ketik pesan Anda..." onkeypress="handleKeyPress(event)">
            <button onclick="sendMessage()">Kirim</button>
        </div>
    </div>
    
    <script src="js/chat.js"></script>
    <script>
        const currentPage = "$title";
    </script>
</body>
</html>
HTML;
    
    file_put_contents($filePath, $htmlContent);
    echo "Created: $fileName\n";
}

echo "\nTotal files created: " . count($menuItems) . "\n";
?>

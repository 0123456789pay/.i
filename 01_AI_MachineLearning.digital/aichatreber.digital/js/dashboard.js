// Dashboard JavaScript - Load menu items dynamically
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
});

function loadMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    const menuItems = getMenuItems();
    
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.className = 'menu-item';
        link.href = item.url;
        link.innerHTML = `
            <h3>${item.icon} ${item.title}</h3>
            <p>${item.description}</p>
        `;
        menuGrid.appendChild(link);
    });
}

function getMenuItems() {
    return [
        { title: "Obrolan Baru", description: "Mulai percakapan baru", icon: "💬", url: "obrolan-baru.html" },
        { title: "Riwayat Chat", description: "Lihat riwayat percakapan", icon: "📜", url: "riwayat-chat.html" },
        { title: "Pesan Tersimpan", description: "Akses pesan yang disimpan", icon: "🔖", url: "pesan-tersimpan.html" },
        { title: "Pengaturan", description: "Konfigurasi aplikasi", icon: "⚙️", url: "pengaturan.html" },
        { title: "Profil", description: "Kelola profil pengguna", icon: "👤", url: "profil.html" },
        { title: "Bantuan", description: "Pusat bantuan dan FAQ", icon: "❓", url: "bantuan.html" },
        { title: "Tentang", description: "Informasi aplikasi", icon: "ℹ️", url: "tentang.html" },
        { title: "Kontak", description: "Hubungi kami", icon: "📧", url: "kontak.html" },
        { title: "Feedback", description: "Berikan masukan", icon: "💡", url: "feedback.html" },
        { title: "Notifikasi", description: "Pusat notifikasi", icon: "🔔", url: "notifikasi.html" },
        { title: "Keamanan", description: "Pengaturan keamanan", icon: "🔒", url: "keamanan.html" },
        { title: "Privasi", description: "Kebijakan privasi", icon: "🛡️", url: "privasi.html" },
        { title: "Tema", description: "Ubah tema aplikasi", icon: "🎨", url: "tema.html" },
        { title: "Bahasa", description: "Pilih bahasa", icon: "🌐", url: "bahasa.html" },
        { title: "Audio", description: "Pengaturan suara", icon: "🔊", url: "audio.html" },
        { title: "Video", description: "Pengaturan video", icon: "📹", url: "video.html" },
        { title: "File Manager", description: "Kelola file", icon: "📁", url: "file-manager.html" },
        { title: "Database", description: "Kelola database", icon: "🗄️", url: "database.html" },
        { title: "Export Data", description: "Ekspor data chat", icon: "📤", url: "export-data.html" },
        { title: "Import Data", description: "Impor data chat", icon: "📥", url: "import-data.html" },
        { title: "Backup", description: "Cadangkan data", icon: "💾", url: "backup.html" },
        { title: "Restore", description: "Pulihkan data", icon: "🔄", url: "restore.html" },
        { title: "Hapus Cache", description: "Bersihkan cache", icon: "🧹", url: "hapus-cache.html" },
        { title: "Log Aktivitas", description: "Lihat log sistem", icon: "📊", url: "log-aktivitas.html" },
        { title: "Statistik", description: "Statistik penggunaan", icon: "📈", url: "statistik.html" },
        { title: "API Keys", description: "Kelola kunci API", icon: "🔑", url: "api-keys.html" },
        { title: "Integrasi", description: "Integrasi pihak ketiga", icon: "🔗", url: "integrasi.html" },
        { title: "Plugin", description: "Kelola plugin", icon: "🔌", url: "plugin.html" },
        { title: "Extensions", description: "Ekstensi tambahan", icon: "🧩", url: "extensions.html" },
        { title: "Templates", description: "Template pesan", icon: "📝", url: "templates.html" },
        { title: "Quick Reply", description: "Balasan cepat", icon: "⚡", url: "quick-reply.html" },
        { title: "Auto Response", description: "Balasan otomatis", icon: "🤖", url: "auto-response.html" },
        { title: "Schedule", description: "Jadwalkan pesan", icon: "📅", url: "schedule.html" },
        { title: "Reminder", description: "Pengingat", icon: "⏰", url: "reminder.html" },
        { title: "Tasks", description: "Daftar tugas", icon: "✅", url: "tasks.html" },
        { title: "Calendar", description: "Kalender", icon: "📆", url: "calendar.html" },
        { title: "Notes", description: "Catatan", icon: "📓", url: "notes.html" },
        { title: "Bookmarks", description: "Penanda", icon: "⭐", url: "bookmarks.html" },
        { title: "Favorites", description: "Favorit", icon: "❤️", url: "favorites.html" },
        { title: "Recent", description: "Terbaru", icon: "🕐", url: "recent.html" },
        { title: "Archive", description: "Arsip", icon: "📦", url: "archive.html" },
        { title: "Trash", description: "Sampah", icon: "🗑️", url: "trash.html" },
        { title: "Search", description: "Cari", icon: "🔍", url: "search.html" },
        { title: "Filter", description: "Filter", icon: "🔽", url: "filter.html" },
        { title: "Sort", description: "Urutkan", icon: "🔃", url: "sort.html" },
        { title: "Share", description: "Bagikan", icon: "📢", url: "share.html" },
        { title: "Download", description: "Unduh", icon: "⬇️", url: "download.html" },
        { title: "Upload", description: "Unggah", icon: "⬆️", url: "upload.html" },
        { title: "Sync", description: "Sinkronisasi", icon: "🔄", url: "sync.html" },
        { title: "Cloud", description: "Penyimpanan cloud", icon: "☁️", url: "cloud.html" }
    ];
}

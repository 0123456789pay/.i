#!/bin/bash

# Menu data
declare -a menus=(
"1:New File:Buat file baru (HTML CSS JS PHP):📄:file"
"2:Open File:Buka file dari disk:📂:file"
"3:Save:Simpan file saat ini:💾:file"
"4:Save As:Simpan dengan nama baru:💾+:file"
"5:Save All:Simpan semua file:💾💾:file"
"6:Close File:Tutup file aktif:❌:file"
"7:Close All:Tutup semua file:❌❌:file"
"8:Recent Files:File yang baru dibuka:🕐:file"
"9:File Properties:Lihat properti file:ℹ️:file"
"10:Rename File:Ganti nama file:✏️:file"
"11:Delete File:Hapus file:🗑️:file"
"12:Duplicate File:Duplikat file:📋:file"
"13:Export File:Ekspor file:📤:file"
"14:Import File:Impor file:📥:file"
"15:Print:Cetak file:🖨️:file"
"16:Undo:Batalkan perubahan:↩️:edit"
"17:Redo:Ulangi perubahan:↪️:edit"
"18:Cut:Potong teks:✂️:edit"
"19:Copy:Salin teks:📋:edit"
"20:Paste:Tempel teks:📋:edit"
"21:Select All:Pilih semua:✅:edit"
"22:Find:Cari teks:🔍:edit"
"23:Replace:Cari dan ganti:🔄:edit"
"24:Go to Line:Loncat ke baris:📍:edit"
"25:Indent:Tambah indentasi:➡️:edit"
"26:Outdent:Kurangi indentasi:⬅️:edit"
"27:Comment:Komentari kode:💬:edit"
"28:Uncomment:Hapus komentar:💬❌:edit"
"29:Format Code:Format kode otomatis:✨:edit"
"30:Duplicate Line:Duplikat baris:📋📋:edit"
"31:Delete Line:Hapus baris:🗑️📋:edit"
"32:Move Line Up:Naikkan baris:⬆️:edit"
"33:Move Line Down:Turunkan baris:⬇️:edit"
"34:Zoom In:Perbesar tampilan:🔍+:view"
"35:Zoom Out:Perkecil tampilan:🔍-:view"
"36:Reset Zoom:Reset zoom:🔍0:view"
"37:Toggle Sidebar:Tampilkan/sembunyikan sidebar:📊:view"
"38:Toggle Terminal:Tampilkan/sembunyikan terminal:💻:view"
"39:Toggle Preview:Tampilkan preview:👁️:view"
"40:Full Screen:Layar penuh:🖥️:view"
"41:Split Editor:Bagi editor:📐:view"
"42:Minimap:Tampilkan minimap:🗺️:view"
"43:Line Numbers:Nomor baris:🔢:view"
"44:Word Wrap:Wrap teks panjang:📝:view"
"45:White Space:Tampilkan spasi:␣:view"
"46:Breadcrumbs:Navigasi breadcrumbs:🍞:view"
"47:Status Bar:Bar status:📊:view"
"48:Activity Bar:Bar aktivitas:🎯:view"
"49:Panel View:Tampilan panel:📋:view"
"50:Explorer:Jelajah file:🗂️:view"
"51:Search in Files:Cari di semua file:🔍📁:tools"
"52:Source Control:Kontrol versi:🌿:tools"
"53:Run & Debug:Jalankan dan debug:🐛:tools"
"54:Extensions:Kelola ekstensi:🧩:tools"
"55:Settings:Pengaturan editor:⚙️:tools"
"56:Keyboard Shortcuts:Pintasan keyboard:⌨️:tools"
"57:Command Palette:Palet perintah:🎨:tools"
"58:Snippets:Kelola snippet:📝:tools"
"59:Emmet:Emmet abbreviations:⚡:tools"
"60:IntelliSense:Auto-complete:🧠:tools"
"61:Code Lens:Informasi kode:🔎:tools"
"62:Problems Panel:Daftar masalah:⚠️:tools"
"63:Output Panel:Panel output:📤:tools"
"64:Debug Console:Konsol debug:🐛💻:tools"
"65:Terminal:Terminal terintegrasi:💻:tools"
"66:Git Clone:Clone repository:🌿📥:tools"
"67:Git Commit:Commit perubahan:🌿✅:tools"
"68:Git Push:Push ke remote:🌿📤:tools"
"69:Git Pull:Pull dari remote:🌿📥:tools"
"70:Branch Manager:Kelola branch:🌿🔀:tools"
"71:HTML Preview:Preview HTML:🌐:tools"
"72:Live Server:Server lokal live:🖥️⚡:tools"
"73:CSS Validator:Validasi CSS:🎨✅:tools"
"74:JS Linter:Lint JavaScript:⚡✅:tools"
"75:PHP Server:Server PHP:🐘:tools"
"76:Database Connect:Koneksi database:🗄️:tools"
"77:SQL Query:Jalankan query SQL:📊:tools"
"78:API Tester:Test API endpoint:🔌:tools"
"79:JSON Formatter:Format JSON:📋✨:tools"
"80:XML Tools:Tools XML:📄:tools"
"81:Documentation:Dokumentasi editor:📚:help"
"82:Getting Started:Panduan pemula:🚀:help"
"83:Tutorials:Tutorial video:🎬:help"
"84:Release Notes:Catatan rilis:📝:help"
"85:Report Issue:Laporkan masalah:🐛:help"
"86:Feedback:Beri feedback:💬:help"
"87:About:Tentang editor:ℹ️:help"
"88:Check Updates:Cek pembaruan:🔄:help"
"89:Community:Komunitas pengguna:👥:help"
"90:Support:Dukungan teknis:🆘:help"
"91:Color Theme:Ganti tema warna:🎨:view"
"92:Font Settings:Pengaturan font:🔤:view"
"93:Layout Mode:Mode tata letak:📐:view"
"94:Workspace Save:Simpan workspace:💼:file"
"95:Workspace Open:Buka workspace:💼📂:file"
"96:Multi Cursor:Kursor ganda:👆👆:edit"
"97:Column Select:Seleksi kolom:📊:edit"
"98:Fold All:Tutup semua fold:📁❌:view"
"99:Unfold All:Buka semua fold:📁✅:view"
"100:Quick Open:Buka cepat:⚡📂:file"
)

for menu in "${menus[@]}"; do
    IFS=':' read -r id title desc icon category <<< "$menu"
    
    cat > "menu_${id}.html" << MENU_EOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Editor Kode</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-tinggi: 100vh; display: flex; }
        .sidebar { width: 250px; background: rgba(0,0,0,0.2); padding: 20px; color: white; }
        .sidebar h2 { margin-bottom: 20px; font-size: 1.3em; }
        .sidebar a { display: block; color: rgba(255,255,255,0.8); text-decoration: none; padding: 10px; margin-bottom: 5px; border-radius: 5px; transition: all 0.3s; }
        .sidebar a:hover { background: rgba(255,255,255,0.2); color: white; }
        .sidebar a.active { background: rgba(255,255,255,0.3); }
        .main-content { flex: 1; padding: 40px; }
        .header { background: white; border-radius: 15px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .header h1 { font-size: 2em; color: #333; jarak-luar-bottom: 10px; }
        .header .icon { font-size: 3em; margin-bottom: 15px; }
        .header .desc { color: #666; huruf-ukuran: 1.1em; }
        .content-area { background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); min-height: 400px; }
        .editor-placeholder { border: 2px dashed #ccc; batas-radius: 10px; bantalan: 40px; teks-align: center; warna: #999; jarak-luar-bottom: 20px; }
        .toolbar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .btn { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .btn-primary { background: #667eea; warna: white; }
        .btn-primary:hover { background: #5568d3; }
        .btn-secondary { background: #e0e0e0; warna: #333; }
        .btn-secondary:hover { background: #d0d0d0; }
        .code-area { width: 100%; height: 300px; border: 1px solid #ddd; batas-radius: 5px; bantalan: 15px; huruf-family: 'Courier baru', monospace; huruf-ukuran: 14px; resize: vertical; }
        .status-bar { position: fixed; bottom: 0; left: 0; right: 0; background: #333; warna: white; bantalan: 10px 20px; display: flex; justify-isi: space-between; }
        .breadcrumb { margin-bottom: 20px; color: #666; }
        .breadcrumb a { color: #667eea; teks-decoration: none; }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>📝 Editor Kode</h2>
        <a href="dashboard/index.html">🏠 Dashboard</a>
        <a href="filemanajer/index.html">📁 File Manager</a>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 15px 0;">
        <a href="#" class="active">${icon} ${title}</a>
    </div>
    
    <div class="main-content">
        <div class="breadcrumb">
            <a href="dashboard/index.html">Dashboard</a> > ${title}
        </div>
        
        <div class="header">
            <div class="icon">${icon}</div>
            <h1>${title}</h1>
            <p class="desc">${desc}</p>
        </div>
        
        <div class="content-area">
            <div class="toolbar">
                <button class="btn btn-primary" onclick="saveFile()">💾 Simpan</button>
                <button class="btn btn-secondary" onclick="newFile()">📄 Baru</button>
                <button class="btn btn-secondary" onclick="openFile()">📂 Buka</button>
                <button class="btn btn-secondary" onclick="undo()">↩️ Undo</button>
                <button class="btn btn-secondary" onclick="redo()">↪️ Redo</button>
            </div>
            
            <div class="editor-placeholder">
                <h3>Area Editor untuk ${title}</h3>
                <p>Klik tombol di atas untuk memulai editing</p>
            </div>
            
            <textarea class="code-area" placeholder="// Tulis kode Anda di sini..."></textarea>
        </div>
    </div>
    
    <div class="status-bar">
        <span>Menu ${id}/100 | Kategori: ${category.toUpperCase()}</span>
        <span>UTF-8 | LF</span>
    </div>
    
    <script>
        function saveFile() {
            alert('File disimpan ke File Manager!');
        }
        
        function newFile() {
            const content = prompt('Masukkan konten file baru:');
            if (content) {
                document.querySelector('.code-area').value = content;
            }
        }
        
        function openFile() {
            alert('Buka dialog file manager...');
        }
        
        function undo() {
            document.execCommand('undo');
        }
        
        function redo() {
            document.execCommand('redo');
        }
        
        // Auto-save functionality
        let autoSaveTimer;
        document.querySelector('.code-area').addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                console.log('Auto-saving...');
            }, 2000);
        });
    </script>
</body>
</html>
MENU_EOF

done

echo "Generated 100 menu files successfully!"

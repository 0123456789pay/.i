# ManajemenFile.Digital

Sistem manajemen file digital dengan tampilan UI modern berwarna putih dan biru, terinspirasi dari Media Digital.

## Fitur Utama

### 🔐 Sistem Autentikasi
- **Login Page** - Halaman masuk dengan validasi
- **Register Page** - Pendaftaran akun baru
- **Forgot Password** - Reset password via email
- Session management dengan localStorage

### 📁 Manajemen File & Folder
- Upload file dengan drag & drop
- Buat folder baru
- Navigasi breadcrumb
- View mode (Grid/List)
- Filter berdasarkan tipe file
- Detail file dengan informasi lengkap

### 🎯 Menu Digital (.digital)
- Integrasi dengan file konfigurasi .digital
- Menu dinamis dari struktur folder .digital
- Konfigurasi menu melalui file config.digital

### 📊 Dashboard
- Statistik penyimpanan
- File terbaru
- Aksi cepat
- Widget analitik

### ⚙️ Pengaturan
- Profil akun
- Tema (Terang/Gelap/Biru)
- Ukuran font
- Keamanan (2FA, Auto Lock)
- Manajemen penyimpanan

### ❓ Bantuan
- FAQ interaktif
- Live chat support
- Email support

## Struktur Folder

```
manajemenfile.digital/
├── index.html          # Main HTML file
├── styles.css          # Styling (White & Blue theme)
├── app.js              # Application logic
├── config.digital      # Configuration file
└── README.md           # Documentation
```

## Cara Menggunakan

### Login Default
- Email: `admin@digital.com`
- Password: `admin123`

### Menambahkan Menu Digital Baru

1. Buat folder dengan ekstensi `.digital`:
   ```
   NamaMenu_MenuUtama.digital/
   ```

2. Tambahkan file `config.digital`:
   ```
   MENU_UTAMA=NamaMenu
   SUB_MENU=menuutama
   BAHASA=id
   STATUS=aktif
   ```

3. Menu akan otomatis muncul di sidebar

### Kustomisasi Tema

Edit variabel CSS di `styles.css`:
```css
:root {
    --primary-blue: #2563eb;
    --primary-blue-dark: #1e40af;
    --secondary-blue: #60a5fa;
}
```

## Teknologi

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan CSS Variables
- **JavaScript (Vanilla)** - Logika aplikasi
- **Font Awesome 6** - Icon library
- **LocalStorage** - Penyimpanan session & data

## Fitur UI

- ✅ Responsive design (Mobile-friendly)
- ✅ Animasi smooth
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Sidebar collapsible
- ✅ Search functionality
- ✅ Breadcrumb navigation

## Footer

Footer dirancang tanpa link duplikat, hanya menampilkan:
- Copyright information
- Credit single line

## Ekstensi .digital

Sistem mendukung rekonstruksi folder/file berekstensi `.digital` menjadi menu-menu fungsional:

1. **Konfigurasi**: File `config.digital` berisi parameter menu
2. **Dokumentasi**: File `README.digital` berisi deskripsi modul
3. **Struktur**: Folder `.digital` dapat berisi sub-folder untuk organisasi

## Sistem Kode

Ketika perlu menambahkan folder/file tambahan:

1. Buat folder baru dengan pola: `NamaModul_FiturV1.digital/`
2. Tambahkan `config.digital` untuk konfigurasi
3. Tambahkan `README.digital` untuk dokumentasi
4. Menu akan otomatis tergenerate di sidebar

## Lisensi

Digital Management System © 2024

## Kontak Support

- Email: support@manajemenfile.digital
- Live Chat: Tersedia 24/7 dalam aplikasi

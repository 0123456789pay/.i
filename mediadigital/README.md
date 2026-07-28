# Media Digital - Platform Manajemen Konten Digital

## Struktur Folder

```
/mediadigital/
├── css/
│   └── style.css          # Stylesheet utama
├── js/
│   ├── main.js            # JavaScript utama (login, register, animasi)
│   └── repo-manager.js    # Manajemen repositori GitHub
├── dashboard/
│   └── index.html         # Dashboard admin untuk manajemen repositori
├── index.html             # Halaman utama (landing page)
├── login.html             # Halaman login
├── register.html          # Halaman registrasi
└── README.md              # Dokumentasi ini
```

## Fitur Utama

### 1. Halaman Publik
- **Landing Page** (`index.html`): Halaman utama dengan fitur, tentang, dan kontak
- **Login** (`login.html`): Form login untuk pengguna dan admin
- **Register** (`register.html`): Form pendaftaran pengguna baru

### 2. Dashboard Admin
- **Akses**: Login dengan kredensial admin
  - Username: `admin`
  - Password: `adminroot`
  
- **Fitur Dashboard**:
  - Menampilkan semua repositori dari GitHub user `jenisprotokol`
  - Integrasi langsung dengan GitHub API
  - Manajemen file dan folder visual
  - Auto-refresh data repositori setiap 5 menit

### 3. Repositori GitHub Terintegrasi
Sistem otomatis mengambil dan menampilkan repositori dari:
- https://github.com/jenisprotokol/file.online
- https://github.com/jenisprotokol/jenis
- https://github.com/jenisprotokol/media.digital

## Cara Menggunakan

### Untuk Pengguna Biasa
1. Buka `index.html` di browser
2. Klik "Daftar" untuk membuat akun baru
3. Login dengan email dan password yang telah dibuat
4. Akses fitur platform

### Untuk Admin
1. Buka `login.html`
2. Login dengan:
   - Email: `admin`
   - Password: `adminroot`
3. Anda akan diarahkan ke `/dashboard/index.html`
4. Lihat daftar repositori GitHub dari `jenisprotokol`
5. Kelola file dan folder melalui antarmuka manajemen file

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dengan variabel CSS dan animasi
- **JavaScript (Vanilla)**: Logika aplikasi tanpa framework
- **GitHub API**: Mengambil data repositori secara real-time
- **LocalStorage**: Menyimpan sesi login

## API Endpoint

- GitHub API: `https://api.github.com/users/jenisprotokol/repos`

## Keamanan

⚠️ **Catatan**: Ini adalah implementasi demo. Untuk produksi:
- Gunakan backend server untuk autentikasi
- Jangan simpan kredensial di localStorage
- Implementasikan HTTPS
- Gunakan database untuk menyimpan user

## Lisensi

Hak Cipta © 2024 Media Digital. Semua hak dilindungi.

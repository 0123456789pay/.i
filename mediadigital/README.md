# media digital - landasan Manajemen Konten digital

## Struktur direktori

```
/mediadigital/
├── css/
│   └── gaya.css          # lembar gaya utama
├── js/
│   ├── utama.js            # skrip JavaScript utama (masuk, daftar, animasi)
│   └── repo-manager.js    # Manajemen repositori GitHub
├── papan-bilas/
│   └── indeks.html         # papan-bilas pengelola untuk manajemen repositori
├── indeks.html             # Halaman utama (landing halaman)
├── masuk.html             # Halaman masuk
├── daftar.html          # Halaman registrasi
└── README.md              # Dokumentasi ini
```

## Fitur Utama

### 1. Halaman Publik
- **Landing halaman** (`indeks.html`): Halaman utama dengan fitur, tentang, dan kontak
- **masuk** (`masuk.html`): borang masuk untuk pengguna dan pengelola
- **daftar** (`daftar.html`): borang pendaftaran pengguna baru

### 2. papan-bilas pengelola
- **Akses**: masuk dengan kredensial pengelola
  - Username: `pengelola`
  - sandian: `adminroot`
  
- **Fitur papan-bilas**:
  - Menampilkan semua repositori dari GitHub pengguna `jenisprotokol`
  - Integrasi langsung dengan GitHub API
  - Manajemen berkas dan direktori visual
  - otomatis-refresh data repositori setiap 5 menit

### 3. Repositori GitHub Terintegrasi
Sistem otomatis mengambil dan menampilkan repositori dari:
- https://github.com/jenisprotokol/berkas.online
- https://github.com/jenisprotokol/jenis
- https://github.com/jenisprotokol/media.digital

## Cara Menggunakan

### Untuk Pengguna Biasa
1. Buka `indeks.html` di browser
2. Klik "Daftar" untuk membuat akun baru
3. masuk dengan sur-el dan sandian yang telah dibuat
4. Akses fitur landasan

### Untuk pengelola
1. Buka `masuk.html`
2. masuk dengan:
   - sur-el: `pengelola`
   - sandian: `adminroot`
3. Anda akan diarahkan ke `/papan-bilas/indeks.html`
4. Lihat daftar repositori GitHub dari `jenisprotokol`
5. Kelola berkas dan direktori melalui antarmuka manajemen berkas

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dengan variabel CSS dan animasi
- **skrip JavaScript (Vanilla)**: Logika aplikasi tanpa framework
- **GitHub API**: Mengambil data repositori secara real-waktu
- **LocalStorage**: Menyimpan sesi masuk

## API Endpoint

- GitHub API: `https://api.github.com/para pengguna/jenisprotokol/repos`

## Keamanan

⚠️ **Catatan**: Ini adalah implementasi demo. Untuk produksi:
- Gunakan backend peladen untuk autentikasi
- Jangan simpan kredensial di localStorage
- Implementasikan HTTPS
- Gunakan basis-data untuk menyimpan pengguna

## Lisensi

Hak Cipta © 2024 media digital. Semua hak dilindungi.

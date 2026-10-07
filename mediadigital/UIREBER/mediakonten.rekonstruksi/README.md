# media.digital - Rekonstruksi landasan Konten digital

## Deskripsi
landasan manajemen konten digital dengan tampilan UI modern berwarna putih dan biru, terinspirasi dari media.digital. Sistem ini mencakup fitur masuk, daftar, papan-bilas, dan berbagai menu fungsional yang direkonstruksi dari berkas `.digital`.

## Struktur direktori

```
mediakonten.rekonstruksi/
├── indeks.html              # Halaman utama (landing halaman)
├── css/
│   └── utama.css           # lembar gaya utama (tema putih-biru)
├── js/
│   ├── utama.js            # skrip-skrip-javascript utama
│   └── auth.js            # autentikasi (masuk/daftar)
├── html/
│   ├── masuk.html         # Halaman masuk
│   └── daftar.html      # Halaman daftar
├── php/                   # Backend PHP (API & logic)
├── db/                    # basis-data schema
├── components/            # Komponen UI reusable
├── konfigurasi/                # berkas konfigurasi sistem
├── sistem/                # sistem core berkas-berkas
└── assets/
    └── gambar/            # Asset gambar
```

## Fitur Utama

### 1. **UI/UX Modern**
- Tema warna putih bersih dengan aksen biru profesional (#1a73e8)
- Navigasi dropdown yang responsif
- Animasi smooth dan transisi halus
- Design mobile-pertama yang responsif

### 2. **Sistem Autentikasi**
- ✅ borang masuk dengan validasi sur-el & sandian
- ✅ borang daftar dengan validasi lengkap
- ✅ sandian strength indicator
- ✅ Toggle tampilkan/sembunyikan sandian
- ✅ Social masuk (Google, Facebook)
- ✅ Remember me functionality
- ✅ sesi pengelolaan (localStorage/sessionStorage)

### 3. **Menu Navigation**
Berdasarkan rekonstruksi berkas `.digital`:

#### papan-bilas
- 📊 Overview
- 📁 Kelola media
- ⬆️ unggah berkas
- 🖼️ Galeri
- 🏷️ Kategori & Tag
- 📅 Penjadwalan

#### Konten
- 📝 Buat Artikel
- 🎬 penyunting Video
- 🎨 Desain Grafis
- 🎙️ Podcast Audio
- 🔴 Live Streaming

#### Analitik
- 📈 Statistik Pengunjung
- 📊 Kinerja Konten
- 💰 Laporan Revenue
- 🔥 Trending
- 🔍 SEO Metrics

#### Pengaturan
- 👤 Akun & Profil
- 🔒 Keamanan
- 📧 Notifikasi
- 🎨 Tampilan
- 🌐 Bahasa

#### Bantuan
- Pusat Bantuan
- Dokumentasi
- Komunitas
- Support Ticket

### 4. **Komponen UI**
- Cards dengan hover effect
- Forms dengan validasi real-waktu
- Tables dengan styling modern
- Buttons (primary, secondary, ghost)
- Badges & Alerts
- Grid sistem responsif

### 5. **kaki Tanpa tautan Duplikat**
- kaki bagian dengan 4 kolom unik
- Tidak ada tautan yang sama berulang
- Copyright dan social tautan

## Teknologi

- **HTML5** - Semantic markup
- **CSS3** - suai properties, flexbox, grid
- **skrip-skrip-javascript ES6+** - Modular code, async/await
- **PHP** (opsional) - Backend API ready

## Cara Menggunakan

### 1. Clone/unduh Project
```bash
cd /workspace/mediakonten.rekonstruksi
```

### 2. Buka di Browser
```
berkas:///workspace/mediakonten.rekonstruksi/indeks.html
```

### 3. Atau Gunakan Local peladen
```bash
# Dengan Python
python -m http.peladen 8000

# Dengan PHP
php -S localhost:8000
```

Kemudian akses: `http://localhost:8000`

## Konfigurasi

berkas konfigurasi dapat ditemukan di direktori `/konfigurasi`:
- `sistem.konfigurasi.php` - Konfigurasi sistem utama
- `basis-data.konfigurasi.php` - Koneksi basis-data
- `theme.konfigurasi.php` - Pengaturan tema

## Ekstensi .digital

Sistem ini merekonstruksi semua berkas `.digital` menjadi struktur menu yang fungsional:

| berkas .digital | Menu Hasil Rekonstruksi |
|--------------|------------------------|
| mediadigital.digital | papan-bilas Utama |
| manajemenfile.digital | Manajemen berkas |
| medsos.digital | media Sosial |
| domain.digital | Domain Manager |
| arsipversi.digital/* | Arsip Versi |

## Customization

### Mengubah Warna Tema
Edit berkas `css/utama.css` pada bagian `:akar`:

```css
:akar {
    --primary-blue: #1a73e8;        /* Warna utama */
    --primary-blue-dark: #1557b0;   /* Hover state */
    --primary-blue-light: #4d9fef;  /* Accent */
    --secondary-blue: #e8f0fe;      /* latar-belakang accent */
}
```

### Menambah Menu Baru
Edit berkas `indeks.html` pada bagian `<nav kelas="utama-nav">`:

```html
<div kelas="nav-butir">
    <a href="#" kelas="nav-tautan">Nama Menu <span kelas="nav-arrow">▼</span></a>
    <ul kelas="dropdown-menu">
        <li><a href="#" kelas="dropdown-butir">Sub Menu 1</a></li>
        <li><a href="#" kelas="dropdown-butir">Sub Menu 2</a></li>
    </ul>
</div>
```

## keamanan fitur

- ✅ masukan validation (klien-side)
- ✅ sandian strength checking
- ✅ XSS protection (escaped keluaran)
- ✅ CSRF token ready
- ✅ Secure sesi handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2024 media.digital - landasan Manajemen Konten digital

## kontak & Support

Untuk bantuan lebih lanjut:
- 📧 sur-el: support@media.digital
- 📚 Dokumentasi: /docs
- 💬 Komunitas: Forum Diskusi

---

**Dibuat dengan ❤️ untuk ekosistem digital Indonesia**

# Media Digital Repository

## Deskripsi
Repositori ini berisi kumpulan file digital untuk berbagai kebutuhan media, aplikasi web, dan sistem manajemen konten. Seluruh kode telah dikonfigurasi untuk menggunakan **CSS dan JavaScript internal** tanpa ketergantungan pada library atau CDN eksternal.

## Fitur Utama

### 🚫 Tanpa Dependensi Eksternal
- **Tidak ada Bootstrap, Tailwind, React, atau framework CSS/JS eksternal**
- **Tidak ada Google Fonts atau font eksternal lainnya**
- **Tidak ada CDN (Content Delivery Network) untuk CSS atau JS**
- Semua stylesheet dan script diimplementasikan secara internal (inline)

### 📁 Struktur File
- **File HTML**: Menggunakan tag `<style>` untuk CSS internal dan `<script>` untuk JavaScript internal
- **File PHP**: Mengintegrasikan CSS dan JS langsung dalam dokumen
- **Atribut Custom**: Menggunakan atribut `srebercs` atau `jrebers` pada tag `<link>` dan `<script>` untuk identifikasi resource internal

### 🔧 Konvensi Penamaan Atribut
```html
<!-- Untuk CSS Internal -->
<link rel="srebercs" href="data:text/css,...">

<!-- Untuk JavaScript Internal -->
<script jrebers>
  // Kode JavaScript inline
</script>
```

## Arsitektur

### Komponen Utama
1. **AI & Machine Learning** (`ai_machinelearning.digital/`)
2. **Manajemen File** (`manajemenfile.digital/`)
3. **Desain Kreatif** (`desainkreatif.digital/`)
4. **Keamanan Siber** (`keamanansiber.digital/`)
5. **Analisis Data** (`analisisdata.digital/`)
6. **Aplikasi Web** (berbagai file `.html` di root)

### Aplikasi Web Tersedia
- Browser App
- Kalkulator
- Kalender
- Jam
- Kontak
- Email
- Galeri
- Peta
- Musik
- Berita
- Catatan
- Dan banyak lagi...

### Menjalankan File HTML
```bash
firefox appbrowser.html
python3 -m http.server 8000
```

### Menjalankan File PHP
```bash
php -S localhost:8000
```

## Keunggulan Arsitektur Internal

### ✅ Keuntungan
1. **Performa Lebih Cepat**: Tidak ada request HTTP tambahan ke server eksternal
2. **Privasi Lebih Baik**: Tidak ada data yang bocor ke pihak ketiga melalui CDN
3. **Offline-First**: Dapat berfungsi sepenuhnya tanpa koneksi internet
4. **Keamanan**: Mengurangi risiko serangan supply-chain dari library eksternal
5. **Kontrol Penuh**: Semua kode dapat diaudit dan dimodifikasi sesuai kebutuhan

- CSS ditulis langsung dalam tag `<style>` di bagian `<head>`
- JavaScript ditulis langsung dalam tag `<script>` di bagian `<body>` atau `<head>`
- Tidak ada file `.css` atau `.js` eksternal yang di-link
- Semua fungsi dan style self-contained dalam satu file

## Struktur Direktori

```
/workspace/
├── ai_machinelearning.digital/    # Modul AI dan ML
├── aireber.digital/               # Automasi konten AI
├── analisisdata.digital/          # Tools analisis data
├── analytics.digital/             # Sistem analitik
├── desainkreatif.digital/         # Resources desain
├── keamanansiber.digital/         # Keamanan dan proxy
├── manajemenfile.digital/         # Manajemen file
├── newsnia.digital/               # Sistem berita
├── pusatdigital.digital/          # Fungsi global
├── arsipversi.digital/            # Arsip dan versioning
├── *.html                         # Aplikasi web standalone
└── README.md                      # Dokumentasi ini
```

## Lisensi
Lihat file [LICENSE.md](LICENSE.md) untuk informasi lisensi.

## Catatan Teknis
- Total file HTML/PHP: ~4700+ file
- Semua file telah dikonversi ke format internal
- Atribut custom `srebercs` dan `jrebers` digunakan untuk identifikasi resource

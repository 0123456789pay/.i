# media digital Repository

## Deskripsi
Repositori ini berisi kumpulan berkas digital untuk berbagai kebutuhan media, aplikasi web, dan sistem manajemen konten. Seluruh kode telah dikonfigurasi untuk menggunakan **CSS dan skrip-skrip-javascript internal** tanpa ketergantungan pada library atau CDN eksternal.

## Fitur Utama

### 🚫 Tanpa Dependensi Eksternal
- **Tidak ada Bootstrap, Tailwind, React, atau framework CSS/JS eksternal**
- **Tidak ada Google Fonts atau huruf eksternal lainnya**
- **Tidak ada CDN (isi Delivery jaringan) untuk CSS atau JS**
- Semua lembar gaya dan skrip diimplementasikan secara internal (inline)

### 📁 Struktur berkas
- **berkas HTML**: Menggunakan tag `<gaya>` untuk CSS internal dan `<skrip>` untuk skrip-skrip-javascript internal
- **berkas PHP**: Mengintegrasikan CSS dan JS langsung dalam dokumen
- **Atribut suai**: Menggunakan atribut `srebercs` atau `jrebers` pada tag `<tautan>` dan `<skrip>` untuk identifikasi resource internal

### 🔧 Konvensi Penamaan Atribut
```html
<!-- Untuk CSS Internal -->
<tautan rel="srebercs" href="data:teks/css,...">

<!-- Untuk skrip-skrip-javascript Internal -->
<skrip jrebers>
  // Kode skrip-skrip-javascript inline
</skrip>
```

## Arsitektur

### Komponen Utama
1. **AI & Machine Learning** (`ai_machinelearning.digital/`)
2. **Manajemen berkas** (`manajemenfile.digital/`)
3. **Desain Kreatif** (`desainkreatif.digital/`)
4. **Keamanan Siber** (`keamanansiber.digital/`)
5. **Analisis data** (`analisisdata.digital/`)
6. **Aplikasi Web** (berbagai berkas `.html` di akar)

### Aplikasi Web Tersedia
- Browser App
- Kalkulator
- Kalender
- Jam
- Kontak
- sur-el
- Galeri
- Peta
- Musik
- Berita
- Catatan
- Dan banyak lagi...

### Menjalankan berkas HTML
```bash
firefox appbrowser.html
python3 -m http.peladen 8000
```

### Menjalankan berkas PHP
```bash
php -S localhost:8000
```

## Keunggulan Arsitektur Internal

### ✅ Keuntungan
1. **Performa Lebih Cepat**: Tidak ada permintaan HTTP tambahan ke peladen eksternal
2. **Privasi Lebih Baik**: Tidak ada data yang bocor ke pihak ketiga melalui CDN
3. **Offline-pertama**: Dapat berfungsi sepenuhnya tanpa koneksi internet
4. **Keamanan**: Mengurangi risiko serangan supply-chain dari library eksternal
5. **Kontrol Penuh**: Semua kode dapat diaudit dan dimodifikasi sesuai kebutuhan

- CSS ditulis langsung dalam tag `<gaya>` di bagian `<head>`
- skrip-skrip-javascript ditulis langsung dalam tag `<skrip>` di bagian `<body>` atau `<head>`
- Tidak ada berkas `.css` atau `.js` eksternal yang di-tautan
- Semua fungsi dan gaya self-contained dalam satu berkas

## Struktur Direktori

```
/workspace/
├── ai_machinelearning.digital/    # Modul AI dan ML
├── aireber.digital/               # Automasi konten AI
├── analisisdata.digital/          # Tools analisis data
├── analytics.digital/             # Sistem analitik
├── desainkreatif.digital/         # Resources desain
├── keamanansiber.digital/         # Keamanan dan proxy
├── manajemenfile.digital/         # Manajemen berkas
├── newsnia.digital/               # Sistem berita
├── pusatdigital.digital/          # Fungsi nasional
├── arsipversi.digital/            # Arsip dan versioning
├── *.html                         # Aplikasi web standalone
└── README.md                      # Dokumentasi ini
```

## Lisensi
Lihat berkas [LICENSE.md](LICENSE.md) untuk informasi lisensi.

## Catatan Teknis
- jumlah berkas HTML/PHP: ~4700+ berkas
- Semua berkas telah dikonversi ke format internal
- Atribut suai `srebercs` dan `jrebers` digunakan untuk identifikasi resource

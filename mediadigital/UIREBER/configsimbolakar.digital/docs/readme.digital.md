# Simbol Akar digital - Dokumentasi

## 📋 Ringkasan Sistem

Sistem **Simbol Akar digital** adalah konfigurasi lengkap untuk mengaktifkan simbol akar (√) di browser dengan menggunakan biner, regex, dan rumus matematika.

## 🏗️ Struktur Direktori

```
configsimbolakar.digital/
├── indeks.digital.html          # Halaman utama (tanpa kaki)
├── core/                       # Inti sistem
├── symbols/                    # Registry simbol
├── regex/                      # Pola regex
├── formulas/                   # Rumus matematika
├── secure/                     # Konfigurasi keamanan
├── assets/
│   ├── css/
│   │   └── gaya.digital.css   # Styling digital
│   ├── js/
│   │   └── app.digital.js      # Logika aplikasi
│   └── gambar/                 # Aset gambar
├── docs/
│   ├── konfigurasi.digital.json     # Konfigurasi JSON
│   ├── readme.digital.md       # Dokumentasi ini
│   └── api.digital.txt         # Dokumentasi API
├── db/                         # basis-data
└── konfigurasi/
    └── sistem.digital.php      # Konfigurasi PHP
```

## 🔧 Fitur Utama

### 1. Simbol Akar (√)
- Unicode: `U+221A`
- Aktivasi melalui konfigurasi biner
- Animasi dan efek visual di browser

### 2. Konfigurasi Biner
```
Activation Code: 10101000 01010101 00101010
```

### 3. Regex Patterns
- akar Symbol: `/^\u221A|sqrt|akar|akar$/i`
- Decimal angka: `/[0-9]+\.[0-9]+/g`
- Math Symbols: `/[√∛∜∑∏∫]/g`

### 4. Formula Matematika
- √(x² + y²) - Teorema Pythagoras
- ∛(a³ + b³) - Akar kubik
- lim(x→∞) √x - Limit kalkulus

## 🛡️ Keamanan

Sistem menggunakan:
- Enkripsi AES-256
- Hash SHA-256
- sesi pengelolaan
- Secure headers

## 📄 Ekstensi berkas

Semua berkas menggunakan ekstensi `.digital`:
- `.digital.html` - HTML
- `.digital.css` - CSS
- `.digital.js` - skrip-skrip-javascript
- `.digital.php` - PHP
- `.digital.json` - JSON
- `.digital.md` - Markdown
- `.digital.txt` - teks
- `.digital.db` - basis-data

## 🚀 Cara Menggunakan

1. Buka `indeks.digital.html` di browser
2. Sistem akan otomatis mengaktifkan simbol akar
3. Klik pada simbol untuk menyalin ke clipboard
4. Akses API melalui parameter `?api=konfigurasi`

## 📡 API Endpoints

```
GET /konfigurasi/sistem.digital.php?api=konfigurasi   - Konfigurasi lengkap
GET /konfigurasi/sistem.digital.php?api=symbol   - Simbol akar
GET /konfigurasi/sistem.digital.php?api=binary   - Kode biner
GET /konfigurasi/sistem.digital.php?api=secure   - Status keamanan
```

## 🎨 Tampilan

Tampilan mengikuti gaya **media.digital**:
- kepala sticky dengan navigasi
- Hero bagian dengan simbol besar
- Grid tata letak untuk konten
- Animasi smooth
- Responsive design
- **Tanpa kaki** (sesuai permintaan)

## 🔐 Mode Aman

Sistem dilengkapi dengan mode secure yang:
- Mengenkripsi data sensitif
- Memvalidasi sesi
- Menggunakan token unik
- Logging aktivitas

---

**Versi:** 1.0.0  
**Dibuat:** 2025  
**Lisensi:** MIT

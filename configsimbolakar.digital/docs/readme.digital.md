# Simbol Akar Digital - Dokumentasi

## 📋 Ringkasan Sistem

Sistem **Simbol Akar Digital** adalah konfigurasi lengkap untuk mengaktifkan simbol akar (√) di browser dengan menggunakan biner, regex, dan rumus matematika.

## 🏗️ Struktur Direktori

```
configsimbolakar.digital/
├── index.digital.html          # Halaman utama (tanpa footer)
├── core/                       # Inti sistem
├── symbols/                    # Registry simbol
├── regex/                      # Pola regex
├── formulas/                   # Rumus matematika
├── secure/                     # Konfigurasi keamanan
├── assets/
│   ├── css/
│   │   └── style.digital.css   # Styling digital
│   ├── js/
│   │   └── app.digital.js      # Logika aplikasi
│   └── images/                 # Aset gambar
├── docs/
│   ├── config.digital.json     # Konfigurasi JSON
│   ├── readme.digital.md       # Dokumentasi ini
│   └── api.digital.txt         # Dokumentasi API
├── db/                         # Database
└── config/
    └── system.digital.php      # Konfigurasi PHP
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
- Root Symbol: `/^\u221A|sqrt|akar|root$/i`
- Decimal Number: `/[0-9]+\.[0-9]+/g`
- Math Symbols: `/[√∛∜∑∏∫]/g`

### 4. Formula Matematika
- √(x² + y²) - Teorema Pythagoras
- ∛(a³ + b³) - Akar kubik
- lim(x→∞) √x - Limit kalkulus

## 🛡️ Keamanan

Sistem menggunakan:
- Enkripsi AES-256
- Hash SHA-256
- Session management
- Secure headers

## 📄 Ekstensi File

Semua file menggunakan ekstensi `.digital`:
- `.digital.html` - HTML
- `.digital.css` - CSS
- `.digital.js` - JavaScript
- `.digital.php` - PHP
- `.digital.json` - JSON
- `.digital.md` - Markdown
- `.digital.txt` - Text
- `.digital.db` - Database

## 🚀 Cara Menggunakan

1. Buka `index.digital.html` di browser
2. Sistem akan otomatis mengaktifkan simbol akar
3. Klik pada simbol untuk menyalin ke clipboard
4. Akses API melalui parameter `?api=config`

## 📡 API Endpoints

```
GET /config/system.digital.php?api=config   - Konfigurasi lengkap
GET /config/system.digital.php?api=symbol   - Simbol akar
GET /config/system.digital.php?api=binary   - Kode biner
GET /config/system.digital.php?api=secure   - Status keamanan
```

## 🎨 Tampilan

Tampilan mengikuti gaya **media.digital**:
- Header sticky dengan navigasi
- Hero section dengan simbol besar
- Grid layout untuk konten
- Animasi smooth
- Responsive design
- **Tanpa footer** (sesuai permintaan)

## 🔐 Mode Aman

Sistem dilengkapi dengan mode secure yang:
- Mengenkripsi data sensitif
- Memvalidasi session
- Menggunakan token unik
- Logging aktivitas

---

**Versi:** 1.0.0  
**Dibuat:** 2025  
**Lisensi:** MIT

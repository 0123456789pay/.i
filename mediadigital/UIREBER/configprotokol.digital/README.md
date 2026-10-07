# ConfigProtokol digital

Sistem Manajemen Protokol Keamanan Browser untuk mengaktifkan seluruh jenis protokol secure di browser menggunakan konfigurasi dari direktori GitHub.

## 📁 Struktur Direktori

```
configprotokol.digital/
├── indeks.html              # Halaman utama (tampilan seperti media.digital tanpa kaki)
├── css/
│   └── gaya.css          # lembar gaya utama
├── js/
│   └── utama.js            # skrip-skrip-javascript untuk interaksi
├── konfigurasi/
│   └── master_config.json # Konfigurasi master JSON
├── db/
│   └── config_database.sql # Schema basis-data MySQL
├── bin/
│   ├── secure_protocol.bin # berkas biner protokol keamanan
│   └── browser_config.bin  # berkas biner konfigurasi browser
├── regex/
│   ├── security_patterns.regex    # Pattern regex keamanan
│   └── protocol_validation.regex  # Pattern validasi protokol
├── formulas/
│   └── activation_formula.cfg     # Formula aktivasi sistem
└── includes/
    └── protocol_handler.php       # pengendali PHP untuk protokol
```

## 🔒 Protokol yang Didukung

1. **HTTPS/TLS 1.3** - Enkripsi end-to-end
2. **HSTS** - HTTP Strict Transport keamanan
3. **CSP** - isi keamanan Policy
4. **HTTP/2 & HTTP/3** - Protokol modern
5. **WebAuthn** - Autentikasi tanpa sandian
6. **DoH/DoT** - DNS over HTTPS/TLS

## 🚀 Cara Penggunaan

### 1. Akses Halaman Web
Buka berkas `indeks.html` di browser modern untuk melihat antarmuka pengelolaan.

### 2. Konfigurasi basis-data
```bash
mysql -u akar -p < db/config_database.sql
```

### 3. Integrasi PHP
```php
<?php
require_once 'includes/protocol_handler.php';

use ConfigProtokol\digital\ProtocolHandler;

$pengendali = baru ProtocolHandler();
$status = $pengendali->getSystemStatus();
print_r($status);
?>
```

### 4. Sinkronisasi GitHub
Konfigurasi terhubung dengan repository GitHub untuk perbarui otomatis:
- pautan: `https://github.com/configprotokol/digital`
- Branch: `utama`
- otomatis-sync: Setiap 3600 detik (1 jam)

## 📊 Fitur Utama

- ✅ Enkripsi End-to-End
- ✅ Validasi Real-waktu
- ✅ perbarui Otomatis dari GitHub
- ✅ Multi-Browser Support (Chrome, Firefox, Safari, Edge)
- ✅ keamanan Headers Lengkap
- ✅ Regex Pattern Validation
- ✅ Formula Aktivasi Dinamis
- ✅ basis-data Logging & Audit Trail

## 🔧 Konfigurasi

Edit berkas `konfigurasi/master_config.json` untuk menyesuaikan:
- Versi protokol minimum
- Cipher suites yang diizinkan
- keamanan headers
- Browser compatibility pengaturan
- GitHub sync interval

## 📝 Formula Aktivasi

berkas `formulas/activation_formula.cfg` berisi formula untuk:
- Aktivasi protokol berbasis skor
- Perhitungan keamanan score
- Browser compatibility matrix
- Risk assessment
- otomatis-perbarui decision

## 🔍 Pattern Regex

berkas regex menyediakan pattern untuk:
- Validasi pautan dan domain
- Deteksi protokol TLS/SSL
- keamanan kepala validation
- Certificate transparency
- Attack detection patterns

## 💾 berkas Biner

berkas `.bin` berisi:
- Signature protokol keamanan
- Binary pengaturan untuk browser
- Executable flags untuk aktivasi

## 🗄️ basis-data Schema

Schema MySQL mencakup tabel:
- `protocols` - Daftar protokol
- `security_headers` - kepala keamanan
- `browser_configs` - Konfigurasi browser
- `github_sync` - Status sinkronisasi
- `activation_logs` - catatan aktivasi
- `regex_patterns` - Pattern regex
- `formulas` - Formula sistem

## 🌐 Integrasi GitHub

Untuk sinkronisasi dengan GitHub:

```skrip-skrip-javascript
// Di utama.js sudah terdapat fungsi sync
const githubSync = async () => {
    const jawaban = await fetch('https://api.github.com/repos/configprotokol/digital');
    const data = await jawaban.json();
    konsol.catatan('terakhir perbarui:', data.pushed_at);
};
```

## 📈 keamanan Score Calculation

keamanan score dihitung dengan formula:
```
jumlah Score = (Protocol Score × 0.5) + (kepala Score × 0.25) + 
              (Certificate Score × 0.15) + (pengaturan Score × 0.10)
```

Grade:
- A+: ≥90
- A: ≥80
- B: ≥70
- C: ≥60
- D: ≥50
- F: <50

## ⚙️ Requirements

- Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- PHP: 7.4+ (untuk backend)
- MySQL: 5.7+ atau MariaDB 10.3+
- HTTPS: TLS 1.3 recommended

## 📄 License

buka Source - MIT License

## 👥 Kontribusi

1. Fork repository
2. Buat branch fitur
3. Commit perubahan
4. Push ke branch
5. Buat Pull permintaan

---

**ConfigProtokol digital** - Mengamankan browsing Anda dengan protokol terkini.

# ConfigProtokol Digital

Sistem Manajemen Protokol Keamanan Browser untuk mengaktifkan seluruh jenis protokol secure di browser menggunakan konfigurasi dari direktori GitHub.

## 📁 Struktur Direktori

```
configprotokol.digital/
├── index.html              # Halaman utama (tampilan seperti media.digital tanpa footer)
├── css/
│   └── style.css          # Stylesheet utama
├── js/
│   └── main.js            # JavaScript untuk interaksi
├── config/
│   └── master_config.json # Konfigurasi master JSON
├── db/
│   └── config_database.sql # Schema database MySQL
├── bin/
│   ├── secure_protocol.bin # File biner protokol keamanan
│   └── browser_config.bin  # File biner konfigurasi browser
├── regex/
│   ├── security_patterns.regex    # Pattern regex keamanan
│   └── protocol_validation.regex  # Pattern validasi protokol
├── formulas/
│   └── activation_formula.cfg     # Formula aktivasi sistem
└── includes/
    └── protocol_handler.php       # Handler PHP untuk protokol
```

## 🔒 Protokol yang Didukung

1. **HTTPS/TLS 1.3** - Enkripsi end-to-end
2. **HSTS** - HTTP Strict Transport Security
3. **CSP** - Content Security Policy
4. **HTTP/2 & HTTP/3** - Protokol modern
5. **WebAuthn** - Autentikasi tanpa password
6. **DoH/DoT** - DNS over HTTPS/TLS

## 🚀 Cara Penggunaan

### 1. Akses Halaman Web
Buka file `index.html` di browser modern untuk melihat antarmuka pengelolaan.

### 2. Konfigurasi Database
```bash
mysql -u root -p < db/config_database.sql
```

### 3. Integrasi PHP
```php
<?php
require_once 'includes/protocol_handler.php';

use ConfigProtokol\Digital\ProtocolHandler;

$handler = new ProtocolHandler();
$status = $handler->getSystemStatus();
print_r($status);
?>
```

### 4. Sinkronisasi GitHub
Konfigurasi terhubung dengan repository GitHub untuk update otomatis:
- URL: `https://github.com/configprotokol/digital`
- Branch: `main`
- Auto-sync: Setiap 3600 detik (1 jam)

## 📊 Fitur Utama

- ✅ Enkripsi End-to-End
- ✅ Validasi Real-time
- ✅ Update Otomatis dari GitHub
- ✅ Multi-Browser Support (Chrome, Firefox, Safari, Edge)
- ✅ Security Headers Lengkap
- ✅ Regex Pattern Validation
- ✅ Formula Aktivasi Dinamis
- ✅ Database Logging & Audit Trail

## 🔧 Konfigurasi

Edit file `config/master_config.json` untuk menyesuaikan:
- Versi protokol minimum
- Cipher suites yang diizinkan
- Security headers
- Browser compatibility settings
- GitHub sync interval

## 📝 Formula Aktivasi

File `formulas/activation_formula.cfg` berisi formula untuk:
- Aktivasi protokol berbasis skor
- Perhitungan security score
- Browser compatibility matrix
- Risk assessment
- Auto-update decision

## 🔍 Pattern Regex

File regex menyediakan pattern untuk:
- Validasi URL dan domain
- Deteksi protokol TLS/SSL
- Security header validation
- Certificate transparency
- Attack detection patterns

## 💾 File Biner

File `.bin` berisi:
- Signature protokol keamanan
- Binary configuration untuk browser
- Executable flags untuk aktivasi

## 🗄️ Database Schema

Schema MySQL mencakup tabel:
- `protocols` - Daftar protokol
- `security_headers` - Header keamanan
- `browser_configs` - Konfigurasi browser
- `github_sync` - Status sinkronisasi
- `activation_logs` - Log aktivasi
- `regex_patterns` - Pattern regex
- `formulas` - Formula sistem

## 🌐 Integrasi GitHub

Untuk sinkronisasi dengan GitHub:

```javascript
// Di main.js sudah terdapat fungsi sync
const githubSync = async () => {
    const response = await fetch('https://api.github.com/repos/configprotokol/digital');
    const data = await response.json();
    console.log('Last update:', data.pushed_at);
};
```

## 📈 Security Score Calculation

Security score dihitung dengan formula:
```
Total Score = (Protocol Score × 0.5) + (Header Score × 0.25) + 
              (Certificate Score × 0.15) + (Configuration Score × 0.10)
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

Open Source - MIT License

## 👥 Kontribusi

1. Fork repository
2. Buat branch fitur
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

---

**ConfigProtokol Digital** - Mengamankan browsing Anda dengan protokol terkini.

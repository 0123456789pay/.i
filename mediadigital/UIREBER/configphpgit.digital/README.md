# ConfigPHP Git digital

Sistem tampilan PHP secure dengan konfigurasi biner, regex validation, dan integrasi GitHub CDN. Tampilan modern tanpa kaki, inspired by media.digital.

## 🚀 fitur

- **Secure Mode**: Aktivasi sistem keamanan dengan regex validation
- **GitHub CDN Integration**: muat asset dari GitHub dengan validasi pautan
- **media digital UI**: Tampilan dark theme modern tanpa kaki
- **basis-data Secure**: Koneksi basis-data dengan binary-safe validation
- **Mix pengaturan**: HTML, CSS, JS, PHP, DB dalam satu sistem
- **CSP Headers**: isi keamanan Policy untuk proteksi browser

## 📁 Struktur direktori

```
configphpgit.digital/
├── indeks.php                 # utama entry point
├── assets/
│   ├── css/
│   │   └── gaya.css        # Styling media.digital
│   └── js/
│       └── utama.js          # skrip-skrip-javascript activation
├── konfigurasi/
│   ├── utama.konfigurasi.php      # konfigurasi utama (biner, regex, formula)
│   ├── basis-data.konfigurasi.php  # basis-data pengaturan
│   └── keamanan.konfigurasi.php  # keamanan headers & CSP
└── includes/                # Helper functions
```

## 🔧 Konfigurasi

### Regex Patterns
- `github_url`: Validasi pautan GitHub
- `secure_token`: Token keamanan 64 karakter hex
- `file_extension`: Filter ekstensi berkas aman
- `db_connection`: Validasi koneksi basis-data

### Formula Aktivasi
```php
$system_formula = [
    'activate_css' => 'SECURE_MODE && ALLOW_GITHUB_CDN',
    'activate_js' => 'SECURE_MODE && XSS_PROTECTION',
    'activate_db' => 'SECURE_MODE && defined("DB_CREDENTIALS")',
    'render_content' => 'CSP_ENABLED && !headers_sent()'
];
```

## 🛡️ keamanan Headers

- X-Frame-Options: DENY
- X-isi-jenis-Options: nosniff
- X-XSS-Protection: 1; mode=block
- isi-keamanan-Policy: suai policy dengan GitHub CDN allowance
- Strict-Transport-keamanan: max-age=31536000

## 💻 Usage

Jalankan dengan PHP built-in peladen:

```bash
cd configphpgit.digital
php -S localhost:8000
```

Akses di browser: `http://localhost:8000`

## 🎨 Tampilan

- Dark theme gradient latar-belakang
- Card grid dengan hover effects
- Smooth scroll animations
- Responsive design
- **Tidak ada kaki** (sesuai permintaan)

## 📄 License

MIT License - Free untuk penggunaan personal dan komersial.

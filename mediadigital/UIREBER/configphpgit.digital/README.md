# ConfigPHP Git Digital

Sistem tampilan PHP secure dengan konfigurasi biner, regex validation, dan integrasi GitHub CDN. Tampilan modern tanpa footer, inspired by media.digital.

## 🚀 Features

- **Secure Mode**: Aktivasi sistem keamanan dengan regex validation
- **GitHub CDN Integration**: Load asset dari GitHub dengan validasi URL
- **Media Digital UI**: Tampilan dark theme modern tanpa footer
- **Database Secure**: Koneksi database dengan binary-safe validation
- **Mix Configuration**: HTML, CSS, JS, PHP, DB dalam satu sistem
- **CSP Headers**: Content Security Policy untuk proteksi browser

## 📁 Struktur Folder

```
configphpgit.digital/
├── index.php                 # Main entry point
├── assets/
│   ├── css/
│   │   └── style.css        # Styling media.digital
│   └── js/
│       └── main.js          # JavaScript activation
├── config/
│   ├── main.config.php      # Config utama (biner, regex, formula)
│   ├── database.config.php  # Database configuration
│   └── security.config.php  # Security headers & CSP
└── includes/                # Helper functions
```

## 🔧 Konfigurasi

### Regex Patterns
- `github_url`: Validasi URL GitHub
- `secure_token`: Token keamanan 64 karakter hex
- `file_extension`: Filter ekstensi file aman
- `db_connection`: Validasi koneksi database

### Formula Aktivasi
```php
$system_formula = [
    'activate_css' => 'SECURE_MODE && ALLOW_GITHUB_CDN',
    'activate_js' => 'SECURE_MODE && XSS_PROTECTION',
    'activate_db' => 'SECURE_MODE && defined("DB_CREDENTIALS")',
    'render_content' => 'CSP_ENABLED && !headers_sent()'
];
```

## 🛡️ Security Headers

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy: Custom policy dengan GitHub CDN allowance
- Strict-Transport-Security: max-age=31536000

## 💻 Usage

Jalankan dengan PHP built-in server:

```bash
cd configphpgit.digital
php -S localhost:8000
```

Akses di browser: `http://localhost:8000`

## 🎨 Tampilan

- Dark theme gradient background
- Card grid dengan hover effects
- Smooth scroll animations
- Responsive design
- **Tidak ada footer** (sesuai request)

## 📄 License

MIT License - Free untuk penggunaan personal dan komersial.

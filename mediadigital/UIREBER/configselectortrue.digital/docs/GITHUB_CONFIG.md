# GitHub Repository pengaturan untuk ConfigSelectorTrue.digital

## .gitignore
```
# OS berkas-berkas
.DS_Store
Thumbs.db

# penyunting berkas-berkas
.vscode/
.idea/
*.swp
*.swo

# catatan berkas-berkas
*.catatan
catatan-catatan/

# basis-data berkas-berkas (Production)
*.db
*.sqlite
!db/schema.sql

# Environment berkas-berkas
.env
.env.local
.env.production

# tembolok
.tembolok/
__pycache__/

# Dependencies
node_modules/
vendor/

# bangun keluaran
dist/
bangun/

# Temporary berkas-berkas
tmp/
temp/
```

## README.md (akar)
```markdown
# ConfigSelectorTrue.digital

Sistem Simbol Inti Selector benar Secure untuk aktivasi di browser.

## 🚀 Fitur

- ✅ Binary pengaturan sistem
- ✅ Regex Pattern Matching
- ✅ Core Formula Calculator
- ✅ Browser Activation
- ✅ Multi-level keamanan
- ✅ PHP Backend API
- ✅ basis-data Schema (SQLite/MySQL)

## 📁 Struktur Project

```
configselectortrue.digital/
├── indeks.html          # utama halaman (media.digital gaya, no kaki)
├── css/gaya.css       # Styling
├── js/utama.js          # Browser activation
├── php/selector.php    # Backend API
├── db/schema.sql       # basis-data schema
├── konfigurasi/             # pengaturan berkas-berkas
│   ├── binary.conf
│   ├── regex.patterns
│   └── core.formula
├── docs/               # Documentation
└── assets/             # media assets
```

## 🔧 Instalasi

### Clone Repository
```bash
git clone https://github.com/username/configselectortrue.digital.git
cd configselectortrue.digital
```

### Setup basis-data
```bash
sqlite3 selector.db < db/schema.sql
```

### jalankan peladen
```bash
# PHP Built-in peladen
php -S localhost:8000

# atau use any web peladen (Apache, Nginx)
```

## 🌐 Penggunaan

1. Buka `http://localhost:8000` di browser
2. Sistem akan otomatis terinisialisasi
3. Cek browser konsol untuk status aktivasi

## 📡 API Endpoints

- `GET /php/selector.php?action=activate` - Activate sistem
- `GET /php/selector.php?action=status` - Get sistem status
- `GET /php/selector.php?action=sahkan&symbol=ALPHA` - sahkan symbol

## 🔒 Keamanan

- Secure mode aktif by bawaan
- 4-level keamanan sistem
- Hash verification (MD5, SHA256)
- Browser compatibility validation

## 📄 License

Proprietary

## 👥 Contributing

1. Fork ini repository
2. buat feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. buka Pull permintaan

## 📞 Support

Untuk bantuan dan informasi lebih lanjut, silakan buat issue di repository ini.
```

## LICENSE
```
Copyright (c) 2024 ConfigSelectorTrue.digital

semua rights reserved.

ini software dan associated documentation berkas-berkas are proprietary dan confidential.
Unauthorized copying, distribution, atau use of ini software is strictly prohibited.
```

## CONTRIBUTING.md
```markdown
# Contributing to ConfigSelectorTrue.digital

Terima kasih atas minat Anda untuk berkontribusi!

## Cara Berkontribusi

1. **Fork** repository ini
2. **Clone** fork Anda
   ```bash
   git clone https://github.com/YOUR_USERNAME/configselectortrue.digital.git
   ```
3. **Buat branch** baru
   ```bash
   git checkout -b feature/nama-fitur
   ```
4. **Commit** perubahan
   ```bash
   git commit -m "Menambahkan fitur baru"
   ```
5. **Push** ke branch
   ```bash
   git push origin feature/nama-fitur
   ```
6. **Buat Pull permintaan**

## Guidelines

- Gunakan kode yang bersih dan terdokumentasi
- Ikuti standar coding yang ada
- uji perubahan Anda sebelum submit
- perbarui dokumentasi jika diperlukan

## Code gaya

- HTML: Semantic HTML5
- CSS: BEM methodology
- skrip-skrip-javascript: ES6+ standards
- PHP: PSR-12 coding standards

## Reporting Issues

Silakan buat issue untuk:
- Bug reports
- Feature requests
- Documentation improvements

Terima kasih atas kontribusi Anda!
```

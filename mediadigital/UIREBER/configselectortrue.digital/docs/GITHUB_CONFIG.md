# GitHub Repository Configuration for ConfigSelectorTrue.Digital

## .gitignore
```
# OS Files
.DS_Store
Thumbs.db

# Editor Files
.vscode/
.idea/
*.swp
*.swo

# Log Files
*.log
logs/

# Database Files (Production)
*.db
*.sqlite
!db/schema.sql

# Environment Files
.env
.env.local
.env.production

# Cache
.cache/
__pycache__/

# Dependencies
node_modules/
vendor/

# Build Output
dist/
build/

# Temporary Files
tmp/
temp/
```

## README.md (Root)
```markdown
# ConfigSelectorTrue.Digital

Sistem Simbol Inti Selector True Secure untuk aktivasi di browser.

## 🚀 Fitur

- ✅ Binary Configuration System
- ✅ Regex Pattern Matching
- ✅ Core Formula Calculator
- ✅ Browser Activation
- ✅ Multi-level Security
- ✅ PHP Backend API
- ✅ Database Schema (SQLite/MySQL)

## 📁 Struktur Project

```
configselectortrue.digital/
├── index.html          # Main page (media.digital style, no footer)
├── css/style.css       # Styling
├── js/main.js          # Browser activation
├── php/selector.php    # Backend API
├── db/schema.sql       # Database schema
├── config/             # Configuration files
│   ├── binary.conf
│   ├── regex.patterns
│   └── core.formula
├── docs/               # Documentation
└── assets/             # Media assets
```

## 🔧 Instalasi

### Clone Repository
```bash
git clone https://github.com/username/configselectortrue.digital.git
cd configselectortrue.digital
```

### Setup Database
```bash
sqlite3 selector.db < db/schema.sql
```

### Run Server
```bash
# PHP Built-in Server
php -S localhost:8000

# Or use any web server (Apache, Nginx)
```

## 🌐 Penggunaan

1. Buka `http://localhost:8000` di browser
2. Sistem akan otomatis terinisialisasi
3. Cek browser console untuk status aktivasi

## 📡 API Endpoints

- `GET /php/selector.php?action=activate` - Activate system
- `GET /php/selector.php?action=status` - Get system status
- `GET /php/selector.php?action=validate&symbol=ALPHA` - Validate symbol

## 🔒 Keamanan

- Secure mode enabled by default
- 4-level security system
- Hash verification (MD5, SHA256)
- Browser compatibility validation

## 📄 License

Proprietary

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

## 📞 Support

Untuk bantuan dan informasi lebih lanjut, silakan buat issue di repository ini.
```

## LICENSE
```
Copyright (c) 2024 ConfigSelectorTrue.Digital

All rights reserved.

This software and associated documentation files are proprietary and confidential.
Unauthorized copying, distribution, or use of this software is strictly prohibited.
```

## CONTRIBUTING.md
```markdown
# Contributing to ConfigSelectorTrue.Digital

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
6. **Buat Pull Request**

## Guidelines

- Gunakan kode yang bersih dan terdokumentasi
- Ikuti standar coding yang ada
- Test perubahan Anda sebelum submit
- Update dokumentasi jika diperlukan

## Code Style

- HTML: Semantic HTML5
- CSS: BEM methodology
- JavaScript: ES6+ standards
- PHP: PSR-12 coding standards

## Reporting Issues

Silakan buat issue untuk:
- Bug reports
- Feature requests
- Documentation improvements

Terima kasih atas kontribusi Anda!
```

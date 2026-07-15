# SoutheastApp Desktop Launcher

Sistem desktop launcher terintegrasi dengan 150+ komponen modular.

## Struktur Folder

```
/workspace/
├── index.html          # File HTML utama
├── index.css           # Stylesheet utama
├── index.js            # JavaScript utama
├── components/         # 150 komponen modular
│   ├── ui-component-*.js (30 files)
│   ├── app-component-*.js (30 files)
│   ├── service-component-*.js (30 files)
│   ├── util-component-*.js (30 files)
│   └── model-component-*.js (30 files)
├── dist/               # Distribution folder
│   ├── bin/            # Binary launcher scripts
│   ├── pages/          # HTML pages
│   ├── config/         # Configuration files
│   ├── assets/         # CSS, images, fonts
│   ├── lib/            # Library modules
│   └── modules/        # Additional modules
├── system/             # System core
│   ├── core/           # Kernel, drivers, memory manager
│   └── drivers/        # Device drivers
└── bypass/             # Bypass system
    ├── patches/        # Security patches
    ├── hooks/          API/FS/Net hooks
    └── filters/        # Content/request filters
```

## Fitur

- **150 Komponen Modular**: UI, App, Service, Utility, Model
- **Multi-Page Support**: 9 halaman terintegrasi
- **Bypass System**: Patches, hooks, dan filters
- **System Core**: Kernel, driver manager, memory manager
- **Konfigurasi Terpusat**: system.json
- **Dukungan Folder Non-Sejejar**: Integrasi penuh dengan folder dist/, system/, bypass/

## Cara Menjalankan

```bash
# Linux/Mac
./dist/bin/launcher.sh

# Atau buka langsung
open index.html
```

## Spesifikasi

- Versi: 1.0.0
- Build: 2024.01.15
- Memori Maksimum: 512MB
- Kuota Disk: 500MB

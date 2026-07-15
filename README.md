# SoutheastApp Desktop Launcher

Sistem desktop launcher terintegrasi dengan komponen modular dalam arsitektur terpusat.

## Struktur Folder

```
/workspace/
├── index.html          # File HTML utama
├── component/          # Komponen modular terpusat
│   ├── component_list.json  # Daftar semua komponen
│   ├── index.html      # Halaman indeks komponen
│   ├── css/            # Stylesheet komponen
│   └── js/             # JavaScript komponen
├── components/         # Komponen dasar (Button, Card, Input, Modal)
├── ai/                 # AI modules
├── css/                # CSS global
├── db/                 # Database files
├── js/                 # JavaScript global
├── php/                # PHP backend
├── postapp/            # Post application modules
├── rag/                # RAG (Retrieval-Augmented Generation)
├── southeastapp/       # Main application
├── srv/                # Service modules
├── trafict/            # Traffic management
├── view/               # View templates
└── *.js, *.css         # Komponen individual (1800+ files)
```

## Fitur

- **1800+ Komponen Individual**: File JS dan CSS terpisah untuk setiap komponen
- **Component Hub**: Folder `component/` sebagai pusat manajemen komponen
- **Multi-Language Support**: Termasuk komponen dengan nama Mandarin (云化，信息化，etc.)
- **Arsitektur Modular**: Setiap komponen berdiri sendiri dengan file .js dan .css
- **Integrasi Penuh**: Mendukung AI, RAG, database, dan backend PHP

## Cara Menjalankan

```bash
# Buka melalui browser
open index.html

# Atau jalankan server lokal
python -m http.server 8000
```

## Spesifikasi

- Versi: 1.0.0
- Build: 2024.01.15
- Total Komponen: 1800+
- Arsitektur: Modular Terdesentralisasi

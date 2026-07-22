# IHBSF Data Storage System

## Struktur Folder

```
/workspace/
├── I/          # Folder I (Index)
│   ├── h/      # Subfolder h
│   ├── t/      # Subfolder t
│   ├── m/      # Subfolder m
│   ├── l/      # File .html disimpan di sini
│   ├── c/      # File .css disimpan di sini
│   ├── s/      # Subfolder s
│   ├── S/      # Subfolder S
│   ├── j/      # File .js disimpan di sini
│   └── `s/     # Subfolder `s
├── H/          # Folder H (Header)
│   └── [struktur sama seperti I]
├── B/          # Folder B (Body)
│   └── [struktur sama seperti I]
├── S/          # Folder S (Section)
│   └── [struktur sama seperti I]
├── F/          # Folder F (Footer)
│   └── [struktur sama seperti I]
└── dataihbsf/  # Penyimpanan data otomatis
    ├── config.json
    └── README.md
```

## Fitur

1. **Organisasi File Otomatis**
   - File `.html` → folder `l`
   - File `.css` → folder `c`
   - File `.js` → folder `j`

2. **Penyimpanan Data**
   - Semua menu dan konfigurasi disimpan di folder `dataihbsf`
   - Auto-save setiap 5 detik
   - Menggunakan localStorage untuk persistensi browser

3. **Navigasi Terhubung**
   - Setiap index.html terhubung ke folder lainnya
   - Menu navigasi otomatis terkonfigurasi

## Penggunaan

Buka file `index.html` di salah satu folder (I, H, B, S, F) untuk mengakses sistem.

## API JavaScript

```javascript
// Simpan data
IHBSF.saveData('key', { data: 'value' });

// Load data
const data = IHBSF.loadData('key');

// Dapatkan folder saat ini
const folder = IHBSF.getCurrentFolder();
```

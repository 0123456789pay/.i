# IHBSF data penyimpanan sistem

## Struktur direktori

```
/workspace/
├── I/          # direktori I (indeks)
│   ├── h/      # Subfolder h
│   ├── t/      # Subfolder t
│   ├── m/      # Subfolder m
│   ├── l/      # berkas .html disimpan di sini
│   ├── c/      # berkas .css disimpan di sini
│   ├── s/      # Subfolder s
│   ├── S/      # Subfolder S
│   ├── j/      # berkas .js disimpan di sini
│   └── `s/     # Subfolder `s
├── H/          # direktori H (kepala)
│   └── [struktur sama seperti I]
├── B/          # direktori B (Body)
│   └── [struktur sama seperti I]
├── S/          # direktori S (bagian)
│   └── [struktur sama seperti I]
├── F/          # direktori F (kaki)
│   └── [struktur sama seperti I]
└── dataihbsf/  # Penyimpanan data otomatis
    ├── konfigurasi.json
    └── README.md
```

## Fitur

1. **Organisasi berkas Otomatis**
   - berkas `.html` → direktori `l`
   - berkas `.css` → direktori `c`
   - berkas `.js` → direktori `j`

2. **Penyimpanan data**
   - Semua menu dan konfigurasi disimpan di direktori `dataihbsf`
   - otomatis-simpan setiap 5 detik
   - Menggunakan localStorage untuk persistensi browser

3. **Navigasi Terhubung**
   - Setiap indeks.html terhubung ke direktori lainnya
   - Menu navigasi otomatis terkonfigurasi

## Penggunaan

Buka berkas `indeks.html` di salah satu direktori (I, H, B, S, F) untuk mengakses sistem.

## API skrip-skrip-javascript

```skrip-skrip-javascript
// Simpan data
IHBSF.saveData('kunci', { data: 'nilai' });

// muat data
const data = IHBSF.loadData('kunci');

// Dapatkan direktori saat ini
const direktori = IHBSF.getCurrentFolder();
```

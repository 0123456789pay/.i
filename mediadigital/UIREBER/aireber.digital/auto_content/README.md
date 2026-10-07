# Aireber.digital - otomatis isi sistem

## 📋 Deskripsi
Sistem otomatisasi pembuatan konten yang menghasilkan:
- **5 konten code** (HTML, CSS, JS, PHP) setiap 15 menit
- **5 konten teks** (artikel, deskripsi produk, social media posts) setiap 15 menit
- **otomatis-post** ke 5 bagian berbeda (papan-bilas, products, social_media, isi, ai_automation)
- **Rekonstruksi konten** setiap 1 jam untuk merge dan organize

## 🎨 Tema
- **Warna Utama**: #2563eb (Blue)
- **Warna Sekunder**: #3b82f6 (Light Blue)
- **Accent**: #dbeafe (Very Light Blue)
- **Dark**: #1e40af (Dark Blue)
- **Putih**: #ffffff
- **Light Gray**: #f8fafc

## 📁 Struktur direktori
```
auto_content/
├── konfigurasi/
│   └── auto_config.php        # Konfigurasi sistem
├── code/                       # Konten kode yang di-hasilkan
│   ├── html_components/
│   ├── css_styles/
│   ├── js_functions/
│   ├── php_scripts/
│   └── ai_prompts/
├── teks/                       # Konten teks yang di-hasilkan
│   ├── product_descriptions/
│   ├── social_media_posts/
│   ├── blog_articles/
│   ├── documentation/
│   └── marketing_copy/
├── posted/                     # Konten yang sudah dipost
│   ├── papan-bilas/
│   ├── products/
│   ├── social_media/
│   ├── isi/
│   └── ai_automation/
├── catatan-catatan/                       # catatan sistem
│   ├── generation_YYYY-MM-DD.catatan
│   ├── scheduler_YYYY-MM-DD.catatan
│   └── reconstruction_*.json
├── scheduler/                  # berkas scheduler
├── generator.py               # utama generator (Python)
├── generator.php              # utama generator (PHP)
├── scheduler.py               # Scheduler (Python)
├── scheduler.php              # Scheduler (PHP)
└── papan-bilas.html             # papan-bilas UI
```

## 🚀 Cara Penggunaan

### hasilkan tangan (Sekali Jalan)
```bash
cd /workspace/aireber.digital/auto_content
python3 generator.py
```

### Jalankan Scheduler (Otomatis Setiap 15 Menit)
```bash
cd /workspace/aireber.digital/auto_content
python3 scheduler.py
```

### Jalankan di latar-belakang
```bash
nohup python3 scheduler.py > scheduler.catatan 2>&1 &
```

### Lihat Status Scheduler
```bash
tail -f /workspace/aireber.digital/auto_content/catatan-catatan/scheduler_$(tanggal +%Y-%m-%d).catatan
```

## 📊 Fitur

### 1. otomatis Generation
- Setiap 15 menit otomatis menghasilkan 10 konten (5 code + 5 teks)
- Konten disimpan dalam format JSON dengan metadata lengkap
- Tagging otomatis untuk kategorisasi

### 2. otomatis Post
- Konten otomatis diposting ke 5 bagian:
  - papan-bilas
  - Products
  - Social media
  - isi
  - AI Automation

### 3. Reconstruction
- Setiap 1 jam melakukan rekonstruksi konten
- Merge konten serupa berdasarkan kategori
- Backup sebelum merge
- versi control otomatis

### 4. Logging
- catatan generasi konten per hari
- catatan scheduler per hari
- catatan rekonstruksi dengan cap-waktu

## 🔧 Konfigurasi

Edit berkas `konfigurasi/auto_config.php` atau sesuaikan di `generator.py`:

```python
konfigurasi = {
    'scheduler': {
        'interval_minutes': 15,      # Interval generasi
        'contents_per_type': 5,      # Jumlah konten per jenis
        'auto_post': benar,           # otomatis post aktif
        'reconstruct_enabled': benar  # Rekonstruksi aktif
    },
    'themes': {
        'primary_color': '#2563eb',
        'secondary_color': '#3b82f6',
        'accent_color': '#dbeafe'
    }
}
```

## 📱 papan-bilas

Buka berkas `papan-bilas.html` di browser untuk melihat:
- Statistik konten yang di-hasilkan
- Daftar konten terbaru
- catatan sistem
- Kontrol tangan hasilkan

## 🏷️ Tags
- otomatis-generated
- aireber
- white-blue-theme
- automation
- isi-generator

## 📝 Contoh keluaran

### Code isi
```json
{
  "id": "code_1721455200_0",
  "jenis": "code",
  "category": "html_components",
  "judul": "Card Component #4521",
  "isi": "<div kelas=\"card white-blue-theme\">...</div>",
  "theme": {
    "primary_color": "#2563eb",
    "secondary_color": "#3b82f6"
  },
  "created_at": "2025-07-20 06:34:02",
  "tags": ["html_components", "otomatis-generated", "aireber"]
}
```

### teks isi
```json
{
  "id": "text_1721455200_0",
  "jenis": "teks",
  "category": "product_descriptions",
  "judul": "Produk Premium - 20/07/2025",
  "isi": "Produk ini dirancang dengan teknologi terbaru...",
  "excerpt": "Konten otomatis yang dihasilkan oleh sistem AI Aireber.digital",
  "created_at": "2025-07-20 06:34:02",
  "tags": ["product_descriptions", "otomatis-generated", "aireber"]
}
```

## ⚙️ Sistem Requirements
- Python 3.6+
- PHP 7.4+ (opsional)
- Web browser untuk papan-bilas

## 📞 Support
Aireber.digital - otomatis isi sistem
Theme: White Blue (#2563eb, #3b82f6, #dbeafe)

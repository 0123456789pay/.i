# Aireber.digital - Auto Content System

## 📋 Deskripsi
Sistem otomatisasi pembuatan konten yang menghasilkan:
- **5 konten code** (HTML, CSS, JS, PHP) setiap 15 menit
- **5 konten text** (artikel, deskripsi produk, social media posts) setiap 15 menit
- **Auto-post** ke 5 section berbeda (dashboard, products, social_media, content, ai_automation)
- **Rekonstruksi konten** setiap 1 jam untuk merge dan organize

## 🎨 Tema
- **Warna Utama**: #2563eb (Blue)
- **Warna Sekunder**: #3b82f6 (Light Blue)
- **Accent**: #dbeafe (Very Light Blue)
- **Dark**: #1e40af (Dark Blue)
- **Putih**: #ffffff
- **Light Gray**: #f8fafc

## 📁 Struktur Folder
```
auto_content/
├── config/
│   └── auto_config.php        # Konfigurasi sistem
├── code/                       # Konten kode yang di-generate
│   ├── html_components/
│   ├── css_styles/
│   ├── js_functions/
│   ├── php_scripts/
│   └── ai_prompts/
├── text/                       # Konten teks yang di-generate
│   ├── product_descriptions/
│   ├── social_media_posts/
│   ├── blog_articles/
│   ├── documentation/
│   └── marketing_copy/
├── posted/                     # Konten yang sudah dipost
│   ├── dashboard/
│   ├── products/
│   ├── social_media/
│   ├── content/
│   └── ai_automation/
├── logs/                       # Log sistem
│   ├── generation_YYYY-MM-DD.log
│   ├── scheduler_YYYY-MM-DD.log
│   └── reconstruction_*.json
├── scheduler/                  # File scheduler
├── generator.py               # Main generator (Python)
├── generator.php              # Main generator (PHP)
├── scheduler.py               # Scheduler (Python)
├── scheduler.php              # Scheduler (PHP)
└── dashboard.html             # Dashboard UI
```

## 🚀 Cara Penggunaan

### Generate Manual (Sekali Jalan)
```bash
cd /workspace/aireber.digital/auto_content
python3 generator.py
```

### Jalankan Scheduler (Otomatis Setiap 15 Menit)
```bash
cd /workspace/aireber.digital/auto_content
python3 scheduler.py
```

### Jalankan di Background
```bash
nohup python3 scheduler.py > scheduler.log 2>&1 &
```

### Lihat Status Scheduler
```bash
tail -f /workspace/aireber.digital/auto_content/logs/scheduler_$(date +%Y-%m-%d).log
```

## 📊 Fitur

### 1. Auto Generation
- Setiap 15 menit otomatis menghasilkan 10 konten (5 code + 5 text)
- Konten disimpan dalam format JSON dengan metadata lengkap
- Tagging otomatis untuk kategorisasi

### 2. Auto Post
- Konten otomatis diposting ke 5 section:
  - Dashboard
  - Products
  - Social Media
  - Content
  - AI Automation

### 3. Reconstruction
- Setiap 1 jam melakukan rekonstruksi konten
- Merge konten serupa berdasarkan kategori
- Backup sebelum merge
- Version control otomatis

### 4. Logging
- Log generasi konten per hari
- Log scheduler per hari
- Log rekonstruksi dengan timestamp

## 🔧 Konfigurasi

Edit file `config/auto_config.php` atau sesuaikan di `generator.py`:

```python
config = {
    'scheduler': {
        'interval_minutes': 15,      # Interval generasi
        'contents_per_type': 5,      # Jumlah konten per jenis
        'auto_post': True,           # Auto post enabled
        'reconstruct_enabled': True  # Rekonstruksi enabled
    },
    'themes': {
        'primary_color': '#2563eb',
        'secondary_color': '#3b82f6',
        'accent_color': '#dbeafe'
    }
}
```

## 📱 Dashboard

Buka file `dashboard.html` di browser untuk melihat:
- Statistik konten yang di-generate
- Daftar konten terbaru
- Log sistem
- Kontrol manual generate

## 🏷️ Tags
- auto-generated
- aireber
- white-blue-theme
- automation
- content-generator

## 📝 Contoh Output

### Code Content
```json
{
  "id": "code_1721455200_0",
  "type": "code",
  "category": "html_components",
  "title": "Card Component #4521",
  "content": "<div class=\"card white-blue-theme\">...</div>",
  "theme": {
    "primary_color": "#2563eb",
    "secondary_color": "#3b82f6"
  },
  "created_at": "2025-07-20 06:34:02",
  "tags": ["html_components", "auto-generated", "aireber"]
}
```

### Text Content
```json
{
  "id": "text_1721455200_0",
  "type": "text",
  "category": "product_descriptions",
  "title": "Produk Premium - 20/07/2025",
  "content": "Produk ini dirancang dengan teknologi terbaru...",
  "excerpt": "Konten otomatis yang dihasilkan oleh sistem AI Aireber.digital",
  "created_at": "2025-07-20 06:34:02",
  "tags": ["product_descriptions", "auto-generated", "aireber"]
}
```

## ⚙️ Sistem Requirements
- Python 3.6+
- PHP 7.4+ (opsional)
- Web browser untuk dashboard

## 📞 Support
Aireber.digital - Auto Content System
Theme: White Blue (#2563eb, #3b82f6, #dbeafe)

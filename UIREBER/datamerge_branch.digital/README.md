# DataMerge Branch Digital - Sistem Monitoring Terintegrasi

## 📋 Deskripsi
Sistem monitoring perubahan data yang terintegrasi dengan Git/GitHub, AI (Qwen, Chat AI, Coder AI), dan terminal. Semua perubahan dicatat dalam file `.log` dan disimpan dalam struktur folder yang terorganisir.

## 📁 Struktur Folder

```
datamerge_branch.digital/
├── sub_commit/      # Log untuk sub commit Git
├── pull/            # Log untuk pull requests
├── merge/           # Log untuk operasi merge
├── datainput/       # Data input yang diterima (.log)
├── dataoutput/      # Data output yang dihasilkan (.log)
├── barisinput/      # Tracking jumlah baris input
├── barisoutput/     # Tracking jumlah baris output
├── index.html       # Dashboard monitoring (putih-biru)
├── monitor.py       # Script monitoring utama
├── config.json      # Konfigurasi sistem
└── system.log       # Master log semua aktivitas
```

## 🚀 Fitur Utama

### 1. **Monitoring Real-time**
- Deteksi otomatis perubahan Git
- Tracking data input/output
- Pencatatan jumlah baris data

### 2. **Integrasi AI**
- Mendukung Qwen AI
- Mendukung Chat AI
- Mendukung Coder AI
- Semua prompt dan response dicatat

### 3. **Penyimpanan Log**
- Format: `.log` files (JSON)
- Timestamp ISO 8601
- Hash data untuk integritas
- Mudah dicari dan dianalisis

### 4. **Dashboard Web**
- Tampilan putih-biru modern
- Traffic chart interaktif
- Log viewer real-time
- Statistik lengkap

### 5. **Migrasi Data**
- Siap migrasi ke penyimpanan kapasitas besar
- Export function terintegrasi
- Backup otomatis

## 💻 Cara Penggunaan

### Inisialisasi
```bash
cd /workspace/datamerge_branch.digital
python3 monitor.py
```

### Track Data Input
```python
from monitor import DataMergeMonitor

monitor = DataMergeMonitor()
monitor.track_data_input("Data contoh", source="manual")
```

### Track Data Output
```python
monitor.track_data_output("Hasil processing", source="AI_response")
```

### Track Pull Request
```python
monitor.track_pull_request({
    "id": 1,
    "title": "Feature update",
    "author": "username"
})
```

### Track Merge
```python
monitor.track_merge({
    "branch": "main",
    "merged_by": "username",
    "commit": "abc123"
})
```

### Deteksi Perubahan Git
```python
monitor.detect_git_changes()
```

### Dapatkan Statistik
```python
stats = monitor.get_statistics()
print(stats)
```

### Export untuk Migrasi
```python
monitor.export_for_migration("/path/to/large/storage")
```

## 🔧 Konfigurasi

Edit `config.json` untuk menyesuaikan:

```json
{
  "monitoring_enabled": true,
  "github_sync": true,
  "ai_integration": ["Qwen", "Chat AI", "Coder AI"],
  "log_retention_days": 365,
  "auto_backup": true
}
```

## 📊 Dashboard

Buka `index.html` di browser untuk melihat:
- Dashboard statistik real-time
- Traffic chart perubahan data
- Log viewer aktivitas terbaru
- Struktur folder monitoring
- Konfigurasi sistem

## 🔗 Integrasi GitHub

Untuk menyimpan log di GitHub repository:

```bash
# Commit perubahan
git add datamerge_branch.digital/
git commit -m "Add monitoring logs"
git push origin main
```

## 📝 Format Log

Setiap file log memiliki format JSON:

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "category": "datainput",
  "message": "Data input tracked",
  "data": {
    "hash": "abc123",
    "lines": 10,
    "source": "manual"
  }
}
```

## 🎯 Use Cases

1. **Development Tracking**: Monitor semua perubahan kode
2. **AI Interaction Logging**: Catat semua prompt dan response AI
3. **Data Pipeline Monitoring**: Track input/output data processing
4. **Version Control Audit**: Audit trail untuk Git operations
5. **RAG System Support**: Data untuk training/response AI

## 📈 Statistik

Sistem menyediakan statistik:
- Jumlah file per kategori
- Total baris input/output
- Timeline perubahan
- Aktivitas terbaru

## ⚙️ Sistem Requirements

- Python 3.7+
- Browser modern (untuk dashboard)
- Git (opsional, untuk version control)
- GitHub account (opsional, untuk remote storage)

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository GitHub.

---

**Dibuat dengan ❤️ untuk monitoring data terintegrasi**

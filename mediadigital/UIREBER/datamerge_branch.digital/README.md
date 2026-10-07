# DataMerge Branch digital - Sistem Monitoring Terintegrasi

## 📋 Deskripsi
Sistem monitoring perubahan data yang terintegrasi dengan Git/GitHub, AI (Qwen, Chat AI, Coder AI), dan terminal. Semua perubahan dicatat dalam berkas `.catatan` dan disimpan dalam struktur direktori yang terorganisir.

## 📁 Struktur direktori

```
datamerge_branch.digital/
├── sub_commit/      # catatan untuk sub commit Git
├── pull/            # catatan untuk pull requests
├── merge/           # catatan untuk operasi merge
├── datainput/       # data masukan yang diterima (.catatan)
├── dataoutput/      # data keluaran yang dihasilkan (.catatan)
├── barisinput/      # Tracking jumlah baris masukan
├── barisoutput/     # Tracking jumlah baris keluaran
├── indeks.html       # papan-bilas monitoring (putih-biru)
├── monitor.py       # skrip monitoring utama
├── konfigurasi.json      # Konfigurasi sistem
└── sistem.catatan       # Master catatan semua aktivitas
```

## 🚀 Fitur Utama

### 1. **Monitoring Real-waktu**
- Deteksi otomatis perubahan Git
- Tracking data masukan/keluaran
- Pencatatan jumlah baris data

### 2. **Integrasi AI**
- Mendukung Qwen AI
- Mendukung Chat AI
- Mendukung Coder AI
- Semua sapa dan jawaban dicatat

### 3. **Penyimpanan catatan**
- Format: `.catatan` berkas-berkas (JSON)
- cap-waktu ISO 8601
- Hash data untuk integritas
- Mudah dicari dan dianalisis

### 4. **papan-bilas Web**
- Tampilan putih-biru modern
- Traffic chart interaktif
- catatan penanggap real-waktu
- Statistik lengkap

### 5. **Migrasi data**
- Siap migrasi ke penyimpanan kapasitas besar
- Export fungsi terintegrasi
- Backup otomatis

## 💻 Cara Penggunaan

### Inisialisasi
```bash
cd /workspace/datamerge_branch.digital
python3 monitor.py
```

### Track data masukan
```python
dari monitor import DataMergeMonitor

monitor = DataMergeMonitor()
monitor.track_data_input("data contoh", source="tangan")
```

### Track data keluaran
```python
monitor.track_data_output("Hasil processing", source="AI_response")
```

### Track Pull permintaan
```python
monitor.track_pull_request({
    "id": 1,
    "judul": "Feature perbarui",
    "author": "username"
})
```

### Track Merge
```python
monitor.track_merge({
    "branch": "utama",
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
monitor.export_for_migration("/jalur/to/large/penyimpanan")
```

## 🔧 Konfigurasi

Edit `konfigurasi.json` untuk menyesuaikan:

```json
{
  "monitoring_enabled": benar,
  "github_sync": benar,
  "ai_integration": ["Qwen", "Chat AI", "Coder AI"],
  "log_retention_days": 365,
  "auto_backup": benar
}
```

## 📊 papan-bilas

Buka `indeks.html` di browser untuk melihat:
- papan-bilas statistik real-waktu
- Traffic chart perubahan data
- catatan penanggap aktivitas terbaru
- Struktur direktori monitoring
- Konfigurasi sistem

## 🔗 Integrasi GitHub

Untuk menyimpan catatan di GitHub repository:

```bash
# Commit perubahan
git add datamerge_branch.digital/
git commit -m "Add monitoring catatan-catatan"
git push origin utama
```

## 📝 Format catatan

Setiap berkas catatan memiliki format JSON:

```json
{
  "cap-waktu": "2024-01-01T12:00:00",
  "category": "datainput",
  "pesan": "data masukan tracked",
  "data": {
    "hash": "abc123",
    "lines": 10,
    "source": "tangan"
  }
}
```

## 🎯 Use Cases

1. **Development Tracking**: Monitor semua perubahan kode
2. **AI Interaction Logging**: Catat semua sapa dan jawaban AI
3. **data Pipeline Monitoring**: Track masukan/keluaran data processing
4. **versi Control Audit**: Audit trail untuk Git operations
5. **RAG sistem Support**: data untuk training/jawaban AI

## 📈 Statistik

Sistem menyediakan statistik:
- Jumlah berkas per kategori
- jumlah baris masukan/keluaran
- Timeline perubahan
- Aktivitas terbaru

## ⚙️ Sistem Requirements

- Python 3.7+
- Browser modern (untuk papan-bilas)
- Git (opsional, untuk versi control)
- GitHub rekening (opsional, untuk remote penyimpanan)

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository GitHub.

---

**Dibuat dengan ❤️ untuk monitoring data terintegrasi**

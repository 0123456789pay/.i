# dataihbsf - Iconer AI Data Storage

Folder ini digunakan untuk menyimpan dan mengelola data sesi chat Iconer AI.

## Struktur File

- `iconer_ai_export_*.json` - File export sesi chat
- `iconer_ai_import_*.json` - File import sesi chat

## Fitur

1. **Export Sesi Chat**: Menyimpan semua sesi chat ke file JSON
2. **Import Sesi Chat**: Memuat sesi chat dari file JSON
3. **Auto-save**: Sesi chat otomatis disimpan ke localStorage browser

## Cara Menggunakan

### Export
- Klik tombol "Export ke dataihbsf" di panel Iconer AI
- File JSON akan diunduh ke komputer Anda
- Simpan file di folder ini untuk referensi masa depan

### Import
- Klik tombol "Import dari dataihbsf" di panel Iconer AI
- Pilih file JSON dari folder ini
- Sesi chat akan dimuat ke dalam sistem

## Format Data

```json
{
  "exportedAt": "2024-01-01T00:00:00.000Z",
  "sessions": [
    {
      "id": "session_1234567890",
      "name": "Sesi Baru - 1/1/2024",
      "messages": [
        {"role": "user", "content": "Halo", "timestamp": "..."},
        {"role": "assistant", "content": "Hai! Ada yang bisa saya bantu?", "timestamp": "..."}
      ],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "systemInfo": {
    "version": "1.0",
    "platform": "ALLUNIVERS ICONER"
  }
}
```

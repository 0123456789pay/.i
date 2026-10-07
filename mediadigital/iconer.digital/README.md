# ALLUNIVERS ICONER - Sistem data Terpadu

## 📁 Struktur direktori

```
iconer.digital/
├── i.iframe.identifier.iconer/    # Module Identifier untuk iframe
│   ├── identifier.js
│   └── indeks.html
│
├── h.kepala.iconer/               # Module kepala Component
│   ├── kepala.js
│   └── indeks.html
│
├── b.body.iconer/                 # Module Body isi pengendali
│   ├── body.js
│   └── indeks.html
│
├── s.bagian.satu.iconer/         # Module bagian Pertama
│   ├── bagian.js
│   └── indeks.html
│
├── f.kaki.iconer/               # Module kaki Component
│   ├── kaki.js
│   └── indeks.html
│
├── data.penyimpanan/                  # Sistem Penyimpanan data
│   ├── dataManager.js             # Manager utama data penyimpanan
│   ├── user_register/             # data registrasi pengguna
│   ├── icon_designs_backup/       # Backup desain ikon
│   ├── sales_data/                # data penjualan
│   ├── financial_data/            # data keuangan
│   └── traffic_data/              # data traffic
│
└── pengelola.commands/                # Command Center Administrator
    ├── adminSystem.js             # Sistem command owner/pengelola
    └── indeks.html                 # Interface command center
```

## 🗄️ Jenis data yang Dikelola

### 1. pengguna daftar (`user_register`)
- data pendaftaran pengguna baru
- Informasi profil pengguna
- autentikasi data
- pengguna preferences

### 2. ikon Designs Backup (`icon_designs_backup`)
- Desain ikon yang dibuat pengguna
- Backup otomatis desain
- versi history
- Export/import designs

### 3. Sales data (`sales_data`)
- Transaksi penjualan ikon
- pesanan history
- Customer purchases
- Sales analytics

### 4. Financial data (`financial_data`)
- Pendapatan dan pengeluaran
- Laporan keuangan
- pembayaran records
- Financial reports

### 5. Traffic data (`traffic_data`)
- Kunjungan website
- halaman views
- pengguna behavior
- Analytics data

## 🎛️ Administrator Commands

### masuk sebagai pengelola
```
pengelola.masuk --username owner
pengelola.masuk --username administrator
```

### pengguna pengelolaan
```
pengguna.senarai                              # Lihat semua pengguna
pengguna.add --username <nama> --sur-el <sur-el>  # Tambah pengguna
pengguna.get --userId <id>                 # Lihat detail pengguna
```

### ikon Design pengelolaan
```
ikon.simpan --nama <nama> --data <data>  # Simpan desain
ikon.backup                            # Backup semua desain
ikon.get --designId <id>               # Ambil desain tertentu
```

### Sales pengelolaan
```
sale.record --amount <amount> --itemId <id>  # Catat penjualan
sale.report --startDate <tanggal> --endDate <tanggal>  # Laporan penjualan
```

### Financial pengelolaan
```
finance.record --amount <amount> --jenis <jenis>  # Catat transaksi
finance.report --period <period>       # Laporan keuangan
```

### Traffic Analytics
```
traffic.record --halaman <halaman> --visitor <id>  # Catat kunjungan
traffic.analytics --timeRange <range>  # Analitik traffic
```

### sistem Commands
```
sistem.status                          # Cek status sistem
sistem.clear --jenis <jenis>             # Hapus data tertentu
bantuan                                   # Lihat bantuan
```

### pengelola Commands
```
pengelola.logout                           # Logout dari pengelola
pengelola.history                          # Riwayat command
```

## 🔧 Cara Menggunakan

### 1. Akses pengelola Command Center
Buka berkas: `iconer.digital/pengelola.commands/indeks.html`

### 2. masuk sebagai Owner/Administrator
```
pengelola.masuk --username owner
```

### 3. Jalankan Command
Ketik command di terminal atau gunakan quick commands yang tersedia.

## 📊 Integrasi dengan indeks.html

Sistem ini dirancang untuk terintegrasi dengan `indeks.html ALLUNIVERS ICONER` 
dan dapat menerima masukan data dari halaman utama melalui:

- borang registration → `user_register`
- ikon creator → `icon_designs_backup`
- Marketplace transactions → `sales_data`
- pembayaran gateway → `financial_data`
- Analytics tracker → `traffic_data`

## 🚀 Fitur Utama

✅ **Modular Architecture** - Setiap komponen terpisah dan reusable
✅ **Real-waktu data penyimpanan** - Penyimpanan data real-waktu menggunakan localStorage
✅ **pengelola Command sistem** - Interface command line untuk administrator
✅ **data Backup** - Backup otomatis untuk desain ikon
✅ **Analytics Ready** - Tracking traffic dan pengguna behavior
✅ **Financial Tracking** - Pencatatan transaksi keuangan lengkap
✅ **Multi-pengguna Support** - Manajemen multiple para pengguna dan roles

---

**ALLUNIVERS ICONER** © 2024
Sistem data Terpadu untuk landasan ikon Maker & Marketplace

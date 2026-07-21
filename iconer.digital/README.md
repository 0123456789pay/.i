# ALLUNIVERS ICONER - Sistem Data Terpadu

## 📁 Struktur Folder

```
iconer.digital/
├── i.iframe.identifier.iconer/    # Module Identifier untuk iframe
│   ├── identifier.js
│   └── index.html
│
├── h.header.iconer/               # Module Header Component
│   ├── header.js
│   └── index.html
│
├── b.body.iconer/                 # Module Body Content Handler
│   ├── body.js
│   └── index.html
│
├── s.section.satu.iconer/         # Module Section Pertama
│   ├── section.js
│   └── index.html
│
├── f.footer.iconer/               # Module Footer Component
│   ├── footer.js
│   └── index.html
│
├── data.storage/                  # Sistem Penyimpanan Data
│   ├── dataManager.js             # Manager utama data storage
│   ├── user_register/             # Data registrasi pengguna
│   ├── icon_designs_backup/       # Backup desain icon
│   ├── sales_data/                # Data penjualan
│   ├── financial_data/            # Data keuangan
│   └── traffic_data/              # Data traffic
│
└── admin.commands/                # Command Center Administrator
    ├── adminSystem.js             # Sistem command owner/admin
    └── index.html                 # Interface command center
```

## 🗄️ Jenis Data yang Dikelola

### 1. User Register (`user_register`)
- Data pendaftaran pengguna baru
- Informasi profil user
- Authentication data
- User preferences

### 2. Icon Designs Backup (`icon_designs_backup`)
- Desain icon yang dibuat user
- Backup otomatis desain
- Version history
- Export/import designs

### 3. Sales Data (`sales_data`)
- Transaksi penjualan icon
- Order history
- Customer purchases
- Sales analytics

### 4. Financial Data (`financial_data`)
- Pendapatan dan pengeluaran
- Laporan keuangan
- Payment records
- Financial reports

### 5. Traffic Data (`traffic_data`)
- Kunjungan website
- Page views
- User behavior
- Analytics data

## 🎛️ Administrator Commands

### Login sebagai Admin
```
admin.login --username owner
admin.login --username administrator
```

### User Management
```
user.list                              # Lihat semua user
user.add --username <name> --email <email>  # Tambah user
user.get --userId <id>                 # Lihat detail user
```

### Icon Design Management
```
icon.save --name <name> --data <data>  # Simpan desain
icon.backup                            # Backup semua desain
icon.get --designId <id>               # Ambil desain tertentu
```

### Sales Management
```
sale.record --amount <amount> --itemId <id>  # Catat penjualan
sale.report --startDate <date> --endDate <date>  # Laporan penjualan
```

### Financial Management
```
finance.record --amount <amount> --type <type>  # Catat transaksi
finance.report --period <period>       # Laporan keuangan
```

### Traffic Analytics
```
traffic.record --page <page> --visitor <id>  # Catat kunjungan
traffic.analytics --timeRange <range>  # Analitik traffic
```

### System Commands
```
system.status                          # Cek status sistem
system.clear --type <type>             # Hapus data tertentu
help                                   # Lihat bantuan
```

### Admin Commands
```
admin.logout                           # Logout dari admin
admin.history                          # Riwayat command
```

## 🔧 Cara Menggunakan

### 1. Akses Admin Command Center
Buka file: `iconer.digital/admin.commands/index.html`

### 2. Login sebagai Owner/Administrator
```
admin.login --username owner
```

### 3. Jalankan Command
Ketik command di terminal atau gunakan quick commands yang tersedia.

## 📊 Integrasi dengan index.html

Sistem ini dirancang untuk terintegrasi dengan `index.html ALLUNIVERS ICONER` 
dan dapat menerima input data dari halaman utama melalui:

- Form registration → `user_register`
- Icon creator → `icon_designs_backup`
- Marketplace transactions → `sales_data`
- Payment gateway → `financial_data`
- Analytics tracker → `traffic_data`

## 🚀 Fitur Utama

✅ **Modular Architecture** - Setiap komponen terpisah dan reusable
✅ **Real-time Data Storage** - Penyimpanan data real-time menggunakan localStorage
✅ **Admin Command System** - Interface command line untuk administrator
✅ **Data Backup** - Backup otomatis untuk desain icon
✅ **Analytics Ready** - Tracking traffic dan user behavior
✅ **Financial Tracking** - Pencatatan transaksi keuangan lengkap
✅ **Multi-user Support** - Manajemen multiple users dan roles

---

**ALLUNIVERS ICONER** © 2024
Sistem Data Terpadu untuk Platform Icon Maker & Marketplace

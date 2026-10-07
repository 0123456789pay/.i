# digital sistem - White & Blue Theme

## 📁 Struktur direktori

```
/workspace/digital/
├── digital-sistem.css      # Master CSS dengan tema putih-biru
├── digital-sistem.js       # Master skrip-skrip-javascript dengan komponen lengkap
├── batch-inject.py         # skrip untuk menyuntikkan CSS/JS ke semua HTML
└── batch-process.catatan       # catatan proses batch
```

## ✨ Fitur digital sistem

### CSS (digital-sistem.css)
- **Tema Putih-Biru** yang konsisten dan modern
- **Variable CSS** untuk customisasi mudah
- **Komponen UI Lengkap**:
  - Cards dengan hover effects
  - Buttons (primary, outline, sizes)
  - masukan forms dengan focus states
  - Tables dengan sorting
  - Modals dengan animasi
  - Alerts (info, berhasil, peringatan)
  - Navigation bars
  - Grid sistem (2, 3, 4 kolom)
  - Loading spinners
  - Tooltips
- **Responsive Design** untuk mobile & desktop
- **suai Scrollbar** biru
- **Utility Classes** untuk tata letak cepat

### skrip-skrip-javascript (digital-sistem.js)
- **DigitalSystem Namespace** dengan fitur lengkap:
  - otomatis-initialization
  - Modal pengelolaan (buka/tutup)
  - borang handling & validation
  - tabel sorting
  - Keyboard shortcuts (ESC, Ctrl+K)
  - Tooltip sistem
  - siaga notifications
  - Accessibility support (screen reader)
- **DigitalComponents Module**:
  - Card component builder
  - tombol component builder
  - masukan component builder
  - Modal component builder
  - tabel component builder
- **Utility Functions**:
  - generateId()
  - formatDate()
  - formatCurrency()
  - debounce()
  - throttle()

## 🚀 Cara Penggunaan

### 1. Menyuntikkan ke berkas HTML

skrip batch akan otomatis menambahkan CSS dan JS ke semua berkas HTML:

```bash
python3 /workspace/digital/batch-inject.py
```

### 2. tangan Integration

Tambahkan ke `<head>` berkas HTML Anda:

```html
<tautan rel="lembar gaya" href="../digital/digital-sistem.css">
```

Tambahkan sebelum `</body>`:

```html
<skrip src="../digital/digital-sistem.js"></skrip>
```

### 3. Menggunakan Komponen

#### Card Component
```skrip-skrip-javascript
const card = DigitalComponents.Card.buat(
    'Judul Card',
    '<p>Isi konten</p>',
    {
        id: 'my-card',
        actions: [
            { label: 'Action', pengendali: () => siaga('Clicked!') }
        ]
    }
);
dokumen.body.appendChild(card);
```

#### Modal Component
```skrip-skrip-javascript
const modal = DigitalComponents.Modal.buat(
    'modal-id',
    'Judul Modal',
    '<p>Konten modal</p>'
);
dokumen.body.appendChild(modal);
DigitalSystem.openModal('modal-id');
```

#### tombol Component
```skrip-skrip-javascript
const btn = DigitalComponents.tombol.buat(
    'Klik Saya',
    { 
        variant: 'btn-digital-outline',
        onClick: () => siaga('halo!')
    }
);
```

#### tabel Component
```skrip-skrip-javascript
const tabel = DigitalComponents.tabel.buat(
    [
        { label: 'Nama', kunci: 'nama', sortable: benar },
        { label: 'Umur', kunci: 'age' }
    ],
    [
        { nama: 'Andi', age: 25 },
        { nama: 'Budi', age: 30 }
    ]
);
```

### 4. Utility Functions

```skrip-skrip-javascript
// hasilkan ID unik
const id = DigitalSystem.generateId('prefix');

// Format tanggal
const dateStr = DigitalSystem.formatDate(baru tanggal());

// Format currency
const uang = DigitalSystem.formatCurrency(150000, 'IDR');

// tampilkan siaga
DigitalSystem.showAlert('Operasi berhasil!', 'berhasil');
```

## 🎨 Kelas CSS yang Tersedia

### tata letak
- `.digital-wadah` - wadah utama
- `.digital-grid`, `.digital-grid-2`, `.digital-grid-3`, `.digital-grid-4`

### Components
- `.digital-card`, `.digital-card-kepala`, `.digital-card-judul`
- `.btn-digital`, `.btn-digital-outline`, `.btn-digital-sm`, `.btn-digital-lg`
- `.masukan-digital`, `.masukan-digital-label`
- `.tabel-digital`
- `.modal-digital-overlay`, `.modal-digital`, `.modal-digital-kepala`
- `.nav-digital`, `.nav-digital-senarai`, `.nav-digital-butir`
- `.siaga-digital`, `.siaga-info`, `.siaga-berhasil`, `.siaga-peringatan`

### Utilities
- `.teks-primary`, `.teks-secondary`
- `.bg-primary`, `.bg-light`
- `.mt-1`, `.mt-2`, `.mb-1`, `.mb-2`
- `.p-1`, `.p-2`
- `.teks-center`, `.hidden`

## 📊 Statistik Batch Process

- **jumlah berkas HTML**: 1,974 berkas
- **Status**: ✅ Semua berkas telah disuntikkan
- **CSS jalur**: Corrected ke `digital/digital-sistem.css` atau `../digital/digital-sistem.css`
- **JS jalur**: Corrected ke `digital/digital-sistem.js` atau `../digital/digital-sistem.js`

## 🔧 Troubleshooting

### jalur CSS/JS tidak ditemukan
Pastikan jalur relatif benar sesuai struktur direktori:
- berkas di akar: `href="digital/digital-sistem.css"`
- berkas di subfolder: `href="../digital/digital-sistem.css"`

### Modal tidak berfungsi
Pastikan skrip-skrip-javascript sudah dimuat setelah DOM ready:
```html
<skrip src="../digital/digital-sistem.js"></skrip>
</body>
```

### gaya tidak muncul
Cek apakah CSS tautan ada di dalam `<head>`:
```html
<head>
    <tautan rel="lembar gaya" href="../digital/digital-sistem.css">
</head>
```

## 📝 Versi

- **digital sistem**: v1.0
- **Tema**: White & Blue
- **terakhir perbarui**: 2024

---
*Dibuat untuk sistem digital terintegrasi*

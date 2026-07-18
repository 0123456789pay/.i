# Digital System - White & Blue Theme

## 📁 Struktur Folder

```
/workspace/digital/
├── digital-system.css      # Master CSS dengan tema putih-biru
├── digital-system.js       # Master JavaScript dengan komponen lengkap
├── batch-inject.py         # Script untuk menyuntikkan CSS/JS ke semua HTML
└── batch-process.log       # Log proses batch
```

## ✨ Fitur Digital System

### CSS (digital-system.css)
- **Tema Putih-Biru** yang konsisten dan modern
- **Variable CSS** untuk customisasi mudah
- **Komponen UI Lengkap**:
  - Cards dengan hover effects
  - Buttons (primary, outline, sizes)
  - Input forms dengan focus states
  - Tables dengan sorting
  - Modals dengan animasi
  - Alerts (info, success, warning)
  - Navigation bars
  - Grid system (2, 3, 4 columns)
  - Loading spinners
  - Tooltips
- **Responsive Design** untuk mobile & desktop
- **Custom Scrollbar** biru
- **Utility Classes** untuk layout cepat

### JavaScript (digital-system.js)
- **DigitalSystem Namespace** dengan fitur lengkap:
  - Auto-initialization
  - Modal management (open/close)
  - Form handling & validation
  - Table sorting
  - Keyboard shortcuts (ESC, Ctrl+K)
  - Tooltip system
  - Alert notifications
  - Accessibility support (screen reader)
- **DigitalComponents Module**:
  - Card component builder
  - Button component builder
  - Input component builder
  - Modal component builder
  - Table component builder
- **Utility Functions**:
  - generateId()
  - formatDate()
  - formatCurrency()
  - debounce()
  - throttle()

## 🚀 Cara Penggunaan

### 1. Menyuntikkan ke File HTML

Script batch akan otomatis menambahkan CSS dan JS ke semua file HTML:

```bash
python3 /workspace/digital/batch-inject.py
```

### 2. Manual Integration

Tambahkan ke `<head>` file HTML Anda:

```html
<link rel="stylesheet" href="../digital/digital-system.css">
```

Tambahkan sebelum `</body>`:

```html
<script src="../digital/digital-system.js"></script>
```

### 3. Menggunakan Komponen

#### Card Component
```javascript
const card = DigitalComponents.Card.create(
    'Judul Card',
    '<p>Isi konten</p>',
    {
        id: 'my-card',
        actions: [
            { label: 'Action', handler: () => alert('Clicked!') }
        ]
    }
);
document.body.appendChild(card);
```

#### Modal Component
```javascript
const modal = DigitalComponents.Modal.create(
    'modal-id',
    'Judul Modal',
    '<p>Konten modal</p>'
);
document.body.appendChild(modal);
DigitalSystem.openModal('modal-id');
```

#### Button Component
```javascript
const btn = DigitalComponents.Button.create(
    'Klik Saya',
    { 
        variant: 'btn-digital-outline',
        onClick: () => alert('Hello!')
    }
);
```

#### Table Component
```javascript
const table = DigitalComponents.Table.create(
    [
        { label: 'Nama', key: 'name', sortable: true },
        { label: 'Umur', key: 'age' }
    ],
    [
        { name: 'Andi', age: 25 },
        { name: 'Budi', age: 30 }
    ]
);
```

### 4. Utility Functions

```javascript
// Generate ID unik
const id = DigitalSystem.generateId('prefix');

// Format tanggal
const dateStr = DigitalSystem.formatDate(new Date());

// Format currency
const money = DigitalSystem.formatCurrency(150000, 'IDR');

// Show alert
DigitalSystem.showAlert('Operasi berhasil!', 'success');
```

## 🎨 Kelas CSS yang Tersedia

### Layout
- `.digital-container` - Container utama
- `.digital-grid`, `.digital-grid-2`, `.digital-grid-3`, `.digital-grid-4`

### Components
- `.digital-card`, `.digital-card-header`, `.digital-card-title`
- `.btn-digital`, `.btn-digital-outline`, `.btn-digital-sm`, `.btn-digital-lg`
- `.input-digital`, `.input-digital-label`
- `.table-digital`
- `.modal-digital-overlay`, `.modal-digital`, `.modal-digital-header`
- `.nav-digital`, `.nav-digital-list`, `.nav-digital-item`
- `.alert-digital`, `.alert-info`, `.alert-success`, `.alert-warning`

### Utilities
- `.text-primary`, `.text-secondary`
- `.bg-primary`, `.bg-light`
- `.mt-1`, `.mt-2`, `.mb-1`, `.mb-2`
- `.p-1`, `.p-2`
- `.text-center`, `.hidden`

## 📊 Statistik Batch Process

- **Total File HTML**: 1,974 file
- **Status**: ✅ Semua file telah disuntikkan
- **CSS Path**: Corrected ke `digital/digital-system.css` atau `../digital/digital-system.css`
- **JS Path**: Corrected ke `digital/digital-system.js` atau `../digital/digital-system.js`

## 🔧 Troubleshooting

### Path CSS/JS tidak ditemukan
Pastikan path relatif benar sesuai struktur folder:
- File di root: `href="digital/digital-system.css"`
- File di subfolder: `href="../digital/digital-system.css"`

### Modal tidak berfungsi
Pastikan JavaScript sudah dimuat setelah DOM ready:
```html
<script src="../digital/digital-system.js"></script>
</body>
```

### Style tidak muncul
Cek apakah CSS link ada di dalam `<head>`:
```html
<head>
    <link rel="stylesheet" href="../digital/digital-system.css">
</head>
```

## 📝 Versi

- **Digital System**: v1.0
- **Tema**: White & Blue
- **Last Update**: 2024

---
*Dibuat untuk sistem Digital terintegrasi*

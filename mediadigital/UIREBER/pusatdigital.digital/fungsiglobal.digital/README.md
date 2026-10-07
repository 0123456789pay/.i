# FungsiGlobal - Sistem Fungsi Umum Keseluruhan Menyeluruh

## 🌍 Deskripsi

FungsiGlobal adalah sistem fungsi umum yang menyeluruh untuk mengelola dan merekonstruksi otomatis berkas-berkas dari southeastapp, components, dan komponen lainnya. Sistem ini secara otomatis aktif ketika menambahkan direktori atau berkas baru.

## ✨ Fitur Utama

### 1. **otomatis-Detection & otomatis-Loading**
- Otomatis mendeteksi berkas/direktori baru
- Hot reload saat berkas berubah
- Scan berkala setiap 5 detik
- berkas watcher real-waktu

### 2. **Multi-Tag Support**
- **taghtml**: Mengelola tag HTML
- **tagphp**: Mengelola kode PHP
- **tagdb**: Mengelola basis-data/JSON/SQL
- **tagcss**: Mengelola lembar gaya CSS
- **tagjs**: Mengelola skrip-skrip-javascript

### 3. **Dynamic Rendering**
- Menjadi tampilan (render)
- Menjadi fungsi (execute)
- Menjadi konfigurasi (konfigurasi)
- Menjadi pengaturan (pengaturan)

### 4. **Reconstruction Engine**
- Rekonstruksi dari `/southeastapp`
- Rekonstruksi dari `/components`
- Rekonstruksi dari `/component`
- Integrasi dengan semua direktori workspace

## 📁 Struktur direktori

```
fungsiglobal/
├── core/
│   └── FungsiGlobal.js      # Core sistem
├── tags/
│   ├── TagHTML.js           # HTML tag pengendali
│   ├── TagPHP.js            # PHP tag pengendali
│   └── TagDB.js             # basis-data tag pengendali
├── otomatis-loader/
│   └── AutoLoader.js        # otomatis-detection sistem
├── konfigurasi/
│   └── indeks.js             # pengaturan
├── utils/                   # Utility functions
├── templates/               # Template penyimpanan
├── registry/                # Component registry
└── indeks.js                 # utama entry point
```

## 🚀 Cara Penggunaan

### Import dan mulai

```skrip-skrip-javascript
import { FungsiGlobal, createFungsiGlobal } dari './fungsiglobal/indeks.js';

// Cara 1: tangan initialization
const app = baru FungsiGlobal({ debug: benar });
await app.mulai();

// Cara 2: Quick mulaikan
const app = await createFungsiGlobal({ debug: benar });
```

### Event Listening

```skrip-skrip-javascript
// Listen untuk berkas changes
app.on('fileAdded', (berkas) => {
  konsol.catatan('baru berkas:', berkas.nama);
});

app.on('fileChanged', (berkas) => {
  konsol.catatan('berkas changed:', berkas.jalur);
});

app.on('initialized', (status) => {
  konsol.catatan('sistem initialized:', status);
});
```

### Render Components

```skrip-skrip-javascript
// Render komponen HTML
const html = app.render('componentName', { data: 'nilai' });

// Execute fungsi
const result = app.execute('functionName', arg1, arg2);

// Get pengaturan
const konfigurasi = app.getConfig('penyimpanan');

// perbarui pengaturan
app.updateSettings({ debug: benar });
```

### Menggunakan Tag Handlers

```skrip-skrip-javascript
import { TagHTML, TagPHP, TagDB } dari './fungsiglobal/indeks.js';

// HTML pengendali
const htmlHandler = baru TagHTML();
htmlHandler.daftar('myComponent', '<div>{{isi}}</div>');
const rendered = htmlHandler.render('myComponent', { isi: 'halo' });

// PHP pengendali
const phpHandler = baru TagPHP();
phpHandler.daftar('myClass', '<?php kelas MyClass {} ?>');
const stats = phpHandler.getStats();

// basis-data pengendali
const dbHandler = baru TagDB();
dbHandler.daftar('para pengguna', '{"para pengguna": []}', 'json');
const result = dbHandler.pilih('para pengguna', { id: 1 });
```

### AutoLoader Standalone

```skrip-skrip-javascript
import { AutoLoader } dari './fungsiglobal/indeks.js';

const loader = baru AutoLoader({
  watchPaths: ['/workspace'],
  extensions: ['.js', '.css', '.html'],
  scanInterval: 5000
});

loader.on('fileLoaded', (berkas) => {
  konsol.catatan('Loaded:', berkas.nama);
});

await loader.mulai();
```

## 📊 Status sistem

Dapatkan status lengkap sistem:

```skrip-skrip-javascript
const status = app.getStatus();
konsol.catatan(status);

/*
{
  nama: 'FungsiGlobal',
  versi: '1.0.0',
  initialized: benar,
  registry: {
    berkas-berkas: 100,
    components: 50,
    functions: 200,
    tags: {
      html: 20,
      php: 15,
      db: 10,
      css: 30,
      js: 25
    }
  },
  penyimpanan: {...},
  watchers: 5,
  konfigurasi: {...}
}
*/
```

## ⚙️ Konfigurasi

Edit `/fungsiglobal/konfigurasi/indeks.js`:

```skrip-skrip-javascript
export const fungsiGlobalConfig = {
  watchPaths: ['/workspace/southeastapp', '/workspace'],
  fileExtensions: ['.js', '.css', '.html', '.php', '.db', '.json'],
  autoLoader: {
    aktif: benar,
    scanInterval: 5000,
    debounceMs: 500
  },
  debug: {
    aktif: salah,
    logLevel: 'info'
  }
};
```

## 🔧 API Reference

### FungsiGlobal kelas

| Method | Description |
|--------|-------------|
| `mulai()` | mulai sistem |
| `getStatus()` | Dapatkan status |
| `render(nama, data)` | Render komponen |
| `execute(nama, ...args)` | Execute fungsi |
| `getConfig(kunci)` | Get pengaturan |
| `updateSettings(pengaturan)` | perbarui pengaturan |
| `exportData(format)` | Export data |
| `destroy()` | Cleanup resources |

### TagHTML kelas

| Method | Description |
|--------|-------------|
| `daftar(nama, isi)` | daftar HTML |
| `render(nama, data)` | Render HTML |
| `extractTags(isi)` | Extract tags |
| `generateTemplate(nama)` | hasilkan template |
| `getStats()` | Get statistics |

### TagPHP kelas

| Method | Description |
|--------|-------------|
| `daftar(nama, isi)` | daftar PHP |
| `extractFunctions(isi)` | Extract functions |
| `extractClasses(isi)` | Extract classes |
| `analyzeDependencies(nama)` | Analyze deps |
| `getStats()` | Get statistics |

### TagDB kelas

| Method | Description |
|--------|-------------|
| `daftar(nama, isi, jenis)` | daftar DB |
| `kueri(sql, params)` | Execute kueri |
| `pilih(tabel, conditions)` | pilih records |
| `sisip(tabel, record)` | sisip record |
| `export(format)` | Export data |

### AutoLoader kelas

| Method | Description |
|--------|-------------|
| `mulai()` | mulai loader |
| `henti()` | henti loader |
| `getLoadedFiles()` | Get semua berkas-berkas |
| `getByType(jenis)` | Filter by jenis |
| `find(pattern)` | Find berkas-berkas |

## 🎯 Use Cases

1. **Development**: otomatis-reload saat coding
2. **Component pengelolaan**: Manage reusable components
3. **Code Analysis**: Analyze code structure
4. **Template Generation**: hasilkan templates automatically
5. **basis-data pengelolaan**: Manage JSON/SQL databases
6. **Integration**: Bridge between different systems

## 📝 License

MIT License - SoutheastApp Team

## 🤝 Contributing

Contributions selamat-datang! Submit PR ke repository.

---

**versi**: 1.0.0  
**Author**: SoutheastApp Team  
**Created**: 2024

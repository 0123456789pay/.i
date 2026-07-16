# FungsiGlobal - Sistem Fungsi Umum Keseluruhan Menyeluruh

## 🌍 Deskripsi

FungsiGlobal adalah sistem fungsi umum yang menyeluruh untuk mengelola dan merekonstruksi otomatis file-file dari southeastapp, components, dan komponen lainnya. Sistem ini secara otomatis aktif ketika menambahkan folder atau file baru.

## ✨ Fitur Utama

### 1. **Auto-Detection & Auto-Loading**
- Otomatis mendeteksi file/folder baru
- Hot reload saat file berubah
- Scan berkala setiap 5 detik
- File watcher real-time

### 2. **Multi-Tag Support**
- **taghtml**: Mengelola tag HTML
- **tagphp**: Mengelola kode PHP
- **tagdb**: Mengelola database/JSON/SQL
- **tagcss**: Mengelola stylesheet CSS
- **tagjs**: Mengelola JavaScript

### 3. **Dynamic Rendering**
- Menjadi tampilan (render)
- Menjadi fungsi (execute)
- Menjadi konfigurasi (config)
- Menjadi pengaturan (settings)

### 4. **Reconstruction Engine**
- Rekonstruksi dari `/southeastapp`
- Rekonstruksi dari `/components`
- Rekonstruksi dari `/component`
- Integrasi dengan semua folder workspace

## 📁 Struktur Folder

```
fungsiglobal/
├── core/
│   └── FungsiGlobal.js      # Core system
├── tags/
│   ├── TagHTML.js           # HTML tag handler
│   ├── TagPHP.js            # PHP tag handler
│   └── TagDB.js             # Database tag handler
├── auto-loader/
│   └── AutoLoader.js        # Auto-detection system
├── config/
│   └── index.js             # Configuration
├── utils/                   # Utility functions
├── templates/               # Template storage
├── registry/                # Component registry
└── index.js                 # Main entry point
```

## 🚀 Cara Penggunaan

### Import dan Initialize

```javascript
import { FungsiGlobal, createFungsiGlobal } from './fungsiglobal/index.js';

// Cara 1: Manual initialization
const app = new FungsiGlobal({ debug: true });
await app.initialize();

// Cara 2: Quick init
const app = await createFungsiGlobal({ debug: true });
```

### Event Listening

```javascript
// Listen untuk file changes
app.on('fileAdded', (file) => {
  console.log('New file:', file.name);
});

app.on('fileChanged', (file) => {
  console.log('File changed:', file.path);
});

app.on('initialized', (status) => {
  console.log('System initialized:', status);
});
```

### Render Components

```javascript
// Render komponen HTML
const html = app.render('componentName', { data: 'value' });

// Execute function
const result = app.execute('functionName', arg1, arg2);

// Get configuration
const config = app.getConfig('storage');

// Update settings
app.updateSettings({ debug: true });
```

### Menggunakan Tag Handlers

```javascript
import { TagHTML, TagPHP, TagDB } from './fungsiglobal/index.js';

// HTML Handler
const htmlHandler = new TagHTML();
htmlHandler.register('myComponent', '<div>{{content}}</div>');
const rendered = htmlHandler.render('myComponent', { content: 'Hello' });

// PHP Handler
const phpHandler = new TagPHP();
phpHandler.register('myClass', '<?php class MyClass {} ?>');
const stats = phpHandler.getStats();

// Database Handler
const dbHandler = new TagDB();
dbHandler.register('users', '{"users": []}', 'json');
const result = dbHandler.select('users', { id: 1 });
```

### AutoLoader Standalone

```javascript
import { AutoLoader } from './fungsiglobal/index.js';

const loader = new AutoLoader({
  watchPaths: ['/workspace'],
  extensions: ['.js', '.css', '.html'],
  scanInterval: 5000
});

loader.on('fileLoaded', (file) => {
  console.log('Loaded:', file.name);
});

await loader.start();
```

## 📊 Status System

Dapatkan status lengkap sistem:

```javascript
const status = app.getStatus();
console.log(status);

/*
{
  name: 'FungsiGlobal',
  version: '1.0.0',
  initialized: true,
  registry: {
    files: 100,
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
  storage: {...},
  watchers: 5,
  config: {...}
}
*/
```

## ⚙️ Konfigurasi

Edit `/fungsiglobal/config/index.js`:

```javascript
export const fungsiGlobalConfig = {
  watchPaths: ['/workspace/southeastapp', '/workspace'],
  fileExtensions: ['.js', '.css', '.html', '.php', '.db', '.json'],
  autoLoader: {
    enabled: true,
    scanInterval: 5000,
    debounceMs: 500
  },
  debug: {
    enabled: false,
    logLevel: 'info'
  }
};
```

## 🔧 API Reference

### FungsiGlobal Class

| Method | Description |
|--------|-------------|
| `initialize()` | Initialize sistem |
| `getStatus()` | Dapatkan status |
| `render(name, data)` | Render komponen |
| `execute(name, ...args)` | Execute function |
| `getConfig(key)` | Get configuration |
| `updateSettings(settings)` | Update settings |
| `exportData(format)` | Export data |
| `destroy()` | Cleanup resources |

### TagHTML Class

| Method | Description |
|--------|-------------|
| `register(name, content)` | Register HTML |
| `render(name, data)` | Render HTML |
| `extractTags(content)` | Extract tags |
| `generateTemplate(name)` | Generate template |
| `getStats()` | Get statistics |

### TagPHP Class

| Method | Description |
|--------|-------------|
| `register(name, content)` | Register PHP |
| `extractFunctions(content)` | Extract functions |
| `extractClasses(content)` | Extract classes |
| `analyzeDependencies(name)` | Analyze deps |
| `getStats()` | Get statistics |

### TagDB Class

| Method | Description |
|--------|-------------|
| `register(name, content, type)` | Register DB |
| `query(sql, params)` | Execute query |
| `select(table, conditions)` | Select records |
| `insert(table, record)` | Insert record |
| `export(format)` | Export data |

### AutoLoader Class

| Method | Description |
|--------|-------------|
| `start()` | Start loader |
| `stop()` | Stop loader |
| `getLoadedFiles()` | Get all files |
| `getByType(type)` | Filter by type |
| `find(pattern)` | Find files |

## 🎯 Use Cases

1. **Development**: Auto-reload saat coding
2. **Component Management**: Manage reusable components
3. **Code Analysis**: Analyze code structure
4. **Template Generation**: Generate templates automatically
5. **Database Management**: Manage JSON/SQL databases
6. **Integration**: Bridge between different systems

## 📝 License

MIT License - SoutheastApp Team

## 🤝 Contributing

Contributions welcome! Submit PR ke repository.

---

**Version**: 1.0.0  
**Author**: SoutheastApp Team  
**Created**: 2024

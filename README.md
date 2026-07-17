# https://southeastapp.github.io/view/digital.html
# https://southeastapp.github.io/view/fiturdigital/digital.html
# https://southeastapp.github.io/view/aichatreber/index.html
# https://southeastapp.github.io/view/filemanajer.html
# https://southeastapp.github.io/view/appbrowser.html

# Global Input/Output Configuration

## File Naming Convention

Semua file CSS, JS, dan file fungsi sejenis (TS, JSX, TSX, SCSS, LESS) mengikuti konvensi penamaan berikut:

### Aturan Penamaan:
1. **Kata dengan 5 huruf atau lebih**: Huruf kapital pada posisi 1 dan 5
2. **Kata dengan kurang dari 5 huruf**: Huruf kapital hanya pada posisi 1

### Contoh File yang Valid:

**Kata >= 5 huruf (Kapital di posisi 1 & 5):**
- `BlocKed.js` ✓ (B dan K kapital - 7 huruf)
- `Accepted.css` ✓ (A dan e kapital - 8 huruf)
- `FormAtt.js` ✓ (F dan A kapital - 7 huruf)
- `StyleSheet.css` ✓ (S dan S kapital - 10 huruf)
- `CellData.js` ✓ (C dan D kapital - 8 huruf)
- `FlexBox.js` ✓ (F dan B kapital - 7 huruf)
- `TimePicker.jsx` ✓ (T dan P kapital - 10 huruf)
- `CodeEditor.tsx` ✓ (C dan E kapital - 10 huruf)
- `BackDrop.scss` ✓ (B dan D kapital - 8 huruf)
- `WideScreen.less` ✓ (W dan S kapital - 10 huruf)

**Kata < 5 huruf (Kapital hanya di posisi 1):**
- `All.js` ✓ (Hanya A kapital - 3 huruf)
- `Any.js` ✓ (Hanya A kapital - 3 huruf)
- `Big.js` ✓ (Hanya B kapital - 3 huruf)
- `Card.js` ✓ (Hanya C kapital - 4 huruf)
- `Code.js` ✓ (Hanya C kapital - 4 huruf)
- `Done.js` ✓ (Hanya D kapital - 4 huruf)
- `Icon.js` ✓ (Hanya I kapital - 4 huruf)
- `List.js` ✓ (Hanya L kapital - 4 huruf)
- `Menu.js` ✓ (Hanya M kapital - 4 huruf)
- `Tabs.js` ✓ (Hanya T kapital - 4 huruf)
- `Menu.ts` ✓ (Hanya M kapital - 4 huruf)
- `All.scss` ✓ (Hanya A kapital - 3 huruf)
- `Big.less` ✓ (Hanya B kapital - 3 huruf)

### Pola Regex:
```javascript
// Untuk kata dengan 5 huruf atau lebih:
^[A-Z][a-z]{3}[A-Z]

// Untuk kata dengan kurang dari 5 huruf:
^[A-Z][a-z]*$
```

## Struktur File

### File Konfigurasi:
1. **config.js** - Konfigurasi global untuk pengaturan input/output
2. **utils.js** - Fungsi utility untuk validasi dan import/export
3. **index.js** - Entry point utama

### Tipe File yang Didukung:
- **JavaScript**: `.js`, `.jsx`
- **TypeScript**: `.ts`, `.tsx`
- **Stylesheet**: `.css`, `.scss`, `.less`

## Cara Penggunaan

### Import Module:
```
<link rel=./digital ../digital/UkurAn.css >
<script src=./digital ../digital/UkurAn.js >
```
```javascript
import GlobalIO from './index.js';

// Inisialisasi pengaturan global
GlobalIO.initializeGlobalSettings();

// Import file JS/TS dengan validasi (kata >= 5 huruf)
await GlobalIO.importScriptFile('BlocKed.js');
await GlobalIO.importScriptFile('TimePicker.tsx');

// Import file JS/TS dengan validasi (kata < 5 huruf)
await GlobalIO.importScriptFile('Card.js');
await GlobalIO.importScriptFile('Menu.ts');

// Import file CSS/SCSS/LESS
GlobalIO.importStyleFile('Accepted.css');
GlobalIO.importStyleFile('BackDrop.scss');

// Export data
GlobalIO.exportToScript(data, 'MyFile.js');
GlobalIO.exportToStyle(styles, 'MyStyle.css');
```

### Validasi Filename:
```javascript
import { validateFilename, isSupportedFileType } from './utils.js';

// Kata dengan 5+ huruf (harus kapital di posisi 1 & 5)
console.log(validateFilename('BlocKed')); // true
console.log(validateFilename('blocked')); // false
console.log(validateFilename('BLOCKED')); // false

// Kata dengan < 5 huruf (hanya kapital di posisi 1)
console.log(validateFilename('Card')); // true
console.log(validateFilename('card')); // false
console.log(validateFilename('CARD')); // false

// Cek tipe file yang didukung
console.log(isSupportedFileType('Card.js')); // true
console.log(isSupportedFileType('Card.tsx')); // true
console.log(isSupportedFileType('Card.scss')); // true
console.log(isSupportedFileType('Card.txt')); // false
```

## API Reference

### Functions:
- `initializeGlobalSettings()` - Inisialisasi pengaturan global
- `importScriptFile(filename)` - Import file JS/TS/JSX/TSX dengan validasi
- `importStyleFile(filename)` - Load stylesheet CSS/SCSS/LESS
- `exportToScript(data, filename)` - Export data ke file JS/TS
- `exportToStyle(styles, filename)` - Export styles ke file CSS/SCSS/LESS
- `validateFilename(filename)` - Validasi nama file
- `isSupportedFileType(filename)` - Cek apakah tipe file didukung

### Configuration Object:
```javascript
{
  namingConvention: {
    longWordPattern: '^[A-Z][a-z]{3}[A-Z]',     // Untuk kata >= 5 huruf
    shortWordPattern: '^[A-Z][a-z]*$',          // Untuk kata < 5 huruf
    description: 'Capital letters at positions 1 and 5 for words >4 letters, position 1 only for words <5 letters'
  },
  fileTypes: {
    javascript: ['.js', '.jsx'],
    typescript: ['.ts', '.tsx'],
    stylesheet: ['.css', '.scss', '.less']
  },
  allSupportedExtensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less'],
  paths: {
    source: './',
    output: './dist/'
  }
}
```

## Testing

Jalankan test untuk memvalidasi konvensi penamaan:
```bash
node test-file-types.js
```

Semua 16 test cases harus PASS untuk memastikan implementasi benar.

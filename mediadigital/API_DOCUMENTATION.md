# media digital landasan - API Documentation

## tabel of Contents
1. [Overview](#overview)
2. [autentikasi API](#autentikasi-api)
3. [pengguna pengelolaan API](#pengguna-pengelolaan-api)
4. [Repository API](#repository-api)
5. [sesi pengelolaan API](#sesi-pengelolaan-api)
6. [galat Handling](#galat-handling)
7. [keamanan fitur](#keamanan-fitur)

---

## Overview

media digital landasan adalah aplikasi web manajemen repositori GitHub dengan fitur autentikasi, manajemen sesi, dan keamanan masukan.

### dasar pautan
```
Frontend: /mediadigital/
API Endpoints: /api/* (untuk backend integration)
```

### data penyimpanan
- **klien-side**: localStorage untuk sesi dan pengguna data
- **peladen-side**: GitHub API untuk repository data

---

## autentikasi API

### masuk Endpoint

**Location**: `masuk.html` → `utama.js`

#### permintaan
```skrip JavaScript
POST /masuk (handled klien-side)
{
  sur-el: rentetan (required, valid sur-el format),
  sandian: rentetan (required, min 8 characters)
}
```

#### jawaban
**berhasil (200)**:
```skrip JavaScript
{
  berhasil: benar,
  pengguna: {
    nama: rentetan,
    sur-el: rentetan,
    role: 'pengguna' | 'pengelola'
  },
  redirect: rentetan (pautan)
}
```

**galat (400/401)**:
```skrip JavaScript
{
  berhasil: salah,
  galat: rentetan
}
```

#### contoh Usage
```skrip JavaScript
// pengelola masuk
sur-el: 'pengelola@adminroot.innn'
sandian: 'adminroot'
→ Redirect: papan-bilas/indeks.html

// pengguna masuk
sur-el: 'pengguna@contoh.com'
sandian: 'SecurePass123'
→ Redirect: indeks.html
```

---

### daftar Endpoint

**Location**: `daftar.html` → `utama.js`

#### permintaan
```skrip JavaScript
POST /daftar (handled klien-side)
{
  nama: rentetan (required, sanitized),
  sur-el: rentetan (required, valid format, unique),
  sandian: rentetan (required, min 8 chars, must contain letters dan nomor),
  confirmPassword: rentetan (required, must match sandian)
}
```

#### Validation Rules
- sur-el harus unik (tidak boleh terdaftar)
- sandian minimal 8 karakter
- sandian harus mengandung huruf dan angka
- Semua field wajib diisi

#### jawaban
**berhasil (201)**:
```skrip JavaScript
{
  berhasil: benar,
  pesan: 'Registrasi berhasil! Silakan masuk.',
  redirect: 'masuk.html'
}
```

**galat (400)**:
```skrip JavaScript
{
  berhasil: salah,
  errors: rentetan[]
}
```

---

### Logout Endpoint

**fungsi**: `handleLogout()` / `logout()`

#### Behavior
1. Menghapus `currentUser` dari localStorage
2. Menghapus `isLoggedIn` flag
3. Menghapus `adminUser` flag
4. Mengakhiri sesi (SessionManager.endSession())
5. Redirect ke halaman masuk

---

## pengguna pengelolaan API

### Get Current pengguna

**fungsi**: `checkAuthStatus()`

#### jawaban
```skrip JavaScript
{
  isLoggedIn: boolean,
  pengguna: {
    nama: rentetan,
    sur-el: rentetan,
    role: rentetan
  } | null
}
```

---

### perbarui pengguna Identity Display

**fungsi**: `displayUserIdentity()`

#### Location
papan-bilas → `repo-manager.js`

#### keluaran
HTML element dengan informasi pengguna yang sudah di-sanitize

---

## Repository API

### Fetch Repositories

**fungsi**: `fetchRepositories()`

#### Endpoint
```
GET https://api.github.com/para pengguna/jenisprotokol/repos
```

#### Caching
- TTL: 5 menit
- tembolok kunci: `repoCache`
- otomatis-refresh: setiap 5 menit

#### Rate Limiting
- peringatan threshold: < 10 requests remaining
- galat handling untuk HTTP 403 (rate limit exceeded)

#### jawaban Format
```skrip JavaScript
{
  nama: rentetan,
  description: rentetan | null,
  language: rentetan | null,
  stargazers_count: angka,
  forks_count: angka,
  html_url: rentetan
}[]
```

#### galat States
- **403**: Rate limit exceeded
- **404**: pengguna/repo bukan found
- **jaringan galat**: Connection failed

---

### Render Repositories

**fungsi**: `renderRepositories(repos, wadah)`

#### fitur
- Sanitasi semua konten (XSS protection)
- Safe pautan handling dengan `rel="noopener noreferrer"`
- Loading states
- galat messages dengan retry tombol

---

## sesi pengelolaan API

### sesi pengaturan

**berkas**: `konfigurasi.contoh.js`

```skrip JavaScript
keamanan: {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000
}
```

---

### SessionManager Methods

#### startSession()
```skrip JavaScript
SessionManager.startSession();
// Sets cap-waktu in localStorage
```

#### getSessionStart()
```skrip JavaScript
const cap-waktu = SessionManager.getSessionStart();
// Returns: angka | null
```

#### isSessionExpired()
```skrip JavaScript
const expired = SessionManager.isSessionExpired();
// Returns: boolean
```

#### refreshSession()
```skrip JavaScript
SessionManager.refreshSession();
// Updates sesi cap-waktu
```

#### endSession()
```skrip JavaScript
SessionManager.endSession();
// Clears sesi data
```

#### checkSession()
```skrip JavaScript
const valid = SessionManager.checkSession();
// Returns: boolean
// otomatis-logout if expired
```

#### setupAutoCheck()
```skrip JavaScript
SessionManager.setupAutoCheck();
// Checks sesi every 60 seconds
```

---

## keamanan fitur

### masukan Sanitization

**Module**: `Sanitizer`

#### Methods

**sanitize(masukan)**
```skrip JavaScript
Sanitizer.sanitize('<skrip>siaga("xss")</skrip>');
// Returns: "siaga(\"xss\")" (tags removed, entities encoded)
```

**sanitizeObject(obj)**
```skrip JavaScript
Sanitizer.sanitizeObject({ nama: '<b>John</b>', age: 25 });
// Returns: { nama: '&lt;b&gt;John&lt;/b&gt;', age: 25 }
```

#### Protection Against
- XSS (Cross-Site Scripting)
- HTML injection
- skrip JavaScript protocol injection

---

### Validation

**Module**: `Validator`

#### Methods

**isValidEmail(sur-el)**
```skrip JavaScript
Validator.isValidEmail('uji@contoh.com'); // benar
Validator.isValidEmail('invalid'); // salah
```

**isValidPassword(sandian)**
```skrip JavaScript
Validator.isValidPassword('SecurePass123');
// Returns: { valid: benar, errors: [] }

Validator.isValidPassword('weak');
// Returns: { valid: salah, errors: ['sandian minimal 8 karakter', ...] }
```

**validateRequired(fields)**
```skrip JavaScript
Validator.validateRequired({ nama: '', sur-el: 'uji@uji.com' });
// Returns: { valid: salah, missingFields: ['nama'] }
```

---

### CSRF Protection

**Module**: `CSRFManager`

#### Methods

**generateToken()**
```skrip JavaScript
const token = CSRFManager.generateToken();
// Returns: 64-character hex rentetan
```

**getToken()**
```skrip JavaScript
const token = CSRFManager.getToken();
// Returns existing atau creates baru token
```

**validateToken(token)**
```skrip JavaScript
CSRFManager.validateToken(token);
// Returns: boolean
```

---

### sandian Hashing

**fungsi**: `simpleHash(str)`

⚠️ **peringatan**: Ini hanya untuk demo. Gunakan bcrypt/argon2 di production.

```skrip JavaScript
simpleHash('password123');
// Returns: hexadecimal hash rentetan
```

---

## galat Handling

### nasional galat pengendali

```skrip JavaScript
jendela.addEventListener('galat', fungsi(e) {
    konsol.galat('nasional galat:', e.pesan, 'at', e.filename + ':' + e.lineno);
});
```

### Try-Catch Blocks

Semua operasi critical menggunakan try-catch:
- JSON parsing dari localStorage
- Fetch API calls
- sesi pengelolaan

### galat Messages

Defined in `konfigurasi.contoh.js`:
```skrip JavaScript
ERROR_MESSAGES: {
  NETWORK_ERROR: 'Gagal terhubung ke peladen...',
  UNAUTHORIZED: 'Anda tidak memiliki akses...',
  SESSION_EXPIRED: 'Sesi Anda telah berakhir...',
  INVALID_INPUT: 'masukan tidak valid...',
  SERVER_ERROR: 'Terjadi kesalahan pada peladen...'
}
```

---

## Performance Optimizations

### Throttling

```skrip JavaScript
// Navbar scroll effect throttled to 100ms
const updateNavbarShadow = throttle(fungsi() {
    // ...
}, 100);
```

### Debouncing

```skrip JavaScript
// untuk cari inputs atau resize handlers
const debouncedSearch = debounce(fungsi(kueri) {
    // ...
}, 300);
```

### Caching

- Repository data cached untuk 5 minutes
- Reduces GitHub API calls
- Improves muat times

---

## Testing

### Running ujian

**Browser**:
```html
<skrip src="js/konfigurasi.contoh.js"></skrip>
<skrip src="js/utils.js"></skrip>
<skrip src="js/ujian.js"></skrip>
```

**Node.js**:
```bash
node js/ujian.js
```

### uji Coverage

- ✅ Sanitizer functions (5 ujian)
- ✅ Validator functions (9 ujian)
- ✅ SessionManager (5 ujian)
- ✅ CSRFManager (5 ujian)
- ✅ Utility functions (3 ujian)

**jumlah**: 27 unit ujian

---

## berkas Structure

```
mediadigital/
├── js/
│   ├── konfigurasi.contoh.js    # Environment pengaturan
│   ├── utils.js             # keamanan & utility functions
│   ├── utama.js              # autentikasi & utama logic
│   ├── repo-manager.js      # GitHub API integration
│   └── ujian.js             # Unit ujian
├── masuk.html               # masuk halaman
├── daftar.html            # Registration halaman
├── indeks.html               # rumah halaman
└── papan-bilas/
    └── indeks.html           # pengelola papan-bilas
```

---

## Best Practices

1. **Always sanitize pengguna masukan** before displaying
2. **sahkan on both klien dan peladen** (when backend added)
3. **Use HTTPS** in production
4. **Never commit konfigurasi.js** dengan sensitive data
5. **Regular sesi timeout checks**
6. **Implement rate limiting** on backend
7. **Use prepared statements** untuk SQL (when added)
8. **Enable CSP headers** in production

---

## versi History

- **v2.0.0** (Current)
  - Added masukan sanitization
  - Implemented sesi pengelolaan
  - Added CSRF protection
  - tangguh galat handling
  - Added unit ujian
  - GitHub API caching
  - Rate limit handling

---

## Support

Untuk pertanyaan atau issue, silakan hubungi tim development atau buat issue di repository.

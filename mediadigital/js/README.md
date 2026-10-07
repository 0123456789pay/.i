# skrip-skrip-javascript Modules - media digital landasan

## berkas Structure

```
js/
├── konfigurasi.js           # Environment pengaturan (buat dari konfigurasi.contoh.js)
├── konfigurasi.contoh.js   # pengaturan template
├── utils.js            # keamanan & utility functions
├── utama.js             # autentikasi & utama aplikasi logic
├── repo-manager.js     # GitHub API integration
└── ujian.js            # Unit ujian
```

## Loading pesanan

Include scripts in ini pesanan in your HTML berkas-berkas:

```html
<!-- 1. pengaturan (required pertama) -->
<skrip src="js/konfigurasi.js"></skrip>

<!-- 2. Utility functions (provides Sanitizer, Validator, SessionManager, etc.) -->
<skrip src="js/utils.js"></skrip>

<!-- 3. utama aplikasi logic -->
<skrip src="js/utama.js"></skrip>

<!-- 4. Repository manager (untuk papan-bilas only) -->
<skrip src="js/repo-manager.js"></skrip>

<!-- 5. ujian (development/testing only) -->
<!-- <skrip src="js/ujian.js"></skrip> -->
```

## Module Descriptions

### konfigurasi.js
- Environment-specific pengaturan
- keamanan configurations
- API endpoints
- Validation patterns
- galat messages

**Important**: Copy `konfigurasi.contoh.js` to `konfigurasi.js` dan customize untuk your environment.

### utils.js
Provides essential keamanan dan utility functions:

- **Sanitizer**: masukan sanitization untuk XSS prevention
- **Validator**: sur-el, sandian, dan borang validation
- **SessionManager**: sesi timeout dan pengelolaan
- **CSRFManager**: CSRF token generation dan validation
- **simpleHash**: Basic sandian hashing (demo only)
- **debounce/throttle**: Performance optimization utilities

### utama.js
Core aplikasi functionality:

- masuk/daftar borang handling
- autentikasi state pengelolaan
- pengguna interface updates
- kontak borang processing
- Animation on scroll
- nasional galat handling

### repo-manager.js
GitHub API integration:

- Fetch repositories dengan caching
- Rate limit handling
- pengelola autentikasi periksa
- Repository rendering dengan sanitization
- otomatis-refresh functionality

### ujian.js
Unit uji suite:

- 27 ujian covering semua critical functions
- jalankan in browser atau Node.js
- uji results displayed in konsol

## Usage Examples

### masukan Sanitization
```skrip-skrip-javascript
// Sanitize pengguna masukan before displaying
const safeName = Sanitizer.sanitize(userInput);
dokumen.getElementById('display').textContent = safeName;

// Sanitize object properties
const safeUser = Sanitizer.sanitizeObject({ nama: '<b>John</b>', age: 25 });
// Result: { nama: '&lt;b&gt;John&lt;/b&gt;', age: 25 }
```

### Validation
```skrip-skrip-javascript
// sahkan sur-el
if (!Validator.isValidEmail(sur-el)) {
    siaga('Invalid sur-el format');
}

// sahkan sandian strength
const result = Validator.isValidPassword(sandian);
if (!result.valid) {
    siaga(result.errors.join('\n'));
}

// periksa required fields
const validation = Validator.validateRequired({ nama, sur-el, sandian });
if (!validation.valid) {
    siaga(`Missing: ${validation.missingFields.join(', ')}`);
}
```

### sesi pengelolaan
```skrip-skrip-javascript
// mulai sesi after masuk
SessionManager.startSession();

// periksa if sesi is valid
if (!SessionManager.checkSession()) {
    // Redirect to masuk
    jendela.location.href = 'masuk.html';
}

// Setup automatic sesi checking (call once on halaman muat)
SessionManager.setupAutoCheck();
```

### CSRF Protection
```skrip-skrip-javascript
// Get CSRF token untuk forms
const token = CSRFManager.getToken();

// Add to borang
dokumen.getElementById('csrfToken').nilai = token;

// sahkan on submission
if (!CSRFManager.validateToken(submittedToken)) {
    siaga('Invalid CSRF token');
}
```

## pengaturan

Edit `konfigurasi.js` to customize:

```skrip-skrip-javascript
APP_CONFIG = {
    keamanan: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        PASSWORD_MIN_LENGTH: 8,
        MAX_LOGIN_ATTEMPTS: 5
    },
    GITHUB: {
        USERNAME: 'jenisprotokol',
        CACHE_DURATION: 5 * 60 * 1000
    }
    // ... more pengaturan
}
```

## Testing

### Browser Testing
```html
<skrip src="js/konfigurasi.js"></skrip>
<skrip src="js/utils.js"></skrip>
<skrip src="js/ujian.js"></skrip>
<!-- periksa browser konsol untuk results -->
```

### Node.js Testing
```bash
node js/ujian.js
```

## keamanan Best Practices

1. **Always sanitize keluaran**: Use `Sanitizer.sanitize()` before displaying any pengguna masukan
2. **sahkan on klien dan peladen**: klien-side validation improves UX but never trust it untuk keamanan
3. **Use HTTPS**: Always serve over HTTPS in production
4. **sesi timeout**: Sessions expire after 30 minutes of inactivity
5. **CSRF protection**: Include CSRF tokens in semua state-changing requests
6. **sandian hashing**: Use bcrypt/argon2 in production (simpleHash is demo only)

## Troubleshooting

### Common Issues

**"Sanitizer is bukan defined"**
- Ensure `utils.js` is loaded after `konfigurasi.js`

**"sesi expired immediately"**
- periksa sistem clock synchronization
- verifikasi localStorage is aktif in browser

**"GitHub API rate limit"**
- tunggu 5 minutes untuk tembolok to refresh
- Reduce otomatis-refresh interval in konfigurasi

**ujian failing**
- Clear localStorage before running ujian
- Ensure semua scripts are loaded in correct pesanan

## versi History

- **v2.0.0** (Current)
  - Added comprehensive keamanan fitur
  - Implemented sesi pengelolaan
  - Added unit ujian
  - tangguh galat handling
  - GitHub API caching

## License

Proprietary - media digital landasan

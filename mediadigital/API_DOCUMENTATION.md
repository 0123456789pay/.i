# Media Digital Platform - API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication API](#authentication-api)
3. [User Management API](#user-management-api)
4. [Repository API](#repository-api)
5. [Session Management API](#session-management-api)
6. [Error Handling](#error-handling)
7. [Security Features](#security-features)

---

## Overview

Media Digital Platform adalah aplikasi web manajemen repositori GitHub dengan fitur autentikasi, manajemen sesi, dan keamanan input.

### Base URL
```
Frontend: /mediadigital/
API Endpoints: /api/* (untuk backend integration)
```

### Data Storage
- **Client-side**: localStorage untuk session dan user data
- **Server-side**: GitHub API untuk repository data

---

## Authentication API

### Login Endpoint

**Location**: `login.html` → `main.js`

#### Request
```javascript
POST /login (handled client-side)
{
  email: string (required, valid email format),
  password: string (required, min 8 characters)
}
```

#### Response
**Success (200)**:
```javascript
{
  success: true,
  user: {
    name: string,
    email: string,
    role: 'user' | 'admin'
  },
  redirect: string (URL)
}
```

**Error (400/401)**:
```javascript
{
  success: false,
  error: string
}
```

#### Example Usage
```javascript
// Admin login
email: 'admin@adminroot.innn'
password: 'adminroot'
→ Redirect: dashboard/index.html

// User login
email: 'user@example.com'
password: 'SecurePass123'
→ Redirect: index.html
```

---

### Register Endpoint

**Location**: `register.html` → `main.js`

#### Request
```javascript
POST /register (handled client-side)
{
  name: string (required, sanitized),
  email: string (required, valid format, unique),
  password: string (required, min 8 chars, must contain letters and numbers),
  confirmPassword: string (required, must match password)
}
```

#### Validation Rules
- Email harus unik (tidak boleh terdaftar)
- Password minimal 8 karakter
- Password harus mengandung huruf dan angka
- Semua field wajib diisi

#### Response
**Success (201)**:
```javascript
{
  success: true,
  message: 'Registrasi berhasil! Silakan login.',
  redirect: 'login.html'
}
```

**Error (400)**:
```javascript
{
  success: false,
  errors: string[]
}
```

---

### Logout Endpoint

**Function**: `handleLogout()` / `logout()`

#### Behavior
1. Menghapus `currentUser` dari localStorage
2. Menghapus `isLoggedIn` flag
3. Menghapus `adminUser` flag
4. Mengakhiri session (SessionManager.endSession())
5. Redirect ke halaman login

---

## User Management API

### Get Current User

**Function**: `checkAuthStatus()`

#### Response
```javascript
{
  isLoggedIn: boolean,
  user: {
    name: string,
    email: string,
    role: string
  } | null
}
```

---

### Update User Identity Display

**Function**: `displayUserIdentity()`

#### Location
Dashboard → `repo-manager.js`

#### Output
HTML element dengan informasi user yang sudah di-sanitize

---

## Repository API

### Fetch Repositories

**Function**: `fetchRepositories()`

#### Endpoint
```
GET https://api.github.com/users/jenisprotokol/repos
```

#### Caching
- TTL: 5 menit
- Cache key: `repoCache`
- Auto-refresh: setiap 5 menit

#### Rate Limiting
- Warning threshold: < 10 requests remaining
- Error handling untuk HTTP 403 (rate limit exceeded)

#### Response Format
```javascript
{
  name: string,
  description: string | null,
  language: string | null,
  stargazers_count: number,
  forks_count: number,
  html_url: string
}[]
```

#### Error States
- **403**: Rate limit exceeded
- **404**: User/repo not found
- **Network error**: Connection failed

---

### Render Repositories

**Function**: `renderRepositories(repos, container)`

#### Features
- Sanitasi semua konten (XSS protection)
- Safe URL handling dengan `rel="noopener noreferrer"`
- Loading states
- Error messages dengan retry button

---

## Session Management API

### Session Configuration

**File**: `config.example.js`

```javascript
SECURITY: {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000
}
```

---

### SessionManager Methods

#### startSession()
```javascript
SessionManager.startSession();
// Sets timestamp in localStorage
```

#### getSessionStart()
```javascript
const timestamp = SessionManager.getSessionStart();
// Returns: number | null
```

#### isSessionExpired()
```javascript
const expired = SessionManager.isSessionExpired();
// Returns: boolean
```

#### refreshSession()
```javascript
SessionManager.refreshSession();
// Updates session timestamp
```

#### endSession()
```javascript
SessionManager.endSession();
// Clears session data
```

#### checkSession()
```javascript
const valid = SessionManager.checkSession();
// Returns: boolean
// Auto-logout if expired
```

#### setupAutoCheck()
```javascript
SessionManager.setupAutoCheck();
// Checks session every 60 seconds
```

---

## Security Features

### Input Sanitization

**Module**: `Sanitizer`

#### Methods

**sanitize(input)**
```javascript
Sanitizer.sanitize('<script>alert("xss")</script>');
// Returns: "alert(\"xss\")" (tags removed, entities encoded)
```

**sanitizeObject(obj)**
```javascript
Sanitizer.sanitizeObject({ name: '<b>John</b>', age: 25 });
// Returns: { name: '&lt;b&gt;John&lt;/b&gt;', age: 25 }
```

#### Protection Against
- XSS (Cross-Site Scripting)
- HTML injection
- JavaScript protocol injection

---

### Validation

**Module**: `Validator`

#### Methods

**isValidEmail(email)**
```javascript
Validator.isValidEmail('test@example.com'); // true
Validator.isValidEmail('invalid'); // false
```

**isValidPassword(password)**
```javascript
Validator.isValidPassword('SecurePass123');
// Returns: { valid: true, errors: [] }

Validator.isValidPassword('weak');
// Returns: { valid: false, errors: ['Password minimal 8 karakter', ...] }
```

**validateRequired(fields)**
```javascript
Validator.validateRequired({ name: '', email: 'test@test.com' });
// Returns: { valid: false, missingFields: ['name'] }
```

---

### CSRF Protection

**Module**: `CSRFManager`

#### Methods

**generateToken()**
```javascript
const token = CSRFManager.generateToken();
// Returns: 64-character hex string
```

**getToken()**
```javascript
const token = CSRFManager.getToken();
// Returns existing or creates new token
```

**validateToken(token)**
```javascript
CSRFManager.validateToken(token);
// Returns: boolean
```

---

### Password Hashing

**Function**: `simpleHash(str)`

⚠️ **Warning**: Ini hanya untuk demo. Gunakan bcrypt/argon2 di production.

```javascript
simpleHash('password123');
// Returns: hexadecimal hash string
```

---

## Error Handling

### Global Error Handler

```javascript
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message, 'at', e.filename + ':' + e.lineno);
});
```

### Try-Catch Blocks

Semua operasi critical menggunakan try-catch:
- JSON parsing dari localStorage
- Fetch API calls
- Session management

### Error Messages

Defined in `config.example.js`:
```javascript
ERROR_MESSAGES: {
  NETWORK_ERROR: 'Gagal terhubung ke server...',
  UNAUTHORIZED: 'Anda tidak memiliki akses...',
  SESSION_EXPIRED: 'Sesi Anda telah berakhir...',
  INVALID_INPUT: 'Input tidak valid...',
  SERVER_ERROR: 'Terjadi kesalahan pada server...'
}
```

---

## Performance Optimizations

### Throttling

```javascript
// Navbar scroll effect throttled to 100ms
const updateNavbarShadow = throttle(function() {
    // ...
}, 100);
```

### Debouncing

```javascript
// For search inputs or resize handlers
const debouncedSearch = debounce(function(query) {
    // ...
}, 300);
```

### Caching

- Repository data cached for 5 minutes
- Reduces GitHub API calls
- Improves load times

---

## Testing

### Running Tests

**Browser**:
```html
<script src="js/config.example.js"></script>
<script src="js/utils.js"></script>
<script src="js/tests.js"></script>
```

**Node.js**:
```bash
node js/tests.js
```

### Test Coverage

- ✅ Sanitizer functions (5 tests)
- ✅ Validator functions (9 tests)
- ✅ SessionManager (5 tests)
- ✅ CSRFManager (5 tests)
- ✅ Utility functions (3 tests)

**Total**: 27 unit tests

---

## File Structure

```
mediadigital/
├── js/
│   ├── config.example.js    # Environment configuration
│   ├── utils.js             # Security & utility functions
│   ├── main.js              # Authentication & main logic
│   ├── repo-manager.js      # GitHub API integration
│   └── tests.js             # Unit tests
├── login.html               # Login page
├── register.html            # Registration page
├── index.html               # Home page
└── dashboard/
    └── index.html           # Admin dashboard
```

---

## Best Practices

1. **Always sanitize user input** before displaying
2. **Validate on both client and server** (when backend added)
3. **Use HTTPS** in production
4. **Never commit config.js** with sensitive data
5. **Regular session timeout checks**
6. **Implement rate limiting** on backend
7. **Use prepared statements** for SQL (when added)
8. **Enable CSP headers** in production

---

## Version History

- **v2.0.0** (Current)
  - Added input sanitization
  - Implemented session management
  - Added CSRF protection
  - Enhanced error handling
  - Added unit tests
  - GitHub API caching
  - Rate limit handling

---

## Support

Untuk pertanyaan atau issue, silakan hubungi tim development atau buat issue di repository.

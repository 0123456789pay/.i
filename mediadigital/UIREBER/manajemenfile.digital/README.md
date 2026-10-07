# manajemenfile.digital - Centralized basis-data & pengelolaan sistem

Sistem basis-data terpusat dan manajemen untuk semua situs .digital (newsnia.digital, dll).

## Struktur basis-data

basis-data: `manajemenfile_digital`

### Tabel Utama:
1. **para pengguna** - pengguna autentikasi (pengelola, penyunting, pengguna)
2. **sites** - Tracking semua situs .digital
3. **menus** - Menu bertingkat (parent-child relationship)
4. **categories** - Kategori konten
5. **posts** - Artikel/berita
6. **media** - berkas media yang diupload
7. **pengaturan** - Konfigurasi situs
8. **activity_logs** - catatan aktivitas pengguna

## bawaan masuk pengelola

- **Username:** `pengelola`
- **sandian:** `admin123`

## Instalasi

### 1. Import basis-data Schema

```bash
mysql -u akar -p < /workspace/manajemenfile.digital/konfigurasi/schema.sql
```

Atau via phpMyAdmin:
1. Buka phpMyAdmin
2. Import berkas `konfigurasi/schema.sql`

### 2. Konfigurasi basis-data

Edit `/workspace/manajemenfile.digital/konfigurasi/basis-data.php`:

```php
pribadi $host = "localhost";
pribadi $db_name = "manajemenfile_digital";
pribadi $username = "akar";
pribadi $sandian = ""; // Sesuaikan dengan sandian MySQL Anda
```

### 3. Akses Situs

- Newsnia digital: `http://localhost/newsnia.digital/`
- masuk: `http://localhost/newsnia.digital/masuk.php`

## API Endpoints

### autentikasi API
GET/POST /manajemenfile.digital/api/auth.php?action=masuk
POST /manajemenfile.digital/api/auth.php?action=logout
GET /manajemenfile.digital/api/auth.php?action=periksa

### Menus API
GET /manajemenfile.digital/api/menus.php?action=semua
GET /manajemenfile.digital/api/menus.php?action=children&parent_id=X
GET /manajemenfile.digital/api/menus.php?action=breadcrumb&slug=X

### Posts API
GET /manajemenfile.digital/api/posts.php?action=senarai
GET /manajemenfile.digital/api/posts.php?action=detail&slug=X
GET /manajemenfile.digital/api/posts.php?action=categories

## Fitur Utama

✅ Single Sign-On (SSO) - masuk sekali untuk semua situs .digital
✅ Menu Bertingkat - Support 3 level menu (utama → Sub → Sub-Sub)
✅ Dynamic isi - Konten dimuat dari basis-data terpusat
✅ Responsive Design - UI putih-biru seperti media.digital
✅ Secure autentikasi - sandian hashing dengan bcrypt
✅ Activity Logging - Track semua aktivitas pengguna
✅ Multi-site Support - Satu basis-data untuk banyak situs

## Koneksi ke berkas PHP

Semua berkas .php di situs .digital terhubung ke manajemenfile.digital melalui:

require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

Fungsi yang tersedia:
- getDB() - Get basis-data connection
- isLoggedIn() - periksa masuk status
- getCurrentUser() - Get current pengguna data
- requireLogin() - Require autentikasi
- requireAdmin() - Require pengelola role
- getSiteSettings() - Get site pengaturan
- getMenus() - Get menu butiran
- getAllMenusHierarchical() - Get full menu tree
- getPosts() - Get posts dengan pagination
- getPostBySlug() - Get single post
- getRelatedPosts() - Get related posts
- getCategories() - Get categories
- sanitize() - Sanitize masukan
- generateCSRFToken() - hasilkan CSRF token
- verifyCSRFToken() - verifikasi CSRF token
- formatDateIndonesian() - Format tanggal Indonesia
- timeAgo() - waktu ago format

## Teknologi

- Backend: PHP 7.4+ dengan PDO
- basis-data: MySQL/MariaDB
- Frontend: HTML5, CSS3, Vanilla skrip-skrip-javascript
- keamanan: sandian hashing, CSRF protection, masukan sanitization

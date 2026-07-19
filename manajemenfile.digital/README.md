# manajemenfile.digital - Centralized Database & Management System

Sistem database terpusat dan manajemen untuk semua situs .digital (newsnia.digital, dll).

## Struktur Database

Database: `manajemenfile_digital`

### Tabel Utama:
1. **users** - User authentication (admin, editor, user)
2. **sites** - Tracking semua situs .digital
3. **menus** - Menu bertingkat (parent-child relationship)
4. **categories** - Kategori konten
5. **posts** - Artikel/berita
6. **media** - File media yang diupload
7. **settings** - Konfigurasi situs
8. **activity_logs** - Log aktivitas user

## Default Login Admin

- **Username:** `admin`
- **Password:** `admin123`

## Instalasi

### 1. Import Database Schema

```bash
mysql -u root -p < /workspace/manajemenfile.digital/config/schema.sql
```

Atau via phpMyAdmin:
1. Buka phpMyAdmin
2. Import file `config/schema.sql`

### 2. Konfigurasi Database

Edit `/workspace/manajemenfile.digital/config/database.php`:

```php
private $host = "localhost";
private $db_name = "manajemenfile_digital";
private $username = "root";
private $password = ""; // Sesuaikan dengan password MySQL Anda
```

### 3. Akses Situs

- Newsnia Digital: `http://localhost/newsnia.digital/`
- Login: `http://localhost/newsnia.digital/login.php`

## API Endpoints

### Authentication API
GET/POST /manajemenfile.digital/api/auth.php?action=login
POST /manajemenfile.digital/api/auth.php?action=logout
GET /manajemenfile.digital/api/auth.php?action=check

### Menus API
GET /manajemenfile.digital/api/menus.php?action=all
GET /manajemenfile.digital/api/menus.php?action=children&parent_id=X
GET /manajemenfile.digital/api/menus.php?action=breadcrumb&slug=X

### Posts API
GET /manajemenfile.digital/api/posts.php?action=list
GET /manajemenfile.digital/api/posts.php?action=detail&slug=X
GET /manajemenfile.digital/api/posts.php?action=categories

## Fitur Utama

✅ Single Sign-On (SSO) - Login sekali untuk semua situs .digital
✅ Menu Bertingkat - Support 3 level menu (Main → Sub → Sub-Sub)
✅ Dynamic Content - Konten dimuat dari database terpusat
✅ Responsive Design - UI putih-biru seperti media.digital
✅ Secure Authentication - Password hashing dengan bcrypt
✅ Activity Logging - Track semua aktivitas user
✅ Multi-site Support - Satu database untuk banyak situs

## Koneksi ke File PHP

Semua file .php di situs .digital terhubung ke manajemenfile.digital melalui:

require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

Fungsi yang tersedia:
- getDB() - Get database connection
- isLoggedIn() - Check login status
- getCurrentUser() - Get current user data
- requireLogin() - Require authentication
- requireAdmin() - Require admin role
- getSiteSettings() - Get site configuration
- getMenus() - Get menu items
- getAllMenusHierarchical() - Get full menu tree
- getPosts() - Get posts with pagination
- getPostBySlug() - Get single post
- getRelatedPosts() - Get related posts
- getCategories() - Get categories
- sanitize() - Sanitize input
- generateCSRFToken() - Generate CSRF token
- verifyCSRFToken() - Verify CSRF token
- formatDateIndonesian() - Format tanggal Indonesia
- timeAgo() - Time ago format

## Teknologi

- Backend: PHP 7.4+ dengan PDO
- Database: MySQL/MariaDB
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Security: Password hashing, CSRF protection, Input sanitization

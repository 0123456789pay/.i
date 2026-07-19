# newsnia.digital

Portal Berita Digital dengan UI Putih-Biru seperti media.digital

## Struktur Folder

```
newsnia.digital/
├── config/
│   ├── database.php      # Konfigurasi database
│   └── schema.sql        # Database schema & seed data
├── includes/
│   ├── header.php        # Header dengan menu bertingkat
│   ├── footer.php        # Footer dengan section informasi
│   └── menu_loader.php   # API loader untuk menu AJAX
├── assets/
│   ├── css/
│   │   └── style.css     # Main stylesheet (putih-biru)
│   ├── js/
│   │   └── main.js       # JavaScript untuk interaksi UI
│   └── images/           # Folder untuk gambar
├── modules/
│   ├── berita/           # Modul Berita Digital
│   ├── publikasi/        # Modul Publikasi Digital
│   ├── galeri/           # Modul Galeri Digital
│   ├── event/            # Modul Event Digital
│   └── direktori/        # Modul Direktori Digital
├── templates/            # Template files
├── uploads/              # User uploads
├── index.php             # Homepage
├── login.php             # Halaman login
├── register.php          # Halaman register
├── detail.php            # Halaman detail berita
└── logout.php            # Logout handler
```

## Fitur Utama

### 1. UI/UX
- Tema putih-biru seperti media.digital
- Responsive design (mobile-friendly)
- Menu bertingkat (Main Menu → Sub Menu → Sub-Sub Menu)
- Card-based news layout
- Smooth animations dan transitions

### 2. Sistem Autentikasi
- Login dengan username/email
- Register dengan validasi lengkap
- Session management
- Password hashing (bcrypt)

### 3. Menu Bertingkat
- 5 Menu Utama (.digital):
  - berita.digital
  - publikasi.digital
  - galeri.digital
  - event.digital
  - direktori.digital
- Sub Menu dan Sub-Sub Menu support
- Dynamic menu loading dari database

### 4. Konten Berita
- Homepage dengan latest news
- Detail berita lengkap
- Related articles
- View counter
- Social sharing buttons
- Kategori dan tag

### 5. Database Schema
- Users table (login/register)
- Menus table (menu bertingkat)
- Categories table
- Posts table (berita/artikel)
- Post Details table (konten tambahan)

## Instalasi

### 1. Setup Database
```bash
mysql -u root -p < config/schema.sql
```

### 2. Konfigurasi Database
Edit `config/database.php` sesuai konfigurasi server Anda:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'newsnia_digital');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### 3. Akses Aplikasi
Buka browser dan akses:
```
http://localhost/newsnia.digital/
```

### 4. Login Default
- Username: `admin`
- Password: `admin123`

## Teknologi

- **Backend**: PHP (Native)
- **Database**: MySQL/MariaDB
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS dengan CSS Variables
- **Database Access**: PDO (PHP Data Objects)

## Struktur Menu

```
Menu Utama (Level 1)
├── Berita Digital
│   ├── Nasional (Level 2)
│   │   ├── Politik (Level 3)
│   │   ├── Hukum (Level 3)
│   │   └── Pendidikan (Level 3)
│   ├── Internasional (Level 2)
│   ├── Ekonomi (Level 2)
│   └── Teknologi (Level 2)
├── Publikasi Digital
├── Galeri Digital
├── Event Digital
└── Direktori Digital
```

## Footer Section

Footer terdiri dari 4 section tanpa link duplikat:
1. **Tentang newsnia.digital** - Deskripsi dan social media
2. **Menu Utama** - Link ke 5 modul .digital
3. **Kategori Berita** - Link kategori berita
4. **Informasi** - Link kebijakan dan informasi

## API Endpoints

- `includes/menu_loader.php` - Get menus in JSON format
- `modules/berita/index.php` - News listing with AJAX support

## Customization

### Warna Tema
Edit CSS Variables di `assets/css/style.css`:
```css
:root {
    --primary-blue: #0066cc;
    --dark-blue: #004c99;
    --light-blue: #e6f2ff;
    --white: #ffffff;
}
```

### Menambah Menu Baru
Insert ke tabel `menus`:
```sql
INSERT INTO menus (parent_id, title, slug, module_type, sort_order) 
VALUES (NULL, 'Menu Baru', 'menu-baru.digital', 'default', 6);
```

## License

© 2024 newsnia.digital - All Rights Reserved

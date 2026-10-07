# newsnia.digital

Portal Berita digital dengan UI Putih-Biru seperti newsnia.digital

## Struktur direktori

```
newsnia.digital/
├── konfigurasi/
│   ├── basis-data.php      # Konfigurasi basis-data
│   └── schema.sql        # basis-data schema & seed data
├── includes/
│   ├── kepala.php        # kepala dengan menu bertingkat
│   ├── kaki.php        # kaki dengan bagian informasi
│   └── menu_loader.php   # API loader untuk menu AJAX
├── assets/
│   ├── css/
│   │   └── gaya.css     # utama lembar gaya (putih-biru)
│   ├── js/
│   │   └── utama.js       # skrip-skrip-javascript untuk interaksi UI
│   └── gambar/           # direktori untuk gambar
├── modules/
│   ├── berita/           # Modul Berita digital
│   ├── publikasi/        # Modul Publikasi digital
│   ├── galeri/           # Modul Galeri digital
│   ├── event/            # Modul Event digital
│   └── direktori/        # Modul Direktori digital
├── templates/            # Template berkas-berkas
├── uploads/              # pengguna uploads
├── indeks.php             # Homepage
├── masuk.php             # Halaman masuk
├── daftar.php          # Halaman daftar
├── detail.php            # Halaman detail berita
└── logout.php            # Logout pengendali
```

## Fitur Utama

### 1. UI/UX
- Tema putih-biru seperti newsnia.digital
- Responsive design (mobile-friendly)
- Menu bertingkat (utama Menu → Sub Menu → Sub-Sub Menu)
- Card-based news tata letak
- Smooth animations dan transitions

### 2. Sistem Autentikasi
- masuk dengan username/sur-el
- daftar dengan validasi lengkap
- sesi pengelolaan
- sandian hashing (bcrypt)

### 3. Menu Bertingkat
- 5 Menu Utama (.digital):
  - berita.digital
  - publikasi.digital
  - galeri.digital
  - event.digital
  - direktori.digital
- Sub Menu dan Sub-Sub Menu support
- Dynamic menu loading dari basis-data

### 4. Konten Berita
- Homepage dengan latest news
- Detail berita lengkap
- Related articles
- View counter
- Social sharing buttons
- Kategori dan tag

### 5. basis-data Schema
- para pengguna tabel (masuk/daftar)
- Menus tabel (menu bertingkat)
- Categories tabel
- Posts tabel (berita/artikel)
- Post Details tabel (konten tambahan)

## Instalasi

### 1. Setup basis-data
```bash
mysql -u akar -p < konfigurasi/schema.sql
```

### 2. Konfigurasi basis-data
Edit `konfigurasi/basis-data.php` sesuai konfigurasi peladen Anda:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'newsnia_digital');
define('DB_USER', 'akar');
define('DB_PASS', '');
```

### 3. Akses Aplikasi
Buka browser dan akses:
```
http://localhost/newsnia.digital/
```

### 4. masuk bawaan
- Username: `pengelola`
- sandian: `admin123`

## Teknologi

- **Backend**: PHP (Native)
- **basis-data**: MySQL/MariaDB
- **Frontend**: HTML5, CSS3, skrip-skrip-javascript (Vanilla)
- **Styling**: suai CSS dengan CSS Variables
- **basis-data Access**: PDO (PHP data Objects)

## Struktur Menu

```
Menu Utama (Level 1)
├── Berita digital
│   ├── Nasional (Level 2)
│   │   ├── Politik (Level 3)
│   │   ├── Hukum (Level 3)
│   │   └── Pendidikan (Level 3)
│   ├── Internasional (Level 2)
│   ├── Ekonomi (Level 2)
│   └── Teknologi (Level 2)
├── Publikasi digital
├── Galeri digital
├── Event digital
└── Direktori digital
```

## kaki bagian

kaki terdiri dari 4 bagian tanpa tautan duplikat:
1. **Tentang newsnia.digital** - Deskripsi dan social media
2. **Menu Utama** - tautan ke 5 modul .digital
3. **Kategori Berita** - tautan kategori berita
4. **Informasi** - tautan kebijakan dan informasi

## API Endpoints

- `includes/menu_loader.php` - Get menus in JSON format
- `modules/berita/indeks.php` - News listing dengan AJAX support

## Customization

### Warna Tema
Edit CSS Variables di `assets/css/gaya.css`:
```css
:akar {
    --primary-blue: #0066cc;
    --dark-blue: #004c99;
    --light-blue: #e6f2ff;
    --white: #ffffff;
}
```

### Menambah Menu Baru
sisip ke tabel `menus`:
```sql
sisip INTO menus (parent_id, judul, slug, module_type, sort_order) 
VALUES (NULL, 'Menu Baru', 'menu-baru.digital', 'bawaan', 6);
```

## License

© 2024 newsnia.digital - semua Rights Reserved

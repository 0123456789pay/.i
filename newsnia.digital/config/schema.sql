-- Database Schema untuk newsnia.digital
-- Struktur menu bertingkat dan konten berita

CREATE DATABASE IF NOT EXISTS newsnia_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE newsnia_digital;

-- Tabel Users untuk Login/Register
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Menu Bertingkat (Main, Sub, Sub-Sub)
CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT DEFAULT NULL,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    module_type VARCHAR(50) DEFAULT 'default',
    icon VARCHAR(50) DEFAULT '',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE
);

-- Tabel Kategori Berita
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT DEFAULT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Berita/Artikel
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    category_id INT,
    author_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    views INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel Detail Konten (untuk fitur detail)
CREATE TABLE IF NOT EXISTS post_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    detail_type VARCHAR(50) NOT NULL,
    detail_content TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Insert Menu Utama (5 folder .digital)
INSERT INTO menus (title, slug, module_type, icon, sort_order) VALUES
('Berita Digital', 'berita.digital', 'berita', 'newspaper', 1),
('Publikasi Digital', 'publikasi.digital', 'publikasi', 'document', 2),
('Galeri Digital', 'galeri.digital', 'galeri', 'images', 3),
('Event Digital', 'event.digital', 'event', 'calendar', 4),
('Direktori Digital', 'direktori.digital', 'direktori', 'list', 5);

-- Insert Sub Menu untuk Berita
INSERT INTO menus (parent_id, title, slug, module_type, sort_order) VALUES
(1, 'Nasional', 'berita/nasional.digital', 'berita', 1),
(1, 'Internasional', 'berita/internasional.digital', 'berita', 2),
(1, 'Ekonomi', 'berita/ekonomi.digital', 'berita', 3),
(1, 'Teknologi', 'berita/teknologi.digital', 'berita', 4);

-- Insert Sub-Sub Menu untuk Nasional
INSERT INTO menus (parent_id, title, slug, module_type, sort_order) VALUES
(6, 'Politik', 'berita/nasional/politik.digital', 'berita', 1),
(6, 'Hukum', 'berita/nasional/hukum.digital', 'berita', 2),
(6, 'Pendidikan', 'berita/nasional/pendidikan.digital', 'berita', 3);

-- Insert User Admin Default (password: admin123)
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@newsnia.digital', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin');

-- Insert Sample Categories
INSERT INTO categories (name, slug, description) VALUES
('Berita Utama', 'berita-utama', 'Berita utama dan terkini'),
('Nasional', 'nasional', 'Berita dari dalam negeri'),
('Internasional', 'internasional', 'Berita dari luar negeri'),
('Ekonomi', 'ekonomi', 'Berita ekonomi dan bisnis'),
('Teknologi', 'teknologi', 'Berita teknologi dan digital');

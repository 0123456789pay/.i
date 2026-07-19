-- Database Schema for manajemenfile.digital
-- Centralized database for all .digital sites

CREATE DATABASE IF NOT EXISTS manajemenfile_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE manajemenfile_digital;

-- Users table (admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@manajemenfile.digital', 'Administrator', 'admin');

-- Sites table (to track all .digital sites)
CREATE TABLE IF NOT EXISTS sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(100) UNIQUE NOT NULL,
    site_path VARCHAR(255) NOT NULL,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menus table (hierarchical menu structure)
CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT DEFAULT NULL,
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    url VARCHAR(255),
    module_type VARCHAR(50),
    sort_order INT DEFAULT 0,
    is_visible TINYINT(1) DEFAULT 1,
    icon_class VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT DEFAULT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Posts/Articles table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
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

-- Media files table
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Site settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_key VARCHAR(50) UNIQUE NOT NULL,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_setting (site_key, setting_key)
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample menus
INSERT INTO menus (title, slug, url, module_type, sort_order, icon_class) VALUES
('Beranda', 'beranda', '/newsnia.digital/', 'home', 1, 'fas fa-home'),
('Berita', 'berita', '/newsnia.digital/modules/berita/', 'berita', 2, 'fas fa-newspaper'),
('Publikasi', 'publikasi', '/newsnia.digital/modules/publikasi/', 'publikasi', 3, 'fas fa-book'),
('Galeri', 'galeri', '/newsnia.digital/modules/galeri/', 'galeri', 4, 'fas fa-images'),
('Event', 'event', '/newsnia.digital/modules/event/', 'event', 5, 'fas fa-calendar'),
('Direktori', 'direktori', '/newsnia.digital/modules/direktori/', 'direktori', 6, 'fas fa-folder');

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Nasional', 'nasional', 'Berita nasional terkini'),
('Internasional', 'internasional', 'Berita internasional'),
('Teknologi', 'teknologi', 'Berita teknologi dan inovasi'),
('Ekonomi', 'ekonomi', 'Berita ekonomi dan bisnis'),
('Olahraga', 'olahraga', 'Berita olahraga');

-- Insert sample posts
INSERT INTO posts (title, slug, content, excerpt, category_id, author_id, status, published_at) VALUES
('Selamat Datang di Newsnia Digital', 'selamat-datang-di-newsnia-digital', '<p>Newsnia Digital adalah platform berita modern dengan tampilan yang elegan dan fungsional.</p>', 'Platform berita modern untuk informasi terkini', 3, 1, 'published', NOW()),
('Teknologi AI Berkembang Pesat di 2024', 'teknologi-ai-berkembang-pesat-di-2024', '<p>Kecerdasan buatan terus mengalami perkembangan signifikan di berbagai sektor.</p>', 'AI mengalami perkembangan pesat di berbagai industri', 3, 1, 'published', NOW()),
('Ekonomi Digital Indonesia Tumbuh 15%', 'ekonomi-digital-indonesia-tumbuh-15', '<p>Sektor ekonomi digital Indonesia mencatat pertumbuhan impresif tahun ini.</p>', 'Pertumbuhan ekonomi digital mencapai 15 persen', 4, 1, 'published', NOW());

-- Insert default settings
INSERT INTO settings (site_key, setting_key, setting_value, setting_type) VALUES
('newsnia', 'site_title', 'Newsnia Digital', 'text'),
('newsnia', 'site_description', 'Portal Berita Digital Terpercaya', 'text'),
('newsnia', 'site_logo', '/assets/images/logo.png', 'text'),
('newsnia', 'primary_color', '#0066cc', 'text'),
('newsnia', 'secondary_color', '#ffffff', 'text'),
('newsnia', 'posts_per_page', '10', 'number'),
('newsnia', 'enable_comments', '1', 'boolean');

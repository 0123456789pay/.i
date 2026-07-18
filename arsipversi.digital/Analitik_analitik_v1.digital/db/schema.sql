-- Database Schema untuk Analitik Analitik V1
-- Media.Digital Platform

-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS media_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE media_digital;

-- Tabel untuk menyimpan data modul Analitik Analitik V1
CREATE TABLE IF NOT EXISTS analitik_analitik_v1_digital_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content LONGTEXT,
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    metadata JSON,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel untuk konfigurasi modul
CREATE TABLE IF NOT EXISTS analitik_analitik_v1_digital_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert konfigurasi default
INSERT INTO analitik_analitik_v1_digital_config (config_key, config_value, config_type, description) VALUES
('module_enabled', 'true', 'boolean', 'Aktifkan modul Analitik Analitik V1'),
('max_items', '100', 'number', 'Jumlah maksimum item'),
('cache_duration', '3600', 'number', 'Durasi cache dalam detik'),
('theme', 'default', 'string', 'Tema yang digunakan')
ON DUPLICATE KEY UPDATE config_value=config_value;

-- Tabel untuk log aktivitas
CREATE TABLE IF NOT EXISTS analitik_analitik_v1_digital_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    user_id INT,
    details JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- View untuk statistik
CREATE OR REPLACE VIEW analitik_analitik_v1_digital_stats AS
SELECT 
    COUNT(*) as total_items,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_items,
    SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_items,
    DATE(MAX(created_at)) as last_created
FROM analitik_analitik_v1_digital_data;

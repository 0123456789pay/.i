-- Pusat Digital Database Schema
-- Central DataCenter Management System

CREATE DATABASE IF NOT EXISTS pusat_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pusat_digital;

-- System Configuration Table
CREATE TABLE IF NOT EXISTS system_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DataCenter Servers Table
CREATE TABLE IF NOT EXISTS datacenter_servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    server_name VARCHAR(100) NOT NULL,
    server_ip VARCHAR(45),
    server_type ENUM('web', 'database', 'cache', 'api', 'storage') DEFAULT 'web',
    status ENUM('online', 'offline', 'maintenance') DEFAULT 'offline',
    cpu_usage DECIMAL(5,2),
    memory_usage DECIMAL(5,2),
    storage_usage DECIMAL(5,2),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Domains Table
CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    domain_type ENUM('primary', 'subdomain', 'parked', 'redirect') DEFAULT 'primary',
    ssl_status ENUM('active', 'pending', 'expired', 'none') DEFAULT 'none',
    dns_records JSON,
    registration_date DATE,
    expiry_date DATE,
    status ENUM('active', 'suspended', 'expired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hosting Accounts Table
CREATE TABLE IF NOT EXISTS hosting_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    plan_type ENUM('free', 'basic', 'premium', 'enterprise') DEFAULT 'free',
    disk_quota BIGINT DEFAULT 0,
    disk_used BIGINT DEFAULT 0,
    bandwidth_limit BIGINT DEFAULT 0,
    bandwidth_used BIGINT DEFAULT 0,
    status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Files & Folders Table
CREATE TABLE IF NOT EXISTS file_system (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    file_type ENUM('file', 'folder') DEFAULT 'file',
    mime_type VARCHAR(100),
    file_size BIGINT DEFAULT 0,
    owner_id INT,
    permissions VARCHAR(20) DEFAULT '644',
    is_public BOOLEAN DEFAULT FALSE,
    indexed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES file_system(id) ON DELETE CASCADE
);

-- AI Agents Table
CREATE TABLE IF NOT EXISTS ai_agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    agent_name VARCHAR(100) NOT NULL,
    agent_type ENUM('rag', 'chatbot', 'classifier', 'generator', 'monitor') DEFAULT 'rag',
    model_version VARCHAR(50),
    configuration JSON,
    knowledge_base_id INT,
    status ENUM('training', 'ready', 'active', 'inactive') DEFAULT 'inactive',
    accuracy_score DECIMAL(5,2),
    total_queries BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RAG Knowledge Base Table
CREATE TABLE IF NOT EXISTS rag_knowledge_base (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kb_name VARCHAR(100) NOT NULL,
    description TEXT,
    document_count INT DEFAULT 0,
    vector_dimension INT DEFAULT 768,
    embedding_model VARCHAR(50),
    status ENUM('building', 'ready', 'updating') DEFAULT 'building',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Monitoring Metrics Table
CREATE TABLE IF NOT EXISTS monitoring_metrics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_type ENUM('cpu', 'memory', 'disk', 'network', 'request', 'error') DEFAULT 'cpu',
    metric_value DECIMAL(10,2),
    unit VARCHAR(20),
    source_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_timestamp (timestamp),
    INDEX idx_metric_name (metric_name)
);

-- Email System Table
CREATE TABLE IF NOT EXISTS email_system (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_address VARCHAR(255) UNIQUE NOT NULL,
    email_type ENUM('system', 'user', 'notification', 'marketing') DEFAULT 'user',
    smtp_host VARCHAR(100),
    smtp_port INT DEFAULT 587,
    is_verified BOOLEAN DEFAULT FALSE,
    last_sent_at TIMESTAMP NULL,
    total_sent INT DEFAULT 0,
    status ENUM('active', 'bounced', 'disabled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Language System Table
CREATE TABLE IF NOT EXISTS language_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    language_code VARCHAR(10) NOT NULL,
    translation_key VARCHAR(200) NOT NULL,
    translation_value TEXT,
    category VARCHAR(50),
    UNIQUE KEY unique_lang_key (language_code, translation_key)
);

-- Network Routes Table
CREATE TABLE IF NOT EXISTS network_routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100) NOT NULL,
    source_network VARCHAR(50),
    destination_network VARCHAR(50),
    gateway VARCHAR(45),
    metric INT DEFAULT 100,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default system configurations
INSERT INTO system_config (config_key, config_value, category) VALUES
('system.name', 'Pusat Digital', 'general'),
('system.version', '1.0.0', 'general'),
('system.timezone', 'Asia/Jakarta', 'general'),
('security.encryption', 'AES-256', 'security'),
('security.session_timeout', '3600', 'security'),
('performance.cache_enabled', 'true', 'performance'),
('performance.compression', 'gzip', 'performance');

-- Insert default languages
INSERT INTO language_translations (language_code, translation_key, translation_value, category) VALUES
('id', 'welcome', 'Selamat Datang', 'general'),
('en', 'welcome', 'Welcome', 'general'),
('id', 'dashboard', 'Dasbor', 'navigation'),
('en', 'dashboard', 'Dashboard', 'navigation'),
('id', 'datacenter', 'Pusat Data', 'navigation'),
('en', 'datacenter', 'Data Center', 'navigation');

SELECT 'Database schema created successfully!' AS status;

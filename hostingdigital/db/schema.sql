-- Database schema for Hosting Digital
-- Create database
CREATE DATABASE IF NOT EXISTS hostingdigital_db;
USE hostingdigital_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    company_name VARCHAR(100),
    npwp VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_type ENUM('hosting', 'domain', 'vps', 'ssl', 'email') NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    package_name VARCHAR(100),
    status ENUM('active', 'suspended', 'cancelled', 'pending') DEFAULT 'pending',
    start_date DATE,
    expiry_date DATE,
    auto_renewal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Domains table
CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    tld VARCHAR(10) NOT NULL,
    registration_date DATE,
    expiry_date DATE,
    auto_renewal BOOLEAN DEFAULT FALSE,
    whois_privacy BOOLEAN DEFAULT FALSE,
    nameservers TEXT,
    status ENUM('active', 'expired', 'pending_transfer', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('unpaid', 'paid', 'cancelled', 'overdue') DEFAULT 'unpaid',
    due_date DATE,
    paid_date TIMESTAMP NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    invoice_id INT NULL,
    transaction_type ENUM('payment', 'refund', 'credit', 'debit') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE SET NULL
);

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(200) NOT NULL,
    category ENUM('technical', 'billing', 'sales', 'general') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'answered', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Ticket replies table
CREATE TABLE IF NOT EXISTS ticket_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_staff BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Knowledge base articles table
CREATE TABLE IF NOT EXISTS knowledge_base (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category VARCHAR(100),
    content TEXT NOT NULL,
    views INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hosting packages table
CREATE TABLE IF NOT EXISTS hosting_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(100) NOT NULL,
    package_type ENUM('shared', 'cloud', 'vps', 'reseller') NOT NULL,
    storage VARCHAR(20),
    bandwidth VARCHAR(20),
    domains_allowed INT,
    databases_allowed INT,
    email_accounts VARCHAR(20),
    price_monthly DECIMAL(10, 2) NOT NULL,
    price_yearly DECIMAL(10, 2) NOT NULL,
    features TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample hosting packages
INSERT INTO hosting_packages (package_name, package_type, storage, bandwidth, domains_allowed, databases_allowed, email_accounts, price_monthly, price_yearly, features, is_popular) VALUES
('Hosting Unlimited', 'shared', 'Unlimited', 'Unlimited', 1, 'Unlimited', 'Unlimited', 25000, 250000, 'Free SSL, LiteSpeed, LSCache', TRUE),
('Hosting WordPress', 'shared', '10GB NVMe', 'Unlimited', 1, 5, 'Unlimited', 35000, 350000, 'WP Optimized, Auto Updates, Staging', TRUE),
('Cloud Starter', 'cloud', '50GB NVMe', '2TB', 5, 10, 'Unlimited', 150000, 1500000, 'Dedicated Resources, Free CDN', FALSE),
('VPS Linux Basic', 'vps', '25GB NVMe', '1TB', 'Unlimited', 'Unlimited', 'Unlimited', 200000, 2000000, 'Root Access, Choice of OS', FALSE);

-- Selector True Secure Database Schema
-- Version: 1.0.0
-- Database: SQLite/MySQL Compatible

-- Core Configuration Table
CREATE TABLE IF NOT EXISTS config_core (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    config_type VARCHAR(50) DEFAULT 'string',
    secure_flag BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Binary Flags Table
CREATE TABLE IF NOT EXISTS binary_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flag_hex VARCHAR(10) NOT NULL UNIQUE,
    flag_name VARCHAR(50) NOT NULL,
    flag_value INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Symbol Registry Table
CREATE TABLE IF NOT EXISTS symbol_registry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol_name VARCHAR(100) NOT NULL UNIQUE,
    symbol_binary VARCHAR(4) NOT NULL,
    symbol_status VARCHAR(20) DEFAULT 'inactive',
    security_level INTEGER DEFAULT 1,
    validated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regex Patterns Table
CREATE TABLE IF NOT EXISTS regex_patterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_name VARCHAR(100) NOT NULL UNIQUE,
    pattern_expression TEXT NOT NULL,
    pattern_description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activation Logs Table
CREATE TABLE IF NOT EXISTS activation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id VARCHAR(64) NOT NULL,
    action VARCHAR(50) NOT NULL,
    symbol_name VARCHAR(100),
    result VARCHAR(20) NOT NULL,
    browser_info TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Security Levels Table
CREATE TABLE IF NOT EXISTS security_levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_name VARCHAR(50) NOT NULL UNIQUE,
    level_value INTEGER NOT NULL UNIQUE,
    description TEXT,
    requirements TEXT
);

-- Browser Compatibility Table
CREATE TABLE IF NOT EXISTS browser_compatibility (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    browser_name VARCHAR(50) NOT NULL UNIQUE,
    browser_version VARCHAR(20),
    supported BOOLEAN DEFAULT TRUE,
    last_tested TIMESTAMP,
    compatibility_score DECIMAL(5,2) DEFAULT 100.00
);

-- Formula Cache Table
CREATE TABLE IF NOT EXISTS formula_cache (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula_name VARCHAR(100) NOT NULL UNIQUE,
    formula_result TEXT,
    computed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    valid BOOLEAN DEFAULT TRUE
);

-- Insert Default Binary Flags
INSERT OR IGNORE INTO binary_flags (flag_hex, flag_name, flag_value) VALUES
('0x01', 'INITIALIZE', 1),
('0x02', 'VALIDATE', 2),
('0x04', 'ACTIVATE', 4),
('0x08', 'SECURE', 8),
('0x10', 'EXECUTE', 16);

-- Insert Default Security Levels
INSERT OR IGNORE INTO security_levels (level_name, level_value, description) VALUES
('BASIC', 1, 'Basic security level'),
('ENHANCED', 2, 'Enhanced security level'),
('SECURE', 3, 'Secure mode activated'),
('ULTRA_SECURE', 4, 'Maximum security level');

-- Insert Default Symbols
INSERT OR IGNORE INTO symbol_registry (symbol_name, symbol_binary, security_level) VALUES
('ALPHA', '0001', 1),
('BETA', '0010', 2),
('GAMMA', '0100', 3),
('DELTA', '1000', 4),
('OMEGA', '1111', 4);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_config_key ON config_core(config_key);
CREATE INDEX IF NOT EXISTS idx_symbol_name ON symbol_registry(symbol_name);
CREATE INDEX IF NOT EXISTS idx_pattern_name ON regex_patterns(pattern_name);
CREATE INDEX IF NOT EXISTS idx_session_id ON activation_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON activation_logs(created_at);

-- End of Schema

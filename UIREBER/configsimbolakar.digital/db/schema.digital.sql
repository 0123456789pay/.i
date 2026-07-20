-- Simbol Akar Digital Database Schema
-- File: simbol_akar.digital.db

-- Table: symbols
CREATE TABLE IF NOT EXISTS symbols (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL UNIQUE,
    unicode TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'math',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert root symbols
INSERT INTO symbols (symbol, unicode, name, category) VALUES 
    ('√', 'U+221A', 'Square Root', 'root'),
    ('∛', 'U+221B', 'Cube Root', 'root'),
    ('∜', 'U+221C', 'Fourth Root', 'root'),
    ('∑', 'U+2211', 'Summation', 'operator'),
    ('∏', 'U+220F', 'Product', 'operator'),
    ('∫', 'U+222B', 'Integral', 'operator');

-- Table: configs
CREATE TABLE IF NOT EXISTS configs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    config_type TEXT DEFAULT 'string',
    is_secure BOOLEAN DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert system configurations
INSERT INTO configs (config_key, config_value, config_type, is_secure) VALUES 
    ('root_symbol', '√', 'string', 0),
    ('binary_activation', '10101000 01010101 00101010', 'string', 1),
    ('secure_mode', '1', 'boolean', 0),
    ('encryption_method', 'AES-256', 'string', 1),
    ('hash_algorithm', 'SHA-256', 'string', 0),
    ('session_timeout', '3600', 'integer', 0);

-- Table: regex_patterns
CREATE TABLE IF NOT EXISTS regex_patterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_name TEXT NOT NULL UNIQUE,
    pattern_regex TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT 1
);

-- Insert regex patterns
INSERT INTO regex_patterns (pattern_name, pattern_regex, description) VALUES 
    ('root_symbol', '/^\\u221A|sqrt|akar|root$/i', 'Match root symbol variants'),
    ('decimal_number', '/[0-9]+\\.[0-9]+/g', 'Match decimal numbers'),
    ('math_symbols', '/[√∛∜∑∏∫]/g', 'Match mathematical symbols'),
    ('alphanumeric', '/^[a-zA-Z0-9]+$/', 'Match alphanumeric strings');

-- Table: formulas
CREATE TABLE IF NOT EXISTS formulas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    formula_name TEXT NOT NULL,
    formula_expression TEXT NOT NULL,
    formula_type TEXT DEFAULT 'math',
    variables TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert mathematical formulas
INSERT INTO formulas (formula_name, formula_expression, formula_type, variables) VALUES 
    ('Pythagorean', '√(x² + y²)', 'geometry', 'x,y'),
    ('Cube Root Sum', '∛(a³ + b³)', 'algebra', 'a,b'),
    ('Limit Infinity', 'lim(x→∞) √x', 'calculus', 'x');

-- Table: logs
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    user_ip TEXT,
    session_id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_symbols_category ON symbols(category);
CREATE INDEX IF NOT EXISTS idx_configs_key ON configs(config_key);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);

-- View: Active Symbols
CREATE VIEW IF NOT EXISTS active_symbols AS
SELECT symbol, unicode, name, category
FROM symbols
WHERE category IN ('root', 'operator');

-- View: Secure Configs
CREATE VIEW IF NOT EXISTS secure_configs AS
SELECT config_key, config_type, is_secure
FROM configs
WHERE is_secure = 1;

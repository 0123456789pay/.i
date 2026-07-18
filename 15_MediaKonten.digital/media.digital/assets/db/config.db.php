<?php
/**
 * MEDIA.DIGITAL - Database Configuration
 * Koneksi Database MySQL/MariaDB
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'media_digital');

// Create Database Connection
class Database {
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;
    private $conn;
    
    public function connect() {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",
                $this->user,
                $this->pass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            return $this->conn;
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
            return null;
        }
    }
}

// Alternative MySQLi Connection
function getMySQLiConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}

// Initialize Database Tables
function initDatabase() {
    $db = new Database();
    $pdo = $db->connect();
    
    if (!$pdo) return false;
    
    // Users Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        avatar VARCHAR(255),
        role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_username (username),
        INDEX idx_email (email),
        INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Systems Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS systems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100),
        description TEXT,
        icon VARCHAR(50),
        path VARCHAR(500),
        folder_count INT DEFAULT 0,
        file_count INT DEFAULT 0,
        status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Folders Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS folders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        system_id INT,
        parent_id INT NULL,
        name VARCHAR(255) NOT NULL,
        path VARCHAR(500) NOT NULL,
        depth INT DEFAULT 0,
        file_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE CASCADE,
        INDEX idx_system (system_id),
        INDEX idx_parent (parent_id),
        INDEX idx_path (path)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Files Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        folder_id INT,
        system_id INT,
        name VARCHAR(255) NOT NULL,
        filename VARCHAR(500) NOT NULL,
        extension VARCHAR(20),
        mime_type VARCHAR(100),
        size BIGINT,
        type ENUM('html', 'css', 'js', 'php', 'db', 'image', 'video', 'audio', 'document', 'other'),
        path VARCHAR(500) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE,
        FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE,
        INDEX idx_folder (folder_id),
        INDEX idx_system (system_id),
        INDEX idx_type (type),
        INDEX idx_extension (extension)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Activity Log Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS activity_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id INT,
        description TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_user (user_id),
        INDEX idx_action (action),
        INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Settings Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        setting_type ENUM('string', 'number', 'boolean', 'json', 'array') DEFAULT 'string',
        category VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_key (setting_key),
        INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    // Analytics Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        event_data JSON,
        user_id INT,
        session_id VARCHAR(100),
        page_url VARCHAR(500),
        referrer VARCHAR(500),
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event (event_type),
        INDEX idx_user (user_id),
        INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    
    return true;
}

// Helper Functions
function getUserById($id) {
    $db = new Database();
    $pdo = $db->connect();
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getSystemBySlug($slug) {
    $db = new Database();
    $pdo = $db->connect();
    
    $stmt = $pdo->prepare("SELECT * FROM systems WHERE slug = ? AND status = 'active'");
    $stmt->execute([$slug]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getAllSystems($category = null) {
    $db = new Database();
    $pdo = $db->connect();
    
    if ($category) {
        $stmt = $pdo->prepare("SELECT * FROM systems WHERE category = ? AND status = 'active' ORDER BY name");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM systems WHERE status = 'active' ORDER BY category, name");
        $stmt->execute();
    }
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function logActivity($userId, $action, $entityType = null, $entityId = null, $description = null) {
    $db = new Database();
    $pdo = $db->connect();
    
    $stmt = $pdo->prepare("INSERT INTO activity_log (user_id, action, entity_type, entity_id, description, ip_address, user_agent) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    return $stmt->execute([$userId, $action, $entityType, $entityId, $description, $ip, $userAgent]);
}

function getSetting($key, $default = null) {
    $db = new Database();
    $pdo = $db->connect();
    
    $stmt = $pdo->prepare("SELECT setting_value, setting_type FROM settings WHERE setting_key = ?");
    $stmt->execute([$key]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$result) {
        return $default;
    }
    
    $value = $result['setting_value'];
    $type = $result['setting_type'];
    
    switch($type) {
        case 'number':
            return (float)$value;
        case 'boolean':
            return (bool)$value;
        case 'json':
        case 'array':
            return json_decode($value, true);
        default:
            return $value;
    }
}

function setSetting($key, $value, $type = 'string', $category = 'general', $description = null) {
    $db = new Database();
    $pdo = $db->connect();
    
    if (is_array($value) || is_object($value)) {
        $value = json_encode($value);
    }
    
    $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value, setting_type, category, description) 
                           VALUES (?, ?, ?, ?, ?)
                           ON DUPLICATE KEY UPDATE 
                           setting_value = VALUES(setting_value),
                           setting_type = VALUES(setting_type),
                           category = VALUES(category),
                           description = VALUES(description)");
    
    return $stmt->execute([$key, $value, $type, $category, $description]);
}

// Auto-initialize database on include
// Uncomment in production: initDatabase();

?>

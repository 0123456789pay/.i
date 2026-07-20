<?php
/**
 * Database Configuration
 * Aireber Digital - AI Studio System
 */

define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'aireber_digital');
define('DB_USER', 'root');
define('DB_PASS', '');

// Database Connection Class
class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $name = DB_NAME;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $conn;
    
    public function connect() {
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->name};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->conn = new PDO($dsn, $this->user, $this->pass, $options);
            return $this->conn;
        } catch (PDOException $e) {
            error_log("Connection Error: " . $e->getMessage());
            return null;
        }
    }
}

// API Configuration
define('API_BASE_URL', '/api/v1');
define('API_KEY_HEADER', 'X-API-Key');

// Security Settings
define('JWT_SECRET', 'your-secret-key-change-in-production');
define('JWT_EXPIRY', 3600); // 1 hour

// AI/LLM Configuration
define('LLM_API_ENDPOINT', 'https://api.openai.com/v1');
define('RAG_ENABLED', true);
define('AUTO_ML_ENABLED', true);

return new Database();
?>

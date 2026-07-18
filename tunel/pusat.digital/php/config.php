<?php
/**
 * Pusat Digital - Configuration System
 * Central configuration for all digital systems
 */

class PusatDigitalConfig {
    private static $instance = null;
    
    public $systemId = 'PUSAT-DIGITAL-001';
    public $version = '1.0.0';
    public $environment = 'production';
    
    // Database Configuration
    public $database = [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'pusat_digital',
        'user' => 'root',
        'pass' => '',
        'charset' => 'utf8mb4'
    ];
    
    // Server Configuration
    public $server = [
        'timezone' => 'Asia/Jakarta',
        'language' => 'id',
        'encoding' => 'UTF-8'
    ];
    
    // Network Configuration
    public $network = [
        'api_endpoint' => '/api/v1',
        'timeout' => 30,
        'retry_attempts' => 3
    ];
    
    // Security Configuration
    public $security = [
        'encryption_key' => 'your-secret-key-here',
        'jwt_secret' => 'your-jwt-secret',
        'csrf_protection' => true,
        'rate_limiting' => true
    ];
    
    // Feature Modules
    public $modules = [
        'datacenter' => true,
        'filemanager' => true,
        'hosting' => true,
        'domain' => true,
        'ai_engine' => true,
        'monitoring' => true,
        'email_system' => true,
        'language_system' => true
    ];
    
    private function __construct() {
        $this->initialize();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function initialize() {
        date_default_timezone_set($this->server['timezone']);
        header('Content-Type: text/html; charset=' . $this->server['encoding']);
    }
    
    public function getModuleStatus($moduleName) {
        return isset($this->modules[$moduleName]) ? $this->modules[$moduleName] : false;
    }
    
    public function enableModule($moduleName) {
        $this->modules[$moduleName] = true;
    }
    
    public function disableModule($moduleName) {
        $this->modules[$moduleName] = false;
    }
    
    public function getSystemInfo() {
        return [
            'system_id' => $this->systemId,
            'version' => $this->version,
            'environment' => $this->environment,
            'php_version' => phpversion(),
            'server_time' => date('Y-m-d H:i:s'),
            'active_modules' => array_filter($this->modules)
        ];
    }
}

// Database Connection Class
class DatabaseConnection {
    private $pdo = null;
    private $config;
    
    public function __construct() {
        $this->config = PusatDigitalConfig::getInstance();
        $this->connect();
    }
    
    private function connect() {
        try {
            $dsn = "mysql:host={$this->config->database['host']};";
            $dsn .= "port={$this->config->database['port']};";
            $dsn .= "dbname={$this->config->database['name']};";
            $dsn .= "charset={$this->config->database['charset']}";
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ];
            
            $this->pdo = new PDO($dsn, $this->config->database['user'], 
                                $this->config->database['pass'], $options);
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
}

// API Response Helper
function apiResponse($success, $message, $data = null, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('c')
    ]);
    exit;
}

// Initialize configuration
$config = PusatDigitalConfig::getInstance();
?>

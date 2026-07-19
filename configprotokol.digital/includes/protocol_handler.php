<?php
/**
 * ConfigProtokol Digital - Protocol Handler
 * Secure Browser Protocol Management System
 * Version: 1.0.0
 */

namespace ConfigProtokol\Digital;

class ProtocolHandler {
    
    private $config;
    private $db;
    private $githubRepo;
    
    /**
     * Constructor
     */
    public function __construct() {
        $this->config = $this->loadConfig();
        $this->githubRepo = 'https://github.com/configprotokol/digital';
    }
    
    /**
     * Load master configuration
     */
    private function loadConfig() {
        $configPath = __DIR__ . '/../config/master_config.json';
        if (file_exists($configPath)) {
            return json_decode(file_get_contents($configPath), true);
        }
        return [];
    }
    
    /**
     * Connect to database
     */
    public function connectDB($host = 'localhost', $dbname = 'configprotokol_db', $username = '', $password = '') {
        try {
            $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
            $options = [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->db = new \PDO($dsn, $username, $password, $options);
            return true;
        } catch (\PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Activate secure protocol
     */
    public function activateProtocol($protocolName) {
        $protocols = $this->config['protocols'] ?? [];
        
        if (!isset($protocols[$protocolName])) {
            return ['success' => false, 'message' => 'Protocol not found'];
        }
        
        $protocols[$protocolName]['enabled'] = true;
        $this->config['protocols'] = $protocols;
        
        // Log activation
        $this->logActivation($protocolName, 'activated');
        
        return ['success' => true, 'message' => "Protocol {$protocolName} activated successfully"];
    }
    
    /**
     * Deactivate protocol
     */
    public function deactivateProtocol($protocolName) {
        $protocols = $this->config['protocols'] ?? [];
        
        if (!isset($protocols[$protocolName])) {
            return ['success' => false, 'message' => 'Protocol not found'];
        }
        
        $protocols[$protocolName]['enabled'] = false;
        $this->config['protocols'] = $protocols;
        
        // Log deactivation
        $this->logActivation($protocolName, 'deactivated');
        
        return ['success' => true, 'message' => "Protocol {$protocolName} deactivated successfully"];
    }
    
    /**
     * Get all active protocols
     */
    public function getActiveProtocols() {
        $protocols = $this->config['protocols'] ?? [];
        $active = array_filter($protocols, function($protocol) {
            return $protocol['enabled'] === true;
        });
        
        return array_keys($active);
    }
    
    /**
     * Validate security headers
     */
    public function validateSecurityHeaders() {
        $headers = $this->config['security_headers'] ?? [];
        $valid = [];
        $missing = [];
        
        foreach ($headers as $header => $value) {
            if (isset($_SERVER[$header]) || isset($_SERVER['HTTP_' . str_replace('-', '_', strtoupper($header))])) {
                $valid[] = $header;
            } else {
                $missing[] = $header;
            }
        }
        
        return [
            'valid' => $valid,
            'missing' => $missing,
            'score' => count($valid) / count($headers) * 100
        ];
    }
    
    /**
     * Apply security headers
     */
    public function applySecurityHeaders() {
        $headers = $this->config['security_headers'] ?? [];
        
        foreach ($headers as $header => $value) {
            header("$header: $value");
        }
        
        return true;
    }
    
    /**
     * Sync with GitHub repository
     */
    public function syncWithGitHub() {
        // Implementation for GitHub API integration
        $apiUrl = str_replace('github.com', 'api.github.com/repos', $this->githubRepo);
        $apiUrl = preg_replace('/^https?:\/\//', '', $apiUrl);
        $apiUrl = 'https://' . $apiUrl;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'User-Agent: ConfigProtokol-Digital/1.0',
            'Accept: application/vnd.github.v3+json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            return [
                'success' => true,
                'last_commit' => $data['pushed_at'] ?? null,
                'default_branch' => $data['default_branch'] ?? 'main'
            ];
        }
        
        return ['success' => false, 'message' => 'GitHub sync failed'];
    }
    
    /**
     * Check browser compatibility
     */
    public function checkBrowserCompatibility() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        $browserConfigs = $this->config['browser_compatibility'] ?? [];
        
        $detected = null;
        $version = null;
        
        // Detect browser
        if (preg_match('/Chrome\/([0-9.]+)/', $userAgent, $matches)) {
            $detected = 'chrome';
            $version = $matches[1];
        } elseif (preg_match('/Firefox\/([0-9.]+)/', $userAgent, $matches)) {
            $detected = 'firefox';
            $version = $matches[1];
        } elseif (preg_match('/Safari\/([0-9.]+)/', $userAgent, $matches) && !strpos($userAgent, 'Chrome')) {
            $detected = 'safari';
            $version = $matches[1];
        } elseif (preg_match('/Edg\/([0-9.]+)/', $userAgent, $matches)) {
            $detected = 'edge';
            $version = $matches[1];
        }
        
        if (!$detected || !isset($browserConfigs[$detected])) {
            return ['compatible' => false, 'message' => 'Browser not supported'];
        }
        
        $minVersion = $browserConfigs[$detected]['min_version'];
        $isCompatible = version_compare($version, $minVersion, '>=');
        
        return [
            'compatible' => $isCompatible,
            'browser' => $detected,
            'version' => $version,
            'min_required' => $minVersion
        ];
    }
    
    /**
     * Validate regex pattern
     */
    public function validatePattern($pattern, $input) {
        try {
            $result = preg_match($pattern, $input);
            return [
                'valid' => $result === 1,
                'error' => null
            ];
        } catch (\Exception $e) {
            return [
                'valid' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Calculate security score using formula
     */
    public function calculateSecurityScore() {
        $activeProtocols = count($this->getActiveProtocols());
        $totalProtocols = count($this->config['protocols'] ?? []);
        $headerValidation = $this->validateSecurityHeaders();
        
        $protocolScore = ($activeProtocols / $totalProtocols) * 50;
        $headerScore = $headerValidation['score'] * 0.5;
        
        $totalScore = $protocolScore + $headerScore;
        
        return [
            'total_score' => round($totalScore, 2),
            'protocol_score' => round($protocolScore, 2),
            'header_score' => round($headerScore, 2),
            'grade' => $this->getGrade($totalScore)
        ];
    }
    
    /**
     * Get grade based on score
     */
    private function getGrade($score) {
        if ($score >= 90) return 'A+';
        if ($score >= 80) return 'A';
        if ($score >= 70) return 'B';
        if ($score >= 60) return 'C';
        if ($score >= 50) return 'D';
        return 'F';
    }
    
    /**
     * Log activation/deactivation
     */
    private function logActivation($protocol, $action) {
        $logFile = __DIR__ . '/../logs/activation.log';
        $timestamp = date('Y-m-d H:i:s');
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        
        $logEntry = json_encode([
            'timestamp' => $timestamp,
            'protocol' => $protocol,
            'action' => $action,
            'ip' => $ipAddress,
            'user_agent' => $userAgent
        ]) . PHP_EOL;
        
        if (!is_dir(dirname($logFile))) {
            mkdir(dirname($logFile), 0755, true);
        }
        
        file_put_contents($logFile, $logEntry, FILE_APPEND);
    }
    
    /**
     * Export configuration
     */
    public function exportConfig($format = 'json') {
        if ($format === 'json') {
            return json_encode($this->config, JSON_PRETTY_PRINT);
        }
        
        return serialize($this->config);
    }
    
    /**
     * Import configuration
     */
    public function importConfig($configData, $format = 'json') {
        if ($format === 'json') {
            $this->config = json_decode($configData, true);
        } else {
            $this->config = unserialize($configData);
        }
        
        return true;
    }
    
    /**
     * Get system status
     */
    public function getSystemStatus() {
        return [
            'version' => $this->config['version'] ?? '1.0.0',
            'active_protocols' => $this->getActiveProtocols(),
            'browser_compatible' => $this->checkBrowserCompatibility(),
            'security_score' => $this->calculateSecurityScore(),
            'github_sync' => $this->syncWithGitHub()
        ];
    }
}

// Helper functions
function activateAllProtocols() {
    $handler = new ProtocolHandler();
    $protocols = array_keys($handler->loadConfig()['protocols'] ?? []);
    
    foreach ($protocols as $protocol) {
        $handler->activateProtocol($protocol);
    }
    
    return $handler->getSystemStatus();
}

function generateSecurityReport() {
    $handler = new ProtocolHandler();
    return $handler->calculateSecurityScore();
}

// Auto-apply headers if running in web context
if (php_sapi_name() !== 'cli') {
    $handler = new ProtocolHandler();
    $handler->applySecurityHeaders();
}

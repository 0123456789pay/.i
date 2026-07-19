<?php
/**
 * Digital Config System - Simbol Akar
 * PHP Configuration Handler for Root Symbol System
 */

class SimbolAkarConfig {
    private $config = [];
    private $secureMode = true;
    
    public function __construct() {
        $this->init();
    }
    
    private function init() {
        $this->config = [
            'root_symbol' => '√',
            'binary_config' => '10101000 01010101 00101010',
            'regex_patterns' => [
                'root' => '/^\\u221A|sqrt|akar|root$/i',
                'number' => '/[0-9]+\.[0-9]+/g',
                'symbol' => '/[√∛∜∑∏∫]/g'
            ],
            'secure' => [
                'encryption' => 'AES-256',
                'hash' => 'SHA-256',
                'active' => true
            ],
            'formulas' => [
                'sqrt_sum' => '√(x² + y²)',
                'cube_root' => '∛(a³ + b³)',
                'limit' => 'lim(x→∞) √x'
            ]
        ];
        
        session_start();
        $this->validateSession();
    }
    
    private function validateSession() {
        if (!isset($_SESSION['secure_mode'])) {
            $_SESSION['secure_mode'] = $this->secureMode;
        }
    }
    
    public function getConfig($key = null) {
        if ($key && isset($this->config[$key])) {
            return $this->config[$key];
        }
        return $this->config;
    }
    
    public function getRootSymbol() {
        return $this->config['root_symbol'];
    }
    
    public function getBinaryConfig() {
        return $this->config['binary_config'];
    }
    
    public function evaluateFormula($formula, $variables = []) {
        // Safe formula evaluation with variable substitution
        $safeFormula = preg_replace('/[^0-9+\\-*/().√Mathpow\s]/', '', $formula);
        
        foreach ($variables as $var => $value) {
            $safeFormula = str_replace($var, $value, $safeFormula);
        }
        
        try {
            return eval("return $safeFormula;");
        } catch (Exception $e) {
            error_log("Formula evaluation error: " . $e->getMessage());
            return null;
        }
    }
    
    public function generateSecureToken() {
        return bin2hex(random_bytes(32));
    }
    
    public function hashData($data) {
        return hash('sha256', $data);
    }
    
    public function renderJSON() {
        header('Content-Type: application/json');
        echo json_encode($this->config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
    
    public function isSecure() {
        return $this->secureMode && $_SESSION['secure_mode'];
    }
}

// API Endpoint Handler
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['api'])) {
    $config = new SimbolAkarConfig();
    
    switch ($_GET['api']) {
        case 'config':
            $config->renderJSON();
            break;
        case 'symbol':
            echo json_encode(['symbol' => $config->getRootSymbol()]);
            break;
        case 'binary':
            echo json_encode(['binary' => $config->getBinaryConfig()]);
            break;
        case 'secure':
            echo json_encode(['secure' => $config->isSecure()]);
            break;
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid API endpoint']);
    }
    exit;
}

// Example usage
$config = new SimbolAkarConfig();
?>

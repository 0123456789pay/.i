<?php
/**
 * API Endpoint - AI Studio System
 * Handles all API requests for automation and AI functions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

class API {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->connect();
    }
    
    public function respond($data, $status = 200) {
        http_response_code($status);
        echo json_encode([
            'success' => true,
            'timestamp' => date('Y-m-d H:i:s'),
            'data' => $data
        ]);
    }
    
    public function error($message, $status = 400) {
        http_response_code($status);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
        
        switch ($path) {
            case 'status':
                return $this->respond(['status' => 'online', 'version' => '1.0.0']);
            
            case 'automate':
                if ($method === 'POST') {
                    $input = json_decode(file_get_contents('php://input'), true);
                    return $this->respond([
                        'message' => 'Automation triggered',
                        'workflow_id' => uniqid('wf_'),
                        'status' => 'processing'
                    ]);
                }
                return $this->error('Method not allowed', 405);
            
            case 'ai/process':
                if ($method === 'POST') {
                    $input = json_decode(file_get_contents('php://input'), true);
                    return $this->respond([
                        'result' => 'AI processing complete',
                        'confidence' => 0.95,
                        'model' => 'default'
                    ]);
                }
                return $this->error('Method not allowed', 405);
            
            default:
                return $this->error('Unknown endpoint', 404);
        }
    }
}

$api = new API();
$api->handleRequest();
?>

<?php
/**
 * PHP Backend untuk Proyekai
 * Media.Digital Platform
 */

header('Content-Type: application/json; charset=utf-8');

// Konfigurasi database
define('DB_HOST', 'localhost');
define('DB_NAME', 'media_digital');
define('DB_USER', 'root');
define('DB_PASS', '');

// Fungsi koneksi database
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}

// Handle request
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'POST':
        handlePost();
        break;
    case 'PUT':
        handlePut();
        break;
    case 'DELETE':
        handleDelete();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handleGet() {
    $data = [
        'status' => 'success',
        'module' => 'Proyekai',
        'message' => 'Data retrieved successfully',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

function handlePost() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $data = [
        'status' => 'success',
        'module' => 'Proyekai',
        'message' => 'Data created successfully',
        'received' => $input,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

function handlePut() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $data = [
        'status' => 'success',
        'module' => 'Proyekai',
        'message' => 'Data updated successfully',
        'received' => $input,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

function handleDelete() {
    $data = [
        'status' => 'success',
        'module' => 'Proyekai',
        'message' => 'Data deleted successfully',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>
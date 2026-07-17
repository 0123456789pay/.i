<?php
/**
 * API Endpoint untuk 程序化
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';
require_once 'database.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getInstance();

$response = ['success' => false, 'message' => '', 'data' => null];

try {
    switch ($method) {
        case 'GET':
            $response['success'] = true;
            $response['message'] = 'Data retrieved successfully';
            $response['data'] = $db->fetchAll("SELECT * FROM items LIMIT 10");
            break;
            
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if ($input) {
                $id = $db->insert('items', $input);
                $response['success'] = true;
                $response['message'] = 'Item created successfully';
                $response['data'] = ['id' => $id];
            }
            break;
            
        case 'PUT':
        case 'DELETE':
            $response['message'] = 'Method not implemented yet';
            break;
            
        default:
            $response['message'] = 'Invalid request method';
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);

<?php
header('Content-Type: application/json');
require_once 'config.php';

$action = $_GET['action'] ?? '';

switch($action) {
    case 'getVideos':
        echo json_encode(['success' => true, 'data' => getVideos()]);
        break;
    case 'addVideo':
        if ($_POST['title']) {
            addVideo($_POST['title'], $_POST['url'], $_POST['category']);
            echo json_encode(['success' => true]);
        }
        break;
    case 'getFiles':
        $files = array_diff(scandir(__DIR__), ['.', '..']);
        echo json_encode(['success' => true, 'files' => array_values($files)]);
        break;
    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
}
?>

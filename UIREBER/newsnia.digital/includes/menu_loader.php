<?php
/**
 * newsnia.digital - Menu Loader API
 * Mengembalikan menu dalam format JSON untuk AJAX
 */
header('Content-Type: application/json');
require_once '../config/database.php';

try {
    $stmt = $pdo->query("SELECT * FROM menus WHERE is_active = 1 ORDER BY sort_order");
    $menus = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'menus' => $menus
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error loading menus'
    ]);
}
?>

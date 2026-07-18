<?php
/**
 * Backend untuk Pengaturan - backup
 * Bahasa: Indonesia
 */

header('Content-Type: application/json; charset=utf-8');

$config = [
    'menu_utama' => 'Pengaturan',
    'sub_menu' => 'backup',
    'bahasa' => 'id',
    'status' => 'aktif',
    'versi' => '1.0.0'
];

$response = [
    'success' => true,
    'data' => $config,
    'message' => 'Data backup berhasil dimuat',
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

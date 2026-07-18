<?php
/**
 * Backend untuk Konten - moderasi
 * Bahasa: Indonesia
 */

header('Content-Type: application/json; charset=utf-8');

$config = [
    'menu_utama' => 'Konten',
    'sub_menu' => 'moderasi',
    'bahasa' => 'id',
    'status' => 'aktif',
    'versi' => '1.0.0'
];

$response = [
    'success' => true,
    'data' => $config,
    'message' => 'Data moderasi berhasil dimuat',
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

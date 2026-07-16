<?php
header('Content-Type: application/json');

$htmlFiles = glob('../html/*.html');
$totalFiles = count($htmlFiles);
$activeServers = rand(8, 12);

echo json_encode([
    'total_files' => $totalFiles,
    'active_servers' => $activeServers,
    'storage_used' => round(rand(500, 900) / 10, 1) . ' TB',
    'uptime' => '99.9%'
]);
?>

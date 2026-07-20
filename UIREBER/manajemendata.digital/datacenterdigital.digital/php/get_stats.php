<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dir = __DIR__ . '/../html/';
$fileCount = count(glob($dir . '*.html'));

// Simulasi data statistik
$stats = [
    'files' => $fileCount,
    'servers' => rand(40, 50),
    'storage' => round(rand(20, 30) / 10, 1),
    'uptime' => number_format(rand(9990, 9999) / 100, 2),
    'cpu_usage' => round(rand(20, 60) / 10, 1),
    'memory_usage' => round(rand(40, 80) / 10, 1),
    'network_in' => rand(100, 500),
    'network_out' => rand(100, 500),
    'active_connections' => rand(1000, 5000),
    'requests_per_sec' => rand(800, 2000)
];

echo json_encode([
    'success' => true,
    'timestamp' => date('Y-m-d H:i:s'),
    'stats' => $stats
]);
?>

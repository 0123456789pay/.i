<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dir = __DIR__ . '/../html/';
$files = glob($dir . '*.html');

$menus = [];
foreach ($files as $file) {
    $filename = basename($file);
    $menus[] = [
        'file' => $filename,
        'title' => ucfirst(str_replace('-', ' ', str_replace('.html', '', $filename))),
        'path' => 'html/' . $filename
    ];
}

echo json_encode([
    'success' => true,
    'count' => count($menus),
    'menus' => $menus
]);
?>

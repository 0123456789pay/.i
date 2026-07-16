<?php
header('Content-Type: application/json');

$menus = [];
$htmlFiles = glob('../html/*.html');

foreach ($htmlFiles as $file) {
    $filename = basename($file);
    $name = pathinfo($filename, PATHINFO_FILENAME);
    $menus[] = [
        'name' => ucwords(str_replace('-', ' ', $name)),
        'file' => 'html/' . $filename
    ];
}

echo json_encode(['menus' => $menus]);
?>

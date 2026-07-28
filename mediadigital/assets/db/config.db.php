<?php
/**
 * MEDIA.DIGITAL - Database Configuration
 * Konfigurasi database untuk dashboard
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'media_digital');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    // Fallback ke mode tanpa database jika koneksi gagal
    $pdo = null;
}

/**
 * Fungsi untuk mendapatkan semua sistem
 */
function getAllSystems() {
    global $pdo;
    
    if (!$pdo) {
        return [
            ['id' => 1, 'name' => 'Media Digital Core', 'status' => 'active', 'health' => 98.5],
            ['id' => 2, 'name' => 'File Manager', 'status' => 'active', 'health' => 99.2],
            ['id' => 3, 'name' => 'Dashboard System', 'status' => 'active', 'health' => 97.8]
        ];
    }
    
    try {
        $stmt = $pdo->query("SELECT * FROM systems");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return [];
    }
}

/**
 * Fungsi untuk mendapatkan struktur file dan folder
 */
function getFileStructure($basePath = '/workspace/mediadigital') {
    $structure = [];
    
    if (!is_dir($basePath)) {
        return $structure;
    }
    
    $items = scandir($basePath);
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $fullPath = $basePath . '/' . $item;
        $isDir = is_dir($fullPath);
        
        $fileInfo = [
            'name' => $item,
            'type' => $isDir ? 'folder' : 'file',
            'path' => str_replace('/workspace/mediadigital/', '', $fullPath),
            'size' => $isDir ? 0 : filesize($fullPath),
            'modified' => date('Y-m-d H:i:s', filemtime($fullPath))
        ];
        
        if ($isDir) {
            $fileInfo['children'] = getFileStructure($fullPath);
        }
        
        $structure[] = $fileInfo;
    }
    
    return $structure;
}

/**
 * Fungsi untuk membaca konten file
 */
function readFileContent($filePath) {
    $fullPath = '/workspace/mediadigital/' . $filePath;
    
    if (!file_exists($fullPath) || is_dir($fullPath)) {
        return ['success' => false, 'message' => 'File tidak ditemukan'];
    }
    
    $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
    $content = file_get_contents($fullPath);
    
    $previewUrl = null;
    $canPreview = in_array($extension, ['html', 'htm', 'css', 'js', 'json', 'txt', 'md', 'php']);
    
    if ($canPreview) {
        $previewUrl = '/mediadigital/' . $filePath;
    }
    
    return [
        'success' => true,
        'content' => $content,
        'extension' => $extension,
        'canPreview' => $canPreview,
        'previewUrl' => $previewUrl,
        'size' => filesize($fullPath),
        'modified' => date('Y-m-d H:i:s', filemtime($fullPath))
    ];
}

/**
 * Fungsi untuk mendapatkan daftar URL eksternal
 */
function getExternalUrls() {
    return [
        ['name' => 'GitHub', 'url' => 'https://github.com'],
        ['name' => 'Stack Overflow', 'url' => 'https://stackoverflow.com'],
        ['name' => 'MDN Web Docs', 'url' => 'https://developer.mozilla.org'],
        ['name' => 'W3Schools', 'url' => 'https://www.w3schools.com']
    ];
}
?>

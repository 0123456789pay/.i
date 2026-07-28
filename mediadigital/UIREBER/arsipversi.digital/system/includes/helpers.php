<?php
/**
 * Helper Functions
 * Fungsi-fungsi pembantu untuk aplikasi
 */

/**
 * Redirect ke URL tertentu
 */
function redirect($url) {
    header("Location: {$url}");
    exit;
}

/**
 * Output JSON response
 */
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize input
 */
function sanitize($input) {
    if (is_array($input)) {
        return array_map('sanitize', $input);
    }
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF token
 */
function generateCsrfToken() {
    if (!isset($_SESSION[CSRF_TOKEN_NAME])) {
        $_SESSION[CSRF_TOKEN_NAME] = bin2hex(random_bytes(32));
    }
    return $_SESSION[CSRF_TOKEN_NAME];
}

/**
 * Verify CSRF token
 */
function verifyCsrfToken($token) {
    return isset($_SESSION[CSRF_TOKEN_NAME]) && hash_equals($_SESSION[CSRF_TOKEN_NAME], $token);
}

/**
 * Format tanggal
 */
function formatDate($date, $format = null) {
    if (!$format) {
        $format = DATE_FORMAT;
    }
    return date($format, strtotime($date));
}

/**
 * Format datetime
 */
function formatDatetime($datetime, $format = null) {
    if (!$format) {
        $format = DATETIME_FORMAT;
    }
    return date($format, strtotime($datetime));
}

/**
 * Format angka ke rupiah
 */
function formatRupiah($number) {
    return 'Rp ' . number_format($number, 0, ',', '.');
}

/**
 * Get client IP address
 */
function getClientIp() {
    $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = explode(',', $_SERVER[$key])[0];
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    
    return 'unknown';
}

/**
 * Upload file
 */
function uploadFile($file, $destination = null) {
    if (!$destination) {
        $destination = UPLOAD_PATH;
    }
    
    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }
    
    $fileName = $file['name'];
    $fileTmp = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $fileNameNew = uniqid('', true) . '.' . $fileExt;
    
    if ($fileError !== 0) {
        return ['success' => false, 'message' => 'Upload error: ' . $fileError];
    }
    
    if ($fileSize > UPLOAD_MAX_SIZE) {
        return ['success' => false, 'message' => 'File terlalu besar'];
    }
    
    if (!in_array($fileExt, UPLOAD_ALLOWED_TYPES)) {
        return ['success' => false, 'message' => 'Tipe file tidak diizinkan'];
    }
    
    $filePath = $destination . DS . $fileNameNew;
    
    if (move_uploaded_file($fileTmp, $filePath)) {
        return [
            'success' => true,
            'message' => 'File berhasil diupload',
            'filename' => $fileNameNew,
            'path' => $filePath,
            'url' => APP_URL . '/uploads/' . $fileNameNew
        ];
    }
    
    return ['success' => false, 'message' => 'Gagal mengupload file'];
}

/**
 * Pagination helper
 */
function paginate($currentPage, $totalItems, $itemsPerPage = null) {
    if (!$itemsPerPage) {
        $itemsPerPage = ITEMS_PER_PAGE;
    }
    
    $totalPages = ceil($totalItems / $itemsPerPage);
    $currentPage = max(1, min($currentPage, $totalPages));
    $offset = ($currentPage - 1) * $itemsPerPage;
    
    return [
        'current_page' => $currentPage,
        'total_pages' => $totalPages,
        'total_items' => $totalItems,
        'items_per_page' => $itemsPerPage,
        'offset' => $offset,
        'has_prev' => $currentPage > 1,
        'has_next' => $currentPage < $totalPages,
        'prev_page' => $currentPage > 1 ? $currentPage - 1 : null,
        'next_page' => $currentPage < $totalPages ? $currentPage + 1 : null
    ];
}

/**
 * Slugify string
 */
function slugify($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    
    return empty($text) ? 'n-a' : $text;
}

/**
 * Truncate text
 */
function truncate($text, $length = 100, $suffix = '...') {
    if (strlen($text) <= $length) {
        return $text;
    }
    return substr($text, 0, $length) . $suffix;
}

/**
 * Time ago function
 */
function timeAgo($datetime) {
    $timestamp = strtotime($datetime);
    $diff = time() - $timestamp;
    
    if ($diff < 60) {
        return $diff . ' detik yang lalu';
    } elseif ($diff < 3600) {
        return floor($diff / 60) . ' menit yang lalu';
    } elseif ($diff < 86400) {
        return floor($diff / 3600) . ' jam yang lalu';
    } elseif ($diff < 604800) {
        return floor($diff / 86400) . ' hari yang lalu';
    } elseif ($diff < 2592000) {
        return floor($diff / 604800) . ' minggu yang lalu';
    } else {
        return formatDate($datetime);
    }
}

/**
 * Debug helper
 */
function dd($data) {
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
    die();
}

/**
 * Log message to file
 */
function logMessage($message, $level = 'INFO') {
    $logFile = SYSTEM_PATH . DS . 'logs' . DS . 'app_' . date('Y-m-d') . '.log';
    $logDir = dirname($logFile);
    
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $timestamp = date('Y-m-d H:i:s');
    $ip = getClientIp();
    $logEntry = "[{$timestamp}] [{$level}] [{$ip}] {$message}" . PHP_EOL;
    
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

/**
 * Get asset URL
 */
function asset($path) {
    return APP_URL . '/system/assets/' . ltrim($path, '/');
}

/**
 * Get page URL
 */
function pageUrl($path = '') {
    return APP_URL . '/' . ltrim($path, '/');
}

/**
 * Check if request is AJAX
 */
function isAjax() {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

/**
 * Get request method
 */
function requestMethod() {
    return $_SERVER['REQUEST_METHOD'] ?? 'GET';
}

/**
 * Get POST data
 */
function post($key = null, $default = null) {
    if ($key === null) {
        return $_POST;
    }
    return $_POST[$key] ?? $default;
}

/**
 * Get GET data
 */
function get($key = null, $default = null) {
    if ($key === null) {
        return $_GET;
    }
    return $_GET[$key] ?? $default;
}

/**
 * Get request data (POST or GET)
 */
function request($key = null, $default = null) {
    if ($key === null) {
        return array_merge($_GET, $_POST);
    }
    return $_REQUEST[$key] ?? $default;
}

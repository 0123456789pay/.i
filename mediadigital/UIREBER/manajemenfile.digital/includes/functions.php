<?php
/**
 * Common functions for all .digital sites
 * Centralized utilities connected to manajemenfile.digital database
 */

require_once __DIR__ . '/../../manajemenfile.digital/config/database.php';

/**
 * Get database connection from manajemenfile.digital
 */
function getDB() {
    $database = new Database();
    return $database->getConnection();
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    session_start();
    return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
}

/**
 * Get current user data
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    return [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'full_name' => $_SESSION['full_name'],
        'role' => $_SESSION['role']
    ];
}

/**
 * Require login - redirect to login page if not authenticated
 */
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: /newsnia.digital/login.php');
        exit;
    }
}

/**
 * Require admin role
 */
function requireAdmin() {
    requireLogin();
    if ($_SESSION['role'] !== 'admin') {
        header('Location: /newsnia.digital/');
        exit;
    }
}

/**
 * Get site settings from database
 */
function getSiteSettings($siteKey = 'newsnia') {
    try {
        $conn = getDB();
        $query = "SELECT setting_key, setting_value FROM settings WHERE site_key = :site_key";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':site_key', $siteKey);
        $stmt->execute();
        
        $settings = [];
        while ($row = $stmt->fetch()) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        
        return $settings;
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Get hierarchical menus
 */
function getMenus($parentId = null, $limit = 100) {
    try {
        $conn = getDB();
        
        if ($parentId === null) {
            $query = "SELECT * FROM menus WHERE parent_id IS NULL AND is_visible = 1 
                      ORDER BY sort_order ASC LIMIT :limit";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        } else {
            $query = "SELECT * FROM menus WHERE parent_id = :parent_id AND is_visible = 1 
                      ORDER BY sort_order ASC LIMIT :limit";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':parent_id', $parentId);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        }
        
        $stmt->execute();
        return $stmt->fetchAll();
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Get all menus with hierarchy
 */
function getAllMenusHierarchical() {
    $menus = getMenus();
    
    foreach ($menus as &$menu) {
        $menu['children'] = getMenus($menu['id']);
        
        foreach ($menu['children'] as &$child) {
            $child['children'] = getMenus($child['id']);
        }
    }
    
    return $menus;
}

/**
 * Get posts with pagination
 */
function getPosts($categoryId = null, $limit = 10, $offset = 0, $status = 'published') {
    try {
        $conn = getDB();
        
        $query = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                         u.username as author_username, u.full_name as author_name
                  FROM posts p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN users u ON p.author_id = u.id
                  WHERE p.status = :status";
        
        if ($categoryId) {
            $query .= " AND p.category_id = :category_id";
        }
        
        $query .= " ORDER BY p.published_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':status', $status);
        
        if ($categoryId) {
            $stmt->bindParam(':category_id', $categoryId);
        }
        
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Get single post by slug
 */
function getPostBySlug($slug) {
    try {
        $conn = getDB();
        
        $query = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                         u.username as author_username, u.full_name as author_name
                  FROM posts p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN users u ON p.author_id = u.id
                  WHERE p.slug = :slug";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        // Increment views
        $updateQuery = "UPDATE posts SET views = views + 1 WHERE slug = :slug";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bindParam(':slug', $slug);
        $updateStmt->execute();
        
        return $stmt->fetch();
    } catch(PDOException $e) {
        return null;
    }
}

/**
 * Get related posts
 */
function getRelatedPosts($postId, $categoryId, $limit = 4) {
    try {
        $conn = getDB();
        
        $query = "SELECT p.*, c.name as category_name
                  FROM posts p
                  LEFT JOIN categories c ON p.category_id = c.id
                  WHERE p.id != :id AND p.status = 'published'";
        
        if ($categoryId) {
            $query .= " AND (p.category_id = :category_id)";
        }
        
        $query .= " ORDER BY p.published_at DESC LIMIT :limit";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $postId);
        
        if ($categoryId) {
            $stmt->bindParam(':category_id', $categoryId);
        }
        
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Get categories
 */
function getCategories($parentId = null) {
    try {
        $conn = getDB();
        
        if ($parentId === null) {
            $query = "SELECT * FROM categories WHERE parent_id IS NULL ORDER BY sort_order ASC";
            $stmt = $conn->prepare($query);
        } else {
            $query = "SELECT * FROM categories WHERE parent_id = :parent_id ORDER BY sort_order ASC";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':parent_id', $parentId);
        }
        
        $stmt->execute();
        return $stmt->fetchAll();
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Sanitize input
 */
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Format date to Indonesian
 */
function formatDateIndonesian($date) {
    $months = [
        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    $timestamp = strtotime($date);
    $day = date('d', $timestamp);
    $month = $months[(int)date('m', $timestamp)];
    $year = date('Y', $timestamp);
    
    return "$day $month $year";
}

/**
 * Time ago format
 */
function timeAgo($datetime) {
    $timestamp = strtotime($datetime);
    $diff = time() - $timestamp;
    
    if ($diff < 60) {
        return 'Baru saja';
    } elseif ($diff < 3600) {
        $mins = floor($diff / 60);
        return "$mins menit yang lalu";
    } elseif ($diff < 86400) {
        $hours = floor($diff / 3600);
        return "$hours jam yang lalu";
    } elseif ($diff < 604800) {
        $days = floor($diff / 86400);
        return "$days hari yang lalu";
    } else {
        return formatDateIndonesian($datetime);
    }
}
?>

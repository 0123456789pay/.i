<?php
/**
 * newsnia.digital - Header Include
 * Komponen header dengan menu bertingkat dan tombol login/register
 */

session_start();
require_once __DIR__ . '/../config/database.php';

// Fetch menus from database
function getMenus($pdo, $parentId = null) {
    if ($parentId === null) {
        $sql = "SELECT * FROM menus WHERE parent_id IS NULL AND is_active = 1 ORDER BY sort_order";
    } else {
        $sql = "SELECT * FROM menus WHERE parent_id = :parent_id AND is_active = 1 ORDER BY sort_order";
    }
    
    $stmt = $pdo->prepare($sql);
    if ($parentId !== null) {
        $stmt->bindParam(':parent_id', $parentId, PDO::PARAM_INT);
    }
    $stmt->execute();
    return $stmt->fetchAll();
}

function renderMenu($pdo, $parentId = null, $level = 0) {
    $menus = getMenus($pdo, $parentId);
    
    if (empty($menus)) {
        return '';
    }
    
    $html = '';
    
    if ($level === 0) {
        $html .= '<ul class="nav-list">';
    } elseif ($level === 1) {
        $html .= '<ul class="dropdown-menu">';
    } else {
        $html .= '<ul class="sub-dropdown-menu">';
    }
    
    foreach ($menus as $menu) {
        $hasChildren = !empty(getMenus($pdo, $menu['id']));
        $submenuClass = $hasChildren ? 'dropdown-submenu' : '';
        
        $html .= '<li class="nav-item ' . $submenuClass . '">';
        $html .= '<a href="' . htmlspecialchars($menu['slug']) . '" class="nav-link">';
        $html .= htmlspecialchars($menu['title']);
        
        if ($hasChildren && $level === 0) {
            $html .= ' <span class="dropdown-arrow">▼</span>';
        } elseif ($hasChildren && $level > 0) {
            $html .= ' <span class="submenu-arrow">▶</span>';
        }
        
        $html .= '</a>';
        
        if ($hasChildren) {
            $html .= renderMenu($pdo, $menu['id'], $level + 1);
        }
        
        $html .= '</li>';
    }
    
    $html .= '</ul>';
    
    return $html;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - ' : ''; ?>newsnia.digital</title>
    
    <meta name="description" content="Portal Berita Digital Terkini">
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Selamat Datang di newsnia.digital - Portal Berita Digital Terpercaya</span>
                <div class="auth-buttons">
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <span>Halo, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                        <a href="logout.php" class="btn btn-outline" style="border-color: white; color: white;">Logout</a>
                    <?php else: ?>
                        <a href="login.php" class="btn btn-outline" style="border-color: white; color: white;">Login</a>
                        <a href="register.php" class="btn" style="background: white; color: var(--primary-blue);">Register</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Header -->
    <header class="header">
        <div class="container">
            <div class="header-main">
                <a href="index.php" class="logo">
                    newsnia<span>.digital</span>
                </a>
                
                <div style="display: flex; gap: 15px; align-items: center;">
                    <!-- Search Form -->
                    <form class="search-form" action="search.php" method="GET" style="display: flex;">
                        <input type="text" 
                               name="q" 
                               class="search-input form-control" 
                               placeholder="Cari berita..." 
                               style="width: 250px; padding: 8px 15px;">
                        <button type="submit" class="btn btn-primary" style="margin-left: 5px;">
                            🔍
                        </button>
                    </form>
                    
                    <?php if (!isset($_SESSION['user_id'])): ?>
                    <div class="auth-buttons">
                        <a href="login.php" class="btn btn-outline login-btn">Login</a>
                        <a href="register.php" class="btn btn-primary register-btn">Register</a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Navigation Menu Bertingkat -->
        <nav class="nav-menu">
            <div class="container">
                <?php echo renderMenu($pdo); ?>
            </div>
        </nav>
    </header>

    <main>

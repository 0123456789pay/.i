<?php
/**
 * API endpoint for menus - connected to manajemenfile.digital database
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

$action = $_GET['action'] ?? 'all';

switch ($action) {
    case 'all':
        $menus = getAllMenusHierarchical();
        echo json_encode(['success' => true, 'menus' => $menus]);
        break;
    
    case 'children':
        $parentId = $_GET['parent_id'] ?? null;
        $menus = getMenus($parentId);
        echo json_encode(['success' => true, 'menus' => $menus]);
        break;
    
    case 'breadcrumb':
        $slug = $_GET['slug'] ?? '';
        $breadcrumb = getMenuBreadcrumb($slug);
        echo json_encode(['success' => true, 'breadcrumb' => $breadcrumb]);
        break;
    
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

function getMenuBreadcrumb($slug) {
    try {
        $conn = getDB();
        
        // Find the menu by slug
        $query = "SELECT * FROM menus WHERE slug = :slug";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        $menu = $stmt->fetch();
        if (!$menu) {
            return [];
        }
        
        $breadcrumb = [$menu];
        
        // Get parent menus
        $parentId = $menu['parent_id'];
        while ($parentId !== null) {
            $query = "SELECT * FROM menus WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $parentId);
            $stmt->execute();
            
            $parent = $stmt->fetch();
            if ($parent) {
                array_unshift($breadcrumb, $parent);
                $parentId = $parent['parent_id'];
            } else {
                break;
            }
        }
        
        return $breadcrumb;
    } catch(PDOException $e) {
        return [];
    }
}
?>

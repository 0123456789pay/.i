<?php
/**
 * API endpoint for posts - connected to manajemenfile.digital database
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        $categoryId = $_GET['category_id'] ?? null;
        $limit = $_GET['limit'] ?? 10;
        $page = $_GET['page'] ?? 1;
        $offset = ($page - 1) * $limit;
        
        $posts = getPosts($categoryId, $limit, $offset);
        
        // Get total count for pagination
        $total = getTotalPosts($categoryId);
        
        echo json_encode([
            'success' => true,
            'posts' => $posts,
            'pagination' => [
                'current_page' => (int)$page,
                'per_page' => (int)$limit,
                'total' => $total,
                'total_pages' => ceil($total / $limit)
            ]
        ]);
        break;
    
    case 'detail':
        $slug = $_GET['slug'] ?? '';
        $post = getPostBySlug($slug);
        
        if ($post) {
            $related = getRelatedPosts($post['id'], $post['category_id']);
            echo json_encode([
                'success' => true,
                'post' => $post,
                'related' => $related
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Post not found']);
        }
        break;
    
    case 'categories':
        $categories = getCategories();
        echo json_encode(['success' => true, 'categories' => $categories]);
        break;
    
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

function getTotalPosts($categoryId = null) {
    try {
        $conn = getDB();
        
        $query = "SELECT COUNT(*) as total FROM posts WHERE status = 'published'";
        
        if ($categoryId) {
            $query .= " AND category_id = :category_id";
        }
        
        $stmt = $conn->prepare($query);
        
        if ($categoryId) {
            $stmt->bindParam(':category_id', $categoryId);
        }
        
        $stmt->execute();
        $result = $stmt->fetch();
        
        return $result['total'];
    } catch(PDOException $e) {
        return 0;
    }
}
?>

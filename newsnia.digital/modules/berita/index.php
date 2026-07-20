<?php
/**
 * newsnia.digital - Modul Berita Digital
 * Menampilkan daftar berita berdasarkan kategori/menu
 */

session_start();
require_once '../config/database.php';

// Get category from URL
$category = $_GET['category'] ?? '';
$page = max(1, intval($_GET['page'] ?? 1));
$perPage = 9;
$offset = ($page - 1) * $perPage;

try {
    // Build query based on category
    if (!empty($category)) {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name as category_name
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE c.slug = :category AND p.status = 'published'
            ORDER BY p.published_at DESC
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        
        $countStmt = $pdo->prepare("
            SELECT COUNT(*) FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE c.slug = :category AND p.status = 'published'
        ");
        $countStmt->bindParam(':category', $category);
        $countStmt->execute();
        $totalPosts = $countStmt->fetchColumn();
    } else {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name as category_name
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.status = 'published'
            ORDER BY p.published_at DESC
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindParam(':limit', $perPage, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        
        $countStmt = $pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'published'");
        $totalPosts = $countStmt->fetchColumn();
    }
    
    $stmt->execute();
    $posts = $stmt->fetchAll();
    
    $totalPages = ceil($totalPosts / $perPage);
} catch (PDOException $e) {
    $posts = [];
    $totalPages = 0;
}

// Return JSON for AJAX requests
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'posts' => $posts,
        'current_page' => $page,
        'total_pages' => $totalPages
    ]);
    exit;
}

// Regular page render
$pageTitle = !empty($category) ? ucfirst(str_replace('-', ' ', $category)) : 'Semua Berita';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle); ?> - newsnia.digital</title>
    
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <div class="container" style="padding: 30px 20px;">
        <h1 style="color: var(--primary-blue); margin-bottom: 30px; font-size: 32px;">
            <?php echo htmlspecialchars($pageTitle); ?>
        </h1>
        
        <?php if (!empty($posts)): ?>
        <div class="news-grid">
            <?php foreach ($posts as $post): ?>
            <article class="news-card">
                <img src="<?php echo htmlspecialchars($post['featured_image'] ?: '../assets/images/placeholder.jpg'); ?>" 
                     alt="<?php echo htmlspecialchars($post['title']); ?>" 
                     class="news-card-image"
                     onerror="this.src='../assets/images/placeholder.jpg'">
                <div class="news-card-content">
                    <span class="news-card-category">
                        <?php echo htmlspecialchars($post['category_name'] ?: 'Umum'); ?>
                    </span>
                    <h3 class="news-card-title">
                        <a href="../detail.php?slug=<?php echo htmlspecialchars($post['slug']); ?>">
                            <?php echo htmlspecialchars($post['title']); ?>
                        </a>
                    </h3>
                    <p class="news-card-excerpt">
                        <?php echo htmlspecialchars(substr($post['excerpt'] ?: $post['content'], 0, 150)); ?>...
                    </p>
                    <div class="news-card-meta">
                        <span><?php echo date('d M Y', strtotime($post['published_at'])); ?></span>
                        <span><?php echo number_format($post['views']); ?> views</span>
                    </div>
                </div>
            </article>
            <?php endforeach; ?>
        </div>
        
        <!-- Pagination -->
        <?php if ($totalPages > 1): ?>
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 40px;">
            <?php if ($page > 1): ?>
            <a href="?category=<?php echo urlencode($category); ?>&page=<?php echo $page - 1; ?>" 
               class="btn btn-outline">« Sebelumnya</a>
            <?php endif; ?>
            
            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <a href="?category=<?php echo urlencode($category); ?>&page=<?php echo $i; ?>" 
               class="btn <?php echo $i === $page ? 'btn-primary' : 'btn-outline'; ?>"
               style="<?php echo $i === $page ? '' : 'background: white; color: var(--primary-blue);'; ?>">
                <?php echo $i; ?>
            </a>
            <?php endfor; ?>
            
            <?php if ($page < $totalPages): ?>
            <a href="?category=<?php echo urlencode($category); ?>&page=<?php echo $page + 1; ?>" 
               class="btn btn-outline">Berikutnya »</a>
            <?php endif; ?>
        </div>
        <?php endif; ?>
        
        <?php else: ?>
        <div style="background: white; padding: 60px; text-align: center; border-radius: 8px;">
            <p style="color: var(--gray); font-size: 16px;">
                Belum ada berita dalam kategori ini.
            </p>
            <a href="index.php" class="btn btn-primary" style="margin-top: 20px;">Kembali ke Beranda</a>
        </div>
        <?php endif; ?>
    </div>
    
    <?php include '../includes/footer.php'; ?>
</body>
</html>

<?php
/**
 * newsnia.digital - Halaman Detail Berita
 * TERHUBUNG KE manajemenfile.digital database
 * Menampilkan detail lengkap berita dengan fitur terkait
 */

session_start();

// Connect to centralized manajemenfile.digital database
require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

$slug = $_GET['slug'] ?? '';
$post = null;
$relatedPosts = [];
$postDetails = [];

if (!empty($slug)) {
    try {
        $conn = getDB();
        
        // Fetch post detail
        $stmt = $conn->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug, 
                   u.full_name as author_name, u.username as author_username
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN users u ON p.author_id = u.id
            WHERE p.slug = :slug AND p.status = 'published'
        ");
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        $post = $stmt->fetch();
        
        if ($post) {
            // Increment views
            $stmt = $conn->prepare("UPDATE posts SET views = views + 1 WHERE id = :id");
            $stmt->bindParam(':id', $post['id']);
            $stmt->execute();
            
            // Fetch related posts using function
            $relatedPosts = getRelatedPosts($post['id'], $post['category_id'], 4);
        }
    } catch (PDOException $e) {
        // Error handling
    }
}

$pageTitle = $post ? $post['title'] : 'Detail Berita';
require_once 'includes/header.php';
?>

<?php if ($post): ?>
<!-- Breadcrumb -->
<div class="container" style="padding: 20px 0;">
    <nav style="font-size: 14px; color: var(--gray);">
        <a href="index.php" style="color: var(--primary-blue); text-decoration: none;">Home</a>
        <span style="margin: 0 10px;">/</span>
        <?php if ($post['category_slug']): ?>
        <a href="kategori.php?slug=<?php echo htmlspecialchars($post['category_slug']); ?>" 
           style="color: var(--primary-blue); text-decoration: none;">
            <?php echo htmlspecialchars($post['category_name']); ?>
        </a>
        <span style="margin: 0 10px;">/</span>
        <?php endif; ?>
        <span><?php echo htmlspecialchars($post['title']); ?></span>
    </nav>
</div>

<!-- Article Detail -->
<article class="container" style="margin-bottom: 40px;">
    <div class="detail-content">
        <header class="detail-header">
            <span class="news-card-category" style="margin-bottom: 15px; display: inline-block;">
                <?php echo htmlspecialchars($post['category_name'] ?: 'Umum'); ?>
            </span>
            <h1 class="detail-title"><?php echo htmlspecialchars($post['title']); ?></h1>
            
            <div class="detail-meta">
                <span>👤 Oleh: <?php echo htmlspecialchars($post['author_name'] ?: $post['author_username'] ?: 'Redaksi'); ?></span>
                <span>📅 <?php echo date('d F Y, H:i', strtotime($post['published_at'])); ?> WIB</span>
                <span>👁️ <?php echo number_format($post['views']); ?> kali dibaca</span>
            </div>
        </header>
        
        <?php if ($post['featured_image']): ?>
        <figure style="margin: 30px 0;">
            <img src="<?php echo htmlspecialchars($post['featured_image']); ?>" 
                 alt="<?php echo htmlspecialchars($post['title']); ?>"
                 style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 8px;">
            <?php if ($post['excerpt']): ?>
            <figcaption style="text-align: center; color: var(--gray); font-size: 14px; margin-top: 10px; font-style: italic;">
                <?php echo htmlspecialchars($post['excerpt']); ?>
            </figcaption>
            <?php endif; ?>
        </figure>
        <?php endif; ?>
        
        <div class="detail-body">
            <?php echo nl2br(htmlspecialchars($post['content'])); ?>
        </div>
        
        <!-- Additional Post Details -->
        <?php if (!empty($postDetails)): ?>
        <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid var(--light-blue);">
            <h3 style="color: var(--primary-blue); margin-bottom: 20px;">Informasi Tambahan</h3>
            <?php foreach ($postDetails as $detail): ?>
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--dark-blue); margin-bottom: 10px;">
                    <?php echo htmlspecialchars(ucfirst($detail['detail_type'])); ?>
                </h4>
                <p><?php echo nl2br(htmlspecialchars($detail['detail_content'])); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
        
        <!-- Tags & Share -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <strong style="color: var(--gray);">Bagikan:</strong>
                    <div style="display: inline-flex; gap: 10px; margin-left: 10px;">
                        <a href="#" style="background: #3b5998; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">Facebook</a>
                        <a href="#" style="background: #1da1f2; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">Twitter</a>
                        <a href="#" style="background: #25d366; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-size: 13px;">WhatsApp</a>
                    </div>
                </div>
                
                <?php if (isset($_SESSION['user_id'])): ?>
                <div>
                    <button class="btn btn-outline" style="font-size: 13px;">
                        ❤️ Simpan Artikel
                    </button>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</article>

<!-- Related Articles -->
<?php if (!empty($relatedPosts)): ?>
<div class="container" style="margin-bottom: 40px;">
    <h2 style="color: var(--primary-blue); margin-bottom: 25px; font-size: 24px;">
        Berita Terkait
    </h2>
    <div class="news-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        <?php foreach ($relatedPosts as $related): ?>
        <article class="news-card">
            <img src="<?php echo htmlspecialchars($related['featured_image'] ?: 'assets/images/placeholder.jpg'); ?>" 
                 alt="<?php echo htmlspecialchars($related['title']); ?>" 
                 class="news-card-image"
                 onerror="this.src='assets/images/placeholder.jpg'">
            <div class="news-card-content">
                <span class="news-card-category">
                    <?php echo htmlspecialchars($related['category_name'] ?: 'Umum'); ?>
                </span>
                <h3 class="news-card-title">
                    <a href="detail.php?slug=<?php echo htmlspecialchars($related['slug']); ?>">
                        <?php echo htmlspecialchars($related['title']); ?>
                    </a>
                </h3>
                <div class="news-card-meta">
                    <span><?php echo date('d M Y', strtotime($related['published_at'])); ?></span>
                    <span><?php echo number_format($related['views']); ?> views</span>
                </div>
            </div>
        </article>
        <?php endforeach; ?>
    </div>
</div>
<?php endif; ?>

<?php else: ?>
<!-- Article Not Found -->
<div class="container" style="padding: 60px 0; text-align: center;">
    <div style="background: white; padding: 60px; border-radius: 8px; box-shadow: var(--shadow);">
        <h1 style="color: var(--primary-blue); font-size: 48px; margin-bottom: 20px;">404</h1>
        <h2 style="color: var(--text-color); margin-bottom: 15px;">Berita Tidak Ditemukan</h2>
        <p style="color: var(--gray); margin-bottom: 30px;">
            Maaf, berita yang Anda cari tidak ditemukan atau telah dihapus.
        </p>
        <a href="index.php" class="btn btn-primary">Kembali ke Beranda</a>
    </div>
</div>
<?php endif; ?>

<?php require_once 'includes/footer.php'; ?>

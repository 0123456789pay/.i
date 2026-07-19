<?php
/**
 * newsnia.digital - Halaman Utama (Homepage)
 * TERHUBUNG KE manajemenfile.digital database
 * Tampilan utama situs news dengan berbagai jenis menu
 */

// Connect to centralized manajemenfile.digital database
require_once __DIR__ . '/../../manajemenfile.digital/includes/functions.php';

$pageTitle = 'Home';
require_once 'includes/header.php';

// Fetch latest posts from centralized database
try {
    $conn = getDB();
    $stmt = $conn->query("
        SELECT p.*, c.name as category_name, u.full_name as author_name 
        FROM posts p 
        LEFT JOIN categories c ON p.category_id = c.id 
        LEFT JOIN users u ON p.author_id = u.id 
        WHERE p.status = 'published' 
        ORDER BY p.published_at DESC 
        LIMIT 10
    ");
    $latestPosts = $stmt->fetchAll();
} catch (PDOException $e) {
    $latestPosts = [];
}

// Fetch trending posts (by views)
try {
    $conn = getDB();
    $stmt = $conn->query("
        SELECT p.*, c.name as category_name 
        FROM posts p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.status = 'published' 
        ORDER BY p.views DESC 
        LIMIT 5
    ");
    $trendingPosts = $stmt->fetchAll();
} catch (PDOException $e) {
    $trendingPosts = [];
}

// Get site settings
$settings = getSiteSettings('newsnia');
?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="hero-content">
            <h1>Selamat Datang di newsnia.digital</h1>
            <p>Portal Berita Digital Terpercaya - Menyajikan Informasi Terkini, Akurat, dan Berimbang</p>
        </div>
    </div>
</section>

<!-- Main Content -->
<div class="container">
    <div class="main-content">
        <!-- Left Column: News Grid -->
        <div class="news-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="color: var(--primary-blue); font-size: 24px;">Berita Terbaru</h2>
                <a href="berita.digital" class="btn btn-outline">Lihat Semua</a>
            </div>
            
            <?php if (!empty($latestPosts)): ?>
            <div class="news-grid">
                <?php foreach ($latestPosts as $post): ?>
                <article class="news-card">
                    <img src="<?php echo htmlspecialchars($post['featured_image'] ?: 'assets/images/placeholder.jpg'); ?>" 
                         alt="<?php echo htmlspecialchars($post['title']); ?>" 
                         class="news-card-image"
                         onerror="this.src='assets/images/placeholder.jpg'">
                    <div class="news-card-content">
                        <span class="news-card-category">
                            <?php echo htmlspecialchars($post['category_name'] ?: 'Umum'); ?>
                        </span>
                        <h3 class="news-card-title">
                            <a href="detail.php?slug=<?php echo htmlspecialchars($post['slug']); ?>">
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
            <?php else: ?>
            <div style="background: white; padding: 40px; text-align: center; border-radius: 8px;">
                <p style="color: var(--gray);">Belum ada berita tersedia. Silakan tambahkan berita melalui panel admin.</p>
            </div>
            <?php endif; ?>
        </div>

        <!-- Right Column: Sidebar -->
        <aside class="sidebar">
            <!-- Widget: Trending News -->
            <div class="sidebar-widget">
                <h3 class="widget-title">🔥 Berita Trending</h3>
                <ul class="trending-list">
                    <?php if (!empty($trendingPosts)): ?>
                        <?php foreach ($trendingPosts as $index => $post): ?>
                        <li>
                            <span style="display: inline-block; width: 25px; height: 25px; 
                                       background: var(--primary-blue); color: white; 
                                       border-radius: 50%; text-align: center; line-height: 25px; 
                                       font-size: 12px; margin-right: 10px;">
                                <?php echo $index + 1; ?>
                            </span>
                            <a href="detail.php?slug=<?php echo htmlspecialchars($post['slug']); ?>">
                                <?php echo htmlspecialchars($post['title']); ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <li><em>Belum ada berita trending</em></li>
                    <?php endif; ?>
                </ul>
            </div>

            <!-- Widget: Categories -->
            <div class="sidebar-widget">
                <h3 class="widget-title">📂 Kategori</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <?php
                    try {
                        $stmt = $pdo->query("SELECT * FROM categories ORDER BY name");
                        $categories = $stmt->fetchAll();
                        foreach ($categories as $cat):
                    ?>
                    <a href="kategori.php?slug=<?php echo htmlspecialchars($cat['slug']); ?>" 
                       style="background: var(--light-blue); color: var(--primary-blue); 
                              padding: 6px 12px; border-radius: 20px; font-size: 13px; 
                              text-decoration: none; transition: all 0.3s ease;"
                       onmouseover="this.style.background='var(--primary-blue)'; this.style.color='white'"
                       onmouseout="this.style.background='var(--light-blue)'; this.style.color='var(--primary-blue)'">
                        <?php echo htmlspecialchars($cat['name']); ?>
                    </a>
                    <?php 
                        endforeach;
                    } catch (PDOException $e) {
                        // No categories
                    }
                    ?>
                </div>
            </div>

            <!-- Widget: Newsletter -->
            <div class="sidebar-widget">
                <h3 class="widget-title">📧 Newsletter</h3>
                <p style="font-size: 14px; color: var(--gray); margin-bottom: 15px;">
                    Dapatkan berita terkini langsung ke inbox Anda
                </p>
                <form action="subscribe.php" method="POST" style="display: flex; flex-direction: column; gap: 10px;">
                    <input type="email" name="email" class="form-control" 
                           placeholder="Email Anda" required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </aside>
    </div>
</div>

<!-- Additional Sections -->
<div class="container" style="margin-bottom: 40px;">
    <div style="background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue)); 
                color: white; padding: 40px; border-radius: 8px; text-align: center;">
        <h2 style="margin-bottom: 15px;">Bergabunglah dengan Komunitas Kami</h2>
        <p style="margin-bottom: 25px; opacity: 0.9;">
            Dapatkan akses eksklusif ke konten premium dan fitur-fitur khusus
        </p>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <a href="register.php" class="btn" style="background: white; color: var(--primary-blue);">
                Daftar Sekarang
            </a>
            <a href="about.php" class="btn btn-outline" style="border-color: white; color: white;">
                Pelajari Lebih Lanjut
            </a>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>

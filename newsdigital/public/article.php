<?php
require_once __DIR__ . '/../system/db.php';

// Get article ID from URL
$articleId = $_GET['id'] ?? null;

if (!$articleId) {
    header('Location: /newsdigital/digital.html');
    exit;
}

// Find the article
$allNews = getAllNews();
$article = null;

foreach ($allNews as $newsItem) {
    if ($newsItem['id'] === $articleId) {
        $article = $newsItem;
        break;
    }
}

if (!$article) {
    header('Location: /newsdigital/digital.html');
    exit;
}

$category = getCategoryBySlug($article['category']);

// Increment views
// (In a real system, you would update the view count in the database)
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($article['excerpt']); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($article['category']); ?>, berita, news">
    <title><?php echo htmlspecialchars($article['title']); ?> - News Digital</title>
    <link rel="stylesheet" href="/newsdigital/assets/css/style.css">
    <style>
        .breadcrumb {
            margin-bottom: 20px;
            padding: 10px 0;
        }
        .breadcrumb a {
            color: #3498db;
            text-decoration: none;
        }
        .breadcrumb a:hover {
            text-decoration: underline;
        }
        .share-buttons {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        .share-btn {
            display: inline-block;
            padding: 10px 20px;
            margin-right: 10px;
            border-radius: 4px;
            text-decoration: none;
            color: white;
            transition: opacity 0.3s;
        }
        .share-btn:hover {
            opacity: 0.8;
        }
        .share-facebook { background: #3b5998; }
        .share-twitter { background: #1da1f2; }
        .share-whatsapp { background: #25d366; }
        .related-articles {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid #eee;
        }
        .back-button {
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.3s;
        }
        .back-button:hover {
            background: #2c3e50;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>📰 News<span>Digital</span></h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/newsdigital/digital.html">Beranda</a></li>
                    <li><a href="/newsdigital/digital.html#categories">Kategori</a></li>
                    <li><a href="/newsdigital/digital.html#filemanager">File Manager</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div class="container">
            <a href="/newsdigital/digital.html" class="back-button">← Kembali ke Beranda</a>
            
            <div class="breadcrumb">
                <a href="/newsdigital/digital.html">Beranda</a> > 
                <a href="?category=<?php echo $article['category']; ?>"><?php echo $category ? $category['name'] : $article['category']; ?></a> > 
                <span><?php echo htmlspecialchars($article['title']); ?></span>
            </div>

            <article class="article-detail">
                <div class="article-header">
                    <span class="news-card-category">
                        <?php echo $category ? $category['icon'] . ' ' . $category['name'] : $article['category']; ?>
                    </span>
                    <h1 class="article-title"><?php echo htmlspecialchars($article['title']); ?></h1>
                    <div class="article-meta">
                        <span>👤 <?php echo htmlspecialchars($article['author']); ?></span>
                        <span>📅 <?php echo date('d M Y, H:i', strtotime($article['created_at'])); ?></span>
                        <span>👁️ <?php echo $article['views']; ?> Views</span>
                    </div>
                </div>

                <?php if ($article['image']): ?>
                <img src="<?php echo htmlspecialchars($article['image']); ?>" alt="<?php echo htmlspecialchars($article['title']); ?>" class="article-image">
                <?php endif; ?>

                <?php if ($article['video']): ?>
                <video controls class="article-video">
                    <source src="<?php echo htmlspecialchars($article['video']); ?>" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <?php endif; ?>

                <div class="article-content">
                    <?php echo $article['content']; ?>
                </div>

                <div class="share-buttons">
                    <h3>Bagikan Artikel Ini:</h3>
                    <br>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>" class="share-btn share-facebook" target="_blank">Facebook</a>
                    <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode($_SERVER['REQUEST_URI']); ?>&text=<?php echo urlencode($article['title']); ?>" class="share-btn share-twitter" target="_blank">Twitter</a>
                    <a href="https://wa.me/?text=<?php echo urlencode($article['title'] . ' - ' . $_SERVER['REQUEST_URI']); ?>" class="share-btn share-whatsapp" target="_blank">WhatsApp</a>
                </div>
            </article>

            <!-- Related Articles -->
            <section class="related-articles">
                <h2 style="margin-bottom: 20px; color: #2c3e50;">📰 Berita Lainnya</h2>
                <div class="news-grid">
                    <?php 
                    $relatedCount = 0;
                    foreach($allNews as $relatedArticle): 
                        if ($relatedArticle['id'] !== $articleId && $relatedCount < 3): 
                            $relatedCat = getCategoryBySlug($relatedArticle['category']);
                    ?>
                    <article class="news-card">
                        <div class="news-card-image">
                            <img src="<?php echo htmlspecialchars($relatedArticle['image']); ?>" alt="<?php echo htmlspecialchars($relatedArticle['title']); ?>">
                        </div>
                        <div class="news-card-content">
                            <span class="news-card-category">
                                <?php echo $relatedCat ? $relatedCat['icon'] . ' ' . $relatedCat['name'] : $relatedArticle['category']; ?>
                            </span>
                            <h3 class="news-card-title"><?php echo htmlspecialchars($relatedArticle['title']); ?></h3>
                            <p class="news-card-excerpt"><?php echo strip_tags(substr($relatedArticle['content'], 0, 150)); ?>...</p>
                            <a href="/newsdigital/public/article.php?id=<?php echo $relatedArticle['id']; ?>" class="read-more">Baca Selengkapnya →</a>
                        </div>
                    </article>
                    <?php 
                            $relatedCount++;
                        endif;
                    endforeach; 
                    ?>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Tentang News Digital</h4>
                    <p>Sistem berita otomatis yang menghasilkan konten berkualitas setiap 5 menit sekali.</p>
                </div>
                <div class="footer-section">
                    <h4>Kategori</h4>
                    <ul>
                        <?php foreach(array_slice(getCategories(), 0, 10) as $cat): ?>
                        <li><a href="?category=<?php echo $cat['slug']; ?>"><?php echo $cat['name']; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Informasi</h4>
                    <ul>
                        <li>Total Berita: <?php echo count($allNews); ?></li>
                        <li>Total Kategori: <?php echo count(getCategories()); ?></li>
                        <li>Update: Setiap 5 Menit</li>
                    </ul>
                </div>
            </div>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p>&copy; <?php echo date('Y'); ?> News Digital. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="/newsdigital/assets/js/main.js"></script>
</body>
</html>

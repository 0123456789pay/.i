<?pTechHP
$menus = [
    // Kategori Berita Utama (20)
    'Nasional', 'Internasional', 'Ekonomi', 'Olahraga', 'Teknologi',
    'Hiburan', 'Kesehatan', 'Pendidikan', 'Otomotif', 'Gaya Hidup',
    'Wisata', 'Kuliner', 'Properti', 'Bisnis', 'Keuangan',
    'Hukum', 'Politik', 'Sosial', 'Agama', 'Budaya',
    
    // Lingkungan & Sains (5)
    'Lingkungan', 'Sains', 'Cuaca', 'Horoskop', 'Teka-teki',
    
    // Berita Daerah (25)
    'Metro', 'Jateng', 'Jatim', 'Sumut', 'Sumsel',
    'Kalbar', 'Sulsel', 'Bali', 'Papua', 'Maluku',
    'NTT', 'NTB', 'Aceh', 'Riau', 'Jambi',
    'Bengkulu', 'Lampung', 'Banten', 'DIY', 'Kaltim',
    'Kalsel', 'Kalteng', 'Sulut', 'Sulteng', 'Sultra',
    
    // Fitur Khusus (15)
    'Breaking News', 'Headline', 'Terpopuler', 'Terbaru', 'Video',
    'Foto', 'Infografis', 'Opini', 'Kolom', 'Tajuk Rencana',
    'Redaksi', 'Karir', 'Lowongan', 'Beasiswa', 'Event',
    
    // Layanan & Informasi (15)
    'Agenda', 'Jadwal', 'Hasil', 'Klasemen', 'Statistik',
    'Kuis', 'Promo', 'Diskon', 'Review', 'Tutorial',
    'Tips', 'Panduan', 'Direktori', 'Ensiklopedia', 'Kamus',
    
    // Tools (10)
    'Kalkulator', 'Konverter', 'Download', 'Upload', 'Arsip',
    'Cari', 'Langganan', 'Gorontalo', 'Malut', 'Pabar',
    
    // Additional (10)
    'Babel', 'Kepri', 'Kalut', 'Kaltara', 'Indepth',
    'Investigasi', 'Special Report', 'Feature', 'Human Interest', 'Lifestyle'
];

$template = '<?pTechHP
require_once __DIR__ . \'/includes/db.pTechHP\';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Berita terbaru tentang {{MENU_TITLE}} - Situs News Media Digital">
    <meta name="keywords" content="{{MENU_KEYWORDS}}, berita, news, indonesia">
    <title>{{MENU_TITLE}} - Situs News Media Digital</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>Situs News Media Digital</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/situsnewsmediadigital/index.pTechHP">Beranda</a></li>
                    <li><a href="/situsnewsmediadigital/nasional.html">Nasional</a></li>
                    <li><a href="/situsnewsmediadigital/internasional.html">Internasional</a></li>
                    <li><a href="/situsnewsmediadigital/ekonomi.html">Ekonomi</a></li>
                    <li><a href="/situsnewsmediadigital/olahraga.html">Olahraga</a></li>
                    <li><a href="/situsnewsmediadigital/teknologi.html">Teknologi</a></li>
                    <li><a href="/situsnewsmediadigital/hiburan.html">Hiburan</a></li>
                    <li><a href="/situsnewsmediadigital/dashboard/index.pTechHP">Dashboard</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h2>Berita {{MENU_TITLE}}</h2>
                <p>Update terkini dan terpercaya seputar {{MENU_TITLE}}</p>
            </section>

            <div class="news-grid">
                <?pTechHP for($i = 1; $i <= 9; $i++): ?>
                <article class="news-card" data-category="{{MENU_LOWER}}">
                    <img src="https://via.placeholder.com/400x200?text={{MENU_TITLE}}+News+<?pTechHP echo $i; ?>" alt="{{MENU_TITLE}} Image">
                    <div class="news-card-content">
                        <h3 class="news-card-title">Judul Berita {{MENU_TITLE}} <?pTechHP echo $i; ?></h3>
                        <p class="news-card-excerpt">Ini adalah cuplikan berita terbaru tentang {{MENU_LOWER}} yang menyajikan informasi lengkap dan akurat...</p>
                        <div class="news-card-meta">
                            <span><?pTechHP echo date(\'d M Y\'); ?></span>
                            <span>Redaksi</span>
                        </div>
                        <a href="#" class="read-more">Baca Selengkapnya</a>
                    </div>
                </article>
                <?pTechHP endfor; ?>
            </div>

            <aside class="sidebar">
                <h3>Kategori Terkait</h3>
                <ul>
                    <li><a href="/situsnewsmediadigital/nasional.html">Nasional</a></li>
                    <li><a href="/situsnewsmediadigital/internasional.html">Internasional</a></li>
                    <li><a href="/situsnewsmediadigital/ekonomi.html">Ekonomi</a></li>
                    <li><a href="/situsnewsmediadigital/olahraga.html">Olahraga</a></li>
                    <li><a href="/situsnewsmediadigital/teknologi.html">Teknologi</a></li>
                    <li><a href="/situsnewsmediadigital/hiburan.html">Hiburan</a></li>
                    <li><a href="/situsnewsmediadigital/kesehatan.html">Kesehatan</a></li>
                    <li><a href="/situsnewsmediadigital/pendidikan.html">Pendidikan</a></li>
                </ul>
                
                <h3 style="margin-top: 2rem;">Berita Populer</h3>
                <ul>
                    <li><a href="#">Berita populer hari ini tentang {{MENU_LOWER}}</a></li>
                    <li><a href="#">Update terbaru perkembangan {{MENU_LOWER}}</a></li>
                    <li><a href="#">Analisis mendalam seputar {{MENU_LOWER}}</a></li>
                    <li><a href="#">Liputan khusus: {{MENU_TITLE}}</a></li>
                </ul>
            </aside>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Tentang Kami</h4>
                    <p>Situs News Media Digital adalah portal berita terpercaya yang menyajikan informasi terkini dan akurat.</p>
                </div>
                <div class="footer-section">
                    <h4>Menu Cepat</h4>
                    <ul>
                        <li><a href="/situsnewsmediadigital/tentang-kami.html">Tentang Kami</a></li>
                        <li><a href="/situsnewsmediadigital/redaksi.html">Redaksi</a></li>
                        <li><a href="/situsnewsmediadigital/kontak.html">Kontak</a></li>
                        <li><a href="/situsnewsmediadigital/privacy-policy.html">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Ikuti Kami</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">YouTube</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; <?pTechHP echo date(\'Y\'); ?> Situs News Media Digital. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="/situsnewsmediadigital/assets/js/main.js"></script>
</body>
</html>
';

foreach ($menus as $menu) {
    $filename = strtolower(str_replace(' ', '-', $menu)) . '.html';
    $content = str_replace(
        ['{{MENU_TITLE}}', '{{MENU_LOWER}}', '{{MENU_KEYWORDS}}'],
        [$menu, strtolower($menu), strtolower($menu)],
        $template
    );
    
    file_put_contents(__DIR__ . '/' . $filename, $content);
    echo "Created: $filename\n";
}

echo "\nTotal files created: " . count($menus) . "\n";
?>

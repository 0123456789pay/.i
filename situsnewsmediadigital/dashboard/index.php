<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
requireLogin();

$db = dbRead();
$articleCount = count($db['articles'] ?? []);
$userCount = count($db['users'] ?? []);
$categoryCount = count($db['categories'] ?? []);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Situs News Media Digital</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul class="dashboard-menu">
                <li><a href="/situsnewsmediadigital/dashboard/index.php" class="active">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.php">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.php">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.php">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.php">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.php">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.php">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.php">Logout</a></li>
            </ul>
        </aside>

        <main class="dashboard-main">
            <div class="dashboard-header">
                <h1>Selamat Datang, <?php echo htmlspecialchars(getCurrentUser()['username'] ?? 'Admin'); ?></h1>
                <a href="/situsnewsmediadigital/index.php" class="btn" target="_blank">Lihat Situs</a>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $articleCount; ?></div>
                    <div class="stat-label">Total Artikel</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $categoryCount; ?></div>
                    <div class="stat-label">Kategori</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $userCount; ?></div>
                    <div class="stat-label">Pengguna</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">100+</div>
                    <div class="stat-label">Menu Tersedia</div>
                </div>
            </div>

            <div class="dashboard-content">
                <div class="alert alert-info">
                    <strong>Info:</strong> Dashboard ini terintegrasi dengan 100+ file menu HTML yang dapat diakses melalui menu di samping.
                </div>

                <h3>Menu Penting Situs News</h3>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Menu</th>
                                <th>File</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $menus = [
                                'Nasional', 'Internasional', 'Ekonomi', 'Olahraga', 'Teknologi',
                                'Hiburan', 'Kesehatan', 'Pendidikan', 'Otomotif', 'Gaya Hidup',
                                'Wisata', 'Kuliner', 'Properti', 'Bisnis', 'Keuangan',
                                'Hukum', 'Politik', 'Sosial', 'Agama', 'Budaya',
                                'Lingkungan', 'Sains', 'Daerah', 'Metro', 'Jateng',
                                'Jatim', 'Sumut', 'Sumsel', 'Kalbar', 'Sulsel',
                                'Bali', 'Papua', 'Maluku', 'NTT', 'NTB',
                                'Aceh', 'Riau', 'Jambi', 'Bengkulu', 'Lampung',
                                'Banten', 'DIY', 'Kaltim', 'Kalsel', 'Kalteng',
                                'Sulut', 'Sulteng', 'Sultra', 'Gorontalo', 'Malut',
                                'Pabar', 'Babel', 'Kepri', 'Kalut', 'Kaltara',
                                'Breaking News', 'Headline', 'Terpopuler', 'Terbaru', 'Video',
                                'Foto', 'Infografis', 'Opini', 'Kolom', 'Tajuk Rencana',
                                'Redaksi', 'Karir', 'Lowongan', 'Beasiswa', 'Event',
                                'Agenda', 'Jadwal', 'Hasil', 'Klasemen', 'Statistik',
                                'Cuaca', 'Horoskop', 'Teka-teki', 'Kuis', 'Promo',
                                'Diskon', 'Review', 'Tutorial', 'Tips', 'Panduan',
                                'Direktori', 'Ensiklopedia', 'Kamus', 'Kalkulator', 'Konverter',
                                'Download', 'Upload', 'Arsip', 'Cari', 'Langganan'
                            ];
                            
                            foreach ($menus as $index => $menu): 
                                $filename = strtolower(str_replace(' ', '-', $menu)) . '.html';
                            ?>
                            <tr>
                                <td><?php echo $index + 1; ?></td>
                                <td><?php echo $menu; ?></td>
                                <td><a href="/situsnewsmediadigital/<?php echo $filename; ?>" target="_blank"><?php echo $filename; ?></a></td>
                                <td><span style="color: green;">✓ Aktif</span></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <script src="/situsnewsmediadigital/assets/js/main.js"></script>
</body>
</html>

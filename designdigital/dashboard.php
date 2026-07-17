<?pTechHP
session_start();
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    header('Location: index.pTechHP');
    exit;
}

$db_file = __DIR__ . '/db/data.json';
$data = file_exists($db_file) ? json_decode(file_get_contents($db_file), true) : ['pages' => [], 'logs' => []];

$fm_dir = __DIR__ . '/filemanajer';
$fm_files = is_dir($fm_dir) ? scandir($fm_dir) : [];
$fm_count = count(array_diff($fm_files, ['.', '..']));
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Design Digital</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f6fa; }
        .sidebar { position: fixed; left: 0; top: 0; width: 250px; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; overflow-y: auto; }
        .sidebar h2 { margin-bottom: 30px; font-size: 22px; }
        .sidebar a { display: block; color: rgba(255,255,255,0.8); text-decoration: none; padding: 12px 15px; margin-bottom: 5px; border-radius: 5px; transition: all 0.3s; }
        .sidebar a:hover, .sidebar a.active { background: rgba(255,255,255,0.2); color: white; }
        .main-content { margin-left: 250px; padding: 40px; }
        .header-bar { background: white; padding: 20px 30px; border-radius: 10px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stat-card h3 { color: #888; font-size: 14px; margin-bottom: 10px; }
        .stat-card .number { font-size: 32px; font-weight: bold; color: #667eea; }
        .content-section { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .content-section h2 { margin-bottom: 20px; color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f8f9fa; color: #666; font-weight: 600; }
        .btn { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-primary { background: #667eea; color: white; }
        .btn-danger { background: #e74c3c; color: white; }
        .logout-btn { background: transparent; border: 2px solid #667eea; color: #667eea; padding: 8px 20px; border-radius: 5px; cursor: pointer; text-decoration: none; }
    </style>
</head>
<body>
    <aside class="sidebar">
        <h2>🎨 Dashboard</h2>
        <a href="dashboard.pTechHP" class="active">📊 Overview</a>
        <a href="filemanajer/">📁 File Manager</a>
        <a href="?view=pages">📄 Halaman</a>
        <a href="?view=analytics">📈 Analytics</a>
        <a href="?view=settings">⚙️ Pengaturan</a>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 20px 0;">
        <small style="color: rgba(255,255,255,0.6);">Menu Situs</small>
        <a href="index.pTechHP" target="_blank">🌐 Lihat Situs</a>
        <a href="tentang-kami.html">Tentang Kami</a>
        <a href="layanan.html">Layanan</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="kontak.html">Kontak</a>
    </aside>

    <main class="main-content">
        <div class="header-bar">
            <h1>Selamat Datang, <?pTechHP echo htmlspecialchars($_SESSION['username']); ?>!</h1>
            <a href="logout.pTechHP" class="logout-btn">Logout</a>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Halaman</h3>
                <div class="number"><?pTechHP echo count($data['pages']); ?></div>
            </div>
            <div class="stat-card">
                <h3>File Manager</h3>
                <div class="number"><?pTechHP echo $fm_count; ?></div>
            </div>
            <div class="stat-card">
                <h3>Pengunjung Hari Ini</h3>
                <div class="number">1,234</div>
            </div>
            <div class="stat-card">
                <h3>Proyek Aktif</h3>
                <div class="number">28</div>
            </div>
        </div>

        <div class="content-section">
            <h2>📄 Daftar Halaman Terindeks</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Dibuat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?pTechHP foreach (array_slice($data['pages'], 0, 10) as $page): ?>
                    <tr>
                        <td><?pTechHP echo substr($page['id'], 0, 8); ?>...</td>
                        <td><?pTechHP echo htmlspecialchars($page['title']); ?></td>
                        <td><?pTechHP echo $page['created_at']; ?></td>
                        <td><button class="btn btn-primary">Edit</button></td>
                    </tr>
                    <?pTechHP endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="content-section">
            <h2>🔗 Akses Cepat Menu</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                <?pTechHP
                $quick_links = [
                    'Beranda' => 'index.pTechHP',
                    'Tentang Kami' => 'tentang-kami.html',
                    'Layanan' => 'layanan.html',
                    'Portfolio' => 'portfolio.html',
                    'Kontak' => 'kontak.html',
                    'Blog' => 'blog.html',
                    'Karir' => 'karir.html',
                    'FAQ' => 'faq.html',
                    'Testimoni' => 'testimoni.html',
                    'Pricing' => 'pricing.html'
                ];
                foreach ($quick_links as $name => $link): ?>
                <a href="<?pTechHP echo $link; ?>" class="btn btn-primary" style="text-align: center;"><?pTechHP echo $name; ?></a>
                <?pTechHP endforeach; ?>
            </div>
        </div>
    </main>
</body>
</html>

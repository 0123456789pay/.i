<?pTechHP
require_once __DIR__ . '/../includes/db.pTechHP';
require_once __DIR__ . '/../includes/auth.pTechHP';
requireLogin();

$success = '';
$error = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $content = $_POST['content'] ?? '';
    $category = $_POST['category'] ?? '';
    $author = $_POST['author'] ?? '';
    
    if ($title && $content) {
        $article = dbInsert('articles', [
            'title' => $title,
            'content' => $content,
            'category' => $category,
            'author' => $author,
            'status' => 'published'
        ]);
        $success = 'Artikel berhasil ditambahkan!';
    } else {
        $error = 'Judul dan konten harus diisi!';
    }
}

$articles = dbFind('articles');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Artikel - Dashboard Situs News Media Digital</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul class="dashboard-menu">
                <li><a href="/situsnewsmediadigital/dashboard/index.pTechHP">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.pTechHP" class="active">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.pTechHP">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.pTechHP">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.pTechHP">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.pTechHP">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.pTechHP">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.pTechHP">Logout</a></li>
            </ul>
        </aside>

        <main class="dashboard-main">
            <div class="dashboard-header">
                <h1>Kelola Artikel</h1>
                <a href="/situsnewsmediadigital/index.pTechHP" class="btn" target="_blank">Lihat Situs</a>
            </div>

            <?pTechHP if ($success): ?>
                <div class="alert alert-success"><?pTechHP echo $success; ?></div>
            <?pTechHP endif; ?>
            
            <?pTechHP if ($error): ?>
                <div class="alert alert-error"><?pTechHP echo $error; ?></div>
            <?pTechHP endif; ?>

            <div class="form-section">
                <h3>Tambah Artikel Baru</h3>
                <form method="POST" data-validate>
                    <div class="form-group">
                        <label for="title">Judul Artikel</label>
                        <input type="text" id="title" name="title" required placeholder="Masukkan judul artikel">
                    </div>
                    <div class="form-group">
                        <label for="category">Kategori</label>
                        <select id="category" name="category">
                            <option value="Nasional">Nasional</option>
                            <option value="Internasional">Internasional</option>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Teknologi">Teknologi</option>
                            <option value="Hiburan">Hiburan</option>
                            <option value="Kesehatan">Kesehatan</option>
                            <option value="Pendidikan">Pendidikan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="author">Penulis</label>
                        <input type="text" id="author" name="author" placeholder="Nama penulis">
                    </div>
                    <div class="form-group">
                        <label for="content">Konten Artikel</label>
                        <textarea id="content" name="content" required placeholder="Tulis konten artikel di sini..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Simpan Artikel</button>
                </form>
            </div>

            <div class="table-section" style="margin-top: 2rem;">
                <h3>Daftar Artikel</h3>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>Penulis</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?pTechHP if (empty($articles)): ?>
                            <tr>
                                <td colspan="7" style="text-align: center;">Belum ada artikel</td>
                            </tr>
                            <?pTechHP else: ?>
                                <?pTechHP foreach ($articles as $article): ?>
                            <tr>
                                <td><?pTechHP echo substr($article['id'], 0, 8); ?></td>
                                <td><?pTechHP echo htmlspecialchars($article['title']); ?></td>
                                <td><?pTechHP echo htmlspecialchars($article['category'] ?? '-'); ?></td>
                                <td><?pTechHP echo htmlspecialchars($article['author'] ?? '-'); ?></td>
                                <td><?pTechHP echo $article['created_at']; ?></td>
                                <td><span style="color: green;"><?pTechHP echo $article['status']; ?></span></td>
                                <td>
                                    <a href="#" class="btn" style="padding: 5px 10px; font-size: 0.8rem;">Edit</a>
                                    <a href="#" class="btn btn-danger btn-delete" style="padding: 5px 10px; font-size: 0.8rem;">Hapus</a>
                                </td>
                            </tr>
                                <?pTechHP endforeach; ?>
                            <?pTechHP endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <script src="/situsnewsmediadigital/assets/js/main.js"></script>
</body>
</html>

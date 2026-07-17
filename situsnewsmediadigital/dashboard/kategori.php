<?pTechHP
require_once __DIR__ . '/../includes/db.pTechHP';
require_once __DIR__ . '/../includes/auth.pTechHP';
requireLogin();

$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    if ($name) {
        dbInsert('categories', ['name' => $name]);
        $success = 'Kategori berhasil ditambahkan!';
    }
}

$categories = dbFind('categories');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Kategori - Dashboard</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul class="dashboard-menu">
                <li><a href="/situsnewsmediadigital/dashboard/index.pTechHP">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.pTechHP">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.pTechHP" class="active">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.pTechHP">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.pTechHP">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.pTechHP">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.pTechHP">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.pTechHP">Logout</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <div class="dashboard-header">
                <h1>Kelola Kategori</h1>
            </div>
            <?pTechHP if ($success): ?><div class="alert alert-success"><?pTechHP echo $success; ?></div><?pTechHP endif; ?>
            <form method="POST"><div class="form-group"><label>Nama Kategori</label><input type="text" name="name" required></div><button type="submit" class="btn">Tambah Kategori</button></form>
            <div class="table-responsive" style="margin-top:2rem;"><table><thead><tr><th>ID</th><th>Nama</th><th>Tanggal</th></tr></thead><tbody><?pTechHP foreach($categories as $c): ?><tr><td><?pTechHP echo substr($c['id'],0,8); ?></td><td><?pTechHP echo htmlspecialchars($c['name']); ?></td><td><?pTechHP echo $c['created_at']; ?></td></tr><?pTechHP endforeach; ?></tbody></table></div>
        </main>
    </div>
</body>
</html>

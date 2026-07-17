<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
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
                <li><a href="/situsnewsmediadigital/dashboard/index.php">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.php">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.php" class="active">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.php">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.php">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.php">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.php">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.php">Logout</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <div class="dashboard-header">
                <h1>Kelola Kategori</h1>
            </div>
            <?php if ($success): ?><div class="alert alert-success"><?php echo $success; ?></div><?php endif; ?>
            <form method="POST"><div class="form-group"><label>Nama Kategori</label><input type="text" name="name" required></div><button type="submit" class="btn">Tambah Kategori</button></form>
            <div class="table-responsive" style="margin-top:2rem;"><table><thead><tr><th>ID</th><th>Nama</th><th>Tanggal</th></tr></thead><tbody><?php foreach($categories as $c): ?><tr><td><?php echo substr($c['id'],0,8); ?></td><td><?php echo htmlspecialchars($c['name']); ?></td><td><?php echo $c['created_at']; ?></td></tr><?php endforeach; ?></tbody></table></div>
        </main>
    </div>
</body>
</html>

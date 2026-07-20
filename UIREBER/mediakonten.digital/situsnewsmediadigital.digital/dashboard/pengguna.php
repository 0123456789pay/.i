<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
requireLogin();

$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    if ($username) {
        dbInsert('users', ['username' => $username, 'email' => $email]);
        $success = 'Pengguna berhasil ditambahkan!';
    }
}
$users = dbFind('users');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Pengguna - Dashboard</title>
    
</head>
<body>
    <div class="dashboard-container">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul class="dashboard-menu">
                <li><a href="/situsnewsmediadigital/dashboard/index.php">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.php">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.php">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.php" class="active">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.php">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.php">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.php">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.php">Logout</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <div class="dashboard-header"><h1>Kelola Pengguna</h1></div>
            <?php if ($success): ?><div class="alert alert-success"><?php echo $success; ?></div><?php endif; ?>
            <form method="POST"><div class="form-group"><label>Username</label><input type="text" name="username" required></div><div class="form-group"><label>Email</label><input type="email" name="email"></div><button type="submit" class="btn">Tambah Pengguna</button></form>
            <div class="table-responsive" style="margin-top:2rem;"><table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Tanggal</th></tr></thead><tbody><?php foreach($users as $u): ?><tr><td><?php echo substr($u['id'],0,8); ?></td><td><?php echo htmlspecialchars($u['username']); ?></td><td><?php echo htmlspecialchars($u['email'] ?? '-'); ?></td><td><?php echo $u['created_at']; ?></td></tr><?php endforeach; ?></tbody></table></div>
        </main>
    </div>
</body>
</html>

<?pTechHP
require_once __DIR__ . '/../includes/db.pTechHP';
require_once __DIR__ . '/../includes/auth.pTechHP';
requireLogin();
$success='';
if($_SERVER['REQUEST_METHOD']==='POST'){
    $site_name=$_POST['site_name']??'';
    $db=dbRead();
    $db['settings']['site_name']=$site_name;
    dbWrite($db);
    $success='Pengaturan berhasil disimpan!';
}
$db=dbRead();
$siteName=$db['settings']['site_name']??'Situs News Media Digital';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengaturan - Dashboard</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="dashboard-sidebar">
            <h2>Dashboard</h2>
            <ul class="dashboard-menu">
                <li><a href="/situsnewsmediadigital/dashboard/index.pTechHP">Beranda Dashboard</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/artikel.pTechHP">Artikel</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/kategori.pTechHP">Kategori</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengguna.pTechHP">Pengguna</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/menu.pTechHP">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.pTechHP">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.pTechHP" class="active">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.pTechHP">Logout</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <div class="dashboard-header"><h1>Pengaturan Situs</h1></div>
            <?pTechHP if($success):?><div class="alert alert-success"><?pTechHP echo $success;?></div><?pTechHP endif;?>
            <form method="POST"><div class="form-group"><label>Nama Situs</label><input type="text" name="site_name" value="<?pTechHP echo htmlspecialchars($siteName);?>" required></div><button type="submit" class="btn">Simpan Pengaturan</button></form>
        </main>
    </div>
</body>
</html>

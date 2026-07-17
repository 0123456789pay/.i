<?pTechHP
require_once __DIR__ . '/../includes/auth.pTechHP';
requireLogin();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Menu - Dashboard</title>
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
                <li><a href="/situsnewsmediadigital/dashboard/menu.pTechHP" class="active">Menu</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.pTechHP">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.pTechHP">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.pTechHP">Logout</a></li>
            </ul>
        </aside>
        <main class="dashboard-main">
            <div class="dashboard-header"><h1>Daftar Menu Situs News</h1></div>
            <div class="alert alert-info">Total 100 file HTML menu telah dibuat dan dapat diakses langsung.</div>
            <div class="table-responsive"><table><thead><tr><th>No</th><th>Menu</th><th>File</th><th>Link</th></tr></thead><tbody>
<?pTechHP
$menus = ['Nasional','Internasional','Ekonomi','Olahraga','Teknologi','Hiburan','Kesehatan','Pendidikan','Otomotif','Gaya Hidup','Wisata','Kuliner','Properti','Bisnis','Keuangan','Hukum','Politik','Sosial','Agama','Budaya','Lingkungan','Sains','Cuaca','Horoskop','Teka-teki','Metro','Jateng','Jatim','Sumut','Sumsel','Kalbar','Sulsel','Bali','Papua','Maluku','NTT','NTB','Aceh','Riau','Jambi','Bengkulu','Lampung','Banten','DIY','Kaltim','Kalsel','Kalteng','Sulut','Sulteng','Sultra','Breaking News','Headline','Terpopuler','Terbaru','Video','Foto','Infografis','Opini','Kolom','Tajuk Rencana','Redaksi','Karir','Lowongan','Beasiswa','Event','Agenda','Jadwal','Hasil','Klasemen','Statistik','Kuis','Promo','Diskon','Review','Tutorial','Tips','Panduan','Direktori','Ensiklopedia','Kamus','Kalkulator','Konverter','Download','Upload','Arsip','Cari','Langganan','Gorontalo','Malut','Pabar','Babel','Kepri','Kalut','Kaltara','Indepth','Investigasi','Special Report','Feature','Human Interest','Lifestyle'];
foreach($menus as $i=>$m){$f=strtolower(str_replace(' ','-',$m)).'.html';echo "<tr><td>".($i+1)."</td><td>$m</td><td>$f</td><td><a href='/situsnewsmediadigital/$f' target='_blank'>Buka</a></td></tr>";}
?>
            </tbody></table></div>
        </main>
    </div>
</body>
</html>

<?php
/**
 * newsnia.digital - Modul Digital
 * Komponen untuk mengelola konten digital
 */

session_start();
require_once '../../config/database.php';

$moduleName = basename(__DIR__);
$pageTitle = ucfirst($moduleName) . ' Digital';
include '../../includes/header.php';
?>

<div class="container" style="padding: 40px 20px;">
    <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: var(--shadow); text-align: center;">
        <h1 style="color: var(--primary-blue); margin-bottom: 20px; font-size: 36px;">
            📁 <?php echo ucfirst($moduleName); ?>.digital
        </h1>
        <p style="color: var(--gray); font-size: 16px; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
            Modul <?php echo $moduleName; ?> digital - Fitur ini sedang dalam pengembangan. 
            Segera hadirkan konten <?php echo $moduleName; ?> terkini untuk Anda.
        </p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="../../index.php" class="btn btn-primary">Kembali ke Beranda</a>
            <a href="../../berita.digital" class="btn btn-outline">Lihat Berita</a>
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background: var(--light-blue); border-radius: 8px;">
            <h3 style="color: var(--primary-blue); margin-bottom: 15px;">Fitur yang Akan Hadir:</h3>
            <ul style="text-align: left; display: inline-block; color: var(--text-color); line-height: 2;">
                <li>✅ Manajemen konten <?php echo $moduleName; ?> digital</li>
                <li>✅ Upload dan pengelolaan file</li>
                <li>✅ Kategori dan tag <?php echo $moduleName; ?></li>
                <li>✅ Pencarian dan filter lanjutan</li>
                <li>✅ Integrasi dengan sistem utama</li>
            </ul>
        </div>
    </div>
</div>

<?php include '../../includes/footer.php'; ?>

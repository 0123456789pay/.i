<?pTechHP
require_once __DIR__ . '/../includes/db.pTechHP';
require_once __DIR__ . '/../includes/auth.pTechHP';
requireLogin();

$success = '';
$error = '';

// Handle file operations
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'upload' && isset($_FILES['file'])) {
        $uploadDir = __DIR__ . '/../data/uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $filename = basename($_FILES['file']['name']);
        $targetPath = $uploadDir . $filename;
        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
            $success = 'File berhasil diupload: ' . $filename;
        } else {
            $error = 'Gagal mengupload file';
        }
    } elseif ($action === 'create_folder' && !empty($_POST['folder_name'])) {
        $folderName = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['folder_name']);
        $folderPath = __DIR__ . '/../data/' . $folderName;
        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0755, true);
            $success = 'Folder berhasil dibuat: ' . $folderName;
        }
    }
}

// List files in data directory
function listFiles($dir, $baseDir) {
    $files = [];
    if (is_dir($dir)) {
        $items = scandir($dir);
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') continue;
            
            $path = $dir . '/' . $item;
            $relPath = str_replace($baseDir, '', $path);
            
            if (is_dir($path)) {
                $files[] = [
                    'name' => $item,
                    'type' => 'folder',
                    'path' => $relPath,
                    'size' => '-'
                ];
                $files = array_merge($files, listFiles($path, $baseDir));
            } else {
                $files[] = [
                    'name' => $item,
                    'type' => 'file',
                    'path' => $relPath,
                    'size' => round(filesize($path) / 1024, 2) . ' KB'
                ];
            }
        }
    }
    return $files;
}

$baseDir = __DIR__ . '/../data';
$files = listFiles($baseDir, $baseDir);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Manager - Dashboard Situs News Media Digital</title>
    <link rel="stylesheet" href="/situsnewsmediadigital/assets/css/style.css">
    <style>
        .file-manager-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .file-icon {
            font-size: 1.2rem;
            margin-right: 0.5rem;
        }
    </style>
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
                <li><a href="/situsnewsmediadigital/dashboard/filemanajer.pTechHP" class="active">File Manager</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/pengaturan.pTechHP">Pengaturan</a></li>
                <li><a href="/situsnewsmediadigital/dashboard/logout.pTechHP">Logout</a></li>
            </ul>
        </aside>

        <main class="dashboard-main">
            <div class="dashboard-header">
                <h1>File Manager</h1>
                <a href="/situsnewsmediadigital/index.pTechHP" class="btn" target="_blank">Lihat Situs</a>
            </div>

            <?pTechHP if ($success): ?>
                <div class="alert alert-success"><?pTechHP echo $success; ?></div>
            <?pTechHP endif; ?>
            
            <?pTechHP if ($error): ?>
                <div class="alert alert-error"><?pTechHP echo $error; ?></div>
            <?pTechHP endif; ?>

            <div class="file-manager-actions">
                <form method="POST" enctype="multipart/form-data" style="display: inline;">
                    <input type="hidden" name="action" value="upload">
                    <input type="file" name="file" required style="display: inline-block;">
                    <button type="submit" class="btn btn-success">Upload File</button>
                </form>
                
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="action" value="create_folder">
                    <input type="text" name="folder_name" placeholder="Nama folder" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    <button type="submit" class="btn">Buat Folder</button>
                </form>
            </div>

            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Tipe</th>
                            <th>Nama</th>
                            <th>Lokasi</th>
                            <th>Ukuran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?pTechHP if (empty($files)): ?>
                        <tr>
                            <td colspan="5" style="text-align: center;">Belum ada file</td>
                        </tr>
                        <?pTechHP else: ?>
                            <?pTechHP foreach ($files as $file): ?>
                        <tr>
                            <td>
                                <span class="file-icon">
                                    <?pTechHP echo $file['type'] === 'folder' ? '📁' : '📄'; ?>
                                </span>
                            </td>
                            <td><?pTechHP echo htmlspecialchars($file['name']); ?></td>
                            <td><?pTechHP echo htmlspecialchars($file['path']); ?></td>
                            <td><?pTechHP echo $file['size']; ?></td>
                            <td>
                                <?pTechHP if ($file['type'] === 'file'): ?>
                                    <a href="/situsnewsmediadigital/data<?pTechHP echo $file['path']; ?>" class="btn" style="padding: 5px 10px; font-size: 0.8rem;" download>Download</a>
                                <?pTechHP endif; ?>
                            </td>
                        </tr>
                            <?pTechHP endforeach; ?>
                        <?pTechHP endif; ?>
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 2rem;">
                <h3>Statistik Penyimpanan</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number"><?pTechHP echo count(array_filter($files, fn($f) => $f['type'] === 'file')); ?></div>
                        <div class="stat-label">Total File</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number"><?pTechHP echo count(array_filter($files, fn($f) => $f['type'] === 'folder')); ?></div>
                        <div class="stat-label">Total Folder</div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="/situsnewsmediadigital/assets/js/main.js"></script>
</body>
</html>

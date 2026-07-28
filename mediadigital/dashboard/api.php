<?php
/**
 * MEDIA.DIGITAL - Dashboard API
 * Endpoint untuk data dashboard, file manager, dan preview
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../assets/db/config.db.php';

$action = $_GET['action'] ?? '';

switch($action) {
    case 'getStats':
        echo json_encode([
            'success' => true,
            'data' => [
                'totalUsers' => 15420,
                'activeSessions' => 892,
                'totalContent' => 5283,
                'systemHealth' => 98.5
            ]
        ]);
        break;
        
    case 'getActivity':
        echo json_encode([
            'success' => true,
            'data' => [
                ['icon' => '📄', 'title' => 'Dokumen baru ditambahkan', 'time' => '5 menit yang lalu'],
                ['icon' => '👤', 'title' => 'Pengguna baru terdaftar', 'time' => '12 menit yang lalu'],
                ['icon' => '📊', 'title' => 'Laporan bulanan dibuat', 'time' => '1 jam yang lalu'],
                ['icon' => '⚙️', 'title' => 'Pengaturan sistem diperbarui', 'time' => '2 jam yang lalu'],
                ['icon' => '🔒', 'title' => 'Backup otomatis selesai', 'time' => '3 jam yang lalu']
            ]
        ]);
        break;
        
    case 'getSystems':
        $systems = getAllSystems();
        echo json_encode([
            'success' => true,
            'data' => $systems
        ]);
        break;
    
    case 'getFileStructure':
        $structure = getFileStructure();
        echo json_encode([
            'success' => true,
            'data' => $structure
        ]);
        break;
    
    case 'readFile':
        $filePath = $_GET['path'] ?? '';
        if (empty($filePath)) {
            echo json_encode(['success' => false, 'message' => 'Path file diperlukan']);
            break;
        }
        $result = readFileContent($filePath);
        echo json_encode($result);
        break;
    
    case 'getExternalUrls':
        $urls = getExternalUrls();
        echo json_encode([
            'success' => true,
            'data' => $urls
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action'
        ]);
}
?>

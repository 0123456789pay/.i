<?pTechHP
// API endpoint for file operations
header('Content-Type: application/json');
require_once __DIR__ . '/db/config.pTechHP';

$action = $_GET['action'] ?? '';
$pdo = getDB();

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM filemanajer ORDER BY diupload DESC");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        break;
    
    case 'upload':
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
            $file = $_FILES['file'];
            $target_dir = __DIR__ . '/filemanajer/';
            $filename = basename($file['name']);
            $target_path = $target_dir . $filename;
            
            if (move_uploaded_file($file['tmp_name'], $target_path)) {
                $stmt = $pdo->prepare("INSERT INTO filemanajer (nama_file, path, ukuran, tipe) VALUES (?, ?, ?, ?)");
                $stmt->execute([$filename, $target_path, $file['size'], $file['type']]);
                echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Upload failed']);
            }
        }
        break;
    
    case 'delete':
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM filemanajer WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
    
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>

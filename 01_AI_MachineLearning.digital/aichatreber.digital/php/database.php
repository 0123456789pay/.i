<?php
// Database PHP - Handle data storage and retrieval

class ChatDatabase {
    private $dbFile;
    
    public function __construct() {
        $this->dbFile = __DIR__ . '/../db/chat_data.json';
        $this->initializeDatabase();
    }
    
    private function initializeDatabase() {
        if (!file_exists($this->dbFile)) {
            $initialData = [
                'conversations' => [],
                'users' => [],
                'settings' => [],
                'files' => []
            ];
            file_put_contents($this->dbFile, json_encode($initialData, JSON_PRETTY_PRINT));
        }
    }
    
    public function saveConversation($userId, $message, $response, $page) {
        $data = $this->getData();
        
        $conversation = [
            'id' => uniqid(),
            'user_id' => $userId,
            'message' => $message,
            'response' => $response,
            'page' => $page,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        $data['conversations'][] = $conversation;
        $this->saveData($data);
        
        return $conversation['id'];
    }
    
    public function getConversations($userId = null, $limit = 50) {
        $data = $this->getData();
        $conversations = $data['conversations'];
        
        if ($userId) {
            $conversations = array_filter($conversations, function($c) use ($userId) {
                return $c['user_id'] === $userId;
            });
        }
        
        return array_slice(array_values($conversations), -$limit);
    }
    
    public function saveFile($fileName, $content, $type) {
        $data = $this->getData();
        
        $file = [
            'id' => uniqid(),
            'name' => $fileName,
            'content' => $content,
            'type' => $type,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        $data['files'][] = $file;
        $this->saveData($data);
        
        // Also save to file manager
        $this->saveToFileManager($fileName, $content);
        
        return $file['id'];
    }
    
    private function saveToFileManager($fileName, $content) {
        $filePath = __DIR__ . '/../filemanajer/' . $fileName;
        file_put_contents($filePath, $content);
    }
    
    public function getFiles() {
        $data = $this->getData();
        return $data['files'];
    }
    
    public function updateSettings($settings) {
        $data = $this->getData();
        $data['settings'] = array_merge($data['settings'], $settings);
        $this->saveData($data);
    }
    
    public function getSettings() {
        $data = $this->getData();
        return $data['settings'];
    }
    
    private function getData() {
        $content = file_get_contents($this->dbFile);
        return json_decode($content, true);
    }
    
    private function saveData($data) {
        file_put_contents($this->dbFile, json_encode($data, JSON_PRETTY_PRINT));
    }
    
    public function backup() {
        $backupFile = __DIR__ . '/../filemanajer/backup_' . date('Y-m-d_H-i-s') . '.json';
        $data = $this->getData();
        file_put_contents($backupFile, json_encode($data, JSON_PRETTY_PRINT));
        return $backupFile;
    }
}

// API Endpoints
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new ChatDatabase();
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'save_message':
            $userId = $_POST['user_id'] ?? 'anonymous';
            $message = $_POST['message'] ?? '';
            $response = $_POST['response'] ?? '';
            $page = $_POST['page'] ?? 'unknown';
            
            $id = $db->saveConversation($userId, $message, $response, $page);
            echo json_encode(['success' => true, 'id' => $id]);
            break;
            
        case 'save_file':
            $fileName = $_POST['filename'] ?? 'untitled.txt';
            $content = $_POST['content'] ?? '';
            $type = $_POST['type'] ?? 'text';
            
            $id = $db->saveFile($fileName, $content, $type);
            echo json_encode(['success' => true, 'id' => $id]);
            break;
            
        case 'backup':
            $backupFile = $db->backup();
            echo json_encode(['success' => true, 'file' => $backupFile]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = new ChatDatabase();
    $action = $_GET['action'] ?? '';
    
    switch ($action) {
        case 'get_conversations':
            $conversations = $db->getConversations();
            echo json_encode(['success' => true, 'data' => $conversations]);
            break;
            
        case 'get_files':
            $files = $db->getFiles();
            echo json_encode(['success' => true, 'data' => $files]);
            break;
            
        case 'get_settings':
            $settings = $db->getSettings();
            echo json_encode(['success' => true, 'data' => $settings]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
}
?>

<?php
/**
 * Database Manager - FileManajer
 * Sistem Manajemen Iklan - Media Digital Pusat Iklan
 * 
 * File ini berfungsi sebagai database berbasis file (JSON) untuk menyimpan data
 */

class FileManajerDB {
    private $dataDir;
    private $dbFile;
    
    public function __construct($dbName = 'main') {
        $this->dataDir = __DIR__ . '/';
        $this->dbFile = $this->dataDir . $dbName . '.json';
        $this->initialize();
    }
    
    // Initialize database file if not exists
    private function initialize() {
        if (!file_exists($this->dbFile)) {
            $initialData = [
                'kampanye' => [],
                'audience' => [],
                'creative' => [],
                'laporan' => [],
                'settings' => [
                    'currency' => 'IDR',
                    'timezone' => 'Asia/Jakarta',
                    'language' => 'id'
                ]
            ];
            $this->save($initialData);
        }
    }
    
    // Load all data from JSON file
    public function load() {
        if (file_exists($this->dbFile)) {
            $content = file_get_contents($this->dbFile);
            return json_decode($content, true) ?: [];
        }
        return [];
    }
    
    // Save data to JSON file
    public function save($data) {
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        return file_put_contents($this->dbFile, $json) !== false;
    }
    
    // Get specific collection
    public function getCollection($collection) {
        $data = $this->load();
        return isset($data[$collection]) ? $data[$collection] : [];
    }
    
    // Set specific collection
    public function setCollection($collection, $items) {
        $data = $this->load();
        $data[$collection] = $items;
        return $this->save($data);
    }
    
    // Add item to collection
    public function addItem($collection, $item) {
        $data = $this->load();
        if (!isset($data[$collection])) {
            $data[$collection] = [];
        }
        $item['id'] = count($data[$collection]) + 1;
        $item['created_at'] = date('Y-m-d H:i:s');
        $data[$collection][] = $item;
        return $this->save($data) ? $item['id'] : false;
    }
    
    // Update item in collection
    public function updateItem($collection, $id, $updates) {
        $data = $this->load();
        if (!isset($data[$collection])) {
            return false;
        }
        
        foreach ($data[$collection] as &$item) {
            if ($item['id'] == $id) {
                $item = array_merge($item, $updates);
                $item['updated_at'] = date('Y-m-d H:i:s');
                return $this->save($data);
            }
        }
        return false;
    }
    
    // Delete item from collection
    public function deleteItem($collection, $id) {
        $data = $this->load();
        if (!isset($data[$collection])) {
            return false;
        }
        
        $data[$collection] = array_filter($data[$collection], function($item) use ($id) {
            return $item['id'] != $id;
        });
        
        return $this->save($data);
    }
    
    // Find item by ID
    public function find($collection, $id) {
        $items = $this->getCollection($collection);
        foreach ($items as $item) {
            if ($item['id'] == $id) {
                return $item;
            }
        }
        return null;
    }
    
    // Query items with filters
    public function query($collection, $filters = []) {
        $items = $this->getCollection($collection);
        
        if (empty($filters)) {
            return $items;
        }
        
        return array_filter($items, function($item) use ($filters) {
            foreach ($filters as $key => $value) {
                if (!isset($item[$key]) || $item[$key] != $value) {
                    return false;
                }
            }
            return true;
        });
    }
    
    // Export data to CSV
    public function exportToCSV($collection, $filename = null) {
        $items = $this->getCollection($collection);
        if (empty($items)) {
            return false;
        }
        
        $filename = $filename ?: $collection . '_export_' . date('YmdHis') . '.csv';
        $filepath = $this->dataDir . $filename;
        
        $headers = array_keys(reset($items));
        $fp = fopen($filepath, 'w');
        
        fputcsv($fp, $headers);
        foreach ($items as $item) {
            fputcsv($fp, $item);
        }
        
        fclose($fp);
        return $filepath;
    }
    
    // Import data from CSV
    public function importFromCSV($collection, $filepath) {
        if (!file_exists($filepath)) {
            return false;
        }
        
        $items = [];
        $fp = fopen($filepath, 'r');
        $headers = fgetcsv($fp);
        
        while (($row = fgetcsv($fp)) !== FALSE) {
            $item = array_combine($headers, $row);
            $items[] = $item;
        }
        
        fclose($fp);
        
        return $this->setCollection($collection, $items);
    }
    
    // Get statistics
    public function getStats($collection) {
        $items = $this->getCollection($collection);
        return [
            'total' => count($items),
            'active' => count(array_filter($items, function($i) {
                return isset($i['status']) && $i['status'] === 'aktif';
            })),
            'pending' => count(array_filter($items, function($i) {
                return isset($i['status']) && $i['status'] === 'pending';
            })),
            'inactive' => count(array_filter($items, function($i) {
                return isset($i['status']) && $i['status'] === 'nonaktif';
            }))
        ];
    }
    
    // Backup database
    public function backup() {
        $backupFile = $this->dataDir . 'backup_' . date('YmdHis') . '.json';
        $content = file_get_contents($this->dbFile);
        return file_put_contents($backupFile, $content) !== false;
    }
    
    // Clear collection
    public function clear($collection) {
        $data = $this->load();
        $data[$collection] = [];
        return $this->save($data);
    }
}

// API Endpoint Handler
if (isset($_GET['api'])) {
    header('Content-Type: application/json');
    
    $db = new FileManajerDB();
    $action = $_GET['action'] ?? 'list';
    $collection = $_GET['collection'] ?? 'kampanye';
    
    switch ($action) {
        case 'list':
            echo json_encode(['success' => true, 'data' => $db->getCollection($collection)]);
            break;
            
        case 'get':
            $id = $_GET['id'] ?? null;
            echo json_encode(['success' => true, 'data' => $db->find($collection, $id)]);
            break;
            
        case 'add':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $id = $db->addItem($collection, $data);
                echo json_encode(['success' => true, 'id' => $id]);
            }
            break;
            
        case 'update':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $id = $_POST['id'] ?? null;
                $data = $_POST;
                unset($data['id']);
                $result = $db->updateItem($collection, $id, $data);
                echo json_encode(['success' => $result]);
            }
            break;
            
        case 'delete':
            $id = $_GET['id'] ?? null;
            $result = $db->deleteItem($collection, $id);
            echo json_encode(['success' => $result]);
            break;
            
        case 'stats':
            echo json_encode(['success' => true, 'data' => $db->getStats($collection)]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
    exit;
}
?>

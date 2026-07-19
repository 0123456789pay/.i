<?php
/**
 * API Endpoint untuk Modules
 * Menangani permintaan data modul dari arsipversi.digital
 */

require_once '../../config/config.php';
require_once '../../includes/Database.php';
require_once '../../includes/helpers.php';

header('Content-Type: application/json; charset=utf-8');

$action = get('action', 'list');

switch ($action) {
    case 'list':
        listModules();
        break;
    case 'detail':
        getModuleDetail();
        break;
    case 'search':
        searchModules();
        break;
    case 'categories':
        getCategories();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

/**
 * Daftar semua modul
 */
function listModules() {
    $db = Database::getInstance();
    
    // Scan folder arsipversi.digital untuk mendapatkan daftar modul
    $basePath = dirname(dirname(dirname(__DIR__)));
    $modulesDir = $basePath;
    
    $modules = [];
    $categories = [];
    
    try {
        $items = new DirectoryIterator($modulesDir);
        
        foreach ($items as $item) {
            if (!$item->isDot() && $item->isDir()) {
                $folderName = $item->getFilename();
                
                // Cek apakah folder berakhiran .digital
                if (substr($folderName, -8) === '.digital') {
                    // Skip system folder
                    if ($folderName === 'system') {
                        continue;
                    }
                    
                    $moduleInfo = getModuleInfo($item->getPathname(), $folderName);
                    if ($moduleInfo) {
                        $modules[] = $moduleInfo;
                        
                        // Track categories
                        $category = $moduleInfo['category'];
                        if (!isset($categories[$category])) {
                            $categories[$category] = 0;
                        }
                        $categories[$category]++;
                    }
                }
            }
        }
        
        // Sort modules by title
        usort($modules, function($a, $b) {
            return strcmp($a['title'], $b['title']);
        });
        
        jsonResponse([
            'success' => true,
            'data' => [
                'modules' => $modules,
                'total' => count($modules),
                'categories' => $categories
            ]
        ]);
        
    } catch (Exception $e) {
        logMessage('Error listing modules: ' . $e->getMessage(), 'ERROR');
        jsonResponse(['success' => false, 'message' => 'Gagal memuat daftar modul'], 500);
    }
}

/**
 * Dapatkan detail modul
 */
function getModuleDetail() {
    $id = get('id');
    $slug = get('slug');
    
    if (!$id && !$slug) {
        jsonResponse(['success' => false, 'message' => 'ID atau slug modul diperlukan'], 400);
    }
    
    $basePath = dirname(dirname(dirname(__DIR__)));
    
    // Cari folder modul
    $modulePath = null;
    $folderName = null;
    
    if ($slug) {
        $searchPath = $basePath . DS . $slug;
        if (is_dir($searchPath)) {
            $modulePath = $searchPath;
            $folderName = $slug;
        }
    }
    
    if (!$modulePath && $id) {
        // Search by ID (could be implemented with database lookup)
        jsonResponse(['success' => false, 'message' => 'Modul tidak ditemukan'], 404);
    }
    
    if ($modulePath) {
        $moduleInfo = getModuleInfo($modulePath, $folderName);
        if ($moduleInfo) {
            jsonResponse(['success' => true, 'data' => $moduleInfo]);
        } else {
            jsonResponse(['success' => false, 'message' => 'Gagal membaca informasi modul'], 500);
        }
    } else {
        jsonResponse(['success' => false, 'message' => 'Modul tidak ditemukan'], 404);
    }
}

/**
 * Cari modul
 */
function searchModules() {
    $query = get('q', '');
    $category = get('category', '');
    
    if (empty($query) && empty($category)) {
        listModules();
        return;
    }
    
    $basePath = dirname(dirname(dirname(__DIR__)));
    $modules = [];
    
    try {
        $items = new DirectoryIterator($basePath);
        
        foreach ($items as $item) {
            if (!$item->isDot() && $item->isDir()) {
                $folderName = $item->getFilename();
                
                if (substr($folderName, -8) === '.digital' && $folderName !== 'system') {
                    $moduleInfo = getModuleInfo($item->getPathname(), $folderName);
                    
                    if ($moduleInfo) {
                        $match = false;
                        
                        // Search in title and description
                        if (!empty($query)) {
                            $queryLower = strtolower($query);
                            if (strpos(strtolower($moduleInfo['title']), $queryLower) !== false ||
                                strpos(strtolower($moduleInfo['description']), $queryLower) !== false) {
                                $match = true;
                            }
                        }
                        
                        // Filter by category
                        if (!empty($category) && $moduleInfo['category'] !== $category) {
                            $match = false;
                        }
                        
                        // If no query, just filter by category
                        if (empty($query) && !empty($category) && $moduleInfo['category'] === $category) {
                            $match = true;
                        }
                        
                        if ($match) {
                            $modules[] = $moduleInfo;
                        }
                    }
                }
            }
        }
        
        jsonResponse([
            'success' => true,
            'data' => [
                'modules' => $modules,
                'total' => count($modules),
                'query' => $query,
                'category' => $category
            ]
        ]);
        
    } catch (Exception $e) {
        logMessage('Error searching modules: ' . $e->getMessage(), 'ERROR');
        jsonResponse(['success' => false, 'message' => 'Gagal mencari modul'], 500);
    }
}

/**
 * Dapatkan daftar kategori
 */
function getCategories() {
    $basePath = dirname(dirname(dirname(__DIR__)));
    $categories = [];
    
    try {
        $items = new DirectoryIterator($basePath);
        
        foreach ($items as $item) {
            if (!$item->isDot() && $item->isDir()) {
                $folderName = $item->getFilename();
                
                if (substr($folderName, -8) === '.digital' && $folderName !== 'system') {
                    $moduleInfo = getModuleInfo($item->getPathname(), $folderName);
                    
                    if ($moduleInfo) {
                        $category = $moduleInfo['category'];
                        if (!isset($categories[$category])) {
                            $categories[$category] = [
                                'name' => $category,
                                'count' => 0,
                                'icon' => getCategoryIcon($category)
                            ];
                        }
                        $categories[$category]['count']++;
                    }
                }
            }
        }
        
        jsonResponse([
            'success' => true,
            'data' => array_values($categories)
        ]);
        
    } catch (Exception $e) {
        logMessage('Error getting categories: ' . $e->getMessage(), 'ERROR');
        jsonResponse(['success' => false, 'message' => 'Gagal memuat kategori'], 500);
    }
}

/**
 * Baca informasi modul dari folder
 */
function getModuleInfo($path, $folderName) {
    $info = [
        'id' => md5($folderName),
        'slug' => $folderName,
        'title' => ucwords(str_replace('_', ' ', str_replace('.digital', '', $folderName))),
        'description' => 'Modul digital untuk sistem ArsipVersi',
        'version' => '1.0.0',
        'status' => 'active',
        'category' => 'General',
        'icon' => '📦',
        'created_at' => date('Y-m-d H:i:s', filemtime($path)),
        'updated_at' => date('Y-m-d H:i:s', filemtime($path)),
        'features' => [],
        'config' => [],
        'path' => $path
    ];
    
    // Baca config.digital jika ada
    $configFile = $path . DS . 'config.digital';
    if (file_exists($configFile)) {
        $configContent = file_get_contents($configFile);
        $lines = explode("\n", $configContent);
        
        foreach ($lines as $line) {
            $line = trim($line);
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim(strtolower($key));
                $value = trim($value);
                
                switch ($key) {
                    case 'menu_utama':
                        $info['category'] = $value;
                        break;
                    case 'sub_menu':
                        $info['description'] = 'Modul ' . $value;
                        break;
                    case 'status':
                        $info['status'] = $value;
                        break;
                }
                
                $info['config'][$key] = $value;
            }
        }
    }
    
    // Baca README.digital jika ada
    $readmeFile = $path . DS . 'README.digital';
    if (file_exists($readmeFile)) {
        $readmeContent = file_get_contents($readmeFile);
        
        // Extract description from first paragraph
        if (preg_match('/## Deskripsi\s*\n(.*?)(\n##|\z)/s', $readmeContent, $matches)) {
            $info['description'] = trim($matches[1]);
        }
        
        // Extract features
        if (preg_match('/## Fitur\s*\n(.*?)(\n##|\z)/s', $readmeContent, $matches)) {
            $featuresText = trim($matches[1]);
            preg_match_all('/^\-\s+(.*)$/m', $featuresText, $featureMatches);
            if (!empty($featureMatches[1])) {
                $info['features'] = $featureMatches[1];
            }
        }
        
        // Extract version
        if (preg_match('/## Versi\s*\n([0-9.]+)/', $readmeContent, $matches)) {
            $info['version'] = $matches[1];
        }
    }
    
    // Determine icon based on category
    $info['icon'] = getCategoryIcon($info['category']);
    
    return $info;
}

/**
 * Dapatkan icon berdasarkan kategori
 */
function getCategoryIcon($category) {
    $icons = [
        'Analitik' => '📊',
        'Pengaturan' => '⚙️',
        'Bantuan' => '❓',
        'Konten' => '📝',
        'Media' => '🎬',
        'Layanan' => '🛠️',
        'Komunitas' => '👥',
        'Pasar' => '🏪',
        'Akun' => '👤',
        'Transportasi' => '🚗',
        'Logistik' => '📦',
        'General' => '📦'
    ];
    
    foreach ($icons as $key => $icon) {
        if (stripos($category, $key) !== false) {
            return $icon;
        }
    }
    
    return '📦';
}

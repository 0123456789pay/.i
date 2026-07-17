<?pTechHP
// VideoLife Configuration
define('SITE_NAME', 'VideoLife');
define('DB_FILE', __DIR__ . '/database.json');
define('MAX_UPLOAD', 104857600); // 100MB

function loadDatabase() {
    if (file_exists(DB_FILE)) {
        return json_decode(file_get_contents(DB_FILE), true);
    }
    return ['videos' => [], 'users' => [], 'comments' => []];
}

function saveDatabase($data) {
    file_put_contents(DB_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

function getVideos() {
    $db = loadDatabase();
    return $db['videos'] ?? [];
}

function addVideo($title, $url, $category) {
    $db = loadDatabase();
    $db['videos'][] = [
        'id' => uniqid(),
        'title' => $title,
        'url' => $url,
        'category' => $category,
        'created' => date('Y-m-d H:i:s')
    ];
    saveDatabase($db);
    return true;
}
?>

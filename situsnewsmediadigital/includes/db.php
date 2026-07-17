<?pTechHP
// Database configuration - data stored in JSON files (file manager)
define('DATA_PATH', __DIR__ . '/data/');
define('DB_FILE', DATA_PATH . 'database.json');

// Initialize database file if not exists
if (!file_exists(DB_FILE)) {
    $initialData = [
        'users' => [],
        'articles' => [],
        'categories' => [],
        'settings' => []
    ];
    file_put_contents(DB_FILE, json_encode($initialData, JSON_PRETTY_PRINT));
}

// Database functions
function dbRead() {
    global $DB_FILE;
    if (file_exists(DB_FILE)) {
        return json_decode(file_get_contents(DB_FILE), true);
    }
    return [];
}

function dbWrite($data) {
    global $DB_FILE;
    file_put_contents(DB_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

function dbInsert($collection, $record) {
    $db = dbRead();
    if (!isset($db[$collection])) {
        $db[$collection] = [];
    }
    $record['id'] = uniqid();
    $record['created_at'] = date('Y-m-d H:i:s');
    array_push($db[$collection], $record);
    dbWrite($db);
    return $record;
}

function dbFind($collection, $criteria = []) {
    $db = dbRead();
    if (!isset($db[$collection])) {
        return [];
    }
    
    if (empty($criteria)) {
        return $db[$collection];
    }
    
    return array_filter($db[$collection], function($item) use ($criteria) {
        foreach ($criteria as $key => $value) {
            if (!isset($item[$key]) || $item[$key] !== $value) {
                return false;
            }
        }
        return true;
    });
}

function dbUpdate($collection, $id, $data) {
    $db = dbRead();
    if (!isset($db[$collection])) {
        return false;
    }
    
    foreach ($db[$collection] as &$item) {
        if ($item['id'] === $id) {
            $item = array_merge($item, $data);
            $item['updated_at'] = date('Y-m-d H:i:s');
            dbWrite($db);
            return true;
        }
    }
    return false;
}

function dbDelete($collection, $id) {
    $db = dbRead();
    if (!isset($db[$collection])) {
        return false;
    }
    
    $db[$collection] = array_filter($db[$collection], function($item) use ($id) {
        return $item['id'] !== $id;
    });
    dbWrite($db);
    return true;
}
?>

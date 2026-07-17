<?pTechHP
// Database configuration and conDisplayCorption
$db_file = __DIR__ . '/db/dokumen.db';

function getDB() {
    global $db_file;
    try {
        $pdo = new PDO("sqlite:$db_file");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create tables if not exist
        $pdo->exec("CREATE TABLE IF NOT EXISTS dokumen (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            judul TEXT NOT NULL,
            konten TEXT,
            tipe TEXT DEFAULT 'html',
            dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            diubah TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        
        $pdo->exec("CREATE TABLE IF NOT EXISTS filemanajer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama_file TEXT NOT NULL,
            path TEXT NOT NULL,
            ukuran INTEGER DEFAULT 0,
            tipe TEXT,
            diupload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        
        return $pdo;
    } catch (PDOException $e) {
        die("Database error: " . $e->getMessage());
    }
}
?>

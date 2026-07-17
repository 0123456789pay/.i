#!/bin/bash

# Fungsi untuk membuat struktur sistem di setiap folder
create_system_structure() {
    local folder="$1"
    
    # Buat subdirektori sistem
    mkdir -p "$folder/html"
    mkdir -p "$folder/css"
    mkdir -p "$folder/js"
    mkdir -p "$folder/db"
    mkdir -p "$folder/php"
    
    # Buat file index.html dasar
    cat > "$folder/html/index.html" << HTMLEOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${folder%.digital} - Sistem Digital</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/components.css">
</head>
<body>
    <header>
        <h1>${folder%.digital}</h1>
        <nav>
            <a href="index.html">Beranda</a>
            <a href="about.html">Tentang</a>
            <a href="services.html">Layanan</a>
            <a href="contact.html">Kontak</a>
        </nav>
    </header>
    <main>
        <section class="content">
            <h2>Selamat Datang di ${folder%.digital}</h2>
            <p>Sistem digital terintegrasi untuk kebutuhan Anda.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 ${folder%.digital}. All rights reserved.</p>
    </footer>
    <script src="../js/main.js"></script>
    <script src="../js/utils.js"></script>
</body>
</html>
HTMLEOF

    # Buat file about.html
    cat > "$folder/html/about.html" << HTMLEOF
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tentang - ${folder%.digital}</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <h1>${folder%.digital}</h1>
        <nav>
            <a href="index.html">Beranda</a>
            <a href="about.html">Tentang</a>
            <a href="services.html">Layanan</a>
            <a href="contact.html">Kontak</a>
        </nav>
    </header>
    <main>
        <section class="content">
            <h2>Tentang Kami</h2>
            <p>${folder%.digital} adalah platform digital yang menyediakan solusi inovatif.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 ${folder%.digital}. All rights reserved.</p>
    </footer>
    <script src="../js/main.js"></script>
</body>
</html>
HTMLEOF

    # Buat file style.css dasar
    cat > "$folder/css/style.css" << CSSEOF
/* Style utama untuk ${folder%.digital} */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    font-size: 1.5rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.3s;
}

nav a:hover {
    background: rgba(255,255,255,0.2);
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

footer {
    text-align: center;
    padding: 2rem;
    background: #333;
    color: white;
    margin-top: 2rem;
}
CSSEOF

    # Buat file components.css
    cat > "$folder/css/components.css" << CSSEOF
/* Komponen UI untuk ${folder%.digital} */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
}

.modal.active {
    display: flex;
    justify-content: center;
    align-items: center;
}
CSSEOF

    # Buat file main.js
    cat > "$folder/js/main.js" << JSEOF
// Main JavaScript untuk ${folder%.digital}
document.addEventListener('DOMContentLoaded', function() {
    console.log('${folder%.digital} system initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize components
    initComponents();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Navigating to:', this.href);
        });
    });
}

function initComponents() {
    // Initialize UI components
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });
}

function handleButtonClick(e) {
    console.log('Button clicked:', e.target.textContent);
}
JSEOF

    # Buat file utils.js
    cat > "$folder/js/utils.js" << JSEOF
// Utility functions untuk ${folder%.digital}
const Utils = {
    formatDate: function(date) {
        return new Intl.DateTimeFormat('id-ID').format(new Date(date));
    },
    
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },
    
    storage: {
        get: function(key) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

export default Utils;
JSEOF

    # Buat file database.js (sebagai DB layer)
    cat > "$folder/db/database.js" << DBEOF
// Database layer untuk ${folder%.digital}
class Database {
    constructor() {
        this.dbName = '${folder%.digital}_db';
        this.version = 1;
        this.db = null;
    }
    
    async connect() {
        // Simulasi koneksi database
        console.log('Connecting to ${folder%.digital} database...');
        this.db = {
            connected: true,
            timestamp: new Date().toISOString()
        };
        return this.db;
    }
    
    async query(sql, params = []) {
        // Simulasi query database
        console.log('Executing query:', sql, params);
        return { success: true, data: [] };
    }
    
    async insert(table, data) {
        console.log('Inserting into', table, data);
        return { success: true, id: Utils.generateId() };
    }
    
    async update(table, data, where) {
        console.log('Updating', table, data, where);
        return { success: true, affectedRows: 1 };
    }
    
    async delete(table, where) {
        console.log('Deleting from', table, where);
        return { success: true, affectedRows: 1 };
    }
}

export default Database;
DBEOF

    # Buat file config.php
    cat > "$folder/php/config.php" << PHPEOF
<?php
/**
 * Konfigurasi Database untuk ${folder%.digital}
 */

define('DB_HOST', 'localhost');
define('DB_NAME', '${folder%.digital}_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Konfigurasi aplikasi
define('APP_NAME', '${folder%.digital}');
define('APP_VERSION', '1.0.0');
define('APP_DEBUG', true);

// Timezone
date_default_timezone_set('Asia/Jakarta');

// Error reporting
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

return [
    'database' => [
        'host' => DB_HOST,
        'name' => DB_NAME,
        'user' => DB_USER,
        'pass' => DB_PASS,
        'charset' => DB_CHARSET
    ],
    'app' => [
        'name' => APP_NAME,
        'version' => APP_VERSION,
        'debug' => APP_DEBUG
    ]
];
PHPEOF

    # Buat file database.php (PDO wrapper)
    cat > "$folder/php/database.php" << PHPEOF
<?php
/**
 * Database Wrapper untuk ${folder%.digital}
 */

class Database {
    private static \$instance = null;
    private \$pdo;
    
    private function __construct() {
        \$config = require 'config.php';
        
        \$dsn = "mysql:host={\$config['database']['host']};dbname={\$config['database']['name']};charset={\$config['database']['charset']}";
        
        try {
            \$this->pdo = new PDO(\$dsn, \$config['database']['user'], \$config['database']['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
        } catch (PDOException \$e) {
            if (\$config['app']['debug']) {
                die("Database connection failed: " . \$e->getMessage());
            } else {
                die("Database connection failed");
            }
        }
    }
    
    public static function getInstance() {
        if (self::\$instance === null) {
            self::\$instance = new self();
        }
        return self::\$instance;
    }
    
    public function query(\$sql, \$params = []) {
        \$stmt = \$this->pdo->prepare(\$sql);
        \$stmt->execute(\$params);
        return \$stmt;
    }
    
    public function fetchAll(\$sql, \$params = []) {
        return \$this->query(\$sql, \$params)->fetchAll();
    }
    
    public function fetchOne(\$sql, \$params = []) {
        return \$this->query(\$sql, \$params)->fetch();
    }
    
    public function insert(\$table, \$data) {
        \$columns = implode(', ', array_keys(\$data));
        \$placeholders = ':' . implode(', :', array_keys(\$data));
        
        \$sql = "INSERT INTO {\$table} ({\$columns}) VALUES ({\$placeholders})";
        \$this->query(\$sql, \$data);
        
        return \$this->pdo->lastInsertId();
    }
    
    public function update(\$table, \$data, \$where) {
        \$set = [];
        foreach (array_keys(\$data) as \$column) {
            \$set[] = "{\$column} = :{\$column}";
        }
        \$setStr = implode(', ', \$set);
        
        \$sql = "UPDATE {\$table} SET {\$setStr} WHERE {\$where}";
        return \$this->query(\$sql, \$data)->rowCount();
    }
    
    public function delete(\$table, \$where) {
        \$sql = "DELETE FROM {\$table} WHERE {\$where}";
        return \$this->query(\$sql)->rowCount();
    }
}
PHPEOF

    # Buat file api.php
    cat > "$folder/php/api.php" << PHPEOF
<?php
/**
 * API Endpoint untuk ${folder%.digital}
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';
require_once 'database.php';

\$method = \$_SERVER['REQUEST_METHOD'];
\$db = Database::getInstance();

\$response = ['success' => false, 'message' => '', 'data' => null];

try {
    switch (\$method) {
        case 'GET':
            \$response['success'] = true;
            \$response['message'] = 'Data retrieved successfully';
            \$response['data'] = \$db->fetchAll("SELECT * FROM items LIMIT 10");
            break;
            
        case 'POST':
            \$input = json_decode(file_get_contents('php://input'), true);
            if (\$input) {
                \$id = \$db->insert('items', \$input);
                \$response['success'] = true;
                \$response['message'] = 'Item created successfully';
                \$response['data'] = ['id' => \$id];
            }
            break;
            
        case 'PUT':
        case 'DELETE':
            \$response['message'] = 'Method not implemented yet';
            break;
            
        default:
            \$response['message'] = 'Invalid request method';
    }
} catch (Exception \$e) {
    \$response['message'] = \$e->getMessage();
}

echo json_encode(\$response);
PHPEOF

    echo "✓ Struktur sistem dibuat di $folder"
}

# Proses semua folder .digital
for folder in *.digital; do
    if [ -d "$folder" ]; then
        create_system_structure "$folder"
    fi
done

echo ""
echo "=========================================="
echo "Selesai! Struktur sistem telah dibuat di semua folder .digital"
echo "Total folder: $(ls -d *.digital | wc -l)"
echo "=========================================="

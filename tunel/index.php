<?php
/**
 * TUNEL() - Root System Gateway
 * Gerbang utama untuk seluruh sistem digital terintegrasi
 */

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers
header('X-Powered-By: TUNEL Digital System');
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');

// Define system constants
define('SYSTEM_ROOT', __DIR__);
define('SYSTEM_VERSION', '1.0.0');
define('SYSTEM_NAME', 'TUNEL Digital Gateway');

// Autoloader
spl_autoload_register(function ($class) {
    $file = SYSTEM_ROOT . '/classes/' . str_replace('\\', '/', $class) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

// System Router Class
class SystemRouter {
    private $routes = [];
    
    public function addRoute($pattern, $handler) {
        $this->routes[$pattern] = $handler;
    }
    
    public function route($uri) {
        foreach ($this->routes as $pattern => $handler) {
            if (preg_match($pattern, $uri, $matches)) {
                return call_user_func_array($handler, array_slice($matches, 1));
            }
        }
        return $this->notFound();
    }
    
    private function notFound() {
        http_response_code(404);
        return json_encode(['error' => 'Route not found', 'status' => 404]);
    }
}

// Initialize router
$router = new SystemRouter();

// Define routes
$router->addRoute('#^/$#', function() {
    return include SYSTEM_ROOT . '/pusat.digital/html/index.html';
});

$router->addRoute('#^/api/status$#', function() {
    header('Content-Type: application/json');
    return json_encode([
        'system' => SYSTEM_NAME,
        'version' => SYSTEM_VERSION,
        'status' => 'online',
        'timestamp' => date('c'),
        'modules' => [
            'datacenter' => 'active',
            'hosting' => 'active',
            'domain' => 'active',
            'ai' => 'active',
            'monitoring' => 'active'
        ]
    ]);
});

$router->addRoute('#^/api/system/info$#', function() {
    header('Content-Type: application/json');
    return json_encode([
        'root_structure' => ['/', '`', '.', '\\', '|'],
        'total_features' => 250,
        'indexed_domains' => 250,
        'search_engine_ready' => true,
        'responsive' => 'all devices'
    ]);
});

// Get request URI
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle routing
$response = $router->route($requestUri);

// Output response
if (!headers_sent()) {
    echo $response;
}
?>

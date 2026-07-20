<?php
/**
 * KOMUNIKASI.DIGITAL - Authentication Handler
 * Menangani proses login, register, dan logout
 */

require_once '../system/config.php';

header('Content-Type: application/json');

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'register':
        handleRegister();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        checkAuthStatus();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

/**
 * Handle login request
 */
function handleLogin() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $email = sanitizeInput($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);
    
    // Validate input
    if (empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Email dan kata sandi wajib diisi'], 400);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Format email tidak valid'], 400);
    }
    
    // TODO: Connect to database and verify credentials
    // For demo purposes, we'll simulate a successful login
    
    // Simulate user data
    $user = [
        'id' => 1,
        'name' => 'User Demo',
        'email' => $email,
        'role' => 'user'
    ];
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_data'] = $user;
    $_SESSION['login_time'] = time();
    
    if ($remember) {
        // Set remember me cookie (30 days)
        setcookie('remember_token', bin2hex(random_bytes(32)), time() + (30 * 24 * 60 * 60), '/');
    }
    
    jsonResponse([
        'success' => true,
        'message' => 'Login berhasil',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);
}

/**
 * Handle register request
 */
function handleRegister() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $agreeTerms = isset($_POST['agree_terms']);
    
    // Validate input
    if (empty($name) || empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Semua field wajib diisi'], 400);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Format email tidak valid'], 400);
    }
    
    if (strlen($password) < 8) {
        jsonResponse(['success' => false, 'message' => 'Kata sandi minimal 8 karakter'], 400);
    }
    
    if ($password !== $confirmPassword) {
        jsonResponse(['success' => false, 'message' => 'Konfirmasi kata sandi tidak cocok'], 400);
    }
    
    if (!$agreeTerms) {
        jsonResponse(['success' => false, 'message' => 'Anda harus menyetujui syarat & ketentuan'], 400);
    }
    
    // TODO: Check if email already exists in database
    // TODO: Hash password and save to database
    
    // Simulate successful registration
    $user = [
        'id' => 1,
        'name' => $name,
        'email' => $email,
        'role' => 'user'
    ];
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_data'] = $user;
    
    jsonResponse([
        'success' => true,
        'message' => 'Pendaftaran berhasil',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);
}

/**
 * Handle logout request
 */
function handleLogout() {
    // Clear session
    session_destroy();
    
    // Clear remember me cookie
    if (isset($_COOKIE['remember_token'])) {
        setcookie('remember_token', '', time() - 3600, '/');
    }
    
    jsonResponse([
        'success' => true,
        'message' => 'Logout berhasil'
    ]);
}

/**
 * Check authentication status
 */
function checkAuthStatus() {
    if (isLoggedIn()) {
        $user = getCurrentUser();
        jsonResponse([
            'success' => true,
            'authenticated' => true,
            'user' => $user
        ]);
    } else {
        jsonResponse([
            'success' => true,
            'authenticated' => false
        ]);
    }
}

?>

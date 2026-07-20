<?php
/**
 * API Endpoint untuk Autentikasi
 * Menangani login, register, logout
 */

require_once '../../config/config.php';
require_once '../../includes/Database.php';
require_once '../../includes/Auth.php';
require_once '../../includes/helpers.php';

header('Content-Type: application/json; charset=utf-8');

$action = get('action', '');

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
    case 'forgot-password':
        handleForgotPassword();
        break;
    case 'reset-password':
        handleResetPassword();
        break;
    case 'check':
        checkAuth();
        break;
    default:
        jsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

/**
 * Handle login request
 */
function handleLogin() {
    if (requestMethod() !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $username = sanitize(post('username'));
    $password = post('password');
    $remember = post('remember', false);
    
    if (empty($username) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Username dan password wajib diisi'], 400);
    }
    
    // Verify CSRF token
    $csrfToken = post('csrf_token');
    if (!verifyCsrfToken($csrfToken)) {
        jsonResponse(['success' => false, 'message' => 'Token keamanan tidak valid'], 403);
    }
    
    $auth = new Auth();
    $result = $auth->login($username, $password);
    
    if ($result['success']) {
        // Set remember me cookie if requested
        if ($remember) {
            $token = bin2hex(random_bytes(32));
            setcookie('remember_token', $token, time() + (86400 * 30), '/', '', SECURE_COOKIES, true);
            
            // Save token to database (implement this in your user table)
            $db = Database::getInstance();
            try {
                $db->insert('remember_tokens', [
                    'user_id' => $result['user']['id'],
                    'token' => hash('sha256', $token),
                    'expires_at' => date('Y-m-d H:i:s', time() + (86400 * 30)),
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            } catch (Exception $e) {
                // Ignore if table doesn't exist
            }
        }
        
        logMessage('User login: ' . $username, 'INFO');
        
        jsonResponse([
            'success' => true,
            'message' => 'Login berhasil',
            'redirect' => '/',
            'user' => [
                'id' => $result['user']['id'],
                'username' => $result['user']['username'],
                'email' => $result['user']['email'],
                'full_name' => $result['user']['full_name']
            ]
        ]);
    } else {
        logMessage('Login failed: ' . $username . ' - ' . $result['message'], 'WARNING');
        jsonResponse(['success' => false, 'message' => $result['message']], 401);
    }
}

/**
 * Handle register request
 */
function handleRegister() {
    if (requestMethod() !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $data = [
        'username' => sanitize(post('username')),
        'email' => sanitize(post('email')),
        'full_name' => sanitize(post('full_name')),
        'password' => post('password'),
        'confirm_password' => post('confirm_password')
    ];
    
    // Validate input
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        jsonResponse(['success' => false, 'message' => 'Semua field wajib diisi'], 400);
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Format email tidak valid'], 400);
    }
    
    // Validate password length
    if (strlen($data['password']) < 6) {
        jsonResponse(['success' => false, 'message' => 'Password minimal 6 karakter'], 400);
    }
    
    // Validate password match
    if ($data['password'] !== $data['confirm_password']) {
        jsonResponse(['success' => false, 'message' => 'Password dan konfirmasi password tidak cocok'], 400);
    }
    
    // Verify CSRF token
    $csrfToken = post('csrf_token');
    if (!verifyCsrfToken($csrfToken)) {
        jsonResponse(['success' => false, 'message' => 'Token keamanan tidak valid'], 403);
    }
    
    $auth = new Auth();
    $result = $auth->register($data);
    
    if ($result['success']) {
        logMessage('User registered: ' . $data['username'], 'INFO');
        
        jsonResponse([
            'success' => true,
            'message' => 'Registrasi berhasil',
            'redirect' => '/?page=login'
        ]);
    } else {
        logMessage('Registration failed: ' . $data['username'] . ' - ' . $result['message'], 'WARNING');
        jsonResponse(['success' => false, 'message' => $result['message']], 400);
    }
}

/**
 * Handle logout request
 */
function handleLogout() {
    $auth = new Auth();
    $result = $auth->logout();
    
    // Clear remember me cookie
    if (isset($_COOKIE['remember_token'])) {
        setcookie('remember_token', '', time() - 3600, '/', '', SECURE_COOKIES, true);
        
        // Delete token from database
        $db = Database::getInstance();
        try {
            $db->delete('remember_tokens', 'token = :token', ['token' => hash('sha256', $_COOKIE['remember_token'])]);
        } catch (Exception $e) {
            // Ignore if table doesn't exist
        }
    }
    
    logMessage('User logout', 'INFO');
    
    jsonResponse([
        'success' => true,
        'message' => 'Logout berhasil',
        'redirect' => '/'
    ]);
}

/**
 * Handle forgot password request
 */
function handleForgotPassword() {
    if (requestMethod() !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $email = sanitize(post('email'));
    
    if (empty($email)) {
        jsonResponse(['success' => false, 'message' => 'Email wajib diisi'], 400);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Format email tidak valid'], 400);
    }
    
    $auth = new Auth();
    $result = $auth->forgotPassword($email);
    
    // Always return success to prevent email enumeration
    jsonResponse([
        'success' => true,
        'message' => 'Jika email terdaftar, Anda akan menerima instruksi reset password'
    ]);
}

/**
 * Handle reset password request
 */
function handleResetPassword() {
    if (requestMethod() !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $token = post('token');
    $password = post('password');
    $confirmPassword = post('confirm_password');
    
    if (empty($token) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Token dan password wajib diisi'], 400);
    }
    
    if (strlen($password) < 6) {
        jsonResponse(['success' => false, 'message' => 'Password minimal 6 karakter'], 400);
    }
    
    if ($password !== $confirmPassword) {
        jsonResponse(['success' => false, 'message' => 'Password dan konfirmasi password tidak cocok'], 400);
    }
    
    $auth = new Auth();
    $result = $auth->resetPassword($token, $password);
    
    if ($result['success']) {
        logMessage('Password reset successful', 'INFO');
        
        jsonResponse([
            'success' => true,
            'message' => 'Password berhasil direset',
            'redirect' => '/?page=login'
        ]);
    } else {
        logMessage('Password reset failed: ' . $result['message'], 'WARNING');
        jsonResponse(['success' => false, 'message' => $result['message']], 400);
    }
}

/**
 * Check authentication status
 */
function checkAuth() {
    $auth = new Auth();
    
    if ($auth->isLoggedIn()) {
        $user = $auth->getUser();
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

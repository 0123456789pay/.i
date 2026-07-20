<?php
/**
 * Authentication API for manajemenfile.digital
 * Handles login, logout, and session management
 */

session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        checkAuth();
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

function handleLogin() {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username dan password wajib diisi']);
        return;
    }

    try {
        $database = new Database();
        $conn = $database->getConnection();

        $query = "SELECT id, username, password, email, full_name, role, is_active 
                  FROM users WHERE username = :username";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            echo json_encode(['success' => false, 'message' => 'Username tidak ditemukan']);
            return;
        }

        $user = $stmt->fetch();

        if (!$user['is_active']) {
            echo json_encode(['success' => false, 'message' => 'Akun Anda telah dinonaktifkan']);
            return;
        }

        if (password_verify($password, $user['password'])) {
            // Update last login
            $updateQuery = "UPDATE users SET last_login = NOW() WHERE id = :id";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bindParam(':id', $user['id']);
            $updateStmt->execute();

            // Set session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['logged_in'] = true;

            // Log activity
            logActivity($user['id'], 'login', 'User logged in successfully');

            echo json_encode([
                'success' => true,
                'message' => 'Login berhasil',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'full_name' => $user['full_name'],
                    'role' => $user['role']
                ],
                'redirect' => '/newsnia.digital/'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Password salah']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

function handleLogout() {
    if (isset($_SESSION['user_id'])) {
        logActivity($_SESSION['user_id'], 'logout', 'User logged out');
    }

    session_destroy();
    echo json_encode([
        'success' => true,
        'message' => 'Logout berhasil',
        'redirect' => '/newsnia.digital/login.php'
    ]);
}

function checkAuth() {
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'username' => $_SESSION['username'],
                'full_name' => $_SESSION['full_name'],
                'role' => $_SESSION['role']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'authenticated' => false
        ]);
    }
}

function logActivity($userId, $action, $description) {
    try {
        $database = new Database();
        $conn = $database->getConnection();

        $query = "INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent) 
                  VALUES (:user_id, :action, :description, :ip, :agent)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':action', $action);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':ip', $_SERVER['REMOTE_ADDR'] ?? '');
        $stmt->bindParam(':agent', $_SERVER['HTTP_USER_AGENT'] ?? '');
        $stmt->execute();
    } catch(PDOException $e) {
        // Silent fail for logging
    }
}
?>

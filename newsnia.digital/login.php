<?php
/**
 * newsnia.digital - Halaman Login
 * TERHUBUNG KE manajemenfile.digital database
 * Form login dengan validasi dan keamanan
 */

session_start();

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

// Connect to centralized manajemenfile.digital database
require_once __DIR__ . '/../../manajemenfile.digital/config/database.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        $error = 'Username dan password harus diisi';
    } else {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            
            $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                if ($user['is_active'] == 1) {
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $_SESSION['role'] = $user['role'];
                    $_SESSION['full_name'] = $user['full_name'];
                    $_SESSION['logged_in'] = true;
                    
                    // Update last login
                    $updateStmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
                    $updateStmt->bindParam(':id', $user['id']);
                    $updateStmt->execute();
                    
                    header('Location: index.php');
                    exit;
                } else {
                    $error = 'Akun Anda tidak aktif. Hubungi administrator.';
                }
            } else {
                $error = 'Username atau password salah';
            }
        } catch (PDOException $e) {
            $error = 'Terjadi kesalahan pada sistem';
        }
    }
}

$pageTitle = 'Login';
require_once 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-form">
        <h2>Login ke newsnia.digital</h2>
        
        <?php if ($error): ?>
        <div style="background: #ffe6e6; color: #cc0000; padding: 12px; 
                    border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #cc0000;">
            <?php echo htmlspecialchars($error); ?>
        </div>
        <?php endif; ?>
        
        <?php if ($success): ?>
        <div style="background: #e6ffe6; color: #008000; padding: 12px; 
                    border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #008000;">
            <?php echo htmlspecialchars($success); ?>
        </div>
        <?php endif; ?>
        
        <form method="POST" action="" id="loginForm">
            <div class="form-group">
                <label for="username">Username atau Email</label>
                <input type="text" 
                       id="username" 
                       name="username" 
                       class="form-control" 
                       placeholder="Masukkan username atau email"
                       value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>"
                       required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" 
                       id="password" 
                       name="password" 
                       class="form-control" 
                       placeholder="Masukkan password"
                       required>
            </div>
            
            <div class="form-group" style="display: flex; justify-content: space-between; align-items: center;">
                <label style="display: flex; align-items: center; gap: 5px; font-weight: normal;">
                    <input type="checkbox" name="remember" style="width: auto;"> Ingat saya
                </label>
                <a href="forgot-password.php" style="color: var(--primary-blue); font-size: 13px; text-decoration: none;">
                    Lupa password?
                </a>
            </div>
            
            <button type="submit" class="form-submit">Login</button>
        </form>
        
        <div class="auth-links">
            <p>Belum punya akun? <a href="register.php">Daftar sekarang</a></p>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>

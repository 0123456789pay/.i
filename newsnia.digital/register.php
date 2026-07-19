<?php
/**
 * newsnia.digital - Halaman Register
 * Form pendaftaran user baru dengan validasi
 */

session_start();

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

require_once 'config/database.php';

$error = '';
$success = '';
$formData = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData = [
        'username' => trim($_POST['username'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'full_name' => trim($_POST['full_name'] ?? ''),
        'password' => $_POST['password'] ?? '',
        'confirm_password' => $_POST['confirm_password'] ?? ''
    ];
    
    // Validation
    if (empty($formData['username']) || empty($formData['email']) || 
        empty($formData['password']) || empty($formData['full_name'])) {
        $error = 'Semua field wajib diisi';
    } elseif (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        $error = 'Format email tidak valid';
    } elseif (strlen($formData['username']) < 4) {
        $error = 'Username minimal 4 karakter';
    } elseif (strlen($formData['password']) < 6) {
        $error = 'Password minimal 6 karakter';
    } elseif ($formData['password'] !== $formData['confirm_password']) {
        $error = 'Password dan konfirmasi password tidak sama';
    } else {
        try {
            // Check if username or email exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
            $stmt->bindParam(':username', $formData['username']);
            $stmt->bindParam(':email', $formData['email']);
            $stmt->execute();
            
            if ($stmt->fetch()) {
                $error = 'Username atau email sudah terdaftar';
            } else {
                // Insert new user
                $hashedPassword = password_hash($formData['password'], PASSWORD_DEFAULT);
                
                $stmt = $pdo->prepare("
                    INSERT INTO users (username, email, full_name, password, role, status) 
                    VALUES (:username, :email, :full_name, :password, 'user', 'active')
                ");
                
                $stmt->bindParam(':username', $formData['username']);
                $stmt->bindParam(':email', $formData['email']);
                $stmt->bindParam(':full_name', $formData['full_name']);
                $stmt->bindParam(':password', $hashedPassword);
                
                if ($stmt->execute()) {
                    $success = 'Pendaftaran berhasil! Silakan login dengan akun Anda.';
                    $formData = []; // Clear form
                } else {
                    $error = 'Terjadi kesalahan saat mendaftar';
                }
            }
        } catch (PDOException $e) {
            $error = 'Terjadi kesalahan pada sistem';
        }
    }
}

$pageTitle = 'Register';
require_once 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-form">
        <h2>Daftar di newsnia.digital</h2>
        
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
        
        <form method="POST" action="" id="registerForm">
            <div class="form-group">
                <label for="full_name">Nama Lengkap</label>
                <input type="text" 
                       id="full_name" 
                       name="full_name" 
                       class="form-control" 
                       placeholder="Masukkan nama lengkap"
                       value="<?php echo htmlspecialchars($formData['full_name'] ?? ''); ?>"
                       required>
            </div>
            
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" 
                       id="username" 
                       name="username" 
                       class="form-control" 
                       placeholder="Pilih username (minimal 4 karakter)"
                       value="<?php echo htmlspecialchars($formData['username'] ?? ''); ?>"
                       required>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" 
                       id="email" 
                       name="email" 
                       class="form-control" 
                       placeholder="Masukkan email aktif"
                       value="<?php echo htmlspecialchars($formData['email'] ?? ''); ?>"
                       required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" 
                       id="password" 
                       name="password" 
                       class="form-control" 
                       placeholder="Minimal 6 karakter"
                       required>
            </div>
            
            <div class="form-group">
                <label for="confirm_password">Konfirmasi Password</label>
                <input type="password" 
                       id="confirm_password" 
                       name="confirm_password" 
                       class="form-control" 
                       placeholder="Ulangi password"
                       required>
            </div>
            
            <div class="form-group">
                <label style="display: flex; align-items: flex-start; gap: 8px; font-weight: normal; font-size: 13px;">
                    <input type="checkbox" name="agree" style="width: auto; margin-top: 3px;" required>
                    <span>Saya menyetujui <a href="terms-of-service.php" style="color: var(--primary-blue);">Syarat & Ketentuan</a> 
                    serta <a href="privacy-policy.php" style="color: var(--primary-blue);">Kebijakan Privasi</a> newsnia.digital</span>
                </label>
            </div>
            
            <button type="submit" class="form-submit">Daftar Sekarang</button>
        </form>
        
        <div class="auth-links">
            <p>Sudah punya akun? <a href="login.php">Login disini</a></p>
        </div>
        
        <div style="margin-top: 25px; padding: 15px; background: var(--light-blue); border-radius: 5px;">
            <h4 style="color: var(--primary-blue); font-size: 14px; margin-bottom: 10px;">Keuntungan Bergabung:</h4>
            <ul style="font-size: 13px; color: var(--text-color); padding-left: 20px; line-height: 1.8;">
                <li>Akses ke konten eksklusif</li>
                <li>Komentar dan interaksi dengan berita</li>
                <li>Newsletter harian/mingguan</li>
                <li>Simpan artikel favorit</li>
                <li>Notifikasi berita terkini</li>
            </ul>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>

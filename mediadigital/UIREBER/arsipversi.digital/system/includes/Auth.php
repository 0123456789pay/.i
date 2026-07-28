<?php
/**
 * Authentication Class
 * Kelas untuk menangani autentikasi pengguna
 */

class Auth {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Login pengguna
     */
    public function login($username, $password) {
        $sql = "SELECT * FROM users WHERE username = :username OR email = :username LIMIT 1";
        $user = $this->db->fetchOne($sql, ['username' => $username]);
        
        if (!$user) {
            return ['success' => false, 'message' => 'Username atau email tidak ditemukan'];
        }
        
        if (!password_verify($password, $user['password'])) {
            return ['success' => false, 'message' => 'Password salah'];
        }
        
        if ($user['status'] !== 'active') {
            return ['success' => false, 'message' => 'Akun tidak aktif'];
        }
        
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['logged_in'] = true;
        $_SESSION['login_time'] = time();
        
        $this->logActivity('login', $user['id']);
        
        return ['success' => true, 'message' => 'Login berhasil', 'user' => $user];
    }
    
    /**
     * Registrasi pengguna baru
     */
    public function register($data) {
        // Validasi input
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            return ['success' => false, 'message' => 'Semua field wajib diisi'];
        }
        
        // Cek username sudah ada
        $check = $this->db->fetchOne("SELECT id FROM users WHERE username = :username", ['username' => $data['username']]);
        if ($check) {
            return ['success' => false, 'message' => 'Username sudah digunakan'];
        }
        
        // Cek email sudah ada
        $check = $this->db->fetchOne("SELECT id FROM users WHERE email = :email", ['email' => $data['email']]);
        if ($check) {
            return ['success' => false, 'message' => 'Email sudah digunakan'];
        }
        
        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => HASH_COST]);
        
        // Insert user baru
        $userData = [
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $hashedPassword,
            'full_name' => $data['full_name'] ?? $data['username'],
            'role' => 'user',
            'status' => 'active',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        $userId = $this->db->insert('users', $userData);
        
        if ($userId) {
            $this->logActivity('register', $userId);
            return ['success' => true, 'message' => 'Registrasi berhasil', 'user_id' => $userId];
        }
        
        return ['success' => false, 'message' => 'Registrasi gagal'];
    }
    
    /**
     * Logout pengguna
     */
    public function logout() {
        if ($this->isLoggedIn()) {
            $this->logActivity('logout', $_SESSION['user_id']);
        }
        
        session_destroy();
        session_start();
        
        return ['success' => true, 'message' => 'Logout berhasil'];
    }
    
    /**
     * Cek apakah pengguna sudah login
     */
    public function isLoggedIn() {
        return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
    }
    
    /**
     * Dapatkan data pengguna yang sedang login
     */
    public function getUser() {
        if (!$this->isLoggedIn()) {
            return null;
        }
        
        return [
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email'],
            'full_name' => $_SESSION['full_name'],
            'role' => $_SESSION['role']
        ];
    }
    
    /**
     * Cek role pengguna
     */
    public function hasRole($roles) {
        if (!$this->isLoggedIn()) {
            return false;
        }
        
        $roles = is_array($roles) ? $roles : [$roles];
        return in_array($_SESSION['role'], $roles);
    }
    
    /**
     * Update profil pengguna
     */
    public function updateProfile($userId, $data) {
        $allowedFields = ['full_name', 'email', 'phone', 'address', 'bio'];
        $updateData = [];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updateData[$field] = $data[$field];
            }
        }
        
        if (empty($updateData)) {
            return ['success' => false, 'message' => 'Tidak ada data yang diupdate'];
        }
        
        $updateData['updated_at'] = date('Y-m-d H:i:s');
        
        $this->db->update('users', $updateData, 'id = :id', ['id' => $userId]);
        
        return ['success' => true, 'message' => 'Profil berhasil diupdate'];
    }
    
    /**
     * Ganti password
     */
    public function changePassword($userId, $oldPassword, $newPassword) {
        $user = $this->db->fetchOne("SELECT * FROM users WHERE id = :id", ['id' => $userId]);
        
        if (!$user || !password_verify($oldPassword, $user['password'])) {
            return ['success' => false, 'message' => 'Password lama salah'];
        }
        
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => HASH_COST]);
        $this->db->update('users', ['password' => $hashedPassword], 'id = :id', ['id' => $userId]);
        
        return ['success' => true, 'message' => 'Password berhasil diganti'];
    }
    
    /**
     * Log aktivitas pengguna
     */
    private function logActivity($action, $userId) {
        $data = [
            'action' => $action,
            'user_id' => $userId,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        try {
            $this->db->insert('activity_logs', $data);
        } catch (Exception $e) {
            // Log error silently
        }
    }
    
    /**
     * Reset password
     */
    public function forgotPassword($email) {
        $user = $this->db->fetchOne("SELECT * FROM users WHERE email = :email", ['email' => $email]);
        
        if (!$user) {
            return ['success' => false, 'message' => 'Email tidak ditemukan'];
        }
        
        // Generate reset token
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        $resetData = [
            'user_id' => $user['id'],
            'token' => $token,
            'expires_at' => $expires,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        $this->db->insert('password_resets', $resetData);
        
        // TODO: Send email with reset link
        // For now, return the token for testing purposes
        return ['success' => true, 'message' => 'Token reset password telah dibuat', 'token' => $token];
    }
    
    /**
     * Reset password dengan token
     */
    public function resetPassword($token, $newPassword) {
        $reset = $this->db->fetchOne(
            "SELECT * FROM password_resets WHERE token = :token AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
            ['token' => $token]
        );
        
        if (!$reset) {
            return ['success' => false, 'message' => 'Token tidak valid atau sudah kadaluarsa'];
        }
        
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => HASH_COST]);
        $this->db->update('users', ['password' => $hashedPassword], 'id = :id', ['id' => $reset['user_id']]);
        
        // Delete used tokens
        $this->db->delete('password_resets', 'user_id = :user_id', ['user_id' => $reset['user_id']]);
        
        return ['success' => true, 'message' => 'Password berhasil direset'];
    }
}

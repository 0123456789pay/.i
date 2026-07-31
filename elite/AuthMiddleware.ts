/**
 * AuthMiddleware untuk sistem integrasi Elite AI
 * Mengelola autentikasi, sesi, dan otorisasi pengguna
 */

import { EliteValidator } from './Validator';
import { UserSession, AuthResponse, LoginRequest } from './types';

// Storage untuk sesi aktif (dalam production gunakan database/redis)
const activeSessions: Map<string, UserSession> = new Map();
const userCredentials: Map<string, string> = new Map(); // username -> password hash

export class AuthMiddleware {
  /**
   * Proses login pengguna
   */
  static async login(request: LoginRequest): Promise<AuthResponse> {
    const { username, password } = request;

    // Validasi kredensial
    const validation = EliteValidator.validateCredentials(username, password);
    
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(', '),
        session: null
      };
    }

    // Normalisasi username
    const normalizedUsername = EliteValidator.normalizeUsername(username);

    // Cek apakah user sudah terdaftar atau buat sesi baru
    let existingPassword = userCredentials.get(normalizedUsername);
    
    // Untuk demo, jika belum ada, register otomatis (dalam production gunakan DB)
    if (!existingPassword) {
      // Simpan password (dalam production gunakan hash yang aman)
      userCredentials.set(normalizedUsername, password);
      existingPassword = password;
    }

    // Verifikasi password
    if (existingPassword !== password) {
      return {
        success: false,
        error: 'Password salah',
        session: null
      };
    }

    // Generate session ID
    const sessionId = EliteValidator.generateSessionId(normalizedUsername);
    const localPart = EliteValidator.extractLocalPart(normalizedUsername);

    // Buat sesi pengguna
    const session: UserSession = {
      sessionId,
      username: normalizedUsername,
      localPart: localPart,
      domain: 'studio.alra',
      loginTime: Date.now(),
      lastActivity: Date.now(),
      isActive: true,
      permissions: ['read', 'write', 'review', 'create']
    };

    // Simpan sesi aktif
    activeSessions.set(sessionId, session);

    return {
      success: true,
      error: null,
      session
    };
  }

  /**
   * Verifikasi sesi pengguna
   */
  static verifySession(sessionId: string): UserSession | null {
    const session = activeSessions.get(sessionId);
    
    if (!session) {
      return null;
    }

    // Cek apakah sesi masih aktif (timeout 24 jam)
    const sessionAge = Date.now() - session.lastActivity;
    const maxAge = 24 * 60 * 60 * 1000; // 24 jam

    if (sessionAge > maxAge) {
      this.logout(sessionId);
      return null;
    }

    // Update last activity
    session.lastActivity = Date.now();
    activeSessions.set(sessionId, session);

    return session;
  }

  /**
   * Logout pengguna
   */
  static logout(sessionId: string): boolean {
    const session = activeSessions.get(sessionId);
    
    if (session) {
      session.isActive = false;
      activeSessions.delete(sessionId);
      return true;
    }

    return false;
  }

  /**
   * Dapatkan semua sesi aktif
   */
  static getActiveSessions(): UserSession[] {
    return Array.from(activeSessions.values()).filter(s => s.isActive);
  }

  /**
   * Dapatkan sesi berdasarkan username
   */
  static getSessionByUsername(username: string): UserSession | null {
    const normalizedUsername = EliteValidator.normalizeUsername(username);
    
    for (const session of activeSessions.values()) {
      if (session.username === normalizedUsername && session.isActive) {
        return session;
      }
    }

    return null;
  }

  /**
   * Refresh sesi
   */
  static refreshSession(sessionId: string): boolean {
    const session = activeSessions.get(sessionId);
    
    if (session) {
      session.lastActivity = Date.now();
      activeSessions.set(sessionId, session);
      return true;
    }

    return false;
  }

  /**
   * Cek apakah user memiliki permission tertentu
   */
  static hasPermission(sessionId: string, permission: string): boolean {
    const session = this.verifySession(sessionId);
    
    if (!session) {
      return false;
    }

    return session.permissions.includes(permission);
  }

  /**
   * Middleware untuk proteksi route
   */
  static protectRoute(sessionId: string, requiredPermissions?: string[]): { valid: boolean; error?: string } {
    const session = this.verifySession(sessionId);
    
    if (!session) {
      return { valid: false, error: 'Sesi tidak valid atau sudah kadaluarsa' };
    }

    if (!session.isActive) {
      return { valid: false, error: 'Sesi tidak aktif' };
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(p => 
        session.permissions.includes(p)
      );

      if (!hasAllPermissions) {
        return { 
          valid: false, 
          error: `Tidak memiliki permission: ${requiredPermissions.filter(p => !session.permissions.includes(p)).join(', ')}` 
        };
      }
    }

    return { valid: true };
  }

  /**
   * Statistik sistem autentikasi
   */
  static getStats() {
    const activeSessionsCount = Array.from(activeSessions.values()).filter(s => s.isActive).length;
    const totalUsers = userCredentials.size;

    return {
      activeSessions: activeSessionsCount,
      totalRegisteredUsers: totalUsers,
      timestamp: Date.now()
    };
  }

  /**
   * Cleanup sesi kadaluarsa
   */
  static cleanupExpiredSessions(): number {
    let cleaned = 0;
    const maxAge = 24 * 60 * 60 * 1000; // 24 jam

    for (const [sessionId, session] of activeSessions.entries()) {
      const sessionAge = Date.now() - session.lastActivity;
      
      if (sessionAge > maxAge || !session.isActive) {
        activeSessions.delete(sessionId);
        cleaned++;
      }
    }

    return cleaned;
  }
}

export default AuthMiddleware;

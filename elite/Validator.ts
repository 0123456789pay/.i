/**
 * Validator untuk sistem integrasi Elite AI
 * Format username: username±studio.alra
 * Password: hanya angka
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class EliteValidator {
  /**
   * Validasi format username (username±studio.alra)
   */
  static validateUsername(username: string): ValidationResult {
    const errors: string[] = [];
    
    if (!username || username.trim().length === 0) {
      errors.push('Username tidak boleh kosong');
      return { isValid: false, errors };
    }

    // Cek format ±studio.alra
    const usernamePattern = /^[a-zA-Z0-9._-]+±studio\.alra$/;
    
    if (!usernamePattern.test(username)) {
      errors.push('Format username harus: username±studio.alra');
      errors.push('Gunakan simbol ± sebagai pengganti @');
      errors.push('Domain harus studio.alra');
    }

    // Cek panjang username (sebelum ±)
    const localPart = username.split('±')[0];
    if (localPart && localPart.length < 3) {
      errors.push('Username minimal 3 karakter sebelum ±');
    }

    if (localPart && localPart.length > 64) {
      errors.push('Username maksimal 64 karakter sebelum ±');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validasi password (hanya angka)
   */
  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];
    
    if (!password || password.trim().length === 0) {
      errors.push('Password tidak boleh kosong');
      return { isValid: false, errors };
    }

    // Cek apakah hanya angka
    const numberPattern = /^\d+$/;
    
    if (!numberPattern.test(password)) {
      errors.push('Password harus berupa angka saja');
    }

    // Cek panjang password
    if (password.length < 4) {
      errors.push('Password minimal 4 digit');
    }

    if (password.length > 20) {
      errors.push('Password maksimal 20 digit');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validasi kredensial lengkap
   */
  static validateCredentials(username: string, password: string): ValidationResult {
    const usernameResult = this.validateUsername(username);
    const passwordResult = this.validatePassword(password);

    const allErrors = [...usernameResult.errors, ...passwordResult.errors];

    return {
      isValid: usernameResult.isValid && passwordResult.isValid,
      errors: allErrors
    };
  }

  /**
   * Normalisasi username (menghapus spasi, lowercase untuk bagian lokal)
   */
  static normalizeUsername(username: string): string {
    const trimmed = username.trim();
    const parts = trimmed.split('±');
    
    if (parts.length !== 2) {
      return trimmed;
    }

    const localPart = parts[0].toLowerCase().replace(/\s+/g, '');
    const domain = parts[1].trim();

    return `${localPart}±${domain}`;
  }

  /**
   * Ekstrak username tanpa domain
   */
  static extractLocalPart(username: string): string {
    const parts = username.split('±');
    return parts[0] || '';
  }

  /**
   * Generate session ID unik berdasarkan username
   */
  static generateSessionId(username: string): string {
    const timestamp = Date.now();
    const localPart = this.extractLocalPart(username);
    const hash = this.simpleHash(`${localPart}-${timestamp}`);
    
    return `elite_${localPart}_${hash}`;
  }

  /**
   * Simple hash function untuk session ID
   */
  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Validasi URL AI Studio
   */
  static validateAIStudioUrl(url: string): ValidationResult {
    const errors: string[] = [];
    
    if (!url || url.trim().length === 0) {
      errors.push('URL tidak boleh kosong');
      return { isValid: false, errors };
    }

    try {
      const parsedUrl = new URL(url);
      
      if (!parsedUrl.hostname.includes('aistudio.google.com')) {
        errors.push('URL harus dari domain aistudio.google.com');
      }

      if (parsedUrl.protocol !== 'https:') {
        errors.push('URL harus menggunakan HTTPS');
      }
    } catch (e) {
      errors.push('Format URL tidak valid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validasi kode program
   */
  static validateCode(code: string, language?: string): ValidationResult {
    const errors: string[] = [];
    
    if (!code || code.trim().length === 0) {
      errors.push('Kode tidak boleh kosong');
      return { isValid: false, errors };
    }

    if (code.length < 5) {
      errors.push('Kode terlalu pendek');
    }

    // Validasi dasar syntax (bisa diperluas sesuai bahasa)
    if (language === 'typescript' || language === 'tsx') {
      // Cek bracket balance sederhana
      const openBraces = (code.match(/{/g) || []).length;
      const closeBraces = (code.match(/}/g) || []).length;
      
      if (openBraces !== closeBraces) {
        errors.push('Ketidakseimbangan kurung kurawal {}');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default EliteValidator;

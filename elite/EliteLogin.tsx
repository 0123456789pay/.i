/**
 * Komponen Login untuk sistem integrasi Elite AI
 * Format: username±studio.alra dengan password angka
 */

import React, { useState } from 'react';
import { EliteValidator } from './Validator';
import { AuthMiddleware } from './AuthMiddleware';
import { UserSession, LoginRequest } from './types';
import './styles.css';

interface EliteLoginProps {
  onLoginSuccess?: (session: UserSession) => void;
  onLoginError?: (error: string) => void;
}

export const EliteLogin: React.FC<EliteLoginProps> = ({ 
  onLoginSuccess, 
  onLoginError 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hanya izinkan angka
    const value = e.target.value.replace(/\D/g, '');
    setPassword(value);
    
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // Validasi input
      const validation = EliteValidator.validateCredentials(username, password);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsLoading(false);
        
        if (onLoginError) {
          onLoginError(validation.errors.join(', '));
        }
        return;
      }

      // Proses login
      const loginRequest: LoginRequest = {
        username,
        password
      };

      const response = await AuthMiddleware.login(loginRequest);

      if (response.success && response.session) {
        if (onLoginSuccess) {
          onLoginSuccess(response.session);
        }
      } else {
        const errorMsg = response.error || 'Login gagal';
        setErrors([errorMsg]);
        
        if (onLoginError) {
          onLoginError(errorMsg);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
      setErrors([errorMessage]);
      
      if (onLoginError) {
        onLoginError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getExampleUsernames = () => [
    'coder±studio.alra',
    'developer±studio.alra',
    'admin±studio.alra',
    'user123±studio.alra'
  ];

  return (
    <div className="elite-login-container">
      <div className="elite-login-card">
        <div className="elite-login-header">
          <div className="elite-logo">
            <span className="elite-logo-icon">⚡</span>
            <h1>Elite AI</h1>
          </div>
          <p className="elite-login-subtitle">
            Integrasi Coder Qwen AI untuk AI Studio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="elite-login-form">
          {/* Username Field */}
          <div className="elite-form-group">
            <label htmlFor="username" className="elite-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`elite-input ${errors.some(e => e.includes('Username')) ? 'elite-input-error' : ''}`}
              placeholder="contoh: coder±studio.alra"
              value={username}
              onChange={handleUsernameChange}
              disabled={isLoading}
              autoComplete="username"
            />
            <small className="elite-input-hint">
              Format: username±studio.alra (± menggantikan @)
            </small>
          </div>

          {/* Password Field */}
          <div className="elite-form-group">
            <label htmlFor="password" className="elite-label">
              Password
            </label>
            <div className="elite-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`elite-input elite-password-input ${errors.some(e => e.includes('Password')) ? 'elite-input-error' : ''}`}
                placeholder="Masukkan angka"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                autoComplete="current-password"
                pattern="\d*"
                inputMode="numeric"
              />
              <button
                type="button"
                className="elite-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <small className="elite-input-hint">
              Password harus berupa angka (minimal 4 digit)
            </small>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="elite-error-messages">
              {errors.map((error, index) => (
                <div key={index} className="elite-error-item">
                  <span className="elite-error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="elite-btn elite-btn-primary elite-btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="elite-spinner"></span>
                Memproses...
              </>
            ) : (
              <>
                <span>🔐</span>
                Login ke Elite AI
              </>
            )}
          </button>
        </form>

        {/* Example Usernames */}
        <div className="elite-examples">
          <p className="elite-examples-title">Contoh Username:</p>
          <div className="elite-examples-list">
            {getExampleUsernames().map((example, index) => (
              <button
                key={index}
                type="button"
                className="elite-example-tag"
                onClick={() => setUsername(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="elite-login-footer">
          <p className="elite-info-text">
            <span className="elite-info-icon">ℹ️</span>
            Gunakan format <strong>±studio.alra</strong> sebagai pengganti <strong>@gmail.com</strong>
          </p>
          <p className="elite-info-text">
            <span className="elite-info-icon">🔒</span>
            Sistem mendukung multi-user dengan sesi terpisah
          </p>
        </div>
      </div>
    </div>
  );
};

export default EliteLogin;

/**
 * Elite Integration Module
 * Main entry point for the Elite Coder integration
 * Including authentication with ±studio.alra format
 */

// Export components
export { default as EliteApp } from './app';
export { default as EliteMenu } from './EliteMenu';
export { default as EliteNavbar } from './EliteNavbar';
export { default as EliteCodeEditor } from './EliteCodeEditor';
export { default as EliteCodeReview } from './EliteCodeReview';
export { default as EliteContentCreator } from './EliteContentCreator';
export { default as EliteLogin } from './EliteLogin';

// Export service and utilities
export { default as EliteCoderService } from './service';
export { EliteValidator } from './Validator';
export { AuthMiddleware } from './AuthMiddleware';

// Export types
export * from './types';

// Default configuration
export const DEFAULT_CONFIG = {
  platform: 'aistudio.google.com',
  coder: 'coder.qwen.ai',
  capabilities: [
    'unlimited_code_writing',
    'code_review',
    'code_fixing',
    'content_creation'
  ],
  menuPosition: 'sidebar',
  embedMode: 'iframe',
  authFormat: '±studio.alra'
};

// Version
export const ELITE_VERSION = '1.0.0';

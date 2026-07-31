/**
 * Elite Integration Module
 * Main entry point for the Elite Coder integration
 */

// Export components
export { default as EliteApp } from './app';
export { default as EliteMenu } from './EliteMenu';
export { default as EliteNavbar } from './EliteNavbar';
export { default as EliteCodeEditor } from './EliteCodeEditor';
export { default as EliteCodeReview } from './EliteCodeReview';
export { default as EliteContentCreator } from './EliteContentCreator';

// Export service
export { default as EliteCoderService } from './service';

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
  embedMode: 'iframe'
};

/**
 * Elite Coder Integration Types
 * Defines types for the Qwen AI integration with AI Studio
 * Including authentication with ±studio.alra format
 */

export interface EliteConfig {
  platform: string;
  coder: string;
  capabilities: string[];
  menuPosition: string;
  embedMode: string;
}

export interface CodeFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface CodeReview {
  id: string;
  code: string;
  suggestions: string[];
  issues: CodeIssue[];
  timestamp: Date;
}

export interface CodeIssue {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export interface ContentCreation {
  url: string;
  contentType: 'code' | 'documentation' | 'test' | 'config';
  status: 'generating' | 'completed' | 'failed';
  content?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

export interface EliteState {
  currentView: string;
  isCodeWriting: boolean;
  isReviewing: boolean;
  isFixing: boolean;
  isCreatingContent: boolean;
  activeUrl?: string;
  generatedCode?: string;
  reviews?: CodeReview[];
}

export interface IntegrationProps {
  config: EliteConfig;
  onCodeGenerated?: (code: string) => void;
  onReviewComplete?: (review: CodeReview) => void;
  onContentCreated?: (content: ContentCreation) => void;
}

export interface EmbedConfig {
  targetPlatform: string;
  embedType: 'iframe' | 'component' | 'modal';
  autoLoad: boolean;
  position: 'sidebar' | 'fullscreen' | 'floating';
}

// Authentication Types for ±studio.alra system
export interface UserSession {
  sessionId: string;
  username: string;
  localPart: string;
  domain: string;
  loginTime: number;
  lastActivity: number;
  isActive: boolean;
  permissions: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  error: string | null;
  session: UserSession | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface AIRequest {
  sessionId: string;
  action: 'generate' | 'review' | 'fix' | 'create';
  code?: string;
  prompt?: string;
  language?: string;
  url?: string;
}

export interface AIResponse {
  success: boolean;
  error?: string;
  data?: {
    code?: string;
    review?: CodeReview;
    suggestions?: string[];
    content?: string;
  };
}

export interface ContentRequest {
  sessionId: string;
  title: string;
  description: string;
  contentType: 'tutorial' | 'documentation' | 'code-sample' | 'project';
  targetUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  action?: string;
  requiresAuth?: boolean;
}

export interface MenuState {
  isOpen: boolean;
  activeItem: string | null;
  currentUser: UserSession | null;
}

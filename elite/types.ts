/**
 * Elite Coder Integration Types
 * Defines types for the Qwen AI integration with AI Studio
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

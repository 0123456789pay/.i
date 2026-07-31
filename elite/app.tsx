/**
 * Elite App - Main Application Component
 * Integrates Coder Qwen AI with AI Studio Google
 */

import React, { useState } from 'react';
import './styles.css';
import EliteMenu from './EliteMenu';
import EliteCodeEditor from './EliteCodeEditor';
import EliteCodeReview from './EliteCodeReview';
import EliteContentCreator from './EliteContentCreator';
import { EliteConfig, MenuItem } from './types';
import EliteCoderService from './service';

const EliteApp: React.FC = () => {
  const [activeItem, setActiveItem] = useState('editor');
  
  // Configuration for Elite Coder Integration
  const config: EliteConfig = {
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

  const service = new EliteCoderService(config);
  const status = service.getStatus();

  // Menu items for navigation
  const menuItems: MenuItem[] = [
    { id: 'editor', label: 'Code Editor', icon: '📝', path: '/editor' },
    { id: 'review', label: 'Code Review', icon: '🔍', path: '/review' },
    { id: 'fix', label: 'Auto Fix', icon: '🔧', path: '/fix' },
    { id: 'create', label: 'Content Creator', icon: '🚀', path: '/create' },
    { id: 'embed', label: 'AI Studio Embed', icon: '🔗', path: '/embed' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'editor':
        return <EliteCodeEditor config={config} />;
      case 'review':
        return <EliteCodeReview config={config} />;
      case 'create':
        return <EliteContentCreator config={config} />;
      case 'embed':
        return (
          <div className="elite-panel">
            <div className="elite-panel-title">AI Studio Integration</div>
            <p>Embed this module into your AI Studio application:</p>
            <pre
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
              }}
            >
{`// In your app.tsx or app.ts
import EliteApp from './elite/app';

function App() {
  return (
    <div>
      {/* Your existing app */}
      <EliteApp />
    </div>
  );
}`}
            </pre>
            <div style={{ marginTop: '1rem' }}>
              <h4>Or use iframe embedding:</h4>
              <pre
                style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                }}
              >
{`<iframe 
  src="/elite/index.html" 
  style={{ width: '100%', height: '600px', border: 'none' }}
  title="Elite Coder"
/>`}
              </pre>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="elite-panel">
            <div className="elite-panel-title">Integration Settings</div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Platform:</strong> {config.platform}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Coder AI:</strong> {config.coder}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Status:</strong>{' '}
              <span className={`elite-status ${status.connected ? 'elite-status-active' : 'elite-status-pending'}`}>
                {status.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Capabilities:</strong>
              <ul>
                {config.capabilities.map((cap, index) => (
                  <li key={index}>{cap.replace(/_/g, ' ')}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="elite-panel">
            <div className="elite-panel-title">Welcome to Elite Coder</div>
            <p>Select a feature from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="elite-container">
      <header className="elite-header">
        <div className="elite-logo">
          <span>✨</span>
          <span>Elite Coder - Qwen AI Integration</span>
        </div>
        <div className="elite-menu">
          <span
            className="elite-status elite-status-active"
            style={{ marginRight: '1rem' }}
          >
            {status.platform}
          </span>
        </div>
      </header>

      <div className="elite-content">
        <EliteMenu
          items={menuItems}
          activeItem={activeItem}
          onItemClick={handleMenuItemClick}
        />
        <main className="elite-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EliteApp;

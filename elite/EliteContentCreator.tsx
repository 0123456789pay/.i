/**
 * Elite Content Creator Component
 * Creates content at AI Studio URLs
 */

import React, { useState } from 'react';
import EliteCoderService from './service';
import { EliteConfig, ContentCreation } from './types';

interface EliteContentCreatorProps {
  config: EliteConfig;
}

const EliteContentCreator: React.FC<EliteContentCreatorProps> = ({ config }) => {
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState<'code' | 'documentation' | 'test' | 'config'>('code');
  const [content, setContent] = useState<ContentCreation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const service = new EliteCoderService(config);

  const handleCreateContent = async () => {
    if (!url.trim()) return;
    
    setIsCreating(true);
    try {
      const result = await service.createContent(url, contentType);
      setContent(result);
    } catch (error) {
      console.error('Content creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="elite-status elite-status-active">Completed</span>;
      case 'generating':
        return <span className="elite-status elite-status-pending">Generating...</span>;
      case 'failed':
        return <span className="elite-status" style={{ background: '#f8d7da', color: '#721c24' }}>Failed</span>;
      default:
        return <span className="elite-status">Unknown</span>;
    }
  };

  return (
    <div className="elite-panel">
      <div className="elite-panel-title">Content Creator for AI Studio</div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Target URL (aistudio.google.com):
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://aistudio.google.com/..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Content Type:
        </label>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value as any)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <option value="code">Code</option>
          <option value="documentation">Documentation</option>
          <option value="test">Test Files</option>
          <option value="config">Configuration</option>
        </select>

        <button
          className="elite-button elite-button-primary"
          onClick={handleCreateContent}
          disabled={isCreating || !url.trim()}
        >
          {isCreating ? 'Creating...' : '🚀 Create Content'}
        </button>
      </div>

      {content && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Content Creation Result</h3>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Status:</strong> {getStatusBadge(content.status)}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>URL:</strong> {content.url}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Type:</strong> {content.contentType}
          </div>
          {content.content && (
            <div>
              <strong>Generated Content:</strong>
              <pre
                style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  maxHeight: '400px',
                }}
              >
                {content.content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EliteContentCreator;

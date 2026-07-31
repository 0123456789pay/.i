/**
 * Elite Code Review Component
 * Displays code review results from Qwen AI
 */

import React, { useState } from 'react';
import EliteCoderService from './service';
import { EliteConfig, CodeReview, CodeIssue } from './types';

interface EliteCodeReviewProps {
  config: EliteConfig;
  codeToReview?: string;
}

const EliteCodeReview: React.FC<EliteCodeReviewProps> = ({ 
  config, 
  codeToReview = '' 
}) => {
  const [code, setCode] = useState(codeToReview);
  const [review, setReview] = useState<CodeReview | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const service = new EliteCoderService(config);

  const handleReview = async () => {
    if (!code.trim()) return;
    
    setIsReviewing(true);
    try {
      const result = await service.reviewCode(code);
      setReview(result);
    } catch (error) {
      console.error('Review failed:', error);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleFixIssues = async () => {
    if (!review || !review.issues.length) return;
    
    try {
      const fixedCode = await service.fixCode(code, review.issues);
      setCode(fixedCode);
      setReview(null);
    } catch (error) {
      console.error('Fix failed:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div className="elite-panel">
      <div className="elite-panel-title">Code Review</div>

      <div style={{ marginBottom: '1rem' }}>
        <textarea
          className="elite-code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste code to review..."
          rows={8}
        />
        <button
          className="elite-button elite-button-primary"
          onClick={handleReview}
          disabled={isReviewing}
          style={{ marginTop: '0.5rem' }}
        >
          {isReviewing ? 'Reviewing...' : '🔍 Review Code'}
        </button>
      </div>

      {review && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Review Results</h3>
          
          {review.suggestions.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4>Suggestions:</h4>
              <ul>
                {review.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {review.issues.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4>Issues Found: {review.issues.length}</h4>
              {review.issues.map((issue: CodeIssue, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    borderLeft: `4px solid ${getSeverityColor(issue.severity)}`,
                    background: '#f8f9fa',
                  }}
                >
                  <strong>Line {issue.line}, Col {issue.column}</strong>
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: getSeverityColor(issue.severity),
                      color: 'white',
                      fontSize: '0.8rem',
                    }}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                  <p style={{ margin: '0.5rem 0' }}>{issue.message}</p>
                  {issue.suggestion && (
                    <p style={{ margin: '0.5rem 0', fontStyle: 'italic' }}>
                      💡 {issue.suggestion}
                    </p>
                  )}
                </div>
              ))}
              <button
                className="elite-button elite-button-secondary"
                onClick={handleFixIssues}
              >
                🔧 Auto-Fix All Issues
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EliteCodeReview;

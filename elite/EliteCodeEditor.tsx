/**
 * Elite Code Editor Component
 * Integrated code editor with Qwen AI capabilities
 */

import React, { useState } from 'react';
import EliteCoderService from './service';
import { EliteConfig } from './types';

interface EliteCodeEditorProps {
  config: EliteConfig;
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

const EliteCodeEditor: React.FC<EliteCodeEditorProps> = ({ 
  config, 
  initialCode = '', 
  onCodeChange 
}) => {
  const [code, setCode] = useState(initialCode);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const service = new EliteCoderService(config);

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedCode = await service.generateCode(prompt);
      setCode(generatedCode);
      onCodeChange?.(generatedCode);
      setPrompt('');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  return (
    <div className="elite-panel">
      <div className="elite-panel-title">Elite Code Editor</div>
      
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          className="elite-code-editor"
          placeholder="Describe what code you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button
          className="elite-button elite-button-primary"
          onClick={handleGenerateCode}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '✨ Generate Code'}
        </button>
      </div>

      <textarea
        className="elite-code-editor"
        value={code}
        onChange={handleChange}
        placeholder="// Your code will appear here..."
        rows={15}
      />
    </div>
  );
};

export default EliteCodeEditor;

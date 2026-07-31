import React, { useState } from 'react';
import './styles.css';

interface EliteNavbarProps {
  onMenuClick?: (action: string) => void;
}

const EliteNavbar: React.FC<EliteNavbarProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action: string) => {
    if (onMenuClick) {
      onMenuClick(action);
    }
    setIsOpen(false);
  };

  return (
    <div className="elite-navbar-container">
      <nav className="elite-navbar">
        <div className="elite-navbar-brand">
          <span className="elite-logo">🚀</span>
          <span className="elite-brand-text">Elite Coder</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="elite-menu-toggle" 
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>

        {/* Desktop Menu */}
        <ul className={`elite-nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="elite-nav-item">
            <button 
              className="elite-nav-link"
              onClick={() => handleMenuItemClick('code-editor')}
            >
              <span className="nav-icon">💻</span>
              <span>Code Editor</span>
            </button>
          </li>
          <li className="elite-nav-item">
            <button 
              className="elite-nav-link"
              onClick={() => handleMenuItemClick('code-review')}
            >
              <span className="nav-icon">🔍</span>
              <span>Review</span>
            </button>
          </li>
          <li className="elite-nav-item">
            <button 
              className="elite-nav-link"
              onClick={() => handleMenuItemClick('auto-fix')}
            >
              <span className="nav-icon">🔧</span>
              <span>Auto Fix</span>
            </button>
          </li>
          <li className="elite-nav-item">
            <button 
              className="elite-nav-link"
              onClick={() => handleMenuItemClick('content-creator')}
            >
              <span className="nav-icon">✨</span>
              <span>Content</span>
            </button>
          </li>
          <li className="elite-nav-item elite-nav-item-special">
            <button 
              className="elite-nav-link elite-ai-btn"
              onClick={() => handleMenuItemClick('unlimited-code')}
            >
              <span className="nav-icon">⚡</span>
              <span>Unlimited Code</span>
            </button>
          </li>
        </ul>

        {/* Quick Actions */}
        <div className="elite-quick-actions">
          <button 
            className="elite-quick-btn"
            title="Quick Generate"
            onClick={() => handleMenuItemClick('quick-generate')}
          >
            ⚡
          </button>
          <button 
            className="elite-quick-btn"
            title="Settings"
            onClick={() => handleMenuItemClick('settings')}
          >
            ⚙️
          </button>
        </div>
      </nav>

      {/* Dropdown for mobile */}
      {isOpen && (
        <div className="elite-mobile-dropdown">
          <div className="elite-dropdown-content">
            <h4>Elite Coder Actions</h4>
            <p>Powered by Qwen AI</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliteNavbar;

/**
 * Elite Coder Menu Component
 * Sidebar menu for AI Studio integration
 */

import React from 'react';
import { MenuItem } from './types';

interface EliteMenuProps {
  items: MenuItem[];
  activeItem?: string;
  onItemClick: (itemId: string) => void;
}

const EliteMenu: React.FC<EliteMenuProps> = ({ items, activeItem, onItemClick }) => {
  return (
    <div className="elite-sidebar">
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            className={`elite-menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default EliteMenu;

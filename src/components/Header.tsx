import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'mood', label: 'MOOD' },
    { id: 'journal', label: 'JOURNAL' },
    { id: 'breathe', label: 'BREATHE' },
    { id: 'resources', label: 'RESOURCES' }
  ];

  return (
    <header className="bg-neo-pink neo-border-thick border-b-0 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 neo-border">
              <Brain className="w-8 h-8 text-neo-cyan" />
            </div>
            <h1 className="text-3xl font-bold text-white">MINDSPACE</h1>
          </div>
        </div>
        
        <nav className="flex gap-2 flex-wrap">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-4 py-2 font-bold neo-border transition-all ${
                currentView === item.id
                  ? 'bg-black text-neo-cyan neo-shadow-sm'
                  : 'bg-white text-black hover:bg-neo-yellow'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';

interface HeaderProps {
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onProfileClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic text-sm shadow-sm">
          SN
        </div>
        <h1 className="text-lg font-black text-slate-800 tracking-tight">Sửa Nhanh</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {onProfileClick && (
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 active:bg-blue-50 active:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        )}
        {onLogout && (
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 active:bg-red-50 active:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

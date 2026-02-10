
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { Building2, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-indigo-900 text-white transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Building2 className="text-indigo-400" />
            <span>{APP_NAME}</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-indigo-800 rounded">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-indigo-950 border-t border-indigo-800">
          <p className="text-xs text-indigo-400">© 2024 {APP_NAME} Admin</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

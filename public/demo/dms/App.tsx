
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  Search, 
  Settings, 
  FileText, 
  User, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import ClientList from './pages/ClientList';
import ClientDetail from './pages/ClientDetail';
import Dashboard from './pages/Dashboard';
import AISearchPanel from './components/AISearchPanel';

const Header: React.FC<{ onOpenAI: () => void }> = ({ onOpenAI }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: '顧問先一覧', path: '/', icon: <Users size={20} /> },
    { label: 'ダッシュボード', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] md:h-[72px] bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] text-white z-50 shadow-lg px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="bg-[#c9a962] p-1.5 md:p-2 rounded-md shadow-sm">
          <FileText size={18} className="text-[#0a1628] md:w-5 md:h-5" />
        </div>
        <span className="text-base md:text-xl font-serif font-bold tracking-wider">顧問先カルテ</span>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
              location.pathname === item.path
                ? 'text-[#c9a962] bg-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-[#c9a962] hover:bg-white/5 transition-all"
        >
          <Sparkles size={20} />
          <span className="font-medium">AI検索</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium">設定</span>
        </button>
      </nav>

      {/* User info - hidden on mobile */}
      <div className="hidden md:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-[#c9a962] flex items-center justify-center text-[#0a1628] font-bold">
          山
        </div>
        <div className="text-sm hidden lg:block">
          <p className="font-bold">山田太郎</p>
          <p className="text-xs text-white/60">主任税理士</p>
        </div>
        <ChevronDown size={14} className="text-white/60 hidden lg:block" />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[#0a1628] md:hidden shadow-lg border-t border-white/10">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  location.pathname === item.path
                    ? 'text-[#c9a962] bg-white/10'
                    : 'text-white/80'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => { onOpenAI(); setMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white/80"
            >
              <Sparkles size={20} />
              <span className="font-medium">AI検索</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-md text-white/80">
              <Settings size={20} />
              <span className="font-medium">設定</span>
            </button>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 mt-2">
              <div className="w-8 h-8 rounded-full bg-[#c9a962] flex items-center justify-center text-[#0a1628] font-bold">
                山
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">山田太郎</p>
                <p className="text-xs text-white/60">主任税理士</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const App: React.FC = () => {
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen pt-[60px] md:pt-[72px]">
        <Header onOpenAI={() => setIsAISearchOpen(true)} />

        <main className="p-4 md:p-8 max-w-[1400px] mx-auto">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/client/:id" element={<ClientDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <AISearchPanel 
          isOpen={isAISearchOpen} 
          onClose={() => setIsAISearchOpen(false)} 
        />
      </div>
    </HashRouter>
  );
};

export default App;

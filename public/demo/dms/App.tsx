
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
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import ClientList from './pages/ClientList';
import ClientDetail from './pages/ClientDetail';
import Dashboard from './pages/Dashboard';
import AISearchPanel from './components/AISearchPanel';

const Header: React.FC<{ onOpenAI: () => void }> = ({ onOpenAI }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: '顧問先一覧', path: '/', icon: <Users size={20} /> },
    { label: 'ダッシュボード', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] text-white z-50 shadow-lg px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#c9a962] p-2 rounded-md shadow-sm">
            <FileText size={20} className="text-[#0a1628]" />
          </div>
          <span className="text-lg md:text-xl font-serif font-bold tracking-wider">顧問先カルテ</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

        {/* Desktop User Menu */}
        <div className="hidden lg:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#c9a962] flex items-center justify-center text-[#0a1628] font-bold">
            山
          </div>
          <div className="text-sm">
            <p className="font-bold">山田太郎</p>
            <p className="text-xs text-white/60">主任税理士</p>
          </div>
          <ChevronDown size={14} className="text-white/60" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-[#0a1628] z-40 lg:hidden shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
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
              onClick={() => {
                onOpenAI();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-white/80 hover:text-[#c9a962] hover:bg-white/5 transition-all"
            >
              <Sparkles size={20} />
              <span className="font-medium">AI検索</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-md text-white/80 hover:bg-white/5 transition-all">
              <Settings size={20} />
              <span className="font-medium">設定</span>
            </button>
            <div className="border-t border-white/10 mt-4 pt-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-md">
                <div className="w-10 h-10 rounded-full bg-[#c9a962] flex items-center justify-center text-[#0a1628] font-bold">
                  山
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white">山田太郎</p>
                  <p className="text-xs text-white/60">主任税理士</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen pt-[72px]">
        <Header onOpenAI={() => setIsAISearchOpen(true)} />

        <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
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

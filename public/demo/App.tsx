
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
  
  const navItems = [
    { label: '顧問先一覧', path: '/', icon: <Users size={20} /> },
    { label: 'ダッシュボード', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] text-white z-50 shadow-lg px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#c9a962] p-2 rounded-md shadow-sm">
          <FileText size={20} className="text-[#0a1628]" />
        </div>
        <span className="text-xl font-serif font-bold tracking-wider">顧問先カルテ</span>
      </div>

      <nav className="flex items-center gap-8">
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

      <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-[#c9a962] flex items-center justify-center text-[#0a1628] font-bold">
          山
        </div>
        <div className="text-sm">
          <p className="font-bold">山田太郎</p>
          <p className="text-xs text-white/60">主任税理士</p>
        </div>
        <ChevronDown size={14} className="text-white/60" />
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen pt-[72px]">
        <Header onOpenAI={() => setIsAISearchOpen(true)} />
        
        <main className="p-8 max-w-[1400px] mx-auto">
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

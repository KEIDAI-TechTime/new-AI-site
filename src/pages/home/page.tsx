import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import SystemTypes from './components/SystemTypes';
import AIDevelopment from './components/AIDevelopment';
import Simulator from './components/Simulator';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center">
                <i className="ri-code-s-slash-line text-xl text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">TechTime</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">特徴</a>
              <a href="#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</a>
              <a href="#simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</a>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">開発事例</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">会社概要</Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-white">
        <Hero />
        <Features />
        <SystemTypes />
        <AIDevelopment />
        <Simulator />
        <FAQ />
        <CTA />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A1628]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center">
                  <i className="ri-code-s-slash-line text-xl text-white"></i>
                </div>
                <span className="text-xl font-bold text-white">TechTime</span>
              </div>
              <p className="text-sm text-gray-400">
                AI駆動開発で実現する<br />圧倒的低価格の基幹システム
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</a></li>
                <li><a href="#systems" className="hover:text-[#00D9FF] transition-colors">対応システム</a></li>
                <li><a href="#ai-development" className="hover:text-[#00D9FF] transition-colors">AI駆動開発</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">企業情報</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-[#00D9FF] transition-colors">会社概要</Link></li>
                <li><Link to="/cases" className="hover:text-[#00D9FF] transition-colors">開発事例</Link></li>
                <li><Link to="/contact" className="hover:text-[#00D9FF] transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <i className="ri-phone-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                  <a href="tel:0342223363" className="hover:text-[#00D9FF] transition-colors">03-4222-3363</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-mail-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                  <a href="mailto:info@techtime-link.com" className="hover:text-[#00D9FF] transition-colors">info@techtime-link.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2025 TechTime株式会社. All rights reserved.</p>
            <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-[#00D9FF] transition-colors">
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

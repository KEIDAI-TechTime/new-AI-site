import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center">
                <i className="ri-code-s-slash-line text-lg sm:text-xl text-white"></i>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">TechTime</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link to="/#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
              <Link to="/simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/blog" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">ブログ</Link>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">開発事例</Link>
              <Link to="/about" className="text-sm text-[#00D9FF] font-medium whitespace-nowrap">会社概要</Link>
              <Link to="/contact" className="px-4 xl:px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap text-sm">お問い合わせ</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="メニューを開く"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link to="/#systems" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">対応システム</Link>
              <Link to="/simulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">見積もり</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">ブログ</Link>
              <Link to="/cases" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">開発事例</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-[#00D9FF] font-medium hover:bg-white/5 rounded-lg transition-colors">会社概要</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">お問い合わせ</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-6">
            <i className="ri-building-line text-[#00D9FF]"></i>
            <span className="text-sm text-[#00D9FF] font-medium">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            会社概要
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            AI駆動開発で、企業の基幹システム開発に革新をもたらす
          </p>
        </div>
      </div>

      {/* Company Info */}
      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-8 md:p-12">
              <table className="w-full">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">会社名</td>
                    <td className="py-6 text-white">TechTime株式会社</td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">代表取締役</td>
                    <td className="py-6 text-white">山田 太郎</td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">設立</td>
                    <td className="py-6 text-white">2020年4月1日</td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">資本金</td>
                    <td className="py-6 text-white">5,000万円</td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">所在地</td>
                    <td className="py-6 text-white">
                      〒100-0001<br />
                      東京都千代田区千代田1-1-1<br />
                      テックタワー10F
                    </td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">電話番号</td>
                    <td className="py-6 text-white">
                      <a href="tel:0342223363" className="hover:text-[#00D9FF] transition-colors">03-4222-3363</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">メール</td>
                    <td className="py-6 text-white">
                      <a href="mailto:info@techtime-link.com" className="hover:text-[#00D9FF] transition-colors">info@techtime-link.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">事業内容</td>
                    <td className="py-6 text-white">
                      ・基幹システムの受託開発<br />
                      ・AI駆動開発ツールの研究開発<br />
                      ・システム保守運用サービス<br />
                      ・ITコンサルティング
                    </td>
                  </tr>
                  <tr>
                    <td className="py-6 pr-8 text-sm font-medium text-gray-400 align-top whitespace-nowrap">従業員数</td>
                    <td className="py-6 text-white">45名（2025年1月現在）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-target-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ミッション</h3>
              <p className="text-gray-300 leading-relaxed">
                AI技術を活用した革新的な開発手法により、高品質なシステムを圧倒的な低価格で提供し、すべての企業がデジタル化の恩恵を受けられる社会を実現する。
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-eye-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ビジョン</h3>
              <p className="text-gray-300 leading-relaxed">
                AI駆動開発のパイオニアとして、システム開発業界の常識を変革し、日本のDX推進を加速させるリーディングカンパニーになる。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">私たちの価値観</h2>
            <p className="text-gray-300">TechTimeが大切にしている3つの価値観</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#00D9FF]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-lightbulb-line text-2xl text-[#00D9FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">革新性</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                常に最新のAI技術を取り入れ、従来の開発手法にとらわれない革新的なアプローチで、業界に新しい価値を提供し続けます。
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#00D9FF]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-[#00D9FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">品質へのこだわり</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                AIによる効率化を追求しながらも、品質を決して妥協しません。多段階のレビューと自動テストにより、高品質を担保します。
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#00D9FF]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF]/20 to-[#0099FF]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-heart-line text-2xl text-[#00D9FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">顧客第一</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                お客様の業務課題を深く理解し、真に価値あるシステムを提供することを最優先に考えます。長期的なパートナーシップを大切にします。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0099FF]/10 backdrop-blur-xl rounded-3xl border border-[#00D9FF]/20 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">お気軽にご相談ください</h2>
            <p className="text-gray-300 mb-8">
              システム開発に関するご相談、お見積もりのご依頼など、<br />
              専門スタッフが丁寧にご対応いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap"
              >
                お問い合わせ
              </Link>
              <Link
                to="/simulator"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                見積もりシミュレーター
              </Link>
            </div>
          </div>
        </div>
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
                <li><a href="/simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</a></li>
                <li><a href="/#systems" className="hover:text-[#00D9FF] transition-colors">対応システム</a></li>
                <li><a href="/#ai-development" className="hover:text-[#00D9FF] transition-colors">AI駆動開発</a></li>
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
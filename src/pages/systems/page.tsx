import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Systems() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const systems = [
    {
      id: 1,
      name: '文書管理システム',
      description: '社内文書の一元管理、承認ワークフロー',
      image: 'https://readdy.ai/api/search-image?query=professional%20document%20management%20system%20interface%20with%20organized%20files%20and%20folders%20on%20clean%20minimal%20light%20background%20modern%20business%20software%20design%20simple%20elegant%20style&width=400&height=400&seq=sys-doc-001&orientation=squarish'
    },
    {
      id: 2,
      name: '在庫管理システム',
      description: '入出庫管理、在庫最適化、棚卸機能',
      image: 'https://readdy.ai/api/search-image?query=modern%20inventory%20management%20system%20dashboard%20with%20warehouse%20shelves%20and%20stock%20data%20visualization%20on%20clean%20minimal%20light%20background%20professional%20logistics%20software%20simple%20elegant%20design&width=400&height=400&seq=sys-inv-002&orientation=squarish'
    },
    {
      id: 3,
      name: '顧客・販売管理システム',
      description: '顧客情報管理、案件管理、売上分析',
      image: 'https://readdy.ai/api/search-image?query=customer%20relationship%20management%20crm%20system%20interface%20with%20sales%20data%20and%20customer%20profiles%20on%20clean%20minimal%20light%20background%20modern%20business%20software%20simple%20elegant%20style&width=400&height=400&seq=sys-crm-003&orientation=squarish'
    },
    {
      id: 4,
      name: '購買・調達管理システム',
      description: '発注管理、仕入先管理、購買データ分析',
      image: 'https://readdy.ai/api/search-image?query=procurement%20and%20purchasing%20management%20system%20with%20supplier%20data%20and%20order%20tracking%20on%20clean%20minimal%20light%20background%20professional%20business%20software%20simple%20elegant%20design&width=400&height=400&seq=sys-proc-004&orientation=squarish'
    },
    {
      id: 5,
      name: '経営ダッシュボード（BI）',
      description: '経営指標の可視化、リアルタイムレポート',
      image: 'https://readdy.ai/api/search-image?query=business%20intelligence%20dashboard%20with%20charts%20graphs%20and%20kpi%20metrics%20visualization%20on%20clean%20minimal%20light%20background%20modern%20analytics%20software%20simple%20elegant%20style&width=400&height=400&seq=sys-bi-005&orientation=squarish'
    },
    {
      id: 6,
      name: '生産管理システム',
      description: '生産計画、工程管理、進捗管理',
      image: 'https://readdy.ai/api/search-image?query=manufacturing%20production%20management%20system%20with%20factory%20floor%20planning%20and%20process%20tracking%20on%20clean%20minimal%20light%20background%20industrial%20software%20simple%20elegant%20design&width=400&height=400&seq=sys-prod-006&orientation=squarish'
    },
    {
      id: 7,
      name: '倉庫・物流管理システム',
      description: '入出荷管理、配送管理、ロケーション管理',
      image: 'https://readdy.ai/api/search-image?query=warehouse%20and%20logistics%20management%20system%20with%20shipping%20tracking%20and%20location%20data%20on%20clean%20minimal%20light%20background%20modern%20supply%20chain%20software%20simple%20elegant%20style&width=400&height=400&seq=sys-wms-007&orientation=squarish'
    },
    {
      id: 8,
      name: '人事・給与システム',
      description: '人事情報管理、給与計算、勤怠管理',
      image: 'https://readdy.ai/api/search-image?query=human%20resources%20and%20payroll%20management%20system%20with%20employee%20data%20and%20attendance%20tracking%20on%20clean%20minimal%20light%20background%20professional%20hr%20software%20simple%20elegant%20design&width=400&height=400&seq=sys-hr-008&orientation=squarish'
    },
    {
      id: 9,
      name: '原価・会計システム',
      description: '原価計算、会計処理、財務レポート',
      image: 'https://readdy.ai/api/search-image?query=cost%20accounting%20and%20financial%20management%20system%20with%20budget%20reports%20and%20expense%20tracking%20on%20clean%20minimal%20light%20background%20professional%20finance%20software%20simple%20elegant%20style&width=400&height=400&seq=sys-acc-009&orientation=squarish'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img
                src="https://www.techtime-link.com/wp-content/uploads/2025/06/rogo_ws.png"
                alt="TechTime"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link to="/systems" className="text-sm text-[#00D9FF] font-medium whitespace-nowrap">対応システム</Link>
              <Link to="/simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/blog" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">ブログ</Link>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">開発事例</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">会社概要</Link>
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
              <Link to="/systems" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-[#00D9FF] font-medium hover:bg-white/5 rounded-lg transition-colors">対応システム</Link>
              <Link to="/simulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">見積もり</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">ブログ</Link>
              <Link to="/cases" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">開発事例</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">会社概要</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">お問い合わせ</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-6">
            <i className="ri-stack-line text-[#00D9FF]"></i>
            <span className="text-sm text-[#00D9FF] font-medium">Systems</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            開発対応システム
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            企業の基幹業務を支える各種システムをスクラッチ開発。<br />
            御社の業務フローに完全に適合した、専用システムを構築します。
          </p>
        </div>
      </div>

      {/* Systems Grid */}
      <div className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <div
                key={system.id}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer aspect-square"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/50 to-transparent group-hover:from-[#0A1628]/70 group-hover:via-[#0A1628]/30 transition-all duration-500"></div>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#00D9FF] flex items-center justify-center shadow-lg">
                  <span className="text-[#0A1628] font-bold text-lg">{system.id}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-white">
                    {system.name}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {system.description}
                  </p>

                  {/* Hover Button */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="mt-2 px-6 py-2 rounded-full border-2 border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-300 whitespace-nowrap cursor-pointer">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-300">
              上記以外のシステムも開発可能です。お気軽にご相談ください。
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A1628]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://www.techtime-link.com/wp-content/uploads/2025/06/rogo_ws.png"
                  alt="TechTime"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm text-gray-400">
                AI駆動開発で実現する<br />圧倒的低価格の基幹システム
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</Link></li>
                <li><Link to="/systems" className="hover:text-[#00D9FF] transition-colors">対応システム</Link></li>
                <li><Link to="/ai-development" className="hover:text-[#00D9FF] transition-colors">AI駆動開発</Link></li>
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
                  <a href="mailto:kdm@techtime-link.com" className="hover:text-[#00D9FF] transition-colors">kdm@techtime-link.com</a>
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

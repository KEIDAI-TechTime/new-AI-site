import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCases, CASE_CATEGORIES } from '../../services/notion-api';
import type { NotionCase } from '../../types/notion';

export default function Cases() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cases, setCases] = useState<NotionCase[]>([]);
  const [loading, setLoading] = useState(true);

  // Notionから開発事例を取得
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      const data = await getCases();
      setCases(data);
      setLoading(false);
    };

    fetchCases();
  }, []);

  // フォールバック用のハードコードされたデータ
  const fallbackCases = [
    {
      id: 1,
      category: '文書管理',
      title: '大手製造業A社様 文書管理システム',
      description: '全社の技術文書・品質文書を一元管理し、承認ワークフローを自動化。検索性が大幅に向上し、文書管理業務の工数を60%削減。',
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20digital%20document%20management%20system%20displayed%20on%20multiple%20screens%2C%20clean%20organized%20environment%20with%20filing%20cabinets%20and%20computers%2C%20professional%20business%20setting%20with%20natural%20lighting%2C%20minimalist%20design%20with%20blue%20and%20white%20color%20scheme%2C%20high-tech%20atmosphere&width=800&height=600&seq=case1&orientation=landscape',
      scale: '大規模',
      period: '6ヶ月',
      cost: '850万円',
      results: ['文書検索時間 70%短縮', '承認プロセス 50%高速化', '年間コスト 300万円削減']
    },
    {
      id: 2,
      category: '在庫管理',
      title: '物流企業B社様 在庫管理システム',
      description: '複数拠点の在庫をリアルタイムで可視化し、適正在庫の維持を実現。過剰在庫と欠品を同時に削減し、キャッシュフローが改善。',
      image: 'https://readdy.ai/api/search-image?query=modern%20warehouse%20with%20automated%20inventory%20management%20system%2C%20organized%20shelves%20with%20products%20and%20barcode%20scanners%2C%20clean%20industrial%20environment%20with%20LED%20lighting%2C%20workers%20using%20tablets%20for%20inventory%20tracking%2C%20efficient%20logistics%20operation%20with%20blue%20accent%20lighting&width=800&height=600&seq=case2&orientation=landscape',
      scale: '標準規模',
      period: '4ヶ月',
      cost: '420万円',
      results: ['在庫回転率 35%向上', '欠品率 80%削減', '棚卸時間 65%短縮']
    },
    {
      id: 3,
      category: '顧客管理',
      title: '商社C社様 顧客・販売管理システム',
      description: '顧客情報と案件情報を統合管理し、営業活動を可視化。データに基づく戦略的な営業が可能になり、売上が20%向上。',
      image: 'https://readdy.ai/api/search-image?query=modern%20sales%20office%20with%20customer%20relationship%20management%20dashboard%20on%20large%20monitors%2C%20professional%20business%20environment%20with%20sales%20team%20collaborating%2C%20clean%20workspace%20with%20charts%20and%20analytics%20displays%2C%20contemporary%20office%20design%20with%20natural%20light%20and%20blue%20accent%20colors&width=800&height=600&seq=case3&orientation=landscape',
      scale: '標準規模',
      period: '5ヶ月',
      cost: '580万円',
      results: ['売上 20%向上', '商談成約率 30%改善', '営業効率 40%向上']
    },
    {
      id: 4,
      category: '経営BI',
      title: '小売業D社様 経営ダッシュボード',
      description: '全店舗の売上・在庫・顧客データをリアルタイムで可視化。経営判断のスピードが向上し、機会損失を最小化。',
      image: 'https://readdy.ai/api/search-image?query=executive%20office%20with%20large%20business%20intelligence%20dashboard%20displaying%20real-time%20analytics%20and%20KPIs%2C%20modern%20corporate%20environment%20with%20multiple%20screens%20showing%20charts%20and%20graphs%2C%20professional%20setting%20with%20clean%20design%20and%20blue%20data%20visualization%20elements&width=800&height=600&seq=case4&orientation=landscape',
      scale: '標準規模',
      period: '3ヶ月',
      cost: '380万円',
      results: ['意思決定速度 50%向上', 'データ集計時間 90%削減', '売上予測精度 25%改善']
    },
    {
      id: 5,
      category: '生産管理',
      title: '製造業E社様 生産管理システム',
      description: '生産計画から工程管理、進捗管理まで一元化。リアルタイムな生産状況の把握により、納期遵守率が大幅に向上。',
      image: 'https://readdy.ai/api/search-image?query=modern%20manufacturing%20facility%20with%20digital%20production%20management%20system%2C%20factory%20floor%20with%20automated%20machinery%20and%20monitoring%20screens%2C%20clean%20industrial%20environment%20with%20workers%20using%20tablets%2C%20efficient%20production%20line%20with%20blue%20LED%20indicators%20and%20organized%20workspace&width=800&height=600&seq=case5&orientation=landscape',
      scale: '大規模',
      period: '7ヶ月',
      cost: '920万円',
      results: ['納期遵守率 95%達成', '生産効率 30%向上', '在庫コスト 25%削減']
    },
    {
      id: 6,
      category: '人事給与',
      title: 'サービス業F社様 人事・給与システム',
      description: '人事情報管理から給与計算、勤怠管理まで統合。給与計算の自動化により、人事部門の業務負荷が大幅に軽減。',
      image: 'https://readdy.ai/api/search-image?query=modern%20HR%20office%20with%20human%20resources%20management%20system%20on%20computers%2C%20professional%20workspace%20with%20employee%20data%20dashboards%2C%20clean%20corporate%20environment%20with%20organized%20filing%20and%20digital%20screens%2C%20contemporary%20office%20design%20with%20natural%20lighting%20and%20blue%20interface%20elements&width=800&height=600&seq=case6&orientation=landscape',
      scale: '標準規模',
      period: '4ヶ月',
      cost: '450万円',
      results: ['給与計算時間 80%削減', '人事業務効率 50%向上', '勤怠管理精度 向上']
    }
  ];

  // Notionから取得したデータがない場合はフォールバックデータを使用
  const displayCases = cases.length > 0 ? cases : fallbackCases;

  const categories = [
    { id: 'all', name: 'すべて' },
    ...Object.values(CASE_CATEGORIES)
  ];

  const filteredCases = selectedCategory === 'all'
    ? displayCases
    : displayCases.filter(c => c.category === selectedCategory);

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
              <Link to="/#features" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">特徴</Link>
              <Link to="/#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
              <Link to="/#simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/blog" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">ブログ</Link>
              <Link to="/cases" className="text-sm text-[#00D9FF] font-medium whitespace-nowrap">開発事例</Link>
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
              <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">特徴</Link>
              <Link to="/#systems" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">対応システム</Link>
              <Link to="/#simulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">見積もり</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">ブログ</Link>
              <Link to="/cases" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-[#00D9FF] font-medium hover:bg-white/5 rounded-lg transition-colors">開発事例</Link>
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
            <i className="ri-briefcase-line text-[#00D9FF]"></i>
            <span className="text-sm text-[#00D9FF] font-medium">Case Studies</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            開発事例
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            TechTimeのAI駆動開発により実現した、<br />
            さまざまな業界・規模のシステム開発事例をご紹介します。
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white shadow-lg shadow-[#00D9FF]/30'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00D9FF] border-t-transparent"></div>
              <p className="text-gray-400 mt-4">読み込み中...</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-file-damage-line text-6xl text-gray-600 mb-4"></i>
              <p className="text-gray-400">開発事例が見つかりませんでした</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCases.map(caseItem => (
              <div
                key={caseItem.id}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-[#00D9FF]/30 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-[#00D9FF]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D9FF] transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {caseItem.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <i className="ri-bar-chart-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-xs text-gray-400">{caseItem.scale}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-xs text-gray-400">開発期間 {caseItem.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-money-dollar-circle-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-xs text-gray-400">{caseItem.cost}</span>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">導入効果</h4>
                    <ul className="space-y-2">
                      {caseItem.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <i className="ri-check-line text-[#00D9FF] mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0"></i>
                          <span className="text-sm text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0099FF]/10 backdrop-blur-xl rounded-3xl border border-[#00D9FF]/20 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">御社のシステム開発も、ぜひご相談ください</h2>
            <p className="text-gray-300 mb-8">
              業種・規模を問わず、さまざまなシステム開発に対応しています。<br />
              まずは見積もりシミュレーターで概算金額をご確認ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#simulator"
                className="px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap"
              >
                見積もりシミュレーター
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                詳しく相談する
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
                <li><a href="/#simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</a></li>
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
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCase } from '../../../services/notion-api';
import type { NotionCase } from '../../../types/notion';

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<NotionCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;

      setLoading(true);
      const data = await getCase(id);
      setCaseData(data);
      setLoading(false);
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00D9FF] border-t-transparent"></div>
          <p className="text-gray-400 mt-4">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-file-damage-line text-6xl text-gray-600 mb-4"></i>
          <p className="text-gray-400 mb-6">開発事例が見つかりませんでした</p>
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300"
          >
            <i className="ri-arrow-left-line"></i>
            開発事例一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/5">
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
              <Link to="/#features" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">特徴</Link>
              <Link to="/#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
              <Link to="/simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
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
              <Link to="/simulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">見積もり</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">ブログ</Link>
              <Link to="/cases" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-[#00D9FF] font-medium hover:bg-white/5 rounded-lg transition-colors">開発事例</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">会社概要</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">お問い合わせ</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Back Button */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00D9FF] transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            <span>開発事例一覧に戻る</span>
          </Link>
        </div>
      </div>

      {/* Hero Image & Title */}
      <div className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/30 text-[#00D9FF] text-sm font-semibold rounded-full">
              {caseData.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {caseData.title}
          </h1>

          {/* Hero Image */}
          {caseData.image && (
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={caseData.image}
                alt={caseData.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <i className="ri-bar-chart-line text-[#00D9FF] text-xl"></i>
              <div>
                <div className="text-xs text-gray-500">規模</div>
                <div className="text-sm text-white font-medium">{caseData.scale}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-[#00D9FF] text-xl"></i>
              <div>
                <div className="text-xs text-gray-500">開発期間</div>
                <div className="text-sm text-white font-medium">{caseData.period}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-money-dollar-circle-line text-[#00D9FF] text-xl"></i>
              <div>
                <div className="text-xs text-gray-500">開発費用</div>
                <div className="text-sm text-white font-medium">{caseData.cost}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">プロジェクト概要</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {caseData.description}
            </p>
          </div>

          {/* Detailed Content from Notion Blocks */}
          {caseData.content && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">詳細情報</h2>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="markdown-content prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {caseData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">導入効果</h2>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <ul className="space-y-4">
                {caseData.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00D9FF]/20 flex items-center justify-center mt-0.5">
                      <i className="ri-check-line text-[#00D9FF] text-sm"></i>
                    </div>
                    <span className="text-gray-300 text-lg">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0099FF]/10 backdrop-blur-xl rounded-3xl border border-[#00D9FF]/20 p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              御社のシステム開発も、ぜひご相談ください
            </h2>
            <p className="text-gray-300 mb-8">
              業種・規模を問わず、さまざまなシステム開発に対応しています。<br />
              まずは見積もりシミュレーターで概算金額をご確認ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/simulator"
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

      {/* Markdown Styles */}
      <style>{`
        .markdown-content {
          font-size: 1rem;
          line-height: 1.75;
          color: #D1D5DB;
        }

        /* 見出し */
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          color: #FFFFFF;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .markdown-content h1 { font-size: 2rem; }
        .markdown-content h2 { font-size: 1.5rem; }
        .markdown-content h3 { font-size: 1.25rem; }

        /* パラグラフ */
        .markdown-content p {
          margin-bottom: 1.5rem;
        }

        /* リスト */
        .markdown-content ul,
        .markdown-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
        }

        /* リンク */
        .markdown-content a {
          color: #00D9FF;
          text-decoration: underline;
        }

        .markdown-content a:hover {
          color: #0099FF;
        }

        /* コード */
        .markdown-content code {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #00D9FF;
        }

        .markdown-content pre {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: #D1D5DB;
        }

        /* 引用 */
        .markdown-content blockquote {
          border-left: 4px solid #00D9FF;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #9CA3AF;
        }

        /* 画像 */
        .markdown-content img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        /* テーブル */
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }

        .markdown-content th,
        .markdown-content td {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          text-align: left;
        }

        .markdown-content th {
          background-color: rgba(0, 217, 255, 0.1);
          font-weight: 600;
          color: #FFFFFF;
        }

        /* 水平線 */
        .markdown-content hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
      `}</style>

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
                <li><a href="/simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</a></li>
                <li><a href="/#systems" className="hover:text-[#00D9FF] transition-colors">対応システム</a></li>
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
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-500">© 2025 TechTime株式会社. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

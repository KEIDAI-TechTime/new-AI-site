import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost, formatDate, BLOG_CATEGORIES } from '../../../services/notion-api';
import type { NotionPost } from '../../../types/notion';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NotionPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await getPost(slug);
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

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
              <Link to="/#features" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">特徴</Link>
              <Link to="/#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
              <Link to="/simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/blog" className="text-sm text-[#00D9FF] font-medium whitespace-nowrap">ブログ</Link>
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
              <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">特徴</Link>
              <Link to="/#systems" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">対応システム</Link>
              <Link to="/simulator" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">見積もり</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-[#00D9FF] font-medium hover:bg-white/5 rounded-lg transition-colors">ブログ</Link>
              <Link to="/cases" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">開発事例</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">会社概要</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">お問い合わせ</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00D9FF] transition-colors mb-8"
          >
            <i className="ri-arrow-left-line"></i>
            <span>ブログ一覧に戻る</span>
          </Link>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00D9FF] border-t-transparent"></div>
              <p className="text-gray-400 mt-4">読み込み中...</p>
            </div>
          ) : !post ? (
            <div className="text-center py-20">
              <i className="ri-file-damage-line text-6xl text-gray-600 mb-4"></i>
              <p className="text-gray-400">記事が見つかりませんでした</p>
              <Link
                to="/blog"
                className="mt-6 inline-block px-6 py-3 bg-[#00D9FF] text-[#0A1628] rounded-lg font-medium hover:bg-[#00F0FF] transition-colors"
              >
                ブログ一覧へ
              </Link>
            </div>
          ) : (
            <article className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="aspect-video overflow-hidden bg-white/5">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 lg:p-12">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-sm text-gray-400">{formatDate(post.createdAt)}</span>
                  {post.category && BLOG_CATEGORIES[post.category] && (
                    <span className="px-3 py-1 bg-[#00D9FF]/10 text-[#00D9FF] text-sm rounded-full">
                      {BLOG_CATEGORIES[post.category].name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8">
                  {post.title}
                </h1>

                {/* Content */}
                <div className="markdown-content text-gray-300 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
                <style>{`
                  .markdown-content {
                    font-size: 1.125rem;
                    line-height: 1.75;
                  }

                  /* 見出し */
                  .markdown-content h1,
                  .markdown-content h2,
                  .markdown-content h3,
                  .markdown-content h4,
                  .markdown-content h5,
                  .markdown-content h6 {
                    color: white;
                    font-weight: bold;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                  }

                  .markdown-content h1 { font-size: 2.25rem; }
                  .markdown-content h2 { font-size: 1.875rem; }
                  .markdown-content h3 { font-size: 1.5rem; }
                  .markdown-content h4 { font-size: 1.25rem; }

                  /* 段落 */
                  .markdown-content p {
                    color: #D1D5DB;
                    margin-bottom: 1.5rem;
                  }

                  /* リンク */
                  .markdown-content a {
                    color: #00D9FF;
                    text-decoration: none;
                    transition: all 0.2s;
                  }

                  .markdown-content a:hover {
                    text-decoration: underline;
                    color: #00F0FF;
                  }

                  /* 太字・強調 */
                  .markdown-content strong,
                  .markdown-content b {
                    color: white;
                    font-weight: 700;
                  }

                  /* イタリック */
                  .markdown-content em,
                  .markdown-content i {
                    font-style: italic;
                    color: #E5E7EB;
                  }

                  /* リスト */
                  .markdown-content ul,
                  .markdown-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #D1D5DB;
                  }

                  .markdown-content ul {
                    list-style-type: disc;
                  }

                  .markdown-content ol {
                    list-style-type: decimal;
                  }

                  .markdown-content li {
                    margin-bottom: 0.5rem;
                    padding-left: 0.5rem;
                  }

                  .markdown-content li::marker {
                    color: #00D9FF;
                  }

                  /* 画像 */
                  .markdown-content img {
                    border-radius: 1rem;
                    max-width: 100%;
                    height: auto;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                  }

                  /* 引用 */
                  .markdown-content blockquote {
                    border-left: 4px solid #00D9FF;
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    color: #E5E7EB;
                    font-style: italic;
                    background: rgba(0, 217, 255, 0.05);
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                  }

                  /* コード */
                  .markdown-content code {
                    background: rgba(255, 255, 255, 0.1);
                    color: #00D9FF;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                  }

                  .markdown-content pre {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                  }

                  .markdown-content pre code {
                    background: none;
                    padding: 0;
                    color: #E5E7EB;
                  }

                  /* テーブル */
                  .markdown-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 0.5rem;
                    overflow: hidden;
                  }

                  .markdown-content th,
                  .markdown-content td {
                    padding: 0.75rem 1rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                  }

                  .markdown-content th {
                    background: rgba(0, 217, 255, 0.1);
                    color: #00D9FF;
                    font-weight: 700;
                  }

                  .markdown-content td {
                    color: #D1D5DB;
                  }

                  .markdown-content tr:last-child td {
                    border-bottom: none;
                  }

                  /* 水平線 */
                  .markdown-content hr {
                    border: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    margin: 2rem 0;
                  }

                  /* 追加のスタイル調整 */
                  .markdown-content > *:first-child {
                    margin-top: 0;
                  }

                  .markdown-content > *:last-child {
                    margin-bottom: 0;
                  }
                `}</style>
              </div>
            </article>
          )}
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

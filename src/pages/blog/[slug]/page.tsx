import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost, formatDate } from '../../../services/wordpress';
import type { WordPressPost } from '../../../types/wordpress';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WordPressPost | null>(null);
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center">
                <i className="ri-code-s-slash-line text-lg sm:text-xl text-white"></i>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">TechTime</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors">ホーム</Link>
              <Link to="/blog" className="text-sm text-[#00D9FF] font-medium">ブログ</Link>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors">開発事例</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors">会社概要</Link>
              <Link to="/contact" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors">お問い合わせ</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">ホーム</Link>
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
              {/* Featured Image */}
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <div className="aspect-video overflow-hidden bg-white/5">
                  <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 lg:p-12">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
                  {post._embedded?.['wp:term']?.[0]?.map((term) => (
                    <span
                      key={term.id}
                      className="px-3 py-1 bg-[#00D9FF]/10 text-[#00D9FF] text-sm rounded-full"
                    >
                      {term.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                {/* Content */}
                <div
                  className="wp-content text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
                <style>{`
                  .wp-content {
                    font-size: 1.125rem;
                    line-height: 1.75;
                  }

                  /* 見出し */
                  .wp-content h1,
                  .wp-content h2,
                  .wp-content h3,
                  .wp-content h4,
                  .wp-content h5,
                  .wp-content h6 {
                    color: white;
                    font-weight: bold;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                  }

                  .wp-content h1 { font-size: 2.25rem; }
                  .wp-content h2 { font-size: 1.875rem; }
                  .wp-content h3 { font-size: 1.5rem; }
                  .wp-content h4 { font-size: 1.25rem; }

                  /* 段落 */
                  .wp-content p {
                    color: #D1D5DB;
                    margin-bottom: 1.5rem;
                  }

                  /* リンク */
                  .wp-content a {
                    color: #00D9FF;
                    text-decoration: none;
                    transition: all 0.2s;
                  }

                  .wp-content a:hover {
                    text-decoration: underline;
                    color: #00F0FF;
                  }

                  /* 太字・強調 */
                  .wp-content strong,
                  .wp-content b {
                    color: white;
                    font-weight: 700;
                  }

                  /* イタリック */
                  .wp-content em,
                  .wp-content i {
                    font-style: italic;
                    color: #E5E7EB;
                  }

                  /* リスト */
                  .wp-content ul,
                  .wp-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #D1D5DB;
                  }

                  .wp-content ul {
                    list-style-type: disc;
                  }

                  .wp-content ol {
                    list-style-type: decimal;
                  }

                  .wp-content li {
                    margin-bottom: 0.5rem;
                    padding-left: 0.5rem;
                  }

                  .wp-content li::marker {
                    color: #00D9FF;
                  }

                  /* 画像 */
                  .wp-content img {
                    border-radius: 1rem;
                    max-width: 100%;
                    height: auto;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                  }

                  /* WordPress画像クラス */
                  .wp-content .aligncenter {
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                  }

                  .wp-content .alignleft {
                    float: left;
                    margin-right: 1.5rem;
                    margin-bottom: 1rem;
                  }

                  .wp-content .alignright {
                    float: right;
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                  }

                  /* 引用 */
                  .wp-content blockquote {
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
                  .wp-content code {
                    background: rgba(255, 255, 255, 0.1);
                    color: #00D9FF;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                  }

                  .wp-content pre {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                  }

                  .wp-content pre code {
                    background: none;
                    padding: 0;
                    color: #E5E7EB;
                  }

                  /* テーブル */
                  .wp-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 0.5rem;
                    overflow: hidden;
                  }

                  .wp-content th,
                  .wp-content td {
                    padding: 0.75rem 1rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                  }

                  .wp-content th {
                    background: rgba(0, 217, 255, 0.1);
                    color: #00D9FF;
                    font-weight: 700;
                  }

                  .wp-content td {
                    color: #D1D5DB;
                  }

                  .wp-content tr:last-child td {
                    border-bottom: none;
                  }

                  /* 水平線 */
                  .wp-content hr {
                    border: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    margin: 2rem 0;
                  }

                  /* WordPress埋め込み */
                  .wp-content iframe,
                  .wp-content embed,
                  .wp-content object {
                    max-width: 100%;
                    margin: 2rem auto;
                    display: block;
                    border-radius: 0.5rem;
                  }

                  /* WordPressブロック */
                  .wp-content .wp-block-image,
                  .wp-content .wp-block-embed,
                  .wp-content .wp-block-video {
                    margin: 2rem 0;
                  }

                  /* figure */
                  .wp-content figure {
                    margin: 2rem 0;
                  }

                  .wp-content figcaption {
                    text-align: center;
                    font-size: 0.875rem;
                    color: #9CA3AF;
                    margin-top: 0.5rem;
                    font-style: italic;
                  }

                  /* WordPressボタン */
                  .wp-content .wp-block-button__link {
                    background: #00D9FF;
                    color: #0A1628;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    display: inline-block;
                    font-weight: 600;
                    transition: all 0.2s;
                  }

                  .wp-content .wp-block-button__link:hover {
                    background: #00F0FF;
                    transform: translateY(-2px);
                  }

                  /* 追加のスタイル調整 */
                  .wp-content > *:first-child {
                    margin-top: 0;
                  }

                  .wp-content > *:last-child {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2025 TechTime株式会社. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

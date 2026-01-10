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
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-a:text-[#00D9FF] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-bold
                    prose-ul:text-gray-300 prose-ol:text-gray-300
                    prose-li:text-gray-300
                    prose-img:rounded-xl prose-img:shadow-lg
                    prose-code:text-[#00D9FF] prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-white/10 prose-pre:border prose-pre:border-white/20"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
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

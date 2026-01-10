import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    systemType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d53rvljontabvievttfg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          company: '',
          name: '',
          email: '',
          phone: '',
          systemType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              <Link to="/systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
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
              <Link to="/systems" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-[#00D9FF] hover:bg-white/5 rounded-lg transition-colors">対応システム</Link>
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
      <div className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-4 sm:mb-6">
            <i className="ri-mail-line text-[#00D9FF]"></i>
            <span className="text-xs sm:text-sm text-[#00D9FF] font-medium">お問い合わせ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            詳しい相談をご希望の方
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
            要件のヒアリング、詳細見積もり、開発事例のご紹介など、<br className="hidden sm:block" />
            専門スタッフが丁寧にご対応いたします。
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12">
            <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  会社名 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors text-sm"
                  placeholder="株式会社サンプル"
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  お名前 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors text-sm"
                  placeholder="山田 太郎"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  メールアドレス <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors text-sm"
                  placeholder="example@company.co.jp"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors text-sm"
                  placeholder="03-1234-5678"
                />
              </div>

              {/* System Type */}
              <div>
                <label htmlFor="systemType" className="block text-sm font-medium text-gray-300 mb-2">
                  検討中のシステム種別 <span className="text-red-400">*</span>
                </label>
                <select
                  id="systemType"
                  name="systemType"
                  required
                  value={formData.systemType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00D9FF] transition-colors text-sm cursor-pointer"
                >
                  <option value="" className="bg-[#0A1628]">選択してください</option>
                  <option value="文書管理システム" className="bg-[#0A1628]">文書管理システム</option>
                  <option value="在庫管理システム" className="bg-[#0A1628]">在庫管理システム</option>
                  <option value="顧客・販売管理システム" className="bg-[#0A1628]">顧客・販売管理システム</option>
                  <option value="購買・調達管理システム" className="bg-[#0A1628]">購買・調達管理システム</option>
                  <option value="経営ダッシュボード（BI）" className="bg-[#0A1628]">経営ダッシュボード（BI）</option>
                  <option value="生産管理システム" className="bg-[#0A1628]">生産管理システム</option>
                  <option value="倉庫・物流管理システム" className="bg-[#0A1628]">倉庫・物流管理システム</option>
                  <option value="人事・給与システム" className="bg-[#0A1628]">人事・給与システム</option>
                  <option value="原価・会計システム" className="bg-[#0A1628]">原価・会計システム</option>
                  <option value="その他" className="bg-[#0A1628]">その他</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  ご予算 <span className="text-red-400">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00D9FF] transition-colors text-sm cursor-pointer"
                >
                  <option value="" className="bg-[#0A1628]">選択してください</option>
                  <option value="100万円未満" className="bg-[#0A1628]">100万円未満</option>
                  <option value="100万円〜300万円" className="bg-[#0A1628]">100万円〜300万円</option>
                  <option value="300万円〜500万円" className="bg-[#0A1628]">300万円〜500万円</option>
                  <option value="500万円〜1000万円" className="bg-[#0A1628]">500万円〜1000万円</option>
                  <option value="1000万円以上" className="bg-[#0A1628]">1000万円以上</option>
                  <option value="未定" className="bg-[#0A1628]">未定</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                  希望納期 <span className="text-red-400">*</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00D9FF] transition-colors text-sm cursor-pointer"
                >
                  <option value="" className="bg-[#0A1628]">選択してください</option>
                  <option value="1ヶ月以内" className="bg-[#0A1628]">1ヶ月以内</option>
                  <option value="2〜3ヶ月" className="bg-[#0A1628]">2〜3ヶ月</option>
                  <option value="3〜6ヶ月" className="bg-[#0A1628]">3〜6ヶ月</option>
                  <option value="6ヶ月以上" className="bg-[#0A1628]">6ヶ月以上</option>
                  <option value="未定" className="bg-[#0A1628]">未定</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  お問い合わせ内容 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors resize-none text-sm"
                  placeholder="ご要望やご質問をご記入ください（500文字以内）"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.message.length} / 500
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-green-400 text-sm text-center">
                    お問い合わせを受け付けました。担当者より3営業日以内にご連絡いたします。
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm text-center">
                    送信に失敗しました。お手数ですが、もう一度お試しください。
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-6">お電話でのお問い合わせ</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <i className="ri-phone-line text-[#00D9FF] text-xl w-6 h-6 flex items-center justify-center"></i>
                <a href="tel:0342223363" className="text-2xl font-bold text-white hover:text-[#00D9FF] transition-colors">
                  03-4222-3363
                </a>
              </div>
              <p className="text-sm text-gray-400">受付時間：月～金/9～19時</p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <i className="ri-mail-line text-[#00D9FF] text-xl w-6 h-6 flex items-center justify-center"></i>
                <a href="mailto:kdm@techtime-link.com" className="text-white hover:text-[#00D9FF] transition-colors">
                  kdm@techtime-link.com
                </a>
              </div>
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
                <li><a href="/systems" className="hover:text-[#00D9FF] transition-colors">対応システム</a></li>
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
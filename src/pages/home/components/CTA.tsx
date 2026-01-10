import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-8 leading-tight">
            まずは見積もりシミュレーターで<br />概算を確認
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            御社のシステム開発にかかる費用を、今すぐ確認できます。<br />
            打ち合わせや営業との面談は不要。数分で概算金額がわかります。
          </p>
          <Link
            to="/simulator"
            className="inline-flex items-center gap-3 bg-[#1E40AF] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#3B82F6] transition-all duration-300 hover:shadow-2xl hover:shadow-[#3B82F6]/30 hover:-translate-y-1 whitespace-nowrap cursor-pointer"
          >
            見積もりシミュレーターで概算を確認する
            <i className="ri-arrow-right-line text-2xl"></i>
          </Link>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0A1628] to-[#1E40AF] rounded-3xl p-12 lg:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-4">
              より詳しい相談をご希望の方
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              要件のヒアリング、詳細見積もり、開発事例のご紹介など、<br />
              専門スタッフが丁寧にご対応いたします。
            </p>
            
            <button className="bg-white text-[#1E40AF] px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl mb-12 whitespace-nowrap cursor-pointer">
              詳しい相談をする
            </button>

            {/* Contact Info */}
            <div className="border-t border-white/20 pt-8 space-y-4">
              <p className="text-white font-bold text-xl mb-4">お問い合わせ先</p>
              <div className="space-y-3 text-white/90">
                <p className="text-lg">
                  <strong className="text-white">TechTime株式会社</strong>
                </p>
                <p className="flex items-center justify-center gap-3 text-lg">
                  <i className="ri-phone-line text-[#00D9FF]"></i>
                  <span>TEL：03-4222-3363（月～金/9～19時）</span>
                </p>
                <p className="flex items-center justify-center gap-3 text-lg">
                  <i className="ri-mail-line text-[#00D9FF]"></i>
                  <span>Email：info@techtime-link.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 mx-6 bg-[#0A1628] rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* CTA Column */}
            <div className="space-y-8">
              <h4 className="text-3xl font-bold text-white leading-tight">
                今すぐ始めましょう
              </h4>
              <button 
                onClick={scrollToSimulator}
                className="px-6 py-3 border-2 border-white/50 text-white rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-md whitespace-nowrap cursor-pointer"
              >
                見積もりを確認
              </button>
            </div>

            {/* Services Column */}
            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white mb-6">サービス</h5>
              <ul className="space-y-3">
                {['AI駆動開発', '基幹システム開発', '見積もりシミュレーター', '運用保守サポート', '技術コンサルティング'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-[#00D9FF] transition-colors duration-300 text-base cursor-pointer">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h5 className="text-xl font-bold text-white mb-6">会社情報</h5>
              <ul className="space-y-3">
                {['会社概要', '採用情報', 'プライバシーポリシー', '利用規約', 'お問い合わせ'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-[#00D9FF] transition-colors duration-300 text-base cursor-pointer">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <p className="text-base text-white/90 leading-relaxed">
                最新情報をお届けします。<br />
                メールアドレスを登録してください。
              </p>
              <div className="flex items-center gap-0 mt-6">
                <input 
                  type="email" 
                  placeholder="メールアドレス"
                  className="flex-1 h-14 px-6 bg-[#1E293B] text-white rounded-l-xl border-2 border-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors duration-300"
                />
                <button className="w-14 h-14 bg-white rounded-r-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                  <i className="ri-arrow-right-line text-[#0A1628] text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 TechTime株式会社. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#00D9FF] transition-colors duration-300 cursor-pointer">
                  Powered by Readdy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

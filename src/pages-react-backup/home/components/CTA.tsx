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
                  <span>Email：kdm@techtime-link.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

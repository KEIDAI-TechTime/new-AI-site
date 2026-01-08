import { useState, useEffect } from 'react';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSimulator = () => {
    const simulator = document.getElementById('simulator');
    if (simulator) {
      simulator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#1E40AF] overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A1628]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://public.readdy.ai/ai/img_res/f9d4c1ab-ebd4-4e4b-be4d-f4769ec624da.png" alt="TechTime" className="h-10" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/90 hover:text-[#00D9FF] transition-colors duration-300 text-sm font-medium whitespace-nowrap cursor-pointer">特徴</a>
            <a href="#systems" className="text-white/90 hover:text-[#00D9FF] transition-colors duration-300 text-sm font-medium whitespace-nowrap cursor-pointer">対応システム</a>
            <a href="#simulator" className="text-white/90 hover:text-[#00D9FF] transition-colors duration-300 text-sm font-medium whitespace-nowrap cursor-pointer">見積もり</a>
            <a href="#faq" className="text-white/90 hover:text-[#00D9FF] transition-colors duration-300 text-sm font-medium whitespace-nowrap cursor-pointer">FAQ</a>
            <button onClick={scrollToSimulator} className="bg-[#00D9FF] text-[#0A1628] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00F0FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00D9FF]/50 whitespace-nowrap cursor-pointer">
              お問い合わせ
            </button>
          </div>
        </div>
      </nav>

      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              AI駆動開発で実現する、<span className="bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] bg-clip-text text-transparent">圧倒的低価格</span>の基幹システム
            </h1>
            <p className="text-2xl text-white/80 font-medium">
              従来の半分以下のコストで、御社専用システムを構築
            </p>
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              人手では日単位を要した設計・開発工程を、AIが数分で初版生成。圧倒的な開発効率化により、これまでにない低価格を実現しました。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={scrollToSimulator} className="bg-[#00D9FF] text-[#0A1628] px-8 py-4 rounded-2xl text-lg font-bold hover:bg-[#00F0FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#00D9FF]/50 hover:-translate-y-1 whitespace-nowrap cursor-pointer">
                見積もりシミュレーターで概算金額を確認
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-bold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                詳しく見る
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative transform rotate-6 hover:rotate-3 transition-transform duration-500">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20enterprise%20software%20dashboard%20interface%20with%20clean%20data%20visualization%20charts%20and%20analytics%20on%20dark%20blue%20background%20professional%20business%20intelligence%20system%20ui%20design%20minimalist%20style%20high%20tech%20appearance&width=600&height=700&seq=hero-dashboard-001&orientation=portrait" 
                  alt="Dashboard" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-8 top-20 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <i className="ri-speed-up-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm whitespace-nowrap">開発速度</p>
                    <p className="text-[#00D9FF] font-bold text-xl whitespace-nowrap">50倍高速</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-40 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm whitespace-nowrap">コスト削減</p>
                    <p className="text-[#00D9FF] font-bold text-xl whitespace-nowrap">50%以上</p>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-8 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <i className="ri-shield-check-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm whitespace-nowrap">品質保証</p>
                    <p className="text-[#00D9FF] font-bold text-xl whitespace-nowrap">自動テスト</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
}

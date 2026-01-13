import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#1E40AF] overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
              AI駆動開発で実現する、<span className="bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] bg-clip-text text-transparent">圧倒的低価格</span>の基幹システム
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 font-medium">
              従来の半分以下のコストで、御社専用システムを構築
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl">
              人手では日単位を要した設計・開発工程を、AIが数分で初版生成。圧倒的な開発効率化により、これまでにない低価格を実現しました。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link to="/simulator" className="bg-[#00D9FF] text-[#0A1628] px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-bold hover:bg-[#00F0FF] transition-all duration-300 hover:shadow-2xl hover:shadow-[#00D9FF]/50 hover:-translate-y-1 cursor-pointer text-center">
                見積もりシミュレーターで概算金額を確認
              </Link>
            </div>
          </div>

          {/* Right Visual - Desktop Only */}
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

          {/* Mobile Stats */}
          <div className="grid grid-cols-3 gap-3 lg:hidden mt-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 text-center">
              <i className="ri-speed-up-line text-[#00D9FF] text-2xl mb-1"></i>
              <p className="text-white font-bold text-xs">開発速度</p>
              <p className="text-[#00D9FF] font-bold text-sm">50倍高速</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 text-center">
              <i className="ri-money-dollar-circle-line text-[#00D9FF] text-2xl mb-1"></i>
              <p className="text-white font-bold text-xs">コスト削減</p>
              <p className="text-[#00D9FF] font-bold text-sm">50%以上</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 text-center">
              <i className="ri-shield-check-line text-[#00D9FF] text-2xl mb-1"></i>
              <p className="text-white font-bold text-xs">品質保証</p>
              <p className="text-[#00D9FF] font-bold text-sm">自動テスト</p>
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

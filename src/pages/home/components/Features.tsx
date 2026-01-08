import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      icon: 'ri-calculator-line',
      title: '見積もりシミュレーター',
      subtitle: '打ち合わせ不要、その場で概算金額がわかる',
      description: 'システム種別と規模を選択するだけで、即座に概算見積もりを表示。営業との打ち合わせや見積もり待ちの時間は不要です。予算検討の初期段階から、具体的な金額感を把握できます。',
      link: '/simulator'
    },
    {
      icon: 'ri-robot-2-line',
      title: 'AI駆動開発',
      subtitle: '設計からテストまで、AIが開発を加速',
      description: '要件定義から外部設計、内部設計、コード生成、テスト仕様作成、テスト実行まで、AIが一貫してサポート。従来は日単位を要した各工程を数分～数十分で初版生成し、開発期間を大幅に短縮します。',
      link: '/ai-development'
    },
    {
      icon: 'ri-shield-check-line',
      title: '品質保証',
      subtitle: '多段階レビューと自動テストで確実な品質',
      description: '構造化された設計テンプレート、多段階レビュー、実行確認による早期検証、自動テストによる品質チェックなど、複数の品質担保の仕組みを組み合わせています。',
      link: '/quality-assurance'
    }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
            TechTimeが選ばれる理由
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI技術を活用した革新的な開発手法で、高品質なシステムを低価格・短納期で提供します
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 cursor-pointer"
            >
              {/* Icon Area */}
              <div className="h-64 bg-gradient-to-br from-[#0A1628] via-[#1E40AF] to-[#3B82F6] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <i className={`${feature.icon} text-white text-7xl group-hover:rotate-12 transition-transform duration-500`}></i>
                  </div>
                  <div className="absolute inset-0 bg-[#00D9FF]/30 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-[#0A1628] group-hover:text-[#1E40AF] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-base font-semibold text-[#3B82F6]">
                  {feature.subtitle}
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-4">
                  {feature.link ? (
                    <Link 
                      to={feature.link}
                      className="text-[#00D9FF] font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300 cursor-pointer"
                    >
                      詳しく見る
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  ) : (
                    <span className="text-[#00D9FF] font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300 cursor-pointer">
                      詳しく見る
                      <i className="ri-arrow-right-line"></i>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AIDevelopment() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
            なぜ、圧倒的な低価格を実現できるのか
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Traditional Development */}
          <div className="bg-gray-100 rounded-3xl p-10 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-400 rounded-2xl flex items-center justify-center">
                <i className="ri-user-line text-white text-3xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">従来の開発</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className="ri-time-line text-gray-600 text-xl"></i>
                <p className="text-gray-700 text-lg">外部設計書作成：<span className="font-bold">2～3日</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-time-line text-gray-600 text-xl"></i>
                <p className="text-gray-700 text-lg">内部設計書作成：<span className="font-bold">1～2日</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-time-line text-gray-600 text-xl"></i>
                <p className="text-gray-700 text-lg">コード作成：<span className="font-bold">3～5日</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-time-line text-gray-600 text-xl"></i>
                <p className="text-gray-700 text-lg">単体テスト仕様作成：<span className="font-bold">1～2日</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-time-line text-gray-600 text-xl"></i>
                <p className="text-gray-700 text-lg">単体テスト実行：<span className="font-bold">1～2日</span></p>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-300">
              <p className="text-2xl font-bold text-gray-800">合計：<span className="text-3xl">8～14日</span></p>
              <p className="text-sm text-gray-600 mt-2">（一機能あたり）</p>
            </div>
          </div>

          {/* AI-Driven Development */}
          <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D9FF]/20 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-16 h-16 bg-[#00D9FF] rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-robot-2-line text-[#0A1628] text-3xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-white">AI駆動開発</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <i className="ri-flashlight-line text-[#00D9FF] text-xl"></i>
                <p className="text-white text-lg">外部設計書初版生成：<span className="font-bold">約10分</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-flashlight-line text-[#00D9FF] text-xl"></i>
                <p className="text-white text-lg">内部設計書初版生成：<span className="font-bold">約4分</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-flashlight-line text-[#00D9FF] text-xl"></i>
                <p className="text-white text-lg">コード初版生成：<span className="font-bold">約1.5分</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-flashlight-line text-[#00D9FF] text-xl"></i>
                <p className="text-white text-lg">単体テスト仕様初版生成：<span className="font-bold">約6分</span></p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-flashlight-line text-[#00D9FF] text-xl"></i>
                <p className="text-white text-lg">単体テスト実行・報告書生成：<span className="font-bold">約3分</span></p>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-white/30 relative z-10">
              <p className="text-2xl font-bold text-white">合計：<span className="text-4xl text-[#00D9FF]">約25分</span></p>
              <p className="text-sm text-white/90 mt-2">（一機能あたりの初版生成）</p>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex justify-center -mt-32 mb-12 relative z-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">VS</span>
          </div>
        </div>

        {/* Development Process */}
        <div className="mt-32 space-y-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#0A1628] mb-4">開発の流れ</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AIが各工程を自動化し、人間は本質的なレビューと意思決定に集中できます
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: '業務機能記述・概要設計',
                description: 'お客様の要件をヒアリングし、システム概要を定義',
                icon: 'ri-file-list-3-line'
              },
              {
                step: 2,
                title: 'AI駆動での設計・開発',
                description: 'AIが設計書とコードを自動生成。実行結果を確認しながら設計を洗練',
                icon: 'ri-robot-2-line'
              },
              {
                step: 3,
                title: 'レビューとチューニング',
                description: 'AI生成物を人間がレビュー。要件との整合性を確認し修正指示',
                icon: 'ri-search-eye-line'
              },
              {
                step: 4,
                title: 'テスト',
                description: 'AIが単体テスト仕様を自動生成。自動テスト実行により品質を担保',
                icon: 'ri-checkbox-circle-line'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full space-y-4">
                  <div className="text-8xl font-bold text-[#00D9FF]/10 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-[#3B82F6] mb-2">Step {item.step}</p>
                    <h4 className="text-xl font-bold text-[#0A1628] mb-4 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-base text-gray-600 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <i className={`${item.icon} text-[#3B82F6] text-3xl`}></i>
                    </div>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <i className="ri-arrow-right-line text-[#3B82F6] text-2xl animate-pulse"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="mt-32 bg-[#0F172A] rounded-3xl p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-block px-4 py-2 bg-[#00D9FF] rounded-full">
                <span className="text-[#0A1628] font-bold text-sm">品質担保</span>
              </div>
              <h3 className="text-4xl font-bold text-white leading-tight">
                品質担保の仕組み
              </h3>
              <div className="space-y-4 text-white/85 text-base leading-relaxed">
                <p>
                  AIによる初版生成は驚異的なスピードですが、品質も重要です。TechTimeでは以下の方法で品質を担保します：
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1"></i>
                    <span><strong className="text-white">構造化された設計テンプレート</strong> - 長年の開発経験から培った設計の「型」をAIに学習させ、一貫性のある設計書を生成</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1"></i>
                    <span><strong className="text-white">多段階レビュー</strong> - AI生成物に対して、要件視点での本質的なレビューを実施</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1"></i>
                    <span><strong className="text-white">実行確認による早期検証</strong> - 設計段階からコードを生成し実行することで、後工程でのギャップ発生リスクを低減</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1"></i>
                    <span><strong className="text-white">自動テスト</strong> - テスト仕様の生成から実行まで自動化し、基礎品質を底上げ</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <img 
                src="https://readdy.ai/api/search-image?query=software%20quality%20assurance%20testing%20process%20with%20automated%20checks%20and%20validation%20on%20clean%20minimal%20light%20background%20modern%20development%20workflow%20simple%20elegant%20professional%20style&width=500&height=600&seq=qa-process-001&orientation=portrait" 
                alt="Quality Assurance"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="mt-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border-2 border-gray-200">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-white text-3xl"></i>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#0A1628] mb-4">セキュリティへの配慮</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                AI開発環境においても、お客様の情報資産を厳重に保護します
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-database-2-line', title: 'データの分離管理', desc: 'お客様ごとに開発環境を分離し、データの混在を防止' },
              { icon: 'ri-lock-line', title: 'アクセス制御', desc: '開発メンバーのアクセス権限を厳格に管理' },
              { icon: 'ri-key-line', title: 'データ暗号化', desc: '設計書、ソースコード、テストデータなどすべて暗号化して保存' },
              { icon: 'ri-eye-off-line', title: 'AI学習への非利用', desc: 'お客様のデータをAIモデルの学習には一切使用しません' },
              { icon: 'ri-shield-star-line', title: 'セキュアな開発環境', desc: '外部からの不正アクセスを防ぐ、多層防御のセキュリティ対策' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-[#3B82F6] text-2xl`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#0A1628] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

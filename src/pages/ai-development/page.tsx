import { Link } from 'react-router-dom';

export default function AIDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center">
                <i className="ri-code-s-slash-line text-xl text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">TechTime</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/#features" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">特徴</Link>
              <Link to="/#systems" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">対応システム</Link>
              <Link to="/simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">開発事例</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">会社概要</Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 bg-white">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-6 py-2 bg-[#00D9FF]/20 border border-[#00D9FF]/30 rounded-full mb-8">
                <span className="text-[#00D9FF] font-bold text-sm">AI DRIVEN DEVELOPMENT</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
                AI駆動開発
              </h1>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                設計からテストまで、AIが開発を加速
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="px-10 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#00D9FF]/40 transition-all duration-300 whitespace-nowrap text-lg">
                  AI駆動開発について相談する
                </Link>
                <Link to="/simulator" className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 whitespace-nowrap text-lg">
                  見積もりシミュレーターを試す
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is AI-Driven Development */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">AI駆動開発とは</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="https://readdy.ai/api/search-image?query=artificial%20intelligence%20powered%20software%20development%20automation%20with%20code%20generation%20and%20testing%20on%20clean%20minimal%20light%20background%20modern%20technology%20workflow%20elegant%20professional%20style%20futuristic%20digital%20transformation&width=600&height=500&seq=ai-dev-concept-001&orientation=landscape" 
                  alt="AI駆動開発"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  従来の開発では、設計書の作成やコーディング、テスト仕様書の作成など、多くの工程で人手による「書き下す作業」に膨大な時間を要していました。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  TechTimeのAI駆動開発では、生成AIを活用してこれらの工程の<strong className="text-[#3B82F6]">初版を数分で自動生成</strong>。人間はその初版をベースに修正・チューニングを行い、開発スピードと品質の両立を実現します。
                </p>
                <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-2xl p-8 border-2 border-[#00D9FF]/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-flashlight-line text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1628] mb-2">圧倒的なスピード</h3>
                      <p className="text-gray-700">日単位の作業を数分で初版生成し、開発期間を大幅に短縮します。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speed Comparison */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">圧倒的な初版生成スピード</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                従来開発 vs AI駆動開発（一機能あたり）
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
                    <tr>
                      <th className="px-8 py-6 text-left text-white font-bold text-lg">工程</th>
                      <th className="px-8 py-6 text-left text-white font-bold text-lg">従来開発</th>
                      <th className="px-8 py-6 text-left text-white font-bold text-lg">AI駆動開発（初版）</th>
                      <th className="px-8 py-6 text-left text-white font-bold text-lg">短縮効果</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { process: '外部設計書作成', traditional: '2～3日', ai: '約10分', reduction: '99%短縮' },
                      { process: '内部設計書作成', traditional: '1～2日', ai: '約4分', reduction: '99%短縮' },
                      { process: 'コード作成', traditional: '3～5日', ai: '約1.5分', reduction: '99%短縮' },
                      { process: 'テスト仕様作成', traditional: '1～2日', ai: '約6分', reduction: '99%短縮' },
                      { process: 'テスト実行', traditional: '1～2日', ai: '約3分', reduction: '99%短縮' }
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-8 py-6 font-semibold text-[#0A1628]">{row.process}</td>
                        <td className="px-8 py-6 text-gray-700">{row.traditional}</td>
                        <td className="px-8 py-6 text-[#00D9FF] font-bold">{row.ai}</td>
                        <td className="px-8 py-6">
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#3B82F6]/20 text-[#1E40AF] font-bold rounded-lg">
                            {row.reduction}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 border-t-4 border-[#00D9FF]">
                      <td className="px-8 py-6 font-bold text-[#0A1628] text-lg">合計</td>
                      <td className="px-8 py-6 font-bold text-gray-800 text-lg">8～14日</td>
                      <td className="px-8 py-6 font-bold text-[#00D9FF] text-xl">約25分</td>
                      <td className="px-8 py-6">
                        <span className="inline-block px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] text-white font-bold rounded-xl text-lg shadow-lg">
                          初版完成
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                人手では日単位を要した作業を、AIがわずか数分で初版生成。<br />
                そこから人間が修正・ブラッシュアップすることで、トータルの開発期間を大幅に短縮します。
              </p>
            </div>
          </div>
        </section>

        {/* AI and Human Roles */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">AIと人間の役割分担</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* AI Role */}
              <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D9FF]/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-[#00D9FF] rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                    <i className="ri-robot-2-line text-[#0A1628] text-4xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">AIが担う領域</h3>
                  <p className="text-xl mb-8 text-white/90">圧倒的スピードでの初版生成</p>
                  <ul className="space-y-4">
                    {[
                      '設計書のドラフト作成（画面、帳票、処理フロー、項目マッピング）',
                      'コードの初版生成',
                      'テスト仕様の自動生成',
                      '繰り返し作業の自動化',
                      '一貫性のある成果物の作成'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1 flex-shrink-0"></i>
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Human Role */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border-2 border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                  <i className="ri-user-star-line text-white text-4xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#0A1628] mb-6">人間が担う領域</h3>
                <p className="text-xl mb-8 text-gray-600">本質的なレビューと修正</p>
                <ul className="space-y-4">
                  {[
                    '要件の理解と定義',
                    'AI生成物のレビューと修正',
                    '業務ロジックの妥当性判断',
                    '細かなチューニング',
                    '品質の最終判断',
                    'お客様とのコミュニケーション'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-[#3B82F6] text-xl mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Development Flow */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">開発フロー</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="space-y-8">
              {[
                {
                  phase: 'Phase 1',
                  title: '要件定義',
                  role: '人間',
                  description: 'お客様の業務フローや課題を詳細にヒアリングし、システム要件を明確化します。',
                  icon: 'ri-file-list-3-line',
                  color: 'from-[#3B82F6] to-[#1E40AF]'
                },
                {
                  phase: 'Phase 2',
                  title: 'AIによる初版生成',
                  role: '数分',
                  description: '要件定義書をもとに、AIが外部設計書、内部設計書、プログラムコード、単体テスト仕様を自動生成。生成時間：わずか約25分',
                  icon: 'ri-robot-2-line',
                  color: 'from-[#00D9FF] to-[#0099FF]',
                  highlight: true
                },
                {
                  phase: 'Phase 3',
                  title: '人間によるレビューと修正',
                  role: '人間',
                  description: '経験豊富なエンジニアがAI生成物をレビューし、要件との整合性確認、業務ロジックの妥当性チェック、細かな仕様の調整、コードの最適化を実施。',
                  icon: 'ri-search-eye-line',
                  color: 'from-[#3B82F6] to-[#1E40AF]'
                },
                {
                  phase: 'Phase 4',
                  title: '実行確認とチューニング',
                  role: '人間',
                  description: '実際にシステムを動かして動作を確認。設計段階から実物で確認できるため、後工程での手戻りを最小化します。',
                  icon: 'ri-settings-3-line',
                  color: 'from-[#3B82F6] to-[#1E40AF]'
                },
                {
                  phase: 'Phase 5',
                  title: 'テストと品質チェック',
                  role: 'AI + 人間',
                  description: 'AIが自動テストを実行し、人間が結果を確認。必要に応じて修正を繰り返します。',
                  icon: 'ri-checkbox-circle-line',
                  color: 'from-[#00D9FF] to-[#0099FF]'
                },
                {
                  phase: 'Phase 6',
                  title: '納品',
                  role: '完了',
                  description: '品質が担保されたシステムを納品します。',
                  icon: 'ri-gift-line',
                  color: 'from-[#3B82F6] to-[#1E40AF]'
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className={`${item.highlight ? 'bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 border-4 border-[#00D9FF]' : 'bg-white border-2 border-gray-200'} rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <i className={`${item.icon} text-white text-3xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm font-bold text-[#3B82F6]">{item.phase}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">{item.role}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#0A1628] mb-3">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  {index < 5 && (
                    <div className="flex justify-center my-4">
                      <i className="ri-arrow-down-line text-[#3B82F6] text-3xl"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concrete Example */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">初版生成の具体例</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600">実際のAI生成プロセス（請求書出力機能の場合）</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border-2 border-gray-200">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">業務機能記述（人間が作成）</h3>
                    <p className="text-gray-700">「対象の伝票を選択し、請求書を出力する機能」</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">外部設計書初版生成（AI：約10分）</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        画面レイアウト
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        帳票レイアウト（ヘッダー、明細、合計欄）
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        処理フロー
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        画面項目マップ
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        帳票項目マップ
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">内部設計書初版生成（AI：約4分）</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        データ取得ロジック
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        帳票生成ロジック
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        エラーハンドリング
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">コード初版生成（AI：約1.5分）</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        実行可能なプログラムコード
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        データベースアクセス処理
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        帳票生成処理
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">単体テスト仕様・実行（AI：約6分 + 3分）</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        正常系・異常系のテストケース
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        自動テスト実行
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#00D9FF] w-4 h-4 flex items-center justify-center"></i>
                        テスト結果報告書
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] rounded-2xl p-8 text-center">
                  <p className="text-white text-2xl font-bold">合計：約25分で動くものが完成</p>
                </div>

                <div className="flex justify-center my-8">
                  <i className="ri-arrow-down-line text-[#3B82F6] text-4xl"></i>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                    6
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">人間によるレビューと修正</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#3B82F6] w-4 h-4 flex items-center justify-center"></i>
                        帳票の細かなレイアウト調整
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#3B82F6] w-4 h-4 flex items-center justify-center"></i>
                        業務特有のロジックの追加
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#3B82F6] w-4 h-4 flex items-center justify-center"></i>
                        エラーメッセージの調整
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="ri-checkbox-line text-[#3B82F6] w-4 h-4 flex items-center justify-center"></i>
                        パフォーマンスの最適化
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Initial Version Matters */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">なぜ「初版」が重要なのか</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-100 rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-400 rounded-2xl flex items-center justify-center">
                    <i className="ri-close-circle-line text-white text-3xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">従来の開発の課題</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'ゼロから書き下す作業に時間がかかる',
                    '完成するまで動くものが見えない',
                    '後工程で「思っていたのと違う」が発生'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-close-line text-gray-600 text-xl mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-3xl p-10 border-2 border-[#00D9FF]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="ri-checkbox-circle-line text-white text-3xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold text-[#0A1628]">AI駆動開発の利点</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    '初版がわずか数分で完成',
                    '設計段階から動くものを確認できる',
                    '人間は「書く」ではなく「修正する」作業に集中',
                    '手戻りが大幅に減少'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1 flex-shrink-0"></i>
                      <span className="text-gray-800 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Results */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">開発スピードの実績</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600">実プロジェクトでの効果</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { metric: '設計～開発工程', value: '50%', label: '短縮' },
                { metric: 'プロジェクト全体', value: '30～45%', label: '短縮' },
                { metric: '手戻り工数', value: '60%', label: '削減' }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-3xl p-10 text-center border-2 border-[#00D9FF]/30 hover:shadow-2xl transition-all duration-300">
                  <p className="text-gray-700 font-semibold mb-4">{item.metric}</p>
                  <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mb-2">
                    {item.value}
                  </p>
                  <p className="text-2xl font-bold text-[#0A1628]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Impact */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">品質への影響</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AIによる初版生成は驚異的なスピードですが、品質を犠牲にすることはありません。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-6">初版の品質</h3>
                <ul className="space-y-4">
                  {[
                    '構造化された設計テンプレートに基づき一貫性のある設計',
                    '基本的な論理チェックは完了',
                    '動作確認可能なレベルのコード'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-[#3B82F6] text-xl mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#3B82F6]/10 rounded-3xl p-10 border-2 border-[#00D9FF]">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-6">人間の修正により到達する品質</h3>
                <ul className="space-y-4">
                  {[
                    '業務要件に完全に適合',
                    '細部まで調整された使いやすいUI',
                    '最適化されたパフォーマンス',
                    '徹底的にテストされた高品質'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="ri-star-fill text-[#00D9FF] text-xl mt-1 flex-shrink-0"></i>
                      <span className="text-gray-800 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">技術スタック</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-robot-2-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-4">使用している生成AI</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 大規模言語モデル（LLM）による設計書生成</li>
                  <li>• コード生成AI</li>
                  <li>• テスト自動化AI</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-code-s-slash-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-4">対応言語・フレームワーク</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Java, Python, JavaScript, TypeScript</li>
                  <li>• React, Vue.js, Angular</li>
                  <li>• Spring Boot, Django, Express</li>
                  <li>• PostgreSQL, MySQL, MongoDB</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-cloud-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-4">対応インフラ</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• AWS, Azure, GCP</li>
                  <li>• オンプレミス環境</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-extrabold text-[#0A1628] mb-6">お客様の声</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center">
                    <i className="ri-building-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-[#0A1628]">製造業 A社様</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  「設計段階から実際に動くシステムを見られたので、安心して進められました。修正も素早く、こちらの要望がすぐに反映されるのが良かったです。」
                </p>
              </div>

              <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center">
                    <i className="ri-store-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-[#0A1628]">サービス業 B社様</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  「従来は設計書のレビューだけで1週間かかっていましたが、AI駆動開発では初版が数分で出来上がり、あとは修正するだけ。開発期間が半分になりました。」
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#00D9FF] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-extrabold text-white mb-8">
              AI駆動開発で、<br />あなたのプロジェクトを加速させませんか？
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              従来の半分以下のコストと期間で、高品質なシステムを実現します。<br />
              まずは見積もりシミュレーターで概算金額を確認してください。
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="px-10 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#00D9FF]/40 transition-all duration-300 whitespace-nowrap text-lg">
                AI駆動開発について相談する
              </Link>
              <Link to="/simulator" className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 whitespace-nowrap text-lg">
                見積もりシミュレーターを試す
              </Link>
            </div>
          </div>
        </section>
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
                <li><Link to="/simulator" className="hover:text-[#00D9FF] transition-colors">見積もりシミュレーター</Link></li>
                <li><Link to="/#systems" className="hover:text-[#00D9FF] transition-colors">対応システム</Link></li>
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
                  <a href="mailto:info@techtime-link.com" className="hover:text-[#00D9FF] transition-colors">info@techtime-link.com</a>
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

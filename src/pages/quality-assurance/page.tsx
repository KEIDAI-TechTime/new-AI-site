import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function QualityAssurancePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const qualityPillars = [
    {
      icon: 'ri-file-list-3-line',
      title: '構造化された設計テンプレート',
      description: '長年の開発経験から培った設計の「型」をAIに学習させています。',
      details: [
        '画面設計の標準フォーマット',
        '帳票設計の標準フォーマット',
        '処理フローの記述規則',
        '項目マッピングの標準化'
      ]
    },
    {
      icon: 'ri-search-eye-line',
      title: '多段階レビュー体制',
      description: 'AI生成物は、必ず複数の人間によるレビューを経ます。',
      details: [
        '第1段階：技術レビュー（設計書の論理的整合性、コード品質、セキュリティ）',
        '第2段階：業務レビュー（要件との整合性、業務ロジックの妥当性、ユーザビリティ）',
        '第3段階：品質レビュー（テスト網羅性、パフォーマンス、最終品質判定）'
      ]
    },
    {
      icon: 'ri-play-circle-line',
      title: '実行確認による早期検証',
      description: '設計段階から実際に動くコードを生成し、動作確認を行います。',
      details: [
        '画面の見た目を実際に確認',
        '処理フローが設計通りに動作するか確認',
        '後工程での「思っていたのと違う」を防止'
      ]
    },
    {
      icon: 'ri-robot-2-line',
      title: '自動テストによる品質担保',
      description: 'AIがテスト仕様を自動生成し、自動テストを実行します。',
      details: [
        '単体テスト：各機能の動作確認、正常系・異常系の網羅的なテスト',
        '結合テスト：機能間の連携確認、データフローの確認',
        '総合テスト：業務シナリオに沿った動作確認、パフォーマンステスト'
      ]
    },
    {
      icon: 'ri-refresh-line',
      title: '継続的な品質改善',
      description: 'プロジェクトで発見された課題や改善点は、AIの学習データにフィードバックされ、次のプロジェクトの品質向上に活かされます。',
      details: []
    }
  ];

  const qualityMetrics = [
    {
      icon: 'ri-bug-line',
      label: 'バグ発生率',
      value: '0.1件/機能未満',
      description: 'リリース後1ヶ月以内の重大バグ'
    },
    {
      icon: 'ri-shield-check-line',
      label: 'テストカバレッジ',
      value: '90%以上',
      description: 'コードカバレッジ'
    },
    {
      icon: 'ri-checkbox-circle-line',
      label: 'レビュー完了率',
      value: '100%',
      description: '設計書・コードのレビュー完了率'
    },
    {
      icon: 'ri-star-line',
      label: '顧客満足度',
      value: '4.5/5.0以上',
      description: '納品後の品質満足度'
    }
  ];

  const securityMeasures = [
    { icon: 'ri-database-2-line', title: 'データの分離管理', desc: 'お客様ごとに開発環境を分離し、データの混在を防止' },
    { icon: 'ri-lock-line', title: 'アクセス制御', desc: '開発メンバーのアクセス権限を厳格に管理' },
    { icon: 'ri-key-line', title: 'データ暗号化', desc: '設計書、ソースコード、テストデータなどすべて暗号化して保存' },
    { icon: 'ri-eye-off-line', title: 'AI学習への非利用', desc: 'お客様のデータをAIモデルの学習には一切使用しません' },
    { icon: 'ri-shield-star-line', title: 'セキュアな開発環境', desc: '外部からの不正アクセスを防ぐ、多層防御のセキュリティ対策' }
  ];

  const documents = [
    '外部設計書',
    '内部設計書',
    'プログラムソースコード',
    '単体テスト仕様書・結果報告書',
    '結合テスト仕様書・結果報告書',
    '総合テスト仕様書・結果報告書',
    '操作マニュアル',
    '保守運用マニュアル'
  ];

  const faqs = [
    {
      question: 'AIが作ったコードは本当に信頼できますか？',
      answer: 'AIはあくまで初版を生成するツールです。生成されたコードは必ず経験豊富なエンジニアがレビューし、修正・最適化を行います。最終的な品質判断は人間が行います。'
    },
    {
      question: 'バグが発生した場合の対応は？',
      answer: '納品後1ヶ月間の導入支援期間中は無償で対応いたします。それ以降は保守契約に基づき対応いたします。'
    },
    {
      question: 'セキュリティテストは実施されますか？',
      answer: 'はい、総合テストの一環としてセキュリティテストを実施します。脆弱性スキャン、認証テスト、権限テストなどを行います。'
    },
    {
      question: '従来の開発と比べて品質は劣りませんか？',
      answer: 'いいえ。多段階レビュー、自動テスト、実行確認などにより、従来の開発と同等以上の品質を実現しています。むしろ、早期の実行確認により手戻りが減り、品質が向上するケースが多いです。'
    },
    {
      question: '納品後のサポートはありますか？',
      answer: 'はい、納品後1ヶ月間の導入支援に加え、月額保守契約により継続的なサポートを提供できます。'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <img
                src="/images/logo.png"
                alt="TechTime"
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-[#1E40AF] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                ホーム
              </Link>
              <Link to="/simulator" className="text-gray-700 hover:text-[#1E40AF] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                見積もり
              </Link>
              <Link to="/cases" className="text-gray-700 hover:text-[#1E40AF] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                事例
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#1E40AF] transition-colors duration-300 whitespace-nowrap cursor-pointer">
                会社概要
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-2.5 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] text-white rounded-full hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] via-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-[#00D9FF] rounded-full mb-4">
              <span className="text-[#0A1628] font-bold text-sm">QUALITY ASSURANCE</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              品質保証
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              多段階レビューと自動テストで確実な品質
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              AI駆動開発は圧倒的なスピードを実現しますが、品質を犠牲にすることは一切ありません。
            </p>
            <p className="text-2xl font-bold text-[#0A1628]">
              TechTimeでは、複数の品質保証の仕組みを組み合わせることで、高品質なシステムを提供します。
            </p>
          </div>
        </div>
      </section>

      {/* 5 Quality Pillars */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              5つの品質保証の柱
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
          </div>

          <div className="space-y-8">
            {qualityPillars.map((pillar, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <i className={`${pillar.icon} text-white text-3xl`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-[#00D9FF]/20">{index + 1}</span>
                      <h3 className="text-2xl font-bold text-[#0A1628]">{pillar.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {pillar.description}
                    </p>
                    {pillar.details.length > 0 && (
                      <ul className="space-y-2">
                        {pillar.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <i className="ri-checkbox-circle-fill text-[#00D9FF] text-xl mt-1 flex-shrink-0"></i>
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              品質指標
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#00D9FF] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className={`${metric.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">{metric.label}</h3>
                <p className="text-3xl font-extrabold text-[#00D9FF] mb-2">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Quality */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              セキュリティ品質
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              品質保証には、セキュリティも含まれます。
            </p>
          </div>

          {/* Development Security */}
          <div className="bg-white rounded-3xl p-10 shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 flex items-center gap-3">
              <i className="ri-code-s-slash-line text-[#3B82F6] text-3xl"></i>
              開発段階でのセキュリティ対策
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'セキュアコーディング規約の遵守',
                '脆弱性の自動スキャン',
                '認証・認可機能の厳密な実装',
                'データ暗号化の徹底'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <i className="ri-shield-check-line text-[#00D9FF] text-xl"></i>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Environment Security */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <i className="ri-robot-2-line text-[#00D9FF] text-3xl"></i>
              AI開発環境のセキュリティ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityMeasures.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-[#00D9FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-[#00D9FF] text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Test Example */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              テスト実施例
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">あるシステムでのテスト実績</p>
          </div>

          <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl p-10 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <i className="ri-file-list-3-line text-[#00D9FF] text-3xl"></i>
                  <div>
                    <p className="text-sm text-white/80">テストケース数</p>
                    <p className="text-3xl font-bold">2,500件</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <i className="ri-time-line text-[#00D9FF] text-3xl"></i>
                  <div>
                    <p className="text-sm text-white/80">テスト実行時間</p>
                    <p className="text-xl font-bold">従来3週間 → AI駆動で3日</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <i className="ri-bug-line text-[#00D9FF] text-3xl"></i>
                  <div>
                    <p className="text-sm text-white/80">検出バグ数</p>
                    <p className="text-3xl font-bold">45件</p>
                    <p className="text-sm text-white/80">（全て開発段階で修正）</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <i className="ri-checkbox-circle-line text-[#00D9FF] text-3xl"></i>
                  <div>
                    <p className="text-sm text-white/80">リリース後の重大バグ</p>
                    <p className="text-3xl font-bold">0件</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Documents */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              品質保証ドキュメント
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">納品時には以下のドキュメントを提供します</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-2xl"></i>
                </div>
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              お客様の声
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-[#00D9FF] text-xl"></i>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                「AI開発と聞いて最初は品質面で不安がありましたが、実際には従来の開発よりも品質が高く、納品後のトラブルもほとんどありませんでした。」
              </p>
              <p className="text-sm font-bold text-[#0A1628]">製造業 A社様</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-[#00D9FF] text-xl"></i>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                「設計段階から実際の動きを確認できたので、認識のズレがなく、スムーズに導入できました。」
              </p>
              <p className="text-sm font-bold text-[#0A1628]">サービス業 B社様</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A1628] mb-4">
              よくある質問
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#0A1628] mb-4 flex items-start gap-3">
                  <i className="ri-question-line text-[#00D9FF] text-2xl flex-shrink-0"></i>
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-20 bg-gradient-to-br from-[#0A1628] via-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              品質へのこだわり
            </h2>
            <p className="text-2xl text-white/90 font-bold">
              TechTimeは、スピードと品質の両立を実現します。
            </p>
            <p className="text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
              AI駆動開発による圧倒的なスピードは、決して品質を犠牲にした結果ではありません。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {[
                '構造化された設計',
                '多段階のレビュー',
                '早期の実行確認',
                '徹底的な自動テスト',
                '厳格なセキュリティ対策'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 justify-center">
                  <i className="ri-checkbox-circle-fill text-[#00D9FF] text-2xl"></i>
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xl text-white/90 leading-relaxed pt-6">
              これらすべてを組み合わせることで、高品質なシステムを短期間・低コストで提供します。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-[#0A1628]">
            品質保証について詳しく知りたい方へ
          </h2>
          <p className="text-xl text-gray-600">
            TechTimeの品質保証体制について、さらに詳しくご説明いたします
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact"
              className="px-10 py-4 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] text-white text-lg font-bold rounded-full hover:shadow-2xl transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              品質保証について詳しく聞く
            </Link>
            <Link 
              to="/simulator"
              className="px-10 py-4 bg-white text-[#1E40AF] text-lg font-bold rounded-full border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              見積もりシミュレーターを試す
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechTime</h3>
              <p className="text-gray-400 leading-relaxed">
                AI駆動開発で、高品質なシステムを低価格・短納期で提供します
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#00D9FF]">サービス</h4>
              <ul className="space-y-2">
                <li><Link to="/simulator" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">見積もりシミュレーター</Link></li>
                <li><Link to="/ai-development" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">AI駆動開発</Link></li>
                <li><Link to="/quality-assurance" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">品質保証</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#00D9FF]">企業情報</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">会社概要</Link></li>
                <li><Link to="/cases" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">開発事例</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#00D9FF]">お問い合わせ</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <i className="ri-mail-line"></i>
                  <span>info@techtime.jp</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-phone-line"></i>
                  <span>03-1234-5678</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechTime. All rights reserved. | <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Website Builder</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

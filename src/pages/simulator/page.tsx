import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SimulatorPage() {
  const [systemType, setSystemType] = useState('');
  const [users, setUsers] = useState('');
  const [locations, setLocations] = useState('');
  const [complexity, setComplexity] = useState('');
  const [dataMigration, setDataMigration] = useState('');
  const [integrations, setIntegrations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [estimate, setEstimate] = useState<{ min: number; standard: number; max: number } | null>(null);

  const systemTypes = [
    '文書管理システム',
    '在庫管理システム',
    '顧客・販売管理システム',
    '購買・調達管理システム',
    '経営ダッシュボード(BI)',
    '生産管理システム',
    '倉庫・物流管理システム',
    '人事・給与システム',
    '原価・会計システム'
  ];

  const userOptions = [
    { value: '5-20', label: '5〜20名' },
    { value: '21-50', label: '21〜50名' },
    { value: '51-100', label: '51〜100名' },
    { value: '101-500', label: '101〜500名' },
    { value: '501-5000', label: '501〜5,000名' }
  ];

  const locationOptions = [
    { value: '1', label: '1拠点' },
    { value: '2-5', label: '2〜5拠点' },
    { value: '6-10', label: '6〜10拠点' },
    { value: '11-20', label: '11〜20拠点' },
    { value: '20+', label: '20拠点以上' }
  ];

  const complexityOptions = [
    { value: 'simple', label: 'シンプル（基本機能のみ）', multiplier: 1 },
    { value: 'standard', label: '標準（一般的な機能）', multiplier: 1.5 },
    { value: 'complex', label: '複雑（高度な機能）', multiplier: 2.2 },
    { value: 'advanced', label: '高度（最先端機能）', multiplier: 3 }
  ];

  const dataMigrationOptions = [
    { value: 'none', label: 'なし', multiplier: 1 },
    { value: 'small', label: '小規模（〜1万件）', multiplier: 1.1 },
    { value: 'medium', label: '中規模（1万〜10万件）', multiplier: 1.3 },
    { value: 'large', label: '大規模（10万〜100万件）', multiplier: 1.6 },
    { value: 'xlarge', label: '超大規模（100万件以上）', multiplier: 2 }
  ];

  const integrationOptions = [
    { value: '0', label: 'なし', multiplier: 1 },
    { value: '1-2', label: '1〜2システム', multiplier: 1.2 },
    { value: '3-5', label: '3〜5システム', multiplier: 1.5 },
    { value: '6-10', label: '6〜10システム', multiplier: 1.8 },
    { value: '10+', label: '10システム以上', multiplier: 2.2 }
  ];

  const timelineOptions = [
    { value: '3', label: '3ヶ月' },
    { value: '6', label: '6ヶ月' },
    { value: '12', label: '12ヶ月' },
    { value: '24', label: '24ヶ月' }
  ];

  const calculateEstimate = () => {
    if (!systemType || !users || !locations || !complexity || !dataMigration || !integrations || !timeline) {
      alert('すべての項目を選択してください');
      return;
    }

    const basePrice = 2800000;
    const complexityData = complexityOptions.find(c => c.value === complexity);
    const dataMigrationData = dataMigrationOptions.find(d => d.value === dataMigration);
    const integrationData = integrationOptions.find(i => i.value === integrations);

    if (complexityData && dataMigrationData && integrationData) {
      const multiplier = complexityData.multiplier * dataMigrationData.multiplier * integrationData.multiplier;
      
      const minPrice = Math.round(basePrice * multiplier * 0.8 / 10000) * 10000;
      const standardPrice = Math.round(basePrice * multiplier / 10000) * 10000;
      const maxPrice = Math.round(basePrice * multiplier * 1.3 / 10000) * 10000;

      setEstimate({ min: minPrice, standard: standardPrice, max: maxPrice });
      
      // スクロールして結果を表示
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const benefits = [
    {
      icon: 'ri-time-line',
      title: '待ち時間ゼロ、今すぐ金額がわかる',
      traditional: '従来：1〜2週間',
      techtime: 'TechTime：3分',
      description: '問い合わせ、営業との打ち合わせ、見積もり作成を待つ必要はありません。システム種別と条件を選択するだけで、即座に概算金額を表示します。'
    },
    {
      icon: 'ri-user-forbid-line',
      title: '営業との打ち合わせ不要',
      traditional: '日程調整・商談が必須',
      techtime: '完全セルフサービス',
      description: '営業担当との日程調整や長時間の説明を聞く必要はありません。しつこい営業電話の心配もなく、自分のペースで検討できます。'
    },
    {
      icon: 'ri-refresh-line',
      title: '何度でも試算できる',
      traditional: '再見積もりに数日',
      techtime: '即座に再計算',
      description: 'ユーザー数、拠点数、機能の複雑度など、様々なパターンを何度でも自由に試して、予算に最適な条件を見つけることができます。'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: '3つの価格帯で選択肢がわかる',
      traditional: '単一の見積もりのみ',
      techtime: '最小・標準・最大の3パターン',
      description: '基本機能のみの最小価格から、高度な機能まで含めた最大価格まで、予算に応じてどこまでの機能を実装できるかが一目瞭然です。'
    },
    {
      icon: 'ri-lightbulb-line',
      title: '予算検討の超初期段階から使える',
      traditional: '具体的な要件が必要',
      techtime: '企画段階でもOK',
      description: 'プロジェクトの企画段階、まだ何も決まっていない状態でも大丈夫。社内稟議の予算組みや上司への説明資料として活用できます。'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'そのまま問い合わせ・相談できる',
      traditional: '一から説明が必要',
      techtime: '見積もり内容を引き継ぎ',
      description: '見積もり結果を見て「詳しく聞きたい」と思ったら、そのまま問い合わせできます。シミュレーターの結果が相談のスタートラインになります。'
    }
  ];

  const useCases = [
    {
      title: '稟議書作成のため',
      company: '製造業C社様',
      quote: '社内システムの刷新を検討していましたが、予算がどれくらい必要か全く分からず、稟議書が作れませんでした。シミュレーターで概算が分かり、無事に予算承認を得られました。'
    },
    {
      title: '複数パターンの比較',
      company: '小売業D社様',
      quote: '1拠点だけでスタートするか、最初から全拠点で導入するか悩んでいました。シミュレーターで両方試算して、段階的導入の方がコストメリットがあると判明。経営判断に役立ちました。'
    },
    {
      title: '予算内での機能調整',
      company: 'サービス業E社様',
      quote: '予算1,000万円でどこまでできるか知りたかったんです。シミュレーターで色々試して、外部連携を1つ減らせば予算内に収まることが分かりました。'
    }
  ];

  const faqs = [
    {
      question: '見積もり結果は正式な金額ですか?',
      answer: 'シミュレーターの結果は概算金額です。実際の開発では要件の詳細により変動がありますが、大きな金額感は把握いただけます。正式見積もりは、要件ヒアリング後に提示いたします。'
    },
    {
      question: '見積もり後、営業から連絡が来ますか?',
      answer: 'いいえ。シミュレーターは完全に自由にお使いいただけます。お客様からお問い合わせをいただかない限り、営業から連絡することはありません。'
    },
    {
      question: '何度でも試算できますか?',
      answer: 'はい、何度でも自由に試算いただけます。様々なパターンを試して、最適な条件を見つけてください。'
    },
    {
      question: '個人情報の入力は必要ですか?',
      answer: '見積もりシミュレーターの利用に個人情報の入力は不要です。匿名でご利用いただけます。'
    },
    {
      question: '複数のシステムを同時に開発する場合は?',
      answer: 'シミュレーターでは単一システムの見積もりのみ対応しています。複数システムの同時開発では割引を適用できる場合がありますので、お問い合わせください。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2E] to-[#0A1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10">
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
              <Link to="/#simulator" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">見積もり</Link>
              <Link to="/cases" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">開発事例</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#00D9FF] transition-colors whitespace-nowrap">会社概要</Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 whitespace-nowrap">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-[#0A1628] via-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
                見積もりシミュレーター
              </h1>
              <p className="text-2xl lg:text-3xl text-white/90 mb-8">
                打ち合わせ不要、その場で概算金額がわかる
              </p>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-white/80 leading-relaxed">
                  システム開発の見積もりは、通常、営業担当との複数回の打ち合わせを経て、数日〜1週間程度かかるのが一般的です。<br />
                  <strong className="text-white">TechTimeの見積もりシミュレーターなら、わずか数分で概算金額を確認できます。</strong><br />
                  予算検討の初期段階から具体的な金額感を把握し、プロジェクト計画をスムーズに進められます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
                見積もりシミュレーターのメリット
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2 cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-xl flex items-center justify-center mb-6">
                    <i className={`${benefit.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-4">{benefit.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-600">{benefit.traditional}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">✓</span>
                      <span className="text-[#3B82F6] font-semibold">{benefit.techtime}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
                使い方は簡単3ステップ
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-extrabold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">システム種別を選択</h3>
                <p className="text-gray-600">開発したいシステムを選びます</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-extrabold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">条件を選択</h3>
                <p className="text-gray-600">ユーザー数、拠点数、機能の複雑度などを選択</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-extrabold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">見積もり結果を確認</h3>
                <p className="text-gray-600">最小・標準・最大の3パターンを即座に表示</p>
              </div>
            </div>

            {/* Simulator */}
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-10 lg:p-16 space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-[#0A1628] mb-4">今すぐ試してみる</h3>
                <p className="text-gray-600">すべての項目を選択して、概算見積もりを表示します</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* System Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">システム種別</label>
                  <select
                    value={systemType}
                    onChange={(e) => setSystemType(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {systemTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Users */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">ユーザー数</label>
                  <select
                    value={users}
                    onChange={(e) => setUsers(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {userOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Locations */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">拠点数</label>
                  <select
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {locationOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Complexity */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">機能の複雑度</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {complexityOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Data Migration */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">データ移行規模</label>
                  <select
                    value={dataMigration}
                    onChange={(e) => setDataMigration(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {dataMigrationOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Integrations */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">外部連携システム数</label>
                  <select
                    value={integrations}
                    onChange={(e) => setIntegrations(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {integrationOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-3 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">希望納期</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full h-14 px-4 text-base text-[#0A1628] bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    {timelineOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculateEstimate}
                className="w-full h-16 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1 whitespace-nowrap cursor-pointer"
              >
                概算見積もりを表示
              </button>

              {/* Result */}
              {estimate && (
                <div id="result" className="mt-12 space-y-6 animate-fadeIn">
                  <div className="text-center mb-8">
                    <h4 className="text-2xl font-bold text-[#0A1628] mb-2">見積もり結果</h4>
                    <p className="text-gray-600">3つの価格帯からお選びいただけます</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-[#3B82F6] transition-all duration-300">
                      <div className="text-sm font-bold text-gray-500 mb-2">最小価格</div>
                      <div className="text-4xl font-extrabold text-[#0A1628] mb-2">
                        ¥{estimate.min.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">基本機能のみ</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl p-8 text-center transform scale-105 shadow-2xl">
                      <div className="text-sm font-bold text-white/80 mb-2">標準価格</div>
                      <div className="text-4xl font-extrabold text-white mb-2">
                        ¥{estimate.standard.toLocaleString()}
                      </div>
                      <div className="text-sm text-white/90">一般的な機能</div>
                      <div className="mt-4 inline-block px-4 py-1 bg-white/20 rounded-full text-xs text-white font-semibold">
                        おすすめ
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-[#3B82F6] transition-all duration-300">
                      <div className="text-sm font-bold text-gray-500 mb-2">最大価格</div>
                      <div className="text-4xl font-extrabold text-[#0A1628] mb-2">
                        ¥{estimate.max.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">高度な機能</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-700 mb-4">
                      ※表示される金額は概算です。詳細な見積もりは要件ヒアリング後にご提示いたします。
                    </p>
                    <Link
                      to="/contact"
                      className="inline-block px-8 py-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      詳しい相談をする
                    </Link>
                  </div>

                  {/* Price Includes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h5 className="text-lg font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-500"></i>
                        価格に含まれるもの
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>要件定義</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>外部設計・内部設計</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>プログラム開発</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>単体・結合・総合テスト</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>操作マニュアル作成</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>導入支援(1ヶ月)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-6">
                      <h5 className="text-lg font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                        <i className="ri-close-circle-line text-red-500"></i>
                        価格に含まれないもの
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          <span>サーバー・クラウド環境費用</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          <span>月額保守運用費</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          <span>導入後の追加開発</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
                実際の活用例
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A1628]">{useCase.title}</h3>
                      <p className="text-sm text-gray-500">{useCase.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    「{useCase.quote}」
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
                よくある質問
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#00D9FF] to-[#3B82F6] mx-auto"></div>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#0A1628] mb-3 flex items-start gap-3">
                    <span className="text-[#00D9FF] flex-shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed pl-8">
                    <strong className="text-[#3B82F6]">A:</strong> {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-gradient-to-br from-[#0A1628] via-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              まずは試してみてください
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              迷ったら、まず試してみることをおすすめします。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <i className="ri-money-dollar-circle-line text-3xl text-[#00D9FF] mb-2"></i>
                <p className="text-sm text-white font-semibold">無料で使える</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <i className="ri-shield-check-line text-3xl text-[#00D9FF] mb-2"></i>
                <p className="text-sm text-white font-semibold">個人情報不要</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <i className="ri-phone-line text-3xl text-[#00D9FF] mb-2"></i>
                <p className="text-sm text-white font-semibold">営業連絡なし</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <i className="ri-refresh-line text-3xl text-[#00D9FF] mb-2"></i>
                <p className="text-sm text-white font-semibold">何度でも試算OK</p>
              </div>
            </div>
            <p className="text-2xl text-white font-bold mb-8">
              「どれくらいかかるんだろう?」という疑問が、3分で解決します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-white text-[#1E40AF] text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer inline-block"
              >
                見積もりシミュレーターを試す
              </a>
              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all duration-300 whitespace-nowrap cursor-pointer inline-block"
              >
                まずは相談したい
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
                <li><Link to="/#ai-development" className="hover:text-[#00D9FF] transition-colors">AI駆動開発</Link></li>
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

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

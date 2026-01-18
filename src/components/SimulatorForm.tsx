import { useState } from 'react';

export default function SimulatorForm() {
  const [systemType, setSystemType] = useState('');
  const [users, setUsers] = useState('');
  const [locations, setLocations] = useState('');
  const [complexity, setComplexity] = useState('');
  const [dataMigration, setDataMigration] = useState('');
  const [integrations, setIntegrations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [estimate, setEstimate] = useState<{ min: number; standard: number; max: number } | null>(null);

  const systemTypes = ['文書管理システム', '在庫管理システム', '顧客・販売管理システム', '購買・調達管理システム', '経営ダッシュボード(BI)', '生産管理システム', '倉庫・物流管理システム', '人事・給与システム', '原価・会計システム'];
  const userOptions = [{ value: '5-20', label: '5〜20名' }, { value: '21-50', label: '21〜50名' }, { value: '51-100', label: '51〜100名' }, { value: '101-500', label: '101〜500名' }, { value: '501-5000', label: '501〜5,000名' }];
  const locationOptions = [{ value: '1', label: '1拠点' }, { value: '2-5', label: '2〜5拠点' }, { value: '6-10', label: '6〜10拠点' }, { value: '11-20', label: '11〜20拠点' }, { value: '20+', label: '20拠点以上' }];
  const complexityOptions = [{ value: 'simple', label: 'シンプル（基本機能のみ）', multiplier: 1 }, { value: 'standard', label: '標準（一般的な機能）', multiplier: 1.5 }, { value: 'complex', label: '複雑（高度な機能）', multiplier: 2.2 }, { value: 'advanced', label: '高度（最先端機能）', multiplier: 3 }];
  const dataMigrationOptions = [{ value: 'none', label: 'なし', multiplier: 1 }, { value: 'small', label: '小規模（〜1万件）', multiplier: 1.1 }, { value: 'medium', label: '中規模（1万〜10万件）', multiplier: 1.3 }, { value: 'large', label: '大規模（10万〜100万件）', multiplier: 1.6 }, { value: 'xlarge', label: '超大規模（100万件以上）', multiplier: 2 }];
  const integrationOptions = [{ value: '0', label: 'なし', multiplier: 1 }, { value: '1-2', label: '1〜2システム', multiplier: 1.2 }, { value: '3-5', label: '3〜5システム', multiplier: 1.5 }, { value: '6-10', label: '6〜10システム', multiplier: 1.8 }, { value: '10+', label: '10システム以上', multiplier: 2.2 }];
  const timelineOptions = [{ value: '3', label: '3ヶ月' }, { value: '6', label: '6ヶ月' }, { value: '12', label: '12ヶ月' }, { value: '24', label: '24ヶ月' }];

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
      setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const selectClass = "w-full h-14 px-4 text-base text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#00D9FF] transition-colors cursor-pointer";
  const labelClass = "block text-sm font-bold text-gray-300 mb-2";

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">今すぐ試してみる</h3>
        <p className="text-gray-400">すべての項目を選択して、概算見積もりを表示します</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>システム種別</label>
          <select value={systemType} onChange={(e) => setSystemType(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {systemTypes.map((type, i) => <option key={i} value={type} className="bg-[#0A1628]">{type}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>ユーザー数</label>
          <select value={users} onChange={(e) => setUsers(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {userOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>拠点数</label>
          <select value={locations} onChange={(e) => setLocations(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {locationOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>機能の複雑度</label>
          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {complexityOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>データ移行規模</label>
          <select value={dataMigration} onChange={(e) => setDataMigration(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {dataMigrationOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>外部連携システム数</label>
          <select value={integrations} onChange={(e) => setIntegrations(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {integrationOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>希望納期</label>
          <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={selectClass}>
            <option value="" className="bg-[#0A1628]">選択してください</option>
            {timelineOptions.map((opt, i) => <option key={i} value={opt.value} className="bg-[#0A1628]">{opt.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculateEstimate} className="w-full h-16 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-[#0A1628] text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#00D9FF]/30 transition-all duration-300 hover:-translate-y-1">
        概算見積もりを表示
      </button>

      {estimate && (
        <div id="result" className="mt-12 space-y-6">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-2">見積もり結果</h4>
            <p className="text-gray-400">3つの価格帯からお選びいただけます</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#00D9FF]/50 transition-all">
              <div className="text-sm font-bold text-gray-400 mb-2">最小価格</div>
              <div className="text-4xl font-extrabold text-white mb-2">¥{estimate.min.toLocaleString()}</div>
              <div className="text-sm text-gray-400">基本機能のみ</div>
            </div>
            <div className="bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-2xl p-8 text-center transform scale-105 shadow-2xl">
              <div className="text-sm font-bold text-[#0A1628]/80 mb-2">標準価格</div>
              <div className="text-4xl font-extrabold text-[#0A1628] mb-2">¥{estimate.standard.toLocaleString()}</div>
              <div className="text-sm text-[#0A1628]/90">一般的な機能</div>
              <div className="mt-4 inline-block px-4 py-1 bg-[#0A1628]/20 rounded-full text-xs text-[#0A1628] font-semibold">おすすめ</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#00D9FF]/50 transition-all">
              <div className="text-sm font-bold text-gray-400 mb-2">最大価格</div>
              <div className="text-4xl font-extrabold text-white mb-2">¥{estimate.max.toLocaleString()}</div>
              <div className="text-sm text-gray-400">高度な機能</div>
            </div>
          </div>

          <div className="bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-300 mb-4">※表示される金額は概算です。詳細な見積もりは要件ヒアリング後にご提示いたします。</p>
            <a href="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-[#0A1628] font-bold rounded-full hover:shadow-lg transition-all">詳しい相談をする</a>
          </div>
        </div>
      )}
    </div>
  );
}

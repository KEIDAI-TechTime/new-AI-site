import { useState } from 'react';

export default function Simulator() {
  const [systemType, setSystemType] = useState('');
  const [scale, setScale] = useState('');
  const [estimate, setEstimate] = useState<number | null>(null);

  const systemTypes = [
    '文書管理システム',
    '在庫管理システム',
    '顧客・販売管理システム',
    '購買・調達管理システム',
    '経営ダッシュボード（BI）',
    '生産管理システム',
    '倉庫・物流管理システム',
    '人事・給与システム',
    '原価・会計システム'
  ];

  const scales = [
    { value: 'small', label: '小規模（基本機能のみ）', multiplier: 1 },
    { value: 'medium', label: '標準規模（一般的な機能要件）', multiplier: 1.8 },
    { value: 'large', label: '大規模（高度な機能・複雑な要件）', multiplier: 3 }
  ];

  const basePrice = 2800000; // 280万円

  const calculateEstimate = () => {
    if (!systemType || !scale) {
      alert('システム種別と規模を選択してください');
      return;
    }

    const scaleData = scales.find(s => s.value === scale);
    if (scaleData) {
      const price = Math.round(basePrice * scaleData.multiplier / 10000) * 10000;
      setEstimate(price);
    }
  };

  return (
    <section id="simulator" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] mb-6">
            見積もりシミュレーター
          </h2>
          <p className="text-2xl text-gray-600 mb-8">
            打ち合わせ不要、今すぐ概算金額を確認
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            以下の項目を選択するだけで、御社のシステム開発にかかる概算金額を即座に表示します。
          </p>
        </div>

        {/* Simulator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 lg:p-16 space-y-8">
          {/* System Type Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
              システム種別を選択
            </label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full h-16 px-6 text-lg text-[#0A1628] bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
            >
              <option value="">選択してください</option>
              {systemTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Scale Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
              規模を選択
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="w-full h-16 px-6 text-lg text-[#0A1628] bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors duration-300 cursor-pointer"
            >
              <option value="">選択してください</option>
              {scales.map((s, index) => (
                <option key={index} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateEstimate}
            className="w-full h-16 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1 whitespace-nowrap cursor-pointer"
          >
            概算見積もりを表示
          </button>

          {/* Result Display */}
          {estimate !== null && (
            <div className="mt-8 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl p-10 text-center space-y-4 animate-fadeIn">
              <p className="text-white text-xl font-semibold">概算見積もり金額</p>
              <p className="text-white text-6xl font-extrabold">
                ¥{estimate.toLocaleString()}
                <span className="text-2xl ml-2">〜</span>
              </p>
              <p className="text-white/90 text-base">
                ※表示される金額は概算です。詳細な見積もりは要件ヒアリング後にご提示いたします。
              </p>
              <div className="pt-4">
                <button className="bg-white text-[#1E40AF] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer">
                  詳しい相談をする
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Development Timeline */}
        <div className="mt-20 max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">開発期間の目安</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <p className="font-bold text-[#0A1628] mb-2">小規模システム</p>
              <p className="text-3xl font-extrabold text-[#3B82F6]">2〜3ヶ月</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <p className="font-bold text-[#0A1628] mb-2">標準規模システム</p>
              <p className="text-3xl font-extrabold text-[#3B82F6]">3〜6ヶ月</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <p className="font-bold text-[#0A1628] mb-2">大規模システム</p>
              <p className="text-3xl font-extrabold text-[#3B82F6]">6ヶ月〜</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            ※システムの複雑度により変動します
          </p>
        </div>
      </div>

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
    </section>
  );
}

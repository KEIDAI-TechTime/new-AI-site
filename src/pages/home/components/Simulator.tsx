import { Link } from 'react-router-dom';

export default function Simulator() {
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
            システム種別、ユーザー数、拠点数、機能の複雑度などを選択するだけで、御社のシステム開発にかかる概算金額を即座に表示します。
          </p>
        </div>

        {/* CTA Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl shadow-2xl p-10 lg:p-16 text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <i className="ri-calculator-line text-6xl text-white"></i>
            </div>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              詳細な見積もりシミュレーター
            </h3>
            <p className="text-xl text-white/90 mb-6">
              7つの項目を選択して、3つの価格帯で見積もりを表示
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <i className="ri-time-line text-3xl text-[#00D9FF] mb-2"></i>
              <p className="text-sm text-white font-semibold">わずか3分</p>
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
              <p className="text-sm text-white font-semibold">何度でもOK</p>
            </div>
          </div>

          <Link
            to="/simulator"
            className="inline-block w-full md:w-auto px-12 py-5 bg-white text-[#1E40AF] text-lg font-bold rounded-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 whitespace-nowrap cursor-pointer"
          >
            見積もりシミュレーターを試す
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>

          <p className="text-white/70 text-sm mt-6">
            ※システム種別、ユーザー数、拠点数、機能の複雑度など7つの項目から詳細に試算できます
          </p>
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
    </section>
  );
}

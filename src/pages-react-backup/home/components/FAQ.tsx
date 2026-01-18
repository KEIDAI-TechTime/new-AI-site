export default function FAQ() {
  const faqs = [
    {
      question: 'AI開発でも品質は大丈夫？',
      answer: 'はい、品質は担保されます。AIは初版生成のスピードに優れていますが、生成物は必ず人間がレビューします。構造化された設計テンプレートによる一貫性の確保、多段階レビュー、実行確認による早期検証、自動テストによる品質チェックなど、複数の品質担保の仕組みを組み合わせています。'
    },
    {
      question: 'なぜこんなに安いの？',
      answer: 'AI駆動開発により、従来は日単位を要した作業を数分～数十分で完了できるためです。人手による「書き下す作業」を大幅に削減し、人間は要件視点での本質的なレビューや意思決定に集中できます。開発工数の削減効果を価格に反映しています。'
    },
    {
      question: '納期はどのくらい？',
      answer: 'システムの規模により異なりますが、小規模で2～3ヶ月、標準規模で3～6ヶ月、大規模で6ヶ月以上が目安です。AI駆動開発により、従来の開発期間から30～50%程度の短縮が可能です。詳細な納期は要件確認後にご提示します。'
    },
    {
      question: 'カスタマイズは可能？',
      answer: 'はい、完全なスクラッチ開発ですので、御社の業務フローに合わせた自由なカスタマイズが可能です。パッケージ製品の制約はありません。独自の業務ルール、承認フロー、帳票レイアウトなど、すべて御社仕様で構築できます。'
    },
    {
      question: 'セキュリティは大丈夫？',
      answer: 'お客様の情報資産は厳重に保護します。データの分離管理、アクセス制御、暗号化など、多層的なセキュリティ対策を実施しています。また、お客様のデータをAIモデルの学習に使用することは一切ありません。セキュアな開発環境で開発を行います。'
    },
    {
      question: '運用保守もお願いできますか？',
      answer: 'はい、対応可能です。システム稼働後の保守運用、機能追加、トラブル対応など、継続的なサポートを提供いたします。詳細は別途ご相談ください。'
    }
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 bg-[#00D9FF] rounded-full mb-4">
            <span className="text-[#0A1628] font-bold text-sm">FAQ</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A1628] leading-tight">
            よくある質問
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 space-y-4 cursor-pointer border border-gray-100"
            >
              {/* Question Icon */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] leading-tight pt-2 group-hover:text-[#3B82F6] transition-colors duration-300">
                  {faq.question}
                </h3>
              </div>

              {/* Answer */}
              <p className="text-base text-gray-600 leading-relaxed pl-16">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

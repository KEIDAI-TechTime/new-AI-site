import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    systemType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ company: '', name: '', email: '', phone: '', systemType: '', budget: '', timeline: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="company" className={labelClass}>会社名 <span className="text-red-400">*</span></label>
        <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className={inputClass} placeholder="株式会社サンプル" />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>お名前 <span className="text-red-400">*</span></label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="山田 太郎" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>メールアドレス <span className="text-red-400">*</span></label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="example@company.co.jp" />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>電話番号</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="03-1234-5678" />
      </div>

      <div>
        <label htmlFor="systemType" className={labelClass}>検討中のシステム種別 <span className="text-red-400">*</span></label>
        <select id="systemType" name="systemType" required value={formData.systemType} onChange={handleChange} className={inputClass + " cursor-pointer"}>
          <option value="" className="bg-[#0A1628]">選択してください</option>
          <option value="予約・受付システム" className="bg-[#0A1628]">予約・受付システム</option>
          <option value="在庫管理システム" className="bg-[#0A1628]">在庫管理システム</option>
          <option value="倉庫・物流管理システム" className="bg-[#0A1628]">倉庫・物流管理システム</option>
          <option value="顧客・販売管理システム" className="bg-[#0A1628]">顧客・販売管理システム</option>
          <option value="購買・調達管理システム" className="bg-[#0A1628]">購買・調達管理システム</option>
          <option value="経営ダッシュボード（BI）" className="bg-[#0A1628]">経営ダッシュボード（BI）</option>
          <option value="生産管理システム" className="bg-[#0A1628]">生産管理システム</option>
          <option value="人事・給与システム" className="bg-[#0A1628]">人事・給与システム</option>
          <option value="原価・会計システム" className="bg-[#0A1628]">原価・会計システム</option>
          <option value="文書管理システム" className="bg-[#0A1628]">文書管理システム</option>
          <option value="ECサイト・ネットショップ" className="bg-[#0A1628]">ECサイト・ネットショップ</option>
          <option value="地域DX・MaaS" className="bg-[#0A1628]">地域DX・MaaS</option>
          <option value="ホームページ作成" className="bg-[#0A1628]">ホームページ作成</option>
          <option value="複数システムの連携" className="bg-[#0A1628]">複数システムの連携</option>
          <option value="その他・わからない" className="bg-[#0A1628]">その他・わからない</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>ご予算 <span className="text-red-400">*</span></label>
        <select id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={inputClass + " cursor-pointer"}>
          <option value="" className="bg-[#0A1628]">選択してください</option>
          <option value="100万円未満" className="bg-[#0A1628]">100万円未満</option>
          <option value="100万円〜300万円" className="bg-[#0A1628]">100万円〜300万円</option>
          <option value="300万円〜500万円" className="bg-[#0A1628]">300万円〜500万円</option>
          <option value="500万円〜1000万円" className="bg-[#0A1628]">500万円〜1000万円</option>
          <option value="1000万円以上" className="bg-[#0A1628]">1000万円以上</option>
          <option value="未定" className="bg-[#0A1628]">未定</option>
        </select>
      </div>

      <div>
        <label htmlFor="timeline" className={labelClass}>希望納期 <span className="text-red-400">*</span></label>
        <select id="timeline" name="timeline" required value={formData.timeline} onChange={handleChange} className={inputClass + " cursor-pointer"}>
          <option value="" className="bg-[#0A1628]">選択してください</option>
          <option value="1ヶ月以内" className="bg-[#0A1628]">1ヶ月以内</option>
          <option value="2〜3ヶ月" className="bg-[#0A1628]">2〜3ヶ月</option>
          <option value="3〜6ヶ月" className="bg-[#0A1628]">3〜6ヶ月</option>
          <option value="6ヶ月以上" className="bg-[#0A1628]">6ヶ月以上</option>
          <option value="未定" className="bg-[#0A1628]">未定</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>お問い合わせ内容 <span className="text-red-400">*</span></label>
        <textarea id="message" name="message" required rows={6} maxLength={500} value={formData.message} onChange={handleChange} className={inputClass + " resize-none"} placeholder="ご要望やご質問をご記入ください（500文字以内）" />
        <div className="text-right text-xs text-gray-500 mt-1">{formData.message.length} / 500</div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00D9FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? '送信中...' : '送信する'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-green-400 text-sm text-center">お問い合わせを受け付けました。担当者より3営業日以内にご連絡いたします。</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm text-center">送信に失敗しました。お手数ですが、もう一度お試しください。</p>
        </div>
      )}
    </form>
  );
}

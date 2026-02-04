import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function FormSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    childName: '',
    childGrade: '',
    parentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams({
        childName: formData.childName,
        childGrade: formData.childGrade,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        message: formData.message,
      }).toString();

      const response = await fetch('https://readdy.ai/api/form/d6051nckjhtioh5jsej0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          childName: '',
          childGrade: '',
          parentName: '',
          email: '',
          phone: '',
          preferredDate: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            無料体験申込
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            まずは体験してみませんか？お気軽にお申し込みください
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form
            id="trial-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="bg-cream rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="childName" className="block text-gray-700 font-bold mb-2">
                  お子様のお名前 <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label htmlFor="childGrade" className="block text-gray-700 font-bold mb-2">
                  学年 <span className="text-primary">*</span>
                </label>
                <select
                  id="childGrade"
                  name="childGrade"
                  value={formData.childGrade}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="小学1年生">小学1年生</option>
                  <option value="小学2年生">小学2年生</option>
                  <option value="小学3年生">小学3年生</option>
                  <option value="小学4年生">小学4年生</option>
                  <option value="小学5年生">小学5年生</option>
                  <option value="小学6年生">小学6年生</option>
                  <option value="中学1年生">中学1年生</option>
                  <option value="中学2年生">中学2年生</option>
                  <option value="中学3年生">中学3年生</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="parentName" className="block text-gray-700 font-bold mb-2">
                保護者様のお名前 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="山田 花子"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  メールアドレス <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                  電話番号 <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="090-1234-5678"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="preferredDate" className="block text-gray-700 font-bold mb-2">
                希望日時 <span className="text-primary">*</span>
              </label>
              <input
                type="datetime-local"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                ご質問・ご要望
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none text-sm"
                placeholder="ご質問やご要望がありましたらご記入ください（500文字以内）"
              />
              <p className="text-sm text-gray-500 mt-1 text-right">
                {formData.message.length}/500文字
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-xl text-green-700 font-medium">
                <i className="ri-checkbox-circle-fill mr-2"></i>
                お申し込みありがとうございます！担当者より折り返しご連絡いたします。
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-700 font-medium">
                <i className="ri-error-warning-fill mr-2"></i>
                送信に失敗しました。もう一度お試しください。
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  送信中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="ri-send-plane-fill mr-2"></i>
                  無料体験に申し込む
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

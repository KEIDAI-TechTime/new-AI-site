
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="py-32 px-6 bg-[#081120] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-industrial tracking-tighter mb-4">GET IN <span className="text-[#FF6B35]">TOUCH</span></h2>
          <p className="text-gray-500">精密加工に関するご相談、お見積りはこちらから。</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Company Name / 貴社名</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#FF6B35] transition-colors font-bold text-sm"
                placeholder="株式会社 鉄心"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Name / お名前</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#FF6B35] transition-colors font-bold text-sm"
                placeholder="山田 太郎"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Email / メールアドレス</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#FF6B35] transition-colors font-bold text-sm"
              placeholder="contact@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Message / お問い合わせ内容</label>
            <textarea 
              rows={6}
              className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-[#FF6B35] transition-colors font-bold text-sm"
              placeholder="加工精度や納期に関するご相談など、お気軽に入力してください。"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-6 bg-white text-[#0A1628] font-black tracking-[0.5em] text-lg hover:bg-[#FF6B35] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,107,53,0.1)] group relative overflow-hidden"
          >
            <span className="relative z-10 group-active:translate-y-1 inline-block">SUBMIT REQUEST</span>
            {/* Stamp effect - visual flash */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileTap={{ opacity: 0.5, scale: 2 }}
              className="absolute inset-0 bg-[#FF6B35] pointer-events-none"
            />
          </motion.button>
        </form>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-10">
          <div>
            <h4 className="text-[10px] font-bold text-[#FF6B35] tracking-widest mb-2">ADDRESS</h4>
            <p className="text-sm text-gray-400 font-bold">〒430-0000 静岡県浜松市中区...<br/>鉄心工業ビル 1F</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#FF6B35] tracking-widest mb-2">PHONE</h4>
            <p className="text-sm text-gray-400 font-bold">053-000-0000<br/>平日 9:00 - 18:00</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#FF6B35] tracking-widest mb-2">FOLLOW US</h4>
            <div className="flex gap-4 text-xs font-bold text-gray-400">
              <a href="#" className="hover:text-[#FF6B35]">LINKEDIN</a>
              <a href="#" className="hover:text-[#FF6B35]">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

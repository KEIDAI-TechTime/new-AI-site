
import React from 'react';
import { motion } from 'framer-motion';

const CareerSection: React.FC = () => {
  return (
    <div className="relative py-32 overflow-hidden bg-[#0A1628]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative">
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl md:text-7xl font-black font-industrial leading-none tracking-tighter">
              NEXT <span className="text-[#FF6B35]">70</span> YEARS,<br/>WITH YOU.
            </h2>
            <p className="text-xl text-gray-300 font-bold tracking-widest italic">「次の70年を、あなたと。」</p>
            <p className="text-gray-400 leading-relaxed max-w-md">
              鉄心工業は、テクノロジーの力だけでは完成しません。
              最後のミクロンを削り出すのは、いつの時代も「人の心」です。
              私たちは、あなたの情熱を待っています。
            </p>
            
            <button className="group px-10 py-5 bg-[#FF6B35] font-black tracking-widest flex items-center gap-4 transition-all hover:translate-x-2">
              RECRUIT ENTRY
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >→</motion.span>
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 text-[10rem] font-black opacity-[0.03] pointer-events-none select-none italic font-industrial">
            CO-CREATION
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px]">
          {/* Overlay images simulating human & machine co-creation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
          >
            <img src="https://picsum.photos/id/40/800/1200?grayscale" className="w-full h-full object-cover grayscale brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1628] to-transparent" />
          </motion.div>

          <motion.div 
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 1] }}
            className="absolute inset-0 rounded-2xl overflow-hidden z-20 mix-blend-screen"
          >
            <img src="https://picsum.photos/id/50/800/1200?grayscale" className="w-full h-full object-cover scale-110" />
          </motion.div>

          {/* Floating HUD elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-12 -right-6 z-30 bg-white/5 backdrop-blur-md p-4 border border-white/20 text-[10px] font-industrial tracking-widest"
          >
            <p className="text-[#FF6B35]">CRAFTSMANSHIP_CORE</p>
            <div className="w-full h-1 bg-white/20 mt-2">
              <motion.div animate={{ width: ["0%", "85%", "0%"] }} transition={{ duration: 6, repeat: Infinity }} className="h-full bg-[#FF6B35]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;

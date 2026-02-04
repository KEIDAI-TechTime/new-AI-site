
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BusinessFlow: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const path1 = "M20,50 L80,50"; // Straight
  const path2 = "M20,50 Q50,20 80,50"; // Bent
  const path3 = "M20,50 Q50,80 80,50 T140,50"; // Complex

  const deformProgress = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 2, 3]);

  const steps = [
    { title: "MATERIAL", label: "素材選定", desc: "最高品質の特殊鋼を厳選。すべてはここから始まる。" },
    { title: "CUTTING", label: "精密切削", desc: "最新鋭のNC旋盤・マシニングセンタが、金属を彫刻する。" },
    { title: "POLISHING", label: "研磨加工", desc: "鏡面仕上げによる究極の滑らかさ。摩擦をゼロへ近づける。" },
    { title: "INSPECTION", label: "三次元測定", desc: "誤差1μm以下。徹底した品質管理で「信頼」を具現化。" },
  ];

  return (
    <div ref={containerRef} className="py-32 bg-[#081120]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black font-industrial mb-4 tracking-tighter"
          >
            MANUFACTURING <span className="text-[#FF6B35]">FLOW</span>
          </motion.h2>
          <p className="text-gray-500 tracking-[0.2em] text-sm">「変形」が生む、新たな価値。</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10 hidden md:block" />

          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 mb-32 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className={`p-8 bg-white/5 border-l-4 border-[#FF6B35] ${i % 2 === 1 ? 'text-right border-l-0 border-r-4' : ''}`}>
                  <span className="text-[#FF6B35] font-black text-4xl opacity-20 block mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-2xl font-black mb-1">{step.title}</h3>
                  <p className="text-[#FF6B35] text-sm font-bold mb-4 tracking-widest">{step.label}</p>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>

              <div className="w-full md:w-1/2 flex justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center border border-white/10 rounded-full group"
                >
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      borderRadius: ["30%", "50%", "30%"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-[#FF6B35]/30"
                  />
                  <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#FF6B35] to-[#0A1628] rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-white font-black text-lg opacity-80"
                    >
                      {step.title.charAt(0)}
                    </motion.div>
                    {/* Metal distortion effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessFlow;

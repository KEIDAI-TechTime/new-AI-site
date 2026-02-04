
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';

const Gear: React.FC<{ size: number; rotation: number; color?: string; className?: string }> = ({ size, rotation, color = "currentColor", className }) => (
  <motion.svg 
    width={size} height={size} viewBox="0 0 100 100" 
    animate={{ rotate: rotation }}
    transition={{ ease: "linear", duration: 10, repeat: Infinity }}
    className={className}
    style={{ color }}
  >
    <path 
      fill="currentColor" 
      d="M95,44.2h-7.6c-0.6-3.3-1.6-6.4-3.1-9.3l5.4-5.4c1.1-1.1,1.1-2.8,0-3.9L82,17.9c-1.1-1.1-2.8-1.1-3.9,0l-5.4,5.4 c-2.9-1.5-6-2.6-9.3-3.1V12.6c0-1.5-1.2-2.8-2.8-2.8H51.9c-1.5,0-2.8,1.2-2.8,2.8v7.6c-3.3,0.6-6.4,1.6-9.3,3.1l-5.4-5.4 c-1.1-1.1-2.8-1.1-3.9,0L22.8,25.6c-1.1,1.1-1.1,2.8,0,3.9l5.4,5.4c-1.5,2.9-2.6,6-3.1,9.3H17.6c-1.5,0-2.8,1.2-2.8,2.8v8.6 c0,1.5,1.2,2.8,2.8,2.8h7.6c0.6,3.3,1.6,6.4,3.1,9.3l-5.4,5.4c-1.1,1.1-1.1,2.8,0,3.9L30.6,82c1.1,1.1,2.8,1.1,3.9,0l5.4-5.4 c2.9,1.5,6,2.6,9.3,3.1v7.6c0,1.5,1.2,2.8,2.8,2.8h8.6c1.5,0,2.8-1.2,2.8-2.8v-7.6c3.3-0.6,6.4-1.6,9.3-3.1l5.4,5.4 c1.1,1.1,2.8,1.1,3.9,0L89.4,72c1.1-1.1,1.1-2.8,0-3.9l-5.4-5.4c1.5-2.9,2.6-6,3.1-9.3H95c1.5,0,2.8-1.2,2.8-2.8v-8.6 C97.8,45.4,96.5,44.2,95,44.2z M56.2,65.6c-5.3,0-9.6-4.3-9.6-9.6c0-5.3,4.3-9.6,9.6-9.6s9.6,4.3,9.6,9.6 C65.8,61.3,61.5,65.6,56.2,65.6z"
    />
  </motion.svg>
);

const Philosophy: React.FC = () => {
  const values = [
    { title: "精密", icon: Target, desc: "μm（ミクロン）単位の誤差も許さない、究極のこだわり。" },
    { title: "信頼", icon: Shield, desc: "創業70年、一度も妥協しなかった品質が私たちの誇り。" },
    { title: "挑戦", icon: Zap, desc: "伝統に安住せず、常に最新鋭の技術と対話し続ける。" },
  ];

  return (
    <div className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Animated Gears Decoration */}
        <div className="relative w-full lg:w-1/2 h-80 flex items-center justify-center">
          <Gear size={200} rotation={360} color="#FF6B35" className="absolute opacity-30 blur-[1px]" />
          <Gear size={120} rotation={-360} color="#ffffff" className="absolute -translate-x-24 -translate-y-24 opacity-20" />
          <Gear size={150} rotation={-360} color="#FF6B35" className="absolute translate-x-32 translate-y-16 opacity-10" />
          
          <div className="relative z-10 text-center">
            <h3 className="text-4xl md:text-5xl font-black font-industrial italic">KINETIC<br/>MINDSET</h3>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-black mb-4 flex items-center gap-4">
                <span className="w-12 h-1 bg-[#FF6B35]" />
                CORPORATE PHILOSOPHY
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                鉄心工業の鼓動は、三つの価値観が噛み合うことで生まれます。
                止まることのない進化と、揺るぎない誠実さ。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div 
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="mb-4 text-[#FF6B35] group-hover:scale-110 transition-transform duration-300">
                    <v.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;

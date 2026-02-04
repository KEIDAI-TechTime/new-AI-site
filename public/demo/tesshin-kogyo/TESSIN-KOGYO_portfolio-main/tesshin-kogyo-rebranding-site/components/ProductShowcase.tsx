
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Precision Gear Unit",
    sub: "自動車トランスミッション用",
    image: "https://picsum.photos/id/10/800/800?grayscale",
    precision: "±0.002",
    stats: "HARDNESS: 60HRC"
  },
  {
    id: 2,
    name: "Industrial Piston Rod",
    sub: "建設機械向け高耐久シャフト",
    image: "https://picsum.photos/id/20/800/800?grayscale",
    precision: "±0.005",
    stats: "SMOOTHNESS: Ra 0.1"
  },
  {
    id: 3,
    name: "Medical Micro Valve",
    sub: "精密医療機器用ステンレス部品",
    image: "https://picsum.photos/id/30/800/800?grayscale",
    precision: "±0.001",
    stats: "MATERIAL: SUS316L"
  }
];

const ProductShowcase: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="py-32 px-6 relative bg-[#0A1628]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black font-industrial tracking-tighter italic">PRODUCTS &<br/><span className="text-[#FF6B35]">TECHNOLOGY</span></h2>
          </div>
          <div className="flex gap-4">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`w-12 h-12 flex items-center justify-center font-black transition-all ${active === i ? 'bg-[#FF6B35] text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
              >
                0{p.id}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          <div className="relative aspect-square bg-[#081120] border border-white/10 flex items-center justify-center group overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full p-12"
              >
                <div className="relative w-full h-full shadow-[0_0_50px_rgba(255,107,53,0.1)]">
                  <img src={products[active].image} className="w-full h-full object-cover grayscale brightness-75 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
                  
                  {/* Digital HUD Overlay */}
                  <div className="absolute top-4 left-4 text-[10px] text-[#FF6B35] font-industrial">
                    <p>SCANNING... 100%</p>
                    <p>PRECISION_LOCK: ENABLED</p>
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-industrial text-right">
                    <p>MODEL_ID: TS-00{products[active].id}</p>
                    <p>LOC: HAMAMATSU, JP</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Spinning decorative frame */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-dashed border-[#FF6B35]/20 pointer-events-none rounded-full scale-110"
            />
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#FF6B35] font-black text-sm tracking-[0.3em] mb-4 block">ULTRA PRECISION PARTS</span>
                <h3 className="text-4xl font-black mb-2">{products[active].name}</h3>
                <p className="text-gray-400 mb-8">{products[active].sub}</p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B35]" />
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">加工精度</p>
                    <p className="text-3xl font-black font-industrial text-[#FF6B35]">{products[active].precision}<span className="text-xs ml-1">μm</span></p>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1">主要スペック</p>
                    <p className="text-lg font-black font-industrial leading-tight">{products[active].stats}</p>
                  </div>
                </div>

                <p className="text-gray-500 leading-relaxed text-sm italic border-l-2 border-white/10 pl-4">
                  「削る」という行為の限界に挑む。弊社の技術を結集した主力ラインナップの一つ。
                  ミクロン単位の妥協が、10年後の動作を変えると私たちは信じています。
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;

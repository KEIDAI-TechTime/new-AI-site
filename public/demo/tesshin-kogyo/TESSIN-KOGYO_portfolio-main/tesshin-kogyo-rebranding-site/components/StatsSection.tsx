
import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const Counter: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = "", label }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: 2.5, 
        ease: [0.34, 1.56, 0.64, 1] 
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center group p-8 bg-gradient-to-b from-white/5 to-transparent border border-white/5">
      <div className="mb-2 overflow-hidden h-24 flex items-center justify-center">
        <motion.span className="text-6xl md:text-7xl font-black font-industrial tracking-tighter text-white">
          {rounded}
        </motion.span>
        <span className="text-2xl font-black text-[#FF6B35] ml-2 self-end mb-2">{suffix}</span>
      </div>
      <div className="h-[2px] w-8 bg-[#FF6B35] mx-auto mb-4 group-hover:w-24 transition-all duration-500" />
      <p className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">{label}</p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <div className="py-24 bg-[#081120] relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Counter value={70} suffix="th" label="創業年数" />
        <Counter value={500} suffix="M+" label="年間総生産数" />
        <Counter value={200} suffix="+" label="主要取引社数" />
      </div>
      
      {/* Background large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[20vw] font-black font-industrial italic">LEGACY & DATA</span>
      </div>
    </div>
  );
};

export default StatsSection;


import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 2.5]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [text, setText] = useState("");
  const fullText = "鉄に、心を込める。";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Zoom Animation Layer */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        {/* Abstract "Factory" View */}
        <div className="relative w-full h-full bg-[#0A1628]">
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2, 
                  repeat: Infinity, 
                  ease: "easeOut" 
                }}
                className="absolute border border-[#FF6B35] rounded-full"
                style={{ width: `${(i + 1) * 20}vw`, height: `${(i + 1) * 20}vw` }}
              />
            ))}
          </div>
          <motion.img 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://picsum.photos/id/175/1920/1080?grayscale" 
            className="w-full h-full object-cover"
            alt="Factory"
          />
        </div>
      </motion.div>

      {/* Main Copy */}
      <div className="relative z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#FF6B35] font-industrial text-sm font-bold tracking-[0.5em] mb-4"
        >
          SINCE 1954
        </motion.p>
        <h2 className="text-5xl md:text-8xl font-black mb-6 leading-tight flex flex-col items-center">
          <span className="block">{text}<span className="animate-pulse">|</span></span>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed tracking-widest mb-10">
            私たちは鉄の冷たさに、職人の熱量を吹き込む。<br />
            70年の歴史が磨き上げた「超精密」の極致。
          </p>
          <button className="group relative overflow-hidden bg-transparent border border-white/20 px-10 py-4 font-bold tracking-widest transition-all hover:border-[#FF6B35] overflow-hidden">
            <span className="relative z-10 group-hover:text-[#0A1628] transition-colors duration-300">DISCOVER TESSHIN</span>
            <motion.div 
              className="absolute inset-0 bg-[#FF6B35] translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest text-gray-500 font-bold">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-10 bg-gradient-to-b from-[#FF6B35] to-transparent"
        />
      </div>
    </div>
  );
};

export default Hero;

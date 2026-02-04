
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-[#0A1628] to-transparent pointer-events-none"
    >
      <div className="flex flex-col pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <span className="text-xl font-black font-industrial tracking-tighter leading-none">
          TESSHIN <span className="text-[#FF6B35]">KOGYO</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 mt-1">鉄心工業株式会社</span>
      </div>

      <div className="hidden md:flex gap-8 pointer-events-auto">
        {['PHILOSOPHY', 'BUSINESS', 'PRODUCTS', 'CAREERS'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-xs font-bold tracking-widest text-gray-400 hover:text-[#FF6B35] transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF6B35] group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      <button 
        onClick={() => scrollTo('contact')}
        className="pointer-events-auto bg-[#FF6B35] text-white px-6 py-2 text-xs font-bold tracking-widest hover:bg-white hover:text-[#0A1628] transition-all duration-300 shadow-[4px_4px_0px_0px_#ffffff22] active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        CONTACT
      </button>
    </motion.nav>
  );
};

export default Navbar;

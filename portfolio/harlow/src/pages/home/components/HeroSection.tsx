import { useEffect, useState } from 'react';
import Navigation from './Navigation';

export default function HeroSection() {
  const [neonVisible, setNeonVisible] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    const timers = neonVisible.map((_, index) =>
      setTimeout(() => {
        setNeonVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 200)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F4E4D4] via-[#F2C94C]/20 to-[#F4E4D4]">
      {/* Diagonal Stripe Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F2C94C 0px, #F2C94C 40px, transparent 40px, transparent 80px)',
        }}></div>
      </div>

      {/* Floating Ice Cream Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <i className="ri-cake-3-line absolute top-20 left-10 text-6xl text-[#5B8C7B] opacity-5"></i>
        <i className="ri-goblet-line absolute top-40 right-20 text-5xl text-[#E8927C] opacity-5"></i>
        <i className="ri-cake-2-line absolute bottom-40 left-20 text-7xl text-[#F2C94C] opacity-5"></i>
        <i className="ri-goblet-fill absolute bottom-20 right-40 text-6xl text-[#5B8C7B] opacity-5"></i>
      </div>

      {/* Corner Stamps */}
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full border-4 border-[#5B8C7B] border-dashed flex items-center justify-center bg-white/50 rotate-12 shadow-lg">
        <span className="text-xs font-bold text-[#5B8C7B] text-center leading-tight">FRESH<br/>DAILY</span>
      </div>
      <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-[#E8927C] border-dashed flex items-center justify-center bg-white/50 -rotate-12 shadow-lg">
        <span className="text-xs font-bold text-[#E8927C] text-center leading-tight">HAND<br/>MADE</span>
      </div>
      <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full border-4 border-[#F2C94C] border-dashed flex items-center justify-center bg-white/50 -rotate-12 shadow-lg">
        <span className="text-xs font-bold text-[#F2C94C] text-center leading-tight">QUALITY</span>
      </div>
      <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border-4 border-[#5B8C7B] border-dashed flex items-center justify-center bg-white/50 rotate-12 shadow-lg">
        <span className="text-xs font-bold text-[#5B8C7B] text-center leading-tight">SINCE<br/>2017</span>
      </div>

      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20">
        {/* Logo Image */}
        <div className="mb-8 animate-bounce-slow">
          <img 
            src="https://public.readdy.ai/ai/img_res/56ad3c3e-1c5a-4e78-923f-f830a384e9cd.png" 
            alt="Harlow Ice Cream Logo" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Neon Sign Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {['H', 'A', 'R', 'L', 'O', 'W'].map((letter, index) => (
            <span
              key={index}
              className={`text-8xl md:text-9xl font-black text-[#5B8C7B] transition-all duration-500 ${
                neonVisible[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                textShadow: neonVisible[index]
                  ? '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(232,146,124,0.6), 0 0 30px rgba(232,146,124,0.4), 2px 2px 0 white, -2px -2px 0 white'
                  : 'none',
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-3 mb-8">
          <i className="ri-cake-3-line text-2xl text-[#E8927C]"></i>
          <div className="bg-[#F2C94C] px-6 py-2 rounded-full">
            <span className="text-[#3D3D3D] font-bold tracking-widest text-sm">ICE CREAM PARLOR</span>
          </div>
          <i className="ri-cake-3-line text-2xl text-[#E8927C]"></i>
        </div>

        {/* Ribbon Banner */}
        <div className="relative animate-wave">
          <div 
            className="bg-gradient-to-r from-[#E8927C] via-white to-[#E8927C] px-12 py-4 shadow-2xl transform -rotate-1"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #E8927C 0px, #E8927C 10px, white 10px, white 20px)',
            }}
          >
            <span className="text-white font-bold tracking-wider text-lg drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              HANDMADE WITH LOVE SINCE 2017
            </span>
          </div>
          {/* Ribbon Ends */}
          <div className="absolute -left-6 top-0 w-0 h-0 border-t-[28px] border-t-transparent border-r-[24px] border-r-[#E8927C] border-b-[28px] border-b-transparent"></div>
          <div className="absolute -right-6 top-0 w-0 h-0 border-t-[28px] border-t-transparent border-l-[24px] border-l-[#E8927C] border-b-[28px] border-b-transparent"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-3xl text-[#5B8C7B]"></i>
        </div>
      </div>
    </section>
  );
}

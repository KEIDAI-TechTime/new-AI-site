import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/50'
      }`}
    >
      <div className="w-full px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5B8C7B] flex items-center justify-center border-4 border-white shadow-lg">
              <img 
                src="https://public.readdy.ai/ai/img_res/56ad3c3e-1c5a-4e78-923f-f830a384e9cd.png" 
                alt="Harlow" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-[#3D3D3D]" style={{ fontFamily: "'Pacifico', cursive" }}>
              Harlow
            </span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('flavors')}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <i className="ri-cake-3-line text-xl text-[#E8927C] group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-semibold text-[#3D3D3D] group-hover:text-[#5B8C7B] transition-colors whitespace-nowrap">
                FLAVORS
              </span>
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <i className="ri-heart-3-line text-xl text-[#E8927C] group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-semibold text-[#3D3D3D] group-hover:text-[#5B8C7B] transition-colors whitespace-nowrap">
                STORY
              </span>
            </button>
            <button
              onClick={() => scrollToSection('shops')}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <i className="ri-map-pin-line text-xl text-[#E8927C] group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-semibold text-[#3D3D3D] group-hover:text-[#5B8C7B] transition-colors whitespace-nowrap">
                SHOPS
              </span>
            </button>
            <button
              onClick={() => scrollToSection('online')}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <i className="ri-shopping-bag-line text-xl text-[#E8927C] group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-semibold text-[#3D3D3D] group-hover:text-[#5B8C7B] transition-colors whitespace-nowrap">
                ONLINE
              </span>
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('online')}
            className="bg-[#E8927C] text-white px-6 py-3 rounded-full font-bold text-sm hover:rotate-3 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}

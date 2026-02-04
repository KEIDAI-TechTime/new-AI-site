import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src="https://public.readdy.ai/ai/img_res/a50409bb-d57c-43d2-aa0a-bb1373e520bf.png"
              alt="コードアドベンチャー"
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-primary transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              特徴
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-gray-700 hover:text-primary transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              コース
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-primary transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              受講者の声
            </button>
            <button
              onClick={() => scrollToSection('classroom')}
              className="text-gray-700 hover:text-primary transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              教室案内
            </button>
            <button
              onClick={() => scrollToSection('form')}
              className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
            >
              無料体験申込
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 cursor-pointer"
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-3xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              特徴
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              コース
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              受講者の声
            </button>
            <button
              onClick={() => scrollToSection('classroom')}
              className="block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              教室案内
            </button>
            <button
              onClick={() => scrollToSection('form')}
              className="block w-full text-center mt-4 bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all cursor-pointer"
            >
              無料体験申込
            </button>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

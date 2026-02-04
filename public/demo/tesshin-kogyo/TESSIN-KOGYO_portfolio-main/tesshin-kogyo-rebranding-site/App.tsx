
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import BusinessFlow from './components/BusinessFlow';
import ProductShowcase from './components/ProductShowcase';
import StatsSection from './components/StatsSection';
import CareerSection from './components/CareerSection';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';
import SparkCursor from './components/SparkCursor';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A1628] selection:bg-[#FF6B35] selection:text-white overflow-hidden">
      <SparkCursor />
      <BackgroundAnimation />
      <Navbar />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-[#0A1628] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="text-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-1 bg-[#FF6B35] mb-4"
              />
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-black font-industrial tracking-widest text-white"
              >
                TESSHIN <span className="text-[#FF6B35]">KOGYO</span>
              </motion.h1>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <section id="hero"><Hero /></section>
            <section id="philosophy"><Philosophy /></section>
            <section id="business"><BusinessFlow /></section>
            <section id="products"><ProductShowcase /></section>
            <section id="stats"><StatsSection /></section>
            <section id="careers"><CareerSection /></section>
            <section id="contact"><Contact /></section>
            
            <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5 bg-[#0A1628]/80 backdrop-blur-md">
              <p>© 2024 TESSHIN KOGYO CO., LTD. All Rights Reserved.</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

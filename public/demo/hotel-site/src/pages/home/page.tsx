import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Suites from './components/Suites';
import Dining from './components/Dining';
import Adventures from './components/Adventures';
import Location from './components/Location';
import Culinary from './components/Culinary';
import Wellness from './components/Wellness';
import Heritage from './components/Heritage';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navigation scrolled={scrolled} />
      <Hero />
      <Introduction />
      <Suites />
      <Dining />
      <Adventures />
      <Location />
      <Culinary />
      <Wellness />
      <Heritage />
      <Gallery />
      <Footer />
    </div>
  );
}
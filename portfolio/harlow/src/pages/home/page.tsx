import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import FlavorsSection from './components/FlavorsSection';
import StorySection from './components/StorySection';
import ShopsSection from './components/ShopsSection';
import OnlineShopSection from './components/OnlineShopSection';
import Footer from './components/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSection />
      <FlavorsSection />
      <StorySection />
      <ShopsSection />
      <OnlineShopSection />
      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { flavorsData } from '../../../mocks/flavors';

export default function FlavorsSection() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    setFlippedCards(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="flavors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <i className="ri-vip-crown-line text-3xl text-[#F2C94C] absolute -top-8 left-1/2 transform -translate-x-1/2"></i>
            <h2
              className="text-6xl md:text-7xl font-black text-[#5B8C7B] mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              OUR FLAVORS
            </h2>
          </div>
          <p className="text-xl text-[#E8927C] mt-4" style={{ fontFamily: "'Pacifico', cursive" }}>
            Made fresh daily in our kitchen
          </p>
        </div>

        {/* Flavor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flavorsData.map((flavor, index) => (
            <div
              key={index}
              className="relative h-96 cursor-pointer perspective-1000"
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
                  flippedCards.includes(index) ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 rounded-3xl border-4 border-white shadow-xl backface-hidden"
                  style={{
                    backgroundColor: flavor.bgColor,
                    boxShadow: '0 0 0 2px #3D3D3D',
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    {/* Ice Cream Illustration */}
                    <div className="relative mb-6">
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className="w-48 h-48 object-contain drop-shadow-2xl"
                      />
                      {/* Sparkles */}
                      <i className="ri-sparkling-line absolute -top-2 -right-2 text-2xl text-[#F2C94C] animate-pulse"></i>
                      <i className="ri-sparkling-line absolute -bottom-2 -left-2 text-xl text-[#E8927C] animate-pulse delay-100"></i>
                    </div>

                    {/* Flavor Name */}
                    <h3 className="text-3xl font-black text-[#3D3D3D] mb-2 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {flavor.name}
                    </h3>

                    {/* Price */}
                    <p className="text-2xl font-bold text-[#5B8C7B] mb-4">¥{flavor.price}</p>

                    {/* Wave Decoration */}
                    <div className="w-24 h-1 bg-[#E8927C] rounded-full"></div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 rounded-3xl border-4 border-white shadow-xl backface-hidden rotate-y-180"
                  style={{
                    backgroundColor: flavor.bgColor,
                    boxShadow: '0 0 0 2px #3D3D3D',
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    {/* Dot Pattern Background */}
                    <div
                      className="absolute inset-0 opacity-10 rounded-3xl"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #3D3D3D 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    ></div>

                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl font-black text-[#3D3D3D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {flavor.name}
                      </h3>
                      <p className="text-sm text-[#3D3D3D] leading-relaxed mb-6">
                        {flavor.description}
                      </p>
                      <button className="bg-white text-[#3D3D3D] px-8 py-3 rounded-full font-bold text-sm border-4 border-[#E8927C] hover:bg-[#E8927C] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer">
                        TRY ME!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

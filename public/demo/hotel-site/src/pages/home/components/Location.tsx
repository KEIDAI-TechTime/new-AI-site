export default function Location() {
  return (
    <section id="location" className="relative py-32 px-8 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=Stunning%20aerial%20view%20of%20Paris%20cityscape%20at%20sunset%20featuring%20iconic%20Haussmann%20architecture%20rooftops%20Eiffel%20Tower%20in%20distance%20warm%20golden%20hour%20lighting%20showcasing%20the%20elegant%20urban%20landscape%20of%20the%20French%20capital%20city&width=1920&height=1080&seq=location001&orientation=landscape"
          alt="Paris Location"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl text-white">
          <p className="text-sm tracking-widest uppercase mb-6">The Most Parisian Palace</p>
          <h3 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
            In the Heart of the City of Light
          </h3>
          <p className="text-lg leading-relaxed mb-6 text-white/90">
            Perfectly positioned near the Arc de Triomphe and the Champs-Élysées, Le Royal Monceau Raffles Paris offers unparalleled access to the city's most iconic landmarks, world-class shopping, and cultural treasures.
          </p>
          <p className="text-base leading-relaxed mb-8 text-white/90">
            Just steps away from the finest museums, galleries, and theaters, our location embodies the essence of Parisian elegance and sophistication. Experience the magic of Paris from the perfect vantage point.
          </p>
          <button className="px-10 py-4 bg-white text-gray-900 text-sm tracking-widest whitespace-nowrap hover:bg-gray-100 transition-colors">
            VIEW MAP
          </button>
        </div>
      </div>
    </section>
  );
}
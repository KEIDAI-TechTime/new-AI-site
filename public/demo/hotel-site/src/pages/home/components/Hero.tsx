export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=Elegant%20luxury%20hotel%20facade%20in%20Paris%20with%20classic%20French%20architecture%20featuring%20ornate%20balconies%20arched%20windows%20and%20grand%20entrance%20with%20red%20canopy%20awning%20shot%20during%20golden%20hour%20with%20warm%20lighting%20showcasing%20the%20prestigious%20Haussmann%20style%20building%20exterior&width=1920&height=1080&seq=hero001&orientation=landscape"
          alt="Le Royal Monceau Raffles Paris"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-6xl md:text-7xl font-serif text-white mb-4 tracking-wide">
          Le Royal Monceau Raffles
        </h2>
        <p className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wider">
          Paris
        </p>
        <button className="mt-8 px-10 py-4 bg-white text-gray-900 text-sm tracking-widest whitespace-nowrap hover:bg-gray-100 transition-colors">
          DISCOVER MORE
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <i className="ri-arrow-down-line text-white text-3xl animate-bounce"></i>
      </div>
    </section>
  );
}
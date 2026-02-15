export default function Dining() {
  return (
    <section id="dining" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=Elegant%20outdoor%20dining%20terrace%20setup%20with%20fine%20dining%20table%20settings%20featuring%20crystal%20glassware%20white%20linens%20fresh%20flowers%20and%20sophisticated%20place%20settings%20in%20a%20luxury%20Parisian%20garden%20setting%20with%20soft%20natural%20lighting%20and%20refined%20ambiance&width=1920&height=1080&seq=dining001&orientation=landscape"
          alt="Dining Experience"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <div className="max-w-3xl text-center text-white">
          <p className="text-sm tracking-widest uppercase mb-6">Culinary Excellence</p>
          <h3 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
            A Gastronomic Journey
          </h3>
          <p className="text-lg leading-relaxed mb-8 text-white/90">
            Indulge in exceptional dining experiences crafted by world-renowned chefs. From Michelin-starred cuisine to intimate cocktail lounges, every venue offers a unique celebration of flavors and artistry.
          </p>
          <button className="px-10 py-4 bg-white text-gray-900 text-sm tracking-widest whitespace-nowrap hover:bg-gray-100 transition-colors">
            EXPLORE DINING
          </button>
        </div>
      </div>
    </section>
  );
}
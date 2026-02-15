export default function Culinary() {
  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full h-[600px]">
            <img 
              src="https://readdy.ai/api/search-image?query=Exquisite%20fine%20dining%20gourmet%20dishes%20beautifully%20plated%20on%20elegant%20white%20porcelain%20featuring%20artistic%20presentation%20with%20fresh%20ingredients%20vibrant%20colors%20and%20sophisticated%20culinary%20techniques%20showcasing%20Michelin%20star%20level%20French%20haute%20cuisine%20gastronomy&width=800&height=1000&seq=culinary001&orientation=portrait"
              alt="Culinary Excellence"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-sm tracking-widest text-gray-500 uppercase">Culinary Artistry</p>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              A Taste of Perfection
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Our culinary offerings celebrate the finest French gastronomy, reimagined with contemporary flair. Each restaurant and bar within Le Royal Monceau presents a distinct atmosphere and menu, crafted by talented chefs who honor tradition while embracing innovation.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              From the two-Michelin-starred Il Carpaccio to the vibrant Long Bar, every venue promises an unforgettable dining experience. Savor seasonal ingredients, impeccable service, and an ambiance that captures the spirit of Parisian joie de vivre.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="text-2xl font-serif text-gray-900 mb-2">Il Carpaccio</h4>
                <p className="text-sm text-gray-600">Two Michelin Stars</p>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-gray-900 mb-2">Matsuhisa</h4>
                <p className="text-sm text-gray-600">Japanese Fusion</p>
              </div>
            </div>
            <button className="mt-6 px-8 py-3 border border-gray-900 text-gray-900 text-sm tracking-wide whitespace-nowrap hover:bg-gray-900 hover:text-white transition-all">
              View All Restaurants
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
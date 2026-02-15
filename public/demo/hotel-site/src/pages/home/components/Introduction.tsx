export default function Introduction() {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full h-[600px]">
            <img 
              src="https://readdy.ai/api/search-image?query=Luxurious%20hotel%20interior%20lobby%20with%20contemporary%20art%20deco%20design%20featuring%20elegant%20marble%20floors%20modern%20chandeliers%20plush%20seating%20areas%20and%20sophisticated%20neutral%20color%20palette%20with%20gold%20accents%20showcasing%20refined%20Parisian%20luxury%20hospitality&width=800&height=1000&seq=intro001&orientation=portrait"
              alt="Hotel Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-sm tracking-widest text-gray-500 uppercase">A Timeless Experience</p>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              Where Art Meets Luxury
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Nestled in the heart of Paris, Le Royal Monceau Raffles Paris stands as a beacon of contemporary luxury and artistic excellence. Reimagined by Philippe Starck, our palace hotel seamlessly blends modern design with timeless elegance, creating an unforgettable experience for discerning travelers.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              From our exceptional suites to our world-class dining venues, every detail has been carefully curated to provide an unparalleled stay. Discover a sanctuary where art, culture, and refined hospitality converge in perfect harmony.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Experience the epitome of Parisian sophistication, where every moment is crafted to inspire and delight. Our dedicated team ensures that your stay transcends expectations, offering personalized service that reflects the legendary Raffles tradition.
            </p>
            <button className="mt-6 px-8 py-3 border border-gray-900 text-gray-900 text-sm tracking-wide whitespace-nowrap hover:bg-gray-900 hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
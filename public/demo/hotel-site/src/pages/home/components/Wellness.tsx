export default function Wellness() {
  return (
    <section id="wellness" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-sm tracking-widest text-gray-500 uppercase">My Blend by Clarins</p>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              A Sanctuary of Wellness
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Discover a 1,500-square-meter wellness haven designed to rejuvenate body and mind. Our exclusive spa, My Blend by Clarins, offers personalized treatments in a serene environment that combines cutting-edge technology with time-honored techniques.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Featuring a 23-meter swimming pool, state-of-the-art fitness center, and luxurious treatment rooms, our spa provides a complete wellness experience. Each treatment is tailored to your individual needs, ensuring optimal relaxation and renewal.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <i className="ri-water-flash-line text-3xl text-gray-900"></i>
                </div>
                <p className="text-sm text-gray-600">23m Pool</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-3xl text-gray-900"></i>
                </div>
                <p className="text-sm text-gray-600">Spa Treatments</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <i className="ri-run-line text-3xl text-gray-900"></i>
                </div>
                <p className="text-sm text-gray-600">Fitness Center</p>
              </div>
            </div>
            <button className="mt-6 px-8 py-3 border border-gray-900 text-gray-900 text-sm tracking-wide whitespace-nowrap hover:bg-gray-900 hover:text-white transition-all">
              Explore Wellness
            </button>
          </div>
          <div className="w-full h-[600px]">
            <img 
              src="https://readdy.ai/api/search-image?query=Serene%20luxury%20spa%20treatment%20room%20with%20modern%20minimalist%20design%20featuring%20clean%20white%20surfaces%20soft%20ambient%20lighting%20massage%20table%20with%20plush%20linens%20and%20tranquil%20atmosphere%20creating%20peaceful%20wellness%20sanctuary%20in%20Parisian%20luxury%20hotel&width=800&height=1000&seq=wellness001&orientation=portrait"
              alt="Wellness Spa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
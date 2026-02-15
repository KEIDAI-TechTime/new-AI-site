export default function Gallery() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Moments of Elegance
          </h3>
          <p className="text-gray-400 text-base">A glimpse into the world of Le Royal Monceau</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full h-[500px]">
            <img 
              src="https://readdy.ai/api/search-image?query=Elegant%20luxury%20hotel%20suite%20bedroom%20interior%20with%20sophisticated%20contemporary%20design%20featuring%20plush%20king%20bed%20fine%20linens%20designer%20furniture%20modern%20artwork%20and%20refined%20neutral%20color%20palette%20showcasing%20Parisian%20luxury%20hospitality%20excellence&width=800&height=1000&seq=gallery001&orientation=portrait"
              alt="Gallery Image"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full h-[242px]">
              <img 
                src="https://readdy.ai/api/search-image?query=Sophisticated%20luxury%20hotel%20bar%20interior%20with%20elegant%20design%20featuring%20premium%20spirits%20display%20ambient%20lighting%20plush%20seating%20and%20refined%20contemporary%20decor%20creating%20intimate%20upscale%20atmosphere%20in%20Parisian%20luxury%20hospitality%20venue&width=800&height=500&seq=gallery002&orientation=landscape"
                alt="Gallery Image"
                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
            </div>
            <div className="w-full h-[242px]">
              <img 
                src="https://readdy.ai/api/search-image?query=Luxurious%20hotel%20bathroom%20interior%20with%20modern%20elegant%20design%20featuring%20marble%20surfaces%20contemporary%20fixtures%20designer%20amenities%20and%20sophisticated%20lighting%20creating%20spa-like%20atmosphere%20in%20Parisian%20luxury%20hospitality%20suite&width=800&height=500&seq=gallery003&orientation=landscape"
                alt="Gallery Image"
                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
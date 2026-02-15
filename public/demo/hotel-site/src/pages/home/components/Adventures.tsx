import { adventures } from '../../../mocks/adventures';

export default function Adventures() {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Adventures & Encounters</p>
              <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-6">
                Discover Paris Like Never Before
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Embark on curated experiences that reveal the hidden treasures of Paris. From private art tours to exclusive cultural encounters, our concierge team crafts bespoke adventures tailored to your passions and interests.
              </p>
            </div>
            {adventures.slice(0, 2).map((adventure, index) => (
              <div key={index} className="border-t border-gray-200 pt-6">
                <h4 className="text-xl font-serif text-gray-900 mb-3">{adventure.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{adventure.description}</p>
                <a href="#" className="text-sm tracking-wide text-gray-900 hover:opacity-70 transition-opacity inline-flex items-center whitespace-nowrap">
                  Learn More <i className="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="w-full h-[500px]">
              <img 
                src="https://readdy.ai/api/search-image?query=Elegant%20luxury%20hotel%20spa%20interior%20with%20modern%20minimalist%20design%20featuring%20sleek%20black%20marble%20walls%20contemporary%20lighting%20fixtures%20and%20sophisticated%20wellness%20treatment%20rooms%20showcasing%20refined%20Parisian%20luxury%20hospitality%20architecture&width=800&height=1000&seq=adv001&orientation=portrait"
                alt="Hotel Experience"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[400px]">
              <img 
                src="https://readdy.ai/api/search-image?query=Bright%20airy%20luxury%20hotel%20spa%20pool%20area%20with%20turquoise%20blue%20water%20modern%20minimalist%20design%20white%20walls%20contemporary%20architecture%20and%20natural%20lighting%20creating%20serene%20wellness%20atmosphere%20in%20Parisian%20luxury%20hospitality%20setting&width=800&height=800&seq=adv002&orientation=squarish"
                alt="Wellness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
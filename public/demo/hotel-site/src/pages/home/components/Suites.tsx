import { suites } from '../../../mocks/suites';

export default function Suites() {
  return (
    <section id="suites" className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Exceptional Suites</p>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">
            Your Parisian Sanctuary
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suites.map((suite, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative w-full h-[400px] overflow-hidden mb-6">
                <img 
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">{suite.name}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{suite.description}</p>
              <a href="#" className="text-sm tracking-wide text-gray-900 hover:opacity-70 transition-opacity inline-flex items-center whitespace-nowrap">
                Explore Suite <i className="ri-arrow-right-line ml-2"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
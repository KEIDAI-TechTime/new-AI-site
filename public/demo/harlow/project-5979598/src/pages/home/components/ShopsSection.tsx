import { shopsData } from '../../../mocks/shops';

export default function ShopsSection() {
  return (
    <section id="shops" className="py-24 bg-gradient-to-b from-[#5B8C7B]/20 to-[#5B8C7B]/40">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2
              className="text-7xl md:text-8xl font-black text-white mb-4"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                textShadow: '0 0 20px rgba(232,146,124,0.5), 3px 3px 0 #E8927C, -1px -1px 0 #E8927C, 1px -1px 0 #E8927C, -1px 1px 0 #E8927C',
              }}
            >
              VISIT US
            </h2>
            {/* Wave Decorations */}
            <div className="absolute -top-8 left-0 right-0 h-2 bg-[#E8927C] rounded-full"></div>
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-[#F2C94C] rounded-full"></div>
          </div>
        </div>

        {/* Shop Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {shopsData.map((shop, index) => (
            <div
              key={index}
              className="bg-[#F4E4D4] rounded-2xl overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
              style={{
                border: '6px solid transparent',
                backgroundImage: 'linear-gradient(#F4E4D4, #F4E4D4), repeating-linear-gradient(90deg, #E8927C 0px, #E8927C 3px, #5B8C7B 3px, #5B8C7B 6px)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              {/* Stamp Decoration */}
              <div className="absolute top-4 right-4 w-16 h-20 bg-white border-2 border-dashed border-[#3D3D3D] flex items-center justify-center z-10 rotate-12">
                <i className="ri-cake-3-fill text-3xl text-[#E8927C]"></i>
              </div>

              {/* Shop Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
                {/* OPEN Badge */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#F2C94C] border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-xs font-black text-[#3D3D3D]">OPEN</span>
                </div>
                {/* AIR MAIL Stamp */}
                <div className="absolute bottom-4 left-4 bg-[#E8927C]/80 text-white px-4 py-2 transform -rotate-12 font-bold text-xs">
                  AIR MAIL
                </div>
              </div>

              {/* Shop Info */}
              <div className="p-8">
                <h3 className="text-4xl font-black text-[#3D3D3D] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {shop.name}
                </h3>

                <div className="space-y-3 text-sm text-[#3D3D3D]">
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-fill text-xl text-[#E8927C] flex-shrink-0"></i>
                    <p className="leading-relaxed">{shop.address}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-time-fill text-xl text-[#5B8C7B] flex-shrink-0"></i>
                    <div>
                      <p className="leading-relaxed">{shop.hours}</p>
                      {shop.brunchHours && (
                        <p className="text-xs text-[#3D3D3D]/70 mt-1">{shop.brunchHours}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-calendar-fill text-xl text-[#F2C94C] flex-shrink-0"></i>
                    <p className="leading-relaxed">{shop.closed}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-phone-fill text-xl text-[#E8927C] flex-shrink-0"></i>
                    <p className="leading-relaxed">{shop.phone}</p>
                  </div>
                </div>

                <p className="mt-6 text-xs italic text-[#3D3D3D]/70">
                  {shop.feature}
                </p>
              </div>

              {/* Postmark Decoration */}
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2 border-[#3D3D3D]/20 flex items-center justify-center opacity-30">
                <span className="text-xs font-bold text-[#3D3D3D] text-center">HARLOW<br/>ICE CREAM</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

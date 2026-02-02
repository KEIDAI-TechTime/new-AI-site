export default function StorySection() {
  return (
    <section id="story" className="py-24 bg-gradient-to-b from-white to-[#F4E4D4]/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Text Area */}
          <div className="lg:col-span-2 relative">
            <div className="bg-[#F2C94C]/20 p-12 rounded-3xl relative">
              {/* EST Badge */}
              <div className="absolute -top-4 -left-4 bg-[#E8927C] text-white px-4 py-2 rounded-full transform -rotate-12 shadow-lg">
                <span className="text-xs font-bold">EST. 2017</span>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-5xl text-[#5B8C7B] mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Our
                </h2>
                <h2 className="text-7xl font-black text-[#3D3D3D]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Story
                </h2>
                <i className="ri-heart-3-fill text-3xl text-[#E8927C] ml-4"></i>
              </div>

              {/* Story Text */}
              <div className="space-y-6 text-[#3D3D3D]">
                <div className="flex gap-3">
                  <i className="ri-cake-3-line text-xl text-[#5B8C7B] flex-shrink-0 mt-1"></i>
                  <p className="leading-relaxed text-sm">
                    2017年、神戸の海沿いに小さなアイスクリームショップをオープンしました。すべてのフレーバーを店内で手作りし、コーンまで自家製にこだわっています。
                  </p>
                </div>
                <div className="flex gap-3">
                  <i className="ri-cake-3-line text-xl text-[#5B8C7B] flex-shrink-0 mt-1"></i>
                  <p className="leading-relaxed text-sm">
                    私たちのアイスクリームは、1950年代のアメリカンパーラーの楽しさと温かみを現代に蘇らせます。厳選された素材と愛情を込めて、毎日新鮮なアイスクリームをお届けしています。
                  </p>
                </div>
                <div className="flex gap-3">
                  <i className="ri-cake-3-line text-xl text-[#5B8C7B] flex-shrink-0 mt-1"></i>
                  <p className="leading-relaxed text-sm">
                    Beyond Coffee RoastersのコーヒーとSMITH TEAの紅茶と共に、特別なひとときをお楽しみください。
                  </p>
                </div>
              </div>

              <a href="#shops" className="inline-block mt-8 text-[#E8927C] font-bold text-sm border-b-2 border-[#E8927C] hover:text-[#5B8C7B] hover:border-[#5B8C7B] transition-colors cursor-pointer">
                Read more about us →
              </a>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="lg:col-span-3 relative h-[600px]">
            {/* Stats */}
            <div className="absolute top-0 right-0 z-20 flex gap-8">
              <div className="text-right">
                <div className="w-24 h-24 rounded-full bg-[#F2C94C] flex items-center justify-center mb-2 shadow-xl">
                  <span className="text-5xl font-black text-[#3D3D3D]">2</span>
                </div>
                <span className="text-xs font-semibold text-[#3D3D3D]">LOCATIONS</span>
              </div>
              <div className="text-right">
                <div className="w-24 h-24 rounded-full bg-[#F2C94C] flex items-center justify-center mb-2 shadow-xl">
                  <span className="text-4xl font-black text-[#3D3D3D]">7+</span>
                </div>
                <span className="text-xs font-semibold text-[#3D3D3D]">YEARS</span>
              </div>
            </div>

            {/* Polaroid Photos */}
            <div className="relative w-full h-full">
              {/* Photo 1 - Kobe */}
              <div
                className="absolute top-20 left-0 w-80 bg-white p-5 pb-16 shadow-2xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Cozy%20handmade%20ice%20cream%20parlor%20shop%20interior%20with%20vintage%201950s%20American%20diner%20aesthetic%2C%20wooden%20counter%20with%20glass%20display%20case%20showing%20colorful%20ice%20cream%2C%20warm%20lighting%2C%20retro%20mint%20and%20coral%20pink%20accents%2C%20located%20by%20the%20seaside%20in%20Kobe%20Japan%2C%20welcoming%20atmosphere%20with%20handcrafted%20details%20and%20nostalgic%20charm&width=400&height=400&seq=kobe-shop-001&orientation=squarish"
                  alt="Kobe Shop"
                  className="w-full h-80 object-cover"
                />
                <p className="text-center mt-4 text-[#3D3D3D] font-bold" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Kobe Shop
                </p>
                {/* Masking Tape */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[#F2C94C]/60 -rotate-12"></div>
              </div>

              {/* Photo 2 - Tokyo */}
              <div
                className="absolute bottom-0 right-0 w-72 bg-white p-5 pb-16 shadow-2xl transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer z-10"
                style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Elegant%20handmade%20ice%20cream%20shop%20storefront%20in%20quiet%20residential%20area%20of%20Hiroo%20Tokyo%2C%20modern%20minimalist%20exterior%20with%20vintage%20American%20parlor%20touches%2C%20large%20windows%20showing%20interior%2C%20soft%20afternoon%20light%2C%20sophisticated%20yet%20nostalgic%20atmosphere%2C%20clean%20simple%20background%20highlighting%20the%20charming%20shop%20facade&width=350&height=450&seq=tokyo-shop-001&orientation=portrait"
                  alt="Tokyo Shop"
                  className="w-full h-96 object-cover"
                />
                <p className="text-center mt-4 text-[#3D3D3D] font-bold" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Tokyo Shop
                </p>
                {/* Masking Tape */}
                <div className="absolute -top-2 right-8 w-16 h-6 bg-[#E8927C]/60 rotate-12"></div>
              </div>
            </div>

            {/* Dot Pattern Background */}
            <div
              className="absolute inset-0 opacity-5 -z-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #3D3D3D 2px, transparent 2px)',
                backgroundSize: '30px 30px',
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

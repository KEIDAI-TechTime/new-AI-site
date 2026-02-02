export default function OnlineShopSection() {
  return (
    <section id="online" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left Side - Image */}
        <div className="relative overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Beautiful%20handmade%20ice%20cream%20gift%20box%20packaging%20with%20vintage%201950s%20American%20parlor%20design%2C%20colorful%20ice%20cream%20containers%20arranged%20in%20elegant%20box%2C%20retro%20coral%20pink%20and%20mint%20green%20colors%2C%20premium%20quality%20presentation%2C%20simple%20clean%20background%20highlighting%20the%20attractive%20packaging%2C%20nostalgic%20yet%20modern%20aesthetic&width=800&height=600&seq=online-shop-001&orientation=landscape"
            alt="Ice Cream Box"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8927C]/30 to-transparent"></div>

          {/* Text Overlay */}
          <div className="absolute bottom-12 left-12 z-10">
            <div className="inline-block border-2 border-white px-4 py-2 mb-4">
              <span className="text-white text-xs font-bold tracking-widest">ONLINE SHOP</span>
            </div>
            <div className="flex items-end gap-4">
              <div>
                <h2 className="text-7xl text-white mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                  TAKE
                </h2>
                <h2 className="text-7xl text-white mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                  ME
                </h2>
                <h2 className="text-8xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  HOME!
                </h2>
              </div>
              <i className="ri-arrow-right-line text-6xl text-white mb-4 animate-bounce-horizontal"></i>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="relative bg-white flex flex-col items-center justify-center p-12 lg:p-20">
          {/* Background Decorations */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 10 L35 25 L50 25 L38 35 L43 50 L30 40 L17 50 L22 35 L10 25 L25 25 Z\' fill=\'%233D3D3D\' /%3E%3C/svg%3E")',
              backgroundSize: '80px 80px',
            }}
          ></div>

          <div className="relative z-10 text-center max-w-md">
            <h2 className="text-6xl font-black text-[#3D3D3D] mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Enjoy<br />Harlow
            </h2>

            <p className="text-sm text-[#3D3D3D]/80 leading-relaxed mb-8">
              全国どこでもHarlowのアイスクリームをお届けします。
              <br />
              <br />
              ギフトボックスもご用意しております。大切な方への贈り物に、特別な日のお祝いに、Harlowの手作りアイスクリームをお選びください。
              <br />
              <br />
              <strong className="text-[#5B8C7B]">全国配送対応</strong> | <strong className="text-[#E8927C]">ギフトラッピング無料</strong>
            </p>

            <button className="group bg-[#3D3D3D] text-white px-12 py-4 rounded-full font-bold text-sm hover:bg-[#5B8C7B] hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 mx-auto whitespace-nowrap cursor-pointer">
              SHOP NOW
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

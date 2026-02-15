export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-xl font-serif mb-6">Le Royal Monceau</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              37 Avenue Hoche<br />
              75008 Paris, France<br />
              +33 1 42 99 88 00
            </p>
          </div>
          <div>
            <h5 className="text-sm tracking-widest uppercase mb-6">Accommodations</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Rooms & Suites</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Presidential Suite</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Special Offers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm tracking-widest uppercase mb-6">Experiences</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Dining</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Spa & Wellness</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Art & Culture</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Events</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm tracking-widest uppercase mb-6">Connect</h5>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-gray-600 hover:border-white transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-gray-600 hover:border-white transition-colors cursor-pointer">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-gray-600 hover:border-white transition-colors cursor-pointer">
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
            </div>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">
              Newsletter Subscription
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 Le Royal Monceau Raffles Paris. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">Terms of Use</a>
            <a href="https://readdy.ai/?ref=logo" className="text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">Website Builder</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
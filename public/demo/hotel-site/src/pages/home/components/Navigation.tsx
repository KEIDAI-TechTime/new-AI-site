interface NavigationProps {
  scrolled: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <h1>
              <a href="/" className={`text-2xl font-serif tracking-wider ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Le Royal Monceau Raffles Paris
              </a>
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#suites" className={`text-sm tracking-wide whitespace-nowrap hover:opacity-70 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Suites
            </a>
            <a href="#dining" className={`text-sm tracking-wide whitespace-nowrap hover:opacity-70 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Dining
            </a>
            <a href="#wellness" className={`text-sm tracking-wide whitespace-nowrap hover:opacity-70 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Wellness
            </a>
            <a href="#location" className={`text-sm tracking-wide whitespace-nowrap hover:opacity-70 transition-opacity ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Location
            </a>
            <button className={`px-6 py-2 text-sm tracking-wide whitespace-nowrap border transition-all ${scrolled ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-900'}`}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
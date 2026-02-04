import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollToForm = () => {
    const element = document.getElementById('form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Colorful%20isometric%203D%20illustration%20of%20a%20fantasy%20adventure%20map%20with%20treasure%20chests%2C%20rockets%2C%20robots%2C%20compass%2C%20mountains%2C%20and%20coding%20elements%20in%20a%20playful%20cartoon%20style%20with%20bright%20orange%20and%20turquoise%20colors%20on%20a%20warm%20cream%20background%2C%20top-down%20view%2C%20game-like%20aesthetic%2C%20child-friendly%20design&width=1920&height=1080&seq=hero-bg-001&orientation=landscape"
          alt="冒険の地図"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            きみの冒険が<br />はじまる！
          </h1>
          <p className="text-xl md:text-3xl text-white font-bold mb-4 drop-shadow-md">
            ゲームをつくりながら、考える力を育てよう
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 drop-shadow-md font-medium">
            プログラミングは、きみだけの冒険だ。
          </p>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 140, 66, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl hover:bg-opacity-90 transition-all inline-flex items-center space-x-3 whitespace-nowrap cursor-pointer"
          >
            <span>無料体験に申し込む</span>
            <i className="ri-arrow-right-line text-2xl"></i>
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-16 h-16 flex items-center justify-center"
        >
          <i className="ri-rocket-line text-6xl text-primary drop-shadow-lg"></i>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute top-1/3 right-10 w-16 h-16 flex items-center justify-center"
        >
          <i className="ri-treasure-map-line text-6xl text-accent drop-shadow-lg"></i>
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-16 h-16 flex items-center justify-center"
        >
          <i className="ri-compass-3-line text-6xl text-primary drop-shadow-lg"></i>
        </motion.div>
      </div>
    </section>
  );
}

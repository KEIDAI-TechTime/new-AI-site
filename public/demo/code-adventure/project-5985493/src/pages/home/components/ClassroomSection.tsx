import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const galleryImages = [
  {
    url: 'https://static.readdy.ai/image/9cccc7697d198734aa718bd2a70664c9/70eee5d75416d3bd3aabce461cf9e2a9.png',
    alt: '教室の様子1',
  },
  {
    url: 'https://static.readdy.ai/image/9cccc7697d198734aa718bd2a70664c9/574507f93817215bc41207889642d450.png',
    alt: '教室の様子2',
  },
  {
    url: 'https://static.readdy.ai/image/9cccc7697d198734aa718bd2a70664c9/31baf583b7159657d4c71100786e122f.png',
    alt: '教室の様子3',
  },
];

export default function ClassroomSection() {
  // useInView returns a ref to attach to the DOM element and a boolean indicating visibility.
  const [ref, isInView] = useInView({ threshold: 0.2 });

  // Guard against undefined values – it shouldn't happen, but it makes the component safer.
  const animationState = isInView ? { opacity: 1, y: 0 } : {};

  return (
    <section id="classroom" ref={ref} className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationState}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            教室紹介・アクセス
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            明るく楽しい学習環境をご用意しています
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={animationState}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <div className="w-full h-64">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={animationState}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
                <i className="ri-map-pin-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">教室所在地</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>コードアドベンチャー 本校</strong><br />
              〒150-0001<br />
              東京都渋谷区神宮前1-2-3<br />
              アドベンチャービル 3F
            </p>
            <p className="text-gray-600 text-sm">
              <i className="ri-train-line mr-2"></i>
              JR原宿駅より徒歩5分<br />
              <i className="ri-subway-line mr-2"></i>
              東京メトロ明治神宮前駅より徒歩3分
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={animationState}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center">
                <i className="ri-computer-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">オンライン受講</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              遠方の方や、ご自宅で学習したい方には<strong>オンライン受講</strong>もご用意しています。
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-accent mr-2"></i>
                全国どこからでも受講可能
              </li>
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-accent mr-2"></i>
                対面授業と同じカリキュラム
              </li>
              <li className="flex items-center">
                <i className="ri-checkbox-circle-fill text-accent mr-2"></i>
                少人数制で丁寧な指導
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationState}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2479707287677!2d139.70273831525895!3d35.67014098019441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca7595ddb4f%3A0x5d4e4c3d3c3d3c3d!2z5p2x5Lqs6YO95riL6LC35Yy6!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="教室の地図"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

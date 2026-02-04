import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: 'ri-gamepad-line',
    title: 'ゲームで学ぶから楽しい',
    description: '自分だけのゲームをつくりながら、プログラミングの基礎を楽しく学べます。遊びながら学ぶから、夢中になれる！',
    color: 'bg-primary',
  },
  {
    icon: 'ri-trophy-line',
    title: 'レベルアップ方式で達成感',
    description: 'ステージをクリアするごとにレベルアップ！小さな成功体験を積み重ねて、自信と実力を育てます。',
    color: 'bg-accent',
  },
  {
    icon: 'ri-parent-line',
    title: '親子で成長を実感',
    description: '定期的な学習レポートで、お子様の成長を見える化。保護者の方も安心してサポートできます。',
    color: 'bg-primary',
  },
];

export default function FeaturesSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="features" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            コードアドベンチャーの<br className="md:hidden" />3つの特徴
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            子どもたちが夢中になれる理由があります
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-cream rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className={`${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <i className={`${feature.icon} text-5xl text-white`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

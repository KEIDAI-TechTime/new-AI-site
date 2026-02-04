import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const courses = [
  {
    level: 'ビギナーコース',
    target: '小1〜小3',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-400',
    icon: 'ri-seedling-line',
    description: 'はじめてのプログラミング！ブロックを組み合わせて、キャラクターを動かそう。',
    features: ['ビジュアルプログラミング', '基本的な命令を学ぶ', '簡単なゲーム制作'],
    image: 'https://readdy.ai/api/search-image?query=Cute%20isometric%203D%20illustration%20of%20young%20children%20learning%20basic%20programming%20with%20colorful%20blocks%20and%20simple%20robots%20in%20a%20bright%20classroom%20setting%2C%20playful%20cartoon%20style%20with%20warm%20orange%20tones%2C%20beginner-friendly%20atmosphere%2C%20educational%20game%20elements&width=800&height=600&seq=course-beginner-001&orientation=landscape',
  },
  {
    level: 'アドベンチャーコース',
    target: '小3〜小6',
    color: 'bg-gradient-to-br from-blue-400 to-cyan-400',
    icon: 'ri-compass-3-line',
    description: '本格的なゲーム制作に挑戦！自分だけのオリジナル作品をつくろう。',
    features: ['Scratchでゲーム制作', '変数と条件分岐', 'アニメーション制作'],
    image: 'https://readdy.ai/api/search-image?query=Isometric%203D%20illustration%20of%20elementary%20school%20students%20creating%20adventure%20games%20with%20coding%20blocks%2C%20treasure%20maps%2C%20and%20game%20characters%20in%20a%20vibrant%20turquoise%20and%20blue%20themed%20environment%2C%20intermediate%20level%20programming%20concepts%2C%20engaging%20educational%20setting&width=800&height=600&seq=course-adventure-001&orientation=landscape',
  },
  {
    level: 'マスターコース',
    target: '小5〜中学生',
    color: 'bg-gradient-to-br from-purple-400 to-pink-400',
    icon: 'ri-trophy-line',
    description: 'テキストコーディングでアプリ開発！プロの技術を身につけよう。',
    features: ['Python/JavaScript', 'Web開発の基礎', '本格的なアプリ制作'],
    image: 'https://readdy.ai/api/search-image?query=Isometric%203D%20illustration%20of%20advanced%20students%20coding%20real%20applications%20with%20laptops%2C%20code%20editors%2C%20and%20professional%20development%20tools%20in%20a%20sophisticated%20purple%20and%20pink%20themed%20workspace%2C%20master%20level%20programming%2C%20professional%20coding%20environment&width=800&height=600&seq=course-master-001&orientation=landscape',
  },
];

export default function CoursesSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCourse = () => {
    setActiveIndex((prev) => (prev + 1) % courses.length);
  };

  const prevCourse = () => {
    setActiveIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  return (
    <section id="courses" ref={ref} className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            レベル別コース紹介
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            お子様の年齢とレベルに合わせて選べます
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Course Carousel */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ minHeight: '600px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`${courses[activeIndex].color} p-8 md:p-12`}
                style={{ minHeight: '600px' }}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  <div className="text-white">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <i className={`${courses[activeIndex].icon} text-4xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black">
                          {courses[activeIndex].level}
                        </h3>
                        <p className="text-xl font-bold opacity-90">
                          {courses[activeIndex].target}
                        </p>
                      </div>
                    </div>
                    <p className="text-xl mb-8 leading-relaxed">
                      {courses[activeIndex].description}
                    </p>
                    <ul className="space-y-4">
                      {courses[activeIndex].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <i className="ri-checkbox-circle-fill text-2xl"></i>
                          <span className="text-lg font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={courses[activeIndex].image}
                        alt={courses[activeIndex].level}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevCourse}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
          >
            <i className="ri-arrow-left-s-line text-2xl text-gray-800"></i>
          </button>
          <button
            onClick={nextCourse}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer z-10"
          >
            <i className="ri-arrow-right-s-line text-2xl text-gray-800"></i>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {courses.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

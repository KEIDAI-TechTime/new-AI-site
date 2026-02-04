import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    name: 'ゆうと君',
    age: '小学3年生',
    comment: '自分でゲームがつくれるようになって、すごく楽しい！友だちにも見せたら、みんなびっくりしてた！',
    avatar: 'https://readdy.ai/api/search-image?query=Cute%20cartoon%20illustration%20of%20a%20happy%20young%20Japanese%20boy%20with%20short%20black%20hair%20smiling%20cheerfully%2C%20simple%20background%20in%20warm%20cream%20color%2C%20child-friendly%20style%2C%20portrait%20orientation%2C%20anime-inspired%20character%20design&width=200&height=200&seq=student-boy-001&orientation=squarish',
    rating: 5,
  },
  {
    name: 'さくらちゃん',
    age: '小学5年生',
    comment: '最初は難しいと思ったけど、先生がやさしく教えてくれるから大丈夫！今はアプリをつくってます。',
    avatar: 'https://readdy.ai/api/search-image?query=Cute%20cartoon%20illustration%20of%20a%20cheerful%20young%20Japanese%20girl%20with%20long%20black%20hair%20and%20bright%20smile%2C%20simple%20background%20in%20warm%20cream%20color%2C%20child-friendly%20style%2C%20portrait%20orientation%2C%20anime-inspired%20character%20design&width=200&height=200&seq=student-girl-001&orientation=squarish',
    rating: 5,
  },
  {
    name: '田中さん',
    age: '保護者',
    comment: '子どもが毎週楽しみにしています。論理的に考える力がついてきたのを実感しています。親子で話題も増えました。',
    avatar: 'https://readdy.ai/api/search-image?query=Friendly%20cartoon%20illustration%20of%20a%20Japanese%20parent%20with%20warm%20smile%20and%20professional%20appearance%2C%20simple%20background%20in%20warm%20cream%20color%2C%20adult%20character%20design%2C%20portrait%20orientation%2C%20approachable%20style&width=200&height=200&seq=parent-001&orientation=squarish',
    rating: 5,
  },
  {
    name: 'けんた君',
    age: '小学4年生',
    comment: 'レベルアップするのが楽しくて、もっと難しいことにも挑戦したくなる！将来はゲームクリエイターになりたい！',
    avatar: 'https://readdy.ai/api/search-image?query=Cute%20cartoon%20illustration%20of%20an%20energetic%20young%20Japanese%20boy%20with%20spiky%20hair%20and%20excited%20expression%2C%20simple%20background%20in%20warm%20cream%20color%2C%20child-friendly%20style%2C%20portrait%20orientation%2C%20anime-inspired%20character%20design&width=200&height=200&seq=student-boy-002&orientation=squarish',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            生徒・保護者の声
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            実際に通っている方々の声をお届けします
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-cream rounded-3xl p-8 shadow-lg relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center">
                <i className="ri-double-quotes-r text-5xl text-primary/20"></i>
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {testimonial.age}
                  </p>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed pl-20">
                {testimonial.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

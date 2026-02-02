import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitMessage('メールアドレスを入力してください');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await fetch('https://readdy.ai/api/form/d5vvqdskjhtioh5jsd5g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitMessage('ご登録ありがとうございます！');
        setEmail('');
      } else {
        setSubmitMessage('エラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      setSubmitMessage('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#3D5A4F] text-white relative overflow-hidden">
      {/* Top Section - 4 Columns */}
      <div className="relative z-10 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Logo & Info */}
          <div>
            <div className="w-20 h-20 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center mb-4">
              <img 
                src="https://public.readdy.ai/ai/img_res/56ad3c3e-1c5a-4e78-923f-f830a384e9cd.png" 
                alt="Harlow" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Handmade ice cream
              <br />
              since 2017
              <br />
              Kobe & Tokyo
            </p>
          </div>

          {/* Column 2 - Newsletter */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4 text-white/70">NEWSLETTER</h4>
            <form onSubmit={handleSubmit} data-readdy-form id="newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-white/30 py-2 pr-10 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-[#F2C94C] transition-colors cursor-pointer"
                  disabled={isSubmitting}
                >
                  <i className="ri-arrow-right-line text-xl"></i>
                </button>
              </div>
            </form>
            {submitMessage && (
              <p className={`text-xs mt-2 ${submitMessage.includes('ありがとう') ? 'text-[#F2C94C]' : 'text-[#E8927C]'}`}>
                {submitMessage}
              </p>
            )}
            <p className="text-xs text-white/50 mt-3">
              Subscribe to get special offers
            </p>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4 text-white/70">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <a href="#story" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="#flavors" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  Menu
                </a>
              </li>
              <li>
                <a href="mailto:harlow.icecream@gmail.com" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Follow Us */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-4 text-white/70">FOLLOW US</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white hover:underline transition-all cursor-pointer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Section - Large Typography */}
      <div className="relative py-20 px-8 overflow-hidden">
        {/* Stamp Decorations */}
        <div className="absolute top-10 left-10 w-16 h-20 border-2 border-dashed border-white/20 transform rotate-12 flex items-center justify-center">
          <i className="ri-cake-3-line text-2xl text-white/20"></i>
        </div>
        <div className="absolute top-20 right-20 w-20 h-24 border-2 border-dashed border-white/20 transform -rotate-12 flex items-center justify-center">
          <i className="ri-goblet-line text-3xl text-white/20"></i>
        </div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center">
          <span className="text-xs text-white/20 text-center font-bold">HARLOW<br/>2017</span>
        </div>

        {/* Large HARLOW Text */}
        <div className="relative z-10 text-center">
          <h2
            className="text-[120px] md:text-[180px] lg:text-[220px] font-black text-[#F4E4D4] leading-none tracking-tighter"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            HARLOW
          </h2>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-white/50">
          © 2025 SHE&HIM.co.,ltd All rights reserved. | 
          <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors ml-1 cursor-pointer">
            Powered by Readdy
          </a>
        </p>
      </div>
    </footer>
  );
}

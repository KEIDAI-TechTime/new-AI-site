export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-orange-500 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="https://public.readdy.ai/ai/img_res/a50409bb-d57c-43d2-aa0a-bb1373e520bf.png"
              alt="コードアドベンチャー"
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/90 text-sm leading-relaxed">
              プログラミングは、きみだけの冒険だ。
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">メニュー</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  特徴
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  コース紹介
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  受講者の声
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classroom')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  教室案内
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">お問い合わせ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                03-1234-5678
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line mr-2"></i>
                info@code-adventure.jp
              </li>
              <li className="flex items-center">
                <i className="ri-time-line mr-2"></i>
                平日 10:00-19:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">SNS</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm">
          <p className="mb-2">© 2025 株式会社ワンダーテック All Rights Reserved.</p>
          <a
            href="https://readdy.ai/?ref=logo"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            Website Builder
          </a>
        </div>
      </div>
    </footer>
  );
}

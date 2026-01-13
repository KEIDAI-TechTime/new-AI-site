import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページ遷移時に確実にトップにスクロール
    window.scrollTo(0, 0);

    // レンダリング完了後にもう一度確実にスクロール
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

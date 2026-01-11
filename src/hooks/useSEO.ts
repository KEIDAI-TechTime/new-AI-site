import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export function useSEO({
  title = 'TechTime | AI駆動の低価格基幹システム開発',
  description = '従来の半分以下のコストで御社専用の基幹システムを構築。AI駆動開発により設計からテストまで数分で初版生成。文書管理、在庫管理、顧客管理など各種システムに対応。',
  ogType = 'website',
  ogImage = 'https://www.techtime-link.com/wp-content/uploads/2025/06/rogo_ws.png',
  canonical,
  noindex = false,
}: SEOProps = {}) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }

      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);

    // OGP tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Robots tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      const robotsTag = document.querySelector('meta[name="robots"]');
      if (robotsTag) {
        robotsTag.remove();
      }
    }
  }, [title, description, ogType, ogImage, canonical, noindex]);
}

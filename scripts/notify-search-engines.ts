/**
 * IndexNow protocol implementation
 * Notifies search engines immediately when content changes
 * Supported by Bing, Yandex, Seznam.cz, and Naver
 */

const SITE_URL = 'https://techtime-jp.com';

// Pages to notify
const pages = [
  '/',
  '/systems',
  '/simulator',
  '/ai-development',
  '/quality-assurance',
  '/blog',
  '/cases',
  '/about',
  '/contact',
  '/robots.txt',
  '/sitemap.xml',
];

async function notifyIndexNow() {
  const urls = pages.map(page => `${SITE_URL}${page}`);

  // IndexNow API endpoint (Bing)
  const indexNowUrl = 'https://api.indexnow.org/indexnow';

  try {
    const response = await fetch(indexNowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'techtime-jp.com',
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log('✓ IndexNow notification sent successfully');
      console.log(`  Notified ${urls.length} URLs to search engines`);
    } else {
      console.log(`⚠ IndexNow notification failed: ${response.status}`);
    }
  } catch (error) {
    console.log('⚠ IndexNow notification error (non-critical):', error instanceof Error ? error.message : 'Unknown error');
  }
}

// Run notification
console.log('🔔 Notifying search engines of updated content...');
notifyIndexNow();

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    react(),
    tailwind()
  ],
  site: 'https://techtime-jp.com',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['react-markdown']
    }
  }
});

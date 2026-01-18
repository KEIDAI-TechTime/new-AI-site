import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import path from 'path';

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
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts')
      }
    },
    ssr: {
      noExternal: ['react-markdown']
    },
    define: {
      'process.env.NOTION_API_KEY': JSON.stringify(process.env.NOTION_API_KEY),
      'process.env.NOTION_DATABASE_ID': JSON.stringify(process.env.NOTION_DATABASE_ID),
    }
  }
});

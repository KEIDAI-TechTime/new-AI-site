import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  base: '/demo/sap/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname),
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
});

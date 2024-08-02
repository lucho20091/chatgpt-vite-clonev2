import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: '../server/public', // This is where the built files will be output
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Entry point for your Vite app
      },
    },
  },
});
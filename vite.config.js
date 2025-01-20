import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'foodexer/src', // Root for the build process only
  build: {
    outDir: '../dist', // Output folder for the build (relative to the root directory)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'foodexer/src/index.html'), // Entry point for my main page
      },
    },
  },
  // Dev server configuration
  server: {
    // Vite serves from the root project directory (not 'foodexer/src')
    root: 'foodexer',
    open: true, // Open browser automatically on start
  },
});

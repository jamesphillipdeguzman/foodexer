import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'foodexer/src', // Vite will use the 'foodexer/src' folder as the root
  build: {
    outDir: '../dist', // Output folder for the build (relative to the root)

    // Rollup specific configurations
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'foodexer/src/index.html'), // Your main entry point
      },
    },
  },
});

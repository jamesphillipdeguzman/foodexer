import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src', // Vite will use the 'src' folder as the root
  build: {
    outDir: '../dist', // Output folder for the build (relative to the root)

    // Rollup specific configurations
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'), // Your main entry point
      },
    },
  },
});

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist", // Build output directory
    rollupOptions: {
      // This ensures that .mjs files are resolved properly in the build process
      input: resolve(__dirname, 'src/index.html'),
    },
  },
  server: {
    root: "src", // Vite will serve from the src folder
    open: true, // Open the browser automatically
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.json'],
    alias: {
      '@js': resolve(__dirname, 'src/js'),
    },
  },
});

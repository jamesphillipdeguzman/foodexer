import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src/", // Root for the build process only
  build: {
    outDir: "../dist", // Output folder for the build (relative to the root directory)
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/index.html"), // Entry point for my main page
      },
    },
  },
  // Dev server configuration
  server: {
    // Vite serves from the root project directory (not 'foodexer/src')
    root: "src/",
    open: true, // Open browser automatically on start
  },
});

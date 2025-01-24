import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src", // Root folder for your app source code
  build: {
    outDir: "../dist", // Where the build output will go
  },
  server: {
    root: "src", // Vite serves from src folder
    open: true, // Opens the browser automatically
  },
});

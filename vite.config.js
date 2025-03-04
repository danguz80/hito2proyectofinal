import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // 🔥 Solo local, sin GitHub Pages
  build: {
    outDir: "dist",
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hito3proyectofinal/', // 🔥 Volvemos a esto
  build: {
    outDir: 'dist',
  },
});

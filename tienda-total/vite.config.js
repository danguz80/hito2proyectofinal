import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hito2proyectofinal/', // SOLO el nombre del repositorio
  build: {
    outDir: 'dist',
  },
});

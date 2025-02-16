import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hito2proyectofinal/tienda-total/', // Asegura que las rutas sean correctas
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});

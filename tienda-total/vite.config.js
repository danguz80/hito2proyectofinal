import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hito2proyectofinal/tienda-total/', // Ruta base en GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Asegura que los assets estén en la raíz
  },
});

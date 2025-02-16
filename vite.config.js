import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hito2proyectofinal/', // Asegura la ruta base correcta en GitHub Pages
  build: {
    outDir: 'dist', // Carpeta de salida de la compilación
  },
});

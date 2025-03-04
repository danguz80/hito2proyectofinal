import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/hito3proyectofinal/", // 👈 Asegúrate de que el nombre coincide con tu repo en GitHub
});

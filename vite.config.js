import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' hace que el build funcione abierto en local y en GitHub Pages (cualquier subcarpeta).
export default defineConfig({
  plugins: [react()],
  base: './',
});

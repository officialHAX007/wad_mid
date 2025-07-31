import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/midterm-quotation-app/', // ✅ VERY IMPORTANT
  plugins: [react()],
});

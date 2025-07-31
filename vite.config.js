import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wad_mid/', // ✅ MUST MATCH REPO NAME EXACTLY!
  plugins: [react()],
});

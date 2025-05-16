import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ 根路径部署必须是 '/'
  plugins: [react()],
});


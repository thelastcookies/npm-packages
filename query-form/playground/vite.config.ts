import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// Sample 预览专用配置，与库构建（根目录 vite.config.ts）互不影响
export default defineConfig({
  plugins: [vue()],
});

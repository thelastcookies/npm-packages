import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    // 生成类型声明文件
    dts({ tsconfigPath: './tsconfig.json', entryRoot: resolve('src'), include: ['src/**/*'], cleanVueFileName: true }),
  ],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // vue、ant-design-vue 与 base-icon 作为外部依赖，不打包进产物
      external: [/^vue($|\/)/, /^ant-design-vue($|\/)/, /^@thelastcookies($|\/)/],
      output: {
        // 保留模块结构，产物路径与 src 一致，支持按组件单独引入
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});

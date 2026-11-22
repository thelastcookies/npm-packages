import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    // 生成类型声明文件
    dts({ tsconfigPath: './tsconfig.json', entryRoot: resolve('src'), include: ['src/**/*'], cleanVueFileName: true }),
  ],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es'],
      cssFileName: 'query-form',
    },
    // 关闭 CSS 代码分割，所有组件样式合并输出到单一 query-form.css
    cssCodeSplit: false,
    rollupOptions: {
      // vue、ant-design-vue 与图标库作为外部依赖，不打包进产物
      external: [/^vue($|\/)/, /^ant-design-vue($|\/)/, /^@ant-design($|\/)/, /^@ctrl($|\/)/],
      output: {
        // 保留模块结构，产物路径与 src 一致，支持按组件单独引入
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});

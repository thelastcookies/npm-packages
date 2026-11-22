# @thelastcookies/base-icon

基于 [@iconify/vue](https://docs.iconify.design/icon-components/vue/) 封装的 Vue3 图标组件，兼容 `i-mdi-*` 类名协议，支持在线按需拉取与离线集合注入。

依赖 `vue >= 3.5`（peerDependencies）。

## 本地预览 Sample

```bash
pnpm dev
```

启动 playground，浏览器打开提示的地址即可查看尺寸、常用图标与协议等价示例，源码见 [playground/QueryIconSample.vue](playground/BaseIconSample.vue)。

## 使用

```bash
pnpm add @thelastcookies/base-icon
```

### 在线模式（零配置）

不注入图标集合时，组件运行时按需从 iconify API 拉取图标数据：

```ts
import { createApp } from 'vue';
import BaseIcon from '@thelastcookies/base-icon';

const app = createApp(App).use(BaseIcon);
```

### 离线模式（推荐生产环境）

安装对应集合包（如 `@iconify-json/mdi`，为可选 peer 依赖），在安装时注入：

```ts
import { createApp } from 'vue';
import BaseIcon from '@thelastcookies/base-icon';
import mdiIcons from '@iconify-json/mdi/icons.json';

const app = createApp(App).use(BaseIcon, {
  collections: [mdiIcons],
});
```

### 组件内使用

```vue
<script setup lang="ts">
import { BaseIcon } from '@thelastcookies/base-icon';
</script>

<template>
  <!-- UnoCSS 类名协议，自动解析为 mdi:magnify -->
  <BaseIcon icon="i-mdi-magnify" :size="1.5" />
  <!-- iconify 原生协议，直接透传 -->
  <BaseIcon icon="mdi:magnify" />
  <!-- 图片 / Logo 模式，icon 以 / 开头指向站点公共资源目录 -->
  <BaseIcon type="logo" icon="/logo.svg" :size="2" />
</template>
```

> 注意：UnoCSS 类名协议约定 `i-` 后首段为集合名（如 `i-mdi-*` → `mdi:*`）。
> 若集合名本身含 `-`，请改用 iconify 原生协议。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | `string \| (...args) => VNodeChild` | `''` | 图标名（支持 `i-mdi-*` 与 `mdi:*` 两种协议）；image/logo 模式下为资源路径 |
| type | `'iconify' \| 'image' \| 'logo'` | `'iconify'` | 渲染模式，image/logo 走 `<img>` 渲染 |
| size | `number \| string` | `1` | 尺寸，单位 rem |

其余属性（class、style、事件等）通过 `v-bind="$attrs"` 透传。

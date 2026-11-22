# Query Form

基于 ant-design-vue Form 封装的查询表单组件，支持字段配置化渲染、展开收起与一键清空。

## 安装

```bash
pnpm add @thelastcookies/query-form
```

依赖 `@thelastcookies/query-form >= 0.1.3`。
依赖 `vue >= 3.5` 与 `ant-design-vue >= 4.2.6`（peerDependencies）。

## 本地预览 Sample

```bash
pnpm dev
```

启动 playground，浏览器打开提示的地址即可查看完整示例（表单类型、校验规则、级联选择、插槽用法等），源码见 [playground/QueryFormSample.vue](./playground/QueryFormSample.vue)。

## 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QueryForm } from '@thelastcookies/query-form';
import type { QueryFormField } from '@thelastcookies/query-form';

const form = ref<Record<string, any>>({});

const fields: QueryFormField[] = [
  { label: '名称', field: 'name', component: 'Input' },
  { label: '状态', field: 'status', component: 'Select', compProps: { options: [{ label: '启用', value: 1 }] } },
];
</script>

<template>
  <QueryForm v-model:form="form" :fields="fields" @query="onQuery" />
</template>
```

## 按组件单独引入

每个组件都支持子路径单独引入：

```ts
import QueryForm from '@thelastcookies/query-form/query-form';
import BaseSelect from '@thelastcookies/query-form/base-select';
import BaseTreeSelect from '@thelastcookies/query-form/base-tree-select';
import BaseCheckbox from '@thelastcookies/query-form/base-checkbox';
import BaseNumberRange from '@thelastcookies/query-form/base-number-range';
```

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 查询字段配置 | `QueryFormField[]` | `[]` |
| rules | 表单校验规则 | `Record<string, Rule[]>` | - |
| itemInLine | 单行展示字段数 | `1 \| 2 \| 3 \| 4 \| 6` | `4` |
| allFields | 提交时是否补全所有字段 | `boolean` | `false` |
| hideExpand | 隐藏展开/收起按钮 | `boolean` | `false` |

## 支持的组件类型

`Input` / `Textarea` / `NumberRange` / `Select` / `TreeSelect` / `Radio` / `Checkbox` / `DatePicker` / `DateRangePicker`

## 插槽

- `btn`：自定义按钮组（默认提供查询/清空/展开收起）
- `fst-btn` / `snd-btn`：分别替换查询、清空按钮
- 默认插槽：在字段后追加自定义查询项

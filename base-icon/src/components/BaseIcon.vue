<script setup lang="ts">
/**
 * 基于 @iconify/vue 的图标组件
 * v0.1.0 由 UnoCSS presetIcons 方案迁移为 @iconify/vue 运行时渲染
 * 兼容两种图标名协议：
 * - i-mdi-magnify（UnoCSS 类名协议，自动解析为 mdi:magnify）
 * - mdi:magnify（iconify 原生协议，直接透传）
 * type 为 image/logo 时，icon 以 / 开头指向站点公共资源目录
 * https://icones.js.org/collection/mdi
 */
import type { VNodeChild } from 'vue';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = withDefaults(defineProps<{
  icon?: string | ((...args: any[]) => VNodeChild),
  type?: 'iconify' | 'image' | 'logo',
  size?: number | string
}>(), {
  icon: '',
  // 单位：rem
  size: 1,
  type: 'iconify',
});

// 解析 icon 字符串为 iconify 图标名
const iconName = computed(() => {
  const name = props.icon as string;
  if (!name) {
    return '';
  }
  // i-mdi-magnify → mdi:magnify；约定首段为集合名，其余为图标名
  if (name.startsWith('i-')) {
    const parts = name.slice(2).split('-');
    const collection = parts.shift() ?? '';
    return `${collection}:${parts.join('-')}`;
  }
  return name;
});

const sizeStyle = computed(() => {
  if (props.type === 'iconify') {
    return {
      height: `${Number(props.size)}rem`,
      width: `${Number(props.size)}rem`,
    };
  } else {
    return {
      height: `${props.size}rem`,
      width: `${props.size}rem`,
      'line-height': `${props.size}rem`,
      'font-size': `${props.size}rem`,
    };
  }
});

const iconUrl = computed(() => {
  const url = props.icon as string;
  // 以 / 开头时指向站点公共资源目录（public/），由宿主项目提供资源
  if (url.startsWith('/')) {
    return url.replace('/', '');
  } else {
    return '';
  }
});

</script>

<template>
  <template v-if="type === 'iconify'">
    <span v-bind="$attrs" class="base-icon" :style="sizeStyle">
      <Icon :icon="iconName" :style="sizeStyle" />
    </span>
  </template>
  <template v-else>
    <img
      v-bind="$attrs"
      :class="{'logo': type === 'logo'}"
      :style="['base-icon', sizeStyle]"
      :src="iconUrl" :alt="type" />
  </template>
</template>

<style scoped>
.base-icon {
  display: inline-block;
  vertical-align: sub;
}
.base-icon.logo {
  cursor: pointer;
  transition: filter 0.5s;
}
.base-icon + span,
span + .base-icon {
  margin-inline-start: 6px;
}
</style>

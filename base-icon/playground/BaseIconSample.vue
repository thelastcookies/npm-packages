<script setup lang="ts">
import { ref } from 'vue';
import BaseIcon from '../src/components/BaseIcon.vue';

// 当前使用的图标名，展示两种协议的等价效果
const iconNames = [
  { label: 'UnoCSS 协议', value: 'i-mdi-magnify' },
  { label: 'iconify 协议', value: 'mdi:magnify' },
];

const currentIcon = ref(iconNames[0]!.value);

// 离线图标：与 main.ts 中 getIcons 提取的子集一致，渲染不请求网络
const offlineIconNames = [
  'i-mdi-magnify',
  'i-mdi-home',
  'i-mdi-cog',
  'i-mdi-account',
  'i-mdi-chevron-down',
  'i-mdi-chevron-up',
];

// 在线图标：不在离线子集内，运行时按需从 iconify API 拉取
const onlineIconNames = [
  'i-mdi-heart',
  'i-mdi-star',
  'i-mdi-weather-sunny',
  'i-mdi-rocket-launch',
  'i-mdi-database',
  'i-mdi-cloud-upload',
];

const sizes = [0.75, 1, 1.5, 2, 3];
</script>
<template>
  <div class="base-icon-sample">
    <h2 class="sample-title">BaseIcon 示例</h2>
    <p class="sample-desc">
      main.ts 仅注入「离线图标」用到的 mdi 子集（getIcons 提取），<br />
      子集内图标离线渲染；「在线图标」不在子集内，运行时按需从 iconify API 拉取。
    </p>

    <div class="sample-section">
      <h3>尺寸（size 单位 rem）</h3>
      <div class="sample-row">
        <span v-for="s in sizes" :key="s" class="sample-cell">
          <BaseIcon icon="i-mdi-magnify" :size="s" />
          <span class="sample-label">{{ s }}</span>
        </span>
      </div>
    </div>

    <div class="sample-section">
      <h3>离线图标（集合子集注入，不请求网络）</h3>
      <div class="sample-row">
        <span v-for="name in offlineIconNames" :key="name" class="sample-cell">
          <BaseIcon :icon="name" :size="1.5" />
          <span class="sample-label">{{ name }}</span>
        </span>
      </div>
    </div>

    <div class="sample-section">
      <h3>在线图标（不在子集内，运行时从 API 拉取）</h3>
      <div class="sample-row">
        <span v-for="name in onlineIconNames" :key="name" class="sample-cell">
          <BaseIcon :icon="name" :size="1.5" />
          <span class="sample-label">{{ name }}</span>
        </span>
      </div>
    </div>

    <div class="sample-section">
      <h3>协议切换（i-mdi-magnify 与 mdi:magnify 等价）</h3>
      <div class="sample-row">
        <label v-for="item in iconNames" :key="item.value" class="sample-radio">
          <input v-model="currentIcon" type="radio" :value="item.value" />
          {{ item.label }}：{{ item.value }}
        </label>
      </div>
      <div class="sample-row">
        <BaseIcon :icon="currentIcon" :size="2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面通栏 */
.base-icon-sample {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

/* 区块标题 */
.sample-title {
  font-size: 1.5rem;
}

.sample-desc {
  color: #666;
}

/* 区块 */
.sample-section {
  margin-top: 2rem;
}

.sample-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

/* 展示行 */
.sample-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
}

/* 单元格 */
.sample-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

/* 标签文字 */
.sample-label {
  font-size: 0.75rem;
  color: #888;
}

/* 单选框 */
.sample-radio {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>

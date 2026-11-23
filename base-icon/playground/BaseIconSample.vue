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
    <div class="sample-section">
      <h3>image 和 logo 类型</h3>
      <div class="sample-row">
        <div class="sample-cell">
          image 路径引入
          <BaseIcon icon="./logo.svg" type="image" :size="2" />
        </div>
        <div class="sample-cell">
          image Base64
          <BaseIcon icon="data:image/svg+xml,%3csvg%20width='34'%20height='32'%20viewBox='0%200%2034%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.221393%208.19632L8.04251%2014.8527C8.26743%2015.0447%208.60025%2015.0374%208.81785%2014.8381L16.6353%207.63491C16.8621%207.42644%2017.2113%207.42827%2017.4344%207.6404L17.4856%207.68794C17.7343%207.92384%2017.727%208.32067%2017.4728%208.54925L0.618209%2023.5737C0.36037%2023.8022%200.356713%2024.2027%200.607237%2024.4386L8.52893%2031.8429C8.63682%2031.9435%208.77945%2032.0002%208.9294%2032.0002H9.5804C9.734%2032.0002%209.88212%2031.938%209.99184%2031.832C10.6099%2031.2303%2012.9744%2029.2206%2017.0394%2029.2206C21.1045%2029.2206%2023.8585%2031.2943%2024.5131%2031.8594C24.6192%2031.9508%2024.7527%2032.0002%2024.8935%2032.0002H25.5554C25.7036%2032.0002%2025.848%2031.9435%2025.9559%2031.8411L33.3839%2024.8738C33.6307%2024.6416%2033.6307%2024.2484%2033.3802%2024.018L26.2192%2017.3982C25.9961%2017.1916%2025.6505%2017.1916%2025.4256%2017.3982L17.0029%2025.139C16.7834%2025.342%2016.4451%2025.3456%2016.2202%2025.1481L16.1525%2025.0878C15.8911%2024.8574%2015.8874%2024.4496%2016.1452%2024.2155L33.7789%208.18717C33.8191%208.1506%2033.8575%208.10854%2033.8849%208.06099C33.9361%207.96956%2033.9727%207.86898%2033.991%207.76475C34.0001%207.71172%2034.002%207.65503%2033.991%207.602C33.9837%207.56177%2033.9727%207.52336%2033.9599%207.48496C33.916%207.36061%2033.8209%207.26003%2033.7075%207.1942C32.2154%206.33838%2030.8146%205.33444%2029.5273%204.19334C28.1722%203.01019%2026.9342%201.6972%2025.8297%200.27632C25.8005%200.237918%2025.7657%200.201345%2025.7273%200.172086C25.5847%200.0696799%2025.4146%200.0111623%2025.2391%200.00567627C25.0306%200.0148196%2024.8313%200.0897954%2024.6685%200.217803C24.6685%200.217803%2022.0737%202.94253%2017.1254%202.94253C12.5611%202.94253%2010.2095%200.625597%209.87115%200.265348C9.84007%200.232432%209.80532%200.201345%209.76692%200.177572C9.64989%200.104425%209.52005%200.0532218%209.38473%200.0257917C9.29879%200.00933362%209.21101%200.00750495%209.12689%200.0257917C8.97329%200.0587079%208.827%200.12454%208.70082%200.219631C8.70082%200.219631%207.36957%201.65148%204.80215%203.96293C3.43798%205.1918%200.919935%206.78824%200.289053%207.1814C0.17202%207.25455%200.0824159%207.3661%200.0421857%207.49959C0.0275566%207.54714%200.0165847%207.59651%200.00927012%207.64771C0.00195553%207.69343%200.00195553%207.74098%200.00927012%207.78486C0.020242%207.85984%200.0403571%207.93299%200.071444%208.0043C0.106188%208.08294%200.159219%208.1506%200.22505%208.20546L0.221393%208.19632Z'%20fill='url(%23paint0_linear_81_19)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_81_19'%20x1='17.0012'%20y1='0.00567627'%20x2='17.0012'%20y2='32.0002'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%230D6CFF'/%3e%3cstop%20offset='1'%20stop-color='%2327C5FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" type="image" :size="2" />
        </div>
        <div class="sample-cell">
          logo (--colorPrimaryHover: #3C89E8)
          <BaseIcon icon="./logo.svg" type="logo" :size="2" />
        </div>
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
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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

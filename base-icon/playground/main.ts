import { createApp } from 'vue';
import { getIcons } from '@iconify/utils';
import BaseIcon from '../src';
import BaseIconSample from './BaseIconSample.vue';
import mdiIcons from '@iconify-json/mdi/icons.json';

// 离线示例仅使用以下图标，从 mdi 集合中提取子集注入，避免整包引入
const offlineIconNames = ['magnify', 'home', 'cog', 'account', 'chevron-down', 'chevron-up'];
const offlineIcons = getIcons(mdiIcons, offlineIconNames);
if (!offlineIcons) {
  throw new Error('离线图标子集提取失败，请检查 @iconify-json/mdi 是否安装');
}

// 离线模式：仅注入子集，子集内图标不请求网络
// 在线模式：子集外的图标（如「在线图标」示例块）运行时按需从 iconify API 拉取
createApp(BaseIconSample).use(BaseIcon, { collections: [offlineIcons] }).mount('#app');

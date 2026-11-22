import type { IconifyJSON } from '@iconify/vue';
import type { App, Component, Plugin } from 'vue';
import { addCollection } from '@iconify/vue';
import BaseIconComponent from './components/BaseIcon.vue';

/**
 * BaseIcon 安装配置项
 */
export interface BaseIconOptions {
  /**
   * 离线图标集合，传入后完全离线渲染，不再请求 iconify 在线 API
   * 集合数据来自 @iconify-json/* 包，例如：
   * import mdiIcons from '@iconify-json/mdi/icons.json'
   */
  collections?: IconifyJSON[];
}

/**
 * 安装 BaseIcon：注册离线图标集合并全局注册组件
 * 传入 collections 时注册离线图标集合
 */
const install = (app: App, options?: BaseIconOptions): void => {
  // 注册离线图标集合，@iconify/vue 内部会全局缓存
  options?.collections?.forEach((collection) => {
    addCollection(collection);
  });
  app.component('BaseIcon', BaseIconComponent);
};

/**
 * 为组件附加 install 方法，使组件自身可作为插件使用：
 * app.use(BaseIcon, { collections: [...] })
 */
const withInstall = <T extends Component>(comp: T): T & Plugin => {
  // 交叉类型 T & Plugin 是 Vue 生态的标准做法，运行时仅为组件挂载 install 属性
  const plugin = comp as T & Plugin;
  plugin.install = install;
  return plugin;
};

const BaseIcon = withInstall(BaseIconComponent);

export default BaseIcon;
export { BaseIcon, install };

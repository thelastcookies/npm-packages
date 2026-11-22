import type { App, Plugin } from 'vue';
import BaseCheckbox from './components/BaseCheckbox.vue';
import BaseNumberRange from './components/BaseNumberRange.vue';
import BaseSelect from './components/BaseSelect.vue';
import BaseTreeSelect from './components/BaseTreeSelect.vue';
import QueryForm from './components/QueryForm.vue';

export { QueryForm, BaseSelect, BaseTreeSelect, BaseCheckbox, BaseNumberRange };
export type { QueryFormField, QueryFormComponentType, Recordable } from './types';

// 组件安装器，支持 app.use(QueryForm) 全局注册
const installer: Plugin = {
  install(app: App) {
    app.component('QueryForm', QueryForm);
    app.component('BaseSelect', BaseSelect);
    app.component('BaseTreeSelect', BaseTreeSelect);
    app.component('BaseCheckbox', BaseCheckbox);
    app.component('BaseNumberRange', BaseNumberRange);
  },
};

export default installer;

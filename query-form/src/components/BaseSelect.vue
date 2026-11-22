<script setup lang="ts">
import type { DefaultOptionType, LabeledValue, SelectValue } from 'ant-design-vue/es/select';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
import type { Recordable } from '../types';
import { defineComponent, ref, useAttrs, watch, watchEffect } from 'vue';
import { Checkbox, Divider, Select } from 'ant-design-vue';

type RawValue = string | number;

const form = defineModel<Recordable<any>>('form');
const value = defineModel<SelectValue>('value');
const _options = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getOptions instanceof Function) {
    _options.value = await attrs.getOptions(form.value);
  } else if (attrs.options instanceof Array) {
    _options.value = attrs.options;
  } else {
    console.warn(`BaseSelect: One of 'options' or 'getOptions' is required.`);
  }
};
getOptions();

// 监听级联父级的变化
if (attrs.cascadeParentField) {
  watch(() => form.value?.[attrs.cascadeParentField as string], () => {
    value.value = undefined;
    getOptions();
  });
}

// 全选 Checkbox 状态
const checkAll = ref(false);
const isIndeterminate = ref(false);

// 切换全选切换状态
const handleCheckAllChange = (e: CheckboxChangeEvent) => {
  value.value = e.target.checked && _options.value ? _options.value.map(item => (item.value as RawValue)) : undefined;
  isIndeterminate.value = false;
};
// 选中项发生改变时，计算全选以及半选状态
const handleCheckedChange = (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => {
  if (attrs.selectAllEnable && attrs.mode === 'multiple' && option && option.length) {
    const checkedCount = value ? (value as (RawValue | LabeledValue)[]).length : 0;
    checkAll.value = checkedCount === option.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < option.length;
  }
};

watchEffect(() => {
  handleCheckedChange(value.value, _options.value!);
});

// 渲染下拉列表
const VNodes = defineComponent({
  props: {
    vNodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vNodes;
  },
});

</script>

<template>
  <Select
    show-arrow
    allow-clear
    show-search
    option-filter-prop="label"
    placeholder="请选择"
    :max-tag-count="3"
    v-bind="$attrs"
    v-model:value="value"
    :options="_options"
  >
    <template #dropdownRender="{ menuNode }">
      <template v-if="attrs.selectAllEnable && attrs.mode === 'multiple'">
        <Checkbox class="base-select-check-all"
          v-model:checked="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange">全选
        </Checkbox>
        <Divider class="base-select-divider" />
      </template>
      <v-nodes :vNodes="menuNode" />
    </template>
  </Select>
</template>

<style scoped>
/* 全选 Checkbox 内边距 */
.base-select-check-all {
  padding: 0.25rem 0.5rem;
}

/* 全选分割线外边距 */
.base-select-divider {
  margin: 0.25rem 0;
}
</style>

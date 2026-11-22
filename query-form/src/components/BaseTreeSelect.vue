<script setup lang="ts">
import type { SelectValue } from 'ant-design-vue/es/select';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect';
import type { Recordable } from '../types';
import { ref, useAttrs, watch } from 'vue';
import { TreeSelect } from 'ant-design-vue';

const form = defineModel<Recordable<any>>('form');
const value = defineModel<SelectValue>('value');
const _treeData = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getTreeData instanceof Function) {
    _treeData.value = await attrs.getTreeData(form.value);
  } else if (attrs.treeData instanceof Array) {
    _treeData.value = attrs.treeData;
  } else {
    console.warn(`BaseTreeSelect: One of 'treeData' or 'getTreeData' is required.`);
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

</script>

<template>
  <TreeSelect
    show-arrow
    allow-clear
    show-search
    :max-tag-count="3"
    tree-node-filter-prop="title"
    placeholder="请选择"
    v-bind="$attrs"
    v-model:value="value"
    :tree-data="_treeData" />
</template>

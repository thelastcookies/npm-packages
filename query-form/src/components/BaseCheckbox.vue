<script setup lang="ts">
import type { CheckboxChangeEvent, CheckboxOptionType, CheckboxValueType } from 'ant-design-vue/es/checkbox/interface';
import { ref, useAttrs, watchEffect } from 'vue';
import { Checkbox, CheckboxGroup, FormItemRest } from 'ant-design-vue';

const value = defineModel<CheckboxValueType[]>('value');

const attrs = useAttrs();
const _options = ref<CheckboxOptionType[]>();

_options.value = attrs.options as CheckboxOptionType[];

// 全选 Checkbox 状态
const checkAll = ref(false);
const isIndeterminate = ref(false);

// 切换全选切换状态
const handleCheckAllChange = (e: CheckboxChangeEvent) => {
  value.value = e.target.checked && _options.value ? _options.value.map(item => item.value) : undefined;
  isIndeterminate.value = false;
};
// 选中项发生改变时，计算全选以及半选状态
const handleCheckedChange = (value: CheckboxValueType[] | undefined, option: CheckboxOptionType[]) => {
  if (attrs.selectAllEnable && option && option.length) {
    const checkedCount = value ? value.length : 0;
    checkAll.value = checkedCount === option.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < option.length;
  }
};

watchEffect(() => {
  handleCheckedChange(value.value, _options.value!);
});

</script>

<template>
  <div class="base-checkbox">
    <FormItemRest v-if="attrs.selectAllEnable">
      <Checkbox v-model:checked="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">全选
      </Checkbox>
    </FormItemRest>
    <CheckboxGroup v-bind="$attrs" v-model:value="value" />
  </div>
</template>

<style scoped>
/* 多选框组横向排列间距 */
.base-checkbox {
  display: flex;
  column-gap: 0.5rem;
}
</style>

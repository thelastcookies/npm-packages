<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, InputNumber } from 'ant-design-vue';

const props = withDefaults(defineProps<{
  value: (number | undefined)[];
}>(), {
  value: () => [undefined, undefined],
});

const emit = defineEmits<{
  (e: 'update:value', params: (number | undefined)[]): void
}>();

const value1 = ref<number | undefined>(undefined);
const value2 = ref<number | undefined>(undefined);

watch(() => props.value, (val) => {
  value1.value = val?.[0] ?? undefined;
  value2.value = val?.[1] ?? undefined;
}, {
  immediate: true,
});

const context = Form.useInjectFormItemContext();

const handleChange = () => {
  emit('update:value', [value1.value, value2.value]);
  context.onFieldChange();
};

const handleBlur = () => {
  context.onFieldBlur();
};

</script>

<template>
  <div class="base-number-range">
    <InputNumber v-bind="$attrs" v-model:value="value1" @blur="handleBlur" @change="handleChange" />
    <span class="base-number-range-separator">~</span>
    <InputNumber v-bind="$attrs" v-model:value="value2" @blur="handleBlur" @change="handleChange" />
  </div>
</template>

<style scoped>
/* 数字范围选择横向排列 */
.base-number-range {
  display: flex;
}

/* 分隔符样式 */
.base-number-range-separator {
  margin: 0 0.25rem;
  line-height: 2rem;
}
</style>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { QueryFormField, Recordable } from '../types';
import { computed, ref, useSlots } from 'vue';
import { Button, Col, DatePicker, Form, FormItem, Input, message, Radio, RangePicker, Row, Textarea } from 'ant-design-vue';
import { BaseIcon } from '@thelastcookies/base-icon';
import BaseCheckbox from './BaseCheckbox.vue';
import BaseNumberRange from './BaseNumberRange.vue';
import BaseSelect from './BaseSelect.vue';
import BaseTreeSelect from './BaseTreeSelect.vue';

// TODO 前端筛选

const form = defineModel<Recordable<any>>('form', {
  default: () => ({}),
});
const expand = defineModel<boolean>('expand', { default: () => false });

const props = withDefaults(defineProps<{
  fields: QueryFormField[];
  rules?: Recordable<Rule[]>;
  itemInLine?: 1 | 2 | 3 | 4 | 6;
  allFields?: boolean;
  hideExpand?: boolean;
}>(), {
  fields: () => [],
  itemInLine: 4,
  allFields: false,
  hideExpand: false,
});

const emit = defineEmits<{
  (e: 'query', value: Recordable<any>): void;
}>();

const slots = useSlots();
const slotsCount = Object.keys(slots).filter(k => k !== 'btn').length;

// 单行展示的字段数
const ITEM_IN_LINE = props.itemInLine;
const SPAN = 24 / ITEM_IN_LINE;

const formRef = ref<FormInstance>();

const onFinish = () => {
  try {
    const query: any = {};
    if (props.allFields) {
      props.fields.forEach((item) => {
        query[item.field] = form.value[item.field] !== undefined && form.value[item.field] !== null ? form.value[item.field] :
          ['Input', 'Radio', 'Textarea'].includes(item.component) ? '' :
            ['Select', 'TreeSelect', 'Checkbox', 'DateRangePicker', 'NumberRange'].includes(item.component) ? [] : undefined;
      });
      form.value = query;
    }
    emit('query', form.value);
  } catch (e) {
    console.error(`QueryForm 'onFinish': ${e}`);
  }
};

const onFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
  if (errorFields && errorFields.length > 0) {
    message.error(errorFields[0].errors[0]);
  }
};

const btnGroupOffset = computed(() => {
  const itemCount = props.fields.length + slotsCount;
  if (itemCount < ITEM_IN_LINE) {
    return (ITEM_IN_LINE - itemCount - 1) * SPAN;
  } else {
    return expand.value ? (ITEM_IN_LINE - itemCount % ITEM_IN_LINE - 1) * SPAN : 0;
  }
});

/**
 * TODO: 完善清空功能
 * 需要个字段逐一清空
 **/
const handleClear = () => {
  formRef.value!.resetFields();
  form.value = {};
  // emit('query', {});
};

</script>

<template>
  <Form
    ref="formRef"
    name="查询表单"
    class="query-form"
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
    :hideRequiredMark="true"
    :model="form"
    :rules="rules"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <Row>
      <template v-for="(item, idx) in fields" :key="item.field">
        <Col v-show="expand || idx === 0 || idx < (ITEM_IN_LINE - slotsCount - 1)" :span="item.colSpan || SPAN">
          <FormItem
            :name="item.field"
            :label="item.label"
            :label-col="item.labelCol"
            :wrapper-col="item.wrapperCol"
            validateStatus="success"
            help=""
          >
            <template v-if="item.component === 'Input'">
              <Input v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'Select'">
              <BaseSelect v-bind="item.compProps" v-model:value="form[item.field]" v-model:form="form" />
            </template>
            <template v-else-if="item.component === 'TreeSelect'">
              <BaseTreeSelect v-bind="item.compProps" v-model:value="form[item.field]" v-model:form="form" />
            </template>
            <template v-else-if="item.component === 'Radio'">
              <Radio.Group v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'Checkbox'">
              <BaseCheckbox v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'DatePicker'">
              <DatePicker v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'DateRangePicker'">
              <RangePicker v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'Textarea'">
              <Textarea v-bind="item.compProps" v-model:value="form[item.field]" />
            </template>
            <template v-else-if="item.component === 'NumberRange'">
              <BaseNumberRange v-bind="item.compProps" v-model:value="form[item.field]" :field="item.field" />
            </template>
          </FormItem>
        </Col>
      </template>
      <Col v-if="slotsCount" :span="SPAN">
        <slot name="default"></slot>
      </Col>
      <Col class="query-form-btn-group" :span="SPAN" :offset="btnGroupOffset">
        <slot name="btn">
          <slot name="fst-btn">
            <Button type="primary" html-type="submit">
              <BaseIcon icon="i-mdi-magnify" />
              查询
            </Button>
          </slot>
          <slot name="snd-btn">
            <Button class="query-form-btn-clear" @click="handleClear">
              <BaseIcon icon="i-mdi-filter-remove-outline" />
              清空
            </Button>
          </slot>
        </slot>
        <Button v-if="!hideExpand && (fields.length + slotsCount) >= ITEM_IN_LINE" type="link"
          @click="expand = !expand">
          <template v-if="expand">
            <BaseIcon icon="i-mdi-chevron-up" />
            收起
          </template>
          <template v-else>
            <BaseIcon icon="i-mdi-chevron-down" />
            展开
          </template>
        </Button>
      </Col>
    </Row>
  </Form>
</template>

<style scoped>
/* 表单通栏布局 */
.query-form {
  width: 100%;
  padding: 0 0.5rem;
}

/* 表单项下边距 */
.query-form :deep(.ant-form-item) {
  margin-bottom: 0.75rem;
}

/* 按钮组右对齐 */
.query-form-btn-group {
  text-align: right;
  margin-bottom: 0.75rem;
}

/* 清空按钮与查询按钮的间距 */
.query-form-btn-clear {
  margin-left: 0.5rem;
}
</style>

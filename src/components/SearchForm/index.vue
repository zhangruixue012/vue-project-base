<template>
  <el-form class="search-header" :model="queryParams" ref="queryRef" :inline="true">
    <el-form-item v-for="item in searchKeyList" :label="item.name" :prop="item.key">
      <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.key]"
          :placeholder="`请输入${item.name}`"
          clearable
          style="width: 180px"
          @keyup="handleCurrentChange(1)"
      />

      <el-select
          v-if="item.type === 'select'"
          v-model="queryParams[item.key]"
          clearable
          style="width: 150px"
      >
        <el-option
            v-for="dict in item.optionList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
        />
      </el-select>

      <el-date-picker
          v-if="item.type === 'dateRange'"
          v-model="queryParams[item.key]"
          :value-format="item.valueFormat"
          type="daterange"
          range-separator="-"
          style="width: 260px"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleCurrentChange(1)"
      ></el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleCurrentChange(1)">搜索</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const queryRef = ref();

const props = defineProps({
  searchKeyList: {
    type: Array,
    default: []
  },
  handleCurrentChange: {
    type: Function,
    default: () => {}
  },
  reset: {
    type: Function,
    default: () => {}
  },
  queryParams: {
    type: Object,
    default: {}
  }
});

function resetForm() {
  proxy.resetForm("queryRef");
  props.reset()
}

</script>

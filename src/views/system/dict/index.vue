<template>
  <div class="manage-container">
    <search-form ref="searchFormRef" :searchKeyList="searchKeyList" :handleCurrentChange="handleCurrentChange"
                 :reset="reset" :queryParams="queryParams"/>

    <operate-row :operateList="operateList" :handleAdd="handleAdd" :handleDelete="handleDelete"/>

    <Table ref="tableRef" :tableData ="tableData" :columnData="columnData" :pageTotal="page.total" :pageParam="page"
           :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"
           :handleSelectionChange="handleSelectionChange" :height="tableHeight" :rowKey="'menuId'">
      <!--   #status == v-slot:status     -->
      <template #status="{ data }">
        <dict-tag :options="sys_normal_disable" :value="data.row.status" />
      </template>

      <template #event="{data}">
        <el-button text type="primary" @click="editRow(data.row)" size="small" class="table-operate-btn">修改</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn" @click="deleteRow(data.row)">删除</el-button>
      </template>
    </Table>

<!--    <AddMenu ref="addMenuRef" :handleCurrentChange="handleCurrentChange"/>-->
  </div>
</template>

<script setup>
import { usePage } from '@/composables/usePage'
import SearchForm from '@/components/SearchForm/index'
import OperateRow from '@/components/OperateRow/index'
import {listData, delData} from "@/api/system/dict/data";
// import AddMenu from './addMenu'

const { proxy } = getCurrentInstance();
const addMenuRef = ref();
const searchFormRef = ref();

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, editRow, deleteRow, handleAdd, handleDelete,
  handleSelectionChange, queryParams, tableHeight } = usePage({
  getListApi: listData,
  addModalRef: addMenuRef,
  removeApi: delData,
  getDeleteParam: getDeleteParam,
  proxy
})


const operateList = reactive([
  { type: 'add' },
  { type: 'delete'}
])

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const columnData = reactive([
  {
    prop: 'dictId',
    label: '字典编号'
  },
  {
    prop: 'dictName',
    label: '字典名称'
  },
  {
    prop: 'dictType',
    label: '字典类型'
  },
  {
    prop: 'status',
    label: '状态'
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    key: "event",
    label: "操作",
    width: 250,
    scopedSlots: "event",
    align: 'center'
  },
])

const searchKeyList = reactive([
  {
    key: 'dictName',
    name: '字典名称',
    type: 'input'
  },
  {
    key: 'dictType',
    name: '字典类型',
    type: 'input'
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    optionList: sys_normal_disable
  },
  {
    key: 'dateRange',
    name: '创建时间',
    type: 'dateRange',
    valueFormat: 'YYYY-MM-DD'
  }
])

function refreshList() {
  searchFormRef.value.resetForm();
}

function getDeleteParam(row) {
  if (Array.isArray(row)) {
    return row.map(item => item.dictId).join(',')
  }
  return row.dictId
}

reset();

</script>

<style lang="scss" scoped>
@import "../common.scss";

</style>

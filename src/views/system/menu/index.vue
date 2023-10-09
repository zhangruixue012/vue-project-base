<template>
  <div class="manage-container">
    <search-form ref="searchFormRef" :searchKeyList="searchKeyList" :handleCurrentChange="handleCurrentChange"
                 :reset="reset" :queryParams="queryParams"/>

    <operate-row :operateList="operateList" :handleAdd="handleAdd" :handleDelete="handleDelete"/>

    <Table ref="tableRef" :tableData ="tableData" :columnData="columnData" :pageTotal="page.total" :pageParam="page"
           :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"
           :handleSelectionChange="handleSelectionChange" :height="tableHeight" :rowKey="'menuId'"
           :treeProps="{ children: 'children', hasChildren: 'hasChildren' }">
      <!--   #status == v-slot:status     -->
      <template #status="{ data }">
        <el-switch
            v-model="data.status"
            active-value="0"
            inactive-value="1"
        ></el-switch>
      </template>

      <template #event="{data}">
        <el-button text type="primary" @click="editRow(data.row)" size="small" class="table-operate-btn">修改</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn" @click="deleteRow(data.row)">新增</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn" @click="deleteRow(data.row)">删除</el-button>
      </template>
    </Table>

    <AddMenu ref="addMenuRef" :handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script setup>
import { usePage } from '@/composables/usePage'
import SearchForm from '@/components/SearchForm/index'
import OperateRow from '@/components/OperateRow/index'
import {menuList, deleteMenu} from "@/api/system/menu";
import AddMenu from './addMenu'

const { proxy } = getCurrentInstance();
const addMenuRef = ref();
const searchFormRef = ref();

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, editRow, deleteRow, handleAdd, handleDelete,
  handleSelectionChange, queryParams, tableHeight } = usePage({
  getListApi: menuList,
  addModalRef: addMenuRef,
  removeApi: deleteMenu,
  getDeleteParam: getDeleteParam,
  getListFunc: generateTableData,
  proxy
})


const operateList = reactive([
  { type: 'add' },
  { type: 'delete'}
])

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const columnData = reactive([
  {
    prop: 'menuName',
    label: '菜单名称'
  },
  {
    prop: 'icon',
    label: '图标'
  },
  {
    prop: 'orderNum',
    label: '排序'
  },
  {
    prop: 'perms',
    label: '权限标识'
  },
  {
    prop: 'component',
    label: '组件路径',
  },
  {
    prop: 'status',
    label: '状态',
    scopedSlots: "status",
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
    key: 'menuName',
    name: '菜单名称',
    type: 'input'
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    optionList: sys_normal_disable
  }
])

function refreshList() {
  searchFormRef.value.resetForm();
}

// const testArray = reactive([
//   { menuId: '1', name: '1', parentId: '0' },
//   { menuId: '2', name: '2', parentId: '0' },
//   { menuId: '3', name: '3', parentId: '0' },
//   { menuId: '4', name: '4', parentId: '0' },
//   { menuId: '100', name: '1-1', parentId: '1' },
//   { menuId: '101', name: '1-2', parentId: '1' },
//   { menuId: '104', name: '2-1', parentId: '2' },
//   { menuId: '105', name: '3-1', parentId: '3' },
//   { menuId: '106', name: '4-1', parentId: '4' },
//   { menuId: '107', name: '4-2', parentId: '4' },
//   { menuId: '108', name: '1-1-1', parentId: '100' },
//   { menuId: '109', name: '1-2-1', parentId: '101' },
//   { menuId: '110', name: '1-3-1', parentId: '102' },
//   { menuId: '111', name: '1-4-1', parentId: '103' },
//   { menuId: '112', name: '2-1-1', parentId: '104' },
//   { menuId: '113', name: '3-1-1', parentId: '105' },
//   { menuId: '114', name: '4-1-1', parentId: '106' },
//   { menuId: '115', name: '4-2-1', parentId: '107' },
//   { menuId: '116', name: '1-1-1-1', parentId: '108' },
//   { menuId: '117', name: '1-2-1', parentId: '109' },
// ])

function generateTableData() {
  const newTree = arrayToTree(tableData.value, 0);
  tableData.value = newTree;
}

function arrayToTree(data, pid) {
  let result = []
  getChildren(data, result, pid)
  return result
}

function getChildren(data, result, pId) {
  for(let item of data) {
    if (item.parentId === pId) {
      const newItem = { children: [], ...item };
      result.push(newItem);
      getChildren(data, newItem.children, item.menuId);
    }
  }
}

function getDeleteParam(row) {
  if (Array.isArray(row)) {
    return row.map(item => item.menuId).join(',')
  }
  return row.menuId
}

reset();

</script>

<style lang="scss" scoped>
@import "../common.scss";

</style>

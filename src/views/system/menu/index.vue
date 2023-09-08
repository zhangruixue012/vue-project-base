<template>
  <div class="manage-container">
    <search-form ref="searchFormRef" :searchKeyList="searchKeyList" :handleCurrentChange="handleCurrentChange"
                 :reset="reset" :queryParams="queryParams"/>

    <operate-row :operateList="operateList"/>

    <Table ref="tableRef" :tableData ="tableData" :columnData="columnData" :pageTotal="page.total" :pageParam="page"
           :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"
           :handleSelectionChange="handleSelectionChange" :height="tableHeight">
      <!--   #status == v-slot:status     -->
      <template #status="{ data }">
        <el-switch
            v-model="data.status"
            active-value="0"
            inactive-value="1"
        ></el-switch>
      </template>

      <template #event="{ data }">
        <el-button text type="primary" @click="editRow(data)" size="small" class="table-operate-btn">修改</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn" @click="deleteRow">删除</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn">重置密码</el-button>
        <el-button text type="primary" size="small" class="table-operate-btn">分配角色</el-button>
      </template>
    </Table>


  </div>
</template>

<script setup>
import { usePage } from '@/composables/usePage'
import SearchForm from '@/components/SearchForm/index'
import OperateRow from '@/components/OperateRow/index'
import {menuList, deleteMenu} from "@/api/system/menu";

const { proxy } = getCurrentInstance();
const addUserRef = ref();
const searchFormRef = ref();

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, editRow, deleteRow, handleAdd, handleDelete,
  handleSelectionChange, queryParams, tableHeight } = usePage({
  getListApi: menuList,
  addModalRef: addUserRef,
  removeApi: deleteMenu,
  proxy
})

console.log('tableHeight:', tableHeight);


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

reset();

</script>

<style lang="scss" scoped>
@import "../common.scss";

</style>

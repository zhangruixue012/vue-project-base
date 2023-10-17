<template>
  <div class="manage-container">
    <search-form ref="searchFormRef" :searchKeyList="searchKeyList" :handleCurrentChange="handleCurrentChange"
                 :reset="reset" :queryParams="queryParams"/>

    <operate-row :operateList="operateList" :handleAdd="handleAdd" :handleDelete="handleDelete" :handleReturn="handleReturn"/>

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

    <AddData ref="addDataRef" @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script setup>
import { usePage } from '@/composables/usePage'
import SearchForm from '@/components/SearchForm/index'
import OperateRow from '@/components/OperateRow/index'
import {delData, optionSelect, getType, listData} from "@/api/system/dict/data";
import AddData from './addData'

const { proxy } = getCurrentInstance();
const addDataRef = ref();
const searchFormRef = ref();
const route = useRoute();
const router = useRouter();
const defaultDictType = ref('')
const optionNameList = ref([])

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');
const searchKeyList = reactive([
  {
    key: 'dictType',
    name: '字典名称',
    type: 'select',
    defaultValue: defaultDictType,
    optionList: optionNameList
  },
  {
    key: 'dictLabel',
    name: '字典标签',
    type: 'input'
  },
  {
    key: 'status',
    name: '状态',
    type: 'select',
    optionList: sys_normal_disable
  }
])

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, editRow, deleteRow, handleAdd, handleDelete,
  handleSelectionChange, queryParams, tableHeight, generateQueryParams } = usePage({
  getListApi: listData,
  addModalRef: addDataRef,
  removeApi: delData,
  searchKeyList,
  getDeleteParam: getDeleteParam,
  proxy
})

const operateList = reactive([
  { type: 'add' },
  { type: 'delete'},
  { type: 'return'}
])


const columnData = reactive([
  {
    prop: 'dictCode',
    label: '字典编码'
  },
  {
    prop: 'dictLabel',
    label: '字典标签'
  },
  {
    prop: 'dictValue',
    label: '字典键值',
  },
  {
    prop: 'dictSort',
    label: '字典排序',
  },
  {
    prop: 'status',
    label: '状态',
    scopedSlots: "status",
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


function getDeleteParam(row) {
  if (Array.isArray(row)) {
    return row.map(item => item.dictId).join(',')
  }
  return row.dictId
}

async function getOptionSelect() {
  const res = await optionSelect();

  if (res && res.code == '200') {
    optionNameList.value = res.data;
  }
}

function handleReturn() {
  router.push({
    path: '/system/dict'
  })
}

/** 查询字典类型详细 */
function getTypes(dictId) {
  getType(dictId).then(response => {
    defaultDictType.value = response.data.dictType;
    generateQueryParams();
    reset();
  });
}

getTypes(route.params && route.params.dictId);
getOptionSelect();
</script>

<style lang="scss" scoped>
@import "../common.scss";

</style>

<template>
  <div class="manage-container">
    <div class="left-container">
      <el-input class="search-tree"
          v-model="deptName"
          placeholder="请输入部门名称"
          clearable
          prefix-icon="Search"
          style="margin-bottom: 20px"
      />
      <el-tree
          ref="deptTreeRef"
          :data="deptOptions"
          :props="{ label: 'label', children: 'children' }"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          highlight-current
          default-expand-all
          @node-click="handleNodeClick" />
    </div>

    <div class="right-container">

      <search-form ref="searchFormRef" :searchKeyList="searchKeyList" :handleCurrentChange="handleCurrentChange"
                   :reset="reset" :queryParams="queryParams"/>

      <el-row :gutter="10" class="operate-table">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              size="small"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="danger"
              plain
              size="small"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
          >删除</el-button>
        </el-col>
<!--        <el-col :span="1.5">-->
<!--          <el-button-->
<!--              type="info"-->
<!--              plain-->
<!--              @click="handleImport"-->
<!--              size="small"-->
<!--              v-hasPermi="['system:user:import']"-->
<!--          >导入</el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="1.5">-->
<!--          <el-button-->
<!--              type="warning"-->
<!--              plain-->
<!--              size="small"-->
<!--              @click="handleExport"-->
<!--              v-hasPermi="['system:user:export']"-->
<!--          >导出</el-button>-->
<!--        </el-col>-->
      </el-row>

      <Table :tableData ="tableData" :columnData="columnData" :pageTotal="page.total" :pageParam="page"
             :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"
             :handleSelectionChange="handleSelectionChange">
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
          <el-button text type="primary" size="small" class="table-operate-btn" @click="deleteRow(data)">删除</el-button>
          <el-button text type="primary" size="small" class="table-operate-btn">重置密码</el-button>
          <el-button text type="primary" size="small" class="table-operate-btn">分配角色</el-button>
        </template>
      </Table>
    </div>

    <add-user ref="addUserRef" @refreshList="refreshList"></add-user>
  </div>
</template>

<script setup>
import AddUser from './addUser';
import SearchForm from '@/components/SearchForm/index'
import { queryDeptTree } from "@/api/common";
import { listUser, changeUserStatus, deleteUser } from '@/api/system/user';
import { usePage } from '@/composables/usePage'

const { proxy } = getCurrentInstance();
const deptName = ref('');
const deptOptions = ref(undefined);
const addUserRef = ref();
const searchFormRef = ref();


// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, editRow, deleteRow, handleAdd, handleDelete,
  handleSelectionChange, generateQueryParams, queryParams } = usePage({
  getListApi: listUser,
  addModalRef: addUserRef,
  removeApi: deleteUser,
  proxy
})

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const columnData = reactive([
  {
    prop: 'userId',
    label: '用户编号'
  },
  {
    prop: 'userName',
    label: '用户名称'
  },
  {
    prop: 'nickName',
    label: '用户昵称'
  },
  {
    prop: 'dept.deptName',
    label: '部门'
  },
  {
    prop: 'phoneNumber',
    label: '手机号码'
  },
  {
    prop: 'status',
    label: '状态',
    scopedSlots: 'status',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '180'
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
    key: 'userName',
    name: '用户名称',
    type: 'input'
  },
  {
    key: 'phoneNumber',
    name: '手机号码',
    type: 'input'
  },
  {
    key: 'status',
    name: '用户状态',
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

function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleCurrentChange(1);
}

function refreshList() {
  searchFormRef.value.resetForm();
}

/** 根据名称筛选部门树 */
watch(deptName, val => {
  proxy.$refs["deptTreeRef"].filter(val);
});

function filterNode(value, data, node) {
  if (!value) return true;
  let parentNode = node.parent;

  let labels = [node.label]
  let level = 1
  while (level < node.level) {
    labels = [...labels, parentNode.label]
    parentNode = parentNode.parent
    level++
  }
  return labels.some(label => label.indexOf(value) !== -1)
}

function getDeptTree() {
  queryDeptTree().then(response => {
    deptOptions.value = response.data;
  });
}

generateQueryParams();
getDeptTree();
reset();

</script>

<style lang="scss" scoped>
@import "../common.scss";
.manage-container {
  padding: 20px;
  display: flex;
  height: 100%;

  .left-container {
    width: 200px;
    margin-right: 15px;
  }

  .right-container {
    width: calc(100% - 215px);
  }

  .search-header {
    :deep(.el-form-item) {
      margin-right: 12px;
    }

    :deep(.el-form-item__label) {
      font-weight: 700;
    }
  }

  .operate-table {
    margin-bottom: 12px;
  }


}

</style>

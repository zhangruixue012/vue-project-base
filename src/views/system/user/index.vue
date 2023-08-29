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
      <el-form class="search-header" :model="queryParams" ref="queryRef" :inline="true">
        <el-form-item label="用户名称" prop="userName">
          <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
              v-model="queryParams.phoneNumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 200px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              style="width: 150px"
          >
            <el-option
                v-for="dict in sys_normal_disable"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" prop="dateRange" >
          <el-date-picker
              v-model="queryParams.dateRange"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              style="width: 280px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

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
        <el-col :span="1.5">
          <el-button
              type="info"
              plain
              @click="handleImport"
              size="small"
              v-hasPermi="['system:user:import']"
          >导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="warning"
              plain
              size="small"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
          >导出</el-button>
        </el-col>
      </el-row>

      <Table :tableData ="tableData" :columnData="columnData" :pageTotal="pageTotal" :pageParam="page">
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
          <el-button text type="primary" size="small" class="table-operate-btn">删除</el-button>
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
import { queryDeptTree } from "@/api/common";
import { listUser, changeUserStatus } from '@/api/system/user';

const { proxy } = getCurrentInstance();
const deptName = ref('');
const deptOptions = ref(undefined);
const tableData = ref([]);
const addUserRef = ref();
const loading = ref(false);
const queryParams = reactive({
  userName: '',
  phoneNumber: '',
  status: '',
  deptId: '',
  dateRange: []
})
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const pageTotal = ref(0);

const page = reactive({
  currentPage: 1,
  pageSize: 20
})

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

function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleQuery();
}

function handleQuery() {

}

function resetQuery() {

}

function handleAdd() {
  addUserRef.value.openModal('add');
}

function editRow(row) {
  addUserRef.value.openModal('edit', row);
}

function refreshList() {
  queryParams.value = {};
  getUserList();
}

function handleImport() {

}

function handleExport() {

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

function handleEdit() {

}

function handleDelete() {

}

function handleStatusChange(row, index) {
  const { userId, status } = row;
  let text = row.status === "0" ? "启用" : "停用";
  proxy.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗?').then(function () {
    const param = { userId, status }
    return changeUserStatus(param);
  }).then(() => {
    proxy.$modal.msgSuccess(text + "成功");
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
};

function getUserList() {
  loading.value = true;
  const param = {
    ...page
  }
  listUser(param).then(res => {
    loading.value = false;
    tableData.value = res.rows;
    pageTotal.value = res.total;
  });
}

getDeptTree();
getUserList();

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

<template>
  <div class="manage-container">
    <el-form class="search-header" :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
            v-model="queryParams.roleName"
            placeholder="请输入用户名称"
            clearable
            style="width: 200px"
            @keyup.enter="handleCurrentChange(1)"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
            v-model="queryParams.roleKey"
            placeholder="请输入手机号码"
            clearable
            style="width: 200px"
            @keyup.enter="handleCurrentChange(1)"
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
        <el-button type="primary" @click="handleCurrentChange(1)">搜索</el-button>
        <el-button @click="refreshList()">重置</el-button>
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
           @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
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
</template>

<script setup>
import { listRole } from '@/api/system/role';
import { usePage } from '@/composables/usePage'

const { proxy } = getCurrentInstance();
const queryRef = ref();
const addUserRef = ref();

const queryParams = reactive({
  roleName: '',
  roleKey: '',
  status: '',
  dateRange: []
})

// 接收 查询参数、获取列表的接口 返回 列表所需要的数据、分页参数、分页函数等
const { reset, page, tableData, handleSizeChange, handleCurrentChange, getListFunc } = usePage({
  searchForm: queryParams,
  getListApi: listRole
})

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');


const columnData = reactive([
  {
    prop: 'roleId',
    label: '角色编号'
  },
  {
    prop: 'roleName',
    label: '角色名称'
  },
  {
    prop: 'roleKey',
    label: '权限字符'
  },
  {
    prop: 'roleSort',
    label: '显示顺序'
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

function handleAdd() {
  addUserRef.value.openModal('add');
}

function editRow(row) {
  addUserRef.value.openModal('edit', row);
}

function refreshList() {
  proxy.resetForm("queryRef");
  reset()
}

function handleDelete(row) {
  const userIds = row.userId || ids.value;
  proxy.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function () {
    return deleteUser(userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
};

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

reset();

</script>

<style lang="scss" scoped>
@import "../common.scss";
.manage-container {
  padding: 20px;
  height: 100%;

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

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
      <Table :tableData="tableData" :columnData="columnData" :pageTotal="pageTotal" :pageParam="page">
        <!--   #status == v-slot:status     -->
        <template #status="{ data }">
          <el-switch
              v-model="data.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(data)"
          ></el-switch>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { queryDeptTree } from "@/api/common";
import { listUser } from '@/api/system/user';
const { proxy } = getCurrentInstance();
const deptName = ref('');
const deptOptions = ref(undefined);
const tableData = ref([]);
const loading = ref(false);
const queryParams = reactive({
  deptId: ''
})

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
    prop: 'deptName',
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
    minWidth: '180',
    scopedSlots: 'createTime',
  },
  {
    key: "actions",
    label: "操作",
    width: 100,
    scopedSlots: "event",
    align: 'left'
  },
])

function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleQuery();
}

function handleQuery() {

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
  console.log('row:', row, index)
  // let text = row.status === "0" ? "启用" : "停用";
  // proxy.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗?').then(function () {
  //   return changeUserStatus(row.userId, row.status);
  // }).then(() => {
  //   proxy.$modal.msgSuccess(text + "成功");
  // }).catch(function () {
  //   row.status = row.status === "0" ? "1" : "0";
  // });
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
.manage-container {
  padding: 20px;
  display: flex;
  align-items: center;

  .left-container {
    width: 200px;
    margin-right: 15px;
  }

  .right-container {
    width: calc(100% - 215px);
  }
}

</style>

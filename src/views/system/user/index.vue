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
      <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { queryDeptTree } from "@/api/common";
const { proxy } = getCurrentInstance();
const deptName = ref('');
const deptOptions = ref(undefined);
const tableData = ref([]);

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

getDeptTree();
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

<template>
  <el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" :height="height"
            :tree-props="treeProps" :row-key="rowKey" stripe v-bind="$attrs">
<!--    <el-table-column label="序号" type="index" width="60" />-->
    <el-table-column align="center" type="selection" width="55" v-if="check"></el-table-column>

    <template v-for="(item, index) in columnData">

      <template v-if="!item.scopedSlots">

        <el-table-column v-if="!item.children" :align="item.align||'center'" :width="item.width" :min-width="item.minWidth" :prop="item.prop" :label="item.label"
                         :fixed="item.fixed" show-overflow-tooltip>
        </el-table-column>

        <TableColumn
            v-if="item.children"
            :key="item.key"
            :columnHeader="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="item">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>

      <el-table-column v-if="item.scopedSlots" :align="item.align||'center'" :width="item.width" :min-width="item.minWidth" :prop="item.prop" :label="item.label"
                       :fixed="item.fixed" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="item.scopedSlots" :data="scope"></slot>
        </template>
      </el-table-column>

    </template>

  </el-table>

  <Pagination
      v-if="pagination"
      :default-current-page="1"
      :current-page="pageParam.currentPage"
      :page-size="pageParam.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<script setup>
import TableColumn from './table-column';

defineProps({
  tableData: Array,
  columnData: Array,
  loading: {
    type: Boolean,
    default: false
  },
  check: {
    type: Boolean,
    default: true
  },
  pageParam: {
    type: Object,
    default: {
      pageSize: 20,
      pageCount: 1
    }
  },
  pagination: {
    type: Boolean,
    default: true
  },
  pageTotal: Number,
  handleSizeChange: {
    type: Function,
    default: () => {}
  },
  handleCurrentChange: {
    type: Function,
    default: () => {}
  },
  handleSelectionChange: {
    type: Function,
    default: () => {}
  },
  height: {
    type: [String, Number],
    default: 400
  },
  treeProps: {
    type: Object,
    default: {}
  },
  rowKey: {
    type: String,
    default: ''
  }
})
</script>

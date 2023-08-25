<template>
  <el-table :data="tableData" v-loading="loading" stripe>
<!--    <el-table-column label="序号" type="index" width="60" />-->
    <el-table-column align="center" type="selection" width="55" v-if="check"></el-table-column>

    <template v-for="(item, index) in columnData">
      <el-table-column v-if="!item.scopedSlots"  :align="item.align || 'center'" :label="item.label" show-overflow-tooltip
                        :fixed="item.fixed" :prop="item.prop" :width="item.width" :min-width="item.minWidth" :key="item.prop+index">
        <template v-if="item.children">
          <el-table-column v-for="(child,childIndex) in item.children" :align="item.align||'center'" show-overflow-tooltip :width="child.width" :min-width="child.minWidth" :prop="child.prop" :label="child.label"
                           :fixed="child.fixed" :key="child.prop+childIndex">
            <template v-if="child.children">
              <el-table-column
                  v-for="(grandson, grandIndex) in child.children"
                  :prop="grandson.prop"
                  :fixed="grandson.fixed"
                  :label="grandson.label"
                  :min-width="grandson.minWidth"
                  :align="grandson.align||'center'"
                  :key="grandson.prop+grandIndex"
                  show-overflow-tooltip
              />
            </template>
          </el-table-column>
        </template>
      </el-table-column>

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
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
  />
</template>

<script setup>
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
  pageTotal: Number
})

function onSizeChange() {

}

function onCurrentChange() {

}

function handleDelete() {

}
</script>

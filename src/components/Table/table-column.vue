<template>
  <el-table-column :align="columnHeader.align||'center'"
                   show-overflow-tooltip
                   :width="columnHeader.width"
                   :min-width="columnHeader.minWidth"
                   :prop="columnHeader.prop"
                   :label="columnHeader.label"
                   :fixed="columnHeader.fixed"
                   :key="columnHeader.prop">

    <template v-for="(item, index) in columnHeader.children">

      <template v-if="!item.scopedSlots">
        <table-column v-if="item.children && item.children.length"
                      :key="item.key + index"
                      :columnHeader="item">
          <template #default="item">
            <slot v-bind="item" />
          </template>
        </table-column>
      </template>

      <el-table-column
          v-if="item.scopedSlots"
          :align="item.align || 'center'"
          :width="item.width"
          :min-width="item.minWidth"
          :prop="item.key"
          :label="item.name"
          :fixed="item.fixed"
          :key="item.key + index"
          show-overflow-tooltip
      >
        <template v-for="slot in Object.keys($slots)" #[slot]="item">
          <slot :name="slot" v-bind="item" />
        </template>
      </el-table-column>

    </template>

  </el-table-column>



</template>

<script setup name="tableColumn">

const { proxy } = getCurrentInstance();
const props = defineProps({
  columnHeader: {
    type: Object,
    default: {}
  }
})

watch( () => props.columnHeader,
    val => { console.log('columnHeader:', val)}
)
</script>

<style lang="scss">

</style>

<template>
  <el-row :gutter="10" class="operate-table">
    <el-col :span="1.5" v-if="isOperate('add')">
      <el-button
          type="primary"
          plain
          size="small"
          @click="handleAdd"
      >新增</el-button>
    </el-col>
    <el-col :span="1.5" v-if="isOperate('delete')">
      <el-button
          type="danger"
          plain
          size="small"
          @click="handleDelete"
      >删除</el-button>
    </el-col>

    <el-col :span="1.5" v-if="isOperate('import')">
      <upload-button :url="uploadUrl" :data="{}" :isDelete="false" :accept="'excel'">
        <el-button type="success" plain size="small">导入</el-button>
      </upload-button>
    </el-col>

    <el-col :span="1.5" v-if="isOperate('export')">
      <el-button
          type="warning"
          plain
          size="small"
          @click="handleExport"
      >导出</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import UploadButton from '@/components/UploadButton'

const props = defineProps({
  handleAdd: {
    type: Function,
    default: () => {}
  },
  handleDelete: {
    type: Function,
    default: () => {}
  },
  operateList: {
    type: Array,
    default: []
  },
})

const uploadUrl = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')

function isOperate(key) {
  return props.operateList.some(item => item.type === key)
}

function handleExport() {

}
</script>

<style scoped>
.operate-table {
  margin-bottom: 12px;
}
</style>

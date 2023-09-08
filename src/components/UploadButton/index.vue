<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" ref="uploadRef"
              :before-upload="beforeUpload" :headers="uploadHeaders"
             :action="uploadUrl" :data="data" :limit="1" :on-success="unloadSuccess"
             :show-file-list="false">
    <slot></slot>
  </el-upload>
</template>

<script setup>
import { getToken } from '@/utils/auth'
const { proxy } = getCurrentInstance();

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  accept:{
    type: String,
    default: ''
  }
})
const baseURL = import.meta.env.VITE_APP_BASE_API
const uploadHeaders = reactive({Authorization: 'Bearer ' + getToken()})

const uploadUrl = computed(() => {
  return baseURL + props.url
})

const fileList = ref([])

function unloadSuccess(response) {
  if (response.code == 200) {
    proxy.$message.success(response?.msg);
  }
  proxy.$refs.uploadRef.clearFiles();
}

async function beforeUpload(file) {
  // if(file.type == 'video/mp4'){
  //   const url = URL.createObjectURL(file);
  //   const audioElement = new Audio(url);
  //   let duration;
  //   const fun = (duration) => {
  //     this.duration = duration
  //     this.$emit('getDuration',duration)
  //   }
  //   audioElement.addEventListener("loadedmetadata", ()=> {
  //     duration = audioElement.duration;
  //     fun(Math.floor(duration))
  //   });
  // }

}
</script>

<style scoped lang="scss">
.upload-demo {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

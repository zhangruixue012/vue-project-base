<template>
  <div class="upload-file">
    <el-upload :action="uploadFileUrl" :before-upload="handleBeforeUpload" :file-list="fileList" :limit="limit"
               :data="generateData()" :on-error="handleUploadError" :on-exceed="handleExceed" :on-success="handleUploadSuccess"
               :show-file-list="false" :headers="headers" class="upload-file-uploader" ref="upload">
      <!-- 上传按钮 -->
      <el-button v-if="!isMultiple" size="mini" type="primary">选取文件</el-button>

      <template v-if="isMultiple">
        <el-button v-for="item in uploadTypeList" size="mini" type="primary" @click="setCurrentDirectory(item)">{{item.name}}</el-button>
      </template>

      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
        <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li :key="index + 'file'" class="el-upload-list__item ele-upload-list__item-content"
          v-for="(file, index) in fileList">
        <span  @click="linkTo(file)">
          <span class="el-icon-document"> {{ file.originalFileName }} </span>
        </span>
        <div class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(file,index)" type="danger">删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
const baseURL = import.meta.env.VITE_APP_BASE_API

import { getToken } from "@/utils/auth";

import { deleteFile } from '@/api/common';

const { proxy } = getCurrentInstance();

const emit = defineEmits();

const props = defineProps({
  uploadTypeList: {
    type: Array,
    default: ()=>{
      return []
    }
  },
  isMultiple: false, // 是否为多个文件上传
  // 值
  value: [String, Object, Array],
   // [{
   //    name:'fileName',
   //    id:'fileId'
   // }]

  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ["doc", "xls", "ppt", "txt", "pdf"],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
  // 上传地址
  url:{
    type: String,
    default: '/payroll/file/uploadFile'
  },
  // 上传参数
  data:{
    type: Object,
    default: ()=>{
      return {
        directory: '',
        // 数据主键id （新增为uuid，为表单创建id）
        taskId: ''
      }
    }
  },
})

const headers = reactive({Authorization: "Bearer " + getToken()});

const fileList = ref([])

const currentDirectory = ref('');

watch(value, val => {
  if (val) {
    let temp = 1;
    // 首先将值转为数组
    const list = Array.isArray(val) ? val : props.value.split(',');
    // 然后将数组转为对象数组
    fileList.value = list.map(item => {
      if (typeof item === "string") {
        item = {
          name: item,
          url: item
        };
      }
      item.uid = item.uid || new Date().getTime() + temp++;
      return item;
    });
  } else {
    fileList.value = [];
  }
});

const showTip = computed(() => {
  return props.isShowTip && (props.fileType || props.fileSize);
})

const uploadFileUrl = computed(() => {
  return baseURL + props.url
})


function generateData() {
  if(!props.isMultiple) {
    return props.data;
  } else {
    return {
      ...props.data,
      directory: currentDirectory.value
    }
  }
};

function setCurrentDirectory(item) {
  currentDirectory.value = item.directory;
}

// 上传前校检格式和大小
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType) {
    let fileExtension = "";
    if (file.name.lastIndexOf(".") > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
    }
    const isTypeOk = props.fileType.some((type) => {
      if (file.type.indexOf(type) > -1) return true;
      if (fileExtension && fileExtension.indexOf(type) > -1) return true;
      return false;
    });
    if (!isTypeOk) {
      this.$message.error(`文件格式不正确, 请上传${props.fileType.join("/")}格式文件!`);
      return false;
    }
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      proxy.$message.error(`上传文件大小不能超过 ${props.fileSize} MB!`);
      return false;
    }
  }
  return true;
}


// 文件个数超出
function handleExceed() {
  proxy.$message.error(`上传文件数量不能超过 ${props.limit} 个!`);
}

// 上传失败
function handleUploadError(err) {
  proxy.$message.error("上传失败, 请重试");
}


// 上传成功回调
function handleUploadSuccess(res, file) {
  if(res.code == 200){
    proxy.$message.success(res.msg);
    if (!props.isMultiple) {
      fileList.value.push({
        originalFileName: res.data.originalFileName,
        id: res.data.id
      });
    } else {
      fileList.value.push({
        originalFileName: res.data.originalFileName,
        id: res.data.id,
        directory: res.data.directory
      });
    }
   emit("input", fileList.value);
  }else{
    proxy.$message.error(res.msg);
  }
}


// 删除文件
async function handleDelete(file,index) {
  const param = { id: file.id };
  const res = await deleteFile(param);

  if (res.code == 200) {
    fileList.value.splice(index, 1);
    emit("input", fileList.value);
  } else {
    proxy.$message.error(res.msg)
  }
}

function linkTo(item) {
  proxy.download(`/payroll/file/downloadFile`, { id: item.id }, item.originalFileName)
}
</script>



<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}

.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  cursor: pointer;
  padding-left: 10px;
}

.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>

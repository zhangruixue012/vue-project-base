<template>
  <el-dialog :title="title" v-model="open" width="450px" append-to-body>

    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="form.dictType" disabled placeholder="请输入字典类型"/>
      </el-form-item>

      <el-form-item label="数据标签" prop="dictLabel">
        <el-input v-model="form.dictLabel" placeholder="请输入数据标签"/>
      </el-form-item>

      <el-form-item label="数据键值" prop="dictValue">
        <el-input v-model="form.dictValue" placeholder="请输入数据键值"/>
      </el-form-item>

      <el-form-item label="样式属性" prop="cssClass">
        <el-input v-model="form.cssClass" placeholder="请输入样式属性"/>
      </el-form-item>

      <el-form-item label="显示排序" prop="dictSort">
        <el-input-number v-model="form.dictSort" :min="0"/>
      </el-form-item>

      <el-form-item label="回显样式" prop="listClass">
        <el-select v-model="form.listClass">
          <el-option
              v-for="item in listClassOptions"
              :key="item.value"
              :label="item.label + '(' + item.value + ')'"
              :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 200px">
          <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
          >{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm(formRef)">确 定</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { addData, updateData } from "@/api/system/dict/data";
import { useAddModal } from "@/composables/useAddModal"

const formRef = ref();
const { proxy } = getCurrentInstance();
const emit = defineEmits()

// 数据标签回显样式
const listClassOptions = ref([
  { value: "default", label: "默认" },
  { value: "primary", label: "主要" },
  { value: "success", label: "成功" },
  { value: "info", label: "信息" },
  { value: "warning", label: "警告" },
  { value: "danger", label: "危险" }
]);

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const data = reactive({
  form: {
    dictType: '',
    dictLabel: '',
    dictValue: '',
    cssClass: '',
    dictSort: 0,
    listClass: 'default',
    status: '0',
    remark: ''
  },
  rules: {
    dictLabel: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
    dictValue: [{ required: true, message: "数据键值不能为空", trigger: "blur" }],
    dictSort: [{ required: true, message: "显示排序不能为空", trigger: "blur" }]
  }
});

const { form, rules } = toRefs(data);

const { submitForm, open, title, openModal, closeModal } = useAddModal({
  modalFormRef: 'formRef',
  formData: form,
  addApi: addData,
  updateApi: updateData,
  refreshList,
  proxy
})

function refreshList() {
  emit('handleCurrentChange', 1);
}


//暴露openModal方法
defineExpose({
  openModal
});
</script>

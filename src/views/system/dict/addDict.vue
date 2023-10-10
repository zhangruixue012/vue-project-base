<template>
  <el-dialog :title="title" v-model="open" width="450px" append-to-body>

    <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="form.dictName" placeholder="请输入字典名称" maxlength="30"/>
      </el-form-item>

      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="form.dictType" placeholder="请输入字典类型" maxlength="30"/>
      </el-form-item>

      <el-form-item label="状态" prop="statue">
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
        <el-button type="primary" @click="submitForm(userRef)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { addUser, updateUser, userOptions } from "@/api/system/user";
import { queryDeptTree } from "@/api/common";
import { useAddModal } from "@/composables/useAddModal"

const userRef = ref();
const { proxy } = getCurrentInstance();
const emit = defineEmits()

const title = ref('新增');
const open = ref(false);
const deptOptions = ref([]);
const postOptions = ref([]);
const roleOptions = ref([]);
const { sys_user_sex } = proxy.useDict('sys_user_sex');
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const data = reactive({
  form: {
    dictName: '',
    dictType: '',
    status: '',
    remark: ''
  },
  rules: {
    dictName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
    dictType: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phoneNumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
  }
});

const { form, rules } = toRefs(data);

const { submitForm } = useAddModal({
  modalFormRef: 'roleRef',
  formData: form,
  addApi: addUser,
  updateApi: updateUser,
  refreshList,
  cancel,
  proxy
})

function getDeptTree() {
  queryDeptTree().then(res => {
    deptOptions.value = res.data;
  });
};

function reset() {
  form.value = {
    id: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phoneNumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: undefined,
    roleIds: undefined
  };
  proxy.resetForm("userRef");
};

function openModal(type, rowData) {
  open.value = true;
  getDeptTree();
  reset();
  getUserOption();

  if (type === 'add') {
    title.value = '新增'
    return;
  }

  if (type === 'edit') {
    title.value = '修改'
    const { id, nickName, deptId, phoneNumber, email, userName, password, sex, status, postIds, roleIds, remark } = rowData.row
    Object.assign(form.value, {
      id, nickName, deptId, phoneNumber, email, userName, password, sex, status, postIds, roleIds, remark
    })
    return;
  }
}

async function getUserOption() {
  const res = await userOptions();
  postOptions.value = res.posts;
  roleOptions.value = res.roles;

}

function refreshList() {
  emit('refreshList');
}

function cancel() {
  open.value = false;
}



//暴露openModal方法
defineExpose({
  openModal
});
</script>

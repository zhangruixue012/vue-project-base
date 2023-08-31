<template>
  <el-dialog :title="title" v-model="open" width="650px" append-to-body>

    <el-form :model="form" :rules="rules" ref="userRef" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门" prop="deptId">
            <el-tree-select
                style="width: 200px"
                v-model="form.deptId"
                :data="deptOptions"
                :props="{ value: 'id', label: 'label', children: 'children' }"
                value-key="id"
                placeholder="请选择归属部门"
                check-strictly
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" maxlength="11" style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :disabled="form.userId == undefined" label="用户名称" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :disabled="form.userId == undefined" label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户性别">
            <el-select v-model="form.sex" placeholder="请选择" style="width: 200px">
              <el-option
                  v-for="dict in sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" >
            <el-radio-group v-model="form.status" style="width: 200px">
              <el-radio
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
              >{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位">
            <el-select v-model="form.postIds" placeholder="请选择" style="width: 200px">
              <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="form.roleIds" placeholder="请选择" style="width: 200px">
              <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" style="width: 506px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
  form: {},
  rules: {
    userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
    nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phoneNumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
  }
});

const { form, rules } = toRefs(data);

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

const submitForm = async (formEl) => {
  if (!formEl) return;

  formEl.validate(async (valid, fields) => {
    if (valid) {
      if (form.value.id != undefined) {
        updateUser(form.value).then(response => {
          proxy.$message.success("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then(response => {
          proxy.$message.success("新增成功");
          open.value = false;
          getList();
        });
      }
    }

  })
}

async function getUserOption() {
  const res = await userOptions();
  postOptions.value = res.posts;
  console.log(postOptions.value);
  roleOptions.value = res.roles;
  console.log(roleOptions.value);

}

function getList() {
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

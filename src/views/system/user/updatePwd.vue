<template>
  <el-dialog class="update-pwd" title="提示" v-model="isOpen" width="400px" append-to-body>
    <el-form :model="form" :rules="rules" ref="updatePwdRef" label-position="top">
      <el-form-item label="请输入新密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入新密码" type="password" show-password />
      </el-form-item>
    </el-form>

    <div class="footer">
      <el-button type="primary" @click="submit(updatePwdRef)">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>


<script setup>
import { userOptions } from "@/api/system/user";

const isOpen = ref(false);
const updatePwdRef = ref();
const { proxy } = getCurrentInstance();

const data = reactive({
  form: { password: '' },
  rules: {
    password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }],
  }
});

const { form, rules } = toRefs(data);

function openModal() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function submit(formEl) {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      userOptions(form.value).then(response => {
        proxy.$message.success("修改成功");
        close();
      });
    }
  })
}

defineExpose({
  openModal
});

</script>

<style lang="scss" scoped>
.update-pwd {
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

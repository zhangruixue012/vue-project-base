<template>
  <el-dialog :title="title" v-model="open" width="650px" append-to-body>

    <el-form :model="form" :rules="rules" ref="menuRef" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <el-tree-select
                v-model="form.parentId"
                :data="menuTreeList"
                :props="{ value: 'id', label: 'label', children: 'children' }"
                value-key="id"
                placeholder="请选择上级菜单"
                check-strictly
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="M">目录</el-radio>
              <el-radio label="C">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单图标">
            <el-input v-model="form.icon" placeholder="请输入菜单图标"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" style="width: 200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示顺序" prop="orderNum">
            <el-input-number v-model="form.orderNum" placeholder="请输入显示顺序" style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="是否外链" prop="isFrame">
            <el-radio-group v-model="form.isFrame">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址" style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="显示状态" prop="visible">
            <el-radio-group v-model="form.visible">
              <el-radio :label="true">显示</el-radio>
              <el-radio :label="false">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="true">正常</el-radio>
              <el-radio :label="false">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row v-if="form.menuType === 'C'">
        <el-col :span="12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" placeholder="请输入组件路径" style="width: 200px"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="权限字符">
            <el-input v-model="form.perms" placeholder="请输入权限字符" style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="form.menuType === 'C'">
        <el-col :span="12">
          <el-form-item label="路由参数" prop="query">
            <el-input v-model="form.query" placeholder="请输入路由参数" style="width: 200px"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="是否缓存" prop="isCache">
            <el-radio-group v-model="form.isCache">
              <el-radio :label="1">缓存</el-radio>
              <el-radio :label="0">不缓存</el-radio>
            </el-radio-group>
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
import { useAddModal } from "@/composables/useAddModal"
import { addMenu } from "@/api/system/"

const title = ref('新增');
const open = ref(false);
const menuTreeList = reactive();
const menuRef = ref(null);

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

const { submitForm } = useAddModal({
  modalFormRef: 'roleRef',
  formData: form,
  addApi: addMenu,
  updateApi: updateUser,
  refreshList,
  cancel,
  proxy
})


function reset() {
  form.value = {
    id: undefined,
    parentId: undefined,
    menuType: undefined,
    icon: undefined,
    menuName: undefined,
    orderNum: undefined,
    perms: undefined,
    isFrame: false
  };
  proxy.resetForm("menuRef");
};

function openModal(type, rowData) {
  open.value = true;
}

//暴露openModal方法
defineExpose({
  openModal
});


</script>

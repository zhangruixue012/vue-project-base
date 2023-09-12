<template>
  <el-dialog :title="title" v-model="open" width="420px" append-to-body>

    <el-form :model="form" :rules="rules" ref="roleRef" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" style="width: 260px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="权限字符" prop="roleKey">
            <el-input v-model="form.roleKey" placeholder="请输入权限字符" style="width: 260px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="角色顺序" prop="roleSort">
            <el-input-number v-model="form.roleSort" placeholder="请输入角色顺序" style="width: 260px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
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
        <el-col :span="24">
          <el-form-item label="菜单权限" prop="menuId">
            <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
            <div class="tree-content">
              <el-tree
                  ref="menuTreeRef"
                  v-model="form.menuId"
                  node-key="id"
                  :data="menuTreeList"
                  show-checkbox
                  :default-expanded-keys="expandNodes"
                  :check-strictly="!form.menuCheckStrictly"
                  :props="{ label: 'label', children: 'children' }"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit(roleRef)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { getMenuTree, addRole, updateRole } from "@/api/system/role";
import { useAddModal } from '@/composables/useAddModal'

const roleRef = ref();
const menuTreeRef = ref();
const { proxy } = getCurrentInstance();
const emit = defineEmits()

const title = ref('新增');
const open = ref(false);


const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const data = reactive({
  form: {},
  rules: {
    roleName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
    roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
    roleSort: [{ required: true, message: "角色顺序不能为空", trigger: "blur" }]
  }
});

const menuTreeList = ref([]);
const expandNodes = ref([]);

const { form, rules } = toRefs(data);


const { submitForm } = useAddModal({
  modalFormRef: 'roleRef',
  formData: form,
  addApi: addRole,
  updateApi: updateRole,
  refreshList,
  cancel,
  proxy
})

function reset() {
  form.value = {
    roleId: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleSort: 0,
    status: "0",
    menuId: [],
    menuCheckStrictly: false,
    remark: undefined
  };
  proxy.resetForm("roleRef");
}

function handleCheckedTreeConnect(value) {
  form.value.menuCheckStrictly = value ? true : false;
}

async function getMenuTreeData() {
  const res = await getMenuTree();
  menuTreeList.value = res.data;

  expandNodes.value.push(res.data[0].id)
}

function submit(roleRef) {
  form.value.menuId = getMenuAllCheckedKeys();
  submitForm(roleRef)
}

function openModal(type, rowData) {
  open.value = true;
  reset();
  getMenuTreeData();

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

function getMenuAllCheckedKeys() {
  // 目前被选中的菜单节点
  let checkedKeys = menuTreeRef.value.getCheckedKeys();
  // 半选中的菜单节点
  let halfCheckedKeys = menuTreeRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
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

<style scoped>
 .tree-content {
   width: 100%;
   margin-top: 5px;
   border: 1px solid #e5e6e7;
   background: #fff none;
   border-radius: 4px;
   padding: 5px;
 }
</style>


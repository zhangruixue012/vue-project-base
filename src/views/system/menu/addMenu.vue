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
          <el-form-item label="菜单图标" prop="icon">
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
          <el-form-item label="权限字符" prop="perms">
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
        <el-button type="primary" @click="submitForm(menuRef)">确 定</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup>
import { useAddModal } from "@/composables/useAddModal"
import { addMenu, updateMenu } from "@/api/system/menu"

const menuTreeList = reactive();
const menuRef = ref(null);

const data = reactive({
  form: {
    parentId: '',
    menuType: '',
    icon: '',
    menuName: '',
    orderNum: '',
    isFrame: false,
    path: '',
    visible: true,
    status: true,
    component: '',
    perms: '',
    query: '',
    isCache: '1'
  },
  rules: {}
});

const props = defineProps({
  handleCurrentChange: {
    type: Function,
    default: () => {}
  }
});

const { form, rules } = toRefs(data);
const { proxy } = getCurrentInstance();

const { submitForm, open, title, openModal, closeModal } = useAddModal({
  modalFormRef: 'menuRef',
  formData: form,
  addApi: addMenu,
  updateApi: updateMenu,
  refreshList: props.handleCurrentChange,
  proxy
})

//暴露openModal方法
defineExpose({
  openModal
});


</script>

<template>
  <el-dialog title="审批" :visible.sync="dialogVisible" width="500px">
    <el-form :model="approveForm" label-width="80px">
      <el-form-item label="审批结果" style="margin-bottom: 22px">
        <el-radio-group
            v-model="approveForm.state"
            @input="onApproveRadioChange">
          <el-radio-button label="通过"></el-radio-button>
          <el-radio-button label="不通过"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批意见" style="margin-bottom: 22px" required>
        <el-input
            type="textarea"
            v-model="approveForm.approvalOpinions"
            placeholder="请输入审批意见"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="onSubmitApproveCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmitApproveOk">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const emit = defineEmits();

const props = defineProps({
  selectionRows: {
    type: Array,
    required: true,
    default: () => [],
  },
  approveApi: {
    type: Function,
    default: () => {},
  }
})

const dialogVisible = ref(false);
const approveForm = reactive({
  state: "通过",
  approvalOpinions: "同意",
  id: ''
})
function onApproveRadioChange(val) {
  approveForm.approvalOpinions = val === "不通过" ? "" : "通过";
}

function onSubmitApproveCancel() {
  dialogVisible.value = false;
}

function onSubmitApproveOk() {
  let { approvalOpinions, state, id } = approveForm;

  // 调用审批接口
  const param = {
    approvalOpinions,
    state: state === '不通过' ? '0' : '1',
    selectId: id
  }
  if (param.approvalOpinions === '') {
    return proxy.$message.error('审批意见不能为空！');
  }
  props.approveApi(param).then(res => {
    proxy.$message.success('审批成功')
    emit("refreshList");
    dialogVisible.value = false;
  })
}

function openApproveDialog(id) {

  if (id) {
    approveForm.id = id;
  }
  approveForm.approvalOpinions = "同意";
  approveForm.state = "通过";

  dialogVisible.value = true;
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
  margin-right: 8px;
}
</style>


export function useAddModal(opts){
    const {
        modalFormRef,
        formData,
        addApi,
        updateApi,
        proxy,
        refreshList
    } = opts

    const title = ref('新增');
    const operateType = ref('add');
    const open = ref(false);

    function openModal(type, rowData) {
        proxy.resetForm(modalFormRef);
        console.log('新增打开formData:', formData);

        if (type === 'add') {
            operateType.value = 'add';
            title.value = '新增'
        }

        if (type === 'edit') {
            operateType.value = 'edit';
            formData.value = rowData;
            console.log('formData.value', formData.value);
            title.value = '编辑'
        }
        open.value = true;
    }

    function closeModal() {
        proxy.resetForm(modalFormRef);
        open.value = false;
    }

    async function submitForm(formEl) {
        if (!formEl) return;
        formEl.validate(async (valid, fields) => {
            if (valid) {
                if (operateType.value === 'edit') {
                    console.log('保存的数据', formData.value);
                    updateApi(formData.value).then(response => {
                        proxy.$message.success("修改成功");
                        closeModal()
                        refreshList();
                    });
                } else {
                    addApi(formData.value).then(response => {
                        proxy.$message.success("新增成功");
                        closeModal()
                        refreshList();
                    });
                }
            }
        })
    }

    return {
        submitForm,
        openModal,
        closeModal,
        open,
        title
    }


}

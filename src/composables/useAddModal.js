
export function useAddModal(opts){
    const {
        modalFormRef,
        formData,
        addApi,
        updateApi,
        proxy,
        cancel = () => {},
        refreshList = () => {},
    } = opts



    async function submitForm(formEl) {
        if (!formEl) return;
        formEl.validate(async (valid, fields) => {
            if (valid) {
                if (formData.id != undefined) {
                    updateApi(formData.value).then(response => {
                        proxy.$message.success("修改成功");
                        proxy.resetForm(modalFormRef);
                        cancel()
                        refreshList();
                    });
                } else {
                    addApi(formData.value).then(response => {
                        proxy.$message.success("新增成功");
                        proxy.resetForm(modalFormRef);
                        cancel()
                        refreshList();
                    });
                }
            }
        })
    }

    return {
        submitForm
    }


}


/**
 * @description usePage 接收一个 opts 参数，返回列表所需数据
 * @param {Object} opts.searchForm - 默认查询参数
 * @param {Function} opts.getListApi  - 获取列表数据的接口
 * @param {Function} opts.customQueryParameters  - 自定义查询参数
 * @param {Function} opts.getListFunc  - 执行完 getList 成功后执行的逻辑 有一个opts参数
 * @param {Function} opts.resetFunc  - 执行完 reset 后执行的逻辑
 * @param {Function} opts.sizeChangeFunc  - 执行完 sizeChange 后执行的逻辑
 * @param {Function} opts.currentChangeFunc  - 执行完 currentChange 后执行的逻辑
 */

export function usePage(opts){
    const {
        proxy = {},
        getListApi,
        removeApi,
        customQueryParameters = {},
        addModalRef,
        getListFunc = (opts) => {},
        resetFunc = () => {},
        sizeChangeFunc = () => {},
        currentChangeFunc = () => {},
        searchKeyList = [],
        getDeleteParam = () => {}
    } = opts

    const page = reactive({
        pageSize: 10,
        pageNo: 1,
        total: 0
    })
    const tableData = ref([]);

    const tableHeight = ref(null)

    const tableRef = ref();

    const multipleSelection = ref([])

    const queryParams = reactive({})
    function generateQueryParams() {
        searchKeyList.forEach(item => {
            Object.assign(queryParams, {
                [item.key]: item.type === 'dateRange' ? [] : ''
            })
        })
    }

    function reset() {
        resetFunc()
        handleCurrentChange(1)
    }

    function getList() {
        const opts = {
            ...page,
            total: undefined,
            ...queryParams,
            ...customQueryParameters
        }

        getListApi(opts).then((res) => {
            if (res.code === 200) {
                tableData.value = res?.rows || []
                page.total = res?.total || 0

                getListFunc(opts)
            }
        })
    }

    function handleAdd() {
        addModalRef.value.openModal('add');
    }

    function editRow(row) {
        addModalRef.value.openModal('edit', row);
    }

    function deleteRow(row) {
        let param = { ids: row.id }
        if (!row.id) {
            param = getDeleteParam(row);
        }
        proxy.$modal
            .confirm("是否确认删除该条数据项？")
            .then(() => {
                removeApi(param).then(res => {
                    getList()
                })
            })
            .then(() => { })
            .catch(() => { });
    }

    function handleSizeChange(size) {
        page.pageSize = size
        sizeChangeFunc()
        getList()
    }

    function handleCurrentChange(cur) {
        page.pageNo = cur
        currentChangeFunc()
        getList()
    }

    function handleSelectionChange(val) {
        multipleSelection.value = val
    }

    function handleDelete() {
        if (multipleSelection.value.length == 0) {
            return proxy.$message.warning("请至少选择一条要删除的数据！");
        }

        let idsArray = multipleSelection.value.map((item) => item.id);
        proxy.$modal
            .confirm("是否确认删除" + idsArray.length + "条数据项？")
            .then(() => {
                const idsString = idsArray.filter(item => item !== undefined).join(',')
                let param = { ids: idsString };

                if (!idsString) {
                    param = getDeleteParam(multipleSelection.value);
                }
                removeApi(param).then(res => {
                    getList()
                })
            })
            .then(() => {})
            .catch(() => {});
    }

    onMounted(() => {
        tableHeight.value = window.innerHeight - 252;
        window.onresize = () => {
            tableHeight.value = window.innerHeight - 252;
        }
    })

    return {
        reset,
        page,
        tableData,
        handleSizeChange,
        handleCurrentChange,
        handleSelectionChange,
        handleDelete,
        tableRef,
        handleAdd,
        editRow,
        deleteRow,
        generateQueryParams,
        queryParams,
        tableHeight
    }


}

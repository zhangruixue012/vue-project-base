import request from '@/utils/request'

// 查询部门下拉树结构
export function queryDeptTree() {
    return request({
        url: '/common/deptTree',
        method: 'get'
    })
}

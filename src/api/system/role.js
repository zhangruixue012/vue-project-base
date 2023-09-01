import request from '@/utils/request'

// 查询部门下拉树结构
export function listRole(params) {
    return request({
        url: '/system/role/list',
        method: 'get',
        params
    })
}

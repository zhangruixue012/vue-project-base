import request from '@/utils/request'

// 查询部门下拉树结构
export function listRole(params) {
    return request({
        url: '/system/role/list',
        method: 'get',
        params
    })
}


export function removeRole(params) {
    return request({
        url: '/system/role/remove',
        method: 'get',
        params
    })
}


export function getMenuTree(params) {
    return request({
        url: '/system/menu/treeSelect',
        method: 'get',
        params
    })
}

export function addRole(data) {
    return request({
        url: '/system/role/addRole',
        method: 'post',
        data
    })
}

export function updateRole(data) {
    return request({
        url: '/system/role/updateRole',
        method: 'put',
        data
    })
}

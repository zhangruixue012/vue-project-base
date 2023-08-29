import request from '@/utils/request'

// 查询部门下拉树结构
export function listUser(params) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params
    })
}

export function changeUserStatus(params) {
    return request({
        url: '/system/user/changeStatus',
        method: 'put',
        params
    })
}

export function addUser(data) {
    return request({
        url: '/system/user/addUser',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/system/user/updateUser',
        method: 'put',
        data
    })
}

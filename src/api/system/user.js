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

export function deleteUser(ids) {
    return request({
        url: `/system/user/${ids}`,
        method: 'get',
    })
}

export function userOptions(params) {
    return request({
        url: '/system/userOptions',
        method: 'get',
        params
    })
}

// 查询用户详细
export function getUser(userId) {
    return request({
        url: '/system/user/' + parseStrEmpty(userId),
        method: 'get'
    })
}

// 删除用户
export function delUser(userId) {
    return request({
        url: '/system/user/' + userId,
        method: 'delete'
    })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    }
    return request({
        url: '/system/user/resetPwd',
        method: 'put',
        data: data
    })
}

// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: '/system/user/profile',
        method: 'get'
    })
}

// 修改用户个人信息
export function updateUserProfile(data) {
    return request({
        url: '/system/user/profile',
        method: 'put',
        data: data
    })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return request({
        url: '/system/user/profile/updatePwd',
        method: 'put',
        params: data
    })
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/system/user/profile/avatar',
        method: 'post',
        data: data
    })
}

// 查询授权角色
export function getAuthRole(userId) {
    return request({
        url: '/system/user/authRole/' + userId,
        method: 'get'
    })
}

// 保存授权角色
export function updateAuthRole(data) {
    return request({
        url: '/system/user/authRole',
        method: 'put',
        params: data
    })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
    return request({
        url: '/system/user/deptTree',
        method: 'get'
    })
}


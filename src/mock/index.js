import Mock from "mockjs";
import router from './mockData/router';
import deptTree from './mockData/deptTree.json'
import userList from './mockData/userList.json'
import userStateList from './mockData/userStateList.json'
import userSex from './mockData/userSex.json'
export default [
    {
        url: "/dev-api/getRouters", // 模拟登录的链接
        method: "get", // 请求方式
        statusCode: 200, // 返回的http状态码
        response: () => {
            return router
        }
    },
    {
        url: "/dev-api/common/deptTree", // 部门下拉树
        method: "get",
        statusCode: 200,
        response: () => {
            return deptTree
        }
    },
    {
        url: "/dev-api/system/user/list", // 用户列表
        method: "get",
        statusCode: 200,
        response: () => {
            return userList
        }
    },
    {
        url: "/system/user/changeStatus", // 修改用户状态
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"演示模式，不允许操作","code":500}
        }
    },
    {
        url: "/system/dict/data/type/sys_normal_disable", // 用户状态字典表
        method: "get",
        statusCode: 200,
        response: () => {
            return userStateList
        }
    },
    {
        url: "/system/dict/data/type/sys_user_sex", // 用户状态字典表
        method: "get",
        statusCode: 200,
        response: () => {
            return userSex
        }
    },
    {
        url: "/system/user/addUser", // 新增用户
        method: "post",
        statusCode: 200,
        response: () => {
            return { "msg":"新增成功","code":200 }
        }
    },
    {
        url: "/system/user/updateUser", // 修改用户
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"修改成功","code":200}
        }
    }
]

import Mock from "mockjs";

// const moduleFiles = require.context('./mockData', true, /\.json/);
//
// const mocks = moduleFiles.keys().reduce((modules, item) => {
//     return [...modules, ...moduleFiles(item).default]
// }, [])

import router from './mockData/user/router.json';
import deptTree from './mockData/deptTree.json'
import userList from './mockData/user/userList.json'
import userStateList from './mockData/user/userStateList.json'
import userSex from './mockData/user/userSex.json'
import userOptions from './mockData/user/userOptions.json'
import roleList from './mockData/roleList.json'
import menuList from './mockData/menuList.json'
import menuTree from './mockData/role/menuTree.json'
import dictDataList from './mockData/dict/dictDataList.json'
import userInfo from './mockData/user/userInfo.json'
import dictTypeList from './mockData/dict/dictTypeList.json'
import optionNameList from './mockData/dict/optionNameList.json'

export default [
    {
        url: "/dev-api-mock/getRouters", // 模拟登录的链接
        method: "get", // 请求方式
        statusCode: 200, // 返回的http状态码
        response: () => {
            return router
        }
    },
    {
        url: "/dev-api-mock/getInfo",
        method: "get",
        statusCode: 200,
        response: () => {
            return userInfo
        }
    },
    {
        url: "/dev-api-mock/common/deptTree", // 部门下拉树
        method: "get",
        statusCode: 200,
        response: () => {
            return deptTree
        }
    },
    {
        url: "/dev-api-mock/system/user/list", // 用户列表
        method: "get",
        statusCode: 200,
        response: () => {
            return userList
        }
    },
    {
        url: "/dev-api-mock/system/user/changeStatus", // 修改用户状态
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"演示模式，不允许操作","code":500}
        }
    },
    {
        url: "/dev-api-mock/system/dict/data/type/sys_normal_disable", // 用户状态字典表
        method: "get",
        statusCode: 200,
        response: () => {
            return userStateList
        }
    },
    {
        url: "/dev-api-mock/system/dict/data/type/sys_user_sex", // 用户状态字典表
        method: "get",
        statusCode: 200,
        response: () => {
            return userSex
        }
    },
    {
        url: "/dev-api-mock/system/user/addUser", // 新增用户
        method: "post",
        statusCode: 200,
        response: () => {
            return { "msg":"新增成功","code":200 }
        }
    },
    {
        url: "/dev-api-mock/system/user/updateUser", // 修改用户
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"修改成功","code":200}
        }
    },
    {
        url: "/dev-api-mock/system/userOptions", // 用户岗位下拉 && 角色下拉
        method: "get",
        statusCode: 200,
        response: () => {
            return userOptions
        }
    },
    {
        url: "/dev-api-mock/system/role/list", // 角色列表
        method: "get",
        statusCode: 200,
        response: () => {
            return roleList
        }
    },
    {
        url: "/dev-api-mock/system/menu/list", // 菜单列表
        method: "get",
        statusCode: 200,
        response: () => {
            return menuList
        }
    },
    {
        url: "/dev-api-mock/system/menu/treeSelect", // 菜单树
        method: "get",
        statusCode: 200,
        response: () => {
            return menuTree
        }
    },
    {
        url: "/dev-api-mock/system/role/addRole", // 新增角色
        method: "post",
        statusCode: 200,
        response: () => {
            return {"msg":"角色新增成功","code":200}
        }
    },
    {
        url: "/dev-api-mock/system/role/updateRole", // 修改角色
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"角色修改成功","code":200}
        }
    },
    {
        url: '/dev-api-mock/system/menu/addMenu',
        method: "post",
        statusCode: 200,
        response: () => {
            return {"msg":"菜单新增成功","code":200}
        }
    },
    {
        url: '/dev-api-mock/system/menu/updateMenu',
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"菜单编辑成功","code":200}
        }
    },
    {
        url: `/dev-api-mock/system/menu/1`,
        method: "delete",
        statusCode: 200,
        response: () => {
            return {"msg":"菜单删除成功","code":200}
        }
    },
    {
        url: `/dev-api-mock/system/dict/data/list`,
        method: "get",
        statusCode: 200,
        response: () => {
            return dictDataList
        }
    },
    {
        url: `/dev-api-mock/system/dict/type/list`,
        method: "get",
        statusCode: 200,
        response: () => {
            return dictTypeList
        }
    },
    {
        url: `/dev-api-mock/system/dict/data/1`,
        method: "delete",
        statusCode: 200,
        response: () => {
            return {"msg":"字典删除成功","code":200}
        }
    },
    {
        url: '/dev-api-mock/system/dict/data',
        method: "post",
        statusCode: 200,
        response: () => {
            return {"msg":"字典新增成功","code":200}
        }
    },
    {
        url: '/dev-api-mock/system/dict/data',
        method: "put",
        statusCode: 200,
        response: () => {
            return {"msg":"字典修改成功","code":200}
        }
    },
    {
        url: '/dev-api-mock/system/dict/data/1',
        method: "get",
        statusCode: 200,
        response: () => {
            return []
        }
    },
    {
        url: '/dev-api-mock/system/dict/type/optionSelect',
        method: "get",
        statusCode: 200,
        response: () => {
            return optionNameList
        }
    },
    {
        url: '/dev-api-mock/system/dict/type/1',
        method: "get",
        statusCode: 200,
        response: () => {
            return {
                "msg": "操作成功",
                "code": 200,
                "data": {
                    "createBy": "admin",
                    "createTime": "2023-04-23 16:13:13",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": "用户性别列表",
                    "dictId": 1,
                    "dictName": "用户性别",
                    "dictType": "sys_user_sex",
                    "status": "0"
                }
            }
        }
    },


]

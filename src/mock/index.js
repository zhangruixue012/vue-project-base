import Mock from "mockjs";
import router from './mockData/router';
import deptTree from './mockData/deptTree.json'

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
]

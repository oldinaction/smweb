/*
 // webpack函数：require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行参数指定的回调函数
 // 参数如下：
 // (1) dependencies: 依赖的模块数组
 // (2) callback: 回调函数，该函数调用时会传一个require参数
 // (3) chunkName: 模块名，用于构建时生成文件时命名使用
 const home = function(r) {
     return require.ensure(
         [],
         function () {
             r(require('../pages/home/home.vue'))
         },
         'home')
 }
 */

const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home') // 必须加.vue后缀，否则报错
const children = r => require.ensure([], () => r(require('../pages/home/children.vue')), 'children')
const user = r => require.ensure([], () => r(require('../pages/user/user.vue')), 'user')


export default [{
    path: '',
    redirect: '/home'
},{
    path: '/home',
    component: home,
    children: [
        {
            // 以 / 开头的嵌套路径会被当作根路径
            path: 'children',
            component: children,
        },
    ]
},{
    path: '/user',
    component: user,
}]

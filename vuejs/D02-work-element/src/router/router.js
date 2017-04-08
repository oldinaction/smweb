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

export default [{
    path: '/',
    component: home, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        // 首页
        {
            path: '/home',
            component: home
        },
    ]
}]

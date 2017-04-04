import App from '../App.vue' // 写成 import App from '../App' 报错
/*
 * webpack函数：require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行参数指定的回调函数
 * 参数如下：
 *  dependencies: 依赖的模块数组
 *  callback: 回调函数，该函数调用时会传一个require参数
 *  chunkName: 模块名，用于构建时生成文件时命名使用
 */
const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home') // 必须加.vue后缀，否则报错
/*
const profile = r => require.ensure([], () => r(require('../pages/profile/profile.vue')), 'profile')
const info = r => require.ensure([], () => r(require('../pages/profile/children/info.vue')), 'info')
const address = r => require.ensure([], () => r(require('../pages/profile/children/children/address.vue')), 'address')
const add = r => require.ensure([], () => r(require('../pages/profile/children/children/children/add.vue')), 'add')
const addDetail = r => require.ensure([], () => r(require('../pages/profile/children/children/children/children/addDetail.vue')), 'addDetail')
const setusername = r => require.ensure([], () => r(require('../pages/profile/children/setusername.vue')), 'setusername')
*/

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        /*
        //个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //个人信息详情页
                component: info,
                children: [{
                    path: 'address',
                    component: address,     //编辑地址
                    children:[{
                        path:'add',
                        component:add,
                        children:[{
                            path:'addDetail',
                            component:addDetail
                        }]
                    }]
                }]
            },
            {
                path: 'setusername',
                component: setusername,
            },]
        },
        */
    ]
}]

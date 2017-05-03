// 先解析依赖，即先逐个解析import(如 App.vue)，再从第一行解析main.js
import Vue from 'vue' // 写成 import Vue from 'vue/dist/vue.js' 会报错
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './router/router' // 导入./router/router.js
import store from './store/' // 默认导入store文件夹下的index.js

Vue.use(ElementUI)

Vue.use(VueRouter)
const router = new VueRouter({
	routes //（缩写）相当于 routes: routes
})

new Vue({
	router,
	store,
    // *** 必须指明template或者执行渲染函数 ***
    // 如果没有template则当main.js被webpack插入到index.html中时默认以挂载点('#app')的dom为模板进行渲染
    // 而index.html中'#app'的dom节点没有<router-view></router-view>的路由出口，经路由访问，加载的component将无法加入到index.html中
    // 故此处使用渲染函数，加载App中的模板
	render: h => h(App)
}).$mount('#app')

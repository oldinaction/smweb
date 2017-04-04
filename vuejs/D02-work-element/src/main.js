import Vue from 'vue/dist/vue.js' // 写成 import Vue from 'vue' 会报警告
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/' // 默认导入store文件夹下的index.js

Vue.use(ElementUI)

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
})

new Vue({
	router,
	store,
}).$mount('#app')

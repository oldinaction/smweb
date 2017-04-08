import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.name }}</h2>
      <router-view></router-view>
    </div>
  `
}

const router = new VueRouter({
  routes: [{
      path: '/page/:name',
      component: App,
      children: [{
          // 当 /user/:name/user 匹配成功，
          // User 会被渲染在 App 的 <router-view> 中
          path: 'user',
          component: User
        },]
    }]
})

const app = new Vue({
  'el': '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

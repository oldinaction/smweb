import Vue from 'vue'
import App from './App.vue'

new Vue({
    // 绑定的index.html中id="app"的那个div.
    el: '#app',
    // 将App.vue中模板(template)的dom替换绑定的元素
    // 注意：此处是替换，即index.html中<div id="app">...</app>都将被换掉, 包括外面的对div标签
    render: h => h(App)
})

/* 也可写成
var vm = new Vue({
    template: '<App/>',
    components: {
        App
    }
}).$mount('#app');
*/

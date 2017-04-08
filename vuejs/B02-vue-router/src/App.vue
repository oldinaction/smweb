<template>
      <div>
          <h1>Hello App!</h1>
          <p>
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/page/home">Go to App</router-link>
            <router-link to="/page/home/user">Go to User</router-link>
          </p>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
      </div>
</template>

<script>
export default {

}
</script>

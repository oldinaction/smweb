<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld/>
  <hr>

  <button @click="show = remoteHello">显示remoteHello</button>
  <button @click="show = remoteButton">显示remoteButton</button>
  <div>{{show}}</div>

  <!-- http://localhost:3000/index.html -->
  <RemoteComponent :componentInfo="show" @on-click="onClick"/>

  <!-- (存在问题) 基于 system.js 加载 http://localhost:3000/index-systemjs.html -->
<!--  <RemoteComponent2 :componentInfo="show" @on-click="onClick"/>-->
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import RemoteComponent from '../components/RemoteComponent.vue';
import RemoteComponent2 from '../components/RemoteComponent2.vue';
import {ref} from "vue";

export default {
  name: 'App',
  components: {
    HelloWorld,
    RemoteComponent,
    RemoteComponent2,
  },
  setup() {
    const remoteHello = {
      jsUrl: 'http://localhost:3000/lib/RemoteLib.umd.js?v=1',
      cssUrl: 'http://localhost:3000/lib/RemoteLib.css',
      libName: 'RemoteLib',
      componentName: 'RemoteHello'
    }

    const remoteButton = {
      jsUrl: 'http://localhost:3000/lib/RemoteLib.umd.js',
      cssUrl: 'http://localhost:3000/lib/RemoteLib.css',
      libName: 'RemoteLib',
      componentName: 'RemoteButton'
    }

    const onClick = (data) => {
      console.log('点击RemoteButton:', data);
    }

    const show = ref(remoteButton)

    return {
      show,
      remoteHello,
      remoteButton,
      onClick
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

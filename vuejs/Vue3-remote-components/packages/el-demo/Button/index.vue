<template>
  <div>
    <el-button class="remote-button" @click="onClick">我是远程ElButton组件</el-button>
  </div>
</template>

<script>
export default {
  name: 'RemoteButton',
  methods: {
    onClick() {
      alert('点击了远程ElButton')
      this.$emit('on-click', { date: new Date() })
    }
  }
}
</script>

<style>
.remote-button{
  color: red;
}
</style>>
<template>
  <div>
    <button class="remote-button" @click="onClick">我是远程Button组件</button>
  </div>
</template>

<script>
export default {
  name: 'RemoteButton',
  methods: {
    onClick() {
      alert('点击了远程Button')
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

<template>
    <div id="app">
    <router-view v-if="isRouterAlive"/>

    </div>
</template>
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
* {
  list-style: none
}
</style>

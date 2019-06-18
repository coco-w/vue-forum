<template>

  <div>
    <h1>您访问的页面不存在或者是没有权限</h1>
    <h2>{{time}}s后为你跳转到首页</h2>
    <h3 @click="handleClick">点击这里直接跳转首页</h3>
  </div>
</template>
<script>
export default {
  name : '404',
  data() {
    return {
      time: 5
    }
  },
  watch: {
    time() {
      if (this.time < 1) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/')
    }
  },
  mounted() {
    window.setInterval(() => {
      this.time --
    },1000)
  }
}
</script>

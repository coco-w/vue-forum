<template>
<div>
  <header-nav></header-nav>
  <discussion></discussion>
</div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from '@/components/HeaderNav.vue'
import Discussion from '@/components/Discussion.vue'
export default {
  name: 'home',
  components: {
    HeaderNav,
    Discussion
  },
}
</script>
<style lang="less">

</style>


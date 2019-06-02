<template>
  <Menu
    :active-name="active"
    width='200'
  >
    <MenuGroup :title='name' >
      <MenuItem :to='`/userSpace/${this.$route.params.id}/userinfo`' name="userinfo">
      <Icon type="md-document" />
      <span >个人信息</span>
      </MenuItem>
      <MenuItem :to='`/userSpace/${this.$route.params.id}/history`'  name="history">
      <Icon type="md-chatbubbles"/>
      <span >历史纪录</span>
      </MenuItem>
    </MenuGroup>
  </Menu>
</template>
<script>

import { parsingToken } from '@/lib/util'
export default {
  name: 'side-menu',
  inject: ['reload'],
  props: {
    nickname: {
      type: String
    }
  },
  computed: {
    name() {
      return `个人空间`
    },
    active() {
      return this.$route.name
    }
  }
}
</script>

<style lang="less">
.ivu-layout-sider>.ivu-layout-sider-children > .ivu-menu {
  height: 100%;
}
</style>

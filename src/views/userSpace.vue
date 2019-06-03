<template>
  <div class="layout-wrapper">
    <header-nav :isUpdate='isUpdate' ref='headerNav'></header-nav>
    <Layout class="layout-outer">
      <Sider
        collapsible
        hide-trigger
        breakpoint="sm"
        v-model="collapsed"
      >
      <Menu></Menu>
      </Sider>
      <router-view ref="children"></router-view>
    </Layout>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import HeaderNav from '@/components/HeaderNav.vue'
import Menu from '@/components/Menu.vue'

export default {
  data () {
    return {
      theme3: 'light',
      collapsed: false,

    }
  },
  components: {
    HeaderNav,
    Menu,
  },
  computed: {
    ...mapState({
      isUpdate: state => state.user.isUpdate
    })
  },
  // watch: {
  //   isUpdate() {

  //   }
  // },
  methods: {
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
  },

}
</script>

<style lang="less">

.layout-wrapper,
.layout-outer {
  height: 100%;
}
.layout-wrapper {
  .wrapper-header {
    position: relative;
  }.ivu-layout-sider-children > .ivu-menu {
  overflow: hidden;
  .menu-box {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    margin-right: -20px;
  }
}
.header-wrapper {
  background: #fff;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0 23px;
  .trigger-icon {
    cursor: pointer;
    transition: transiform 0.3s ease;
    &.rotate {
      transform: rotateZ(-90deg);
      transition: transform 0.3s ease;
    }
  }
}
.ivu-tabs-bar {
  margin-bottom: 0;
}
.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  position: relative;
  padding: 5px 30px 4px 16px;
  .ivu-icon {
    position: absolute;
    right: 0px;
    top: 10px;
  }
}
.content-con {
  padding: 10px;
}
.card-page {
  height: ~"calc(100vh - 84px)";
}
}

</style>

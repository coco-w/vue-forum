<template>
  <div class="layout-wrapper">
    <header-nav :isUpdate='isUpdate' ref='headerNav'></header-nav>
    <Layout class="layout-outer">

      <Sider
        collapsible
        hide-trigger
        breakpoint="sm"
        :collapsed-width="78"
        v-model="collapsed"
        :style='height'
      >

      <Menu></Menu>
      </Sider>
       <Layout>
         <Icon type="ios-list" class="list" @click='handleCollapsed'/>
        <router-view ref="children"></router-view>
       </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import HeaderNav from '@/components/HeaderNav.vue'
import Menu from '@/components/Menu.vue'
import { clearTimeout, setTimeout } from 'timers';

export default {
  data () {
    return {
      theme3: 'light',
      collapsed: false,
      height: ''
    }
  },
  components: {
    HeaderNav,
    Menu,
  },
  computed: {
    ...mapState({
      isUpdate: state => state.user.isUpdate
    }),

  },
  // watch: {
  //   isUpdate() {

  //   }
  // },
  methods: {
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
    changeHeight () {

    }
  },
  mounted() {
    this.height = {minHeight: `${window.innerHeight-65}px`}
    window.onresize = () => {
      if (timer) {
        clearTimeout(timer)
      }
      let timer = setTimeout(() => {
        this.height = {minHeight: `${window.innerHeight-65}px`}
        console.log('dasd')
        timer = undefined
      },500)
    }
  }

}
</script>

<style lang="less">
.layout-wrapper {
  height: 100%;
  .list{
    position: absolute;
    font-size: 40px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media screen and (min-width: 576px) {
    .list {
      display: none;
    }
  }
  .wrapper-header {
    position: relative;
  }
  .ivu-layout-sider-children > .ivu-menu {
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

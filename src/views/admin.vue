<template>
  <div>
    <header-nav></header-nav>
    <div class="main">
      <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu  theme="dark" width="auto" :active-name='activeName' @on-select='handleSelect'>
              <MenuItem v-for="item in routes" :key="item.name" :name='item.name'>{{item.title}}</MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Tabs type="card" :value='activeTab' closable @on-click='handleTabClick' @on-tab-remove="handleTabRemove">
                  <TabPane
                  v-for="item in activeRoute"
                  :key='item.name'
                  :label="item.title"
                  :name='item.name'
                  >
                  </TabPane>
                </Tabs>
                <Card style="height: 500px">
                    <router-view></router-view>
                </Card>
            </Content>
        </Layout>
    </div>
    </div>
  </div>

</template>
<script>
import HeaderNav from '_c/HeaderNav.vue'
import router_list from '@/router/router.js'
export default {
  name: 'admin',
  components: {
    HeaderNav
  },
  data() {
    return {
      router_list,
      routes: {},
      activeRoute: {},
      activeName: '',
      activeTab: '',

    }
  },
  methods: {
    handleTabRemove(name) {
      let obj = {}
      for (const key in this.activeRoute) {
        if (this.activeRoute.hasOwnProperty(key)) {
          if (key !== name) {
            const ele = this.activeRoute[key]
            obj[key] = ele
          }
        }
      }
      let keys = Object.keys(this.activeRoute)
      if (name === this.activeTab && keys.length > 1) {
        let index = keys.indexOf(name)
        if (index === keys.length-1) {
          this.activeName = keys[index-1]
          this.activeTab = keys[index-1]
        } else {
          this.activeName = keys[index+1]
          this.activeTab = keys[index+1]
        }
      }
      this.activeRoute = obj
      if (JSON.stringify(this.activeRoute) === '{}') {
        this.$router.push('/admin')
        this.activeName = 'admin'
        this.activeTab = 'admin'
      }
    },
    handleSelect(name) {
      this.seach(name)
      this.activeTab = name
      this.activeName = name
    },
    seach(name) {
      if (!this.activeRoute[name]) {
        this.activeRoute[name] = this.routes[name]
      }
    },
    handleTabClick(name) {
      this.activeName = name
      this.activeTab = name
    },
  },
  watch: {
    activeTab () {
      if (this.activeTab !== 'admin'){
        this.$router.push(this.routes[this.activeTab])
      }
    }
  },
  mounted() {
    let obj = this.router_list[6].children
    for (let i = 0; i < obj.length; i++) {
      this.routes[obj[i].name] = {
        name: obj[i].name,
        title: obj[i].meta.title,
        path: obj[i].path
      }
    }
    this.activeName = this.$route.name
    if (this.$route.name !== 'admin') {
      this.activeTab = this.$route.name
      this.seach(this.$route.name)
    }

  },
}
</script><style lang="less" scoped>
.main {
  margin-top: 65px;
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
  };

}
</style>

<template>
  <div class="wrapper-header">
    <div class="wrapper-header-nav">
      <div class="logo" @click="handleGOHome">
        <img src="/public/login_logo.png" alt="">
        <span>DOTA</span>
      </div>
      <div class="apps">
        <template>
        <Dropdown>
          <a href="javascript:void(0)">
              <img src="/public/LOGO (23).png" alt="">
              <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem disabled>豆汁儿</DropdownItem>
              <DropdownItem>冰糖葫芦</DropdownItem>
              <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </template>
      </div>
      <div class="login">
        <div v-if="!isLogin" class="userInfo1">
          <Dropdown>
            <a href="javascript:void(0)">
                <img src="/public/avatar-default.png" alt="">
            </a>
            <DropdownMenu slot="list">
                <DropdownItem  ><div @click="handleLogin">登陆</div></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div v-else class="userInfo1">
          <Dropdown>
            <a href="javascript:void(0)">
                <img :src='pic' alt="">
                {{nickname}}
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><a @click="handlePosting">发帖</a></DropdownItem>
              <DropdownItem><a @click="handleUserSpace">个人空间</a></DropdownItem>
              <DropdownItem v-if="state === 1 || state === 2"><a @click="handleAdmin">管理中心</a></DropdownItem>
              <DropdownItem><a @click="handleOutlog">登出</a></DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'navbar',
  data() {
    return {
      nickname: '',
      pic: '',
      id: '',
      state: 0,
    }
  },
  props: {
    isUpdate : {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    }),
  },
  watch: {
    isUpdate() {
      this.update()
    }
  },
  methods: {
    ...mapActions([
      'authorization',
      'outLog',
    ]),
    handleLogin () {
      this.$router.push('/login')
    },
    handleOutlog() {
      this.outLog()
    },
    handleUserSpace() {
      this.$router.push(`/userSpace/${this.id}/userinfo`)
    },
    handleGOHome() {
      this.$router.push('/')
    },
    handleAdmin() {
      this.$router.push(`/admin`)
    },
    update () {
      this.authorization().then(res => {
        this.pic = res.pic
        this.nickname = res.nickname
        this.id = res.id
        this.state = res.state
      })
    },
    handlePosting() {
      this.$router.push('/new')
    }
  },
  mounted() {
    this.update()
  }

}
</script>

<style lang="less" >
.wrapper-header {
    position: fixed;
    background: #fff;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 1000;
    text-align: center;
  .wrapper-header-nav {
    width: 95%;
    height: 65px;
    margin: 0 auto;
    position: relative;
    box-shadow:0 1px 1px rgba(0,0,0,.08);
    .logo {
      width: 150px;
      height: 50px;
      padding-top: 10px;
      position: absolute;
      cursor: pointer;
      left: 0;
      img {
        width: 40px;
        display: inline-block;
        position: absolute;
        left: 30px;
      }
      span{
        position: absolute;
        right: 0;
        font-size: 25px;
        line-height: 40px;
      }
    }
    .apps {
      width: 100px;
      height: 50px;
      display: inline-block;
      position: absolute;
      left: 180px;
      top: 15px;
      @media screen and (max-width: 576px) {
        display: none;
      }
      img {
        width: 30px;
        margin-right: 10px;
        line-height: 40px;
      }
      i {
        font-size: 20px;
        position: absolute;
        top: 6px;
      }
    }
    .apps:after {
      content: "";
      display: block;
      width: 2px;
      height: 24px;
      background: #ebedee;
      position: absolute;
      top: 4px;
      left: 0;
    }
    .login {
      position: absolute;
      right: 0px;

      .userInfo1 {
        padding: 10px;
        img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 15px;
      }
      }
    }
  }
}
</style>

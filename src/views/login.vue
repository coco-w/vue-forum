<template>
  <div class="wrapper">
    <div class="logo">
      <a href="#"><img src="@/assets/img/login_logo.png" alt=""></a>
    </div>
    <div class="title">
      请登录您的账号
    </div>
    <div class="form">
      <Form ref="formInline" :model='userinfo' :rules='ruleInline'>
        <form-item prop="username">
            <i-input type="text" v-model="userinfo.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </form-item>
        <form-item prop="password">
            <i-input type="password" v-model="userinfo.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </form-item>
        <form-item >
            <Button type="primary" @click="handleLogin">登录</Button>
        </form-item>
      </Form>
    </div>
    <div class="register">
      <p>没有账号?点击这里<a @click="handleRegister">注册</a>/ <a>忘记密码</a> </p>
    </div>
  </div>
</template>

<script>
import { mapActions,mapMutations,mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userinfo: {
        username: '',
        password: '',
      },
      ruleInline: {
          username: [
              { required: true, message: '用户名为空', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '密码为空', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码最少是6位', trigger: 'blur' }
          ]
      }
    }
  },
  computed: {
    ...mapState({
      webside: state => state.user.beforeLoginWebside
    })
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    ...mapMutations([
      'SET_ID',
      'SET_WEBSIDE',
    ]),
    handleRegister() {
      this.$router.push('/register')
    },
    handleLogin() {
      let {username, password} = this.userinfo
      this.login({username, password}).then(res => {
        if (res.err_code) {
          this.$Message.warning(res.message)
          return
        }
        this.$router.push(this.webside)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.SET_WEBSIDE(from.path)
    })
  }
}
</script>
<style lang="less">
body{
  widows: 100%;
  height: 100%;
  background: #f9f9f9;
  .wrapper {
    width: 300px;
    height: 600px;
    // background: red;
    padding-top: 40px;
    margin: 0 auto;
    .logo {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title{
      margin-top: 20px;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
    }
    .form {
      margin-top: 30px;
      width: 100%;
      padding: 40px 20px 10px 20px;
      background: #fff;
      border: 1px solid #d8dee2;
      border-radius: 5px;
      .ivu-btn.ivu-btn-primary {
        width: 100%
      }
    }
    .register {
      margin-top: 10px;
      border: 1px solid #d8dee2;
      border-radius: 5px;
      padding: 15px 20px;
      text-align: center;
      p {
        font-size: 15px;
      }
    }
  }
}
</style>

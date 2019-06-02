<template>
  <div class="wrapper">
    <div class="logo">
      <a href="#"><img src="@/assets/img/login_logo.png" alt=""></a>
    </div>
    <div class="title">
      注册
    </div>
    <div class="form">
      <Form ref="formInline" :model='userinfo' :rules='ruleInline'>
        <form-item prop="email">
            <i-input type="text" v-model="userinfo.email" placeholder="email">
                <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </i-input>
        </form-item>
        <form-item prop="nickname">
            <i-input type="text" v-model="userinfo.nickname" placeholder="nickname">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </form-item>
        <form-item prop="password">
            <i-input type="password" v-model="userinfo.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </form-item>
        <form-item>
            <Button type="primary" @click='handleRegister' >注册</Button>
        </form-item>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { constants } from 'fs';

export default {
  name: 'login',
  data () {
    return {
      userinfo: {
        nickname: '',
        password: '',
        email: '',
        spinShow: false,
      },
      ruleInline: {
        email: [
          { required: true, message: '邮箱为空', trigger: 'blur' }
        ],
        nickname: [
            { required: true, message: '用户名为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码最少是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'registe'
    ]),
    ...mapMutations([
      'SET_ID'
    ]),
    handleRegister () {
      let { email, nickname, password } = this.userinfo
      this.registe({ email, nickname, password }).then(data => {
        if (data.code === 200) {
          this.$Message.success('恭喜你扎畜生注册成功，正在跳转登录页')

          this.$router.push('login')

          this.SET_ID('')

        }
      })
    }
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

<template>
<div>
  <h1>个人信息</h1>
  <hr>
    <Row>
      <i-col :md="{ span: 6, push: 16 }" :xs='24' >
        <div class="avatar">
          <img ref="pic" :src='userInfo.pic' alt="">
          <Upload multiple action="/api/upload" :data='{id: userInfo._id}' :on-progress='onProgress' :on-success='onSuccess'>
              <Button v-if="isMe" icon="ios-cloud-upload-outline">换个头像</Button>
          </Upload>
        </div>
      </i-col>
      <i-col :md='{ span: 15, pull:6 }' :xs='24'>
      <Form :model="model"  :label-width="100">
        <FormItem label="昵称" prop='nickname'>
            <i-input v-if="isMe" v-model="value.nickname"></i-input>
            <span v-else>{{ value.nickname }}</span>
        </FormItem>
        <FormItem label="邮箱" prop='email'>
            <i-input v-if="isMe" v-model="value.email"></i-input>
            <span v-else>{{value.email}}</span>
        </FormItem>
        <FormItem label="性别" prop='gender'>
          <RadioGroup v-if="isMe" v-model="value.gender">
                <Radio label=0>男</Radio>
                <Radio label=1>女</Radio>
                <Radio label=-1>保密</Radio>
          </RadioGroup>
          <span v-else>{{gender}}</span>
        </FormItem>
        <FormItem label="个性签名" prop='bio'>
            <i-input v-if="isMe" v-model="value.bio"></i-input>
            <span v-else>{{value.bio}}</span>
        </FormItem>
        <FormItem label="创建时间" prop='created_time'>
            <span><Time :time='new Date(value.created_time)' type='datetime'></Time></span>
        </FormItem>
        <FormItem>
            <Button v-if="isMe" @click="handleSubmit" type="primary">保存</Button>
        </FormItem>
    </Form>
      </i-col>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import clonedeep from 'clonedeep'
export default {
  name:'UesrSpaceContent',
  data() {
    return {
      formatDate,
      spinShow: false,
      model: {},
      value: {},
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {{}}
    },
    isMe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    gender() {
      return this.userInfo.gender === '-1' ? '保密' : this.userInfo.gender === '0' ? '男' : '女'
    }
  },
  watch: {
    userInfo() {
      this.formInit()
    }
  },
  methods: {
    ...mapActions([
      'modifyUserInfo'
    ]),
     formInit() {
      let model = {}
      let value = {}
      for (const key in this.userInfo) {
        if (this.userInfo.hasOwnProperty(key)) {
          const element = this.userInfo[key];
          model[key] = element
          value[key] = element
        }
      }
      this.value = value
      this.model = model
    },
    handleSubmit () {
      this.spinShow = true
      for (const key in this.value) {
        if (this.value.hasOwnProperty(key)) {
          const element = this.value[key];
          this.model[key] = element
        }
      }
      this.modifyUserInfo(this.model).then(res => {
        this.spinShow = false
        if (res.code === 400) {
          this.$Message.success('修改成功')
          this.$emit('update', this.model)
        }
        else {
          this.$Message.error('失败')
        }
      })
    },
    onProgress () {
      this.spinShow = true
    },
    onSuccess (res) {
      this.spinShow = false
      this.$refs.pic.src = res.pic
      this.value.pic = res.pic
      this.handleSubmit()
    }
  },
  mounted () {
    this.formInit()
  }
}

</script>
<style lang="less">
@margin:20px;
h1 {
  margin-left: @margin
}
hr {
  margin: @margin;
  margin-top: 10px;
}
.form {
  button{
    width: 100px;
  }
}
.avatar{
  text-align: center;
  img {
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
  }
  button {
    display: block;
    margin: auto;
  }
}

</style>



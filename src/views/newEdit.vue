<template>
  <div class="newEdit">
    <header-nav ref="headernav"></header-nav>
    <Row>
        <i-col span="18" push="3">
          <p class="title">标题</p>
          <i-input v-model="title" style="width: 300px" ></i-input>
          <p class="title">内容</p>
          <div class="edit_container">
            <Editor v-model='content'></Editor>
          </div>
          <Row>
            <i-col span="2" push="20">
            <Button type="primary" @click="handleSubmit">提交</Button>
            </i-col>
          </Row>
          <p class="title">
            预览
          </p>
          <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="content">
            </div>
        </div>
      </i-col>
    </Row>

  </div>
</template>

<script>

import Editor from '@/components/Editor.vue'
import HeaderNav from '@/components/HeaderNav.vue'

import { mapActions } from 'vuex'

export default {
    components: {
      HeaderNav,
      Editor
    },
    data() {
        return {
            content: ``,
            title: '',
        }
    },
    methods: {
      ...mapActions([
        'newEdit'
      ]),
      handleSubmit () {
        if (this.title.length === 0) {
          this.$Message.warning('标题不可以是空的')
          return
        }
        if (this.title.length > 20) {
          this.$Message.warning('标题不可以这么长，20个字以内')
          return
        }
        let params = {
          title: this.title,
          content: this.content,
          author_id: this.$refs.headernav.id,
        }
        this.newEdit(params).then(res => {
          if (res.code === '400') {
            this.$Message.success(res.message);
            this.title = ''
            this.content = ''
          }
          if (res.err_code) {
            this.$Message.warning('服务器错误稍后再试')
          }
        })
      },

    }
}
</script>
<style lang="less">
.newEdit {
  .ivu-row {
  margin-top: 65px;
  .title {
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 10px;
  }
  .ivu-input-wrapper {
    margin-bottom: 10px
  }
  .ivu-row {
    margin-top: 10px;
  }
}
.preview {
    line-height: 54px;
    font-size: 18px;
    font-weight: 700;
}
}
</style>

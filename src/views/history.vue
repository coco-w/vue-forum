<template>
  <div class="comments">
      <div class="item" v-for="(item) in this.comments" :key="item._id">
      <Row>
        <i-col span='20'>
          <span>帖子：  </span>
          <a @click="hanldeTopic(item.topic_id)">{{item.title}}</a>
        </i-col>
        <i-col span='4'>
          <span><Time :time="item.create_time" type="datetime" /></span>
        </i-col>
      </Row>

        <div class="ql-editor" v-html="item.content">
      </div>

      <div v-if='isMe' class="btn">
        <Button type="warning" @click="handEdit(item.content,item._id)">编辑</Button>
        <Button type="error"  @click="handdeleteComment(item._id)">删除</Button>
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Page :total="page" :current='num' @on-change='handlePageChange'/>
    <Modal
        v-model="modal"
        title="编辑"
        @on-ok = 'handleSubmit'
    >
    <editor :content="content" @input='handleInput'/>
    </Modal>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import Editor from '@/components/Editor.vue'
import { truncate } from 'fs';
export default {
  name: 'commentsHistory',
  inject: ['reload'],
  components: {
    Editor
  },
  data() {
    return {
      comments: [],
      spinShow: false,
      num: 1,
      page: 0,
      content: '',
      modal: false,
      editor_id : 0,
    }
  },
  computed: {
    ...mapState({
    	user_id: state => state.user.id
    }),
    isMe() {
      return this.user_id === this.$route.params.id
    }
  },
  methods: {
    ...mapActions([
      'getCommentsHistory',
      'deleteComment',
      'changeComment'
    ]),
    hanldeTopic(id) {
      this.$router.push(`/topic/${id}/1`)
    },
    handlePageChange(index) {
      this.$router.push(`/userSpace/${this.$route.params.id}/history/${index}`)
      this.num = index
      this.reload()
    },
    handdeleteComment(id) {
       this.$Modal.confirm({
          title: '删除评论',
          content: '<p>真的要删除吗？？？</p>',
          onOk: () => {
            this.deleteComment(id).then((res) => {
              if (res.code === 200){
                this.reload()
              }
            })
          }
      })
    },
    handleInput(val) {
      this.content = val
    },
    handEdit(content, id) {
      console.log(content)
      this.content = content
      this.editor_id =  id
      this.modal = true
    },
    handleSubmit() {
      let id = this.editor_id
      let content = this.content
      this.changeComment({id, content}).then(res => {
        if (res.code === 200) {
          this.reload()
        }
      })
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.spinShow = true
    this.num = Number(this.$route.params.page)
    let num = this.num
    this.getCommentsHistory({id, num}).then(res => {
      if (res.err_code) {
        this.$Message.error('服务器错误，稍后再试')
      }
      this.comments = res.doc.comments
      this.page = res.doc.len
      this.spinShow = false
    })
  }
}
</script>

<style lang="less">
  .comments{
    width: 100%;
    height: 100%;
    padding: 10px;

    .item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      padding: 10px;
    }
    .btn {
      margin-top: 5px;
      padding: 5px;
      button{
        margin-right: 5px;
      }
    }
  }
  img {
      width: 200px;
    }
</style>


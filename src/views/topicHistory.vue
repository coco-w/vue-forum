<template>
  <div class="topics">
    <div v-for="item in topics" :key="item.topic_id" class="item">
      <div><span><Time :time="item.create_time" type="datetime" />发表了 <a>{{item.title}} </a> </span></div>
      <div v-if="isMe" class="btn">
        <Button type="warning" @click="handleChange(item.title, item.topic_id)">编辑</Button>
        <Button type="error" @click="handleDeleteTopic(item.topic_id)">删除</Button>
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Page :total="len" :current='page' @on-change='handlePageChange'></Page>
    <Modal
        v-model="modal"
        title="编辑"
        @on-ok ='handleSubmit'
    >
    <i-input v-model="title"></i-input>
    </Modal>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
export default {
  name: 'topicHistory',
  inject: ['reload'],
  data() {
    return {
      topics: [],
      spinShow: false,
      len: 1,
      page: 1,
      title: '',
      topic_id: 0,
      modal: false,
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
      'getTopic',
      'deleteTopic',
      'changeTopicTitle',
    ]),
    handlePageChange(index) {
      this.$router.push(`/userSpace/${this.$route.params.id}/topic/${index}`)
      this.page = index
      this.reload()
    },
    handleDeleteTopic(id) {
      this.$Modal.confirm({
          title: '删除帖子',
          content: '<p>真的要删除吗？？？</p>',
          onOk: () => {
            this.deleteTopic(id).then((res) => {
              if (res.code === 200){
                this.reload()
              }
            })
          }
      })
    },
    handleChange(title, id) {
      this.modal = true
      this.title = title
      this.topic_id = id
    },
    handleSubmit() {
      let len = this.title.length
      if (len === 0) {
        this.$Message.warning('标题不可以为空')

      }else if (len > 20) {
        this.$Message.warning('不可以大于20个字')
      } else {
        let title = this.title
        let id = this.topic_id
        this.changeTopicTitle({id, title}).then(res => {
          if (res.code === 200) {
            this.reload()
          }
        })
      }
    }
  },
  mounted() {
    this.spinShow = true
    this.page = Number(this.$route.params.page)
    const id = this.$route.params.id
    const page = this.page
    this.getTopic({id, page}).then(res => {
      this.topics = res.data.arr
      this.len = res.data.len
      this.spinShow = false
    })
  }
}
</script>
<style lang="less" scoped>
.topics{
    width: 100%;
    height: 100%;
    padding: 10px;
    .item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      padding: 10px;
    }
    .btn {
      button{
        margin-top: 5px;
        margin-right: 5px;
      }

    }
  }
</style>


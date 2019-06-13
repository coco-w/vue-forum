<template>
  <div class="comments">
      <div class="item" v-for="item in this.comments" :key="item._id">
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
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Page :total="page" :current='num' @on-change='handlePageChange'/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'commentsHistory',
  inject: ['reload'],
  data() {
    return {
      comments: [],
      spinShow: false,
      num: 1,
      page: 0,
    }
  },
  methods: {
    ...mapActions([
      'getCommentsHistory'
    ]),
    hanldeTopic(id) {
      this.$router.push(`/topic/${id}/1`)
    },
    handlePageChange(index) {
      this.$router.push(`/userSpace/${this.$route.params.id}/history/${index}`)
      this.num = index
      this.reload()
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
    margin: 10px 20px;
    .item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      padding: 10px;
    }
  }
  img {
      width: 200px;
    }
</style>


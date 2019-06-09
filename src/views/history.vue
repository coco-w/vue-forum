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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'commentsHistory',
  data() {
    return {
      comments: []
    }
  },
  methods: {
    ...mapActions([
      'getCommentsHistory'
    ]),
    hanldeTopic(id) {
      this.$router.push(`/topic/${id}/1`)
    },
  },
  mounted() {
    let id = this.$route.params.id
    console.log('res.err_code')
    this.getCommentsHistory(id).then(res => {
      console.log(res.err_code)
      if (res.err_code) {
        this.$Message.error('服务器错误，稍后再试')
      }
      this.comments = res.doc.comments
      console.log('histroy')

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


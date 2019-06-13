<template>
  <div class="topics">
    <div v-for="item in topics" :key="item.topic_id" class="item">
      <span><Time :time="item.create_time" type="datetime" />发表了 <a>{{item.title}} </a> </span>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Page :total="len" :current='page' @on-change='handlePageChange'></Page>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'topicHistory',
  inject: ['reload'],
  data() {
    return {
      topics: [],
      spinShow: false,
      len: 1,
      page: 1,
    }
  },
  methods: {
    ...mapActions([
      'getTopic'
    ]),
    handlePageChange(index) {
      this.$router.push(`/userSpace/${this.$route.params.id}/topic/${index}`)
      this.page = index
      this.reload()
    }
  },
  mounted() {
    this.spinShow = true
    this.page = this.$route.params.page
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
    margin: 10px 20px;
    .item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      padding: 10px;
    }
  }
</style>


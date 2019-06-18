<template>
  <div class="discussion">
    <Card>
    <div slot="title">新手交流</div>
    <div>
      <Row  v-for="item in topic" :key='item.id'>
        <i-col :md='{span:1}' :xs='{span:3}'><img :src="item.pic" alt=""></i-col>
        <i-col :md='{span:4}' :xs='{span:21}'><a @click="hanldeTopic(item._id)">{{item.title}}</a></i-col>
        <i-col :md='{span:4 ,push:12}' :xs='{span:0}'><a @click="hanldeUserSpace(item.author_id)">{{item.author}}</a>  </i-col>
        <i-col :md='{span:4, push: 11}' :xs='{span:0}'><span><Time :time="item.create_time" type="datetime"/></span></i-col>
      </Row>
    </div>
  </Card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'discussion',
  data() {
    return {
      topic: [],
    }
  },
  methods: {
    ...mapActions([
      'getTopic'
    ]),
    hanldeTopic(id) {
      this.$router.push(`/topic/${id}/1`)
    },
    hanldeUserSpace(id) {
      this.$router.push(`/userSpace/${id}/userinfo`)
    }
  },
  mounted() {
    this.getTopic().then(doc => {
      this.topic = doc.doc
    })
  }
}
</script>
<style lang="less">

.discussion {
  .ivu-card {
  width: 95%;
  margin: 0 auto;
  /* position: absolute; */
  height: 100%;
  margin-top: 100px;
      img {
        width: 30px;
        margin-right: 10px;
      }
      .title {
        float: left;
      }
      .author {
        float: right;
      }
      .time{
        float: right;
        margin-left: 20px;
      }
}
}
</style>

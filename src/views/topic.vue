<template>
  <div>
    <header-nav ref="user"></header-nav>
    <div class='container'>

        <Anchor :offset-top=100>
        <AnchorLink
          href="#comment"
          title="发表评论"
        >
        </AnchorLink>
      </Anchor>

      <Row v-if="this.$route.params.page === '1'">
        <i-col
          span='18'
          class="content"
          push='3'
        >
          <i-col
            class="col4"
            span='5'
          >
            <div class="pic">
              <img
                :src="doc.pic"
                alt=""
              >
            </div>
            <div class="name">
              <p>{{doc.author}}</p>
            </div>
          </i-col>
          <i-col
            class="col14"
            span='19'
          >
            <div
              class="ql-editor"
              v-html="doc.content"
            >
            </div>
          </i-col>
        </i-col>
      </Row>
      <Row
        class="comments"
        v-for="item in comments"
        :key="item._id"
      >
        <i-col
          span='18'
          class="content"
          push='3'
        >
          <i-col
            class="col4"
            span='5'
          >
            <div class="pic">
              <img
                :src="item.pic"
                alt=""
              >
            </div>
            <div class="name">
              <p>{{item.author}}</p>
            </div>
          </i-col>
          <i-col
            class="col14"
            span='19'
          >
            <div
              class="ql-editor"
              v-html="item.content"
            >
            </div>
          </i-col>
        </i-col>
      </Row>
      <Row class="page">
        <i-col
          span='18'
          push='3'
        >
          <Page
            :total="comments_length"
            :current='page'
            @on-change='handlePageChange'
            show-total
          />
        </i-col>
      </Row>

      <Row
        class="comment"
        id="comment"
      >
        <i-col
          span='18'
          push='3'
        >
          <div class="edit_container">
            <Editor v-model="comment"></Editor>
          </div>
        </i-col>
      </Row>

      <Row class="submit">
        <i-col
          span="18"
          push="3"
        >
          <Button
            type="primary"
            @click="handleSubmit"
          >提交</Button>
        </i-col>
      </Row>

    </div>
  </div>

</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue'
import Editor from '@/components/Editor.vue'
import { mapActions } from 'vuex'
export default {
  name: 'topic',
  inject: ['reload'],
  data () {
    return {
      comment: '',
      comments: [],
      doc: {},
      comments_length: 0,
      offset: 100,
      page: 1,
    }
  },
  components: {
    HeaderNav,
    Editor,
  },
  methods: {
    ...mapActions([
      'getOneTopic',
      'saveComment',
      'getComment'
    ]),
    handleSubmit () {
      let body = {}
      body.content = this.comment
      body.author_id = this.$refs.user.id
      body.topic_id = this.$route.params.id
      this.saveComment(body).then(res => {
        if (res.err_code) {
          return this.$Message.error(res.message)
        }
        this.$Message.success(res.message)
        this.reload()
      })
    },
    handlePageChange (index) {
      this.$router.push(`/topic/${this.$route.params.id}/${index}`)
      this.page = index
      this.reload()
    }
  },
  mounted () {
    this.page = Number(this.$route.params.page)
    this.getOneTopic(this.$route.params.id).then(res => {
      this.content = res.doc.content
      this.doc = res.doc
      this.comments_length = this.doc.comment.length
      let max = Math.ceil(this.comments_length/10)
      if (this.page > max && max !== 0) {
        this.$router.push(`/topic/${this.$route.params.id}/${max}`)
        this.page = max
        this.reload()
      }
      let num = this.$route.params.page * 10
      let arr = res.doc.comment.slice(num - 10, num)
      this.getComment(arr).then(doc => {
        this.comments = doc.doc
      })

    })
  }
}
</script>
<style lang="less" >
@magin: 40px;
.container {
  margin-top: 65px;
  img {
    width: 100%;
  }
  .ivu-affix+div {
    display: none
  }
  .ivu-anchor-link{
    a {
      color: #fff;
      padding: 10px;
      border-radius: 12px;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
          vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
        display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    }
  }
  .content {
    border: 1px solid rgba(0, 0, 0, 0.1);
    .col4 {
      text-align: center;
      height: 210px;
      .pic {
        padding: 10px 5px;
        display: inline-block;
        img {
          border: 1px solid black;
          width: 110px;
        }
      }
      .name {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .col14 {
      padding: 10px;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      min-height: 210px;
    }
  }
  .comments {
    margin: 10px 0;
  }
  .comment {
    margin: @magin 0;
    .ql-editor {
      min-height: 100px;
    }
  }
  .submit {
    margin-bottom: @magin;
  }
}
</style>


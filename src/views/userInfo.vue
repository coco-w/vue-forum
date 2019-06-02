<template>
  <Layout>
        <Content class="content-con">
          <user-space-content :userInfo='userInfo' @update='handleUpdate' :isMe='isMe'></user-space-content>
        </Content>
  </Layout>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import UserSpaceContent from '@/components/UserSpaceContent.vue'
export default {
  name: 'userinfo',
  components: {
    UserSpaceContent
  },
  data() {
    return {
      userInfo: {},
      isUpdate: 0,
    }
  },
  computed: {
    isMe() {
      console.log(`id ${this.id} user ${this.userInfo._id}`)
      return this.$route.params.id === this.userInfo._id && this.isLogin
    },
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    ...mapMutations([
      'ISUPDATE'
    ]),
    handleUpdate (newvalue) {
      this.ISUPDATE()
      this.userInfo = newvalue
    }
  },
  mounted() {
    let id = this.$route.params.id
    console.log(id)
    this.getUserInfo(id).then(res => {
      this.userInfo = res.doc
    })
  }
}
</script>


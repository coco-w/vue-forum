import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { setToken, getToken } from '@/lib/util'

Vue.use(Router)

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  let token = getToken()
  if (token) {

  } else {

  }
  next()
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

import { getToken,parsingToken } from '@/lib/util'
Vue.use(Router)
const router = new Router({
  routes
})
let userRightsList = [
  'admin',
  'adminMain',
  'adminUser',
  'adminTopic'
]
router.beforeEach((to, from, next) => {
  let token = getToken()
  let user = parsingToken()
  let index = userRightsList.indexOf(to.name)
  if (index > -1) {
    if (user && user.state > 0) {
      next()
    } else {
      next('/404')
    }
  } else {
    next()
  }
})

export default router

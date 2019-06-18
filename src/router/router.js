export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: () => import('@/views/Home.vue'),
    childer: []
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/register.vue')
  },
  {
    path: '/userSpace/:id',
    name: 'userSpace',
    props: true,
    meta: {
      title: '用户空间'
    },
    component: () => import('@/views/userSpace.vue'),
    children: [
      {
        path: '/userSpace/:id/userinfo',
        name: 'userinfo',
        meta: {
          title: '用户信息'
        },
        component: () => import('@/views/userInfo.vue')
      },
      {
        path: '/userSpace/:id/history/:page',
        name: 'history',
        meta: {
          title: '历史记录'
        },
        component: () => import('@/views/history.vue')
      },
      {
        path: '/userSpace/:id/topic/:page',
        name: 'topicHistory',
        meta: {
          title: '发帖记录'
        },
        component: () => import('@/views/topicHistory.vue')
      }
    ]

  },
  {
    path: '/new',
    name: 'newEdit',
    mete: {
      title: '发帖'
    },
    component: () => import('@/views/newEdit')
  },
  {
    path: '/topic/:id/:page',
    name: 'topic',
    meta: {
      title: '帖子'
    },
    component: () => import('@/views/topic.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: '管理员系统'
    },
    component: () => import('@/views/admin.vue'),
    children: [
      {
        path: '/admin/main',
        name: 'adminMain',
        meta: {
          title: '主页'
        },
        component: () => import('@/views/adminMain.vue')
      },
      {
        path: '/admin/user',
        name: 'adminUser',
        meta: {
          title: '用户信息'
        },
        component: () => import('@/views/adminUser.vue')
      },
      {
        path: '/admin/topic',
        name: 'adminTopic',
        meta: {
          title: '帖子信息'
        },
        component: () => import('@/views/adminTopic.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/404.vue')
  }
]

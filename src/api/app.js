import axios from './index'

export const register = (email, nickname, password) => {
  return axios.request({
    url: '/api/register',
    method: 'post',
    data: {
      email,
      nickname,
      password
    }
  })
}

export const login = (nickname, password) => {
  return axios.request({
    url: '/api/login',
    method: 'post',
    data: {
      nickname,
      password
    }
  })
}

export const authorization = (token) => {
  return axios.request({
    url: '/api/authorization',
    method: 'post',
    data: {
      token
    }
  })
}

export const getUserInfo = id => {
  return axios.request({
    url: '/api/findById',
    method: 'post',
    data: {
      id
    }
  })
}

export const modifyUserInfo = userInfo => {
  return axios.request({
    url: '/api/modifyUserInfo',
    method: 'post',
    data: {
      userInfo
    }
  })
}

export const newEdit = params => {
  return axios.request({
    url: '/api/newEdit',
    method: 'post',
    data: {
      params
    }
  })
}
export const getTopic = (user) => {
  return axios.request({
    url: '/api/getTopic',
    method: 'get',
    data: {
      user
    }
  })
}

export const getOneTopic = (id) => {
  return axios.request({
    url: '/api/getOneTopic',
    method: 'post',
    data: {
      id
    }
  })
}

export const saveComment = params => {
  return axios.request({
    url: '/api/setComment',
    method: 'post',
    data: {
      params
    }
  })
}

export const getComment = arr => {
  return axios.request({
    url: '/api/getcomment',
    method: 'post',
    data: {
      arr
    }
  })
}

export const getCommentsHistory = id => {
  return axios.request({
    url: '/api/getCommentsHistory',
    method: 'post',
    data: {
      id
    }
  })
}

export const downLoadImg = srcArr => {
  return axios.request({
    url: '/api/downLoadImg',
    method: 'post',
    data: {
      srcArr
    }
  })
}

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
export const getTopic = (params) => {
  return axios.request({
    url: '/api/getTopic',
    method: 'post',
    data: {
      params
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

export const getCommentsHistory = params => {
  return axios.request({
    url: '/api/getCommentsHistory',
    method: 'post',
    data: {
      params
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

export const deleteComment = id => {
  return axios.request({
    url: '/api/deleteComment',
    method: 'post',
    data: {
      id
    }
  })
}

export const changeComment = params => {
  return axios.request({
    url: '/api/changeComment',
    method: 'post',
    data: {
      params
    }
  })
}

export const deleteTopic = id => {
  return axios.request({
    url: '/api/deleteTopic',
    method: 'post',
    data: {
      id
    }
  })
}

export const changeTopicTitle = params => {
  return axios.request({
    url: '/api/changeTopicTitle',
    method: 'post',
    data: {
      params
    }
  })
}

import { newEdit, getTopic, getOneTopic, saveComment, getComment, getCommentsHistory, downLoadImg } from '@/api/app'

const state = {

}

const mutations = {

}

const actions = {
  newEdit ({ commit }, params) {
    return new Promise((resolve, reject) => {
      newEdit(params).then(res => {
        resolve(res)
      })
    })
  },
  getTopic ({ commit }, user) {
    return new Promise((resolve, reject) => {
      getTopic(user).then(res => {
        resolve(res.doc)
      })
    })
  },
  getOneTopic ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getOneTopic(id).then(res => {
        resolve(res)
      })
    })
  },
  saveComment ({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveComment(params).then(res => {
        resolve(res)
      })
    })
  },
  getComment ({ commit }, arr) {
    return new Promise((resolve, reject) => {
      getComment(arr).then(res => {
        resolve(res)
      })
    })
  },
  getCommentsHistory ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getCommentsHistory(id).then(res => {
        resolve(res)
      })
    })
  },
  downLoadImg ({ commit }, srcArr) {
    return new Promise((resolve, reject) => {
      downLoadImg(srcArr).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

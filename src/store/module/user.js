import jwt from 'jsonwebtoken'
import { register, login, authorization, getUserInfo, modifyUserInfo } from '@/api/app'
import { setToken, getToken } from '@/lib/util'
const state = {
  'isLogin': false,
  'id': '',
  'isUpdate': 0
}

const mutations = {
  CHANGE_Logon_Status (state, status) {
    state.isLogin = status
  },
  SET_ID (state, id) {
    state.id = id
  },
  GET_ID (state) {
    return state.id
  },
  ISUPDATE (state) {
    state.isUpdate++
  }
}

const actions = {
  registe ({ commit }, { email, nickname, password }) {
    return new Promise((resolve, reject) => {
      register(email, nickname, password).then((result) => {
        resolve(result)
      })
    })
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login(username, password).then(res => {
        if (res.err_code === 1) {
          resolve(res)
        }
        commit('SET_ID', res.data.id)
        jwt.verify(res.data.token, 'asd', (error, decoded) => {
          if (error) {
            console.log(error)
            return
          }
          setToken(res.data.token)
          resolve(decoded)
        })
      })
    })
  },
  authorization ({ commit }) {
    return new Promise((resolve, reject) => {
      let token = getToken()
      authorization(token).then(res => {
        if (res.code === 500 || res.code === 401) {
          commit('CHANGE_Logon_Status', false)
          console.log(res.message)
        }
        if (res.code === 200) {
          commit('CHANGE_Logon_Status', true)
          console.log(res)
          setToken(res.token)
          resolve(res.decoded)
        }
      })
    })
  },
  outLog ({ commit }) {
    console.log('???')
    commit('SET_ID', '')
    commit('CHANGE_Logon_Status', false)
    setToken('')
  },
  getUserInfo ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getUserInfo(id).then(doc => {
        resolve(doc)
      })
    })
  },
  modifyUserInfo ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      modifyUserInfo(userInfo).then(res => {
        resolve(res)
      })
    })
  },
  setId ({ commit }, id) {

  }
}

export default {
  state,
  mutations,
  actions
}

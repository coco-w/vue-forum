import { baseUrl } from '@/config'
import axios from 'axios'
let baseURL = baseUrl
class HttpRequse {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.query = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      return Promise.reject(err)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}
export default HttpRequse

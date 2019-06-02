import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const getToken = () => {
  return Cookie.get('token')
}

export const setToken = (data) => {
  Cookie.set('token', data)
}

export const parsingToken = () => {
  let token = getToken()
  jwt.verify(token, 'asd', (err, doc) => {
    if (err) {
      console.log(err)
    }
    return doc
  })
}

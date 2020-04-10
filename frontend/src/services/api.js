import axios from 'axios'

const api = axios.create({
  baseURL: 'https://3333-be941081-3fbf-47fe-8d9f-1123736232c6.ws-us02.gitpod.io'
  //baseURL: 'http://localhost:3333'
})

export default api
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'

import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import io from 'socket.io-client'

import axios from 'axios'

axios.interceptors.request.use(config => {
  // console.log('config:' + JSON.stringify(config))
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MjM4MTE0NDYsImV4cCI6MTYyMzg5Nzg0Nn0.zf26QXgtrqo5RMpYowKduoOGapK7LWe3P7ItXMgpb3g' // window.sessionStorage.getItem('token')
  console.log('config:' + JSON.stringify(config.headers.Authorization))
  return config
})

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

const socketio = io('http://localhost:4000')

Vue.prototype.$http = axios
Vue.prototype.$socketio = socketio

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

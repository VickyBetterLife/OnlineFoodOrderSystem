import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Orders from './components/Orders.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/orders',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/orders', component: Orders }
    ]
  }
]

const router = new VueRouter({
  routes
})

// navigation guard
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  // const token = window.sessionStorage.getItem('token')
  const token = document.cookie
  if (!token) return next('./login')
  next()
})
export default router

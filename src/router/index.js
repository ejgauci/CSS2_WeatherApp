import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path:'/search',
    name: 'Search',
    component: () => import('../components/Search.vue')
  },
  {
    path:'/viewMember',
    name: 'ViewMember',
    component: () => import('../components/ViewMember.vue')
  },
  {
    path:'/updateMember',
    name: 'UpdateMember',
    component: () => import('../components/UpdateMember.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router

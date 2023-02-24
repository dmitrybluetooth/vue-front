import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('auth_token')

  if (!token) {
    if (to.name === 'login' || to.name === 'registration') {
      return next()
    }
  }

  if (to.name === 'login' || to.name === 'registration' && token) {
    return next({
      name: 'home'
    })
  }

  next()

})

export default router

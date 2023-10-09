import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Step from '../views/Step.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/step/',
      name: 'step',
      component: () => Step
    },
    {
      path: '/step/:id',
      name: 'step',
      component: () => Step
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:pathMatch(.*)',
      name: 'home',
      component: Home
    },
  ]
})

export default router

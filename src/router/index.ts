import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang(en|ru)?',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { inheritLang: true, layout: 'default' },
    },
    {
      path: '/:lang(ru)?/tos',
      name: 'tos',
      component: () => import('@/views/TermsOfUseView.vue'),
      meta: { inheritLang: true, layout: 'default' },
    },
    {
      path: '/:lang(en|ru)?/order/:id',
      name: 'order',
      component: () => import('@/views/OrderView.vue'),
      meta: { inheritLang: true, layout: 'default' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
})

export default router

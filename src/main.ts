import './assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { worker } from '@/mocks/browser'

import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('activeLocale') || 'en',
  fallbackLocale: 'en',
  availableLocales: ['en', 'ru'],
  messages: messages,
})

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  return worker.start()
}

const pinia = createPinia()
const app = createApp(App)

enableMocking().then(() => {
  app.use(pinia).use(i18n).use(router).mount('#app')
})

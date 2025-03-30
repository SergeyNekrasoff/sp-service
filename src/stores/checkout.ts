import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import type { Account } from '@/types/checkout'
import { useRouter } from 'vue-router'
import { CheckoutService } from '@/services/checkout'
import { useI18n } from 'vue-i18n'

export const useCheckoutStore = defineStore('checkout', () => {
  const loading: Ref<boolean> = ref(false)
  const status: Ref<boolean> = ref(false)

  const { locale } = useI18n()
  const router = useRouter()

  const createAccount = async (payload: Account): Promise<void | unknown> => {
    try {
      loading.value = true
      const message = await CheckoutService.create({ locale: locale.value, userData: payload })

      if (message !== 'ok') return

      status.value = true
      loading.value = false

      router.push(`/${locale.value}/success`)
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  return {
    status,
    loading,
    createAccount,
  }
})

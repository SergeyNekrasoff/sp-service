import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'
import { HttpClient } from '@/api/httpClient'
import type { Plan } from '@/types/plans'

const httpClient = new HttpClient()

export const usePlansStore = defineStore('plans', () => {
  const plans: Ref<Plan[] | null> = ref(null)
  const loading: Ref<boolean> = ref(false)

  const { locale } = useI18n()

  const getPlans = async () => {
    try {
      loading.value = true
      const response = await httpClient.get(`/v1/${locale.value}/plans/`)

      if (!response) return

      plans.value = response.data.plans as Plan[]

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  watch(locale, async (value) => {
    if (value) {
      await getPlans()
    }
  })

  return {
    loading,
    plans,
    getPlans,
  }
})

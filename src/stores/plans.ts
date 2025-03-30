import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'
import type { Plan } from '@/types/plans'
import { PlansService } from '@/services/plans'

export const usePlansStore = defineStore('plans', () => {
  const plans: Ref<Plan[] | null> = ref(null)
  const plan: Ref<Plan | null> = ref(null)
  const loading: Ref<boolean> = ref(false)

  const { locale } = useI18n()

  const getPlans = async () => {
    try {
      loading.value = true
      const response = await PlansService.getAll(locale.value)

      plans.value = response?.data.plans as Plan[]

      loading.value = false
    } catch (error) {
      loading.value = false
      return (error as AxiosError).response
    }
  }

  const getPlan = async (id: string) => {
    try {
      loading.value = true
      const response = await PlansService.findOne(id, locale.value)

      plan.value = response?.data as Plan

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
    plan,
    getPlans,
    getPlan,
  }
})

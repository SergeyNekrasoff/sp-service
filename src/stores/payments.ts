import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { PaymentCardData } from '@/types/payment'

export const usePaymentsStore = defineStore('payments', () => {
  const paymentCard: Ref<PaymentCardData | null> = ref(null)

  const setPaymentCard = (payload: PaymentCardData | null) => (paymentCard.value = payload)

  return {
    paymentCard,
    setPaymentCard,
  }
})

import { computed, reactive } from 'vue'
import type { PaymentCardData } from '@/types/payment'
import { useI18n } from 'vue-i18n'

type PaymentCardSNumberCvc = Pick<PaymentCardData, 'number' | 'cvc'>

interface PaymentCardError extends PaymentCardSNumberCvc {
  expiryDate: string
}

export const usePaymentCard = (dataCard: PaymentCardData) => {
  const { t } = useI18n()

  const errors = reactive<PaymentCardError>({
    number: '',
    expiryDate: '',
    cvc: '',
  })

  const formatCardNumber = (value: string): string => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
  }

  const validateCardNumber = (value: string): boolean => {
    const cleanValue = value.replace(/\s/g, '')
    return /^[0-9]{16}$/.test(cleanValue)
  }

  const validateExpiryDate = (expMonth: string, expYear: string): boolean => {
    const month = parseInt(expMonth)
    const year = parseInt(expYear)
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    return (
      (month >= 1 && month <= 12 && year >= currentYear) ||
      (year === currentYear && month > currentMonth)
    )
  }

  const validateCVC = (value: string): boolean => {
    return /^[0-9]{3,4}$/.test(value)
  }

  const isValid = computed(() => {
    errors.number = validateCardNumber(dataCard.number) ? '' : `${t('error.card')}`
    errors.expiryDate = validateExpiryDate(dataCard.expiryMonth, dataCard.expiryYear)
      ? ''
      : `${t('error.expiryDate')}`
    errors.cvc = validateCVC(dataCard.cvc) ? '' : `${t('error.cvc')}`

    return Object.values(errors).every((error) => !error)
  })

  return {
    errors,
    isValid,
    formatCardNumber,
  }
}

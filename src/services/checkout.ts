import { HttpClient } from '@/api/httpClient'
import type { Account } from '@/types/checkout'
import type { AxiosError } from 'axios'

const httpClient = new HttpClient()

type AccountRequest = {
  locale: string
  userData: Account
}

export const CheckoutService = {
  async create(payload: AccountRequest): Promise<string | unknown> {
    try {
      const response = await httpClient.post(`/v1/${payload.locale}/checkout`, payload.userData)

      if (!response?.data) return

      return response?.data.message as string
    } catch (error) {
      return (error as AxiosError).response
    }
  },
}

import { HttpClient } from '@/api/httpClient'
import type { AxiosError } from 'axios'
import type { Plan } from '@/types/plans'

const httpClient = new HttpClient()

export const PlansService = {
  async getAll(locale: string): Promise<Plan[] | unknown> {
    try {
      const response = await httpClient.get(`/v1/${locale}/plans/`)

      if (!response) return

      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },

  async findOne(id: string, locale: string): Promise<Plan | unknown> {
    try {
      const response = await httpClient.post(`/v1/${locale}/order/${id}`, { id })

      if (!response) return

      return response
    } catch (error) {
      return (error as AxiosError).response
    }
  },
}

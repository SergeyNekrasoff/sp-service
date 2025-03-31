import type { PaymentCardData } from './payment'
import type { Plan } from './plans'

export interface Account {
  username: string
  email: string
  password: string
}

export type AccountUserData = {
  user: Account
  payment: PaymentCardData
  plan: Plan
}

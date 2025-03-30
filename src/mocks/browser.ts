import { handlers as plansHandlers } from '@/mocks/plansHandlers'
import { handlers as orderHandlers } from '@/mocks/orderHandlers'
import { handlers as checkoutHandlers } from '@/mocks/checkoutHandlers'
import { setupWorker } from 'msw/browser'

const handlers = [...orderHandlers, ...plansHandlers, ...checkoutHandlers]
export const worker = setupWorker(...handlers)

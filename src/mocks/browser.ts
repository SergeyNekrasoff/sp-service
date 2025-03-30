import { handlers as plansHandlers } from '@/mocks/plansHandlers'
import { handlers as orderHandlers } from '@/mocks/orderHandlers'
import { setupWorker } from 'msw/browser'

const handlers = [...orderHandlers, ...plansHandlers]
export const worker = setupWorker(...handlers)

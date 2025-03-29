import { handlers as plansHandlers } from '@/mocks/plansHandlers'
import { setupWorker } from 'msw/browser'

const handlers = [...plansHandlers]
export const worker = setupWorker(...handlers)

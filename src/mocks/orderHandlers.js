import { http, HttpResponse } from 'msw'
import enPLans from '../static/mock/v1/plans/en/plans.json'
import ruPLans from '../static/mock/v1/plans/ru/plans.json'

export const handlers = [
  http.post(`http://localhost:5173/v1/en/order/:id`, (request) => {
    const plan = enPLans.plans.find((e) => e.id === request.params.id)
    return HttpResponse.json(plan)
  }),

  http.get(`http://localhost:5173/v1/ru/order/:id`, (request) => {
    const plan = ruPLans.plans.find((e) => e.id === request.params.id)
    return HttpResponse.json(plan)
  }),
]

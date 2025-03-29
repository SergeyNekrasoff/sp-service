import { http, HttpResponse } from 'msw'
import enPLans from '../static/mock/v1/plans/en/plans.json'
import ruPLans from '../static/mock/v1/plans/ru/plans.json'

export const handlers = [
  http.get('http://localhost:5173/v1/en/plans', () => {
    return HttpResponse.json(enPLans)
  }),

  http.get('http://localhost:5173/v1/ru/plans', () => {
    return HttpResponse.json(ruPLans)
  }),
]

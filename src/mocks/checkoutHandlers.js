import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post(`http://localhost:5173/v1/ru/checkout`, () => {
    return HttpResponse.json({ message: 'ok' })
  }),

  http.post(`http://localhost:5173/v1/en/checkout`, () => {
    return HttpResponse.json({ message: 'ok' })
  }),
]

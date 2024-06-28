import { delay, http, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'

const handlers = [
  http.get(`*`, async () => {
    await delay(3000)
    return passthrough()
  }),
]

export const worker = setupWorker(...handlers)

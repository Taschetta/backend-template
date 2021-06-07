import { makeRouter } from '@utils/globals'

import endpoint from './endpoint.js'

export default makeRouter({
  get: {
    '/': endpoint.filter,
    '/:id': endpoint.find,
  },
  post: {
    '/': endpoint.save,
    '/:id': endpoint.save,
  },
  delete: {
    '/:id': endpoint.remove
  }
})
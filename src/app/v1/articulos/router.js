import { makeRouter } from '@utils/factories'

export default ({ endpoint }) => makeRouter({
  get: {
    '/': endpoint.filter,
    '/:id': endpoint.find,
  },
  post: {
    '/': endpoint.save,
    '/:id': endpoint.save,
  },
  remove: {
    '/:id': endpoint.remove
  }
})
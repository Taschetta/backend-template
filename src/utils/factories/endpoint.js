
export const makeEndpoint = ({ controller }) => (extend = {}) => Object.create({

  filter: async function({ request }) {
    const id = request.params.id
    return await controller.filter({ id, ...request.query })
  },

  save: async function() {

  },

  remove: async function() {

  },

}, Object.entries(extend).reduce((result, [key, value]) => {
  result[key] = { value }
  return result
}, {}))
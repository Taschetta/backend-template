import { makeEndpoint } from '@utils/factories'

export default ({ controller }) => makeEndpoint({ controller })({

  filter: async function ({ request }) {
    let query, result = {}
    
    query = request.query
    
    result = await controller.query(query) // returns { items, pagination }
    
    return result
  },
  
  find: async function ({ request }) {
    let query, result = {}
    
    query = request.query
    query.id = request.params.id || query.id
    query.first = true
    
    result.item = await controller.query(query) // returns item

    return result
  },
  
  save: async function ({ request }) {
    let data, result = {}

    data = request.body

    result = await controller.save(request.body) // returns { id, action }
    
    return result
  },
  
  remove: async function ({ request }) {
    let query, result

    query = request.query
    query.id = request.params.id || query.id
    
    result = await controller.remove(request) // returns { id }

    return result
  },
  
})
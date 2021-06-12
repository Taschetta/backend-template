
export const useTable = ({ knex }) => (name) => ({

  query: function({ id, equal, like } = {}) {
    const query = knex.table(name)

    if(id) query.where('id', id)

    if(equal) Object.entries(equal).map(([column, value]) => {
      query.where(column, value)
    })

    if(like) Object.entries(like).map(([column, value]) => {
      query.where(column, 'like', `%${value}%`)
    })

    return query
  },

  filter: async function(query) {
    let result = {} 
    
    result = await this.query(query)
    result = result.length == 1 ? result[0]: result

    return result
  },

  save: async function(data) {
    let result = {}

    result = (data.id)
      ? await this.update(data)
      : await this.create(data)

    return result
  },

  create: async function(data) {
    let result = {}

    result = await this
      .query()
      .insert(data)

    return result[0]
  },

  update: async function(data) {
    let id = data.id
    let result = {}

    result = await this
      .query({ id })
      .update(data, ['id'])

    return result[0]
  },

  remove: async function(data) {
    let id = data.id
    let result = {}

    result = await this
      .query({ id })
      .del(['id'])

    return result[0]
  }
  
})
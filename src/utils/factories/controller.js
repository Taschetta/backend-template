
export const makeController = ({ table }) => (extend = {}) => Object.create({

  filter: async function({ id, ...like } = {}) {
    return await table.filter({ id, like })
  },

  save: async function(item) {
    return await table.save(item)
  },

  remove: async function({ id }) {
    return await table.remove({ id })
  },
  
}, Object.entries(extend).reduce((result, [key, value]) => {
  result[key] = { value }
  return result
}, {}))
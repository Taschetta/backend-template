
export const makeController = ({ table }) => (extend = {}) => Object.create({

  filter: async function() {

  },

  save: async function() {

  },

  remove: async function() {

  },
  
}, Object.entries(extend).reduce((result, [key, value]) => {
  result[key] = { value }
  return result
}, {}))
import { makeController } from '@utils/factories'

export default ({ table }) => makeController({ table })({

  query: function ({ id, codigo, nombre, descripcion, ...options } = {}) {
    let result
    
    result = table.query({
      where: { id },
      like: { codigo, nombre, descripcion },
      options,
    })

    return result
  },
  
  save: async function (data) {
    let result
    result = await table.save(data)
    return result
  },    
  
  remove: async function () {
    let result
    result = await table.remove(data)
    return result
  },

})
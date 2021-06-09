
export const object = (object = {}) => ({

  reduce: function(callback, initialValue) {
    return Object
      .entries(object)
      .reduce(callback, initialValue)
  },

  toDataDescriptor: function () {
    return this.reduce((result, [key, value]) => {
      result[key] = { value }
      return result
    }, {})
  }
  
})
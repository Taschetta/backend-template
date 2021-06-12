
export const object = (object = {}) => ({

  entries: function() {
    return Object.entries(object)
  },

  map: function(callback) {
    return this
      .entries()
      .map(([key, value]) => 
        callback(key, value)
      )
  },

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
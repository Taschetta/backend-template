import { expect } from '@jest/globals'
import { object } from '@utils/helpers'

describe('object(object)', () => {
  
  describe('reduce(callback, initialValue)', () => {
    
    it('calls the callback function for every key in the object', () => {
      const callback = jest.fn()
      object({ a: 0, b: 1, c: 2 }).reduce(callback)
      expect(callback).toHaveBeenCalledTimes(3)
    })

    it('returns the accumulation of the callback', () => {
      const result = object({ a: 0, b: 1, c: 2 }).reduce((result, [key, value]) => {
        result[key] = value + 1
        return result
      }, {})

      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })
    
  })

  describe('toDataDescriptor()', () => {
    
    it('returns the object as a data descriptor', () => {
      const result = object({ a: 0, b: 1, c: 2 }).toDataDescriptor()
      
      expect(result).toEqual({
        a: { value: 0 },
        b: { value: 1 },
        c: { value: 2 },
      })
    })
    
  })
  
})
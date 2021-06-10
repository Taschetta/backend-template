import { expect } from '@jest/globals'
import { makeEndpoint } from '@utils/factories/endpoint.js'

describe('makeEndpoint()()', () => {

  let controller = {}

  beforeEach(() => {
    controller = jest.fn()
  })

  describe('when the first function is called', () => {

    describe('and it recibes a controller', () => {

      it('returns a function', async () => {
        expect(makeEndpoint({ controller })).toEqual(expect.any(Function))
      })
      
    })
    
  })

  describe('when the second function is called', () => {

    let endpoint = {}

    beforeEach(() => {
      endpoint = makeEndpoint({ controller })()
    })

    describe('and it recibes nothing', () => {

      it('returns an object', async () => {
        expect(endpoint).toEqual(expect.any(Object))
      })

      it('returns an object with a filter function', async () => {
        expect(endpoint.filter).toEqual(expect.any(Function))
      })

      it('returns an object with a find function', async () => {
        expect(endpoint.find).toEqual(expect.any(Function))
      })
      
      it('returns an object with a save function', async () => {
        expect(endpoint.save).toEqual(expect.any(Function))
      })
      
      it('returns an object with a remove function', async () => {
        expect(endpoint.remove).toEqual(expect.any(Function))
      })
      
    })
    
  })

  describe('when the filter function is called', () => {
    
  })

  describe('when the find function is called', () => {
    
  })

  describe('when the save function is called', () => {
    
  })

  describe('when the remove function is called', () => {
    
  })
  
})
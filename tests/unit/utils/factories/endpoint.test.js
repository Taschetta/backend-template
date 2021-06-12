import { expect } from '@jest/globals'
import { makeEndpoint } from '@utils/factories/endpoint.js'

describe('makeEndpoint()()', () => {

  let controller = {}

  beforeEach(() => {
    controller = mockController()
  })

  describe('when an endpoint is made', () => {

    describe('and it recibes nothing', () => {
      
      let endpoint = {}
      let prototype = {}
  
      beforeEach(() => {
        endpoint = makeEndpoint({ controller })()
        prototype = Object.getPrototypeOf(endpoint)
      })

      it('has a filter function on its prototype', async () => {
        expect(prototype.filter).toEqual(expect.any(Function))
      })

      it('has a save function on its prototype', async () => {
        expect(prototype.save).toEqual(expect.any(Function))
      })
      
      it('has a remove function on its prototype', async () => {
        expect(prototype.remove).toEqual(expect.any(Function))
      })
      
    })

    describe('and it recibes an endpoint', () => {
      
      let extend = {}
      let endpoint = {}
  
      beforeEach(() => {
        extend.filter = jest.fn()
        extend.save = jest.fn()
        extend.remove = jest.fn()
        extend.extra = jest.fn()

        endpoint = makeEndpoint({ controller })(extend)
      })

      it('extends the controller with it', async () => {
        expect(endpoint.filter).toEqual(extend.filter)
        expect(endpoint.save).toEqual(extend.save)
        expect(endpoint.remove).toEqual(extend.remove)
        expect(endpoint.extra).toEqual(extend.extra)
      })

    })
    
  })

  describe('the default endpoint', () => {
    
    let request = {}
    let endpoint = {}

    beforeEach(() => {
      request = { params: {}, query: {} }
      endpoint = makeEndpoint({ controller })()
    })
    
    describe('when its filter function is called', () => {
      
      it('calls controller.filter', async () => {
        await endpoint.filter({ request })
        expect(controller.filter).toHaveBeenCalled()
      })

      it('returns its result', async () => {
        controller.filter.mockResolvedValue([0,1,2])
        let result = await endpoint.filter({ request })
        expect(result).toEqual([0,1,2])
      })

      describe('and when it recibes an id parameter', () => {

        it('passes it to controller.filter', async () => {
          request.params.id = 1
          await endpoint.filter({ request })
          expect(controller.filter).toHaveBeenCalledWith({ id: 1 })
        })
        
      })

      describe('and when it recibes a query', () => {
        
        it('passes it to controller.filter', async () => {
          request.query = { nombre: 'Ricardo', apellido: 'Piglia' }
          await endpoint.filter({ request })
          expect(controller.filter).toHaveBeenCalledWith(request.query)
        })
        
      })
      
    })
  
    describe('when its save function is called', () => {
      
      it('calls controller.save', async () => {
        await endpoint.save({ request })
        expect(controller.save).toHaveBeenCalled()
      })
      
    })
  
    describe('when its remove function is called', () => {
      
    })

  })

  
})

function mockController() {
  return {
    filter: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }
}
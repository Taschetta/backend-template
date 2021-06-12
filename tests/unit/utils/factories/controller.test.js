import { expect } from '@jest/globals'
import { makeController } from '@utils/factories/controller.js'

describe('the controller factory', () => {
  
  let table = mockTable()

  describe('when a controller is made', () => {
    
    describe('and it recibes nothing', () => {
      
      let controller = {}
      let prototype = {}
    
      beforeEach(() => {
        controller = makeController({ table })()
        prototype = Object.getPrototypeOf(controller)
      })
      
      it('has a filter function on its prototype', () => {
        expect(prototype.filter).toEqual(expect.any(Function))
      })
  
      it('has a save function on its prototype', () => {
        expect(prototype.save).toEqual(expect.any(Function))
      })
  
      it('has a remove function on its prototype', () => {
        expect(prototype.remove).toEqual(expect.any(Function))
      })
      
    })
  
    describe('and it recibes a controller', () => {
      
      let extend = {}
      let controller = {}
      
      beforeEach(() => {
        extend.filter = jest.fn()
        extend.save = jest.fn()
        extend.remove = jest.fn()
        extend.extra = jest.fn()
  
        controller = makeController({ table })(extend)
      })
      
      it('extends the controller with it', () => {
        expect(controller.filter).toBe(extend.filter)
        expect(controller.save).toBe(extend.save)
        expect(controller.remove).toBe(extend.remove)
        expect(controller.extra).toBe(extend.extra)
      })
      
    })

  })

  describe('the default controller', () => {
    
    let controller = {}

    beforeEach(() => {
      controller = makeController({ table })()
    })
    
    describe('when the filter function is called', () => {
      
      describe('and it recibes nothing', () => {
        
        let result = {}

        beforeEach(async () => {
          result = await controller.filter()
        })
        
        it('calls table.filter', () => {
          expect(table.filter).toHaveBeenCalled()
        })
        
      })
      
    })
    
  })


  
})

function mockTable() {
  return {
    filter: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }
}
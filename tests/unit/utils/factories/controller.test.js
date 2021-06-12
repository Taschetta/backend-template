import { expect } from '@jest/globals'
import { makeController } from '@utils/factories/controller.js'

describe('the controller factory', () => {
  
  let table = {}

  beforeEach(() => {
    table = mockTable()
  })

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
      
      let resultTable = [0,1,2]

      beforeEach(async () => {
        table.filter.mockResolvedValue(resultTable)
      })
      
      it('calls table.filter', async () => {
        await controller.filter()
        expect(table.filter).toHaveBeenCalled()
      })
      
      it('returns its result', async () => {
        const result = await controller.filter()
        expect(result).toBe(resultTable)
      })

      describe('when it recibes something', () => {
        
        it('passes it to table.filter', async () => {
          await controller.filter({ id: 1, nombre: 'Karriem', apellido: 'Riggims' })
          expect(table.filter).toHaveBeenCalledWith({ id: 1, like: { nombre: 'Karriem', apellido: 'Riggims' } })
        })
        
      })
      
    })

    describe('when the save function is called', () => {
      
      describe('and it recibes an item', () => {

        let result = {}
        let resultTable = 1
        let item = { id: 1, nombre: 'Juan José', apellido: 'Saer' }
        
        beforeEach(async () => {
          table.save.mockResolvedValue(resultTable)
          result = await controller.save(item)
        })
        
        it('passes it to table.save', async () => {
          expect(table.save).toHaveBeenCalledWith(item)
        })

        it('returns its result', async () => {
          expect(result).toBe(resultTable)
        })
        
      })
      
    })

    describe('when the remove function is called', () => {
      
      describe('and it recibes an id ', () => {
        
        let result = {}
        let resultTable = 1
        let id = 1

        beforeEach(async () => {
          table.remove.mockResolvedValue(resultTable)
          result = await controller.remove({ id })
        })
        
        it('passes it to remove', () => {
          expect(table.remove).toHaveBeenCalledWith({ id })
        })

        it('returns its result', () => {
          expect(result).toBe(resultTable)
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
const { expect } = require('@jest/globals')
const { useTable } = require('@utils/composition/table.js')

describe('the useTable module', () => {
  
  let query = {}
  let knex = {}
  let table = {}
  let tableName = 'tests'

  beforeEach(() => {
    query = mockQuery()
    knex = mockKnex(query)
    table = useTable({ knex })(tableName)
  })

  describe('when table.query is called', () => {

    it('creates a query from knex.table', () => {
      table.query()
      expect(knex.table).toHaveBeenCalledTimes(1)
      expect(knex.table).toHaveBeenCalledWith(tableName)
    })

    it('returns the query', () => {
      const result = table.query()
      expect(result).toBe(knex.table())
    })

    describe('if it recibes { id }', () => {
      
      it('calls query.where("id", id)', async () => {
        table.query({ id: 666 })
        expect(knex.table().where).toHaveBeenNthCalledWith(1, 'id', 666)
      })

    })
    
    describe('if it recibes { equal }', () => {
      
      test('maps equal to query.where', () => {
        table.query({ equal: { nombre: 'santiago', apellido: 'taschetta' } })
              
        expect(query.where).toHaveBeenNthCalledWith(1, 'nombre', 'santiago')
        expect(query.where).toHaveBeenNthCalledWith(2, 'apellido', 'taschetta')
      })

    })
    
    describe('if it recibes { like }', () => {
      
      it('maps like to query.where', () => {
        table.query({ like: { telefono: '+ 54 9 11', pais: 'argentina' } })
        
        expect(query.where).toHaveBeenNthCalledWith(1, 'telefono', 'like', '%+ 54 9 11%')
        expect(query.where).toHaveBeenNthCalledWith(2, 'pais', 'like', '%argentina%')
      })

    })

  })

  describe('when table.filter is called', () => {

    beforeEach(() => {
      table.query = jest.fn().mockResolvedValue([0, 1, 2])
    })
    
    it('passes params to query', async () => {
      let params = { equal: { localidad: 'Moreno' } }
      await table.filter(params)
      expect(table.query).toHaveBeenCalledWith(params)
    })

    it('returns the result from the query', async () => {
      const result = await table.filter()
      expect(result).toEqual([0, 1, 2])
    })

    describe('if the result is a single item', () => {

      beforeEach(() => {
        table.query.mockResolvedValue([0])
      })
      
      it('returns only that item', async () => {
        const result = await table.filter()
        expect(result).toBe(0)
      })
      
    })
    
  })

  describe('when table.save is called', () => {

    describe('and it recibes an item with a nullable id', () => {
      
      let item = { nombre: 'Ruben', apellido: 'Rada' }

      beforeEach(() => {
        query.insert.mockResolvedValue([1])
      })

      it('inserts it to the table', async () => {
        await table.save(item)
        expect(query.insert).toHaveBeenCalledWith(item)
      })

      it('returns its id', async () => {
        let result = await table.create(item)
        expect(result).toBe(1)
      })
      
    })
      
    describe('and it recibes an item with an id', () => {

      let item = { id: 1, nombre: 'Luis Alberto', apellido: 'Spinetta' }

      beforeEach(() => {
        query.update.mockResolvedValue([1])
      })

      it('makes a query with its id', async () => {
        await table.update(item)
        expect(query.where).toHaveBeenCalledWith('id', 1)
      })

      it('updates the item', async () => {
        await table.update(item)
        expect(query.update).toHaveBeenLastCalledWith(item, ['id'])
      })

      it('returns its id', async () => {
        const result = await table.update(item)
        expect(result).toBe(1)
      })
      
    })
    
  })

  describe('when table.remove is called', () => {

    let item = { id: 1, nombre: 'Litto', apellido: 'Nebbia' }

    beforeEach(() => {
      query.del.mockResolvedValue([1])
    })

    describe('and it recibes a single item', () => {
      
      it('filters by its id', async () => {  
        await table.remove(item)        
        expect(query.where).toHaveBeenCalledWith('id', 1)
      })

      it('deletes it from the table', async () => {
        await table.remove(item)
        expect(query.del).toHaveBeenCalledWith(['id'])
      })

      it('returns its id', async () => {
        const result = await table.remove(item)
        expect(result).toBe(1)
      })
      
    })
    
    
  })
  
})

function mockKnex(query) {
  return { 
    table: jest.fn(() => query) 
  }
}

function mockQuery() {
  return {
    where: jest.fn().mockReturnThis(),
    whereIn: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),      
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    del: jest.fn().mockReturnThis(),
  }
} 
const { expect } = require('@jest/globals')
const { useTable } = require('@utils/composition/table.js')

describe('the useTable module', () => {
  
  let knex = {}
  let table = {}
  let tableName = 'tests'

  beforeEach(() => {
    knex = mockKnex()
    table = useTable({ knex })(tableName)
  })

  describe('the table object', () => {

    it('has a filter function', () => {
      expect(table.filter).toEqual(expect.any(Function))
    })

    it('has a find function', () => {
      expect(table.find).toEqual(expect.any(Function))
    })

    it('has a save function', () => {
      expect(table.save).toEqual(expect.any(Function))
    })

    it('has a remove function', () => {
      expect(table.remove).toEqual(expect.any(Function))
    })
    
  })
  
})

function mockKnex() {

}
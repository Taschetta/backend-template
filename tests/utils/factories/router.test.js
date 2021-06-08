jest.mock('express')

const { expect } = require('@jest/globals')
const { configRouter } = require('@utils/factories/router.js')

const express = require('express')

describe('configRouter({ express, callback })', () => {

  it('returns a function', async () => {
    expect(configRouter({})).toEqual(expect.any(Function))
  })

})

describe('makeRouter', () => {

  let makeRouter
  
  beforeEach(() => {
    makeRouter = configRouter({ express })
  })
  
  it('returns an empty express router', async () => {
    express.Router.mockReturnValueOnce('Router')
    expect(makeRouter()).toEqual('Router')
  })

  describe('when it recibes { use }', () => {

    let use;
    
    beforeEach(() => {
      use = jest.fn()
      express.Router.mockReturnValueOnce({ use })
    })
    
    it('maps each entrie of use to router.use', async () => {
      
      makeRouter({ 
        use: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(use).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(use).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
    })
    
  })

  describe('when it recibes { get }', () => {
    
    let get;

    beforeEach(() => {
      get = jest.fn()
      express.Router.mockReturnValueOnce({ get })
    })

    it('maps each entrie of get to router.get', async () => {

      makeRouter({ 
        get: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(get).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(get).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { post }', () => {
    
    let post;

    beforeEach(() => {
      post = jest.fn()
      express.Router.mockReturnValueOnce({ post })
    })

    it('maps each entrie of post to router.post', async () => {

      makeRouter({ 
        post: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(post).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(post).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { remove }', () => {

    let deleteFn
    
    beforeEach(() => {
      deleteFn = jest.fn()
      express.Router.mockReturnValue({ delete: deleteFn })
    })

    it('maps each entrie of remove to router.delete', async () => {

      makeRouter({ 
        remove: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(deleteFn).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(deleteFn).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { main: true }', () => {
    
    it('returns an empty express app', async () => {
      express.mockReturnValueOnce('express')
      expect(makeRouter({ main: true })).toEqual('express')
    })

    describe('when it recibes { use }', () => {
      
      let use;
    
      beforeEach(() => {
        use = jest.fn()
        express.mockReturnValueOnce({ use })
      })
      
      it('maps each entrie of use to app.use', async () => {
      
        makeRouter({ 
          main: true,
          use: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(use).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(use).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      })
      
    })
    
    describe('when it recibes { get }', () => {
    
      let get;
  
      beforeEach(() => {
        get = jest.fn()
        express.mockReturnValueOnce({ get })
      })
  
      it('maps each entrie of get to router.get', async () => {
  
        makeRouter({ 
          main: true,
          get: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(get).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(get).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
  
    describe('when it recibes { post }', () => {
      
      let post;
  
      beforeEach(() => {
        post = jest.fn()
        express.mockReturnValueOnce({ post })
      })
  
      it('maps each entrie of post to router.post', async () => {
  
        makeRouter({ 
          main: true,
          post: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(post).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(post).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
  
    describe('when it recibes { remove }', () => {
  
      let deleteFn
      
      beforeEach(() => {
        deleteFn = jest.fn()
        express.mockReturnValue({ delete: deleteFn })
      })
  
      it('maps each entrie of remove to router.delete', async () => {
  
        makeRouter({
          main: true,
          remove: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(deleteFn).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(deleteFn).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
    
  })
  
})
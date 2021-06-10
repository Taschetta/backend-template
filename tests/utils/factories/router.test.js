import { expect } from '@jest/globals'
import { useRouter as configRouter } from '@utils/composition/router.js'

describe('useRouter', () => {

  let useRouter = {}
  
  let express = {}
  let router = {}
  
  beforeEach(() => {
    
    router.use    = jest.fn()
    router.get    = jest.fn()
    router.post   = jest.fn()
    router.delete = jest.fn()
    
    express        = jest.fn()
    express.Router = jest.fn()
    
    express.Router.mockReturnValue(router)
    
    useRouter = configRouter({ express })
  })

  describe('when it recibes nothing', () => {
    
    it('returns a router', async () => {
      expect(useRouter()).toEqual(router)
    })

    it('does not call use', async () => {
      expect(useRouter().use).not.toHaveBeenCalled()
    })

    it('does not call get', async () => {
      expect(useRouter().get).not.toHaveBeenCalled()
      
    })

    it('does not call post', async () => {
      expect(useRouter().post).not.toHaveBeenCalled()
    })

    it('does not call remove', async () => {
      expect(useRouter().delete).not.toHaveBeenCalled()
    })

  })  

  describe('when it recibes { use }', () => {
    
    it('maps it to the router', async () => {
      
      const router = useRouter({ 
        use: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(router.use).toHaveBeenCalledTimes(2)

      expect(router.use).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(router.use).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
    })
    
  })

  describe('when it recibes { get }', () => {

    it('maps it to the router', async () => {

      const router = useRouter({ 
        get: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(router.get).toHaveBeenCalledTimes(2)

      expect(router.get).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(router.get).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { post }', () => {

    it('maps it to the router', async () => {

      const router = useRouter({ 
        post: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(router.post).toHaveBeenCalledTimes(2)

      expect(router.post).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(router.post).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { remove }', () => {

    it('maps it to the router', async () => {

      const router = useRouter({ 
        remove: { 
          '/articulos': 'articulos',
          '/usuarios': 'usuarios'
        } 
      })

      expect(router.delete).toHaveBeenCalledTimes(2)

      expect(router.delete).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
      expect(router.delete).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      
    })
    
  })

  describe('when it recibes { app: true }', () => {

    let app = {}

    beforeEach(() => {
      app.use = jest.fn()
      app.get = jest.fn()
      app.post = jest.fn()
      app.delete = jest.fn()
      
      express.mockReturnValue(app)
    })
    
    describe('and it recibes nothing else', () => {
      
      it('returns an empty app', async () => {
        expect(useRouter({ app: true })).toEqual(app)
      })
      
    })    

    describe('and it recibes { use }', () => {
      
      it('maps it to the app', async () => {
      
        const app = useRouter({ 
          app: true,
          use: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(app.use).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(app.use).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
      })
      
    })
    
    describe('and it recibes { get }', () => {
  
      it('maps it to the app', async () => {
  
        const app = useRouter({ 
          app: true,
          get: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(app.get).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(app.get).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
  
    describe('and it recibes { post }', () => {
  
      it('maps it to the app', async () => {
  
        const app = useRouter({ 
          app: true,
          post: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(app.post).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(app.post).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
  
    describe('and it recibes { remove }', () => {
  
      it('maps it to the app', async () => {
  
        const app = useRouter({
          app: true,
          remove: { 
            '/articulos': 'articulos',
            '/usuarios': 'usuarios'
          } 
        })
  
        expect(app.delete).toHaveBeenNthCalledWith(1, '/articulos', 'articulos')
        expect(app.delete).toHaveBeenNthCalledWith(2, '/usuarios', 'usuarios')
        
      })
      
    })
    
  })
  
})
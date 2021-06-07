import { makeRouter } from '@utils/globals'

import articulos from './articulos/index.js'

const router = makeRouter({ 
  use: {
    '/articulos': articulos,
  },
})

router.listen()
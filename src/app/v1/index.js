import { makeRouter } from '@utils/globals'

import articulos from './articulos/index.js'

const router = makeRouter({ 
  main: true,
  use: {
    '/articulos': articulos,
  },
})

router.listen(3333, () => {
  console.log('listening on port')
})
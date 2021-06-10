import { useTable } from '@utils/globals'

import useController from './controller.js'
import useEndpoint from './endpoint.js'
import useRouter from './router.js'

export const table = useTable('articulos')
export const controller = useController({ table })
export const endpoint = useEndpoint({ controller })

export default useRouter({ endpoint })
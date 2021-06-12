import { express, knex } from '@utils/config'

import { useRouter as configRouter } from './router.js'
import { useTable as configTable} from './table.js'

export const useRouter = configRouter({ express })
export const useTable = configTable({ knex })
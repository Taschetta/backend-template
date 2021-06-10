import { express } from '@utils/config'

import { useRouter as configRouter } from './router.js'

export const useRouter = configRouter({ express })
import { object } from '@utils/helpers'

export const useRouter = ({ express }) => ({ app = false, use, get, post, remove } = {}) => {

  let result

  if(app) result = express()
  else result = express.Router()
  
  if(use) 
    object(use).map(result.use)

  if(get) 
    object(get).map(result.get)

  if(post) 
    object(post).map(result.post)
    
  if(remove) 
    object(remove).map(result.delete)

  return result
}
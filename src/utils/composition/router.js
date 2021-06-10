
export const useRouter = ({ express }) => ({ app = false, use, get, post, remove } = {}) => {

  let result

  if(app) result = express()
  else result = express.Router()
  
  if(use) Object.entries(use).forEach(([path, routes]) => {
    result.use(path, routes)
  })

  if(get) Object.entries(get).forEach(([path, routes]) => {
    result.get(path, routes)
  })

  if(post) Object.entries(post).forEach(([path, routes]) => {
    result.post(path, routes)
  })

  if(remove) Object.entries(remove).forEach(([path, routes]) => {
    result.delete(path, routes)
  })

  return result
}
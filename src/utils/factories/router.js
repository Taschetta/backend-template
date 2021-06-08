
export const configRouter = ({ express }) => ({
  main = false,
  use = {},
  get = {},
  post = {},
  remove = {},
} = {}) => {

  let result

  if(main) result = express()
  else result = express.Router()
  
  Object.entries(use).forEach(([path, routes]) => {
    result.use(path, routes)
  })

  Object.entries(get).forEach(([path, routes]) => {
    result.get(path, routes)
  })

  Object.entries(post).forEach(([path, routes]) => {
    result.post(path, routes)
  })

  Object.entries(remove).forEach(([path, routes]) => {
    result.delete(path, routes)
  })

  return result
}
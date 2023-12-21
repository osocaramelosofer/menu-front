import { type IProduct } from '@/interfaces/product'

const api = {
  list: async (): Promise<IProduct[]> => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    }
    const response = await fetch('https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/', requestOptions)
    const jsonResponse = await response.json()
    return jsonResponse
  }
}
export default api

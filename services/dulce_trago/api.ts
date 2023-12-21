import { type Category } from '@/app/components/categories'
import { type IProduct } from '@/interfaces/product'

const api = {
  list: async (): Promise<IProduct[]> => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    }
    const response = await fetch(
      'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/',
      requestOptions
    )
    const jsonResponse = await response.json()
    return jsonResponse
  },
  categories: async (): Promise<Category[]> => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    }
    const response = await fetch(
      'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/categories',
      requestOptions
    )
    if (!response.ok) {
      throw new Error('Error al cargar las categorías')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return await response.json()
  },
  filteredProducts: async (params: string) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    }
    const response = await fetch(
    `https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products${params}`,
    requestOptions
    )
    if (!response.ok) {
      throw new Error('Error al cargar los productos')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return await response.json()
  }
}
export default api

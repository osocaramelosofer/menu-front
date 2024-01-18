import type { IProduct, Category } from '@/interfaces/product'

const api = {
  list: async (): Promise<IProduct[]> => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    }
    const response = await fetch(
      'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/', requestOptions
    )
    const jsonResponse = await response.json()

    return jsonResponse
  },
  getProduct: async (id: number): Promise<IProduct> => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    }
    const response = await fetch(`https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/${id}/`, requestOptions)
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

    return await response.json()
  }
}
export default api

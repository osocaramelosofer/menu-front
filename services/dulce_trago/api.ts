import type { IProduct, ICategory } from '@/interfaces/product'
import { BASE_URL } from '@/lib/utils'

const api = {
  list: async (): Promise<IProduct[]> => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    }
    const response = await fetch(
      `${BASE_URL}/products/products/`,
      requestOptions
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
    const response = await fetch(
      `${BASE_URL}/products/products/${id}/`,
      requestOptions
    )
    const jsonResponse = await response.json()
    return jsonResponse
  },
  categories: async (): Promise<ICategory[]> => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    }
    const response = await fetch(
      `${BASE_URL}/products/categories`,
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
      `${BASE_URL}/products/products${params}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error('Error al cargar los productos')
    }

    return await response.json()
  }
}
export default api

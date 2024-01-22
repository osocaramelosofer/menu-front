import { type CategoryType } from '@/app/(shops)/dulce-trago/coffees/coffee-categories.client'
import type { IProduct, Category } from '@/interfaces/product'

const REQUEST_OPTIONS: RequestInit = {
  method: 'GET',
  redirect: 'follow',
  cache: 'no-store'
}
const BASE_BACK_URL = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1`
const BACK_URL = new URL(process.env.NEXT_PUBLIC_API_BACKEND as string)

const api = {
  list: async (): Promise<IProduct[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/products/products/`, REQUEST_OPTIONS)
    const jsonResponse = await response.json()
    return jsonResponse
  },
  getProduct: async (id: number): Promise<IProduct> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/products/products/${id}/`, REQUEST_OPTIONS)
    const jsonResponse = await response.json()
    return jsonResponse
  },
  categories: async (): Promise<Category[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/products/categories`, REQUEST_OPTIONS)
    if (!response.ok) {
      throw new Error('Error al cargar las categorías')
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return await response.json() as CategoryType []
  },
  fetchFilteredProducts: async (categoryId: string, offset: string, limit: string): Promise<any> => {
    // Assuming each page has 6 items
    const url = new URL(`${BASE_BACK_URL}/products/products/`)
    const params = new URLSearchParams({
      is_available: 'true',
      store: '2',
      category: categoryId,
      offset: offset.toString(),
      limit: limit.toString()
    })
    url.search = params.toString()
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error('Error al cargar los productos FILTRADOS')
    }

    return await response.json()
  },
  getProductsOfTheStore: async () => {
    // BACK_URL.pathname += '/api/v1/products/products'
    const url = new URL(`${BASE_BACK_URL}/products/products/`)
    const params = new URLSearchParams({
      is_available: 'true',
      store: '2',
      limit: '6'
    })
    url.search = params.toString()

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }
    return await response.json()
  },
  getCategory: async (categoryId: string): Promise<Category> => {
    if (categoryId === null || categoryId === undefined) throw new Error('Category Id was not given')
    const response = await fetch(`${BASE_BACK_URL}/products/categories/${categoryId}/`)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.log('Error response =====> ', errorResponse)
      throw new Error('We couldn\'t get that')
    }
    return await response.json()
  },
  filteredProducts: async (params: string) => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/products/products${params}`,
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

'use server'

import type { IProduct, IProductPost } from '@/interfaces/product'
import { revalidatePath } from 'next/cache'
import { BASE_URL } from './utils'

// Categories
export async function fetchAllCategories () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products/categories/`, requestOptions
  )
  if (!response.ok) {
    throw new Error('Error al cargar las categorías')
  }
  const data = await response.json()

  // await new Promise((resolve) => setTimeout(resolve, 5000))

  return data
}

// Products
export async function fetchAllProducts () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products/products/`, requestOptions
  )
  if (!response.ok) {
    throw new Error('Error al cargar los productos')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

export async function createProduct (product: IProductPost) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/products/products/`,
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Error al crear el producto')
  }
  // await new Promise((resolve) => setTimeout(resolve, 7000))

  return await response.json()
}

export const addProduct = async (formData: FormData, storeId: string | number) => {
  const productBody: IProductPost = {
    category: Number(formData.get('category')),
    variants: [],
    name: formData.get('name') as string,
    main_image: formData.get('main_image') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    store: Number(storeId)
  }
  // console.log(productBody)
  await createProduct(productBody)

  revalidatePath('dulce-trago/admin')
}

export async function deleteProduct (productId: number) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/products/products/${productId}`,
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Error al eliminar el producto')
  }

  // console.log(response.json())
  revalidatePath('dulce-trago/admin')

  // return await response.json()
}

// export async function fetchFilteredProducts (currentCategoryId: string) {
//   const baseURL = `${BASE_URL}/products/products?store=2&limit=5&offset=0'
//   const finalURL = baseURL + `&category=${currentCategoryId}`

//   const response = await fetch((currentCategoryId !== undefined) ? finalURL : baseURL)
//   if (!response.ok) {
//     throw new Error('Error al cargar los productos FILTRADOS')
//   }

//   // await new Promise((resolve) => setTimeout(resolve, 2000))
//   return await response.json()
// }

export async function fetchFilteredProducts (shopId: string | number, currentCategoryId?: string, offset?: string, resultsPeerPage?: number) {
// Assuming each page has 5 items
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const baseURL = `${BASE_URL}/products/products?store=${shopId}`

  // Construct URL with dynamic offset and category
  let finalURL = `${baseURL}&limit=${resultsPeerPage}&offset=${offset}`
  if (currentCategoryId !== undefined) {
    finalURL += `&category=${currentCategoryId}`
  }

  const response = await fetch(finalURL, requestOptions)
  if (!response.ok) {
    console.log(response.ok)

    throw new Error('Error al cargar los productos FILTRADOS')
  }
  await new Promise((resolve) => setTimeout(resolve, 4000))
  return await response.json()
}

// ADMIN CRUD

// <============================================== STORES ==========================================>
export async function fetchAllStores () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/stores/`, requestOptions
  )
  if (!response.ok) {
    throw new Error('Error al cargar las stores')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

export async function fetchStoreById (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/stores/${storeId}`, requestOptions
  )
  if (!response.ok) {
    return null
    // throw new Error('Error al cargar la store usando el storeId')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
  // return { error: false, store: data }
}

export async function fetchAllStoreProducts (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products/products?store=${storeId}`, requestOptions
  )
  if (!response.ok) {
    return null
    // throw new Error('Error al cargar la store usando el storeId')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
  // return { error: false, store: data }
}

'use server'

import type { IProduct, IProductPost } from '@/interfaces/product'
import { revalidatePath } from 'next/cache'

// Categories
export async function fetchAllCategories () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/categories/', requestOptions
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
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/', requestOptions
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
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products/',
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Error al crear el producto')
  }

  return await response.json()
}

export const addProduct = async (formData: FormData) => {
  const productBody: IProductPost = {
    category: Number(formData.get('category')),
    variants: [],
    name: formData.get('name') as string,
    main_image: formData.get('main_image') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    store: 2
  }
  // console.log(productBody)
  await createProduct(productBody)

  revalidatePath('dulce-trago/admin')
}

// export async function fetchFilteredProducts (currentCategoryId: string) {
//   const baseURL = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products?store=2&limit=5&offset=0'
//   const finalURL = baseURL + `&category=${currentCategoryId}`

//   const response = await fetch((currentCategoryId !== undefined) ? finalURL : baseURL)
//   if (!response.ok) {
//     throw new Error('Error al cargar los productos FILTRADOS')
//   }

//   // await new Promise((resolve) => setTimeout(resolve, 2000))
//   return await response.json()
// }

export async function fetchFilteredProducts (currentCategoryId: string, offset: number, resultsPeerPage: number) {
// Assuming each page has 5 items
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const baseURL = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products?store=2'

  // Construct URL with dynamic offset and category
  let finalURL = `${baseURL}&limit=${resultsPeerPage}&offset=${offset}`
  if (currentCategoryId !== undefined) {
    finalURL += `&category=${currentCategoryId}`
  }

  const response = await fetch(finalURL, requestOptions)
  if (!response.ok) {
    throw new Error('Error al cargar los productos FILTRADOS')
  }
  // await new Promise((resolve) => setTimeout(resolve, 4000))
  return await response.json()
}

// ADMIN CRUD

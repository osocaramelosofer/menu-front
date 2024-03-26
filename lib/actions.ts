'use server'

import type { ICategoryPost, IProductPost } from '@/interfaces/product'
import { revalidatePath } from 'next/cache'
import { BASE_URL } from './utils'

// STORE

// Categories
export async function fetchAllCategories () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products/categories/`,
    requestOptions
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
  const response = await fetch(`${BASE_URL}/products/products/`, requestOptions)
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

  const response = await fetch(`${BASE_URL}/products/`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al crear el producto')
  }
  // await new Promise((resolve) => setTimeout(resolve, 7000))

  return await response.json()
}

export const addProduct = async (
  formData: FormData,
  storeId: string | number
) => {
  const image = formData.get('image') as string
  const imageToSend = image === '' ? null : image
  const productBody: IProductPost = {
    // main_image: formData.get('main_image') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    categoryId: Number(formData.get('category')),
    storeId: Number(storeId),
    image: imageToSend
  }
  // console.log(productBody)
  await createProduct(productBody)

  revalidatePath(`/${storeId}/dashboard`)
}

export async function createCategory (category: ICategoryPost) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(`${BASE_URL}/categories/`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al crear la categoría')
  }
  // await new Promise((resolve) => setTimeout(resolve, 7000))

  return await response.json()
}

export const addCategory = async (
  formData: FormData,
  storeId: string | number
) => {
  const productBody: ICategoryPost = {
    name: formData.get('name') as string,
    storeId: Number(storeId)
  }
  // console.log(productBody)
  await createCategory(productBody)

  revalidatePath(`${storeId}/dashboard`)
}

// export async function deleteProduct (productId: number) {
//   const requestOptions: RequestInit = {
//     method: 'DELETE',
//     redirect: 'follow',
//     cache: 'no-store'
//   }

//   const response = await fetch(
//     `${BASE_URL}/products/${productId}`,
//     requestOptions
//   )

//   if (!response.ok) {
//     throw new Error('Error al eliminar el producto')
//   }

// }
export async function deleteProduct (productId: number) {
  return await new Promise((resolve, reject) => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
      cache: 'no-store'
    }

    fetch(`${BASE_URL}/products/${productId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el producto')
        }
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function deleteProduct2 (productId: number | string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/products/${productId}`,
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Error al eliminar el producto')
  }
  // await new Promise((resolve) => setTimeout(resolve, 7000))

  return response.ok
}

export const removeProduct = async (formData: FormData) => {
  const productId = formData.get('productId') as string

  await deleteProduct2(productId)
  // await mutate()
  revalidatePath('/dashboard')
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

// export async function fetchFilteredProducts (
//   shopId: string | number,
//   currentCategoryId?: string,
//   currentPage?: string,
//   resultsPeerPage?: number
// ) {
//   // Assuming each page has 5 items
//   const requestOptions: RequestInit = {
//     method: 'GET',
//     redirect: 'follow',
//     cache: 'no-store'
//   }
//   const baseURL = `${BASE_URL}/products?store=${shopId}`

//   // Construct URL with dynamic offset and category
//   let finalURL = `${baseURL}&resultsPerPage=${resultsPeerPage}&page=${currentPage}`
//   if (currentCategoryId !== undefined) {
//     finalURL += `&category=${currentCategoryId}`
//   }

//   console.log('FINAL URL: ', finalURL)

//   const response = await fetch(finalURL, requestOptions)
//   if (!response.ok) {
//     console.log(response.ok)

//     throw new Error('Error al cargar los productos FILTRADOS')
//   }
//   await new Promise(resolve => setTimeout(resolve, 4000))
//   return await response.json()
// }

// ADMIN CRUD

// <============================================== STORES ==========================================>
export async function fetchAllStores () {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(`${BASE_URL}/stores/`, requestOptions)
  if (!response.ok) {
    throw new Error('Error al cargar las stores')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

// export async function fetchStoreById (storeId: number | string) {
//   const requestOptions: RequestInit = {
//     method: 'GET',
//     redirect: 'follow',
//     cache: 'no-store'
//   }
//   const response = await fetch(`${BASE_URL}/stores/${storeId}`, requestOptions)
//   if (!response.ok) {
//     return null
//   }
//   const data = await response.json()
//   // await new Promise((resolve) => setTimeout(resolve, 10000))
//   return data
// }

export async function fetchAllStoreProducts (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products?store=${storeId}`,
    requestOptions
  )
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  // await new Promise(resolve => setTimeout(resolve, 5000))
  return data
}

export async function fetchTop10StoreProducts (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/products?store=${storeId}&resultsPerPage=3`,
    requestOptions
  )
  if (!response.ok) {
    return null
    // throw new Error('Error al cargar la store usando el storeId')
  }
  const data = await response.json()
  // await new Promise(resolve => setTimeout(resolve, 4000))

  return data
}

export async function fetchPaginatedProducts (url: string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(url, requestOptions)
  if (!response.ok) {
    // console.log(response.ok)

    throw new Error('Error al cargar los productos FILTRADOS')
  }
  // await new Promise(resolve => setTimeout(resolve, 4000))
  return await response.json()
}

// ===========================USERS (ADMINS) ========
export async function fetchUserByEmail (userEmail: string | undefined | null) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/users/user/${userEmail}`,
    requestOptions
  )
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

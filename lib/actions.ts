'use server'

// Categories
export async function fetchAllCategories () {
  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/categories'
  )
  if (!response.ok) {
    throw new Error('Error al cargar las categorías')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return data
}

// Products
export async function fetchAllProducts () {
  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products'
  )
  if (!response.ok) {
    throw new Error('Error al cargar los productos')
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

export async function fetchFilteredProducts (currentCategoryId: string) {
  const baseURL = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products'
  const finalURL = baseURL + `?category=${currentCategoryId}`

  const response = await fetch((currentCategoryId !== undefined) ? finalURL : baseURL)
  if (!response.ok) {
    throw new Error('Error al cargar los productos FILTRADOS')
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return await response.json()
}

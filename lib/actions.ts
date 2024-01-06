'use server'

// Categories
export async function fetchAllCategories () {
  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/categories'
  )
  if (!response.ok) {
    throw new Error('Error al cargar las categorías')
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000))
  return await response.json()
}

// Products
export async function fetchAllProducts () {
  const response = await fetch(
    'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products'
  )
  if (!response.ok) {
    throw new Error('Error al cargar los productos')
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return await response.json()
}

export async function fetchFilteredProducts (categoryQuery: string) {
  const baseURL = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/products/products'
  const finalURL = baseURL + categoryQuery
  const response = await fetch(finalURL)
  if (!response.ok) {
    throw new Error('Error al cargar los productos FILTRADOS')
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000))
  return await response.json()
}

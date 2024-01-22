'use server'

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

  return await response.json()
}

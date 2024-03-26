import { BASE_URL } from '../utils'

export async function deleteProductAction (productId: number | string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/products/${productId}`,
    requestOptions
  )
  const data = await response.json()
  if (!response.ok) {
    throw new Error('Error al eliminar el producto')
  }
  await new Promise(resolve => setTimeout(resolve, 3000))

  return data
}

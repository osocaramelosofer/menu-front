'use server'
import type { ICategoryPost } from '@/interfaces/product'
import { revalidatePath } from 'next/cache'
import { BASE_URL } from '../utils'

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

  revalidatePath(`/${storeId}/dashboard`)
}

export async function deleteCategoryAction (categoryId: number | string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/categories/${categoryId}`,
    requestOptions
  )
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al eliminar la categoría y sus productos')
  }
  //   await new Promise(resolve => setTimeout(resolve, 5000))
  revalidatePath('/dashboard')

  return data
}

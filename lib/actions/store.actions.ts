'use server'

import type {
  ICategoryPost,
  IProduct,
  IProductPost
} from '@/interfaces/product'
import { revalidatePath } from 'next/cache'
import { BASE_URL } from '../utils'
import type { IStoreForm, IStore } from '@/interfaces/store'

// STORE CRUD ACTIONS

// CREATE (POST) ONLY MENU-APP ADMIN CAN CREATE NEW STORES, USERS CAN NOT DO IT.

// Once a store has been created and admin user is assigned to the store, the admin user can READ and UPDATE the store info.

// ==================== READ (GET) ====================
// GET-ALL
// Used in: app/page.tsx
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

  return data
}

// GET-BY-ID
// Used in: app/(stores)/[storeId]/page.tsx, app/(stores)/[storeId]/dashboard/page.tsx
export async function fetchStoreById (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(`${BASE_URL}/stores/${storeId}`, requestOptions)
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}

// ==================== UPDATE (PATCH) ====================
export async function updateStoreById (
  store: IStoreForm,
  storeId: string | number
) {
  const requestOptions: RequestInit = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(store),
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(`${BASE_URL}/stores/${storeId}`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al actualizar la tienda')
  }
  const data = await response.json()

  return data
}

export const handleUpdateStore = async (
  formData: FormData,
  storeId: string | number
) => {
  const storeBody = {
    name: formData.get('name') as string,
    description: formData.get('description') as string
  }
  await updateStoreById(storeBody, storeId)

  revalidatePath(`${storeId}/dashboard`)
}

// PATCH

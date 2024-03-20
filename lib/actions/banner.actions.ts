'use server'

import type { IBannerPost } from '@/interfaces/product'
import { revalidatePath } from 'next/cache'
import { BASE_URL } from '../utils'

// Banner CRUD ACTIONS

export async function fetchAllStoreBanners (storeId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(
    `${BASE_URL}/banners?store=${storeId}`,
    requestOptions
  )
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  // await new Promise(resolve => setTimeout(resolve, 10000))
  return data
}

// Banners
export async function createBanner (banner: IBannerPost) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(banner),
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(`${BASE_URL}/banners/`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al crear el banner')
  }
  return await response.json()
}

export const addBanner = async (
  formData: FormData,
  storeId: string | number
) => {
  const image = formData.get('image') as string
  const imageToSend = image === '' ? 'https://i.imgur.com/uuxplVhl.png' : image

  const bannerBody: IBannerPost = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    description: formData.get('description') as string,
    image: imageToSend,
    storeId: Number(storeId)
  }
  // console.log(bannerBody)
  await createBanner(bannerBody)

  revalidatePath(`${storeId}/dashboard`)
}

export async function deleteBanner (bannerId: number) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(
    `${BASE_URL}/banners/${bannerId}`,
    requestOptions
  )

  if (!response.ok) {
    throw new Error('Error al eliminar el banner')
  }

  revalidatePath('/dashboard')
}

// {
//     "isShared": true,
//     "storeId": 2,
//     "userOrders": [
//       {
//         "username": "User123",
//         "cartPrice": 120.00,
//         "cartList": [
//           {
//             "productId": 7,
//             "quantity": 9
//           },
//           {
//             "productId": 8,
//             "quantity": 4
//           }
//         ]
//       },
//       {
//         "username": "User456",
//         "cartPrice": 76.00,
//         "cartList": [
//           {
//             "productId": 8,
//             "quantity": 2
//           }
//         ]
//       }
//     ]
//   }

import type { IOrder } from '@/interfaces/order'
import { BASE_URL } from '../utils'
import { redirect } from 'next/navigation'

// Create Orders
export async function createOrder (order: IOrder) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(`${BASE_URL}/orders/`, requestOptions)

  if (!response.ok) {
    throw new Error('Error al crear la orden')
  }
  const data = await response.json()
  // redirect(`/thank-you/${data.id}`)
  return data
}

// Get order by ID
export async function fetchOrderById (orderId: number | string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }
  const response = await fetch(`${BASE_URL}/orders/${orderId}`, requestOptions)
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  return data
}
//   export const addOrder = async (
//     formData: FormData,
//     storeId: string | number
//   ) => {

//     const bannerBody: IOrder = {
//       title: formData.get('title') as string,
//       subtitle: formData.get('subtitle') as string,
//       description: formData.get('description') as string,
//       image: imageToSend,
//       storeId: Number(storeId)
//     }
//     // console.log(bannerBody)
//     await createBanner(bannerBody)

//     revalidatePath(`${storeId}/dashboard`)
//   }

export async function fetchPaginatedOrders (url: string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    cache: 'no-store'
  }

  const response = await fetch(url, requestOptions)
  if (!response.ok) {
    // console.log(response.ok)

    throw new Error('Error al cargar las orders FILTRADAS')
  }
  // await new Promise(resolve => setTimeout(resolve, 4000))
  return await response.json()
}

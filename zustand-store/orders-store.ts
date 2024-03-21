import type React from 'react'
import type { IOrder, IUserOrders } from '@/interfaces/order'
import type { IProduct } from '@/interfaces/product'
import { createOrder } from '@/lib/actions/order.actions'
import { create } from 'zustand'
import { redirect } from 'next/navigation'
import type { ISharedCartList } from './carts-store'

// Definimos la interfaz para el estado y las acciones de la store
interface OrderState {
  paymentType: string
  loading: boolean
  setPaymentType: (value: any) => void
  createIOrderObject: (
    cartList: IProduct[],
    cartPrice: number,
    username: string,
    storeId: number,
    isShared: boolean
  ) => IOrder
  handleOrderCreation: (
    cartList: IProduct[],
    cartPrice: number,
    username: string,
    storeId: number
  ) => Promise<IOrder>
  // ...other state and actions
  handleSharedOrderCreation: (
    sharedCartList: ISharedCartList[],
    storeId: number
  ) => Promise<IOrder>
}

interface SharedOrderState {
  // ...other state and actions
  handleSharedOrderCreation: (
    sharedCartList: ISharedCartList[],
    storeId: number
  ) => Promise<IOrder>
}

// Creación de la store usando Zustand
export const useOrderStore = create<OrderState>((set, get) => ({
  paymentType: '',
  loading: false,

  // Acción para actualizar el tipo de pago
  setPaymentType: (value: any) => {
    set({ paymentType: value.target.value })
  },

  // Función para crear el objeto de la orden
  createIOrderObject: (
    cartList: IProduct[],
    cartPrice: number,
    username: string,
    storeId: number,
    isShared: boolean
  ) => {
    const userOrder: IUserOrders = {
      username,
      cartPrice,
      cartList: cartList.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }

    const order: IOrder = {
      paymentType: get().paymentType,
      isShared,
      storeId,
      userOrders: [userOrder]
    }

    return order
  },

  // Acción para manejar la creación de la orden
  handleOrderCreation: async (
    cartList: IProduct[],
    cartPrice: number,
    username: string,
    storeId: number
  ) => {
    set({ loading: true })
    const { createIOrderObject, paymentType } = get()
    // Aquí debes asegurarte de que tienes acceso a cartList, cartPrice, username y storeId

    const isShared = false

    try {
      const order = createIOrderObject(
        cartList,
        cartPrice,
        username,
        storeId,
        isShared
      )
      // Aquí debes reemplazar `createOrder` con la lógica para realizar la solicitud de creación de la orden.
      const createdOrder = await createOrder(order)

      console.log('Order created successfully:', createdOrder)
      console.log('Order created successfully IDDDDDDDDDD:', createdOrder.id)
      return createdOrder

      // Lógica adicional después de la creación de la orden si es necesaria
    } catch (error) {
      console.error('Failed to create order:', error)
      // Lógica de manejo de errores
    } finally {
      set({ loading: false })
    }
  },
  handleSharedOrderCreation: async (
    sharedCartList: ISharedCartList[],
    storeId: number
  ) => {
    set({ loading: true })
    const { paymentType } = get()

    try {
      const userOrders: IUserOrders[] = sharedCartList.map(sharedCart => {
        return {
          username: sharedCart.username,
          cartPrice: sharedCart.cartPrice,
          cartList: sharedCart.cartList.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      })

      const order: IOrder = {
        isShared: true,
        storeId,
        paymentType,
        userOrders
      }

      // Use the created order object to make an API request or whatever is needed
      const createdOrder = await createOrder(order)
      console.log('Order created successfully:', createdOrder)

      return createdOrder
    } catch (error) {
      console.error('Failed to create shared order:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  }
}))

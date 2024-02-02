import { create } from 'zustand'
import { produce } from 'immer'
import { type IProduct } from '@/interfaces/product'

interface CartState {
  loading: boolean
  cartPrice: number
  cartList: IProduct[]

  addToCart: (product: IProduct) => void
  incrementCartItemQuantity: (id: number) => void
  decrementCartItemQuantity: (id: number) => void
  removeCartItem: (id: number) => void
  calculateCartPrice: () => void

  // Manage the Cart Modal Status
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void

}

export const useCartsStore = create<CartState>((set, get) => {
  return {
    loading: false,
    cartPrice: 0,
    cartList: [],
    isModalOpen: false,
    openModal: () => { set({ isModalOpen: true }) },
    closeModal: () => { set({ isModalOpen: false }) },

    addToCart: (cartItem: IProduct) => {
      set(
        produce(state => {
          const foundProductIndex = state.cartList.findIndex(
            (item: { id: number }) => item.id === cartItem.id
          )

          if (foundProductIndex !== -1) {
            // Producto ya existe en el carrito, asegúrate de que quantity sea un número
            if (typeof state.cartList[foundProductIndex].quantity === 'number') {
              state.cartList[foundProductIndex].quantity += 1
            } else {
              // Si por alguna razón quantity no es un número, inicialízalo como 1
              state.cartList[foundProductIndex].quantity = 1
            }
          } else {
            // Producto nuevo, añadir al carrito con cantidad inicial de 1
            state.cartList.push({
              ...cartItem,
              quantity: 1
            })
          }
        })
      )
    },

    incrementCartItemQuantity: (id: number) => {
      set(
        produce(state => {
          const foundProductIndex = state.cartList.findIndex((item: { id: number }) => item.id === id)
          if (foundProductIndex !== -1) {
            // Producto encontrado, comprobar explícitamente que quantity es un número
            const currentQuantity = typeof state.cartList[foundProductIndex].quantity === 'number'
              ? state.cartList[foundProductIndex].quantity
              : 0
            state.cartList[foundProductIndex].quantity = currentQuantity + 1
          }
        })
      )
    },

    decrementCartItemQuantity: (id: number) => {
      set(
        produce(state => {
          const foundProductIndex = state.cartList.findIndex((item: { id: number }) => item.id === id)
          if (foundProductIndex !== -1) {
            // Producto encontrado, decrementar cantidad
            const currentQuantity = state.cartList[foundProductIndex].quantity
            if ((Boolean(currentQuantity)) && currentQuantity > 1) {
              state.cartList[foundProductIndex].quantity = currentQuantity - 1
            }
            // else if (currentQuantity === 1) {
            //   state.cartList.splice(foundProductIndex, 1)
            // }
          }
        })
      )
    },
    removeCartItem: (id: number) => {
      set(
        produce(state => {
          const foundProductIndex = state.cartList.findIndex((item: { id: number }) => item.id === id)
          if (foundProductIndex !== -1) {
            // Producto encontrado, eliminar del array
            state.cartList.splice(foundProductIndex, 1)
          }
        })
      )
    },

    calculateCartPrice: () => {
      set(
        produce(state => {
          let totalPrice = 0
          state.cartList.forEach((cartItem: IProduct) => {
            const price = parseFloat(cartItem.price)
            // Si price es NaN, usa 0; de lo contrario, usa el valor de price.
            const validPrice = Number.isNaN(price) ? 0 : price
            const quantity = cartItem.quantity // Suponiendo que quantity es un número válido o 0.
            const validQuantity = Number.isNaN(quantity) ? 0 : quantity
            totalPrice += validPrice * validQuantity
          })
          // Actualiza el precio total del carrito en el estado.
          state.cartPrice = totalPrice.toFixed(2).toString()
        })
      )
    }

  }
})

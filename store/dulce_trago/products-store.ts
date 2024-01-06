import { create } from 'zustand'
import type { IProduct } from '@/interfaces/product'
import { fetchAllProducts } from '@/lib/actions'

interface State {
  loading: boolean
  products: IProduct[]

  getProductsList: () => void
}

export const useProductsStore = create<State>((set, get) => {
  return {
    loading: true,
    products: [],

    getProductsList: () => {
      set({ loading: true })
      fetchAllProducts()
        .then((response) => {
          set({ products: response })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          set({ loading: false })
        })
    }

  }
})

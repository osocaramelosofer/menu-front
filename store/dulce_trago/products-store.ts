import { create } from 'zustand'
import type { IProduct } from '@/interfaces/product'
import { fetchAllProducts } from '@/lib/actions'

interface State {
  loading: boolean
  products: IProduct[]
  selectedProduct: IProduct | null
  setSelectedProduct: (product: IProduct) => void

  getProductsList: () => void
}

export const useProductsStore = create<State>((set, get) => {
  return {
    loading: true,
    products: [],
    selectedProduct: null,
    setSelectedProduct: (product: IProduct) => {
      set({ selectedProduct: product })
    },
    getProductsList: () => {
      set({ loading: true })
      fetchAllProducts()
        .then((response) => {
          set({ products: response })
          console.log('ALL PRODUCTS: ', response)
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

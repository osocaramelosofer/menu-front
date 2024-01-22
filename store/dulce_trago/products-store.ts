import { create } from 'zustand'
import type { IProduct } from '@/interfaces/product'
import { fetchAllProducts } from '@/lib/actions'

interface State {
  loading: boolean
  products: IProduct[]
  selectedProduct: IProduct | null
  setSelectedProduct: (product: IProduct) => void

  resultsPeerPage: number

  getProductsList: () => void

  // Manage the Product Detail Modal Status
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useProductsStore = create<State>((set, get) => {
  return {
    loading: true,
    products: [],
    selectedProduct: null,
    resultsPeerPage: 5,

    isModalOpen: false,
    openModal: () => { set({ isModalOpen: true }) },
    closeModal: () => { set({ isModalOpen: false }) },

    setSelectedProduct: (product: IProduct) => {
      set({ selectedProduct: product })
    },
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

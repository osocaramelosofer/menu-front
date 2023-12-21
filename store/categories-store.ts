import { fetchAllCategories } from '@/lib/actions'
import { create } from 'zustand'

interface Category {
  id: number
  name: string
  description: string
}

interface State {
  loading: boolean
  categories: Category[]
  selectedCategoryId: number | null
  getCategoriesList: () => void
  selectCategory: (categoryId: number | null) => void
  // getFilteredProducts: (params: string) => Promise<void>
}

export const useCategoriesStore = create<State>((set, get) => {
  return {
    loading: false,
    categories: [],
    selectedCategoryId: null,
    getCategoriesList: () => {
      set({ loading: true })
      fetchAllCategories()
        .then((response) => {
          console.log(response)
          set({ categories: response })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          console.log('finally! get categories list')
          set({ loading: false })
        })
    },
    selectCategory: (categoryId: number | null) => {
      set({ selectedCategoryId: categoryId })
    }
    // getFilteredProducts: async (params) => {
    //   await api.filteredProducts(params)
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //     .finally(() => {
    //       console.log('finally! get products')
    //     })
    // }
  }
})

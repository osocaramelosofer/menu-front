import { fetchAllCategories } from '@/lib/actions'
import { type Category } from '@/interfaces/product'
import { create } from 'zustand'

interface State {
  loading: boolean
  categories: Category[]
  currentCategory: Category

  getCategoriesList: () => void
  setCurrentCategory: (category: Category) => void
  resetCurrentCategory: () => void
  getInitialCategory: () => Category
}

const initialCategoryState: Category = {
  id: null,
  name: 'Todos',
  description: 'Todos los productos'
}

export const useCategoriesStore = create<State>((set, get) => {
  return {
    loading: true,
    categories: [],
    currentCategory: initialCategoryState,
    getCategoriesList: () => {
      set({ loading: true })
      fetchAllCategories()
        .then((response) => {
          set({ categories: response.results })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          set({ loading: false })
        })
    },

    setCurrentCategory: (category) => {
      set({ currentCategory: category })
    },
    resetCurrentCategory: () => {
      set({ currentCategory: initialCategoryState })
    },
    getInitialCategory: () => {
      return initialCategoryState
    }

  }
})

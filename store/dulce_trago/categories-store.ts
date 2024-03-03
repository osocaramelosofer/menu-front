import { fetchAllCategories } from '@/lib/actions'
import { type Category } from '@/interfaces/product'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
  id: 0,
  name: 'Todos',
  description: 'Todos los productos'
}

export const useCategoriesStore = create<State>()(
  persist(
    (set, get) => ({
      loading: true,
      categories: [],
      currentCategory: initialCategoryState,
      getCategoriesList: () => {
        set({ loading: true })
        fetchAllCategories()
          .then((response) => {
            set({ categories: response })
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
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

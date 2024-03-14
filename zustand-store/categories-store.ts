import { fetchAllCategories } from '@/lib/actions'
import { type ICategory } from '@/interfaces/product'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
  loading: boolean
  categories: ICategory[]
  currentCategory: ICategory

  getCategoriesList: () => void
  setCurrentCategory: (category: ICategory) => void
  resetCurrentCategory: () => void
  getInitialCategory: () => ICategory
}

const initialCategoryState: ICategory = {
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
          .then(response => {
            set({ categories: response })
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set({ loading: false })
          })
      },

      setCurrentCategory: category => {
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

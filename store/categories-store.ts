import { getCategories, getProducts } from '@/lib/actions';
import { create } from 'zustand';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface State {
  loading: boolean;
  categories: Category[];
  getCategoriesList: () => void;
  getMenuItems: (params: string) => Promise<void>;
}

export const useCategoriesStore = create<State>((set, get) => {
  return {
    loading: false,
    categories: [],
    getCategoriesList: () => {
      set({ loading: true });
      getCategories()
        .then((response) => {
          console.log(response);
          set({ categories: response });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('finally! get categories list');
          set({ loading: false });
        });
    },
    getMenuItems: async (params) => {
      getProducts(params)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log('finally! get products');
        });
    },
  };
});

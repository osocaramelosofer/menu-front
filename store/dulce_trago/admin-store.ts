import { create } from 'zustand'

interface State {
  loading: boolean

  // Manage the Product Detail Modal Status
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useAdminStore = create<State>((set, get) => {
  return {
    loading: true,

    isModalOpen: false,
    openModal: () => { set({ isModalOpen: true }) },
    closeModal: () => { set({ isModalOpen: false }) }

  }
})

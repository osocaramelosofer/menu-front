import { create } from 'zustand'

type ModalId = 'storeModal' | 'productCategoryModal' | 'bannerModal'
type ModalState = Record<ModalId, boolean>

interface State {
  loading: boolean
  modals: ModalState
  openModal: (id: ModalId) => void
  closeModal: (id: ModalId) => void
  isModalOpen: (id: ModalId) => boolean
}

export const useAdminStore = create<State>((set, get) => ({
  loading: true,

  modals: {
    storeModal: false,
    productCategoryModal: false,
    bannerModal: false
  },

  openModal: (id: ModalId) => {
    set(state => ({ modals: { ...state.modals, [id]: true } }))
  },

  closeModal: (id: ModalId) => {
    set(state => ({ modals: { ...state.modals, [id]: false } }))
  },

  isModalOpen: (id: ModalId) => {
    const modals = get().modals
    return !!modals[id]
  }
}))

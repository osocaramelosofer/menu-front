'use client'
import type { IStore } from '@/interfaces/store'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { useAdminStore } from '@/zustand-store/admin-store'
import StoreForm from '../forms/store-form'

export default function StoreModal ({ store }: { store: IStore }) {
  const { isModalOpen, closeModal } = useAdminStore()

  const handleCloseModal = () => {
    closeModal('storeModal')
  }

  return (
    <Modal
      backdrop='opaque'
      isOpen={isModalOpen('storeModal')}
      onClose={handleCloseModal}
      radius='lg'
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader>Tu negocio</ModalHeader>
        <ModalBody>
          <StoreForm store={store} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

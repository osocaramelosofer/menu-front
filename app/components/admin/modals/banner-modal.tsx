'use client'
import type { IStore } from '@/interfaces/store'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { BannerForm } from '../forms'
import { useAdminStore } from '@/zustand-store/admin-store'
import clsx from 'clsx'

export default function BannerModal ({ store }: { store: IStore }) {
  const { isModalOpen, closeModal } = useAdminStore()

  const handleCloseModal = () => {
    closeModal('bannerModal')
  }

  return (
    <Modal
      backdrop='opaque'
      disableAnimation
      isOpen={isModalOpen('bannerModal')}
      onClose={handleCloseModal}
      radius='lg'
      scrollBehavior='inside'
      className={clsx('', store.themeColor ?? '')}
    >
      <ModalContent>
        <ModalHeader>Agrega un Banner</ModalHeader>
        <ModalBody>
          <BannerForm storeId={store.id} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

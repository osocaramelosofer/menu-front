'use client'

import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import AdminProductForm from './admin-product-form'
import { useAdminStore } from '@/store/dulce_trago/admin-store'
import type { Category } from '@/interfaces/product'

export default function AddNewProductModal ({
  categories,
  storeId
}: {
  categories: Category[]
  storeId: string | number
}) {
  const { isModalOpen, closeModal } = useAdminStore()

  return (
    <Modal
      backdrop='opaque'
      isOpen={isModalOpen}
      onClose={closeModal}
      radius='lg'
      scrollBehavior='inside'
    >
      <ModalContent>
        {closeModal => (
          <>
            <ModalHeader>¡Pon algo a la venta!</ModalHeader>
            <ModalBody>
              <AdminProductForm categories={categories} storeId={storeId} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

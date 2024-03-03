'use client'

import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import AdminProductForm from './admin-product-form'
import { useAdminStore } from '@/store/dulce_trago/admin-store'
import { useCategoriesStore } from '@/store/dulce_trago/categories-store'
import { useEffect } from 'react'
import type { Category } from '@/interfaces/product'

export default function AddNewProductModal ({
  categories
}: {
  categories: Category[]
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
              <AdminProductForm categories={categories} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

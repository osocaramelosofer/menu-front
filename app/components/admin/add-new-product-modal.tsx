'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab
} from '@nextui-org/react'
import AdminProductForm from './admin-product-form'
import { useAdminStore } from '@/store/dulce_trago/admin-store'
import type { Category } from '@/interfaces/product'
import AdminCategoryForm from './admin-category-form'
import { useState } from 'react'

export default function AddNewProductModal ({
  categories,
  storeId
}: {
  categories: Category[]
  storeId: string | number
}) {
  const { isModalOpen, closeModal } = useAdminStore()
  const [selected, setSelected] = useState<any>('products')

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
              <Tabs
                size='md'
                aria-label='Tabs form'
                selectedKey={selected}
                onSelectionChange={setSelected}
                fullWidth
                color='warning'
              >
                <Tab key='products' title='Productos'>
                  <AdminProductForm
                    categories={categories}
                    storeId={storeId}
                    changeTab={() => setSelected('categories')}
                  />
                </Tab>
                <Tab key='categories' title='Categorías'>
                  <AdminCategoryForm
                    storeId={storeId}
                    changeTab={() => setSelected('products')}
                  />
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

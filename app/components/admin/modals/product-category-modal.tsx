'use client'

import { useState } from 'react'
import type { ICategory } from '@/interfaces/product'
import type { IStore } from '@/interfaces/store'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab,
  Chip
} from '@nextui-org/react'
import { useAdminStore } from '@/zustand-store/admin-store'
import { ProductForm, CategoryForm } from '../forms'
import clsx from 'clsx'

export default function ProductCategoryModal ({
  categories,
  store
}: {
  categories: ICategory[]
  store: IStore
}) {
  const { isModalOpen, closeModal } = useAdminStore()
  const [selectedTab, setSelectedTab] = useState<any>('products')

  const handleCloseModal = () => {
    closeModal('productCategoryModal')
  }

  return (
    <Modal
      backdrop='opaque'
      isOpen={isModalOpen('productCategoryModal')}
      onClose={handleCloseModal}
      radius='lg'
      scrollBehavior='inside'
      className={clsx(' min-h-[90vh]', store.themeColor ?? '')}
    >
      <ModalContent>
        <ModalHeader>¡Pon algo a la venta!</ModalHeader>
        <ModalBody className=' w-full h-full'>
          <Tabs
            fullWidth
            size='sm'
            color='warning'
            variant='underlined'
            className=' shadow-none'
            aria-label='Tabs form'
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <Tab key='products' title='Productos'>
              <ProductForm
                categories={categories}
                storeId={store.id}
                changeTab={() => {
                  setSelectedTab('categories')
                }}
              />
            </Tab>
            <Tab key='categories' title='Categorías'>
              <p className=' font-medium text-sm'>
                Tus categorías ({categories?.length})
              </p>
              <div className=' flex flex-wrap gap-2 mt-3 mb-6'>
                {categories?.map(category => (
                  <Chip key={category.id} size='sm'>
                    {category.name}
                  </Chip>
                ))}
              </div>
              <CategoryForm
                storeId={store.id}
                changeTab={() => {
                  setSelectedTab('products')
                }}
              />
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

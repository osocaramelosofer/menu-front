'use client'

import { Button } from '@nextui-org/react'

import { useAdminStore } from '@/zustand-store/admin-store'
import { FaPlus } from 'react-icons/fa'

export default function AddProductButton () {
  const { openModal } = useAdminStore()

  const handleOpenModal = () => {
    openModal('productCategoryModal')
  }

  return (
    <footer className='flex flex-col w-fit self-center gap-3 mt-3 sticky bottom-10 z-20'>
      <Button
        startContent={<FaPlus />}
        color='primary'
        className=' text-white'
        onPress={handleOpenModal}
      >
        Agregar producto o categoría
      </Button>
    </footer>
  )
}

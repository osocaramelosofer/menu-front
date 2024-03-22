'use client'

import { Button } from '@nextui-org/react'

import { useAdminStore } from '@/zustand-store/admin-store'
import { FaPlus } from 'react-icons/fa'

export default function AddProductCategoryButton ({ label }: { label: string }) {
  const { openModal } = useAdminStore()

  const handleOpenModal = () => {
    openModal('productCategoryModal')
  }

  return (
    <footer className='flex flex-col w-fit '>
      <Button
        size='sm'
        startContent={<FaPlus />}
        color='primary'
        className=' text-white'
        onPress={handleOpenModal}
      >
        {label}
      </Button>
    </footer>
  )
}

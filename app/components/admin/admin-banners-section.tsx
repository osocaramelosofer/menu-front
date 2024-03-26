'use client'
import { Button } from '@nextui-org/react'

import { useAdminStore } from '@/zustand-store/admin-store'
import BannersCarousel from '../carousel/banners-carousel'
import type { IBanner } from '@/interfaces/store'
import { FaPlus } from 'react-icons/fa'
import EmptyData from '../common/empty-data'

export default function AdminBannersSection ({
  banners
}: {
  banners: IBanner[]
}) {
  const { openModal } = useAdminStore()

  const handleOpenModal = () => {
    openModal('bannerModal')
  }

  return (
    <section className=' flex flex-col gap-4 relative'>
      <div className=' flex w-full items-center justify-between'>
        <h2 className='font-semibold text-lg'>Banners ({banners.length})</h2>
        <Button
          onPress={handleOpenModal}
          startContent={<FaPlus />}
          color='primary'
          className=' text-white'
          size='sm'
        >
          Nuevo Banner
        </Button>
      </div>

      <BannersCarousel showOptions data={banners} />
    </section>
  )
}

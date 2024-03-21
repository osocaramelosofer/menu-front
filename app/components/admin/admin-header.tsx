'use client'

import type { Session } from 'next-auth'
import { Button, User } from '@nextui-org/react'

import { useAdminStore } from '@/zustand-store/admin-store'
import { FaCog, FaSignOutAlt } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

export default function AdminHeader ({ session }: { session: Session | null }) {
  const { openModal } = useAdminStore()

  const handleLogout = async () => {
    await signOut()
  }

  const handleOpenModal = () => {
    openModal('storeModal')
  }

  return (
    <section className='flex flex-col gap-3 sticky top-[4rem] z-[30] bg-background py-4 mb-0'>
      <User
        as='button'
        className='transition-transform w-fit'
        description={session?.user?.email}
        name='Admin'
      />
      <div className=' flex w-fit items-center justify-center gap-3'>
        <Button
          size='sm'
          startContent={<FaCog />}
          variant='faded'
          onPress={handleOpenModal}
        >
          Administra tu negocio
        </Button>
        <Button
          size='sm'
          color='danger'
          variant='faded'
          startContent={<FaSignOutAlt />}
          onPress={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </section>
  )
}

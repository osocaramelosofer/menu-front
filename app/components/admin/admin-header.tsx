'use client'

import type { Session } from 'next-auth'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@nextui-org/react'

import { useAdminStore } from '@/zustand-store/admin-store'
import { FaCog, FaPlus, FaSignOutAlt } from 'react-icons/fa'
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
    <section className='flex flex-col w-full gap-3 sticky top-[4rem] z-10 bg-background py-4 mb-4'>
      <User
        as='button'
        className='transition-transform w-fit'
        description={session?.user?.email}
        name='Admin'
      />
      <div className=' flex w-full items-center justify-center gap-3'>
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

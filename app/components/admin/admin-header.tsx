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

import { useAdminStore } from '@/store/dulce_trago/admin-store'
import { FaPlus } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

export default function AdminHeader ({ session }: { session: Session | null }) {
  const { openModal } = useAdminStore()

  const handleLogout = async () => {
    await signOut()
  }

  const handleOpenAdminModal = () => {
    openModal()
  }

  return (
    <section className='flex justify-between items-center w-full sticky top-0 z-20 bg-background py-4 mb-4'>
      <Dropdown placement='bottom-start'>
        <DropdownTrigger>
          <User
            as='button'
            className='transition-transform'
            description={'Admin'}
            name={session?.user?.email}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='User Actions' variant='flat'>
          <DropdownItem textValue='profile' showDivider key='profile'>
            <p className=' font-medium'>{session?.user?.email}</p>
          </DropdownItem>

          <DropdownItem
            isReadOnly
            textValue='logout'
            onPress={handleLogout}
            key='delete'
            className='text-danger'
            color='danger'
          >
            <Button
              size='sm'
              fullWidth
              color='danger'
              variant='flat'
              onPress={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        size='sm'
        startContent={<FaPlus />}
        color='primary'
        variant='flat'
        onPress={handleOpenAdminModal}
      >
        Add New Product
      </Button>
    </section>
  )
}

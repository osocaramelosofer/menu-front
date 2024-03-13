'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarBrand
} from '@nextui-org/react'

import { IStore } from '@/interfaces/store'
import { useSession } from 'next-auth/react'
import { FaHome, FaUserLock } from 'react-icons/fa'

export default function NavbarBrandDropdown ({ store }: { store: IStore }) {
  const { data: session } = useSession()
  // const userEmail = session?.user?.email

  return (
    <NavbarBrand className='max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Dropdown
        backdrop='opaque'
        placement='bottom-start'
        className='max-h-[90vh] max-w-[95vw] min-w-[95vw] sm:max-w-sm sm:min-w-[24rem] relative'
      >
        <DropdownTrigger>
          <h1>{store.name}</h1>
        </DropdownTrigger>
        <DropdownMenu
          topContent={
            <div className=' flex flex-col gap-3'>
              <h1 className=' text-lg font-semibold'>{store.name}</h1>

              <Button
                as={Link}
                href={`/${store.id}`}
                size='sm'
                fullWidth
                startContent={<FaHome />}
              >
                Inicio
              </Button>
            </div>
          }
          aria-label='Store Info'
          variant='flat'
          className=' max-w-xs'
        >
          <DropdownItem
            isReadOnly
            textValue='profile'
            showDivider
            key='profile'
          >
            <p className='break-words whitespace-normal opacity-80'>
              {store.description}
            </p>
          </DropdownItem>

          <DropdownItem isReadOnly textValue='logout' key='delete'>
            {/* {store?.users?.some(user => user.email === userEmail) && ( */}
            <Button
              as={Link}
              href={`/${store.id}/dashboard`}
              size='sm'
              fullWidth
              startContent={<FaUserLock />}
              color='success'
              className=' text-white'
            >
              Dashboard
            </Button>
            {/* )} */}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarBrand>
  )
}

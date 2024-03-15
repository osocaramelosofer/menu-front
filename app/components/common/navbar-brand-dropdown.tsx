'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarBrand,
  Snippet,
  User
} from '@nextui-org/react'

import type { IStore } from '@/interfaces/store'
import { useSession } from 'next-auth/react'
import { FaHome, FaUserLock } from 'react-icons/fa'
import { BASE_URL } from '@/lib/utils'

export default function NavbarBrandDropdown ({ store }: { store: IStore }) {
  return (
    <NavbarBrand className='max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Dropdown
        backdrop='opaque'
        placement='bottom-start'
        className='max-h-[90vh] max-w-[95vw] min-w-[95vw] sm:max-w-sm sm:min-w-[24rem] relative'
      >
        <DropdownTrigger>
          <Button
            variant='light'
            color='primary'
            className=' text-white font-semibold text-xl'
          >
            {store.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          topContent={
            <User
              className='w-fit'
              name={
                <h1 className=' text-xl font-semibold mb-1'>{store.name}</h1>
              }
              description={
                <div className='flex flex-row-reverse gap-3 items-center'>
                  <Button
                    variant='flat'
                    as={Link}
                    href={`/${store.id}/dashboard`}
                    size='sm'
                    color='warning'
                    startContent={<FaUserLock />}
                  >
                    Dashboard
                  </Button>
                  <Snippet
                    size='sm'
                    color='success'
                    variant='flat'
                    symbol='✨'
                    codeString={`http://localhost:3000/${store.id}/`}
                  >
                    ¡Compartir!
                  </Snippet>
                </div>
              }
            />
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
              fullWidth
              href={`/${store.id}`}
              startContent={<FaHome />}
              variant='solid'
            >
              Inicio
            </Button>

            {/* )} */}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarBrand>
  )
}

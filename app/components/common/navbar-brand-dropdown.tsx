'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  Snippet,
  User,
  Link,
  Accordion,
  AccordionItem
} from '@nextui-org/react'

import type { IStore } from '@/interfaces/store'
import {
  FaHome,
  FaInstagram,
  FaMapMarker,
  FaUserLock,
  FaWhatsapp
} from 'react-icons/fa'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function NavbarBrandDropdown ({ store }: { store: IStore }) {
  return (
    <NavbarBrand className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
      <Dropdown
        backdrop='opaque'
        placement='bottom-start'
        className='max-h-[90vh] max-w-[95vw] min-w-[95vw] sm:max-w-sm sm:min-w-[24rem] border border-blue-500 relative'
      >
        <DropdownTrigger className='min-w-full'>
          <User
            as='button'
            avatarProps={{
              src: getOptimizedImageUrl(store.logoUrl, 40)
            }}
            className='transition-transform w-fit'
            name={store.name}
          />
        </DropdownTrigger>
        <DropdownMenu
          topContent={
            <User
              className='w-fit'
              avatarProps={{
                src: getOptimizedImageUrl(store.logoUrl, 40)
              }}
              name={
                <h1 className=' text-lg font-semibold mb-1'>{store.name}</h1>
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
            textValue='description store'
            showDivider
            key='description'
          >
            <p className='break-words whitespace-normal opacity-80'>
              {store.description}
            </p>
          </DropdownItem>
          <DropdownItem
            isReadOnly
            textValue='Instagram link'
            showDivider
            key='ig'
          >
            <Accordion
              isCompact
              defaultExpandedKeys={['contact']}
              isDisabled={
                store.igUrl === null &&
                store.phone === null &&
                store.address === null
              }
            >
              <AccordionItem key={'contact'} title='Contacto'>
                <div className='flex flex-wrap items-center gap-2'>
                  {store.igUrl !== null && (
                    <Button
                      size='sm'
                      as={Link}
                      isBlock
                      variant='flat'
                      isExternal
                      showAnchorIcon
                      startContent={<FaInstagram />}
                      // className='bg-gradient-to-br from-[#C8288C] to-[#EE864F] text-white '
                      href={store.igUrl}
                    >
                      Instagram
                    </Button>
                  )}
                  {store.address !== null && (
                    <Button
                      size='sm'
                      as={Link}
                      isBlock
                      variant='flat'
                      isExternal
                      showAnchorIcon
                      startContent={<FaMapMarker />}
                      // className='bg-gradient-to-br from-[#2c2c2c] to-[#000] text-white'
                      href={`https://www.google.com/maps/search/?api=1&query=${store.address}`}
                    >
                      Ubicación
                    </Button>
                  )}
                  {store.phone !== null && (
                    <Button
                      as={Link}
                      size='sm'
                      isBlock
                      variant='flat'
                      isExternal
                      showAnchorIcon
                      startContent={<FaWhatsapp />}
                      // className='bg-gradient-to-br from-[#5CF778] to-[#0DBD2B] text-white '
                      href={`https://wa.me/${store.phone}`}
                    >
                      WhatsApp
                    </Button>
                  )}
                </div>
              </AccordionItem>
            </Accordion>
          </DropdownItem>

          <DropdownItem isReadOnly textValue='home button' key='home'>
            {/* {store?.users?.some(user => user.email === userEmail) && ( */}
            <Button
              as={Link}
              fullWidth
              href={`/${store.id}`}
              startContent={<FaHome />}
              variant='bordered'
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

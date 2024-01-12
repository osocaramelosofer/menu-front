'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { DulceTragoLogo } from '../logo'
import {
  CoffeeIcon,
  HomeIcon,
  JarIcon,
  MenuIcon,
  PaintbrushIcon
} from '@/lib/icons'

import { FaArrowLeft } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = [
    { name: 'Menu', route: '/dulce-trago', icon: <HomeIcon /> },
    { name: 'Cafés Regionales', route: '/dulce-trago', icon: <CoffeeIcon /> },
    { name: 'Conservas', route: '/dulce-trago', icon: <JarIcon /> },
    { name: 'Pinta y Crea', route: '/dulce-trago', icon: <PaintbrushIcon /> }
  ]

  const pathname = usePathname()

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='w-screen overflow-x-hidden bg-primary text-white'
    >
      <NavbarContent
        className={`${pathname === '/dulce-trago' ? 'hidden' : ''}`}
      >
        <div>
          <Link href='/dulce-trago' className='text-white'>
            <FaArrowLeft size='20' />
          </Link>
        </div>
      </NavbarContent>

      <NavbarContent className='sm:hidden w-full'>
        <div className='flex w-full justify-between items-center'>
          <NavbarBrand as={Link} href='/dulce-trago/' className='max-w-fit'>
            <DulceTragoLogo />
          </NavbarBrand>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color='primary' radius='full'>
                <MenuIcon />
              </Button>
            </DropdownTrigger>

            <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
              {menuItems.map((menuItem, index) => {
                return (
                  <DropdownItem
                    key={`${menuItem.name}-${index}`}
                    startContent={menuItem.icon}
                    as={Link}
                    href={menuItem.route}
                  >
                    {menuItem.name}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>

      <NavbarBrand
        as={Link}
        href='/dulce-trago/'
        className='max-w-fit hidden sm:flex'
      >
        <DulceTragoLogo />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link
              className={`${
                index === 2 ? 'text-white' : 'text-white/60'
              } font-medium `}
              href='#'
              size='md'
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`${
                index === 2 ? 'text-primary' : 'text-primary/50'
              } font-medium w-full `}
              href='#'
              size='lg'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

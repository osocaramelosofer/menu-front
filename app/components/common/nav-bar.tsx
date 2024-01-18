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
import { signIn, signOut, useSession } from 'next-auth/react'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const menuItems = [
    { name: 'Menu', route: '/dulce-trago', icon: <HomeIcon /> },
    { name: 'Cafés Regionales', route: '/dulce-trago/coffees', icon: <CoffeeIcon /> },
    { name: 'Conservas', route: '/dulce-trago/conservas', icon: <JarIcon /> },
    { name: 'Pinta y Crea', route: '/dulce-trago/pinta-crea', icon: <PaintbrushIcon /> }
  ]

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='w-screen overflow-x-hidden bg-primary text-white'
    >

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

            {/* Mobile menu */}
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
              className={`
              ${pathname === item.route ? 'text-white' : 'text-white/60'}
               font-medium `}
              href={`${item.route}`}
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

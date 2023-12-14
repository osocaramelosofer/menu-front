'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link
} from '@nextui-org/react'
import { DulceTragoLogo } from './logo'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = ['Menu', 'Cafés Regionales', 'Conservas', 'Pinta y Crea']

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-screen overflow-x-hidden bg-primary text-white"
    >
      <NavbarContent className="sm:hidden w-full">
        <div className="flex w-full justify-between items-center">
          {/* <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          /> */}
          <NavbarBrand as={Link} href={'/'} className="max-w-fit">
            <DulceTragoLogo />
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </div>
      </NavbarContent>

      <NavbarBrand as={Link} href={'/'} className="max-w-fit hidden sm:flex">
        <DulceTragoLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              className={`${
                index === 2 ? 'text-white' : 'text-white/60'
              } font-medium `}
              href="#"
              size="md"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`${
                index === 2 ? 'text-primary' : 'text-primary/50'
              } font-medium w-full `}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

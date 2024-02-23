'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Badge
} from '@nextui-org/react'
import { DulceTragoLogo } from '../logo'

import { FaShoppingBag } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartDropdown from '../cart/cart-dropdown'
import SharedCartDropdown from '../cart/shared-cart-dropdown'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { cartList, calculateCartPrice, isInSharedCart } = useCartsStore()

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='w-screen overflow-x-hidden bg-primary text-white'
    >
      <NavbarContent className='w-full'>
        <div className='flex w-full justify-end items-center relative'>
          <NavbarBrand
            as={Link}
            href='/dulce-trago/'
            className='max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          >
            <DulceTragoLogo />
          </NavbarBrand>
          <Badge
            content={cartList.length}
            size='sm'
            showOutline={false}
            color='danger'
            shape='circle'
          >
            <Dropdown
              onOpenChange={() => {
                calculateCartPrice()
              }}
              backdrop='opaque'
              className='max-h-[90vh] max-w-[95vw] min-w-[95vw] md:max-w-sm md:min-w-[24rem] relative'
            >
              <DropdownTrigger>
                <Button isIconOnly color='primary' radius='full'>
                  <FaShoppingBag size={22} />
                </Button>
              </DropdownTrigger>

              {isInSharedCart ? <SharedCartDropdown /> : <CartDropdown />}
            </Dropdown>
          </Badge>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

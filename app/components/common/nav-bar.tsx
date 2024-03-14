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

import { FaShoppingBag } from 'react-icons/fa'
import { useCartsStore } from '@/zustand-store/carts-store'
import CartDropdown from '../cart/cart-dropdown'
import SharedCartDropdown from '../cart/shared-cart-dropdown'
import { useRoomSocket } from '@/hooks/useRoomSockets'
import type { IStore } from '@/interfaces/store'

import NavbarBrandDropdown from './navbar-brand-dropdown'

export default function NavBar ({ store }: { store: IStore }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const { calculateCartPrice, cartList, isInSharedCart, cartPrice } =
    useCartsStore()
  // const { handleCreateRoom, handleJoinRoom, handleLeaveRoom, updateCart } =
  //   useRoomSocket()

  // React.useEffect(() => {
  //   if (isInSharedCart) {
  //     updateCart()
  //   }
  // }, [cartList, cartPrice, isInSharedCart])

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='w-screen overflow-x-hidden bg-primary text-white '
    >
      <NavbarContent className='w-full'>
        <div className='flex w-full justify-end items-center relative'>
          <NavbarBrandDropdown store={store} />
          {/* <NavbarBrand
            as={Link}
            href={`/${store?.id}`}
            className='max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          >
            <h1 className=' text-white capitalize'>{store?.name}</h1>
            <DulceTragoLogo /> 
          </NavbarBrand> */}
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

              {/* eslint-disable-next-line multiline-ternary */}
              {/* {isInSharedCart ? (
                <SharedCartDropdown
                  handleLeaveRoom={handleLeaveRoom}
                  updateCart={updateCart}
                />
              ) : (
                <CartDropdown
                  handleCreateRoom={handleCreateRoom}
                  handleJoinRoom={handleJoinRoom}
                />
              )} */}
              <CartDropdown />
            </Dropdown>
          </Badge>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

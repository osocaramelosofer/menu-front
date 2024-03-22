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
import clsx from 'clsx'

export default function NavBar ({
  store,
  isHiddenCart
}: {
  store: IStore
  isHiddenCart?: boolean
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const { calculateCartPrice, cartList, isInSharedCart, cartPrice } =
    useCartsStore()
  const {
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    updateCart,
    handleOrderCompleted
  } = useRoomSocket()

  React.useEffect(() => {
    if (isInSharedCart) {
      updateCart()
    }
  }, [cartList, cartPrice, isInSharedCart])

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={clsx(
        'w-screen overflow-x-hidden bg-primary text-white',
        store.themeColor ?? ''
      )}
    >
      <NavbarContent className='w-full'>
        <NavbarBrandDropdown store={store} />
        <div
          className={clsx(
            'w-full flex-1 justify-end items-center relative',
            isHiddenCart === true ? ' hidden' : 'flex'
          )}
        >
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
              className={clsx(
                'max-h-[90vh] max-w-[95vw] min-w-[95vw] md:max-w-sm md:min-w-[24rem] relative',
                store.themeColor ?? ''
              )}
            >
              <DropdownTrigger>
                <Button isIconOnly color='primary' radius='full'>
                  <FaShoppingBag size={22} />
                </Button>
              </DropdownTrigger>

              {/* eslint-disable-next-line multiline-ternary */}
              {isInSharedCart ? (
                <SharedCartDropdown
                  storeId={store.id}
                  handleLeaveRoom={handleLeaveRoom}
                  updateCart={updateCart}
                  handleOrderCompleted={handleOrderCompleted}
                />
              ) : (
                <CartDropdown
                  storeId={store.id}
                  handleCreateRoom={handleCreateRoom}
                  handleJoinRoom={handleJoinRoom}
                />
              )}
              {/* <CartDropdown /> */}
            </Dropdown>
          </Badge>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Badge
} from '@nextui-org/react'
import { DulceTragoLogo } from '../logo'

import { FaShoppingBag } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartProductCard from '../cart/cart-product-card'

export default function NavBar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const { cartList, cartPrice, calculateCartPrice } = useCartsStore()

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
              className='max-h-[36rem] max-w-[23rem] relative'
            >
              <DropdownTrigger>
                <Button isIconOnly color='primary' radius='full'>
                  <FaShoppingBag size={22} />
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                className='overflow-y-auto'
                variant='faded'
                aria-label='Dropdown menu with icons'
              >
                <DropdownItem
                  className='border-none'
                  showDivider
                  isReadOnly
                  textValue='Mi Carrito'
                >
                  <h1 className=' text-xl font-semibold'>Mi Carrito</h1>
                </DropdownItem>
                {/* eslint-disable-next-line multiline-ternary */}
                {cartList.length === 0 ? (
                  <DropdownItem className='border-none' showDivider isReadOnly>
                    <div className=' flex flex-col justify-center items-center my-4 text-primary'>
                      <h1 className=' mb-2 line-clamp-2 opacity-70 text-center'>
                        No has agregado productos <br /> a tu carrito aún.
                      </h1>
                      <FaShoppingBag size={50} />
                    </div>
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    className='border-none'
                    showDivider
                    isReadOnly
                    textValue='List of products in cart'
                  >
                    {cartList.map((product, index) => {
                      return (
                        <CartProductCard
                          key={`${product.id}${index}`}
                          product={product}
                        />
                      )
                    })}
                  </DropdownItem>
                )}

                <DropdownItem
                  className='border-none'
                  isReadOnly
                  textValue='Total Price'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-sm font-medium'>Total</p>
                    <h3 className='text-2xl font-bold '>
                      <span className='text-success'>$</span>
                      {cartPrice}
                    </h3>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Badge>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

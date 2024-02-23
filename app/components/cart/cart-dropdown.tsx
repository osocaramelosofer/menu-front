'use client'

import React from 'react'
import {
  DropdownItem,
  DropdownMenu,
  Accordion,
  AccordionItem,
  Avatar
} from '@nextui-org/react'

import { FaShoppingBag } from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartProductCard from '../cart/cart-product-card'
import SharedCartTabsForm from '../cart/shared-cart-tabs-form'
import useSocket from '@/hooks/useSocket'

export default function CartDropdown () {
  const { cartList, cartPrice } = useCartsStore()
  const socket = useSocket()

  const itemClasses = {
    title: 'font-medium text-sm',
    subtitle: ' text-xs'
  }
  return (
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
        {socket !== null && (
          <Accordion itemClasses={itemClasses}>
            <AccordionItem
              key='1'
              aria-label='Join to shared room'
              startContent={
                <Avatar
                  size='md'
                  classNames={{
                    base: 'bg-gradient-to-br from-[#ed71ad] to-[#7277f1]',
                    icon: ' display-none opacity-0'
                  }}
                />
              }
              subtitle='Crea o únete a un carrito compartido.'
              title='Carrito compartido'
            >
              <SharedCartTabsForm />
            </AccordionItem>
          </Accordion>
        )}
      </DropdownItem>
      {/* eslint-disable-next-line multiline-ternary */}
      {cartList.length === 0 ? (
        <DropdownItem
          textValue='Empty cart text'
          className='border-none'
          showDivider
          isReadOnly
        >
          <div className=' flex flex-col justify-center items-center my-4'>
            <h2 className=' text-xl font-medium'>Sin productos</h2>
            <p className=' mb-2 line-clamp-2 opacity-70 text-center'>
              No has agregado productos a tu carrito aún.
            </p>
            <FaShoppingBag className='text-primary' size={50} />
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

      <DropdownItem className='border-none' isReadOnly textValue='Total Price'>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-sm font-medium'>Total</p>
          <h3 className='text-2xl font-bold '>
            <span className='text-success'>$</span>
            {cartPrice}
          </h3>
        </div>
      </DropdownItem>
    </DropdownMenu>
  )
}

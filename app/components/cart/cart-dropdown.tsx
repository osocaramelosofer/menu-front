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
import { useCartsStore } from '@/zustand-store/carts-store'
import CartProductCard from '../cart/cart-product-card'
import SharedCartTabsForm from '../cart/shared-cart-tabs-form'

import CartOrderForm from './cart-order-form'

export default function CartDropdown ({
  storeId,
  handleCreateRoom,
  handleJoinRoom
}: {
  storeId: number
  handleCreateRoom: () => void
  handleJoinRoom: (username: string, roomId: string) => void
}) {
  const { cartList, socketId } = useCartsStore()

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

        <Accordion hidden={socketId === undefined} itemClasses={itemClasses}>
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
            <SharedCartTabsForm
              handleCreateRoom={handleCreateRoom}
              handleJoinRoom={handleJoinRoom}
            />
          </AccordionItem>
        </Accordion>
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
      <DropdownItem
        className='border-none'
        showDivider
        isReadOnly
        textValue='Order now form and order total'
      >
        <CartOrderForm storeId={storeId} />
      </DropdownItem>

      {/* <DropdownItem
        className='border-none'
        showDivider
        isReadOnly
        textValue='Order now form and order total'
      >
        <Accordion isDisabled={cartList.length === 0} itemClasses={itemClasses}>
          <AccordionItem
            key='1'
            title='Ordena desde aquí'
            subtitle='Ordena desde aquí'
            // subtitle='Completa los datos y ordena tu pedido'
            aria-label='Total order and order form'
            startContent={
              <div className='flex flex-col flex-1 justify-center items-center'>
                <p className='text-sm font-medium'>Total</p>
                <h3 className='text-2xl font-bold'>
                  <span className='text-success'>$</span>
                  {cartPrice.toFixed(2)}
                </h3>
              </div>
            }
          >
            <div className=' flex flex-col justify-between w-full items-start gap-3'>
              <Select
                isRequired
                size='sm'
                fullWidth
                label='Método de pago'
                variant='flat'
                color='success'
                value={paymentType}
                description={
                  <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                    Selecciona tu método de pago para anticipar tu cobro.
                  </p>
                }
                onChange={handlePaymentTypeChange}
              >
                {payments.map(payment => (
                  <SelectItem key={payment.value} value={payment.value}>
                    {payment.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                color='success'
                size='sm'
                variant='flat'
                minLength={2}
                maxLength={10}
                isRequired
                label='Nombre'
                value={username}
                onValueChange={setUsername}
                description={
                  <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                    Ingresa un nombre para identificar tu pedido y hacerte saber
                    cuando este listo.
                  </p>
                }
              />
              <div className=' w-full'>
                <Button
                  endContent={<FaChevronRight />}
                  size='sm'
                  fullWidth
                  isDisabled={
                    cartList.length === 0 ||
                    username.length < 3 ||
                    paymentType.length === 0
                  }
                  className='flex flex-1 text-white'
                  color='success'
                  onPress={handleOrderCreation}
                >
                  Ordenar Ahora
                </Button>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </DropdownItem> */}

      {/* <DropdownItem className='border-none' isReadOnly textValue='Order Form'>
        <div className=' flex flex-col justify-between w-full items-start gap-3'>
          <Select
            isRequired
            size='sm'
            fullWidth
            label='Método de pago'
            variant='bordered'
            color='success'
            placeholder='Select an payment type'
            // defaultSelectedKeys={['cash']}
            value={paymentType}
            description={
              <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                Selecciona tu método de pago para anticipar tu cobro.
              </p>
            }
            // selectedKeys={[paymentType]}
            onChange={handlePaymentTypeChange}
          >
            {payments.map(payment => (
              <SelectItem key={payment.value} value={payment.value}>
                {payment.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            color='success'
            size='sm'
            variant='bordered'
            minLength={2}
            maxLength={10}
            isRequired
            label='Nombre'
            value={username}
            onValueChange={setUsername}
            description={
              <p className=' overflow-hidden flex flex-wrap whitespace-normal'>
                Ingresa un nombre para identificar tu pedido y hacerte saber
                cuando este listo.
              </p>
            }
          />
        </div>
      </DropdownItem>
      <DropdownItem
        className='border-none'
        isReadOnly
        textValue='Order Now Button'
      >
        <Button
          endContent={<FaChevronRight />}
          size='sm'
          fullWidth
          isDisabled={
            cartList.length === 0 ||
            username.length < 3 ||
            paymentType.length === 0
          }
          className='flex flex-1 text-white'
          color='success'
          onPress={handleOrderCreation}
        >
          Ordenar Ahora
        </Button>
      </DropdownItem> */}
    </DropdownMenu>
  )
}

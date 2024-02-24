'use client'

import React from 'react'
import {
  DropdownItem,
  DropdownMenu,
  Accordion,
  AccordionItem,
  Avatar,
  Snippet,
  Button,
  AvatarGroup,
  Dropdown,
  DropdownTrigger,
  Badge
} from '@nextui-org/react'

import {
  FaCartArrowDown,
  FaEllipsisV,
  FaRedo,
  FaShoppingBag,
  FaUserAlt
} from 'react-icons/fa'
import { useCartsStore } from '@/store/dulce_trago/carts-store'
import CartProductCard from '../cart/cart-product-card'

export default function SharedCartDropdown ({
  updateCart,
  handleLeaveRoom
}: {
  updateCart: () => void
  handleLeaveRoom: (roomId: string) => void
}) {
  const { roomId, username, sharedCartList } = useCartsStore()

  const totalPrice = sharedCartList.reduce(
    (sum, cart) => sum + Number(cart.cartPrice),
    0
  )

  // Crea una copia de sharedCartList y ordénala
  const sortedCartList = [...sharedCartList].sort((a, b) => {
    // Coloca el carrito del usuario actual al principio
    if (a.username === username) return -1
    if (b.username === username) return 1
    return 0 // Mantiene el orden original para los demás elementos
  })

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
        <div className='flex  w-full justify-between items-center'>
          <h1 className=' text-xl font-semibold'>Carrito Compartido</h1>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant='light'>
                <FaEllipsisV />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Action event example'>
              <DropdownItem
                startContent={<FaRedo />}
                onClick={e => {
                  e.preventDefault()
                  updateCart()
                }}
                key='refresh'
                textValue='refresh shared cart button'
                description='Refresh shared cart'
              >
                Refresh
              </DropdownItem>

              <DropdownItem
                key='delete'
                color='danger'
                startContent={<FaCartArrowDown />}
                onPress={() => {
                  handleLeaveRoom(roomId)
                }}
                textValue='leave room button'
                className=' text-danger'
                description='Salir del carrito compartido'
              >
                Salir
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className=' flex gap-2 items-center justify-between mt-1'>
          <Snippet symbol='🟢' size='sm' color='success'>
            {roomId}
          </Snippet>

          <AvatarGroup
            className=' mx-1 my-1'
            isBordered
            max={3}
            renderCount={count => (
              <p className='text-small font-medium ms-2 text-secondary'>
                +{count} {count === 1 ? 'otro' : 'otros'}
              </p>
            )}
          >
            {sharedCartList.map(item => (
              <Avatar
                icon={<FaUserAlt />}
                size='sm'
                classNames={{
                  base: 'bg-gradient-to-br from-background to-secondary',
                  icon: 'text-primary text-lg'
                }}
                key={item.username}
              />
            ))}
          </AvatarGroup>
        </div>
      </DropdownItem>
      {/* eslint-disable-next-line multiline-ternary */}

      <DropdownItem
        className='border-none'
        // showDivider
        isReadOnly
        textValue='List of products in cart'
      >
        <Accordion
          isCompact
          defaultExpandedKeys={[username]}
          selectionMode='multiple'
        >
          {sortedCartList.map((cart, index) => (
            <AccordionItem
              textValue={cart.username}
              key={`${cart.username}`}
              title={
                <div className='flex gap-2 justify-between items-center'>
                  <div className=' flex items-center gap-2 '>
                    <Badge
                      isDot
                      variant='solid'
                      content={cart.cartList.length}
                      size='md'
                      showOutline={false}
                      color='success'
                      shape='rectangle'
                      placement='top-left'
                      className=' text-white font-semibold'
                    >
                      <Avatar
                        icon={<FaUserAlt />}
                        isBordered
                        size='sm'
                        classNames={{
                          base: 'bg-gradient-to-br from-background to-secondary maw-w-[2rem] max-h-[2rem]',
                          icon: 'text-primary text-lg'
                        }}
                      />
                    </Badge>
                    <div>
                      <p className=' font-semibold'>Orden de:</p>
                      <p className=' opacity-80'>
                        {cart.username === username
                          ? `${cart.username} (Tú)`
                          : `${cart.username}`}
                      </p>
                    </div>
                  </div>

                  <h3 className='text-sm font-bold '>
                    Total: <span className='text-success'>$</span>
                    {Number(cart.cartPrice).toFixed(2)}
                  </h3>
                </div>
              }
              className={`flex flex-col gap-1  bg-background rounded-lg px-1 py-2 mb-3 ${
                cart.username === username ? ' opacity-100' : ' opacity-50'
              }`}
            >
              {/* eslint-disable-next-line multiline-ternary */}
              {cart.cartList.length === 0 ? (
                <div className=' flex flex-col justify-center items-center my-4 px-2 text-primary'>
                  <h2 className=' text-lg font-medium'>Sin productos</h2>
                  <p className=' mb-2 line-clamp-2 opacity-70 text-sm text-center'>
                    Al parecer, {cart.username} aún no ha agregado <br />
                    ningún producto.
                  </p>
                  <FaShoppingBag size={30} />
                </div>
              ) : (
                cart.cartList.map((product, productIndex) => (
                  <CartProductCard
                    key={`${cart.username}-${product.id}-${productIndex}`}
                    product={product}
                    isDisabled={cart.username !== username}
                  />
                ))
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </DropdownItem>

      <DropdownItem className='border-none' isReadOnly textValue='Total Price'>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-sm font-medium'>Total de la Orden</p>
          <h3 className='text-2xl font-bold '>
            <span className='text-success'>$</span>
            {totalPrice.toFixed(2)}
          </h3>
        </div>
      </DropdownItem>
    </DropdownMenu>
  )
}
